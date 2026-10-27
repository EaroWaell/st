'use strict';
/* الأعياد والمناسبات القبطية — من النيروز 2026 إلى النيروز 2027 (السنة القبطية 1743).
   The list on the events page is built from this data using the visitor's date:
   - only the next 3 months are shown
   - anything whose date has passed disappears automatically
   - an event that falls on today gets a highlighted border + "Today" badge
   Types: great = major Lord's feast, minor = minor Lord's feast, fast = fast,
          holy = Holy Week, occasion = church occasion / commemoration */
const CHURCH_EVENTS = [
  { date: '2026-09-11', type: 'occasion', ar: 'عيد النيروز (رأس السنة القبطية 1743)', en: 'Nayrouz — Coptic New Year 1743' },
  { date: '2026-09-27', type: 'minor',    ar: 'عيد الصليب', en: 'Feast of the Holy Cross' },
  { date: '2026-11-25', type: 'fast',     ar: 'بدء صوم الميلاد', en: 'Beginning of the Nativity Fast' },
  { date: '2027-01-07', type: 'great',    ar: 'عيد الميلاد المجيد', en: 'Feast of the Nativity (Christmas)' },
  { date: '2027-01-14', type: 'minor',    ar: 'عيد الختان', en: 'Feast of the Circumcision' },
  { date: '2027-01-19', type: 'great',    ar: 'عيد الغطاس المجيد', en: 'Feast of the Epiphany (Theophany)' },
  { date: '2027-01-21', type: 'minor',    ar: 'عرس قانا الجليل', en: 'Wedding at Cana of Galilee' },
  { date: '2027-02-15', type: 'minor',    ar: 'دخول المسيح الهيكل', en: 'Presentation of the Lord in the Temple' },
  { date: '2027-02-22', type: 'fast',     ar: 'بدء صوم يونان', en: "Beginning of Jonah's Fast" },
  { date: '2027-03-08', type: 'fast',     ar: 'بدء الصوم الكبير', en: 'Beginning of the Great Lent' },
  { date: '2027-03-19', type: 'minor',    ar: 'عيد الصليب (أحد منتصف الصوم)', en: 'Feast of the Cross (Mid-Lent Sunday)' },
  { date: '2027-04-07', type: 'great',    ar: 'عيد البشارة', en: 'Feast of the Annunciation' },
  { date: '2027-04-25', type: 'great',    ar: 'أحد الشعانين', en: 'Palm Sunday' },
  { date: '2027-04-29', type: 'holy',     ar: 'خميس العهد', en: 'Holy Thursday' },
  { date: '2027-04-30', type: 'holy',     ar: 'الجمعة العظيمة', en: 'Good Friday' },
  { date: '2027-05-02', type: 'great',    ar: 'عيد القيامة المجيد', en: 'Feast of the Resurrection (Easter)' },
  { date: '2027-05-09', type: 'minor',    ar: 'أحد توما', en: "Thomas Sunday" },
  { date: '2027-06-01', type: 'minor',    ar: 'دخول العائلة المقدسة أرض مصر', en: 'Entry of the Holy Family into Egypt' },
  { date: '2027-06-10', type: 'great',    ar: 'عيد الصعود', en: 'Feast of the Ascension' },
  { date: '2027-06-20', type: 'great',    ar: 'عيد العنصرة', en: 'Feast of Pentecost' },
  { date: '2027-06-21', type: 'fast',     ar: 'بدء صوم الرسل', en: "Beginning of the Apostles' Fast" },
  { date: '2027-07-12', type: 'occasion', ar: 'عيد الرسل بطرس وبولس', en: 'Feast of the Apostles Peter and Paul' },
  { date: '2027-08-07', type: 'fast',     ar: 'بدء صوم العذراء', en: "Beginning of the Virgin Mary's Fast" },
  { date: '2027-08-19', type: 'minor',    ar: 'عيد التجلي', en: 'Feast of the Transfiguration' },
  { date: '2027-08-22', type: 'occasion', ar: 'عيد صعود جسد السيدة العذراء', en: 'Assumption of the Body of the Virgin Mary' },
  { date: '2027-09-12', type: 'occasion', ar: 'عيد النيروز (بداية سنة 1744)', en: 'Nayrouz — Coptic New Year 1744' }
];

