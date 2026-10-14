'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const config=require('../assets/catalog');
const read=name=>fs.readFileSync(path.join(__dirname,'..','assets',name+'.js'),'utf8');
// DOM contract fixture. This exercises script interactions, not browser layout.
class Element {
  constructor(){this.children=[];this.attributes={};this.listeners={};this.dataset={};this.hidden=false;this.textContent='';this.style={setProperty(){}};}
  append(...nodes){this.children.push(...nodes);}
  replaceChildren(...nodes){this.children=nodes;}
  setAttribute(key,value){this.attributes[key]=String(value);}
  addEventListener(type,handler){this.listeners[type]=handler;}
  focus(){this.focused=true;}
}
function session(){
  const nodes=Object.fromEntries(['winsRows','pauseWins','onlineCount','siteApp','page-games','rulesTabs','rules-ice-fishing','rules-tower-rush','rules-falling-pickaxe'].map(id=>[id,new Element()]));
  nodes.pauseWins.children=[new Element(),new Element()];
  const buttons=config.games.map(game=>{const node=new Element();node.dataset.rule=game.id;return node;});
  const panels=config.games.map(game=>{const node=nodes['rules-'+game.id];node.id='rules-'+game.id;return node;});
  const intervals=[],events=[],memory=new Map();
  const document={hidden:false,documentElement:{dir:'ltr'},createElement:()=>new Element(),getElementById:id=>nodes[id],querySelectorAll:selector=>selector==='[data-rule]'?buttons:selector==='.rule-panel'?panels:[]};
  const sandbox={document,Intl,Math,URL,HubConfig:config,HubTracker:{track:(...args)=>events.push(args)},localStorage:{getItem:key=>memory.get(key),setItem:(key,value)=>memory.set(key,value)},setInterval:handler=>{intervals.push(handler);},addEventListener(){}};
  sandbox.window=sandbox;vm.createContext(sandbox);
  for(const name of ['locales','upgrade-locales','tower-rules-locales','ice-rules-locales','rules','activity'])vm.runInContext(read(name),sandbox);
  return {sandbox,nodes,buttons,panels,intervals,events,document};
}
test('activity uses GEO currency independently of language and keeps payout arithmetic consistent',()=>{
  const {sandbox:s,nodes}=session();
  for(const [country,currency] of [['BR','BRL'],['CL','CLP'],['EG','EGP'],['JP','JPY'],['RU','RUB'],['ZZ','USD']]){
    s.HubActivity.render({language:'en',country});
    const state=s.HubActivity.getState();assert.equal(state.currency,currency);assert.equal(state.rows.length,5);assert.equal(nodes.winsRows.children.length,5);
    for(const row of state.rows)assert.equal(row.payout,Math.round(row.stake*row.multiplier*100)/100);
  }
  for(const [country,geo] of Object.entries(s.HubGeo)){
    if(!geo.currency)continue;
    const row=s.HubActivityUtils.createRow(geo.currency,()=>0.2);
    assert.ok(row.stake>0&&row.payout>0,country);
    assert.equal(s.HubActivityUtils.currencyFor(country),geo.currency);
  }
  s.HubActivity.render({language:'pt-BR',country:'CL'});
  assert.equal(s.HubActivity.getState().currency,'CLP');
  assert.match(s.HubActivityUtils.money(1234.5,'pt-BR','BRL'),/1\.234,50/);
});
test('activity shifts one row, pauses on demand and suspends while hidden or outside the games tab',()=>{
  const {sandbox:s,nodes,intervals,document}=session();s.HubActivity.render({language:'ru',country:'RU'});
  const before=s.HubActivity.getState().rows;intervals[0]();
  const after=s.HubActivity.getState().rows;assert.equal(after.length,5);assert.deepEqual(after[1],before[0]);
  nodes.pauseWins.listeners.click();const paused=JSON.stringify(s.HubActivity.getState().rows);intervals[0]();assert.equal(JSON.stringify(s.HubActivity.getState().rows),paused);
  assert.equal(nodes.pauseWins.attributes['aria-pressed'],'true');
  s.HubActivity.render({language:'ar',country:'RU'});assert.equal(s.HubActivity.getState().paused,true);
  assert.equal(nodes.pauseWins.children[1].textContent,s.HubUpgradeLocales.ar.ui.resume);
  nodes.pauseWins.listeners.click();document.hidden=true;intervals[0]();assert.equal(JSON.stringify(s.HubActivity.getState().rows),paused);
  document.hidden=false;nodes['page-games'].hidden=true;intervals[0]();assert.equal(JSON.stringify(s.HubActivity.getState().rows),paused);
});
test('game rules switch independently, retain selection through all languages, and support RTL keyboard navigation',()=>{
  const {sandbox:s,panels,buttons,events,document,nodes}=session();
  s.HubRules.render('ru');buttons[1].listeners.click();
  assert.equal(s.HubRules.getSelected(),'ice-fishing');assert.equal(panels[1].hidden,false);assert.equal(panels[0].hidden,true);
  assert.equal(events.at(-1)[0],'rules_game_change');assert.equal(events.at(-1)[1].game,'ice-fishing');
  for(const language of Object.keys(s.HubMeta)){
    s.HubRules.render(language);assert.equal(s.HubRules.getSelected(),'ice-fishing');
    const tower=nodes['rules-tower-rush'].innerHTML,ice=nodes['rules-ice-fishing'].innerHTML;
    assert.ok(tower.includes('Galaxsys')&&tower.includes('96.2%–97.6%'));
    assert.ok(ice.includes('Evolution')&&ice.includes('53')&&ice.includes('3×–100×')&&ice.includes('10×–500×'));
    assert.doesNotMatch(tower+ice,/undefined|>\s*null\s*</);
    assert.ok(ice.includes(s.HubUpgradeLocales[language].ui.howTo));
  }
  document.documentElement.dir='rtl';buttons[1].listeners.keydown({key:'ArrowLeft',preventDefault(){}});
  assert.equal(s.HubRules.getSelected(),'tower-rush');assert.equal(buttons[2].focused,true);
  assert.equal(buttons[2].attributes['aria-selected'],'true');assert.equal(buttons[1].tabIndex,-1);
});
test('detailed rules have complete independent copy in all 42 locales and no missing assets',()=>{
  const {sandbox:s,nodes}=session();
  assert.deepEqual(Object.keys(s.HubIceRules).sort(),Object.keys(s.HubMeta).sort());
  assert.deepEqual(Object.keys(s.HubTowerRules).sort(),Object.keys(s.HubMeta).sort());
  for(const language of Object.keys(s.HubMeta)){
    const ice=s.HubIceRules[language],tower=s.HubTowerRules[language];
    assert.equal(ice.steps.length,4,language);assert.equal(ice.mechanics.length,4,language);
    assert.equal(ice.bonuses.length,3,language);assert.equal(ice.faq.length,4,language);
    assert.ok(ice.intro.length>70,language);
    for(const text of [ice.intro,...ice.steps,...ice.mechanics,...ice.bonuses,ice.theme,...ice.faq.map(pair=>pair[1])])assert.ok(typeof text==='string'&&text.length>20,language);
    for(const text of [ice.faqTitle,...ice.faq.map(pair=>pair[0])])assert.ok(typeof text==='string'&&text.length>=4,language);
    for(const key of ['rulesDescription2','step1Text','frozenText','templeText','tripleText']){
      assert.ok(typeof tower[key]==='string'&&tower[key].length>15,language+' '+key);
      assert.doesNotMatch(tower[key],/\{(?:minBetUSD|maxBetUSD|maxWinUSD)\}|<script|https:\/\//);
    }
    if(language!=='en')assert.notEqual(ice.intro,s.HubIceRules.en.intro,language);
    s.HubRules.render(language);
    const towerHTML=nodes['rules-tower-rush'].innerHTML,iceHTML=nodes['rules-ice-fishing'].innerHTML;
    assert.doesNotMatch(iceHTML,/Tower Rush|TOWER RUSH|FreeBet|Temple Floor|Galaxsys/);
    assert.equal((iceHTML.match(/<details>/g)||[]).length,4);
    assert.doesNotMatch(iceHTML,/rule-atmosphere|rule-atmosphere-image/);
    assert.match(towerHTML,/class="rule-hero-art"><img src="assets\/tower-rush-cutout.png"/);
    assert.doesNotMatch(towerHTML,/tower-about.webp/);
    assert.equal((towerHTML.match(/data-gallery-slide=/g)||[]).length,5);
    assert.equal((towerHTML.match(/<figure[^>]* hidden>/g)||[]).length,4);
    for(const html of [towerHTML,iceHTML]){
      assert.equal((html.match(/class="rule-bonus bonus-/g)||[]).length,3);
      for(const [,src] of html.matchAll(/<img[^>]+src="([^"]+)"/g))assert.ok(fs.existsSync(path.join(__dirname,'..',src)),src);
    }
  }
});
test('gallery controls wrap both directions and preserve the selected image across languages',()=>{
  const {sandbox:s,nodes}=session();s.HubRules.render('en');
  const click=dataset=>nodes['rules-tower-rush'].listeners.click({target:{closest:()=>({dataset})}});
  click({galleryStep:'-1'});assert.equal(s.HubRules.getGalleryIndex(),4);
  click({galleryStep:'1'});assert.equal(s.HubRules.getGalleryIndex(),0);
  click({galleryIndex:'2'});assert.equal(s.HubRules.getGalleryIndex(),2);
  s.HubRules.render('ar');assert.equal(s.HubRules.getGalleryIndex(),2);
  assert.match(nodes['rules-tower-rush'].innerHTML,/<figure data-gallery-slide="2">/);
  assert.match(nodes['rules-tower-rush'].innerHTML,/data-gallery-index="2"[^>]+aria-pressed="true"/);
});
test('recent wins remove repeated demo labels while retaining one localized data disclosure after the bonus',()=>{
  const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
  const wins=html.slice(html.indexOf('<section id="wins-section"'),html.indexOf('<button class="guide-link"'));
  assert.doesNotMatch(wins,/class="demo-tag"|>DEMO</);
  assert.match(wins,/data-v3="demoNote"/);
  assert.ok(html.indexOf('id="bonus-section"')<html.indexOf('id="wins-section"'));
  const {sandbox:s,nodes}=session();s.HubActivity.render({language:'ru',country:'RU'});
  const content=node=>[node.textContent,...node.children.map(content)].join(' ');
  assert.doesNotMatch(content(nodes.winsRows),/DEMO/);
});
test('Falling Pickaxe uses the shared editorial layout in every locale without the old badges or animation',()=>{
  const {sandbox:s,nodes}=session();
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  for(const language of Object.keys(s.HubMeta)){
    s.HubRules.render(language);
    const html=nodes['rules-falling-pickaxe'].innerHTML,copy=s.HubLocales[language];
    assert.match(html,/class="rule-hero detailed-hero"/);
    assert.match(html,/Pixmove/);assert.match(html,/falling-pickaxe-cutout.png/);
    assert.equal((html.match(/class="rule-mechanic"/g)||[]).length,6);
    assert.equal((html.match(/class="tool-hp"/g)||[]).length,4);
    assert.ok(html.includes(esc(copy.heroDesc)),language);
    assert.ok(html.includes(esc(copy.heroDesc2)),language);
    for(let i=1;i<=6;i++)assert.ok(html.includes(esc(copy['m'+i+'Desc'])),language+' mechanic '+i);
    for(let i=1;i<=4;i++)assert.ok(html.includes(esc(copy['p'+i+'Name'])),language+' tool '+i);
    assert.doesNotMatch(html,/undefined|animated-pickaxe|falling-pickaxe-mark|badgeSpins|badgeBonus|badgeMobile|x5000/);
    for(const [,src] of html.matchAll(/<img[^>]+src="([^"]+)"/g))assert.ok(fs.existsSync(path.join(__dirname,'..',src)),src);
  }
});
test('visible navigation removes decorative arrows and home slogans while numeric gallery navigation stays usable',()=>{
  const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
  assert.doesNotMatch(html,/class="intro"|class="catalog-note"|data-copy="heading"|data-copy="intro"|data-copy="hint"/);
  assert.doesNotMatch(html,/[\u2190-\u21ff‹›▶⌄]/u);
  const {sandbox:s,nodes}=session();
  for(const language of Object.keys(s.HubMeta)){
    s.HubRules.render(language);
    for(const game of config.games)assert.doesNotMatch(nodes['rules-'+game.id].innerHTML,/[\u2190-\u21ff‹›▶⌄]/u);
  }
  assert.equal((nodes['rules-tower-rush'].innerHTML.match(/data-gallery-index=/g)||[]).length,5);
  nodes['rules-tower-rush'].listeners.click({target:{closest:()=>({dataset:{galleryIndex:'4'}})}});
  assert.equal(s.HubRules.getGalleryIndex(),4);
});
