'use strict';
const { randomUUID } = require('node:crypto');
const store = require('../../lib/store');
const { clean } = require('../../lib/telegram-client');
const { record, validVisitor, validClick } = require('../../lib/visitors');
const { games } = require('../../assets/catalog');
const ENV_BY_GAME = { 'falling-pickaxe': 'ONEWIN_FALLING_PICKAXE_URL', 'ice-fishing': 'ONEWIN_ICE_FISHING_URL', 'tower-rush': 'ONEWIN_TOWER_RUSH_URL' };
const DEFAULT_AFFILIATE_URL = 'https://lkvq.cc/838bfc6f';
const GAME_AFFILIATE_URLS = {
  'tower-rush': 'https://lkuf.cc/6561aa49',
  'ice-fishing': 'https://lkuf.cc/339b76',
};
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).send('Method Not Allowed'); }
  const query = Object.fromEntries(new URL(req.url, 'https://local.invalid').searchParams);
  const game = clean(query.game, 40);
  if (game && !games.some(g => g.id === game)) return res.status(400).send('Unknown game');
  let target;
  try {
    target = new URL(process.env[ENV_BY_GAME[game]] || GAME_AFFILIATE_URLS[game] || process.env.ONEWIN_AFFILIATE_URL || DEFAULT_AFFILIATE_URL);
    if (!['https:', 'http:'].includes(target.protocol)) throw new Error('Invalid protocol');
  } catch (_) { return res.status(503).send('Affiliate URL is not configured'); }
  const visitor = validVisitor(query.visitor_id) ? query.visitor_id : 'v_' + randomUUID();
  const click = validClick(query.click_id) ? query.click_id : 'fp_' + randomUUID();
  const attribution = Object.fromEntries(['source', 'source_code', 'channel', 'creative', 'campaign', 'content', 'landing_page'].map(k => [k, clean(query[k], 100)]));
  const country = clean(req.headers['x-vercel-ip-country'] || query.country, 2).toUpperCase();
  const language = clean(query.language, 12), button = clean(query.button || game || 'register', 50);
  // Explicit sub mapping. Preserve the existing affiliate destination/hash.
  const clickParam = clean(process.env.ONEWIN_CLICK_PARAM || 'sub1', 30);
  if (!/^sub(?:[1-9]|10)$/.test(clickParam)) return res.status(503).send('ONEWIN_CLICK_PARAM must be sub1 … sub10');
  const values = [click, attribution.source_code || attribution.source, attribution.channel, attribution.creative, button, game || 'game-hub', language, country, attribution.campaign, attribution.content];
  values.forEach((value, i) => { if (value) target.searchParams.set('sub' + (i + 1), value); });
  if (clickParam !== 'sub1') {
    // Move the displaced attribution value rather than overwriting the identifier.
    const displaced = target.searchParams.get(clickParam);
    if (displaced) target.searchParams.set('sub1', displaced); else target.searchParams.delete('sub1');
    target.searchParams.set(clickParam, click);
  }
  try {
    await store.withLock('click:' + click, async () => {
      const previous = await store.get('click:' + click);
      if (previous && previous.visitor_id !== visitor) throw Object.assign(new Error('Click collision'), { code: 'click_collision' });
      const context = previous || { visitor_id: visitor, game, attribution, country, language };
      if (!previous) await store.set('click:' + click, context);
      await record(context.visitor_id, 'affiliate_click', context, 'click:' + click);
    });
  } catch (error) {
    // The visitor can still follow a valid affiliate link during a telemetry outage.
    console.error('[affiliate tracking]', error.code || 'tracking_failed');
  }
  res.setHeader('Referrer-Policy', 'no-referrer');
  return res.redirect(302, target.href);
};
