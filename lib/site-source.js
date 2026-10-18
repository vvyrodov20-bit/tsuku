'use strict';
const { sources } = require('../assets/catalog');
const { clean } = require('./telegram-client');
const platformName = value => {
  const v=String(value||'').toLowerCase();
  if(/facebook|fb_iab|fban|fbav|fbios|fb4a|(^|\.)fb\.(com|me)$/.test(v))return 'Facebook';
  if(/instagram/.test(v))return 'Instagram';
  if(/tiktok|musical_ly|musically|trill/.test(v))return 'TikTok';
  if(/youtube|youtu\.be/.test(v))return 'YouTube';
  if(/telegram|(^|\.)t\.me$/.test(v))return 'Telegram';
  if(/(^|\.)(google\.[a-z.]+|bing\.com|yandex\.[a-z.]+)$/.test(v))return 'Поиск · '+v;
  return '';
};
function attribution(raw, req, app) {
  const a=raw && typeof raw==='object' && !Array.isArray(raw)?raw:{};
  const result={};
  for(const key of ['source','source_code','source_name','channel','creative','campaign','content','landing_page','referrer_host'])result[key]=clean(a[key],160);
  const known=sources[result.source_code] || sources[result.source];
  if(known){result.source=known;return result;}
  if(result.source && !/^(direct|unknown)$/i.test(result.source))return result;
  let ref='';
  try { ref=new URL(result.referrer_host?'https://'+result.referrer_host:req.headers.referer).hostname; } catch(_){}
  const detected=platformName(app)||platformName(req.headers['user-agent'])||platformName(ref);
  result.source=detected || (ref && ref!==String(req.headers.host).split(':')[0] ? ref : 'Direct');
  return result;
}
const CRAWLER=/(?:facebookexternalhit|facebot|facebookbot|meta-externalagent|meta-externalfetcher|meta-externalads|meta-webindexer|headlesschrome|googlebot|bingbot)/i;
function automated(req){return CRAWLER.test(req.headers['user-agent']||'')||['purpose','sec-purpose','x-purpose'].some(k=>/prefetch|preview|prerender/i.test(req.headers[k]||''));}
module.exports={attribution,automated};
