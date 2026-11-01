'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const age=require('../assets/age-gate');
const {sources}=require('../assets/catalog');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const script=fs.readFileSync(path.join(__dirname,'../assets/app.js'),'utf8');
const css=fs.readFileSync(path.join(__dirname,'../assets/age-gate.css'),'utf8');
test('known Instagram Facebook and YouTube sources require self-declared 18+ confirmation',()=>{
 for(const code of ['ig1','ig2','fb1','ctg1','ctg2','ctg3','ctg4','ctg5','yt1']){
   const platform=code.startsWith('ig')?'Instagram':code.startsWith('yt')?'YouTube':'Facebook';
   assert.equal(age.sourcePlatform({pathname:'/'+code}),platform);
   assert.equal(age.sourcePlatform({pathname:'/'+code.toUpperCase()}),platform);
   assert.ok(sources[code]);
 }
 for(const host of ['https://www.youtube.com/watch?v=test','https://youtu.be/abc','https://m.facebook.com/','https://l.instagram.com/'])
   assert.ok(age.sourcePlatform({referrer:host}),host);
 assert.equal(age.sourcePlatform({userAgent:'Mozilla/5.0 YouTube/20.2'}),'YouTube');
 assert.equal(age.sourcePlatform({userAgent:'Mozilla/5.0 (Instagram 350)'}),'Instagram');
 assert.equal(age.sourcePlatform({pathname:'/tt2',userAgent:'Mozilla/5.0 TikTok/35'}),null);
 assert.equal(age.sourcePlatform({pathname:'/'}),null);
});
test('age confirmation is translated and does not expose game until affirmative answer',()=>{
 for(const locale of ['en','ru','pt-BR','es','ar','fr','de','hi']){
  const t=age.text(locale);for(const value of Object.values(t))assert.ok(value.length>1,locale);
 }
 for(const id of ['ageGate','ageYes','ageNo','ageDenied','ageQuestion'])assert.ok(html.includes('id="'+id+'"'));
 assert.ok(html.includes('id="siteApp" hidden inert'));
 assert.ok(script.includes("$('ageGate').hidden = !showAgeGate"));
 assert.ok(script.includes("$('siteApp').hidden = showTikTokGate || showAgeGate"));
 assert.ok(script.includes("if (!showAgeGate) root.HubTracker.start"));
 assert.ok(script.includes("if (!showAgeGate || ageConfirmed) root.HubTracker.start"));
 assert.ok(script.includes("$('ageYes').addEventListener('click', openSite)"));
 assert.ok(css.includes('body.age-gated .header { display:none; }'));
});
