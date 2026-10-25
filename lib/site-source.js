'use strict';
const { sources } = require('../assets/catalog');
const { clean } = require('./telegram-client');
function platformName(value) {
  const v = String(value || '').trim().toLowerCase();
  const label = v.split(' · ')[0];
  const aliases = { facebook: 'Facebook', fb: 'Facebook', instagram: 'Instagram', ig: 'Instagram', tiktok: 'TikTok', tt: 'TikTok', youtube: 'YouTube', yt: 'YouTube', twitter: 'X / Twitter', x: 'X / Twitter', 'x / twitter': 'X / Twitter', telegram: 'Telegram', tg: 'Telegram' };
  if (aliases[label]) return aliases[label];
  if (/instagram/.test(v) && /mozilla|instagram[ /][0-9]/.test(v)) return 'Instagram';
  if (/fb_iab|fban|fbav|fbios|fb4a/.test(v)) return 'Facebook';
  if (/tiktok[ /]|musical_ly|musically|trill/.test(v)) return 'TikTok';
  let host = '';
  try { host = new URL(v.includes('://') ? v : 'https://' + v).hostname; } catch (_) {}
  for (const [platform, domains] of Object.entries({
    Facebook: ['facebook.com', 'fb.com', 'fb.me'], Instagram: ['instagram.com'],
    TikTok: ['tiktok.com'], YouTube: ['youtube.com', 'youtu.be'],
    'X / Twitter': ['twitter.com', 'x.com', 't.co'], Telegram: ['telegram.org', 't.me'],
  })) if (domains.some(domain => host === domain || host.endsWith('.' + domain))) return platform;
  if (/^(?:www\.)?(google\.[a-z.]+|bing\.com|yandex\.[a-z.]+)$/.test(host)) return 'Поиск · ' + host;
  return '';
}
function sourceDetails(state) {
  const a = state.attribution || {};
  const source = sources[a.source_code] || state.source || 'Direct';
  const platform = platformName(source) || platformName(a.platform) || platformName(a.referrer_host);
  const parts = source.split(' · ');
  let name = 'Не определено';
  if (parts.length > 1 && platformName(parts[0])) name = parts.slice(1).join(' · ');
  else if (!/^(direct|unknown)$/i.test(source) && !platformName(source) && !/^(https?:\/\/|[\w.-]+\.[a-z]{2,}(?:[/:]|$))/i.test(source)) name = source;
  return { platform: platform || (/^(direct|unknown)$/i.test(source) ? 'Прямой / источник скрыт' : 'Другой сайт'), name };
}
function attribution(raw, req, app) {
  const a=raw && typeof raw==='object' && !Array.isArray(raw)?raw:{};
  const result={};
  for(const key of ['source','source_code','source_name','channel','creative','campaign','content','landing_page','referrer_host'])result[key]=clean(a[key],160);
  const known=sources[result.source_code] || sources[result.source];
  if(known){result.source=known;result.platform=platformName(known);return result;}
  if(result.source && !/^(direct|unknown)$/i.test(result.source)){result.platform=platformName(result.source)||platformName(app)||platformName(req.headers['user-agent'])||platformName(result.referrer_host);return result;}
  let ref='';
  try { ref=new URL(result.referrer_host?'https://'+result.referrer_host:req.headers.referer).hostname; } catch(_){}
  const detected=platformName(app)||platformName(req.headers['user-agent'])||platformName(ref);
  result.platform=detected;
  result.source=detected || (ref && ref!==String(req.headers.host).split(':')[0] ? ref : 'Direct');
  return result;
}
const CRAWLER=/(?:facebookexternalhit|facebot|facebookbot|meta-externalagent|meta-externalfetcher|meta-externalads|meta-webindexer|headlesschrome|googlebot|bingbot)/i;
function automated(req){return CRAWLER.test(req.headers['user-agent']||'')||['purpose','sec-purpose','x-purpose'].some(k=>/prefetch|preview|prerender/i.test(req.headers[k]||''));}
module.exports={attribution,automated,platformName,sourceDetails};
