'use strict';
const { sources } = require('../assets/catalog');
const { clean } = require('./telegram-client');
const strip = value => String(value || '').replace(/^Facebook (?:group|profile|page) · /, '').replace(/^Facebook · /, '');
const valueOf = value => {
  const text = clean(value, 350).trim();
  return /^\{.*\}$/.test(text) ? '' : text;
};
function knownSource(value) {
  const text = valueOf(value);
  let code = text.toLowerCase();
  if (/^https?:\/\//i.test(text)) {
    try {
      const url = new URL(text);
      if (!['gameselect.vercel.app','falling-pickaxe-1win.vercel.app','tsuku-bastard-gang.vercel.app'].includes(url.hostname)) return '';
      code = (url.searchParams.get('source_code') || url.searchParams.get('sub2') || url.pathname.replace(/^\/|\/$/g, '')).toLowerCase();
    } catch (_) { return ''; }
  }
  if (Object.hasOwn(sources, code)) return strip(sources[code]);
  const entry = Object.entries(sources).find(([, title]) => [title, strip(title)].some(name => name.toLowerCase() === text.toLowerCase()));
  return entry ? strip(entry[1]) : '';
}
function sourceTitle(data) {
  for (const key of ['source_code','sub2','sub1','source_name','hash_name','source_id','hash_id']) {
    const title = knownSource(data[key]);
    if (title) return title;
  }
  for (const key of ['source_name','hash_name']) {
    const text = valueOf(data[key]);
    if (text && !/https?:\/\/|^\d+$|^(?:tt|ig|fb|ctg)\d+$/i.test(text)) return text;
  }
  return '';
}
module.exports = { knownSource, sourceTitle };
