'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict');
const handler=require('../api/admin/test-telegram');
function res(){return {statusCode:200,headers:{},status(c){this.statusCode=c;return this;},setHeader(k,v){this.headers[k]=v;},json(v){this.body=v;return this;}}}
test('Bot1 diagnostic requires POST with server secret',async()=>{
 process.env.POSTBACK_SECRET='unit-test-key';
 const response=res();await handler({method:'GET',headers:{}},response);assert.equal(response.statusCode,405);
 const missing=res();await handler({method:'POST',headers:{}},missing);assert.equal(missing.statusCode,403);
 const invalid=res();await handler({method:'POST',headers:{'x-postback-secret':'bad'}},invalid);assert.equal(invalid.statusCode,403);
});
test('Bot1 diagnostic does not create conversion records',async()=>{
 process.env.POSTBACK_SECRET='unit-test-key';process.env.TELEGRAM_BOT1_TOKEN='test-bot';process.env.TELEGRAM_BOT1_CHAT_ID='123';
 process.env.KV_REST_API_URL='https://redis.test';process.env.KV_REST_API_TOKEN='test';delete process.env.UPSTASH_REDIS_REST_URL;delete process.env.UPSTASH_REDIS_REST_TOKEN;
 const keys=[],messages=[];
 global.fetch=async(url,opts)=>{
  if(String(url)==='https://redis.test'){const args=JSON.parse(opts.body);keys.push(args[1]);assert.deepEqual([args[0],args[3],args[4],args[5]],['SET','NX','EX',60]);return new Response(JSON.stringify({result:'OK'}));}
  messages.push(JSON.parse(opts.body));return new Response(JSON.stringify({ok:true,result:{message_id:100}}));
 };
 const result=res();await handler({method:'POST',headers:{'x-postback-secret':'unit-test-key'}},result);
 assert.equal(result.statusCode,200);assert.equal(result.body.test_only,true);assert.equal(messages.length,1);assert.match(messages[0].text,/TEST/);
 assert.equal(keys.length,1);assert.match(keys[0],/diagnostic:bot1-test$/);
});
