/* Source-specific, self-declared 18+ access screen. Not an identity or age verification service. */
(function (root) {
  'use strict';
  const copy = {
    en: ['ADULTS ONLY · 18+', 'Are you 18 or older?', 'This site contains information about gambling. You must be at least 18 to continue.', 'Yes, I am 18+', 'No', 'Access is restricted to adults aged 18 or older.'],
    ru: ['ТОЛЬКО ДЛЯ ВЗРОСЛЫХ · 18+', 'Вам есть 18 лет?', 'На сайте представлена информация об азартных играх. Для продолжения вам должно быть не менее 18 лет.', 'Да, мне есть 18', 'Нет', 'Доступ разрешён только пользователям старше 18 лет.'],
    'pt-BR': ['SOMENTE MAIORES DE 18', 'Você tem 18 anos ou mais?', 'Este site contém informações sobre jogos de azar. É necessário ter pelo menos 18 anos para continuar.', 'Sim, tenho 18+', 'Não', 'Acesso permitido apenas a maiores de 18 anos.'],
    pt: ['APENAS MAIORES DE 18', 'Tem 18 anos ou mais?', 'Este site contém informações sobre jogos de azar. Tem de ter pelo menos 18 anos para continuar.', 'Sim, tenho 18+', 'Não', 'O acesso é permitido apenas a maiores de 18 anos.'],
    es: ['SOLO MAYORES DE 18', '¿Tienes 18 años o más?', 'Este sitio contiene información sobre juegos de azar. Debes tener al menos 18 años para continuar.', 'Sí, tengo 18+', 'No', 'El acceso está reservado a mayores de 18 años.'],
    fr: ['RÉSERVÉ AUX ADULTES · 18+', 'Avez-vous 18 ans ou plus ?', 'Ce site contient des informations sur les jeux d’argent. Vous devez avoir au moins 18 ans pour continuer.', 'Oui, j’ai 18 ans', 'Non', 'Accès réservé aux personnes âgées d’au moins 18 ans.'],
    de: ['NUR FÜR ERWACHSENE · 18+', 'Sind Sie mindestens 18 Jahre alt?', 'Diese Website enthält Informationen über Glücksspiele. Der Zugang ist nur für Erwachsene.', 'Ja, ich bin 18+', 'Nein', 'Der Zugang ist nur für Personen ab 18 Jahren erlaubt.'],
    it: ['SOLO MAGGIORENNI · 18+', 'Hai almeno 18 anni?', 'Questo sito contiene informazioni sul gioco d’azzardo. Devi avere almeno 18 anni per continuare.', 'Sì, ho 18 anni', 'No', 'L’accesso è riservato ai maggiorenni.'],
    ar: ['للبالغين فقط · +18', 'هل عمرك 18 عامًا أو أكثر؟', 'يحتوي هذا الموقع على معلومات عن ألعاب القمار. يجب أن تبلغ 18 عامًا على الأقل للمتابعة.', 'نعم، عمري 18+', 'لا', 'الدخول متاح للبالغين بعمر 18 عامًا أو أكثر فقط.'],
    ur: ['صرف بالغ افراد · 18+', 'کیا آپ کی عمر 18 سال یا اس سے زیادہ ہے؟', 'یہ ویب سائٹ جوئے کے بارے میں معلومات رکھتی ہے۔ آگے بڑھنے کے لیے آپ کی عمر کم از کم 18 سال ہونی چاہیے۔', 'ہاں، میری عمر 18+ ہے', 'نہیں', 'رسائی صرف 18 سال یا اس سے زیادہ عمر کے بالغ افراد کے لیے ہے۔'],
    hi: ['केवल वयस्कों के लिए · 18+', 'क्या आपकी उम्र 18 वर्ष या उससे अधिक है?', 'इस साइट पर जुए से संबंधित जानकारी है। आगे बढ़ने के लिए आपकी उम्र कम से कम 18 साल होनी चाहिए।', 'हाँ, मेरी उम्र 18+ है', 'नहीं', 'केवल 18 वर्ष या उससे अधिक आयु के वयस्क ही प्रवेश कर सकते हैं।'],
    bn: ['শুধুমাত্র প্রাপ্তবয়স্কদের জন্য · ১৮+', 'আপনার বয়স কি ১৮ বছর বা বেশি?', 'এই সাইটে জুয়া সম্পর্কে তথ্য রয়েছে। চালিয়ে যেতে আপনার বয়স কমপক্ষে ১৮ বছর হতে হবে।', 'হ্যাঁ, আমার বয়স ১৮+', 'না', 'শুধুমাত্র ১৮ বছর বা তার বেশি বয়সীরা প্রবেশ করতে পারবেন।'],
    ne: ['१८+ वयस्कका लागि मात्र', 'के तपाईंको उमेर १८ वर्ष वा सोभन्दा बढी छ?', 'यस साइटमा जुवासम्बन्धी जानकारी छ। अघि बढ्न कम्तीमा १८ वर्षको हुनुपर्छ।', 'हो, म १८+ हुँ', 'होइन', '१८ वर्ष वा सोभन्दा माथिका व्यक्तिलाई मात्र प्रवेश अनुमति छ।'],
    id: ['KHUSUS DEWASA · 18+', 'Apakah Anda berusia 18 tahun atau lebih?', 'Situs ini memuat informasi tentang perjudian. Anda harus berusia minimal 18 tahun untuk melanjutkan.', 'Ya, saya 18+', 'Tidak', 'Akses hanya untuk orang dewasa berusia 18 tahun ke atas.'],
    fil: ['PARA SA 18+ LAMANG', 'Ikaw ba ay 18 taong gulang pataas?', 'May impormasyon tungkol sa pagsusugal ang site na ito. Dapat 18 taong gulang ka pataas upang magpatuloy.', 'Oo, 18+ ako', 'Hindi', 'Para lamang sa mga 18 taong gulang pataas ang access.'],
    ms: ['UNTUK DEWASA SAHAJA · 18+', 'Adakah anda berumur 18 tahun ke atas?', 'Laman ini mengandungi maklumat perjudian. Anda mesti berumur sekurang-kurangnya 18 tahun untuk meneruskan.', 'Ya, saya 18+', 'Tidak', 'Akses hanya untuk mereka yang berumur 18 tahun ke atas.'],
    th: ['สำหรับผู้ใหญ่เท่านั้น · 18+', 'คุณอายุ 18 ปีขึ้นไปหรือไม่?', 'เว็บไซต์นี้มีข้อมูลเกี่ยวกับการพนัน คุณต้องมีอายุอย่างน้อย 18 ปีเพื่อดำเนินการต่อ', 'ใช่ ฉันอายุ 18+', 'ไม่', 'อนุญาตให้เฉพาะผู้ที่มีอายุ 18 ปีขึ้นไปเข้าถึง'],
    vi: ['CHỈ DÀNH CHO NGƯỜI TỪ 18 TUỔI', 'Bạn đã đủ 18 tuổi chưa?', 'Trang web này có thông tin về cờ bạc. Bạn phải từ 18 tuổi trở lên để tiếp tục.', 'Có, tôi đủ 18 tuổi', 'Không', 'Chỉ người từ 18 tuổi trở lên được truy cập.'],
    km: ['សម្រាប់មនុស្សអាយុ 18+ ប៉ុណ្ណោះ', 'តើអ្នកមានអាយុ 18 ឆ្នាំ ឬលើសនេះទេ?', 'គេហទំព័រនេះមានព័ត៌មានអំពីល្បែងស៊ីសង។ អ្នកត្រូវមានអាយុយ៉ាងតិច 18 ឆ្នាំ។', 'បាទ/ចាស ខ្ញុំអាយុ 18+', 'ទេ', 'អនុញ្ញាតសម្រាប់តែមនុស្សអាយុ 18 ឆ្នាំឡើងទៅ។'],
    lo: ['ສໍາລັບຜູ້ໃຫຍ່ 18+ ເທົ່ານັ້ນ', 'ທ່ານອາຍຸ 18 ປີຂຶ້ນໄປບໍ?', 'ເວັບໄຊນີ້ມີຂໍ້ມູນເກື່ອງການພະນັນ. ຕ້ອງມີອາຍຸຢ່າງໜ້ອຍ 18 ປີ.', 'ແມ່ນ, ຂ້ອຍອາຍຸ 18+', 'ບໍ່', 'ສະເພາະຜູ້ອາຍຸ 18 ປີຂຶ້ນໄປ.'],
    si: ['වැඩිහිටියන්ට පමණයි · 18+', 'ඔබට වයස අවුරුදු 18ක් හෝ ඊට වැඩිද?', 'මෙම වෙබ් අඩවියේ සූදුව පිළිබඳ තොරතුරු ඇත. ඉදිරියට යාමට ඔබට අවුරුදු 18ක් විය යුතුය.', 'ඔව්, මට 18+', 'නැත', 'ප්‍රවේශය වයස අවුරුදු 18ට වැඩි අයට පමණි.'],
    mn: ['ЗӨВХӨН НАСАНД ХҮРЭГЧДЭД · 18+', 'Та 18 нас хүрсэн үү?', 'Энэ сайтад мөрийтэй тоглоомын мэдээлэл бий. Үргэлжлүүлэхийн тулд 18 нас хүрсэн байх ёстой.', 'Тийм, би 18+', 'Үгүй', 'Зөвхөн 18-аас дээш насныханд нэвтрэх эрхтэй.'],
    ja: ['18歳以上限定', '18歳以上ですか？', 'このサイトにはギャンブルに関する情報が含まれます。18歳以上の方のみご利用ください。', 'はい、18歳以上です', 'いいえ', '18歳未満の方はアクセスできません。'],
    'zh-TW': ['限年滿 18 歲人士', '您是否已年滿 18 歲？', '本網站包含博彩相關資訊。須年滿 18 歲方可繼續。', '是，我已滿 18 歲', '否', '僅限年滿 18 歲人士進入。'],
    'zh-HK': ['只限年滿 18 歲人士', '你是否已年滿 18 歲？', '本網站載有博彩相關資訊。必須年滿 18 歲方可繼續。', '是，我已滿 18 歲', '否', '只限年滿 18 歲人士進入。'],
    nl: ['ALLEEN 18+', 'Ben je 18 jaar of ouder?', 'Deze site bevat informatie over gokken. Je moet minimaal 18 jaar zijn om verder te gaan.', 'Ja, ik ben 18+', 'Nee', 'Alleen toegankelijk voor volwassenen van 18 jaar en ouder.'],
    fi: ['VAIN AIKUISILLE · 18+', 'Oletko vähintään 18-vuotias?', 'Sivusto sisältää tietoa rahapeleistä. Sinun on oltava vähintään 18-vuotias jatkaaksesi.', 'Kyllä, olen 18+', 'Ei', 'Pääsy on sallittu vain vähintään 18-vuotiaille.'],
    sv: ['ENDAST VUXNA · 18+', 'Är du minst 18 år?', 'Den här webbplatsen innehåller information om spel om pengar. Du måste vara minst 18 år för att fortsätta.', 'Ja, jag är 18+', 'Nej', 'Endast personer som fyllt 18 år har tillträde.'],
    pl: ['TYLKO DLA DOROSŁYCH · 18+', 'Masz co najmniej 18 lat?', 'Ta strona zawiera informacje o hazardzie. Aby kontynuować, musisz mieć co najmniej 18 lat.', 'Tak, mam 18+', 'Nie', 'Dostęp tylko dla osób pełnoletnich.'],
    cs: ['POUZE PRO DOSPĚLÉ · 18+', 'Je vám alespoň 18 let?', 'Tento web obsahuje informace o hazardních hrách. Pokračovat mohou pouze osoby starší 18 let.', 'Ano, je mi 18+', 'Ne', 'Přístup je povolen pouze dospělým od 18 let.'],
    hu: ['CSAK FELNŐTTEKNEK · 18+', 'Elmúltál már 18 éves?', 'Az oldal szerencsejátékkal kapcsolatos információkat tartalmaz. A folytatáshoz legalább 18 évesnek kell lenned.', 'Igen, 18+ vagyok', 'Nem', 'Csak 18 éven felüliek léphetnek be.'],
    ro: ['DOAR PENTRU ADULȚI · 18+', 'Ai cel puțin 18 ani?', 'Acest site conține informații despre jocurile de noroc. Trebuie să ai cel puțin 18 ani pentru a continua.', 'Da, am 18+', 'Nu', 'Acces permis doar persoanelor de peste 18 ani.'],
    bg: ['САМО ЗА ПЪЛНОЛЕТНИ · 18+', 'Навършили ли сте 18 години?', 'Този сайт съдържа информация за хазартни игри. За да продължите, трябва да сте навършили 18 години.', 'Да, навършил съм 18', 'Не', 'Достъпът е само за лица над 18 години.'],
    el: ['ΜΟΝΟ ΓΙΑ ΕΝΗΛΙΚΟΥΣ · 18+', 'Είστε τουλάχιστον 18 ετών;', 'Ο ιστότοπος περιέχει πληροφορίες για τυχερά παιχνίδια. Για να συνεχίσετε πρέπει να είστε τουλάχιστον 18 ετών.', 'Ναι, είμαι 18+', 'Όχι', 'Η πρόσβαση επιτρέπεται μόνο σε ενήλικες.'],
    lt: ['TIK SUAUGUSIESIEMS · 18+', 'Ar jums jau 18 metų?', 'Šioje svetainėje pateikiama informacija apie azartinius lošimus. Norėdami tęsti, turite būti sulaukę 18 metų.', 'Taip, man 18+', 'Ne', 'Prieiga tik asmenims nuo 18 metų.'],
    lv: ['TIKAI PIEAUGUŠAJIEM · 18+', 'Vai jums ir vismaz 18 gadi?', 'Šajā vietnē ir informācija par azartspēlēm. Lai turpinātu, jābūt vismaz 18 gadus vecam.', 'Jā, man ir 18+', 'Nē', 'Piekļuve tikai no 18 gadu vecuma.'],
    uk: ['ЛИШЕ ДЛЯ ПОВНОЛІТНІХ · 18+', 'Вам уже виповнилося 18 років?', 'На сайті є інформація про азартні ігри. Для продовження потрібно мати щонайменше 18 років.', 'Так, мені є 18', 'Ні', 'Доступ дозволений лише повнолітнім.'],
    kk: ['ТЕК 18+ ЕРЕСЕКТЕРГЕ', 'Сіздің жасыңыз 18-де немесе одан жоғары ма?', 'Бұл сайтта құмар ойындар туралы ақпарат бар. Жалғастыру үшін кемінде 18 жаста болуыңыз керек.', 'Иә, мен 18+', 'Жоқ', 'Тек 18 жастан асқандарға кіруге болады.'],
    uz: ['FAQAT KATTALAR UCHUN · 18+', 'Yoshingiz 18 da yoki undan kattami?', 'Ushbu saytda qimor o‘yinlari haqida ma’lumot bor. Davom etish uchun 18 yoshga to‘lgan bo‘lishingiz kerak.', 'Ha, 18 yoshdaman', 'Yo‘q', 'Faqat 18 yoshdan oshganlarga kirishga ruxsat.'],
    tg: ['ТАНҲО БАРОИ КАЛОНСОЛОН · 18+', 'Шумо 18-сола ё калонтар ҳастед?', 'Ин сомона маълумот дар бораи қимор дорад. Барои идома ҳадди ақал 18-сола бошед.', 'Бале, ман 18+', 'Не', 'Дастрасӣ танҳо барои шахсони аз 18-сола боло аст.'],
    tr: ['YALNIZCA YETİŞKİNLER · 18+', '18 yaşında veya daha büyük müsünüz?', 'Bu site kumar hakkında bilgiler içerir. Devam etmek için en az 18 yaşında olmalısınız.', 'Evet, 18 yaşındayım', 'Hayır', 'Erişim yalnızca 18 yaş ve üzerindeki yetişkinler içindir.'],
    he: ['למבוגרים בלבד · 18+', 'האם מלאו לך 18?', 'אתר זה מכיל מידע על הימורים. עליך להיות בן 18 לפחות כדי להמשיך.', 'כן, אני בן 18+', 'לא', 'הגישה מותרת רק לבני 18 ומעלה.']
  };
  function text(locale) {
    const value = copy[locale] || copy[String(locale || '').split('-')[0]] || copy.en;
    return { kicker:value[0], question:value[1], detail:value[2], yes:value[3], no:value[4], denied:value[5] };
  }
  function hostMatches(host, domain) { return host === domain || host.endsWith('.' + domain); }
  function sourcePlatform(opts = {}) {
    const code = String(opts.pathname || '').split('/').filter(Boolean)[0]?.toLowerCase() || '';
    const query = new URLSearchParams(String(opts.search || ''));
    const source = String(query.get('source_code') || query.get('utm_source') || query.get('source') || '').toLowerCase();
    if (/^ig\d+$/.test(code) || /^(?:ig\d+|instagram)$/.test(source)) return 'Instagram';
    if (/^(?:fb\d+|ctg\d+)$/.test(code) || /^(?:fb\d+|ctg\d+|facebook)$/.test(source)) return 'Facebook';
    if (/^yt\d+$/.test(code) || /^(?:yt\d+|youtube|youtu\.be)$/.test(source)) return 'YouTube';
    if (['Instagram','Facebook','YouTube'].includes(opts.app)) return opts.app;
    const ua = String(opts.userAgent || '');
    if (/Instagram/i.test(ua)) return 'Instagram';
    if (/FBAN|FBAV|FB_IAB|FBIOS|FB4A/i.test(ua)) return 'Facebook';
    if (/(?:YouTube\/|com\.google\.ios\.youtube|youtube\.mobile)/i.test(ua)) return 'YouTube';
    let host = '';
    try { host = new URL(opts.referrer || '').hostname.toLowerCase(); } catch (_) {}
    if (hostMatches(host,'instagram.com')) return 'Instagram';
    if (['facebook.com','fb.com','fb.me'].some(domain=>hostMatches(host,domain))) return 'Facebook';
    if (['youtube.com','youtu.be'].some(domain=>hostMatches(host,domain))) return 'YouTube';
    return null;
  }
  const api = { sourcePlatform, text };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.HubAgeGate = api;
})(typeof window !== 'undefined' ? window : globalThis);
