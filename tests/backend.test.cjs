'use strict';
const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const store = require('../lib/store');
const { record } = require('../lib/visitors');
const { telegramConfig } = require('../lib/telegram-client');
const track = require('../api/track');
const redirect = require('../api/go/1win');
const postback = require('../api/postback/1win');
const registration = require('../api/postback/1win/registration');
let db, calls, telegramMode, messageCount, redisDown;
const visitor = 'v_aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee';
const secondVisitor = 'v_22222222-bbbb-cccc-dddd-eeeeeeeeeeee';
const event = n => 'evt_aaaaaaaa-bbbb-cccc-dddd-' + String(n).padStart(12, '0');
const click = 'fp_11111111-2222-3333-4444-555555555555';
const response = (value, status = 200) => new Response(JSON.stringify(value), { status });
function mockRes() {
  return { code: 200, headers: {}, status(code) { this.code = code; return this; }, setHeader(k, v) { this.headers[k] = v; }, json(body) { this.body = body; return this; }, send(body) { this.body = body; return this; }, redirect(code, location) { this.code = code; this.location = location; return this; } };
}
async function invoke(handler, body = {}, overrides = {}) {
  const res = mockRes();
  await handler({ method: 'POST', headers: { host: 'example.test', 'content-type': 'application/json' }, url: '/api/track', body, ...overrides }, res);
  return res;
}
function pb(extra = {}) { return { type: 'registration', user_id: 'player-7', event_id: 'reg-event', secret: 'test-secret', sub1: click, ...extra }; }
beforeEach(() => {
  db = new Map(); calls = []; telegramMode = ''; messageCount = 100; redisDown = false;
  process.env.UPSTASH_REDIS_REST_URL = 'https://redis.test'; process.env.UPSTASH_REDIS_REST_TOKEN = 'test-only';
  process.env.TELEGRAM_BOT2_TOKEN = 'test-bot2'; process.env.TELEGRAM_BOT2_CHAT_ID = '42'; process.env.POSTBACK_SECRET = 'test-secret';
  process.env.TRACKING_NAMESPACE = 'test'; process.env.TELEGRAM_CONVERSIONS_SEPARATE = 'false';
  for(const key of ['ONEWIN_AFFILIATE_URL','ONEWIN_FALLING_PICKAXE_URL','ONEWIN_ICE_FISHING_URL','ONEWIN_TOWER_RUSH_URL','ONEWIN_CLICK_PARAM'])delete process.env[key];
  global.fetch = async (url, options) => {
    if (String(url).startsWith('https://redis.test')) {
      if (redisDown) throw new Error('Redis disconnected');
      const [cmd, ...args] = JSON.parse(options.body); let result;
      if (cmd === 'GET') result = db.get(args[0]) ?? null;
      else if (cmd === 'SET') { if (args.includes('NX') && db.has(args[0])) result = null; else { db.set(args[0], args[1]); result = 'OK'; } }
      else if (cmd === 'INCR') { result = Number(db.get(args[0]) || 0) + 1; db.set(args[0], String(result)); }
      else if (cmd === 'EVAL') { const [, , key, token] = args; result = db.get(key) === token ? Number(db.delete(key)) : 0; }
      else throw new Error('Unmocked command: ' + cmd);
      await new Promise(resolve => setImmediate(resolve));
      return response({ result });
    }
    assert.match(String(url), /^https:\/\/api.telegram.org\/bot/);
    const method = String(url).split('/').pop(); calls.push({ method, body: JSON.parse(options.body), url });
    if (telegramMode === 'timeout') throw new Error('Lost response');
    if (telegramMode === 'rate') return response({ ok: false, error_code: 429, parameters: { retry_after: 1 } }, 429);
    if (telegramMode === 'unchanged' && method === 'editMessageText') return response({ ok: false, error_code: 400, description: 'Bad Request: message is not modified' }, 400);
    if (telegramMode === 'missing' && method === 'editMessageText') return response({ ok: false, error_code: 400, description: 'Bad Request: message to edit not found' }, 400);
    if (telegramMode === 'forbidden') return response({ ok: false, error_code: 403 }, 403);
    return response({ ok: true, result: { message_id: method === 'sendMessage' ? ++messageCount : JSON.parse(options.body).message_id } });
  };
});
test('visit, rapid actions, reload and duplicate beacon use one card with ordered unique visitor number', async () => {
  const initial = await record(visitor, 'page_view', { attribution: { source_code: 'tt1' }, country: 'BR' }, event(1));
  const results = await Promise.all([
    record(visitor, 'open_browser', { app: 'TikTok' }, event(2)),
    record(visitor, 'copy_link', { app: 'TikTok' }, event(3)),
    record(visitor, 'page_view', {}, event(4)),
    record(visitor, 'copy_link', { app: 'TikTok' }, event(3)),
  ]);
  assert.equal(initial.number, 1); assert.ok(results.every(r => r.number === 1));
  assert.equal(calls.filter(c => c.method === 'sendMessage').length, 1);
  assert.equal(calls.filter(c => c.method === 'editMessageText').length, 3);
  const state = await store.get('visitor:' + visitor);
  assert.equal(state.views, 2); assert.equal(state.history.length, 4); assert.equal(state.source, 'TikTok · Brasil');
  assert.equal((await record(secondVisitor, 'page_view', {}, event(5))).number, 2);
});
test('Telegram message-is-not-modified is success, never a replacement', async () => {
  await record(visitor, 'page_view', {}, event(1)); telegramMode = 'unchanged';
  await record(visitor, 'copy_link', {}, event(2));
  assert.equal(calls.filter(c => c.method === 'sendMessage').length, 1);
});
test('429 and permission errors preserve the existing message ID and never send another card', async () => {
  await record(visitor, 'page_view', {}, event(1)); telegramMode = 'rate';
  await assert.rejects(record(visitor, 'copy_link', {}, event(2)), { code: 'telegram_error' });
  let state = await store.get('visitor:' + visitor);
  assert.equal(state.history.length, 2); const card = state.cards[telegramConfig(2).scope]; assert.equal(card.messageId, 101);
  card.retryAt = 0; await store.set('visitor:' + visitor, state); telegramMode = '';
  const retry = await record(visitor, 'copy_link', {}, event(2)); assert.equal(retry.duplicate, true);
  telegramMode = 'forbidden'; await assert.rejects(record(visitor, 'open_browser', {}, event(3)));
  assert.equal(calls.filter(c => c.method === 'sendMessage').length, 1);
});
test('a deleted message may be replaced once while preserving visitor number', async () => {
  await record(visitor, 'page_view', {}, event(1)); telegramMode = 'missing';
  const result = await record(visitor, 'copy_link', {}, event(2));
  assert.equal(result.number, 1); assert.equal(calls.filter(c => c.method === 'sendMessage').length, 2);
});
test('lost send response is quarantined instead of automatically sending duplicates', async () => {
  telegramMode = 'timeout'; await assert.rejects(record(visitor, 'page_view', {}, event(1)));
  telegramMode = ''; await assert.rejects(record(visitor, 'page_view', {}, event(1)), { code: 'telegram_delivery_uncertain' });
  assert.equal(calls.filter(c => c.method === 'sendMessage').length, 1);
});
test('track ignores forged message IDs/state, rejects conversion spoofing, and preserves event dedupe', async () => {
  let result = await invoke(track, { visitor_id: visitor, event: 'page_view', event_id: event(1), telegram_message_id: 999, player: 'forged', amount: '999', visitor_state: '{"number":999}' });
  assert.equal(result.code, 200); assert.equal(result.body.visitor_number, 1); assert.equal(calls[0].method, 'sendMessage');
  assert.equal((await store.get('visitor:' + visitor)).player, undefined);
  assert.doesNotMatch(calls[0].body.text, /forged|999/);
  result = await invoke(track, { visitor_id: visitor, event: 'registration', event_id: event(2) }); assert.equal(result.code, 400);
  result = await invoke(track, { visitor_id: visitor, event: 'page_view', event_id: event(1) }); assert.equal(result.body.duplicate, true);
});
test('game redirect carries sub1…sub10 and postbacks update the original card', async () => {
  process.env.ONEWIN_ICE_FISHING_URL = 'https://affiliate.test/ice?partner=original';
  await record(visitor, 'page_view', { country: 'CL' }, event(1));
  const args = { game: 'ice-fishing', click_id: click, visitor_id: visitor, source_code: 'tt2', source: 'TikTok', channel: 'reels', creative: 'ice_01', campaign: 'october', content: 'fish', language: 'es', country: 'CL' };
  const request = { method: 'GET', url: '/go/1win?' + new URLSearchParams(args), headers: {} };
  const go = await invoke(redirect, {}, request);
  assert.equal(go.code, 302); const target = new URL(go.location);
  assert.equal(target.host, 'affiliate.test'); assert.equal(target.searchParams.get('partner'), 'original');
  assert.deepEqual(Array.from({ length: 10 }, (_, i) => target.searchParams.get('sub' + (i + 1))), [click, 'tt2', 'reels', 'ice_01', 'ice-fishing', 'ice-fishing', 'es', 'CL', 'october', 'fish']);
  await invoke(redirect, {}, request); // network retry
  const reg = await invoke(postback, pb()); assert.equal(reg.code, 200); assert.equal(reg.body.visitor_number, 1);
  const deposit = pb({ type: 'first_deposit', event_id: 'ftd-event', transaction_id: 'tx-1', amount: '100' });
  const first = await invoke(postback, deposit); const retry = await invoke(postback, deposit);
  assert.equal(first.code, 200); assert.equal(retry.body.duplicate, true);
  const state = await store.get('visitor:' + visitor);
  assert.equal(state.clicks, 1); assert.equal(state.deposits, 1); assert.equal(state.registration, true); assert.deepEqual(state.games, ['ice-fishing']);
  assert.equal(state.attribution.creative, 'ice_01'); assert.equal(calls.filter(c => c.method === 'sendMessage').length, 1);
  assert.match(calls.at(-1).body.text, /валюта не передана/);
});
test('same transaction with changed event type is not counted twice; same amount with a new transaction is', async () => {
  const first = pb({ type: 'first_deposit', transaction_id: 'tx-11', amount: '20' });
  await invoke(postback, first);
  const retry = await invoke(postback, { ...first, type: 'redeposit' }); assert.equal(retry.body.duplicate, true);
  await invoke(postback, { ...first, transaction_id: 'tx-12', type: 'redeposit' });
  assert.equal(calls.filter(c => c.method === 'sendMessage').length, 1);
  const state = [...db.entries()].find(([k]) => k.startsWith('test:visitor:p_'))[1]; assert.equal(JSON.parse(state).deposits, 2);
});
test('postback event_id reused by different players does not collapse their registrations', async () => {
  const a = await invoke(postback, pb({ user_id: '1' }));
  const b = await invoke(postback, pb({ user_id: '2' }));
  assert.notEqual(a.body.visitor_number, b.body.visitor_number);
});
test('postback authentication and required transaction identity are enforced', async () => {
  assert.equal((await invoke(postback, pb({ secret: 'wrong' }))).code, 403);
  assert.equal((await invoke(postback, pb({ type: 'first_deposit' }))).code, 400);
  assert.equal((await invoke(postback, pb({ user_id: '{user_id}' }))).code, 400);
  assert.equal((await invoke(registration, pb({ type: 'redeposit', event_type: 'redeposit' }))).code, 200);
  assert.match(calls.at(-1).body.text, /Регистрация получена/);
});
test('separate conversions mode edits one card per bot with the same visitor number', async () => {
  process.env.TELEGRAM_CONVERSIONS_SEPARATE = 'true'; process.env.TELEGRAM_BOT1_TOKEN = 'test-bot1'; process.env.TELEGRAM_BOT1_CHAT_ID = '84';
  await invoke(postback, pb()); await invoke(postback, pb({ type: 'first_deposit', transaction_id: 'tx-9', amount: '5' }));
  assert.equal(calls.filter(c => c.method === 'sendMessage').length, 2);
  assert.equal(calls.filter(c => c.method === 'editMessageText').length, 2);
  assert.ok(calls.every(c => c.body.text.includes('#000001')));
});
test('same bot credentials in both slots still produce one message', async () => {
  process.env.TELEGRAM_CONVERSIONS_SEPARATE = 'true'; process.env.TELEGRAM_BOT1_TOKEN = process.env.TELEGRAM_BOT2_TOKEN; process.env.TELEGRAM_BOT1_CHAT_ID = process.env.TELEGRAM_BOT2_CHAT_ID;
  await invoke(postback, pb()); assert.equal(calls.length, 1);
});
test('each game uses its assigned affiliate destination and retains click attribution', async () => {
  process.env.ONEWIN_AFFILIATE_URL='https://lkvq.cc/838bfc6f';
  for(const [game,url] of [['falling-pickaxe','https://lkvq.cc/838bfc6f'],['tower-rush','https://lkuf.cc/6561aa49'],['ice-fishing','https://lkuf.cc/339b76']]){
    const result=await invoke(redirect,{}, {method:'GET',url:'/go/1win?game='+game+'&visitor_id='+visitor+'&language=ru',headers:{}});
    assert.equal(result.code,302);
    const target=new URL(result.location);
    assert.equal(target.origin+target.pathname,url);
    assert.match(target.searchParams.get('sub1'),/^fp_/);
    assert.equal(target.searchParams.get('sub6'),game);
    assert.equal(target.searchParams.get('sub7'),'ru');
  }
});
test('no memory fallback on missing database; valid affiliate redirects still work during an outage', async () => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  const result = await invoke(track, { visitor_id: visitor, event: 'page_view', event_id: event(1) }); assert.equal(result.code, 503); assert.equal(calls.length, 0);
  const go = await invoke(redirect, {}, { method: 'GET', url: '/go/1win?game=tower-rush', headers: {} }); assert.equal(go.code, 302);
});
test('Telegram HTML is escaped and the bounded history fits one message', async () => {
  await record(visitor, 'page_view', { attribution: { source: '<evil>&"', creative: '<tag>' } }, event(1));
  for (let i = 2; i <= 20; i++) await record(visitor, 'language_change', { language: 'ar', game: 'falling-pickaxe' }, event(i));
  const text = calls.at(-1).body.text; assert.ok(text.length < 4096); assert.match(text, /&lt;evil&gt;&amp;&quot;/); assert.doesNotMatch(text, /<evil>/);
});

test('reviews, Telegram, rules, promo and GEO actions update the same visitor card', async () => {
  for (const [index, type] of ['page_view','tab_reviews','telegram_click','rules_game_change','promo_copy','country_change'].entries()) {
    const result = await invoke(track, {visitor_id:visitor,event:type,event_id:event(index+1)});
    assert.equal(result.code,200);
  }
  assert.equal(calls.filter(c=>c.method==='sendMessage').length,1);
  assert.match(calls.at(-1).body.text,/Открыл отзывы/);
  assert.match(calls.at(-1).body.text,/Перешёл в Telegram-канал/);
  assert.match(calls.at(-1).body.text,/Смотрит правила игры/);
  assert.match(calls.at(-1).body.text,/Скопировал промокод/);
});
