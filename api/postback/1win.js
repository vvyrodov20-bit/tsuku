'use strict';
const { payload, sameSecret, failure } = require('../../lib/http');
const { receivePartnerEvent } = require('../../lib/partner-postbacks');
module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }
  try {
    const body = await payload(req);
    const secret = String(process.env.POSTBACK_SECRET || '').trim();
    if (!secret || !sameSecret(req.headers?.['x-postback-secret'] || body.secret, secret))
      return res.status(403).json({ ok: false, error: 'forbidden' });
    const result = await receivePartnerEvent(body, req.postbackType);
    return res.status(200).json({ ok: true, received: true, ...result });
  } catch (error) { return failure(res, error); }
};
