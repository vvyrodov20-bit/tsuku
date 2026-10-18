'use strict';
// Partner callbacks only. No visitor lookup, click ID, site routing or Bot 2 calls.
const { createHash } = require('node:crypto');
const store = require('./store');
const { clean, htmlEscape: h, sendTelegram, editTelegram } = require('./telegram-client');
const TYPES = {
  registration:'registration', register:'registration', reg:'registration',
  first_deposit:'first_deposit', 'first-deposit':'first_deposit', ftd:'first_deposit',
  redeposit:'redeposit', repeat:'redeposit',
  all_deposits:'all_deposits', 'all-deposits':'all_deposits', deposit:'all_deposits',
  withdrawal:'withdrawal', withdraw:'withdrawal',
};
const TITLES = { registration:'РЕГИСТРАЦИЯ', first_deposit:'ПЕРВЫЙ ДЕПОЗИТ', redeposit:'ПОВТОРНЫЙ ДЕПОЗИТ', all_deposits:'ДЕПОЗИТ', withdrawal:'ВЫВОД' };
const field = (v, n=150) => { const s=clean(v,n); return /^\{.*\}$/.test(s) ? '' : s; };
const digest = v => createHash('sha256').update(v).digest('hex');
function normalize(body, forcedType) {
  const type=TYPES[field(forcedType || body.event_type || body.type,40).toLowerCase()];
  if (!type) throw Object.assign(new Error('Unknown partner event'),{status:400,code:'event_type_required'});
  const data={type,test:['1','true'].includes(String(body.test).toLowerCase())};
  for (const key of ['user_id','event_id','transaction_id','date','amount','currency','country','source_id','source_name','hash_id','hash_name']) data[key]=field(body[key]);
  if (!data.user_id) throw Object.assign(new Error('Missing player'),{status:400,code:'resolved_player_required'});
  return data;
}
function identity(data) {
  if (data.type==='registration') return JSON.stringify(['registration',data.user_id]);
  const family=data.type==='withdrawal'?'withdrawal':'deposit';
  if (data.transaction_id) return JSON.stringify([family,data.user_id,data.transaction_id]);
  // Without unique partner identifiers, only identical payloads can be deduplicated.
  return JSON.stringify([data.type,data.user_id,data.event_id,data.date,data.amount,data.currency,data.hash_id,data.source_id]);
}
function format(data) {
  const lines=[`${data.test?'🧪 ТЕСТ · ':''}${data.type==='registration'?'✅':'💰'} <b>${TITLES[data.type]}</b>`,
    '<b>1win · постбэк партнёрки</b>',`ID игрока: <code>${h(data.user_id)}</code>`];
  if (data.test) lines.push('Техническая проверка. Не реальная регистрация или финансовая операция.');
  for(const [key,label] of [['country','Страна'],['amount','Сумма'],['currency','Валюта'],['source_name','Источник в партнёрке'],['hash_name','Ссылка в партнёрке'],['hash_id','ID ссылки'],['transaction_id','ID операции'],['event_id','ID события'],['date','Дата события']])
    if(data[key])lines.push(`${label}: ${h(data[key])}`);
  return lines.join('\n');
}
async function receivePartnerEvent(body, forcedType) {
  const data=normalize(body,forcedType);
  const key=(data.test?'partner-test:event:':'partner:event:')+digest(identity(data));
  return store.withLock(key,async assertOwned=>{
    const prior=await store.get(key);
    // Deliver all-deposits immediately; a later specific event refines the same message.
    const upgrade=prior?.messageId && prior.data?.type==='all_deposits' && ['first_deposit','redeposit'].includes(data.type);
    if(prior?.status==='sent' && !upgrade)return {duplicate:true,test:data.test};
    const now=Date.now();
    if(prior?.status==='sending' && now-prior.at<60000)
      throw Object.assign(new Error('Partner delivery in progress'),{code:'partner_delivery_pending',retryAfter:60});
    const record={...(prior||{}),data:upgrade?prior.data:data,status:'sending',at:now};
    await store.set(key,record);
    let delivered=false;
    try {
      await assertOwned();
      let sent;
      if(upgrade) {
        try { sent=await editTelegram(1,prior.messageId,format(data)); }
        catch(error){ if(!error.missing)throw error; sent=await sendTelegram(1,format(data)); }
      } else sent=await sendTelegram(1,format(data));
      const messageId=sent?.message_id || (sent?.unchanged && prior?.messageId);
      if(!messageId)throw Object.assign(new Error('Unconfirmed partner delivery'),{code:'partner_delivery_uncertain'});
      delivered=true;
      await store.set(key,{...record,data,status:'sent',messageId});
      return {duplicate:!!upgrade,updated:!!upgrade,test:data.test};
    } catch(error) {
      // Return an error so the sender can retry, independently from site traffic.
      // Ambiguous Telegram timeouts can duplicate a delivery; do not silently drop it.
      if(!delivered)await store.set(key,{...record,status:'failed',at:Date.now()}).catch(()=>{});
      throw error;
    }
  });
}
module.exports={receivePartnerEvent,normalize,identity,format};
