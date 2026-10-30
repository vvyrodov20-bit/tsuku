/* Simulated activity only. Samples are local currency amounts, not FX conversions or real results. */
(function(root){
  'use strict';
  const games=root.HubConfig.games.filter(game=>!game.catalogOnly);
  const units={AED:5,ARS:1000,AUD:2,BDT:100,BOB:10,BRL:10,CAD:2,CDF:2000,CHF:2,CLP:1000,COP:5000,CRC:500,CZK:25,DOP:100,DZD:100,EGP:50,EUR:2,GBP:2,GHS:10,HKD:10,HNL:25,HTG:100,HUF:500,IDR:10000,ILS:5,INR:100,IQD:1000,JOD:1,JPY:100,KES:100,KHR:5000,KZT:500,LAK:20000,LBP:100000,LKR:500,LRD:200,LSL:20,LYD:5,MAD:10,MDL:20,MNT:5000,MRU:50,MVR:20,MWK:2000,MXN:20,MYR:5,MZN:100,NAD:20,NGN:1000,NPR:100,NZD:2,PAB:2,PEN:5,PHP:50,PKR:200,PLN:5,PYG:10000,QAR:5,RON:5,RUB:100,SAR:5,SEK:20,SGD:2,SYP:10000,SZL:20,THB:50,TJS:10,TRY:50,TTD:10,TWD:50,TZS:2000,UAH:50,USD:2,UZS:10000,VES:100,VND:20000,XAF:1000,XOF:1000,XPF:200,YER:200,ZAR:20,ZMW:20,ZWG:20};
  const names=['Nova','Pixel','Arctic','Sky','Neo','Alex','Luna','Rio','Leo','Max','Jade','Atlas','Kai','Storm','Echo','Ace'];
  const colors=['#9477c5','#559b9c','#ac8466','#5683b8','#96709a','#6b9c82'];
  const pick=(items,random)=>items[Math.min(items.length-1,Math.floor(random()*items.length))];
  function currencyFor(country){return root.HubGeo[country]?.currency||'USD';}
  function createRow(currency,random=Math.random){
    const stake=(units[currency]||2)*pick([1,2,3,5,10],random),multiplier=pick([1.2,1.5,1.8,2,2.5,3,4,5,7,10,12,15,20],random);
    return {name:pick(names,random)+String(Math.floor(random()*900)+100),stake,multiplier,payout:Math.round(stake*multiplier*100)/100,game:pick(games,random).id,color:pick(colors,random)};
  }
  function money(amount,language,currency){
    try{return new Intl.NumberFormat(language,{style:'currency',currency,currencyDisplay:'narrowSymbol',maximumFractionDigits:2}).format(amount);}
    catch(_){return amount.toFixed(2)+' '+currency;}
  }
  // The pure helpers also support regression checks without a browser or live services.
  root.HubActivityUtils={currencyFor,createRow,money};
  let language='en',country='',currency='USD',rows=[],paused=false,online=247;
  const $=id=>document.getElementById(id),ui=()=>root.HubUpgradeLocales[language].ui;
  function el(tag,cls,text){const node=document.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;}
  function renderRows(animate=false){
    const body=$('winsRows');body.replaceChildren();
    rows.forEach((row,i)=>{
      const game=games.find(g=>g.id===row.game),item=el('div','win-row'+(animate&&i===0?' is-new':''));item.setAttribute('role','row');
      const player=el('div','win-player');player.setAttribute('role','cell');
      const avatar=el('span','win-avatar',row.name.slice(0,2).toUpperCase());avatar.setAttribute('aria-hidden','true');avatar.style.setProperty('--avatar-color',row.color);
      const info=el('div','win-player-info'),name=el('span','win-player-name',row.name),sub=el('span','win-player-sub','×'+new Intl.NumberFormat(language,{maximumFractionDigits:1}).format(row.multiplier));
      info.append(name,sub);player.append(avatar,info);
      const bet=el('bdi','win-bet',money(row.stake,language,currency)),mult=el('bdi','win-multiplier','×'+new Intl.NumberFormat(language,{maximumFractionDigits:1}).format(row.multiplier)),payout=el('bdi','win-payout',money(row.payout,language,currency)),icon=el('span','win-game');
      for(const cell of [bet,mult,payout,icon])cell.setAttribute('role','cell');
      const art=el('img');art.src=game.image;art.alt=game.name;art.width=38;art.height=38;icon.title=game.name;icon.append(art);
      bet.title=ui().bet+': '+money(row.stake,language,currency);payout.title=ui().payout+': '+money(row.payout,language,currency);
      item.append(player,bet,mult,payout,icon);body.append(item);
    });
  }
  function pauseState(){const button=$('pauseWins');button.setAttribute('aria-pressed',String(paused));button.children[0].textContent=paused?'○':'Ⅱ';button.children[1].textContent=ui()[paused?'resume':'pause'];}
  function tick(){
    if(paused||document.hidden||$('siteApp').hidden||$('page-games').hidden)return;
    rows.unshift(createRow(currency));rows.length=5;renderRows(true);
    online=Math.max(185,Math.min(295,online+Math.floor(Math.random()*7)-3));$('onlineCount').textContent=new Intl.NumberFormat(language).format(online);
  }
  $('pauseWins').addEventListener('click',()=>{paused=!paused;pauseState();});
  setInterval(tick,4500);
  root.HubActivity={
    render(value){language=value.language;country=value.country;const next=currencyFor(country);
      if(!rows.length||next!==currency){currency=next;rows=Array.from({length:5},()=>createRow(currency));}
      renderRows();pauseState();$('onlineCount').textContent=new Intl.NumberFormat(language).format(online);
    },tick,getState:()=>({country,currency,paused,rows:rows.map(row=>({...row}))})
  };
})(window);
