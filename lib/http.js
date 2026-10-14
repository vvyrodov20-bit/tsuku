'use strict';
const { timingSafeEqual } = require('node:crypto');
async function payload(req) {
  const query = Object.fromEntries(new URL(req.url, 'https://local.invalid').searchParams);
  if (req.method === 'GET') return query;
  let body = req.body;
  if (!body) {
    let bytes = 0; const chunks = [];
    for await (const chunk of req) {
      bytes += Buffer.byteLength(chunk);
      if (bytes > 16384) throw Object.assign(new Error('Payload too large'), { status: 413 });
      chunks.push(Buffer.from(chunk));
    }
    body = Buffer.concat(chunks).toString();
  }
  if (typeof body === 'string' || Buffer.isBuffer(body)) {
    if (Buffer.byteLength(body) > 16384) throw Object.assign(new Error('Payload too large'), { status: 413 });
    body = String(req.headers['content-type'] || '').includes('application/json') ? JSON.parse(String(body)) : Object.fromEntries(new URLSearchParams(String(body)));
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw Object.assign(new Error('Invalid payload'), { status: 400 });
  if (Buffer.byteLength(JSON.stringify(body)) > 16384) throw Object.assign(new Error('Payload too large'), { status: 413 });
  return { ...query, ...body };
}
function sameSecret(actual, expected) {
  const a = Buffer.from(String(actual || '')), b = Buffer.from(String(expected || ''));
  return a.length === b.length && timingSafeEqual(a, b);
}
function failure(res, error) {
  if (error instanceof SyntaxError) error.status = 400;
  const status = error.status && error.status < 500 && error.code !== 'telegram_error' ? error.status : 503;
  console.error('[gamehub]', error.code || 'request_failed');
  res.setHeader('Retry-After', String(error.retryAfter || 5));
  return res.status(status).json({ ok: false, error: error.code || (status === 503 ? 'temporarily_unavailable' : 'invalid_request') });
}
module.exports = { payload, sameSecret, failure };
