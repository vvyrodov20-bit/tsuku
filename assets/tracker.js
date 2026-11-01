(function (root) {
  'use strict';
  const validId = value => /^(?:v_|fp_)[A-Za-z0-9_-]{16,100}$/.test(value || '');
  const read = (area, key, fallback) => { try { return JSON.parse(root[area].getItem(key)) || fallback; } catch (_) { return fallback; } };
  const write = (area, key, value) => { try { root[area].setItem(key, JSON.stringify(value)); } catch (_) {} };
  const id = prefix => prefix + (crypto.randomUUID ? crypto.randomUUID() : Array.from(crypto.getRandomValues(new Uint8Array(16)), x => x.toString(16).padStart(2, '0')).join(''));
  const query = new URLSearchParams(location.search), prior = read('localStorage', 'hub_context', {});
  const legacy = read('localStorage', 'fp_tracking_context', {});
  const resume = query.get('visitor_id') || query.get('fp_click_id');
  const visitor = validId(resume) ? resume : validId(prior.visitor_id) ? prior.visitor_id : validId(legacy.click_id) ? legacy.click_id : id('v_');
  const code = (location.pathname.split('/').filter(Boolean)[0] || query.get('source_code') || '').toLowerCase();
  const sourceName = root.HubConfig.sources[code];
  let referrerHost = '';
  try { referrerHost = new URL(typeof document !== 'undefined' ? document.referrer : '').hostname; } catch (_) {}
  const ua = navigator.userAgent || '';
  const appSource = /Instagram/i.test(ua) ? 'Instagram' : /FBAN|FBAV|FB_IAB|FBIOS|FB4A/i.test(ua) ? 'Facebook' : /tiktok|musical_ly|musically|trill/i.test(ua) ? 'TikTok' : '';
  const refSource = /(^|\.)facebook\.com$|(^|\.)fb\.com$/i.test(referrerHost) ? 'Facebook' : /(^|\.)instagram\.com$/i.test(referrerHost) ? 'Instagram' : /(^|\.)tiktok\.com$/i.test(referrerHost) ? 'TikTok' : /(^|\.)youtube\.com$|^youtu\.be$/i.test(referrerHost) ? 'YouTube' : referrerHost && referrerHost !== location.hostname ? referrerHost : '';
  const explicitSource = sourceName || query.get('source') || query.get('utm_source') || appSource || refSource || (query.has('fbclid') ? 'Facebook' : query.has('ttclid') ? 'TikTok' : '');
  const clean = value => String(value || '').replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 100);
  const state = { ...(validId(resume) && resume !== prior.visitor_id ? {} : prior), visitor_id: visitor };
  if (explicitSource) { state.source = clean(explicitSource); state.source_code = sourceName ? code : clean(query.get('source_code')); }
  for (const [name, alias] of [['channel','utm_medium'], ['creative','utm_content'], ['campaign','utm_campaign'], ['content','utm_content']]) {
    state[name] = clean(query.get(name) || query.get(alias) || (explicitSource ? '' : state[name]));
  }
  state.referrer_host = referrerHost || state.referrer_host || '';
  state.source ||= 'Direct'; state.landing_page = location.pathname;
  write('localStorage', 'hub_context', state);
  // Consume a browser-transfer identity without leaving it in the shareable address bar.
  if (resume && /^https?:$/.test(location.protocol)) {
    const visible = new URL(location.href); visible.searchParams.delete('visitor_id'); visible.searchParams.delete('fp_click_id');
    try { history.replaceState(null, '', visible.href); } catch (_) {}
  }
  let queue = read('sessionStorage', 'hub_events', []).filter(e => e.visitor_id === visitor).slice(-60);
  let busy = false, started = false, retryAt = 0, timer;
  let context = { language: 'en', country: '', app: '' };
  const persistQueue = () => write('sessionStorage', 'hub_events', queue);
  function schedule(ms) { clearTimeout(timer); timer = setTimeout(flush, ms); }
  async function flush() {
    if (busy || !started || !queue.length || !/^https?:$/.test(location.protocol)) return;
    if (Date.now() < retryAt) { schedule(retryAt - Date.now()); return; }
    busy = true;
    try {
      while (queue.length) {
        const response = await fetch('/api/track', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'same-origin',
          body: JSON.stringify(queue[0]), signal: AbortSignal.timeout(20000), keepalive: true,
        });
        if (!response.ok) {
          if (response.status >= 500 || response.status === 429) {
            retryAt = Date.now() + Math.max(3000, Number(response.headers.get('Retry-After') || 5) * 1000); break;
          }
          queue.shift(); persistQueue(); continue;
        }
        const result = await response.json();
        if (result.visitor_number) { state.visitor_number = result.visitor_number; write('localStorage', 'hub_context', state); }
        queue.shift(); persistQueue();
      }
    } catch (_) { retryAt = Date.now() + 8000; }
    finally { busy = false; if (queue.length) schedule(Math.max(1500, retryAt - Date.now())); }
  }
  function track(event, extra = {}) {
    if (!started || !/^https?:$/.test(location.protocol)) return;
    queue.push({ event, event_id: id('evt_'), visitor_id: visitor, attribution: { ...state }, ...context, ...extra });
    if (queue.length > 60) queue.splice(1, queue.length - 60);
    persistQueue(); void flush();
  }
  const GAME_AFFILIATE_URLS = Object.freeze({
    "falling-pickaxe": "https://lkzh.cc/ebac",
    "ice-fishing": "https://lkuf.cc/339b76",
    "tower-rush": "https://lkuf.cc/6561aa49",
    "cash-farming": "https://lkcq.cc/dd88"
});
  function affiliateURL(game) {
    const url = new URL(GAME_AFFILIATE_URLS[Object.hasOwn(GAME_AFFILIATE_URLS, game) ? game : 'falling-pickaxe']);
    return url.href;
  }
  function externalURL() { return affiliateURL(); }
  root.HubTracker = {
    track, affiliateURL, externalURL,
    start(value) { context = { ...context, ...value }; if (!started) { started = true; track('page_view'); } },
    update(value) { context = { ...context, ...value }; },
    getContext: () => ({ ...state, ...context }),
  };
  root.addEventListener('online', () => { retryAt = 0; void flush(); });
  root.addEventListener('pagehide', () => {
    // Repeat the SAME event IDs: fetch, beacon, reloads and concurrent tabs are deduplicated server-side.
    for (const item of queue.slice(0, 12)) {
      try { navigator.sendBeacon('/api/track', new Blob([JSON.stringify(item)], { type: 'application/json' })); } catch (_) {}
    }
  });
})(window);
