/* Original payment controls, reviews and demo activity UI. */
(function(root) {
'use strict';
let _activeLang='en', _userCountry=null, _currentPaymentMethod=null;
const PAYMENT_METHODS=root.HubPayments.methods;
const getPaymentConfig=root.HubPayments.get;
function translationValue(key) { return root.HubLocales[_activeLang]?.[key] ?? root.HubLocales.en[key]; }
function t(key,params={}) {
  const value=translationValue(key);
  if(typeof value!=='string') return '';
  return value.replace(/\{(\w+)\}/g,(match,name)=> Object.hasOwn(params,name)?String(params[name]):match);
}
function methodName(id) { const method=PAYMENT_METHODS[id];return method ? (method.label?t(method.label):method.brand):''; }
function renderChips(containerId,ids) {
  const container=document.getElementById(containerId);container.replaceChildren();
  if(!ids.length) { const empty=document.createElement('span');empty.className='payment-empty';empty.textContent=t('paymentUnknownCountry');container.append(empty);return; }
  for(const id of ids) {
    const method=PAYMENT_METHODS[id];if(!method) continue;
    const chip=document.createElement('span');chip.className='chip-item';chip.dataset.method=id;
    const name=document.createElement('strong');name.textContent=methodName(id);
    chip.append(method.icon+' ',name);container.append(chip);
  }
}
function renderGeoPaymentChips() {
  const config=getPaymentConfig(_userCountry);
  const registration=document.getElementById('geoRegChips');registration.replaceChildren();
  for(const [icon,key] of [['⚡','regQuick'],['📱','regPhone'],['✉️','regEmail']]) {const chip=document.createElement('span');chip.className='chip-item';chip.textContent=icon+' '+t(key);registration.append(chip);}
  renderChips('geoPaymentChips',config.deposit);renderChips('geoWithdrawChips',config.withdraw);
  document.getElementById('geoCurrency').textContent=t('currencyLabel')+': '+(config.currency||t('unavailable'));
  const select=document.getElementById('paymentMethod');select.replaceChildren();
  for(const id of config.deposit) select.add(new Option(methodName(id),id));
  if(!config.deposit.includes(_currentPaymentMethod)) _currentPaymentMethod=config.deposit[0]||null;
  if(_currentPaymentMethod) select.value=_currentPaymentMethod;
  document.getElementById('paymentSelection').hidden=!config.deposit.length;
  renderPaymentInstructions();
  const withdrawals=document.querySelector('[data-i18n="depStep5Desc"]');
  withdrawals.textContent=config.withdraw.length ? t('withdrawInstruction',{methods:config.withdraw.map(methodName).join(', ')}) : t('paymentUnknownCountry');
}
function renderPaymentInstructions() {
  const config=getPaymentConfig(_userCountry);
  const node=document.querySelector('[data-i18n="depStep2Desc"]');
  node.textContent=_currentPaymentMethod && config.deposit.includes(_currentPaymentMethod) ? t('paymentInstruction',{method:methodName(_currentPaymentMethod),currency:config.currency}) : t('paymentUnknownCountry');
}
function selectPaymentMethod(value) { if(getPaymentConfig(_userCountry).deposit.includes(value)) {_currentPaymentMethod=value;renderPaymentInstructions();} }
function renderRandomReviews() {
  const pool=translationValue('reviewsPool');const grid=document.getElementById('reviewsGrid');grid.replaceChildren();
  if(!Array.isArray(pool) || !pool.length) {grid.textContent=t('emptyReviews');return;}
  const selected=pool.slice().sort(()=>Math.random()-0.5).slice(0,6);
  for(const review of selected) {
    const card=document.createElement('div');card.className='review-card';
    const header=document.createElement('div');header.className='review-header';
    const info=document.createElement('div');info.className='user-info';
    const avatar=document.createElement('div');avatar.className='user-avatar';avatar.textContent=review.name.charAt(0);
    const author=document.createElement('strong');author.textContent=review.name;
    const city=document.createElement('small');city.textContent=review.city;city.className='review-city';
    const authorInfo=document.createElement('div');authorInfo.append(author,document.createElement('br'),city);info.append(avatar,authorInfo);
    const rate=document.createElement('span');rate.className='review-rate';rate.textContent=review.rate;header.append(info,rate);
    const stars=document.createElement('div');stars.className='stars';stars.textContent=review.stars;stars.setAttribute('aria-label',t('rating',{rating:review.rate}));
    const body=document.createElement('p');body.textContent=review.text;card.append(header,stars,body);grid.append(card);
  }
}
document.getElementById('paymentMethod').addEventListener('change',event=>selectPaymentMethod(event.target.value));
root.HubLegacy={
  render({language,country}) {
    _activeLang=language; _userCountry=country;
    renderGeoPaymentChips();renderRandomReviews();
  },
  renderReviews:renderRandomReviews,
};
})(window);
