const { clean, htmlEscape } = require('./telegram');

const FIELDS = [
  'event_id', 'date', 'hash_id', 'hash_name', 'source_id', 'source_name',
  'amount', 'transaction_id', 'country', 'user_id',
  'sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9', 'sub10'
];

function pick(source, key) {
  const value = source?.[key];
  return value === undefined || value === null ? '' : String(value);
}

function normalizeOneWin(input = {}) {
  const out = {};
  for (const field of FIELDS) out[field] = clean(pick(input, field), 1000);
  return out;
}

function detectClickId(event) {
  for (let i = 1; i <= 10; i += 1) {
    const value = event[`sub${i}`];
    if (/^fp_[A-Za-z0-9_-]{8,80}$/.test(value)) return value;
  }
  return '';
}

function labelForType(type) {
  const value = String(type || '').toLowerCase().replace(/[_-]+/g, ' ');
  if (value === 'registration' || value === 'register' || value === 'reg') return 'REGISTRATION';
  if (value === 'first deposit' || value === 'firstdeposit' || value === 'ftd' || value === 'first') return 'FIRST DEPOSIT';
  if (value === 'redeposit' || value === 're deposit' || value === 'repeat deposit' || value === 'repeat') return 'RE-DEPOSIT';
  return '1WIN EVENT';
}

function formatDate(value) {
  if (!value) return '—';
  const n = Number(value);
  if (!Number.isFinite(n)) return clean(value, 100);
  const ms = n < 100000000000 ? n * 1000 : n;
  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return clean(value, 100);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false, timeZone: process.env.TELEGRAM_TIMEZONE || 'UTC',
  }).format(d);
}

function countryName(code) {
  const c = String(code || '').toUpperCase();
  try {
    const display = new Intl.DisplayNames(['en'], { type: 'region' });
    return display.of(c) || c || '—';
  } catch (_) {
    return c || '—';
  }
}

function flag(code) {
  const c = String(code || '').toUpperCase();
  if (!/^[A-Z]{2}$/.test(c)) return '🌍';
  return String.fromCodePoint(...[...c].map(ch => 127397 + ch.charCodeAt(0)));
}

function formatOneWinTelegram(event, type) {
  const e = normalizeOneWin(event);
  const label = labelForType(type || event.event_type || event.type);
  const lines = [
    label === 'REGISTRATION' ? '🟢 <b>REGISTRATION</b>' :
    label === 'FIRST DEPOSIT' ? '💰 <b>FIRST DEPOSIT</b>' :
    label === 'RE-DEPOSIT' ? '🔁 <b>RE-DEPOSIT</b>' :
    '📡 <b>1WIN EVENT</b>',
    '',
    `🌍 <b>COUNTRY</b>\n${flag(e.country)} ${htmlEscape(countryName(e.country))}${e.country ? ` (${htmlEscape(e.country.toUpperCase())})` : ''}`,
    '',
    `👤 <b>PLAYER</b>\n${htmlEscape(e.user_id || '—')}`,
  ];

  if (e.amount) lines.push('', `💵 <b>AMOUNT</b>\n${htmlEscape(e.amount)}`);
  if (e.source_name) lines.push('', `🔗 <b>SOURCE</b>\n${htmlEscape(e.source_name)}`);
  if (e.hash_name) lines.push('', `🔗 <b>LINK</b>\n${htmlEscape(e.hash_name)}`);

  const clickId = detectClickId(e);
  if (clickId) lines.push('', `🆔 <b>CLICK ID</b>\n<code>${htmlEscape(clickId)}</code>`);

  lines.push('', `🕐 <b>TIME</b>\n${htmlEscape(formatDate(e.date))}`);

  // Keep technical fields available without cluttering the main message.
  const technical = [
    e.event_id && `event_id: ${e.event_id}`,
    e.transaction_id && `transaction_id: ${e.transaction_id}`,
    e.hash_id && `hash_id: ${e.hash_id}`,
    e.source_id && `source_id: ${e.source_id}`,
  ].filter(Boolean);
  if (technical.length) lines.push('', `<code>${htmlEscape(technical.join('\n'))}</code>`);

  return lines.join('\n');
}

module.exports = {
  FIELDS,
  normalizeOneWin,
  detectClickId,
  labelForType,
  formatOneWinTelegram,
};
