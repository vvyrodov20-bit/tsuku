'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto').webcrypto;
const utils = require('../assets/browser-utils');
const config = require('../assets/catalog');
const root = path.resolve(__dirname, '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
function storage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return { getItem: key => map.get(key) || null, setItem: (key, value) => map.set(key, value) };
}
function trackerSession({ url = 'https://games.test/tt1', local = storage(), session = storage(), blocked = false } = {}) {
  const sent = [], beacons = [], listeners = {}, timers = [];
  const sandbox = { URL, URLSearchParams, crypto, Blob, AbortSignal, location: new URL(url), console, HubConfig: config, localStorage: local, sessionStorage: session,
    history: { replaceState: (_, __, href) => { sandbox.location = new URL(href); } },
    navigator: { sendBeacon: (href, body) => { beacons.push({ href, body }); return true; } },
    fetch: async (href, options) => { sent.push({ href, payload: JSON.parse(options.body) }); if (blocked) throw new Error('offline'); return new Response(JSON.stringify({ ok: true, visitor_number: 42 })); },
    setTimeout: callback => { timers.push(callback); return timers.length; }, clearTimeout: () => {}, addEventListener: (type, listener) => { listeners[type] = listener; },
  };
  sandbox.window = sandbox; vm.createContext(sandbox); vm.runInContext(read('assets/tracker.js'), sandbox);
  return { sandbox, tracker: sandbox.HubTracker, sent, beacons, listeners, timers, local, session };
}
const settled = () => new Promise(resolve => setImmediate(resolve));
test('all 42 original locales have complete catalog, account and browser-gate translations', () => {
  const sandbox = { window: {} }; vm.createContext(sandbox);
  vm.runInContext(read('assets/locales.js'), sandbox); vm.runInContext(read('assets/payment-locales.js'), sandbox); vm.runInContext(read('assets/hub-translations.js'), sandbox);
  const { HubMeta: meta, HubLocales: locales, HubCopy: copy } = sandbox.window;
  assert.equal(Object.keys(meta).length, 42);
  const html = read('index.html'), keys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
  for (const locale of Object.keys(meta)) {
    assert.equal(copy[locale].length, 6, locale);
    for (const text of copy[locale]) assert.ok(text && typeof text === 'string');
    for (const key of ['guide1','guide2','guide3','guide4','guide5','reviewsPool','heroDesc','mechHeader']) assert.ok(locales[locale][key], locale+':'+key);
    for (const key of keys) assert.ok(locales[locale][key], locale + ':' + key);
    assert.ok(locales[locale].ttTopCardSub.includes('{app}'), locale);
    assert.equal(meta[locale].direction, ['ar','ur','he'].includes(locale) ? 'rtl' : 'ltr');
  }
  assert.equal(utils.normalizeLocale('pt_BR', meta), 'pt-BR');
  assert.equal(utils.normalizeLocale('es-CL', meta), 'es');
  assert.equal(utils.normalizeLocale('zh-Hant-HK', meta), 'zh-HK');
});
test('gate recognizes TikTok, Facebook, Instagram; ordinary browser and generic webview remain open', () => {
  const cases = [
    ['Mozilla/5.0 (iPhone) musical_ly_2026', 'TikTok'], ['Mozilla/5.0 Android TikTok/42', 'TikTok'],
    ['Mozilla/5.0 (iPhone) [FBAN/FBIOS;FBAV/500.0]', 'Facebook'], ['Mozilla/5.0 Android [FB_IAB/FB4A;FBAV/500]', 'Facebook'],
    ['Mozilla/5.0 (iPhone) Instagram 400.0', 'Instagram'], ['Mozilla/5.0 Android Instagram 400.0', 'Instagram'],
    ['Mozilla/5.0 (iPhone) Version/18 Safari/605.1', null], ['Mozilla/5.0 Android Chrome/150.0 Safari/537.36', null],
    ['Mozilla/5.0 Android; wv) Chrome/150 ByteDanceWebview', null],
  ];
  for (const [ua, expected] of cases) assert.equal(utils.detectApp(ua), expected, ua);
  assert.equal(utils.platform('Mozilla/5.0 Macintosh', 5), 'ios');
  assert.equal(utils.platform('Mozilla/5.0 Android'), 'android');
});
test('Android intent keeps attribution, has no in-app bypass and rejects unsupported protocols', () => {
  const intent = utils.androidIntent('https://games.test/fb1?visitor_id=v_1234567890123456&creative=fish#games');
  assert.ok(intent.startsWith('intent://games.test/fb1?visitor_id=')); assert.match(intent, /creative=fish/);
  assert.match(intent, /package=com.android.chrome;end$/); assert.doesNotMatch(intent, /browser_fallback_url|tt_external|#games/);
  assert.equal(utils.androidIntent('javascript:alert(1)'), null);
});
test('home keeps vertical games, bonus before activity, original tabs and Telegram channel', () => {
  const html = read('index.html');
  assert.equal([...html.matchAll(/class="game-card /g)].length, 3);
  for (const game of config.games) {
    assert.ok(html.includes(`data-game="${game.id}"`)); assert.ok(fs.existsSync(path.join(root, game.image)));
  }
  assert.doesNotMatch(html, /mineBlock|oreBlockWrapper|winModal|sync-timer/);
  for (const id of ['page-rules','page-deposit','page-reviews','bonus-section','wins-section','winsRows','onlineCount','reviewsGrid','paymentMethod','countrySelect']) assert.ok(html.includes('id="'+id+'"'));
  assert.ok(html.indexOf('id="bonus-section"') < html.indexOf('id="wins-section"'));
  assert.doesNotMatch(html, /tickerTrack|live-ticker-container/);
  assert.match(html, /https:\/\/t.me\/towerrush_casino/);
  assert.match(read('assets/theme.css'), /\.game-grid\{display:grid;grid-template-columns:minmax\(0,1fr\)/);
  for (const [, src] of html.matchAll(/(?:src|href)="(assets\/[^"?#]+)"/g)) assert.ok(fs.existsSync(path.join(root, src)), src);
});
test('all 42 locales fully translate new UI and both official game summaries without fallback', () => {
  const sandbox = { window: {} }; vm.createContext(sandbox);
  vm.runInContext(read('assets/locales.js'), sandbox); vm.runInContext(read('assets/upgrade-locales.js'), sandbox);
  const { HubMeta: meta, HubUpgradeLocales: locales, HubUpgradeKeys: keys } = sandbox.window;
  assert.deepEqual(Object.keys(locales).sort(), Object.keys(meta).sort());
  const used = [...read('index.html').matchAll(/data-v3="([^"]+)"/g)].map(match => match[1]);
  for (const [locale, data] of Object.entries(locales)) {
    for (const key of [...keys,...used]) assert.ok(typeof data.ui[key] === 'string' && data.ui[key].trim(), locale+':'+key);
    assert.equal(data.tower.length,6); assert.equal(data.ice.length,5);
    for (const content of [...data.tower,...data.ice]) assert.ok(content.length>10,locale);
    assert.ok(data.tower[4].includes('Frozen Floor') && data.tower[4].includes('Triple Build'),locale);
    assert.ok(data.ice[1].includes('Leaf 1') && data.ice[1].includes('All Bonuses'),locale);
    assert.ok(data.ice[2].includes('×10'),locale);
    if (locale!=='en') {assert.notEqual(data.tower[0],locales.en.tower[0],locale);assert.notEqual(data.ice[0],locales.en.ice[0],locale);}
  }
});
test('browser identity stays private while direct links carry the known source', async () => {
  const first = trackerSession(); first.tracker.start({ language: 'pt-BR', country: 'BR', app: 'TikTok' }); await settled();
  assert.equal(first.tracker.externalURL('pt-BR'), 'https://lkzh.cc/ebac?sub2=tt1');
  const reload = trackerSession({ local: first.local, url: 'https://games.test/' });
  assert.equal(reload.tracker.getContext().visitor_id, first.tracker.getContext().visitor_id);
  assert.notEqual(trackerSession().tracker.getContext().visitor_id, first.tracker.getContext().visitor_id);
});
test('each game keeps its exact direct URL across sources, countries and language changes', () => {
  const expected = { 'falling-pickaxe': 'https://lkzh.cc/ebac', 'ice-fishing': 'https://lkuf.cc/339b76', 'tower-rush': 'https://lkuf.cc/6561aa49' };
  for (const source of ['tt1','tt2','ig1','fb1']) {
    const current = trackerSession({ url: 'https://games.test/'+source+'?creative=ice_02&channel=reels&country=BR' });
    for (const language of ['ru','en','es','pt-BR']) {
      current.tracker.update({language,country:'BR'});
      for (const [game,url] of Object.entries(expected)) assert.equal(current.tracker.affiliateURL(game,'play'),url+'?sub2='+source);
      assert.equal(current.tracker.affiliateURL(),expected['falling-pickaxe']+'?sub2='+source);
      assert.equal(current.tracker.externalURL(language),expected['falling-pickaxe']+'?sub2='+source);
    }
  }
  assert.equal(fs.existsSync(path.join(root,'api/go/1win.js')),false);
  assert.ok(!JSON.parse(read('vercel.json')).rewrites.some(r=>r.source==='/go/1win'));
});
test('fetch, beacon and reload retries retain the same event ID', async () => {
  const first = trackerSession({ blocked: true }); first.tracker.start({ language: 'es' }); await settled();
  first.listeners.pagehide(); assert.equal(first.beacons.length, 1);
  const fromBeacon = JSON.parse(await first.beacons[0].body.text());
  assert.equal(first.sent[0].payload.event_id, fromBeacon.event_id);
  const reload = trackerSession({ local: first.local, session: first.session }); reload.tracker.start({ language: 'es' }); await settled();
  assert.equal(reload.sent[0].payload.event_id, fromBeacon.event_id);
});
test('storage unavailable still works in memory; local HTML never calls the tracking backend', async () => {
  const unavailable = { getItem() { throw new Error('disabled'); }, setItem() { throw new Error('disabled'); } };
  const first = trackerSession({ local: unavailable, session: unavailable }); first.tracker.start({ language: 'en' }); await settled(); assert.equal(first.sent.length, 1);
  const local = trackerSession({ url: 'file:///tmp/index.html' }); local.tracker.start({ language: 'ru' }); await settled(); assert.equal(local.sent.length, 0);
});
