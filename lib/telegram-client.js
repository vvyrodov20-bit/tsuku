'use strict';
const { createHash } = require('node:crypto');
const env = name => String(process.env[name] || '').trim();
const clean = (value, max = 160) => String(value ?? '').replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, max);
const htmlEscape = value => String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
function telegramConfig(number = 2) {
  const token = env(`TELEGRAM_BOT${number}_TOKEN`), chatId = env(`TELEGRAM_BOT${number}_CHAT_ID`);
  if (!token || !chatId) throw Object.assign(new Error(`Telegram Bot ${number} is not configured`), { code: 'telegram_unconfigured' });
  return { token, chatId, scope: createHash('sha256').update(token + ':' + chatId).digest('hex').slice(0, 16) };
}
async function call(number, method, body) {
  const { token, chatId } = telegramConfig(number);
  let response, data;
  try {
    response = await fetch(`https://api.telegram.org/bot${token}/${method}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, parse_mode: 'HTML', link_preview_options: { is_disabled: true }, ...body }),
      signal: AbortSignal.timeout(7000),
    });
    data = await response.json();
  } catch (_) {
    throw Object.assign(new Error('Telegram response unavailable'), { code: 'telegram_transport', uncertain: method === 'sendMessage' });
  }
  if (!data.ok || !response.ok) {
    if (method === 'editMessageText' && /message is not modified/i.test(data.description || '')) return { unchanged: true };
    throw Object.assign(new Error('Telegram request failed'), {
      code: 'telegram_error', status: data.error_code || response.status,
      retryAfter: data.parameters?.retry_after || 5,
      missing: /message to edit not found/i.test(data.description || ''),
    });
  }
  return data.result;
}
const sendTelegram = (number, text) => call(number, 'sendMessage', { text });
const editTelegram = (number, messageId, text) => call(number, 'editMessageText', { message_id: Number(messageId), text });
module.exports = { env, clean, htmlEscape, telegramConfig, sendTelegram, editTelegram };
