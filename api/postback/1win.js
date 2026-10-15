'use strict';
const store = require('../../lib/store');
const { randomUUID } = require('node:crypto');
const { payload, sameSecret } = require('../../lib/http');
const { clean } = require('../../lib/telegram-client');
const { digest } = require('../../lib/visitors');
const original = require('./1win-original');
const TOWER_ENDPOINT = 'https://tower-rush-official.vercel.app/api/postback/relay';
const TYPES = { registration:'registration',register:'registration',reg:'registration',first_deposit:'first_deposit','first-deposit':'first_deposit',ftd:'first_deposit',redeposit:'redeposit',repeat:'redeposit',all_deposits:'all_deposits','all-deposits':'all_deposits',deposit:'all_deposits' };
const identify = v => /^tr_[A-Za-z0-9_-]{8,80}$/.test(v) ? 'tower' : /^fp_[A-Za-z0-9_-]{8,100}$/.test(v) ? 'game' : '';
module.exports = async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  if(!['GET','POST'].includes(req.method)) return original(req,res);
  try {
    const body=await payload(req);
    if(!process.env.POSTBACK_SECRET || !sameSecret(req.headers?.['x-postback-secret'] || body.secret,process.env.POSTBACK_SECRET))
      return res.status(403).json({ok:false,error:'forbidden'});
    const type=TYPES[req.postbackType || body.event_type || body.type];
    if(!type) return res.status(400).json({ok:false,error:'event_type_required'});
    const player=clean(body.user_id,80);
    if(!player || /^\{.*\}$/.test(player))return res.status(400).json({ok:false,error:'resolved_player_required'});
    const explicit=Array.from({length:10},(_,i)=>identify(clean(body['sub'+(i+1)],110))).filter(Boolean);
    if(new Set(explicit).size>1)return res.status(409).json({ok:false,error:'conflicting_click_sources'});
    const routeKey='partner-route:player:'+digest(player);
    return await store.withLock(routeKey,async()=>{
      const known=await store.get(routeKey);
      if(known?.site && explicit.length && known.site!==explicit[0])return res.status(409).json({ok:false,error:'player_site_mismatch'});
      let site=known?.site || explicit[0];
      if(!site){
        if(await store.get('player:'+digest(player)))site='game';
        else if(await store.get('tr:player:'+digest(player)))site='tower';
      }
      if(!site)return res.status(422).json({ok:false,error:'unattributed_player_no_click_id'});
      if(site==='game'){
        const result=await original(req,res);
        if(!known && res.statusCode===200)await store.set(routeKey,{site});
        return result;
      }
      const {secret:_discard,...safe}=body;
      const forwarded={...safe,type};
      const nonce=randomUUID();
      await store.command('SET','partner-relay:tower:'+nonce,digest(JSON.stringify(forwarded)),'EX',120);
      const response=await fetch(TOWER_ENDPOINT,{method:'POST',headers:{'content-type':'application/json','x-postback-relay-nonce':nonce},body:JSON.stringify(forwarded),signal:AbortSignal.timeout(15000)});
      const data=await response.json();
      if(response.ok && !known)await store.set(routeKey,{site});
      return res.status(response.status).json(data);
    });
  } catch(e){console.error('[shared postback]',e.code||'routing_failed');return res.status(503).json({ok:false,error:'route_temporarily_unavailable'});}
};
