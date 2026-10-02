const { sendTelegram, clean } = require('../../lib/telegram');
const { normalizeOneWin, formatOneWinTelegram } = require('../../lib/onewin');

async function readPayload(req) {
  const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
  const query = Object.fromEntries(url.searchParams.entries());

  if (req.method === 'GET') return { ...query };

  if (req.body && typeof req.body === 'object') return { ...query, ...req.body };

  const chunks = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return { ...query };

  const contentType = String(req.headers['content-type'] || '').toLowerCase();
  if (contentType.includes('application/json')) {
    try { return { ...query, ...(JSON.parse(raw) || {}) }; } catch (_) {}
  }

  const params = new URLSearchParams(raw);
  return { ...query, ...Object.fromEntries(params.entries()) };
}

function methodNotAllowed(res) {
  res.setHeader('Allow', 'GET, POST');
  res.status(405).json({ ok: false, error: 'method_not_allowed' });
}

async function handler(req, res) {
  if (!['GET', 'POST'].includes(req.method)) return methodNotAllowed(res);

  try {
    const payload = await readPayload(req);
    const normalized = normalizeOneWin(payload);

    // Event type is deliberately explicit. We do not guess registration/FTD/redeposit
    // from event_id because the supplied 1win data does not define such a mapping.
    const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
    const type = clean(payload.event_type || payload.type || url.searchParams.get('type') || '', 100);

    const message = formatOneWinTelegram(normalized, type);
    await sendTelegram(1, message);

    return res.status(200).json({
      ok: true,
      received: true,
      event_type: type || null,
      event_id: normalized.event_id || null,
      click_id: [1,2,3,4,5,6,7,8,9,10]
        .map(n => normalized[`sub${n}`])
        .find(v => /^fp_[A-Za-z0-9_-]{8,80}$/.test(v)) || null,
    });
  } catch (error) {
    console.error('[1win postback]', error);
    return res.status(500).json({ ok: false, error: 'postback_processing_failed' });
  }
}

module.exports = handler;
