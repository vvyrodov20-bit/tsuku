'use strict';
module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  const country = String(req.headers['x-vercel-ip-country'] || '').toUpperCase();
  res.status(200).json({ country: /^[A-Z]{2}$/.test(country) ? country : null });
};
