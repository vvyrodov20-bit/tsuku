const { clean } = require('../../lib/telegram');

const DEFAULT_AFFILIATE_URL = 'https://lkvq.cc/838bfc6f';

function q(req, key) {
  const value = new URL(req.url, `https://${req.headers.host || 'localhost'}`).searchParams.get(key);
  return clean(value || '', 500);
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const target = process.env.ONEWIN_AFFILIATE_URL || DEFAULT_AFFILIATE_URL;
    const url = new URL(target);
    const clickId = q(req, 'click_id');
    const attribution = {
      source: q(req, 'source'),
      channel: q(req, 'channel'),
      creative: q(req, 'creative'),
      campaign: q(req, 'campaign'),
      content: q(req, 'content'),
      landing_page: q(req, 'landing_page'),
      country: q(req, 'country'),
      language: q(req, 'language'),
    };

    const partnerClickParam = clean(process.env.ONEWIN_CLICK_PARAM || '', 50);
    if (partnerClickParam && clickId) url.searchParams.set(partnerClickParam, clickId);

    if (process.env.ONEWIN_FORWARD_ATTRIBUTION === 'true') {
      for (const [key, value] of Object.entries(attribution)) {
        if (value) url.searchParams.set(`fp_${key}`, value);
      }
    }

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
    return res.redirect(302, url.toString());
  } catch (error) {
    console.error('[affiliate redirect]', error);
    return res.status(500).send('Affiliate redirect is not configured');
  }
};
