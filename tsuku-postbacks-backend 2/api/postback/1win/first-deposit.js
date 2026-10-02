const handler = require('../1win');
module.exports = async (req, res) => {
  const original = req.body && typeof req.body === 'object' ? req.body : null;
  if (original) req.body = { ...original, event_type: 'first_deposit' };
  else {
    const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
    url.searchParams.set('type', 'first_deposit');
    req.url = url.pathname + url.search;
  }
  return handler(req, res);
};
