'use strict';
const { sameSecret } = require('../../lib/http');
const { sendTelegram } = require('../../lib/telegram-client');
const store = require('../../lib/store');

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }
  const expected = String(process.env.POSTBACK_SECRET || '').trim();
  if (!expected || !sameSecret(req.headers?.['x-postback-secret'], expected))
    return res.status(403).json({ ok: false, error: 'forbidden' });

  try {
    // This is a diagnostic cooldown, not a player, registration or deposit record.
    const cooldown = await store.command('SET', store.key('diagnostic:bot1-test'), '1', 'NX', 'EX', 60);
    if (!cooldown) return res.status(429).json({ ok: false, error: 'test_cooldown', retry_after: 60 });
    const now = new Intl.DateTimeFormat('ru-RU', {
      dateStyle: 'short', timeStyle: 'medium', timeZone: 'Europe/Moscow',
    }).format(new Date());
    const message = [
      '🧪 <b>TEST — BOT 1 / 1win</b>',
      '✅ Проверка отправки Telegram-сообщения',
      'Это технический тест, не событие партнёрки.',
      '👤 Реальный игрок: отсутствует',
      '💰 Реальный депозит: отсутствует',
      '📊 Учёт регистраций и депозитов не изменён',
      '🕒 ' + now + ' (Москва)',
    ].join('\n');
    const result = await sendTelegram(1, message);
    if (!result?.message_id) throw new Error('Telegram did not confirm test delivery');
    return res.status(200).json({ ok: true, sent: true, test_only: true, tracking_unchanged: true });
  } catch (error) {
    // Never expose tokens, Telegram responses or internal error details to the caller.
    console.error('[bot1 diagnostic]', error.code || 'delivery_unavailable');
    return res.status(503).json({ ok: false, error: 'test_unavailable' });
  }
};
