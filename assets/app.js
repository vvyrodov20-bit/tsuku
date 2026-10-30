(function (root) {
  'use strict';
  const { games } = root.HubConfig;
  const meta = root.HubMeta, geo = root.HubGeo, copyKeys = ['games', 'heading', 'intro', 'open', 'hint', 'guide'];
  const query = new URLSearchParams(location.search), $ = id => document.getElementById(id);
  const normalizeLocale = value => root.HubBrowser.normalizeLocale(value, meta);
  const detectApp = (ua = navigator.userAgent || '') => root.HubBrowser.detectApp(ua);
  const platform = () => root.HubBrowser.platform(navigator.userAgent || '', navigator.maxTouchPoints);
  const androidIntent = root.HubBrowser.androidIntent;
  function savedLocale() { try { return normalizeLocale(localStorage.getItem('fp_locale')); } catch (_) { return null; } }
  const browser = (navigator.languages || [navigator.language]).map(normalizeLocale).find(Boolean);
  let explicit = normalizeLocale(query.get('lang')), saved = savedLocale();
  const validCountry = value => typeof value === 'string' && Object.hasOwn(geo, value.toUpperCase()) && geo[value.toUpperCase()].currency ? value.toUpperCase() : '';
  let manualCountry = validCountry(query.get('country'));
  if (!manualCountry) { try { manualCountry = validCountry(localStorage.getItem('hub_country')); } catch (_) {} }
  let detectedCountry = '', country = manualCountry, language = explicit || saved || geo[country]?.locale || browser || 'en', page = 'games';
  const app = detectApp();
  const t = key => String(root.HubLocales[language]?.[key] || root.HubLocales.en[key] || key).replaceAll('{app}', app || '');
  const c = key => (root.HubCopy[language] || root.HubCopy.en)[copyKeys.indexOf(key)];
  const u = key => root.HubUpgradeLocales[language].ui[key];
  function renderCountry() {
    let names; try { names = new Intl.DisplayNames([language], {type:'region'}); } catch (_) {}
    const regionName = code => { try { return names?.of(code) || code; } catch (_) { return code; } };
    const autoCurrency = root.HubActivityUtils.currencyFor(detectedCountry);
    const automatic = u('auto') + ' · ' + (detectedCountry ? regionName(detectedCountry) + ' · ' : '') + autoCurrency;
    for (const id of ['countrySelect','depositCountrySelect']) {
      const select = $(id); select.replaceChildren();
      select.add(new Option(automatic, ''));
      Object.entries(geo).filter(([,item]) => item.currency).map(([code,item]) => ({code,label:regionName(code)+' · '+item.currency})).sort((a,b) => a.label.localeCompare(b.label,language)).forEach(item => select.add(new Option(item.label,item.code)));
      select.value = manualCountry;
      select.setAttribute('aria-label',u('region'));
    }
  }
  function refreshLinks() {
    document.querySelectorAll('[data-game]').forEach(link => { link.href = root.HubTracker.affiliateURL(link.dataset.game); });
    document.querySelectorAll('[data-register]').forEach(link => { link.href = root.HubTracker.affiliateURL('', link.dataset.trackId || 'register'); });
    $('externalLink').value = root.HubTracker.externalURL(language);
  }
  function render() {
    document.documentElement.lang = language;
    document.documentElement.dir = meta[language].direction;
    $('langSelect').value = language;
    $('langSelect').setAttribute('aria-label', t('languageLabel'));
    document.querySelector('.nav').setAttribute('aria-label', c('games'));
    document.querySelectorAll('[data-copy]').forEach(node => { node.textContent = c(node.dataset.copy); });
    document.querySelectorAll('[data-i18n]').forEach(node => { node.innerHTML = t(node.dataset.i18n); });
    document.querySelectorAll('[data-v3]').forEach(node => { node.textContent = u(node.dataset.v3); });
    for (const attr of ['alt','title','aria-label','placeholder']) {
      document.querySelectorAll('[data-i18n-'+attr+']').forEach(node => node.setAttribute(attr,t(node.getAttribute('data-i18n-'+attr))));
    }
    root.HubLegacy.render({ language, country });
    root.HubRules.render(language);
    root.HubActivity.render({ language, country });
    renderCountry();
    $('copyPromo').title = u('copy') + ': PROMOKODE2026';
    document.title = 'Game Select — Falling Pickaxe, Ice Fishing, Tower Rush, Cash Farming';
    $('metaDescription').content = games.map(g => g.name).join(', ') + ' — GAME SELECT.';
    $('externalLink').setAttribute('aria-label', t('ttMenuCopy'));
    root.HubTracker.update({ language, country, app: app || '' });
    refreshLinks();
  }
  function showPage(value, shouldTrack = true) {
    if (!['games', 'rules', 'deposit', 'reviews'].includes(value)) return;
    page = value;
    document.querySelectorAll('.page').forEach(node => { node.hidden = node.id !== 'page-' + page; });
    document.querySelectorAll('.nav-item').forEach(node => {
      node.classList.toggle('active', node.dataset.page === page);
      if (node.dataset.page === page) node.setAttribute('aria-current', 'page'); else node.removeAttribute('aria-current');
    });
    if (page === 'reviews') root.HubLegacy.renderReviews();
    if (shouldTrack) { root.HubTracker.track('tab_' + page); root.scrollTo({top:0,behavior:'smooth'}); }
  }
  for (const [value, info] of Object.entries(meta)) {
    const option = new Option(info.language, value); option.lang = value; option.dir = info.direction; $('langSelect').add(option);
  }
  $('langSelect').addEventListener('change', event => {
    language = normalizeLocale(event.target.value) || 'en'; explicit = language;
    try { localStorage.setItem('fp_locale', language); const url = new URL(location.href); if (url.searchParams.has('lang')) { url.searchParams.set('lang', language); history.replaceState(null, '', url.href); } } catch (_) {}
    render(); root.HubTracker.track('language_change');
  });
  for (const id of ['countrySelect','depositCountrySelect']) $(id).addEventListener('change', event => {
    manualCountry = validCountry(event.target.value); country = manualCountry || detectedCountry;
    try {
      localStorage.setItem('hub_country', manualCountry);
      const url = new URL(location.href);
      if (manualCountry) url.searchParams.set('country', manualCountry); else url.searchParams.delete('country');
      history.replaceState(null, '', url.href);
    } catch (_) {}
    render(); root.HubTracker.track('country_change');
  });
  $('copyPromo').addEventListener('click', async () => {
    let copied = false;
    try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText('PROMOKODE2026'); copied = true; } } catch (_) {}
    if (!copied) {
      const field = document.createElement('textarea'); field.value = 'PROMOKODE2026'; field.className = 'sr-only';
      document.body.append(field); field.focus(); field.select();
      try { copied = document.execCommand('copy'); } catch (_) {}
      field.remove(); $('copyPromo').focus();
    }
    $('promoStatus').textContent = copied ? u('copied') : 'PROMOKODE2026';
    if (copied) {
      $('copyPromo').classList.add('copied'); $('copyPromo').firstElementChild.textContent = u('copied');
      root.HubTracker.track('promo_copy');
      setTimeout(() => { $('copyPromo').classList.remove('copied'); $('copyPromo').firstElementChild.textContent = u('promoCode'); }, 2200);
    }
  });
  document.querySelectorAll('[data-page]').forEach(button => button.addEventListener('click', () => showPage(button.dataset.page)));
  document.querySelector('.brand').addEventListener('click', event => { event.preventDefault(); showPage('games'); });
  // Each game uses its fixed direct affiliate URL.
  document.addEventListener('click', event => {
    if (event.target.closest?.('[data-telegram]')) root.HubTracker.track('telegram_click');
    const link = event.target.closest?.('[data-game], [data-register]');
    if (!link) return;
    link.href = root.HubTracker.affiliateURL(link.dataset.game || '', link.dataset.game || link.dataset.trackId || 'register');
    root.HubTracker.track('affiliate_click', { game: link.dataset.game || '', button_id: link.dataset.trackId || link.dataset.game || 'register', button_label: (link.textContent || '').trim().slice(0, 100) });
  });
  document.addEventListener('auxclick', event => {
    const link = event.target.closest?.('[data-game], [data-register]');
    if (link && event.button === 1) {
      link.href = root.HubTracker.affiliateURL(link.dataset.game || '', link.dataset.game || link.dataset.trackId || 'register');
      root.HubTracker.track('affiliate_click', { game: link.dataset.game || '', button_id: link.dataset.trackId || link.dataset.game || 'register', button_label: (link.textContent || '').trim().slice(0, 100) });
    }
  });
  $('copyLink').addEventListener('click', async () => {
    const value = root.HubTracker.externalURL(language); let copied = false;
    try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(value); copied = true; } } catch (_) {}
    if (!copied) {
      const field = $('externalLink'); field.hidden = false; field.value = value; field.focus(); field.select(); field.setSelectionRange(0, value.length);
      try { copied = document.execCommand('copy'); } catch (_) {}
    }
    $('gateStatus').textContent = t(copied ? 'ttCopied' : 'ttCopyManual');
    if (copied) root.HubTracker.track('copy_link');
  });
  render();
  const showTikTokGate = app === 'TikTok';
  document.body.classList.toggle('in-app', showTikTokGate);
  $('siteApp').hidden = showTikTokGate; $('siteApp').inert = showTikTokGate;
  $('inAppGate').hidden = !showTikTokGate; $('appBadge').textContent = app || '';
  $('bootScreen').hidden = true;
  showPage(location.hash.slice(1), false);
  // No external GEO service and no blocking loader. Local HTML also works without an API.
  async function initialize() {
    if (/^https?:$/.test(location.protocol)) {
      try {
        const response = await fetch('/api/geo', { signal: AbortSignal.timeout(1500) });
        const data = response.ok ? await response.json() : {};
        if (/^[A-Z]{2}$/.test(data.country || '')) detectedCountry = data.country;
        country = manualCountry || detectedCountry;
        if (!explicit && !saved) language = geo[country]?.locale || browser || 'en';
      } catch (_) {}
    }
    render(); root.HubTracker.start({ language, country, app: app || '' });
  }
  // Start the SDK immediately so fast taps before the GEO response are also kept.
  root.HubTracker.start({ language, country, app: app || '' });
  void initialize();
  root.HubApp = { detectApp, platform, normalizeLocale, androidIntent, showPage, getState: () => ({ language, country, manualCountry, app, page }) };
})(window);
