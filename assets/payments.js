/* Regional reference data, not a claim of merchant integration. Sources: PAYMENT-METHODS.md.
 * Country controls methods/currency; interface language only controls labels.
 * Cash vouchers are intentionally absent from withdrawal lists.
 */
(function(root){
  'use strict';
  const names={
    cards:'Visa / Mastercard',pix:'Pix',boleto:'Boleto',picpay:'PicPay',spei:'SPEI',oxxo:'OXXO',
    pse:'PSE',nequi:'Nequi',efecty:'Efecty',rapipago:'Rapipago',pagofacil:'Pago Fácil',
    yape:'Yape',pagoefectivo:'PagoEfectivo',webpay:'Webpay',khipu:'Khipu',
    easypaisa:'Easypaisa',jazzcash:'JazzCash',upi:'UPI',netbanking:'NetBanking',rupay:'RuPay',
    bkash:'bKash',nagad:'Nagad',esewa:'eSewa',khalti:'Khalti',lankaqr:'LANKAQR',
    dana:'DANA',ovo:'OVO',qris:'QRIS',gcash:'GCash',maya:'Maya',fpx:'FPX',duitnow:'DuitNow',
    promptpay:'PromptPay',truemoney:'TrueMoney',momo:'MoMo',zalopay:'ZaloPay',khqr:'KHQR',
    bcel:'BCEL One',qpay:'QPay',jcb:'JCB',konbini:'Konbini',alipayhk:'AlipayHK',fps:'FPS',paynow:'PayNow',
    fawry:'Fawry',vodafone:'Vodafone Cash',mada:'mada',
    orange:'Orange Money',mtn:'MTN MoMo',moov:'Moov Money',wave:'Wave',tmoney:'TMoney',
    mpesa:'M-PESA',airtel:'Airtel Money',verve:'Verve',
    cb:'Cartes Bancaires',sepa:'SEPA',bizum:'Bizum',mbway:'MB WAY',multibanco:'Multibanco',
    ideal:'iDEAL | Wero',bancontact:'Bancontact',mobilepay:'MobilePay',swish:'Swish',twint:'TWINT',
    eps:'EPS',blik:'BLIK',przelewy24:'Przelewy24',
    mir:'МИР',sbp:'СБП',humo:'HUMO',kaspi:'Kaspi QR',interac:'Interac e-Transfer',ach:'ACH',payid:'PayID'
  };
  const cardMethods=new Set(['cards','rupay','jcb','mada','verve','cb','mir','humo']);
  const cashMethods=new Set(['boleto','oxxo','efecty','rapipago','pagofacil','pagoefectivo','konbini','fawry']);
  const bankMethods=new Set(['pix','spei','pse','khipu','upi','netbanking','fpx','duitnow','promptpay','fps','paynow','sepa','ideal','eps','przelewy24','sbp','interac','ach','payid']);
  const methods={bank:{icon:'🏦',label:'bankTransfer'}};
  for(const [id,brand] of Object.entries(names)) methods[id]={brand,icon:cardMethods.has(id)?'💳':cashMethods.has(id)?'▤':bankMethods.has(id)?'▥':'◈'};
  // An explicit entry for every configured GEO, including territories. The conservative
  // bank/card entries are used where no specific regional rail has been verified.
  const rows={
    BR:'pix boleto picpay cards|pix bank',MX:'spei oxxo cards|spei bank',CO:'pse nequi efecty cards|nequi bank',
    AR:'rapipago pagofacil cards bank|bank',BO:'bank cards|bank',CR:'bank cards|bank',EC:'bank cards|bank',
    HN:'bank cards|bank',PA:'bank cards|bank',PY:'bank cards|bank',PE:'yape pagoefectivo cards|bank',
    CL:'webpay khipu cards|bank',DO:'bank cards|bank',VE:'bank|bank',
    PK:'easypaisa jazzcash bank|easypaisa jazzcash bank',IN:'upi netbanking rupay cards|bank',
    BD:'bkash nagad bank|bkash nagad bank',NP:'esewa khalti bank|bank',LK:'lankaqr cards bank|bank',
    ID:'dana ovo qris bank|bank',PH:'gcash maya cards bank|bank',MY:'fpx duitnow cards|bank',
    TH:'promptpay truemoney cards|bank',VN:'momo zalopay bank|bank',KH:'khqr bank|bank',
    LA:'bcel bank|bank',MN:'qpay cards bank|bank',JP:'jcb cards konbini bank|bank',
    TW:'jcb cards bank|bank',HK:'fps alipayhk cards|bank',SG:'paynow cards bank|bank',
    EG:'fawry vodafone cards|bank',SA:'mada cards bank|bank',AE:'cards bank|bank',QA:'cards bank|bank',
    JO:'bank cards|bank',LB:'bank cards|bank',SY:'bank|bank',IQ:'bank|bank',YE:'bank|bank',PS:'bank cards|bank',
    LY:'bank|bank',DZ:'bank|bank',MA:'cards bank|bank',
    SN:'wave orange cards|wave orange bank',CI:'orange mtn moov wave cards|orange mtn moov wave bank',
    CM:'mtn orange cards|mtn orange bank',BJ:'mtn moov bank|mtn moov bank',TG:'tmoney moov bank|tmoney moov bank',
    BF:'orange moov bank|orange moov bank',ML:'orange moov bank|moov bank',NE:'bank|bank',TD:'bank|bank',GA:'bank cards|bank',
    CD:'mpesa orange airtel bank|mpesa orange airtel bank',CG:'bank cards|bank',CF:'orange bank|bank',MR:'bank|bank',
    NG:'verve cards bank|bank',ZM:'bank cards|bank',GH:'mtn cards bank|bank',KE:'mpesa cards bank|bank',
    TZ:'mpesa airtel bank|bank',LR:'orange bank|bank',ZW:'bank cards|bank',MZ:'mpesa bank cards|bank',NA:'bank cards|bank',
    MW:'bank cards|bank',LS:'mpesa bank cards|bank',SZ:'bank cards|bank',ZA:'bank cards|bank',
    FR:'cb cards sepa|sepa bank',IT:'cards sepa|sepa bank',ES:'bizum cards sepa|sepa bank',
    PT:'mbway multibanco cards sepa|sepa bank',DE:'sepa cards|sepa bank',GB:'cards bank|bank',
    NL:'ideal cards sepa|sepa bank',BE:'bancontact cards sepa|sepa bank',FI:'mobilepay cards sepa|sepa bank',
    SE:'swish cards bank|bank',IE:'cards sepa|sepa bank',CH:'twint cards bank|bank',AT:'eps cards sepa|sepa bank',
    PL:'blik przelewy24 cards bank|bank',CZ:'cards bank|bank',HU:'cards bank|bank',RO:'cards bank|bank',
    BG:'cards sepa|sepa bank',GR:'cards sepa|sepa bank',LT:'cards sepa|sepa bank',LV:'cards sepa|sepa bank',LU:'cards sepa|sepa bank',
    MD:'cards bank|bank',UA:'cards bank|bank',KZ:'kaspi cards bank|bank',UZ:'humo bank|humo bank',TJ:'bank|bank',RU:'sbp mir bank|sbp mir bank',
    TR:'cards bank|bank',IL:'cards bank|bank',MV:'cards bank|bank',PF:'cards bank|bank',AS:'cards bank|bank',
    MQ:'cb cards sepa|sepa bank',TT:'cards bank|bank',HT:'bank cards|bank',CA:'interac cards bank|interac bank',
    US:'ach cards bank|ach bank',AU:'payid cards bank|bank',NZ:'cards bank|bank'
  };
  const countries=Object.fromEntries(Object.entries(rows).map(([country,row])=>{
    const [deposit,withdraw]=row.split('|');
    return [country,Object.freeze({deposit:Object.freeze(deposit.split(' ')),withdraw:Object.freeze(withdraw.split(' '))})];
  }));
  const get=country=>{
    const code=String(country||'').toUpperCase();
    if(!Object.hasOwn(countries,code)||!root.HubGeo[code]?.currency)return {country:'DEFAULT',currency:null,deposit:[],withdraw:[]};
    return {country:code,currency:root.HubGeo[code].currency,deposit:[...countries[code].deposit],withdraw:[...countries[code].withdraw]};
  };
  root.HubPayments={methods:Object.freeze(methods),countries:Object.freeze(countries),get};
})(window);
