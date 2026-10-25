'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { formatVisitor } = require('../lib/visitors');
const { attribution, platformName, sourceDetails } = require('../lib/site-source');

test('visitor card separates platform and full profile and only shows requested details', () => {
  const text = formatVisitor({number:14,source:'Instagram · falling.pickaxe1',country:'UA',language:'uk',views:1,clicks:1,
    attribution:{source_code:'ig1',channel:'social',creative:'link_in_bio',campaign:'old'},games:['falling-pickaxe','ice-fishing'],
    history:[{at:1792960800000,event:'affiliate_click',game:'falling-pickaxe',button_label:'ГРАТИ FALLING PICKAXE',app:'Instagram'}]});
  assert.match(text,/Площадка:<\/b> Instagram/);
  assert.match(text,/Название:<\/b> falling\.pickaxe1/);
  assert.match(text,/🇺🇦 Украина · <b>Язык:<\/b> uk/);
  assert.match(text,/Просмотры:<\/b> 1/);
  assert.match(text,/Переходы:<\/b> 1/);
  assert.match(text,/➡️ .*Нажал ссылку на 1win\n    FALLING PICKAXE · ГРАТИ FALLING PICKAXE/);
  assert.equal(text.match(/Instagram/g).length,1);
  assert.doesNotMatch(text,/Канал|Креатив|Кампания|Первый визит|ICE FISHING|link_in_bio/);
  assert.deepEqual(sourceDetails({source:'outdated',attribution:{source_code:'fb1'}}),{platform:'Facebook',name:'Matias Gonzales'});
});

test('social referrers, app browsers and short codes resolve without inventing profile names', () => {
  const req = {headers:{host:'games.test'}};
  for (const [host,platform] of Object.entries({'l.facebook.com':'Facebook','l.instagram.com':'Instagram','vm.tiktok.com':'TikTok','www.youtube.com':'YouTube','youtu.be':'YouTube','t.co':'X / Twitter','mobile.twitter.com':'X / Twitter','x.com':'X / Twitter','t.me':'Telegram'})) {
    const a = attribution({referrer_host:host},req,'');
    assert.equal(a.platform,platform);
    assert.deepEqual(sourceDetails({source:a.source,attribution:a}),{platform,name:'Не определено'});
  }
  assert.equal(attribution({}, {headers:{'user-agent':'Mozilla [FBAN/FBIOS;FBAV/500]'}},'').platform,'Facebook');
  assert.equal(attribution({source_code:'ig1',referrer_host:'vercel.com'},req,'').platform,'Instagram');
  assert.equal(attribution({source:'t.co'},req,'').platform,'X / Twitter');
  for (const value of ['notfacebook.com','youtube.com.evil.test','myinstagramprofile']) assert.equal(platformName(value),'');
  assert.deepEqual(sourceDetails({source:'vercel.com'}),{platform:'Другой сайт',name:'Не определено'});
  assert.deepEqual(sourceDetails({source:'Direct'}),{platform:'Прямой / источник скрыт',name:'Не определено'});
});
