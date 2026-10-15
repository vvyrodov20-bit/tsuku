(function(root) {
'use strict';
  function normalizeLocale(value, meta) {
    const code = String(value || '').replace(/_/g, '-').toLowerCase();
    const exact = Object.keys(meta).find(key => key.toLowerCase() === code);
    if (exact) return exact;
    if (/^zh-(hant-)?(hk|mo)/.test(code)) return 'zh-HK';
    if (/^zh-(hant|tw)/.test(code)) return 'zh-TW';
    if (/^(tl|fil)(-|$)/.test(code)) return 'fil';
    if (/^iw(-|$)/.test(code)) return 'he';
    return Object.hasOwn(meta, code.split('-')[0]) ? code.split('-')[0] : null;
  }
  function detectApp(ua = '') {
    if (/Instagram/i.test(ua)) return 'Instagram';
    if (/FBAN|FBAV|FB_IAB|FBIOS|FB4A/i.test(ua)) return 'Facebook';
    if (/(?:musical_ly|musically|trill|tiktok)(?:[\/\s;_\d)]|$)/i.test(ua)) return 'TikTok';
    return null;
  }
  function platform(ua = '', maxTouchPoints = 0) {
    return /android/i.test(ua) ? 'android' : /iphone|ipad|ipod/i.test(ua) || (/Macintosh/.test(ua) && maxTouchPoints > 1) ? 'ios' : 'desktop';
  }
  function androidIntent(href) {
    const url = new URL(href);
    if (!/^https?:$/.test(url.protocol)) return null;
    return `intent://${url.host}${url.pathname}${url.search}#Intent;scheme=${url.protocol.slice(0, -1)};action=android.intent.action.VIEW;package=com.android.chrome;end`;
  }

const api = {normalizeLocale, detectApp, platform, androidIntent};
if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.HubBrowser = api;
})(typeof window !== 'undefined' ? window : globalThis);
