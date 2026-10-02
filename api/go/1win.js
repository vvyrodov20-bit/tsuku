const { sendTelegram, clean, htmlEscape } = require('../../lib/telegram');

const DEFAULT_AFFILIATE_URL = 'https://lkvq.cc/838bfc6f';

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

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

    const button = q(req, 'button');
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

    // We only send the click id into a partner parameter when explicitly configured.
    // This avoids inventing a 1win sub-parameter mapping.
    const partnerClickParam = clean(process.env.ONEWIN_CLICK_PARAM || '', 50);
    if (partnerClickParam && clickId) url.searchParams.set(partnerClickParam, clickId);

    // Optional pass-through for attribution parameters. Disabled by default.
    if (process.env.ONEWIN_FORWARD_ATTRIBUTION === 'true') {
      for (const [key, value] of Object.entries(attribution)) {
        if (value) url.searchParams.set(`fp_${key}`, value);
      }
    }

    // Server-side Bot #2 event. Failure here must not block the affiliate redirect.
    try {
      await sendTelegram(2, [
        '🚀 <b>AFFILIATE REDIRECT</b>', '',
        `🎯 <b>BUTTON</b>\n${htmlEscape(button || '—')}`,
        `🆔 <b>CLICK ID</b>\n<code>${htmlEscape(clickId || '—')}</code>`,
        `🌍 <b>COUNTRY</b>\n${htmlEscape(attribution.country || '—')}`,
        `📣 <b>SOURCE</b>\n${htmlEscape(attribution.source || '—')}`,
      ].join('\n\n'));
    } catch (telegramError) {
      console.error('[affiliate redirect telegram]', telegramError);
    }

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
    return res.redirect(302, url.toString());
  } catch (error) {
    console.error('[affiliate redirect]', error);
    return res.status(500).send('Affiliate redirect is not configured');
  }
};
