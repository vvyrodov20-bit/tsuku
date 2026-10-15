'use strict';
const { payload, failure } = require('../lib/http');
const { record, labels } = require('../lib/visitors');
const { clean } = require('../lib/telegram-client');
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ ok: false, error: 'method_not_allowed' }); }
  if (req.headers['sec-fetch-site'] === 'cross-site') return res.status(403).json({ ok: false, error: 'cross_site_request' });
  try {
    const body = await payload(req), event = clean(body.event, 40);
    const allowed = Object.keys(labels).filter(k => !['registration', 'first_deposit', 'redeposit', 'affiliate_click'].includes(k));
    if (!allowed.includes(event) || !/^evt_[A-Za-z0-9_-]{16,100}$/.test(body.event_id || '')) return res.status(400).json({ ok: false, error: 'invalid_event' });
    const country = clean(req.headers['x-vercel-ip-country'] || body.country, 2).toUpperCase();
    const data = { country, attribution: body.attribution, language: clean(body.language, 12), game: clean(body.game, 40), app: clean(body.app, 15) };
    const result = await record(body.visitor_id, event, data, body.event_id);
    return res.status(200).json({ ok: true, visitor_number: result.number, action: result.action, duplicate: result.duplicate });
  } catch (error) { return failure(res, error); }
};
