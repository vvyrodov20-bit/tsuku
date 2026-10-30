(function(root){
  'use strict';
  // Catalog-only additions do not have guide panels or translated rules.
  const games=root.HubConfig.games.filter(game=>!game.catalogOnly);
  const pickaxeArt=["<svg class=\"pickaxe-pixel-svg\" aria-hidden=\"true\" viewBox=\"0 0 16 16\">\n              <path d=\"M5 2h6v1H5z M4 3h1v1H4z M11 3h1v1h-1z M5 5h5v1H5z M10 4h1v1h-1z M12 4h1v1h-1z M13 5h1v6h-1z M11 6h1v5h-1z M12 11h1v1h-1z M8 6h1v1H8z M9 7h1v1H9z M7 7h1v1H7z M8 8h1v1H8z M6 8h1v1H6z M7 9h1v1H7z M5 9h1v1H5z M6 10h1v1H6z M4 10h1v1H4z M5 11h1v1H5z M3 11h1v1H3z M4 12h1v1H4z M2 12h1v2H2z M3 14h1v1H3z M2 14h1v1H2z\" fill=\"#181818\"/>\n              <path d=\"M9 6h1v1H9z M8 7h1v1H8z M7 8h1v1H7z M6 9h1v1H6z M5 10h1v1H5z M4 11h1v1H4z M3 12h1v2H3z\" fill=\"#966826\"/>\n              <path d=\"M3 13h1v1H3z\" fill=\"#8f5b2d\"/>\n              <path d=\"M5 3h6v1H5z M5 4h5v1H5z M11 4h1v2h-1z M12 5h1v6h-1z\" fill=\"#b0743b\"/>\n              <path d=\"M7 3h4v1H7z M12 6h1v4h-1z\" fill=\"#d49455\"/>\n            </svg>","<svg class=\"pickaxe-pixel-svg\" aria-hidden=\"true\" viewBox=\"0 0 16 16\">\n              <path d=\"M5 2h6v1H5z M4 3h1v1H4z M11 3h1v1h-1z M5 5h5v1H5z M10 4h1v1h-1z M12 4h1v1h-1z M13 5h1v6h-1z M11 6h1v5h-1z M12 11h1v1h-1z M8 6h1v1H8z M9 7h1v1H9z M7 7h1v1H7z M8 8h1v1H8z M6 8h1v1H6z M7 9h1v1H7z M5 9h1v1H5z M6 10h1v1H6z M4 10h1v1H4z M5 11h1v1H5z M3 11h1v1H3z M4 12h1v1H4z M2 12h1v2H2z M3 14h1v1H3z M2 14h1v1H2z\" fill=\"#181818\"/>\n              <path d=\"M9 6h1v1H9z M8 7h1v1H8z M7 8h1v1H7z M6 9h1v1H6z M5 10h1v1H5z M4 11h1v1H4z M3 12h1v2H3z\" fill=\"#966826\"/>\n              <path d=\"M3 13h1v1H3z\" fill=\"#78716c\"/>\n              <path d=\"M5 3h6v1H5z M5 4h5v1H5z M11 4h1v2h-1z M12 5h1v6h-1z\" fill=\"#78716c\"/>\n              <path d=\"M7 3h4v1H7z M12 6h1v4h-1z\" fill=\"#a8a29e\"/>\n            </svg>","<svg class=\"pickaxe-pixel-svg\" aria-hidden=\"true\" viewBox=\"0 0 16 16\">\n              <path d=\"M5 2h6v1H5z M4 3h1v1H4z M11 3h1v1h-1z M5 5h5v1H5z M10 4h1v1h-1z M12 4h1v1h-1z M13 5h1v6h-1z M11 6h1v5h-1z M12 11h1v1h-1z M8 6h1v1H8z M9 7h1v1H9z M7 7h1v1H7z M8 8h1v1H8z M6 8h1v1H6z M7 9h1v1H7z M5 9h1v1H5z M6 10h1v1H6z M4 10h1v1H4z M5 11h1v1H5z M3 11h1v1H3z M4 12h1v1H4z M2 12h1v2H2z M3 14h1v1H3z M2 14h1v1H2z\" fill=\"#181818\"/>\n              <path d=\"M9 6h1v1H9z M8 7h1v1H8z M7 8h1v1H7z M6 9h1v1H6z M5 10h1v1H5z M4 11h1v1H4z M3 12h1v2H3z\" fill=\"#966826\"/>\n              <path d=\"M3 13h1v1H3z\" fill=\"#e5e7eb\"/>\n              <path d=\"M5 3h6v1H5z M5 4h5v1H5z M11 4h1v2h-1z M12 5h1v6h-1z\" fill=\"#cbd5e1\"/>\n              <path d=\"M7 3h4v1H7z M12 6h1v4h-1z\" fill=\"#ffffff\"/>\n            </svg>","<svg class=\"pickaxe-pixel-svg\" aria-hidden=\"true\" viewBox=\"0 0 16 16\">\n              <path d=\"M5 2h6v1H5z M4 3h1v1H4z M11 3h1v1h-1z M5 5h5v1H5z M10 4h1v1h-1z M12 4h1v1h-1z M13 5h1v6h-1z M11 6h1v5h-1z M12 11h1v1h-1z M8 6h1v1H8z M9 7h1v1H9z M7 7h1v1H7z M8 8h1v1H8z M6 8h1v1H6z M7 9h1v1H7z M5 9h1v1H5z M6 10h1v1H6z M4 10h1v1H4z M5 11h1v1H5z M3 11h1v1H3z M4 12h1v1H4z M2 12h1v2H2z M3 14h1v1H3z M2 14h1v1H2z\" fill=\"#181818\"/>\n              <path d=\"M9 6h1v1H9z M8 7h1v1H8z M7 8h1v1H7z M6 9h1v1H6z M5 10h1v1H5z M4 11h1v1H4z M3 12h1v2H3z\" fill=\"#966826\"/>\n              <path d=\"M3 13h1v1H3z\" fill=\"#38bdf8\"/>\n              <path d=\"M5 3h6v1H5z M5 4h5v1H5z M11 4h1v2h-1z M12 5h1v6h-1z\" fill=\"#00e5ff\"/>\n              <path d=\"M7 3h4v1H7z M12 6h1v4h-1z\" fill=\"#a5f3fc\"/>\n            </svg>"];
  const sources={
    'falling-pickaxe':'https://pixmove.com/games/falling_pickaxe',
    'tower-rush':'https://galaxsys.co/games/tower-rush/',
    'ice-fishing':'https://games.evolution.com/live-casino/game-shows/ice-fishing/'
  };
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let selected='falling-pickaxe',language='en',galleryIndex=0;
  try {const saved=localStorage.getItem('hub_rules_game');if(games.some(g=>g.id===saved))selected=saved;}catch(_){}
  function select(id,track=true){
    if(!games.some(g=>g.id===id))return;
    selected=id;
    document.querySelectorAll('[data-rule]').forEach(button=>{
      const active=button.dataset.rule===selected;
      button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;
    });
    document.querySelectorAll('.rule-panel').forEach(panel=>{panel.hidden=panel.id!=='rules-'+selected;});
    try{localStorage.setItem('hub_rules_game',selected);}catch(_){}
    if(track)root.HubTracker.track('rules_game_change',{game:id});
  }
  const head=(number,kicker,title)=>'<header class="rules-section-head"><span class="rule-section-number" aria-hidden="true">'+number+'</span><div><p class="rule-kicker">'+escape(kicker)+'</p><h3>'+escape(title)+'</h3></div></header>';
  const fact=(label,value)=>'<div class="rule-fact"><span>'+escape(label)+'</span><strong>'+escape(value)+'</strong></div>';
  const paragraphs=text=>String(text).split(/(?:<br\s*\/?\s*>\s*)+/i).filter(Boolean).map(part=>'<p>'+escape(part)+'</p>').join('');
  const hero=(game,provider,copy)=>'<section class="rule-hero detailed-hero"><div class="rule-hero-copy"><span class="rule-provider" dir="ltr">'+escape(provider)+'</span><h2 dir="ltr">'+escape(game.name)+'</h2>'+copy.map(paragraphs).join('')+'</div><div class="rule-hero-art"><img src="'+game.image+'" alt="" width="500" height="300" loading="lazy"></div></section>';
  const sourceLink=(id,label)=>'<div class="rule-end"><a class="official-source" href="'+sources[id]+'" target="_blank" rel="noopener noreferrer">'+escape(label)+'</a></div>';
  function pickaxeMarkup(game,u,d){
    const copy=root.HubLocales[language];
    let html='<div class="detailed-rules pickaxe-rules">'+hero(game,'Pixmove',[copy.heroDesc,copy.heroDesc2]);
    html+='<div class="rule-facts">'+fact(u.provider,'Pixmove')+fact(u.kind,u.fast)+fact('RTP','95%')+'</div>';
    html+='<section class="rules-section">'+head('01',d.detailsTitle,copy.mechHeader)+'<div class="rule-mechanics">';
    for(let i=1;i<=6;i++)html+='<article class="rule-mechanic"><span class="mechanic-symbol" aria-hidden="true">'+['◉','♥','◇','✦','◎','▦'][i-1]+'</span><div><h4>'+escape(copy['m'+i+'Title'])+'</h4>'+paragraphs(copy['m'+i+'Desc'])+'</div></article>';
    html+='</div></section><section class="rules-section">'+head('02',copy.pickSectionTitle,copy.pickTitle)+'<p class="rule-section-intro">'+escape(copy.pickHint)+'</p><ul class="rule-steps pickaxe-tools">';
    for(let i=1;i<=4;i++)html+='<li class="pickaxe-tool'+(i===4?' diamond-tool':'')+'"><div class="pickaxe-tool-art">'+pickaxeArt[i-1]+'<span class="tool-hp">'+escape(copy['hp'+[100,150,200,400][i-1]])+'</span></div><div><h4>'+escape(copy['p'+i+'Name'])+'</h4>'+paragraphs(copy['p'+i+'Desc'])+'</div></li>';
    return html+'</ul></section>'+sourceLink(game.id,u.official)+'</div>';
  }
  function gallery(d){
    let html='<section class="rules-section rule-gallery">'+head('05',d.galleryKicker,d.galleryTitle)+'<p class="rule-section-intro">'+escape(d.galleryDescription)+'</p><div class="rule-gallery-stage">';
    for(let i=0;i<5;i++)html+='<figure data-gallery-slide="'+i+'"'+(i===galleryIndex?'':' hidden')+'><img src="assets/gallery-tower-rush-0'+(i+1)+'.webp" alt="'+escape(d['galleryAlt'+(i+1)])+'" width="938" height="540" loading="lazy"><figcaption>'+escape(d['galleryAlt'+(i+1)])+'</figcaption></figure>';
    html+='</div><div class="rule-gallery-controls"><div class="rule-gallery-dots" role="group" aria-label="'+escape(d.gallerySelect)+'">';
    for(let i=0;i<5;i++)html+='<button type="button" data-gallery-index="'+i+'" aria-label="'+escape(d.galleryDot.replace('{number}',i+1))+'" aria-pressed="'+(i===galleryIndex)+'"><span aria-hidden="true">'+(i+1)+'</span></button>';
    return html+'</div><span id="towerGalleryCounter" dir="ltr" aria-live="polite">'+(galleryIndex+1)+' / 5</span></div></section>';
  }
  function updateGallery(next){
    galleryIndex=(Number(next)+5)%5;
    document.querySelectorAll('[data-gallery-slide]').forEach(slide=>{slide.hidden=Number(slide.dataset.gallerySlide)!==galleryIndex;});
    document.querySelectorAll('[data-gallery-index]').forEach(button=>{button.setAttribute('aria-pressed',String(Number(button.dataset.galleryIndex)===galleryIndex));});
    const counter=document.getElementById('towerGalleryCounter');if(counter)counter.textContent=(galleryIndex+1)+' / 5';
  }
  function multiplierSteps(label){
    const ranges=['x1–x3','x5–x10','x10–x30','x30–x100','x100–x500','x500+'];
    return '<div class="tower-multiplier-chart" role="group" aria-label="'+escape(label)+'">'+ranges.map((range,i)=>'<div class="tower-multiplier-tier"><strong dir="ltr">'+range+'</strong><div class="tower-multiplier-bar" aria-hidden="true" style="--tier-height:'+[18,34,52,70,88,88][i]+'%"></div></div>').join('')+'</div>';
  }
  function tactics(d){
    const names=['conservative','moderate','aggressive'];
    let html='<section class="rules-section tower-tactics-section">'+head('04',d.detailsTitle,d.tacticsTitle)+'<div class="tower-tactics-grid">';
    names.forEach((name,i)=>{html+='<article class="tower-tactic"><h4>'+escape(d[name+'Title'])+'</h4><p class="tower-tactic-target">'+escape(d[name+'Head'])+'</p><p>'+escape(i===0?d.autoText:i===1?d.rngText:d.fairnessText)+'</p></article>';});
    html+='</div><div class="tower-tips">';
    for(const key of ['plusFrozen','plusPlayers'])html+='<article><h4>'+escape(d[key+'Title'])+'</h4><p>'+escape(d[key+'Text'])+'</p></article>';
    return html+'</div></section>';
  }
  function markup(id){
    const u=root.HubUpgradeLocales[language].ui,d=root.HubTowerRules[language],ice=root.HubIceRules[language];
    const g=games.find(game=>game.id===id),isTower=id==='tower-rush',provider=isTower?'Galaxsys':'Evolution';
    if(id==='falling-pickaxe')return pickaxeMarkup(g,u,d);
    let html='<div class="detailed-rules '+(isTower?'tower-rules':'ice-rules')+'">'+hero(g,provider,[isTower?d.rulesDescription2:ice.intro]);
    html+='<div class="rule-facts">'+fact(u.provider,provider)+fact(u.kind,isTower?u.fast:u.live)+fact(isTower?'RTP':u.wheel,isTower?'96.2%–97.6%':'53')+'</div>';
    html+='<section class="rules-section">'+head('01',d.rulesKicker,u.howTo)+'<ol class="rule-steps">';
    for(let i=0;i<4;i++)html+='<li><span class="step-number" aria-hidden="true">0'+(i+1)+'</span>'+(isTower?'<span class="tower-step-icon" aria-hidden="true">'+['💰','🏗️','✋','💥'][i]+'</span>':'')+'<div>'+(isTower?'<h4>'+escape(d['step'+(i+1)+'Title'])+'</h4>':'')+'<p>'+escape(isTower?d['step'+(i+1)+'Text']:ice.steps[i])+'</p></div></li>';
    html+='</ol>'+(isTower?'<div class="tower-try"><a class="game-play" data-game="tower-rush" href="https://lkuf.cc/6561aa49" target="_blank" rel="noopener noreferrer">'+escape(d.tryNowBtn)+'</a></div>':'')+'</section><section class="rules-section">'+head('02',d.detailsTitle,d.mechanicsTitle)+'<div class="rule-mechanics">';
    const mechanics=isTower?['rng','auto','players','fairness'].map(key=>[d[key+'Title'],d[key+'Text']]):[[u.wheel,ice.mechanics[0]],[u.multiplier,ice.mechanics[1]],['All Bonuses',ice.mechanics[2]],['RTP',ice.mechanics[3]]];
    mechanics.forEach(([title,body],i)=>{html+='<article class="rule-mechanic"><span class="mechanic-symbol" aria-hidden="true">'+(isTower?['🎲','⚡','👥','🛡️']:['◉','◎','◇','≋'])[i]+'</span><div><h4>'+escape(title)+'</h4><p>'+escape(body)+'</p></div></article>';});
    html+='</div></section><section class="rules-section">'+head('03',d.multipliersKicker,d.multipliersTitle)+(isTower?multiplierSteps(d.multipliersTitle)+'<div class="tower-bonus-heading"><h4>'+escape(d.bonusModesTitle)+'</h4><p>'+escape(d.bonusModesSubtitle)+'</p></div>':'')+'<div class="rule-bonuses">';
    const bonusTitles=isTower?[d.frozenName,d.templeName,d.tripleName]:['Lil’ Blues','Big Oranges','Huge Reds'];
    const bonusCopy=isTower?[d.frozenText,d.templeText,d.tripleText]:ice.bonuses;
    const colors=['blue','orange','red'];
    bonusTitles.forEach((title,i)=>{
      html+='<article class="rule-bonus bonus-'+colors[i]+'"><div class="rule-bonus-visual">'+(isTower?'<span class="floor-symbol" aria-hidden="true">'+['❄','◈','▥'][i]+'</span>':'<img src="assets/ice-fish-'+colors[i]+'.png" alt="" width="225" height="167" loading="lazy">')+'</div><div class="rule-bonus-copy"><h4'+(isTower?'':' dir="ltr"')+'>'+escape(title)+'</h4>'+(isTower?'':'<p class="fish-range" dir="ltr">'+['3×–100×','4×–200×','10×–500×'][i]+'</p>')+'<p>'+escape(bonusCopy[i])+'</p></div></article>';
    });
    html+='</div></section>';
    if(isTower)html+=tactics(d)+gallery(d);
    else {
      html+='<section class="rules-section rule-faq">'+head('04',d.detailsTitle,ice.faqTitle)+'<div class="rule-faq-list">'+ice.faq.map(([q,a])=>'<details><summary>'+escape(q)+'<span aria-hidden="true">+</span></summary><p>'+escape(a)+'</p></details>').join('')+'</div></section>';
    }
    html+=sourceLink(id,u.official)+'</div>';
    return html;
  }
  document.getElementById('rules-tower-rush').addEventListener('click',event=>{
    const button=event.target.closest('[data-gallery-step],[data-gallery-index]');
    if(!button)return;
    updateGallery(button.dataset.galleryIndex!==undefined?Number(button.dataset.galleryIndex):galleryIndex+Number(button.dataset.galleryStep));
  });
  document.querySelectorAll('[data-rule]').forEach(button=>{
    button.addEventListener('click',()=>select(button.dataset.rule));
    button.addEventListener('keydown',event=>{
      const buttons=Array.from(document.querySelectorAll('[data-rule]')),index=buttons.indexOf(button);
      const rtl=document.documentElement.dir==='rtl';let next=index;
      if(event.key==='ArrowRight')next=(index+(rtl?-1:1)+buttons.length)%buttons.length;
      else if(event.key==='ArrowLeft')next=(index+(rtl?1:-1)+buttons.length)%buttons.length;
      else if(event.key==='Home')next=0;else if(event.key==='End')next=buttons.length-1;else return;
      event.preventDefault();buttons[next].focus();select(buttons[next].dataset.rule);
    });
  });
  root.HubRules={select,render(locale){language=root.HubUpgradeLocales[locale]?locale:'en';
    document.getElementById('rulesTabs').setAttribute('aria-label',root.HubUpgradeLocales[language].ui.rulesTitle);
    for(const {id} of games)document.getElementById('rules-'+id).innerHTML=markup(id);
    select(selected,false);
  },getSelected:()=>selected,getGalleryIndex:()=>galleryIndex};
})(window);