const EVT_TYPES = {
  great:    { ar: 'عيد سيدي كبير',  en: 'Great Feast' },
  minor:    { ar: 'عيد سيدي صغير', en: 'Minor Feast' },
  fast:     { ar: 'صوم',            en: 'Fast' },
  holy:     { ar: 'أسبوع الآلام',   en: 'Holy Week' },
  occasion: { ar: 'مناسبة كنسية',   en: 'Church Occasion' }
};
const EVT_MONTHS_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const EVT_MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const EVT_DAYS_AR = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const EVT_DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const EVT_COPTIC_AR = ['توت','بابه','هاتور','كيهك','طوبة','أمشير','برمهات','برمودة','بشنس','بؤونة','أبيب','مسرى','النسئ'];
const EVT_COPTIC_EN = ['Tout','Baba','Hatour','Kiahk','Touba','Amshir','Baramhat','Baramouda','Bashans','Paona','Epep','Mesra','Nasie'];

function evtJdn(y, m, d) {
  const a = Math.floor((14 - m) / 12), y2 = y + 4800 - a, m2 = m + 12 * a - 3;
  return d + Math.floor((153 * m2 + 2) / 5) + 365 * y2 + Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045;
}
function evtCopticJdn(y, m, d) { return 1825029 + 365 * (y - 1) + Math.floor(y / 4) + 30 * (m - 1) + d; }
function evtCoptic(y, m, d) {
  const j = evtJdn(y, m, d);
  let cy = Math.floor((j - 1825029) / 365) + 1;
  while (evtCopticJdn(cy + 1, 1, 1) <= j) cy++;
  while (evtCopticJdn(cy, 1, 1) > j) cy--;
  const r = j - evtCopticJdn(cy, 1, 1);
  return { y: cy, m: Math.floor(r / 30) + 1, d: (r % 30) + 1 };
}

let evtRenderedDay = null;

function renderEvents() {
  const list = document.getElementById('evt-list');
  if (!list) return;
  const ar = (document.documentElement.lang || 'en') === 'ar';
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const limit = new Date(today.getFullYear(), today.getMonth() + 3, today.getDate());
  evtRenderedDay = today.getTime();
  const num = (v) => (ar ? String(v).replace(/\d/g, (x) => '٠١٢٣٤٥٦٧٨٩'[x]) : String(v));

  const upcoming = CHURCH_EVENTS.map((e) => {
    const [y, m, d] = e.date.split('-').map(Number);
    return Object.assign({ dt: new Date(y, m - 1, d), y, m, d }, e);
  }).filter((e) => e.dt >= today && e.dt <= limit).sort((a, b) => a.dt - b.dt);

  if (!upcoming.length) {
    list.innerHTML = `<p style="text-align:center;color:#888">${ar ? 'لا توجد مناسبات خلال الثلاثة أشهر القادمة.' : 'No events in the next three months.'}</p>`;
    return;
  }

  list.innerHTML = upcoming.map((e) => {
    const isToday = e.dt.getTime() === today.getTime();
    const c = evtCoptic(e.y, e.m, e.d);
    const mon = ar ? EVT_MONTHS_AR[e.m - 1] : EVT_MONTHS_EN[e.m - 1].slice(0, 3).toUpperCase();
    const wd = (ar ? EVT_DAYS_AR : EVT_DAYS_EN)[e.dt.getDay()];
    const greg = ar
      ? `${wd} ${num(e.d)} ${EVT_MONTHS_AR[e.m - 1]} ${num(e.y)}م`
      : `${wd}, ${EVT_MONTHS_EN[e.m - 1]} ${e.d}, ${e.y}`;
    const cop = ar
      ? `${num(c.d)} ${EVT_COPTIC_AR[c.m - 1]} ${num(c.y)}ش`
      : `${c.d} ${EVT_COPTIC_EN[c.m - 1]} ${c.y} A.M.`;
    const tag = EVT_TYPES[e.type][ar ? 'ar' : 'en'];
    return `<div class="evt-row reveal-up is-visible${isToday ? ' evt-row--today' : ''}">
      <div class="evt-date-box"><span class="evt-mon">${mon}</span><span class="evt-day">${e.d}</span></div>
      <div class="evt-body">
        <div class="evt-title">${ar ? e.ar : e.en}${isToday ? `<span class="evt-today-badge">${ar ? 'اليوم' : 'Today'}</span>` : ''}</div>
        <div class="evt-meta">
          <span><i class="fa-regular fa-calendar"></i> ${greg}</span>
          <span><i class="fa-solid fa-cross"></i> ${cop}</span>
          <span class="evt-tag">${tag}</span>
        </div>
      </div>
    </div>`;
  }).join('');
}
window.renderEvents = renderEvents;

document.addEventListener('DOMContentLoaded', () => {
  renderEvents();
  // drop passed events / move the "today" highlight when the day changes
  setInterval(() => {
    const n = new Date();
    if (evtRenderedDay !== new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime()) renderEvents();
  }, 60000);
});
