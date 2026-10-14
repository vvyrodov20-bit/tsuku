'use strict';
const { createHash } = require('node:crypto');
const store = require('./store');
const { clean, htmlEscape: h, telegramConfig, sendTelegram, editTelegram } = require('./telegram-client');
const { games, sources } = require('../assets/catalog');
const validVisitor = id => /^(?:v_|fp_|p_)[A-Za-z0-9_-]{16,100}$/.test(String(id || ''));
const validClick = id => /^fp_[A-Za-z0-9_-]{8,100}$/.test(String(id || ''));
const digest = value => createHash('sha256').update(String(value)).digest('hex');
function sourceOf(data) {
  return sources[data.source_code] || clean(data.source_name || data.source || 'Direct', 80);
}
function stamp(ms) {
  try { return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short', timeStyle: 'medium', timeZone: process.env.TELEGRAM_TIMEZONE || 'Europe/Moscow' }).format(new Date(ms)); }
  catch (_) { return new Date(ms).toISOString(); }
}
const labels = {
  page_view: 'Открыл сайт', game_select: 'Выбрал игру', tab_games: 'Открыл каталог', tab_rules: 'Открыл инструкцию', tab_deposit: 'Пополнение и вывод', tab_reviews: 'Открыл отзывы', telegram_click: 'Перешёл в Telegram-канал',
  rules_game_change: 'Смотрит правила игры', promo_copy: 'Скопировал промокод', country_change: 'Сменил GEO в интерфейсе',
  language_change: 'Сменил язык', open_browser: 'Нажал «Открыть в браузере»', copy_link: 'Скопировал ссылку',
  copy_game: 'Скопировал название игры', affiliate_click: 'Перешёл на 1win',
  registration: 'Зарегистрировался', first_deposit: 'Первый депозит', redeposit: 'Повторный депозит',
};
function formatVisitor(state) {
  const gameNames = (state.games || []).map(id => games.find(g => g.id === id)?.name).filter(Boolean);
  const a = state.attribution || {};
  const lines = [
    `👤 <b>ПОСЕТИТЕЛЬ #${String(state.number).padStart(6, '0')}</b>`,
    `📣 ${h(state.source || 'Direct')}`,
    `🌍 ${h(state.country || '—')} · ${h(state.language || '—')}`,
  ];
  if (a.channel || a.creative) lines.push(`Канал: ${h(a.channel || '—')} · Креатив: ${h(a.creative || '—')}`);
  if (a.campaign) lines.push(`Кампания: ${h(a.campaign)}`);
  if (gameNames.length) lines.push('', `🎮 <b>Игры</b>\n${gameNames.map(h).join(' · ')}`);
  lines.push('', `Просмотров: ${state.views || 0} · Переходов: ${state.clicks || 0}`);
  if (state.registration) lines.push('✅ Регистрация получена');
  if (state.deposits) lines.push(`💰 Депозитов: ${state.deposits}`);
  if (state.player) lines.push(`ID игрока: <code>${h(state.player)}</code>`);
  if (state.unlinked) lines.push('Связь с визитом не получена (нет известного sub1).');
  lines.push('', '<b>Последние действия</b>');
  for (const entry of state.history.slice(-9)) {
    const title = labels[entry.event] || entry.event;
    const game = games.find(g => g.id === entry.game)?.name;
    const details = [game, entry.language, entry.amount ? `${entry.amount}${entry.currency ? ' ' + entry.currency : ' (валюта не передана)'}` : '', entry.app].filter(Boolean).join(' · ');
    lines.push(`${h(stamp(entry.at))} — ${h(title)}${details ? '\n  ' + h(details) : ''}`);
  }
  lines.push('', `Первый визит: ${h(stamp(state.firstSeen))}`);
  // All user-controlled fields are bounded, and history is capped below Telegram's limit.
  return lines.join('\n');
}
async function newVisitor(id) {
  return { id, number: await store.nextNumber(), firstSeen: Date.now(), views: 0, clicks: 0, deposits: 0, history: [], games: [], cards: {}, attribution: {} };
}
async function syncCard(state, number, save, assertOwned) {
  const config = telegramConfig(number), scope = config.scope;
  const card = state.cards[scope] ||= {};
  const text = formatVisitor(state), hash = digest(text);
  if (card.hash === hash && card.messageId) return 'unchanged';
  if (card.retryAt > Date.now()) throw Object.assign(new Error('Telegram cooldown'), { code: 'telegram_cooldown', retryAfter: Math.ceil((card.retryAt - Date.now()) / 1000) });
  if (card.messageId) {
    try {
      await assertOwned();
      await editTelegram(number, card.messageId, text);
      card.hash = hash; card.retryAt = 0;
      await save(); return 'edited';
    } catch (error) {
      if (!error.missing) {
        card.retryAt = Date.now() + (error.retryAfter || 5) * 1000;
        await save(); throw error;
      }
      delete card.messageId; delete card.hash;
      await save();
    }
  }
  if (card.deliveryPending) {
    // Do not turn a timeout or crashed function into another notification.
    throw Object.assign(new Error('Delivery requires reconciliation'), { code: 'telegram_delivery_uncertain', retryAfter: 60 });
  }
  card.deliveryPending = true;
  await save();
  let result;
  try {
    await assertOwned();
    result = await sendTelegram(number, text);
  } catch (error) {
    if (!error.uncertain) {
      card.deliveryPending = false; card.retryAt = Date.now() + (error.retryAfter || 5) * 1000;
      await save();
    }
    throw error;
  }
  if (!result?.message_id) throw Object.assign(new Error('Missing Telegram message id'), { code: 'telegram_delivery_uncertain' });
  card.messageId = result.message_id; card.hash = hash; card.deliveryPending = false; card.retryAt = 0;
  await save(); return 'sent';
}
async function record(id, event, data = {}, eventKey, options = {}) {
  if (!validVisitor(id)) throw Object.assign(new Error('Invalid visitor'), { status: 400, code: 'visitor_id_required' });
  return store.withLock('visitor:' + id, async assertOwned => {
    const state = await store.get('visitor:' + id) || await newVisitor(id);
    const save = () => store.set('visitor:' + id, state);
    const seenKey = 'seen:' + id + ':' + digest(eventKey);
    const already = await store.get(seenKey);
    // The recent IDs bridge a crash between saving state and writing the durable dedupe key.
    const recentKey = digest(eventKey);
    const duplicate = !!already || (state.recent || []).includes(recentKey);
    if (!duplicate) {
      const now = Date.now();
      const attribution = data.attribution || data;
      if (data.source || data.source_name || data.source_code || data.attribution) {
        const source = sourceOf(attribution);
        if (source !== 'Direct' || !state.source) state.source = source;
        for (const k of ['channel', 'creative', 'campaign', 'content', 'source_code', 'landing_page']) {
          const value = clean(attribution[k], 80); if (value) state.attribution[k] = value;
        }
      }
      if (/^[A-Z]{2}$/.test(data.country || '')) state.country = data.country;
      if (data.language) state.language = clean(data.language, 12);
      if (games.some(g => g.id === data.game) && !state.games.includes(data.game)) state.games.push(data.game);
      if (event === 'page_view') state.views++;
      if (event === 'affiliate_click') state.clicks++;
      if (event === 'registration') state.registration = true;
      if (event === 'first_deposit' || event === 'redeposit') state.deposits++;
      if (data.player) state.player = clean(data.player, 50);
      if (data.unlinked) state.unlinked = true;
      state.lastSeen = now;
      state.history.push({ at: now, event, game: data.game, amount: clean(data.amount, 30), currency: clean(data.currency, 8), app: clean(data.app, 15), language: event === 'language_change' ? clean(data.language, 12) : '' });
      state.history = state.history.slice(-30);
      state.recent = [...(state.recent || []), recentKey].slice(-100);
      // First persist the event. A Telegram outage must not erase the action or deposit.
      await save();
    }
    if (!already) await store.set(seenKey, { at: Date.now() });
    let action = await syncCard(state, 2, save, assertOwned);
    // Optional separate conversion card. Defaults off: all actions update Bot #2.
    if (options.conversion && process.env.TELEGRAM_CONVERSIONS_SEPARATE === 'true') {
      const primary = telegramConfig(2), secondary = telegramConfig(1);
      if (primary.scope !== secondary.scope) await syncCard(state, 1, save, assertOwned);
    }
    return { number: state.number, action, duplicate };
  });
}
module.exports = { record, validVisitor, validClick, digest, formatVisitor, labels };
