'use strict';
const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const store = require('../lib/store');
const { record } = require('../lib/visitors');
const { telegramConfig } = require('../lib/telegram-client');
const track = require('../api/track');
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
function pb(extra = {}) { return { type: 'registration', user_id: 'player-7', event_id: 'reg-event', secret: 'test-secret', ...extra }; }
beforeEach(() => {
  process.env.TELEGRAM_BOT1_TOKEN = 'test-bot1'; process.env.TELEGRAM_BOT1_CHAT_ID = '84';
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
  const state = await store.get('site:visitor:' + visitor);
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
  let state = await store.get('site:visitor:' + visitor);
  assert.equal(state.history.length, 2); const card = state.cards[telegramConfig(2).scope]; assert.equal(card.messageId, 101);
  card.retryAt = 0; await store.set('site:visitor:' + visitor, state); telegramMode = '';
  const retry = await record(visitor, 'copy_link', {}, event(2)); assert.equal(retry.duplicate, true);
  telegramMode = 'forbidden'; await assert.rejects(record(visitor, 'open_browser', {}, event(3)));
  assert.equal(calls.filter(c => c.method === 'sendMessage').length, 1);
});
test('a deleted message may be replaced once while preserving visitor number', async () => {
  await record(visitor, 'page_view', {}, event(1)); telegramMode = 'missing';
  const result = await record(visitor, 'copy_link', {}, event(2));
  assert.equal(result.number, 1); assert.equal(calls.filter(c => c.method === 'sendMessage').length, 2);
});
test('lost send response preserves the event and applies a retry cooldown', async () => {
  telegramMode = 'timeout'; await assert.rejects(record(visitor, 'page_view', {}, event(1)));
  telegramMode = ''; await assert.rejects(record(visitor, 'page_view', {}, event(1)), { code: 'telegram_cooldown' });
  assert.equal(calls.filter(c => c.method === 'sendMessage').length, 1);
});
test('track ignores forged message IDs/state, rejects conversion spoofing, and preserves event dedupe', async () => {
  let result = await invoke(track, { visitor_id: visitor, event: 'page_view', event_id: event(1), telegram_message_id: 999, player: 'forged', amount: '999', visitor_state: '{"number":999}' });
  assert.equal(result.code, 200); assert.equal(result.body.visitor_number, 1); assert.equal(calls[0].method, 'sendMessage');
  assert.equal((await store.get('site:visitor:' + visitor)).player, undefined);
  assert.doesNotMatch(calls[0].body.text, /forged|999/);
  result = await invoke(track, { visitor_id: visitor, event: 'registration', event_id: event(2) }); assert.equal(result.code, 400);
  result = await invoke(track, { visitor_id: visitor, event: 'page_view', event_id: event(1) }); assert.equal(result.body.duplicate, true);
});
test('no memory fallback on missing database', async () => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  const result = await invoke(track, { visitor_id: visitor, event: 'page_view', event_id: event(1) }); assert.equal(result.code, 503); assert.equal(calls.length, 0);
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


const allDeposits = require('../api/postback/1win/all-deposits');
test('partner registrations need no click or site visit and use only Bot1', async () => {
  delete process.env.TELEGRAM_BOT2_TOKEN;
  assert.equal((await invoke(postback, pb())).code, 200);
  assert.equal((await invoke(postback, pb())).body.duplicate, true);
  assert.equal(calls.length, 1); assert.match(calls[0].url, /bottest-bot1/);
  assert.ok([...db.keys()].every(k=>!k.includes('site:') && !k.includes('click:')));
  assert.doesNotMatch([...db.values()].join(''), /test-secret/);
});
test('website buttons work with partner bot absent and duplicate beacon counts once', async () => {
  delete process.env.TELEGRAM_BOT1_TOKEN;
  const body={visitor_id:visitor,event:'affiliate_click',event_id:event(1),game:'ice-fishing',button_id:'ice-play',button_label:'Играть',attribution:{source:'Facebook'},country:'CL'};
  assert.equal((await invoke(track,body)).code,200);
  assert.equal((await invoke(track,body)).body.duplicate,true);
  const state=await store.get('site:visitor:'+visitor);
  assert.equal(state.clicks,1); assert.equal(state.country,'CL'); assert.equal(state.source,'Facebook');
  assert.match(calls[0].body.text,/Играть/); assert.ok(calls.every(c=>c.url.includes('bottest-bot2')));
  assert.ok([...db.keys()].every(k=>!k.includes('partner:')));
});
test('all deposits deliver immediately; specific callback refines same message', async () => {
  const data=pb({transaction_id:'tx-1',amount:'100'});
  assert.equal((await invoke(allDeposits,data)).code,200); assert.equal(calls.length,1);
  assert.match(calls[0].body.text,/ДЕПОЗИТ/);
  assert.equal((await invoke(postback,{...data,type:'first_deposit'})).body.updated,true);
  assert.equal(calls[1].method,'editMessageText'); assert.match(calls[1].body.text,/ПЕРВЫЙ ДЕПОЗИТ/);
  assert.equal((await invoke(allDeposits,data)).body.duplicate,true); assert.equal(calls.length,2);
  assert.equal((await invoke(allDeposits,{...data,transaction_id:'tx-2'})).code,200);
  assert.equal(calls.filter(c=>c.method==='sendMessage').length,2);
});
test('callbacks without transaction IDs are accepted and exact repeats deduplicated', async () => {
  const data=pb({type:'first_deposit',date:'2026-10-18T12:00:00Z',amount:'10'});
  assert.equal((await invoke(postback,data)).code,200);
  assert.equal((await invoke(postback,data)).body.duplicate,true);
  assert.equal((await invoke(postback,{...data,event_id:'other',date:'2026-10-18T12:01:00Z'})).code,200);
  assert.equal(calls.length,2);
});
test('authentication, resolved player and wrapper type enforced for GET and POST', async () => {
  assert.equal((await invoke(postback,pb({secret:'wrong'}))).code,403);
  assert.equal((await invoke(postback,pb({user_id:'{user_id}'}))).code,400);
  assert.equal((await invoke(registration,pb({type:'redeposit'}))).code,200);
  assert.match(calls[0].body.text,/РЕГИСТРАЦИЯ/);
  const withdrawal=require('../api/postback/1win/withdrawal');
  assert.equal((await invoke(withdrawal,{}, {method:'GET',url:'/api/postback/1win/withdrawal?secret=test-secret&user_id=player-8&amount=10'})).code,200);
  assert.match(calls[1].body.text,/ВЫВОД/);
});
test('partner bot failures neither create site records nor block site actions', async () => {
  delete process.env.TELEGRAM_BOT1_TOKEN;
  assert.equal((await invoke(postback,pb())).code,503);
  assert.equal((await invoke(track,{visitor_id:visitor,event:'page_view',event_id:event(1)})).code,200);
  process.env.TELEGRAM_BOT1_TOKEN='test-bot1';
  assert.equal((await invoke(postback,pb())).code,200);
  assert.equal(calls.length,2); assert.match(calls[0].url,/bottest-bot2/);assert.match(calls[1].url,/bottest-bot1/);
});
test('crawlers ignored, real Facebook visitors retain source and trusted country', async () => {
  const body={visitor_id:visitor,event:'page_view',event_id:event(1),country:'BR'};
  assert.equal((await invoke(track,body,{headers:{'user-agent':'facebookexternalhit'}})).body.ignored,true);assert.equal(calls.length,0);
  assert.equal((await invoke(track,body,{headers:{host:'example.test','user-agent':'Mozilla [FBAN/FBIOS;FBAV/500]','x-vercel-ip-country':'CL'}})).code,200);
  const state=await store.get('site:visitor:'+visitor);assert.equal(state.source,'Facebook');assert.equal(state.country,'CL');
});
test('test postbacks are labelled and isolated from real event dedupe', async () => {
  await invoke(postback,pb({test:'1'}));await invoke(postback,pb());
  assert.equal(calls.length,2);assert.match(calls[0].body.text,/ТЕСТ/);assert.doesNotMatch(calls[1].body.text,/ТЕСТ/);
});

 test('partner source survives from registration to deposits without website visitor lookups',async()=>{
  assert.equal((await invoke(registration,pb({sub2:'fb1',country:'BR'}))).code,200);
  assert.equal((await invoke(postback,pb({type:'first_deposit',transaction_id:'source-fallback',amount:'20'}))).code,200);
  assert.match(calls[0].body.text,/Источник: Matias Gonzales/);
  assert.match(calls[1].body.text,/Источник: Matias Gonzales/);
  assert.ok(calls.every(c=>c.url.includes('bottest-bot1')));
  assert.equal([...db.keys()].some(key=>key.includes('site:visitor:')),false);
 });
