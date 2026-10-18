'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
class Element {
  constructor(){this.children=[];this.attributes={};this.listeners={};this.dataset={};this.hidden=false;this.textContent='';this.classList={toggle(){},add(){},remove(){}};}
  append(...nodes){this.children.push(...nodes);}
  add(node){this.children.push(node);}
  replaceChildren(...nodes){this.children=nodes;}
  setAttribute(k,v){this.attributes[k]=v;}
  getAttribute(k){return this.attributes[k];}
  removeAttribute(k){delete this.attributes[k];}
  addEventListener(type,fn){this.listeners[type]=fn;}
}
function session(withApp=false,userAgent=''){
  const nodes=Object.fromEntries([...read('index.html').matchAll(/id="([^"]+)"/g)].map(([,id])=>[id,new Element()]));
  const translated=Object.fromEntries(['depStep2Desc','depStep5Desc'].map(key=>{const e=new Element();e.dataset.i18n=key;return [key,e];}));
  const brand=new Element(),nav=new Element(),memory=new Map(),listeners={};
  const document={body:new Element(),documentElement:{},getElementById:id=>nodes[id],createElement:()=>new Element(),
    querySelector:selector=>selector==='.brand'?brand:selector==='.nav'?nav:translated[selector.match(/data-i18n="([^"]+)"/)?.[1]],
    querySelectorAll:selector=>selector==='[data-i18n]'?Object.values(translated):selector==='.page'?Object.entries(nodes).filter(([id])=>id.startsWith('page-')).map(([id,node])=>{node.id=id;return node;}):[],addEventListener(type,fn){listeners[type]=fn;}
  };
  const sandbox={document,Intl,URL,URLSearchParams,console,Math,
    Option:function(label,value){this.textContent=label;this.value=value;},
    localStorage:{getItem:key=>memory.get(key)||null,setItem:(key,value)=>memory.set(key,value)},
    HubConfig:require('../assets/catalog'),HubBrowser:require('../assets/browser-utils'),
    HubTracker:{track(){},start(){},update(){},externalURL:()=>'',affiliateURL:()=>'/go/1win'},
    HubRules:{render(){}},HubActivity:{render(){}},HubActivityUtils:{currencyFor:code=>code==='BR'?'BRL':'USD'},
    location:new URL('file:///example/index.html?country=BR&lang=ru#deposit'),history:{replaceState(){}},navigator:{language:'en',languages:['en'],userAgent},scrollTo(){},setTimeout(){},AbortSignal
  };
  sandbox.window=sandbox;vm.createContext(sandbox);
  for(const file of ['locales','payments','payment-locales','hub-translations','upgrade-locales','legacy-content',...(withApp?['app']:[])])vm.runInContext(read('assets/'+file+'.js'),sandbox);
  return {s:sandbox,nodes,translated,memory,listeners};
}
test('every GEO has local currency and valid payment references; vouchers never become withdrawal methods',()=>{
  const {s}=session();
  const countries=Object.keys(s.HubGeo).filter(code=>code!=='DEFAULT');
  assert.equal(countries.length,111);assert.equal(Object.keys(s.HubPayments.countries).length,111);
  for(const code of countries){
    const value=s.HubPayments.get(code);assert.equal(value.currency,s.HubGeo[code].currency,code);
    assert.ok(value.deposit.length&&value.withdraw.length,code);
    for(const id of [...value.deposit,...value.withdraw])assert.ok(s.HubPayments.methods[id],code+':'+id);
    assert.equal(new Set(value.deposit).size,value.deposit.length);
    assert.ok(!value.withdraw.some(id=>['boleto','oxxo','efecty','rapipago','pagofacil','pagoefectivo','konbini','fawry'].includes(id)),code);
    if(code!=='RU')assert.ok(!value.deposit.some(id=>['mir','sbp','piastrix','yumoney'].includes(id)),code);
  }
  for(const value of ['',null,'XX','__proto__','constructor'])assert.equal(s.HubPayments.get(value).deposit.length,0);
  assert.equal(s.HubPayments.get('br').deposit[0],'pix');
  const copy=s.HubPayments.get('BR');copy.deposit.push('mir');assert.ok(!s.HubPayments.get('BR').deposit.includes('mir'));
});
test('changing language preserves country methods; changing country removes stale selection and instructions',()=>{
  const {s,nodes,translated}=session();
  s.HubLegacy.render({language:'ru',country:'BR'});
  nodes.paymentMethod.listeners.change({target:{value:'boleto'}});
  assert.match(translated.depStep2Desc.textContent,/Boleto.*BRL/);
  for(const language of Object.keys(s.HubMeta)){
    s.HubLegacy.render({language,country:'BR'});
    assert.equal(nodes.paymentMethod.value,'boleto',language);
    assert.match(translated.depStep2Desc.textContent,/Boleto/);
    assert.match(translated.depStep2Desc.textContent,/BRL/);
    assert.doesNotMatch(translated.depStep2Desc.textContent,/\{(?:method|currency)\}|RUB|МИР|СБП/);
    const d=s.HubLocales[language];
    for(const key of ['paymentRegionNote','paymentUnknownCountry','cryptoConditional'])assert.ok(d[key]?.length>15,language+':'+key);
    assert.doesNotMatch(d.guide2+d.guide3+d.guide5,/MIR|МИР|SBP|СБП|Piastrix|MoneyGO/);
  }
  s.HubLegacy.render({language:'ru',country:'PL'});
  assert.equal(nodes.paymentMethod.value,'blik');assert.match(translated.depStep2Desc.textContent,/BLIK.*PLN/);
  nodes.paymentMethod.listeners.change({target:{value:'mir'}});assert.doesNotMatch(translated.depStep2Desc.textContent,/МИР/);
  s.HubLegacy.render({language:'ru',country:'XX'});
  assert.equal(nodes.paymentSelection.hidden,true);assert.equal(nodes.paymentMethod.children.length,0);
  assert.equal(translated.depStep2Desc.textContent,s.HubLocales.ru.paymentUnknownCountry);
});
test('deposit and activity country controls stay synchronized while language remains independent',()=>{
  const {s,nodes,memory}=session(true);
  assert.equal(s.HubApp.getState().page,'deposit');assert.equal(nodes.depositCountrySelect.value,'BR');assert.equal(nodes.countrySelect.value,'BR');
  assert.equal(nodes.depositCountrySelect.children.length,112);
  nodes.depositCountrySelect.listeners.change({target:{value:'PL'}});
  assert.equal(s.HubApp.getState().country,'PL');assert.equal(s.HubApp.getState().language,'ru');
  assert.equal(nodes.countrySelect.value,'PL');assert.equal(nodes.depositCountrySelect.value,'PL');assert.equal(memory.get('hub_country'),'PL');
  assert.equal(nodes.paymentMethod.value,'blik');
  nodes.langSelect.listeners.change({target:{value:'pt-BR'}});
  assert.equal(s.HubApp.getState().country,'PL');assert.equal(nodes.paymentMethod.value,'blik');
  nodes.countrySelect.listeners.change({target:{value:'BR'}});
  assert.equal(nodes.depositCountrySelect.value,'BR');assert.equal(nodes.paymentMethod.value,'pix');
  nodes.depositCountrySelect.listeners.change({target:{value:''}});
  assert.equal(nodes.countrySelect.value,'');assert.equal(nodes.paymentSelection.hidden,true);
});

test('social in-app browsers display the site and links navigate without waiting for tracking',()=>{
  for(const ua of ['Instagram 400','[FBAN/FBIOS;FBAV/500]','TikTok/42']){
    const {s,nodes,listeners}=session(true,ua);
    assert.equal(nodes.siteApp.hidden,false);assert.equal(nodes.siteApp.inert,false);assert.equal(nodes.inAppGate.hidden,true);
    s.HubApp.showPage('rules');assert.equal(s.HubApp.getState().page,'rules');
    const url='https://lkuf.cc/339b76',link={dataset:{game:'ice-fishing'},textContent:'Play Ice Fishing',href:url};
    let prevented=false;
    s.HubTracker.affiliateURL=()=>url;s.HubTracker.track=()=>{throw new Error('Tracking unavailable');};
    assert.throws(()=>listeners.click({target:{closest:selector=>selector==='[data-telegram]'?null:link},preventDefault(){prevented=true;}}));
    assert.equal(prevented,false);assert.equal(link.href,url);
  }
});
