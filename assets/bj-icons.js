/* أيقونات بنفسجو — مجموعة حصرية بنمط ثنائي اللون (خط بنفسجي + تعبئة نعناعية ناعمة) */
(function(){
const P={
/* تنقّل */
book:'<path class="f" d="M3.5 5.5c2.6-1 5.4-1 8.5.8v13c-3.1-1.8-5.9-1.8-8.5-.8z"/><path d="M3.5 5.5c2.6-1 5.4-1 8.5.8v13c-3.1-1.8-5.9-1.8-8.5-.8zM20.5 5.5c-2.6-1-5.4-1-8.5.8v13c3.1-1.8 5.9-1.8 8.5-.8z"/>',
game:'<rect class="f" x="2.5" y="7" width="19" height="11" rx="5.5"/><rect x="2.5" y="7" width="19" height="11" rx="5.5"/><path d="M7.5 10.5v4M5.5 12.5h4"/><circle class="d" cx="15.5" cy="11.3" r="1.1"/><circle class="d" cx="18" cy="13.7" r="1.1"/>',
ask:'<path class="f" d="M4 4.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H10l-4.5 3.5v-3.5H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z"/><path d="M4 4.5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H10l-4.5 3.5v-3.5H4a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1z"/><path class="s" d="M12 7.2l1 2.3 2.3 1-2.3 1-1 2.3-1-2.3-2.3-1 2.3-1z"/>',
teacher:'<circle class="f" cx="12" cy="8.5" r="4"/><circle cx="12" cy="8.5" r="4"/><path d="M4.5 20.5c.9-3.7 3.9-6 7.5-6s6.6 2.3 7.5 6"/><path class="s" d="M18.5 2.5l.7 1.5 1.6.2-1.2 1.1.3 1.6-1.4-.8-1.4.8.3-1.6-1.2-1.1 1.6-.2z"/>',
palette:'<path class="f" d="M12 3a9 9 0 0 0 0 18c1.4 0 1.8-1.2 1.2-2.2-.7-1.2.1-2.6 1.5-2.6H17a4 4 0 0 0 4-4C21 6.9 17 3 12 3z"/><path d="M12 3a9 9 0 0 0 0 18c1.4 0 1.8-1.2 1.2-2.2-.7-1.2.1-2.6 1.5-2.6H17a4 4 0 0 0 4-4C21 6.9 17 3 12 3z"/><circle class="d" cx="7.5" cy="11" r="1.2"/><circle class="d" cx="10" cy="7.3" r="1.2"/><circle class="d" cx="14.5" cy="7.3" r="1.2"/>',
folder:'<path class="f" d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM12 10.5v5M9.8 13.4l2.2 2.2 2.2-2.2"/>',
/* واجهة */
search:'<circle class="f" cx="10.5" cy="10.5" r="6"/><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
key:'<circle class="f" cx="8" cy="14" r="4.5"/><circle cx="8" cy="14" r="4.5"/><path d="M11.3 10.8L19 3M16 6l2.5 2.5M14 8l2 2"/>',
lock:'<rect class="f" x="4.5" y="10.5" width="15" height="10" rx="2.5"/><rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2.5"/>',
check:'<circle class="f" cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.7 2.7L16 9.6"/>',
play:'<circle class="f" cx="12" cy="12" r="9"/><path d="M10 8.5l5.5 3.5-5.5 3.5z"/>',
next:'<path d="M15 5l-7 7 7 7"/>',
prev:'<path d="M9 5l7 7-7 7"/>',
close:'<path d="M6 6l12 12M18 6L6 18"/>',
mail:'<rect class="f" x="3" y="5.5" width="18" height="13" rx="2.5"/><rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3.8 7l8.2 6 8.2-6"/>',
star:'<path class="f" d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/><path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 17l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z"/>',
download:'<path class="f" d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3z"/><path d="M12 3.5v11M7.5 10l4.5 4.5 4.5-4.5M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/>',
sparkle:'<path class="f" d="M12 2.8l2.1 5.3 5.3 2.1-5.3 2.1L12 17.6l-2.1-5.3-5.3-2.1 5.3-2.1z"/><path d="M12 2.8l2.1 5.3 5.3 2.1-5.3 2.1L12 17.6l-2.1-5.3-5.3-2.1 5.3-2.1zM18.5 16.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z"/>',
/* مزايا */
brain:'<path class="f" d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5.2A3 3 0 0 0 6 17.5 3 3 0 0 0 12 19V5.5A2.5 2.5 0 0 0 9 4z"/><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5.2A3 3 0 0 0 6 17.5 3 3 0 0 0 12 19V5.5A2.5 2.5 0 0 0 9 4zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5.2 3 3 0 0 1-2 5.3A3 3 0 0 1 12 19M15 4a2.5 2.5 0 0 0-3 1.5M8.5 10.5c1 0 2 .6 2 2M15.5 10.5c-1 0-2 .6-2 2"/>',
gift:'<rect class="f" x="3.5" y="9" width="17" height="11.5" rx="2"/><rect x="3.5" y="9" width="17" height="11.5" rx="2"/><path d="M2.5 9h19M12 9v11.5M12 9c-1.5-3.5-5.5-4.5-5.5-2S10 9 12 9zM12 9c1.5-3.5 5.5-4.5 5.5-2S14 9 12 9z"/>',
timer:'<circle class="f" cx="12" cy="13.5" r="7.5"/><circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.8 2M9.5 2.5h5M12 2.5V6M18.5 6.5l1.5-1.5"/>',
map:'<path class="f" d="M9 4.5l6 2.5v12.5L9 17z"/><path d="M3.5 6.5L9 4.5l6 2.5 5.5-2v12.5L15 19.5 9 17l-5.5 2z M9 4.5V17M15 7v12.5"/>',
device:'<rect class="f" x="6" y="2.5" width="12" height="19" rx="2.5"/><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
twin:'<rect class="f" x="3" y="3" width="11" height="11" rx="2.5"/><rect x="3" y="3" width="11" height="11" rx="2.5"/><rect x="10" y="10" width="11" height="11" rx="2.5"/><path d="M14 15.5h3M15.5 14v3"/>',
heart:'<path class="f" d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/><path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z"/>',
users:'<circle class="f" cx="9" cy="8.5" r="3.5"/><circle cx="9" cy="8.5" r="3.5"/><path d="M2.5 19.5c.6-3.3 3.2-5.5 6.5-5.5s5.9 2.2 6.5 5.5M16 5.3a3.5 3.5 0 0 1 0 6.4M18 14.4c1.9.8 3.1 2.6 3.5 5.1"/>',
/* المسارات */
t1:'<rect class="f" x="3" y="13" width="8" height="7" rx="1.5"/><rect x="3" y="13" width="8" height="7" rx="1.5"/><rect x="13" y="13" width="8" height="7" rx="1.5"/><rect x="8" y="5" width="8" height="7" rx="1.5"/>',
t2:'<path class="f" d="M14.5 3.5c3.5 0 6 2.5 6 6-1.5 3.5-5 6.5-8.5 8l-5.5-5.5c1.5-3.5 4.5-7 8-8.5z"/><path d="M14.5 3.5c3.5 0 6 2.5 6 6-1.5 3.5-5 6.5-8.5 8l-5.5-5.5c1.5-3.5 4.5-7 8-8.5zM7 12.5l-3.5.5 2-3.5h4M11.5 17l-.5 3.5 3.5-2v-4M4.5 19.5l2.5-2.5"/><circle cx="15" cy="9" r="1.6"/>',
t3:'<path class="f" d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v1.5A3.5 3.5 0 0 0 7.5 11M17 6h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 14v3.5M8 20.5h8M9.5 17.5h5v3h-5z"/>',
t4:'<circle class="f" cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5"/><circle class="d" cx="12" cy="12" r="1.6"/><path d="M12 12l7-7M16.5 3.5L19 5l1.5 2.5"/>',
/* المحطات والألعاب */
calc:'<rect class="f" x="4.5" y="2.5" width="15" height="19" rx="2.5"/><rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/><rect x="7.5" y="5.5" width="9" height="4" rx="1"/><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" stroke-width="2.6"/>',
pie:'<path class="f" d="M12 3v9h9a9 9 0 0 0-9-9z"/><path d="M12 3v9h9a9 9 0 0 0-9-9z"/><path d="M10 5.2A8 8 0 1 0 18.8 14H10z"/>',
percent:'<circle class="f" cx="7" cy="7" r="3"/><circle class="f" cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/><circle cx="17" cy="17" r="3"/><path d="M19 5L5 19"/>',
scale:'<path d="M12 3.5v17M7 20.5h10M5 7.5h14M12 3.5L5 7.5M12 3.5l7 4"/><path class="f" d="M2.5 14l2.5-6.5L7.5 14a2.5 2.5 0 0 1-5 0zM16.5 14L19 7.5l2.5 6.5a2.5 2.5 0 0 1-5 0z"/><path d="M2.5 14l2.5-6.5L7.5 14a2.5 2.5 0 0 1-5 0zM16.5 14L19 7.5l2.5 6.5a2.5 2.5 0 0 1-5 0z"/>',
speed:'<path class="f" d="M3.5 16a8.5 8.5 0 0 1 17 0z"/><path d="M3.5 16a8.5 8.5 0 0 1 17 0M12 16l4-5M3.5 16h17M6.5 11l1 .8M12 7.5v1.3M17.5 11l-1 .8"/><circle class="d" cx="12" cy="16" r="1.4"/>',
algebra:'<rect class="f" x="3" y="3" width="18" height="18" rx="4"/><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 8l5 7M12 8l-5 7M15 12.5h3.5M15 15.5h3.5"/>',
root:'<path class="f" d="M9 17.5l3-12.5h9v4H15l-3 8.5z" opacity=".0"/><path d="M2.5 13.5H5l3 6 4-15h9.5"/><path d="M13.5 9l5 6M18.5 9l-5 6"/>',
angle:'<path class="f" d="M4 19.5L17 7a17 17 0 0 1 2.5 12.5z"/><path d="M4 19.5h16M4 19.5L17 6.5"/><path d="M11.5 19.5a7.5 7.5 0 0 0-2.4-5.3"/>',
circletri:'<circle class="f" cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17L12 3.5z"/>',
cube:'<path class="f" d="M12 2.8l8 4.5v9.4l-8 4.5-8-4.5V7.3z"/><path d="M12 2.8l8 4.5v9.4l-8 4.5-8-4.5V7.3zM4 7.3l8 4.5 8-4.5M12 11.8v9.4"/>',
chart:'<rect class="f" x="5" y="11" width="3.5" height="8" rx="1"/><rect class="f" x="15.5" y="6" width="3.5" height="13" rx="1"/><path d="M3 20.5h18"/><rect x="5" y="11" width="3.5" height="8" rx="1"/><rect x="10.25" y="4" width="3.5" height="15" rx="1"/><rect x="15.5" y="6" width="3.5" height="13" rx="1"/>',
compare:'<rect class="f" x="2.5" y="5" width="8" height="14" rx="2"/><rect x="2.5" y="5" width="8" height="14" rx="2"/><rect x="13.5" y="5" width="8" height="14" rx="2"/><path d="M8.5 9.5l-3 2.5 3 2.5M15.5 9.5l3 2.5-3 2.5"/>',
bolt:'<path class="f" d="M13.5 2.5L4.5 13.5h6.5l-1 8 9-11h-6.5z"/><path d="M13.5 2.5L4.5 13.5h6.5l-1 8 9-11h-6.5z"/>',
wheel:'<circle class="f" cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5V12l6 6M12 12l-7.3 4.3M12 12h8.5"/><circle class="d" cx="12" cy="12" r="1.5"/>',
ruler:'<rect class="f" x="2.5" y="8" width="19" height="8" rx="1.5"/><rect x="2.5" y="8" width="19" height="8" rx="1.5"/><path d="M6.5 8v3M10.5 8v4.5M14.5 8v3M18.5 8v4.5"/>',
balance:'<path class="f" d="M5 18h14l-2 2.5H7z"/><path d="M12 4v14M5 18h14M4 8.5h16M7.5 8.5L5 14h5zM16.5 8.5L14 14h5zM5 14a2.5 2.5 0 0 0 5 0M14 14a2.5 2.5 0 0 0 5 0"/><circle class="d" cx="12" cy="4" r="1.4"/>'
};
function ic(n,cls){const b=P[n];if(!b)return '';return '<svg class="bji'+(cls?' '+cls:'')+'" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+b+'</svg>';}
const K=[['الحساب','calc'],['الكسور','pie'],['المئوية','percent'],['النسب','scale'],['السرعة','speed'],['الجبر','algebra'],['المعادلات','balance'],['الأسس','root'],['الزوايا','angle'],['المثلثات','circletri'],['الحجوم','cube'],['المساحة','ruler'],['الإحصاء','chart'],['الاحتمال','wheel'],['المقارنات','compare'],['الجولة','bolt']];
function pick(t){t=String(t||'');for(const [k,v] of K)if(t.includes(k))return v;return 'star';}
window.BJI={ic:ic,pick:pick,item:t=>ic(pick(t)),names:Object.keys(P)};
/* استبدال أي عنصر <i data-ic="name"> بالأيقونة */
function hydrate(root){(root||document).querySelectorAll('i[data-ic]').forEach(el=>{el.outerHTML=ic(el.getAttribute('data-ic'),el.className);});}
window.BJI.hydrate=hydrate;
if(document.readyState!=='loading')hydrate();else document.addEventListener('DOMContentLoaded',()=>hydrate());
})();
