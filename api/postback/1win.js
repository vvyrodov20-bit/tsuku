'use strict';
const store = require('../../lib/store');
const { payload, sameSecret, failure } = require('../../lib/http');
const { clean } = require('../../lib/telegram-client');
const { record, validClick, digest } = require('../../lib/visitors');
const { games } = require('../../assets/catalog');

const TYPES = {
  registration: 'registration', register: 'registration', reg: 'registration',
  first_deposit: 'first_deposit', 'first-deposit': 'first_deposit', ftd: 'first_deposit',
  redeposit: 'redeposit', repeat: 'redeposit',
  all_deposits: 'all_deposits', 'all-deposits': 'all_deposits', deposit: 'all_deposits',
};
const literal = value => /^\{.*\}$/.test(value);
const error = (code, status = 400) => Object.assign(new Error(code), { code, status });

// Store only the attribution and deposit fields, never the postback secret.
function depositFields(body) {
  const fields = ['user_id', 'transaction_id', 'event_id', 'date', 'country', 'amount', 'currency', 'source_name'];
  for (let i = 1; i <= 10; i++) fields.push('sub' + i);
  return Object.fromEntries(fields.map(k => [k, clean(body[k], 110)]));
}

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
    const player = clean(body.user_id, 80), transaction = clean(body.transaction_id, 100);
    const eventId = clean(body.event_id, 100), date = clean(body.date, 30);
    if (!player || literal(player) || literal(transaction) || literal(eventId) || literal(date))
      return res.status(400).json({ ok: false, error: 'resolved_player_and_event_required' });
    // Correlating FTD and "all deposits" requires the SAME transaction identifier in both callbacks.
    if (['first_deposit', 'all_deposits'].includes(type) && !transaction)
      return res.status(400).json({ ok: false, error: 'transaction_id_required_for_correlation' });
    if (type === 'redeposit' && !transaction && (!eventId || !date))
      return res.status(400).json({ ok: false, error: 'transaction_id_or_event_id_and_date_required' });

    const playerKey = digest(player), flowKey = 'deposit-flow:' + playerKey;
    return await store.withLock(flowKey, async () => {
      const commit = async (kind, details) => {
        const txn = clean(details.transaction_id, 100), id = clean(details.event_id, 100), timestamp = clean(details.date, 30);
        const identifier = kind === 'registration' ? 'registration:' + player : txn
          ? 'transaction:' + player + ':' + txn : kind + ':' + player + ':' + id + ':' + timestamp;
        const eventKey = 'postback:' + digest(identifier);
        return store.withLock(eventKey, async () => {
          const prior = await store.get(eventKey);
          const click = Array.from({ length: 10 }, (_, i) => clean(details['sub' + (i + 1)], 110)).find(validClick);
          const context = click ? await store.get('click:' + click) : null;
          const existing = await store.get('player:' + playerKey);
          const visitor = prior?.visitor_id || existing?.visitor_id || context?.visitor_id || 'p_' + playerKey.slice(0, 40);
          const binding = { visitor_id: visitor };
          if (!existing) await store.set('player:' + playerKey, binding);
          if (!prior) await store.set(eventKey, binding);
          const game = context?.game || (games.some(g => g.id === details.sub6) ? details.sub6 : undefined);
          const attribution = context?.attribution || {
            source: clean(details.source_name || details.sub2, 80), channel: clean(details.sub3, 80),
            creative: clean(details.sub4, 80), campaign: clean(details.sub9, 80), content: clean(details.sub10, 80),
          };
          return record(visitor, kind, {
            attribution, player, game, country: clean(details.country || details.sub8, 2).toUpperCase(),
            language: clean(details.sub7, 12), amount: clean(details.amount, 30), currency: clean(details.currency, 8),
            unlinked: !context && !existing,
          }, eventKey, { conversion: true });
        });
      };
      const flow = await store.get(flowKey) || { firstTxn: null, firstConfirmed: false, firstPayload: null, pending: {} };
      flow.pending ||= {};
      const save = () => store.set(flowKey, flow);
      const resolveFirst = async () => {
        if (!flow.firstTxn || flow.firstConfirmed) return null;
        const result = await commit('first_deposit', flow.firstPayload);
        flow.firstConfirmed = true;
        delete flow.pending[flow.firstTxn];
        await save();
        return result;
      };
      const drain = async () => {
        for (const [txHash, details] of Object.entries(flow.pending)) {
          if (txHash === flow.firstTxn) { delete flow.pending[txHash]; await save(); continue; }
          await commit('redeposit', details);
          delete flow.pending[txHash];
          await save();
        }
      };
      if (type === 'first_deposit') {
        const txHash = digest(transaction);
        if (flow.firstTxn && flow.firstTxn !== txHash)
          return res.status(409).json({ ok: false, error: 'first_deposit_transaction_conflict' });
        if (!flow.firstTxn) {
          flow.firstTxn = txHash;
          flow.firstPayload = depositFields(body);
          await save();
        }
        const result = await resolveFirst() || await commit('first_deposit', body);
        await drain();
        return res.status(200).json({ ok: true, received: true, visitor_number: result.number, duplicate: result.duplicate });
      }
      if (type === 'all_deposits') {
        const txHash = digest(transaction);
        if (!flow.firstTxn) {
          if (!flow.pending[txHash]) {
            if (Object.keys(flow.pending).length >= 100) throw error('too_many_unclassified_deposits', 503);
            flow.pending[txHash] = depositFields(body);
            await save();
          }
          return res.status(200).json({ ok: true, received: true, pending: true, classification: 'awaiting_first_deposit' });
        }
        await resolveFirst();
        const kind = txHash === flow.firstTxn ? 'first_deposit' : 'redeposit';
        const result = await commit(kind, body);
        await drain();
        return res.status(200).json({ ok: true, received: true, visitor_number: result.number, duplicate: result.duplicate, classification: kind });
      }
      const result = await commit(type, body);
      if (flow.firstTxn) { await resolveFirst(); await drain(); }
      return res.status(200).json({ ok: true, received: true, visitor_number: result.number, duplicate: result.duplicate });
    });
  } catch (e) { return failure(res, e); }
};
