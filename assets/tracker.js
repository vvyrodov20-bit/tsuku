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
  const code = location.pathname.split('/').filter(Boolean)[0] || query.get('source_code') || '';
  const sourceName = root.HubConfig.sources[code];
  const explicitSource = sourceName || query.get('source') || query.get('utm_source');
  const clean = value => String(value || '').replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 100);
  const state = { ...(validId(resume) && resume !== prior.visitor_id ? {} : prior), visitor_id: visitor };
  if (explicitSource) { state.source = clean(explicitSource); state.source_code = sourceName ? code : clean(query.get('source_code')); }
  for (const [name, alias] of [['channel','utm_medium'], ['creative','utm_content'], ['campaign','utm_campaign'], ['content','utm_content']]) {
    state[name] = clean(query.get(name) || query.get(alias) || (explicitSource ? '' : state[name]));
  }
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
  function affiliateURL(game, button) {
    const params = new URLSearchParams({ visitor_id: visitor, click_id: id('fp_'), button: button || game || 'register' });
    if (game) params.set('game', game);
    for (const key of ['source', 'source_code', 'channel', 'creative', 'campaign', 'content', 'landing_page']) if (state[key]) params.set(key, state[key]);
    if (context.language) params.set('language', context.language);
    if (context.country) params.set('country', context.country);
    return '/go/1win?' + params;
  }
  function externalURL(language) {
    const url = new URL(location.href);
    url.searchParams.set('visitor_id', visitor);
    url.searchParams.set('lang', language);
    for (const key of ['source', 'source_code', 'channel', 'creative', 'campaign', 'content']) if (state[key]) url.searchParams.set(key, state[key]);
    url.searchParams.delete('tt_external'); url.searchParams.delete('fp_new_session');
    return url.href;
  }
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
