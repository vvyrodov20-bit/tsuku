const { sendTelegram, htmlEscape, clean } = require('../lib/telegram');

function flag(code) {
  const c = String(code || '').toUpperCase();
  if (!/^[A-Z]{2}$/.test(c)) return '🌍';
  return String.fromCodePoint(...[...c].map(ch => 127397 + ch.charCodeAt(0)));
}

function deviceFromUA(ua) {
  const s = String(ua || '');
  if (/iPad|Tablet/i.test(s)) return 'Tablet';
  if (/iPhone|iPod/i.test(s)) return 'iPhone';
  if (/Android/i.test(s)) return /Mobile/i.test(s) ? 'Android' : 'Android Tablet';
  if (/Windows/i.test(s)) return 'Windows';
  if (/Mac OS X|Macintosh/i.test(s)) return 'Mac';
  if (/Linux/i.test(s)) return 'Linux';
  return 'Unknown';
}

function countryFrom(req, body) {
  return clean(body.country || req.headers['x-vercel-ip-country'] || '', 10).toUpperCase();
}

function formatTrackTelegram(body, req) {
  const event = clean(body.event || 'event', 80);
  const country = countryFrom(req, body);
  const page = clean(body.page || '/', 200);
  const button = clean(body.button_id || '', 120);
  const clickId = clean(body.click_id || body.attribution?.click_id || '', 120);
  const source = clean(body.attribution?.source || body.source || '', 120);
  const session = clickId || clean(body.event_uuid || '', 120);
  const device = deviceFromUA(req.headers['user-agent']);

  let title = '📊 <b>SITE EVENT</b>';
  if (event === 'page_view') title = '👀 <b>NEW VISIT</b>';
  else if (event === 'cta_click') title = '▶️ <b>CTA CLICK</b>';
  else if (event === 'external_link_click') title = '🔗 <b>EXTERNAL CLICK</b>';
  else if (event.startsWith('tab_')) title = '📑 <b>TAB CLICK</b>';
  else if (event === 'affiliate_redirect') title = '🚀 <b>AFFILIATE REDIRECT</b>';

  const lines = [
    title, '',
    `🌍 <b>COUNTRY</b>\n${flag(country)} ${htmlEscape(country || '—')}`,
    `📱 <b>DEVICE</b>\n${htmlEscape(device)}`,
    `🔗 <b>PAGE</b>\n${htmlEscape(page)}`,
  ];

  if (button) lines.push(`🎯 <b>BUTTON</b>\n${htmlEscape(button)}`);
  if (source) lines.push(`📣 <b>SOURCE</b>\n${htmlEscape(source)}`);
  if (session) lines.push(`🆔 <b>CLICK / SESSION</b>\n<code>${htmlEscape(session)}</code>`);
  lines.push(`⚡ <b>EVENT</b>\n<code>${htmlEscape(event)}</code>`);

  return lines.join('\n\n');
}

async function parseBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  const ct = String(req.headers['content-type'] || '').toLowerCase();
  if (ct.includes('application/json')) {
    try { return JSON.parse(raw) || {}; } catch (_) { return {}; }
  }
  return Object.fromEntries(new URLSearchParams(raw));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  try {
    const body = req.method === 'GET'
      ? Object.fromEntries(new URL(req.url, `https://${req.headers.host || 'localhost'}`).searchParams.entries())
      : await parseBody(req);

    if (!body.event) return res.status(400).json({ ok: false, error: 'event_required' });

    await sendTelegram(2, formatTrackTelegram(body, req));

    const attribution = body.attribution && typeof body.attribution === 'object' ? body.attribution : {};
    return res.status(200).json({
      ok: true,
      click_id: clean(body.click_id || attribution.click_id || '', 120),
      attribution: {
        ...attribution,
        click_id: clean(body.click_id || attribution.click_id || '', 120),
      },
    });
  } catch (error) {
    console.error('[site track]', error);
    return res.status(500).json({ ok: false, error: 'tracking_failed' });
  }
};
