const test=require('node:test');
const assert=require('node:assert/strict');
const {sources}=require('../assets/catalog');
const {knownSource,sourceTitle}=require('../lib/partner-source');
const {format,normalize}=require('../lib/partner-postbacks');
test('all Game Select sources resolve using postback codes and landing URLs',()=>{
  for(const [code,title] of Object.entries(sources)){
    const expected=title.replace(/^Facebook · /,'');
    assert.equal(sourceTitle({sub2:code}),expected);
    assert.equal(knownSource('https://falling-pickaxe-1win.vercel.app/'+code),expected);
  }
  assert.equal(knownSource('https://unrelated.test/fb1'),'');
  assert.equal(sourceTitle({sub2:'fb999',source_name:'{source_name}'}),'');
});
test('Game Select notifications show full profile, flag, amount and explicit currency only',()=>{
  const data=normalize({user_id:'123',country:'BR',amount:'12.50',sub2:'fb1',test:'1'},'first_deposit');
  const text=format(data);
  assert.match(text,/ТЕСТ/);assert.match(text,/ПЕРВЫЙ ДЕПОЗИТ/);
  assert.match(text,/🇧🇷 Бразилия/);assert.match(text,/Источник: Matias Gonzales/);
  assert.match(text,/Депозит: <b>12.50<\/b>/);assert.ok(!text.includes('$'));
  assert.match(format({...data,currency:'USD'}),/\$12.50/);
  assert.match(format({...data,type:'redeposit'}),/ПОВТОРНЫЙ ДЕПОЗИТ/);
});
