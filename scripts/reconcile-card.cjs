'use strict';
// Operator-only recovery after an ambiguous Telegram send response. Never run automatically.
const store = require('../lib/store');
const { telegramConfig } = require('../lib/telegram-client');
const { validVisitor } = require('../lib/visitors');
const [id, suppliedMessageId, bot = '2'] = process.argv.slice(2);
if (!validVisitor(id) || !/^\d+$/.test(suppliedMessageId || '') || !['1', '2'].includes(bot)) {
  console.error('Usage: npm run reconcile-card -- VISITOR_ID MESSAGE_ID [1|2]'); process.exit(1);
}
store.withLock('visitor:' + id, async () => {
  const state = await store.get('visitor:' + id);
  if (!state) throw new Error('Visitor not found');
  const scope = telegramConfig(Number(bot)).scope;
  state.cards[scope] = { messageId: Number(suppliedMessageId), deliveryPending: false };
  await store.set('visitor:' + id, state);
  console.log('Existing message linked. The next event or retried postback will update it.');
}).catch(error => { console.error(error.code || error.message); process.exitCode = 1; });
