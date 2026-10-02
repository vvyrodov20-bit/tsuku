const { sendTelegram, editTelegram, htmlEscape, clean } = require('../lib/telegram');

function flag(code) {
  const c = String(code || '').toUpperCase();
  if (!/^[A-Z]{2}$/.test(c)) return '🌍';
  return String.fromCodePoint(...[...c].map(ch => 127397 + ch.charCodeAt(0)));
}

function countryFrom(req, body) {
  return clean(body.country || req.headers['x-vercel-ip-country'] || '', 10).toUpperCase();
}

const SOURCE_MAP = Object.freeze({
  tt1: 'TikTok · Brasil',
  tt2: 'TikTok · Chile',
  ig1: 'Instagram · falling.pickaxe1',
  fb1: 'Facebook · Matias Gonzales',
});

function sourceFrom(body) {
  const code = clean(body.attribution?.source_code || body.source_code || '', 80).toLowerCase();
  if (SOURCE_MAP[code]) return SOURCE_MAP[code];
  const named = clean(body.attribution?.source_name || body.source_name || '', 120);
  if (named) return named;
  const source = clean(body.attribution?.source || body.source || '', 120);
  if (source && source.toLowerCase() !== 'direct') return source;
  return 'Direct';
}

function buttonLabelFrom(body) {
  return clean(body.button_label || body.attribution?.button_label || '', 160);
}

function eventKind(event) {
  if (event === 'page_view') return 'visit';
  if (event === 'cta_click') return 'button';
  if (event === 'external_link_click') return 'external';
  if (event.startsWith('tab_')) return 'tab';
  if (event === 'affiliate_redirect') return 'affiliate';
  return 'other';
}

function addUnique(list, value) {
  const v = clean(value, 160);
  if (!v || list.includes(v)) return list;
  return [...list, v];
}

function normalizeState(previous, body, req) {
  const prev = previous && typeof previous === 'object' ? previous : {};
  const event = clean(body.event || 'event', 80);
  const country = countryFrom(req, body) || prev.country || '';
  const source = sourceFrom(body) || prev.source || 'Direct';
  const label = buttonLabelFrom(body);
  const kind = eventKind(event);
  const buttons = Array.isArray(prev.buttons) ? prev.buttons : [];
  const tabs = Array.isArray(prev.tabs) ? prev.tabs : [];
  const links = Array.isArray(prev.links) ? prev.links : [];
  const actions = Array.isArray(prev.actions) ? prev.actions : [];

  let next = {
    country,
    source,
    buttons,
    tabs,
    links,
    actions,
    firstSeen: prev.firstSeen || Date.now(),
  };

  if (kind === 'button' && label) {
    next.buttons = addUnique(buttons, label);
    next.actions = addUnique(actions, `🎯 ${label}`);
  } else if (kind === 'tab') {
    const tabLabel = label || clean(body.event.replace(/^tab_/, '').replace(/_/g, ' '), 120);
    next.tabs = addUnique(tabs, tabLabel);
    next.actions = addUnique(actions, `📑 ${tabLabel}`);
  } else if (kind === 'external') {
    const externalLabel = label || clean(body.metadata?.destination_host || '', 120);
    if (externalLabel) next.links = addUnique(links, externalLabel);
    if (externalLabel) next.actions = addUnique(actions, `🔗 ${externalLabel}`);
  } else if (kind === 'affiliate') {
    const affiliateLabel = label || '1win';
    next.links = addUnique(links, `1win → ${affiliateLabel}`);
    next.actions = addUnique(actions, `🚀 1win → ${affiliateLabel}`);
  }

  return next;
}

function formatVisitorTelegram(state) {
  const lines = [
    '👤 <b>VISITOR</b>', '',
    `📣 <b>SOURCE</b>\n${htmlEscape(state.source || 'Direct')}`,
    `🌍 <b>COUNTRY</b>\n${flag(state.country)} ${htmlEscape(state.country || '—')}`,
  ];

  if (state.buttons?.length) {
    lines.push(`🎯 <b>BUTTONS</b>\n${state.buttons.map(v => `• ${htmlEscape(v)}`).join('\n')}`);
  }
  if (state.tabs?.length) {
    lines.push(`📑 <b>TABS</b>\n${state.tabs.map(v => `• ${htmlEscape(v)}`).join('\n')}`);
  }
  if (state.links?.length) {
    lines.push(`🔗 <b>LINKS</b>\n${state.links.map(v => `• ${htmlEscape(v)}`).join('\n')}`);
  }

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

    const previous = body.visitor_state ? JSON.parse(String(body.visitor_state)) : null;
    const state = normalizeState(previous, body, req);
    const messageId = clean(body.telegram_message_id || '', 30);
    let telegramMessageId = messageId || '';
    let action = 'none';

    if (telegramMessageId) {
      try {
        await editTelegram(2, telegramMessageId, formatVisitorTelegram(state));
        action = 'edited';
      } catch (error) {
        // If the stored message is gone or stale, start a fresh card.
        console.error('[site track edit]', error);
        const sent = await sendTelegram(2, formatVisitorTelegram(state));
        telegramMessageId = String(sent.result?.message_id || '');
        action = 'sent_replacement';
      }
    } else {
      const sent = await sendTelegram(2, formatVisitorTelegram(state));
      telegramMessageId = String(sent.result?.message_id || '');
      action = 'sent';
    }

    const attribution = body.attribution && typeof body.attribution === 'object' ? body.attribution : {};
    return res.status(200).json({
      ok: true,
      click_id: clean(body.click_id || attribution.click_id || '', 120),
      telegram_message_id: telegramMessageId,
      visitor_state: JSON.stringify(state),
      action,
      attribution: {
        ...attribution,
        click_id: clean(body.click_id || attribution.click_id || '', 120),
        source_name: state.source,
      },
    });
  } catch (error) {
    console.error('[site track]', error);
    return res.status(500).json({ ok: false, error: 'tracking_failed' });
  }
};
