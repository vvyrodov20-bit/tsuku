'use strict';
const store = require('../../lib/store');
const { payload, sameSecret, failure } = require('../../lib/http');
const { clean } = require('../../lib/telegram-client');
const { record, validClick, digest } = require('../../lib/visitors');
const { games } = require('../../assets/catalog');
const TYPES = { registration: 'registration', register: 'registration', reg: 'registration', first_deposit: 'first_deposit', 'first-deposit': 'first_deposit', ftd: 'first_deposit', redeposit: 'redeposit', repeat: 'redeposit' };
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'POST'].includes(req.method)) { res.setHeader('Allow', 'GET, POST'); return res.status(405).json({ ok: false }); }
  try {
    const body = await payload(req);
    const secret = process.env.POSTBACK_SECRET;
    if (!secret) throw Object.assign(new Error('Configure postback secret'), { code: 'postback_unconfigured' });
    if (!sameSecret(req.headers['x-postback-secret'] || body.secret, secret)) return res.status(403).json({ ok: false, error: 'forbidden' });
    const type = TYPES[req.postbackType || body.event_type || body.type];
    if (!type) return res.status(400).json({ ok: false, error: 'event_type_required' });
    const literal = value => /^\{.*\}$/.test(value);
    const player = clean(body.user_id, 80), transaction = clean(body.transaction_id, 100), eventId = clean(body.event_id, 100), date = clean(body.date, 30);
    if (!player || literal(player) || literal(transaction) || literal(eventId)) return res.status(400).json({ ok: false, error: 'resolved_player_and_event_required' });
    if (type !== 'registration' && !transaction && (!eventId || !date)) return res.status(400).json({ ok: false, error: 'transaction_id_or_event_id_and_date_required' });
    const identifier = type === 'registration' ? 'registration:' + player : transaction ? 'transaction:' + player + ':' + transaction : type + ':' + player + ':' + eventId + ':' + date;
    const eventKey = 'postback:' + digest(identifier);
    const result = await store.withLock(eventKey, async () => {
      const prior = await store.get(eventKey);
      const click = Array.from({ length: 10 }, (_, i) => clean(body['sub' + (i + 1)], 110)).find(validClick);
      const context = click ? await store.get('click:' + click) : null;
      const existingPlayer = await store.get('player:' + digest(player));
      const visitor = prior?.visitor_id || existingPlayer?.visitor_id || context?.visitor_id || 'p_' + digest(player).slice(0, 40);
      const binding = { visitor_id: visitor };
      if (!existingPlayer) await store.set('player:' + digest(player), binding);
      if (!prior) await store.set(eventKey, binding);
      const game = context?.game || (games.some(g => g.id === body.sub6) ? body.sub6 : undefined);
      const attribution = context?.attribution || { source: clean(body.source_name || body.sub2, 80), channel: clean(body.sub3, 80), creative: clean(body.sub4, 80), campaign: clean(body.sub9, 80), content: clean(body.sub10, 80) };
      return record(visitor, type, { attribution, player, game, country: clean(body.country || body.sub8, 2).toUpperCase(), language: clean(body.sub7, 12), amount: clean(body.amount, 30), currency: clean(body.currency, 8), unlinked: !context && !existingPlayer }, eventKey, { conversion: true });
    });
    return res.status(200).json({ ok: true, received: true, visitor_number: result.number, duplicate: result.duplicate });
  } catch (error) { return failure(res, error); }
};
