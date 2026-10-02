const TELEGRAM_API = 'https://api.telegram.org';

function env(name) {
  const value = process.env[name];
  return typeof value === 'string' ? value.trim() : '';
}

function htmlEscape(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function clean(value, max = 500) {
  if (value === undefined || value === null) return '';
  return String(value).replace(/[\u0000-\u001F\u007F]/g, '').slice(0, max).trim();
}

function telegramConfig(botNumber) {
  const token = env(`TELEGRAM_BOT${botNumber}_TOKEN`);
  const chatId = env(`TELEGRAM_BOT${botNumber}_CHAT_ID`);
  if (!token || !chatId) throw new Error(`Missing Telegram Bot ${botNumber} environment variables`);
  return { token, chatId };
}

async function sendTelegram(botNumber, text) {
  const { token, chatId } = telegramConfig(botNumber);
  const response = await fetch(`${TELEGRAM_API}/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    throw new Error(`Telegram Bot ${botNumber} error: ${response.status} ${JSON.stringify(data).slice(0, 1000)}`);
  }
  return data;
}

module.exports = { env, htmlEscape, clean, sendTelegram };
