/* The TikTok menu belongs to the native app. These are instructions, not buttons. */
(function (root) {
  'use strict';
  const keys = ['gateTitle', 'gateStepMenu', 'gateMenuPosition', 'gateStepBrowser'];
  const copy = {
    'en': ['Open Game Select in your browser', 'Tap the three dots', 'In the top-right corner of TikTok', 'Select “Open in browser”'],
    'ru': ['Открой Game Select в браузере', 'Нажми на три точки', 'В правом верхнем углу TikTok', 'Выбери «Открыть в браузере»'],
    'pt-BR': ['Abra o Game Select no navegador', 'Toque nos três pontos', 'No canto superior direito do TikTok', 'Selecione “Abrir no navegador”'],
    'es': ['Abre Game Select en tu navegador', 'Toca los tres puntos', 'En la esquina superior derecha de TikTok', 'Selecciona «Abrir en el navegador»'],
    'ur': ['Game Select براؤزر میں کھولیں', 'تین نقطوں پر ٹیپ کریں', 'TikTok کے اوپر دائیں کونے میں', '«براؤزر میں کھولیں» منتخب کریں'],
    'ar': ['افتح Game Select في المتصفح', 'اضغط على النقاط الثلاث', 'في الزاوية العلوية اليمنى من TikTok', 'اختر «فتح في المتصفح»'],
    'fr': ['Ouvre Game Select dans ton navigateur', 'Appuie sur les trois points', 'En haut à droite de TikTok', 'Choisis « Ouvrir dans le navigateur »'],
    'hi': ['Game Select को ब्राउज़र में खोलें', 'तीन बिंदुओं पर टैप करें', 'TikTok के ऊपरी दाएँ कोने में', '“ब्राउज़र में खोलें” चुनें'],
    'bn': ['ব্রাউজারে Game Select খুলুন', 'তিনটি বিন্দুতে ট্যাপ করুন', 'TikTok-এর উপরের ডান কোণে', '“ব্রাউজারে খুলুন” নির্বাচন করুন'],
    'ne': ['Game Select ब्राउजरमा खोल्नुहोस्', 'तीनवटा थोप्लामा ट्याप गर्नुहोस्', 'TikTok को माथिल्लो दायाँ कुनामा', '“ब्राउजरमा खोल्नुहोस्” छान्नुहोस्'],
    'id': ['Buka Game Select di browser', 'Ketuk tiga titik', 'Di pojok kanan atas TikTok', 'Pilih “Buka di browser”'],
    'fil': ['Buksan ang Game Select sa browser', 'I-tap ang tatlong tuldok', 'Sa kanang itaas na sulok ng TikTok', 'Piliin ang “Buksan sa browser”'],
    'ms': ['Buka Game Select dalam pelayar', 'Ketik tiga titik', 'Di penjuru kanan atas TikTok', 'Pilih “Buka dalam pelayar”'],
    'th': ['เปิด Game Select ในเบราว์เซอร์', 'แตะจุดสามจุด', 'ที่มุมขวาบนของ TikTok', 'เลือก “เปิดในเบราว์เซอร์”'],
    'vi': ['Mở Game Select trong trình duyệt', 'Nhấn vào dấu ba chấm', 'Ở góc trên bên phải của TikTok', 'Chọn “Mở trong trình duyệt”'],
    'km': ['បើក Game Select ក្នុងកម្មវិធីរុករក', 'ចុចលើចំណុចបី', 'នៅជ្រុងខាងស្តាំផ្នែកខាងលើនៃ TikTok', 'ជ្រើសរើស «បើកក្នុងកម្មវិធីរុករក»'],
    'lo': ['ເປີດ Game Select ໃນບຣາວເຊີ', 'ແຕະຈຸດສາມຈຸດ', 'ຢູ່ມຸມຂວາເທິງຂອງ TikTok', 'ເລືອກ “ເປີດໃນບຣາວເຊີ”'],
    'si': ['Game Select බ්‍රවුසරයෙන් විවෘත කරන්න', 'තිත් තුන මත තට්ටු කරන්න', 'TikTok හි ඉහළ දකුණු කෙළවරේ', '“බ්‍රවුසරයෙන් විවෘත කරන්න” තෝරන්න'],
    'mn': ['Game Select-ийг хөтөч дээр нээнэ үү', 'Гурван цэг дээр дарна уу', 'TikTok-ийн баруун дээд буланд', '«Хөтөч дээр нээх»-ийг сонгоно уу'],
    'ja': ['Game Selectをブラウザで開く', '三点メニューをタップ', 'TikTokの右上にあります', '「ブラウザで開く」を選択'],
    'zh-TW': ['在瀏覽器中開啟 Game Select', '點選三點選單', '位於 TikTok 右上角', '選擇「在瀏覽器中開啟」'],
    'zh-HK': ['在瀏覽器開啟 Game Select', '點按三點選單', '位於 TikTok 右上角', '選擇「在瀏覽器開啟」'],
    'de': ['Öffne Game Select im Browser', 'Tippe auf die drei Punkte', 'Oben rechts in TikTok', 'Wähle „Im Browser öffnen“'],
    'it': ['Apri Game Select nel browser', 'Tocca i tre puntini', 'Nell’angolo in alto a destra di TikTok', 'Seleziona “Apri nel browser”'],
    'pt': ['Abre o Game Select no navegador', 'Toca nos três pontos', 'No canto superior direito do TikTok', 'Seleciona «Abrir no navegador»'],
    'nl': ['Open Game Select in je browser', 'Tik op de drie puntjes', 'Rechtsboven in TikTok', 'Kies ‘Openen in browser’'],
    'fi': ['Avaa Game Select selaimessa', 'Napauta kolmea pistettä', 'TikTokin oikeassa yläkulmassa', 'Valitse ”Avaa selaimessa”'],
    'sv': ['Öppna Game Select i webbläsaren', 'Tryck på de tre punkterna', 'Längst upp till höger i TikTok', 'Välj ”Öppna i webbläsaren”'],
    'pl': ['Otwórz Game Select w przeglądarce', 'Dotknij trzech kropek', 'W prawym górnym rogu TikToka', 'Wybierz „Otwórz w przeglądarce”'],
    'cs': ['Otevři Game Select v prohlížeči', 'Klepni na tři tečky', 'V pravém horním rohu TikToku', 'Vyber „Otevřít v prohlížeči“'],
    'hu': ['Nyisd meg a Game Selectet a böngészőben', 'Koppints a három pontra', 'A TikTok jobb felső sarkában', 'Válaszd a „Megnyitás böngészőben” lehetőséget'],
    'ro': ['Deschide Game Select în browser', 'Atinge cele trei puncte', 'În colțul din dreapta sus al TikTok', 'Selectează „Deschide în browser”'],
    'bg': ['Отвори Game Select в браузъра', 'Докосни трите точки', 'В горния десен ъгъл на TikTok', 'Избери „Отваряне в браузър“'],
    'el': ['Άνοιξε το Game Select στο πρόγραμμα περιήγησης', 'Πάτησε τις τρεις τελείες', 'Στην επάνω δεξιά γωνία του TikTok', 'Επίλεξε «Άνοιγμα στο πρόγραμμα περιήγησης»'],
    'lt': ['Atidaryk Game Select naršyklėje', 'Bakstelėk tris taškus', 'Viršutiniame dešiniajame TikTok kampe', 'Pasirink „Atidaryti naršyklėje“'],
    'lv': ['Atver Game Select pārlūkā', 'Pieskaries trim punktiem', 'TikTok augšējā labajā stūrī', 'Izvēlies “Atvērt pārlūkā”'],
    'uk': ['Відкрий Game Select у браузері', 'Натисни на три крапки', 'У правому верхньому куті TikTok', 'Вибери «Відкрити в браузері»'],
    'kk': ['Game Select сайтын браузерде ашыңыз', 'Үш нүктені басыңыз', 'TikTok қолданбасының жоғарғы оң жақ бұрышында', '«Браузерде ашу» тармағын таңдаңыз'],
    'uz': ['Game Select saytini brauzerda oching', 'Uchta nuqtani bosing', 'TikTok ilovasining yuqori o‘ng burchagida', '“Brauzerda ochish” bandini tanlang'],
    'tg': ['Game Select-ро дар браузер кушоед', 'Се нуқтаро пахш кунед', 'Дар кунҷи болоии рости TikTok', '«Дар браузер кушодан»-ро интихоб кунед'],
    'tr': ['Game Select’i tarayıcıda aç', 'Üç noktaya dokun', 'TikTok’un sağ üst köşesinde', '“Tarayıcıda aç” seçeneğini seç'],
    'he': ['פתחו את Game Select בדפדפן', 'הקישו על שלוש הנקודות', 'בפינה הימנית העליונה של TikTok', 'בחרו „פתיחה בדפדפן”']
  };
  for (const [locale, values] of Object.entries(copy)) {
    for (let i = 0; i < keys.length; i++) root.HubLocales[locale][keys[i]] = values[i];
  }
})(window);
