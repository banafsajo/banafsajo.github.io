/* بنفسجو — سلوك مشترك: نافذة «عن المعلمة» + التذييل + السلايدر */
(function(){
const ic=(n,c)=>window.BJI?BJI.ic(n,c):'';
const MAIL='hammad.renad.92@gmail.com';
/* ---------- نافذة عن المعلمة ---------- */
function aboutHTML(){return ''+
'<div class="bj-ab-hd"><div class="bj-mono" aria-hidden="true">ر</div><div><h2>أ. رناد حماد</h2><p>معلمة رياضيات متخصصة · مصممة تجارب تعلّم تفاعلية · مؤسِّسة منصة بنفسجو</p></div><img src="assets/brand/bj-point-sm.webp" alt="" width="120" height="150"></div>'+
'<div class="bj-ab-bd">'+
'<p class="lead">معلمة رياضيات تؤمن أن الطالب يتعلّم أعمق حين يلعب ويكتشف ويرى الفكرة بعينه. صمّمتُ <b>منصة بنفسجو</b> بنفسي من الفكرة إلى آخر سؤال: بنكًا محوسبًا شاملًا لاختبار القدرات، مقسّمًا إلى محطات قصيرة وجولات تنافسية وألعاب تفاعلية، ليصل كل طالب إلى درجته المستهدفة بخطى واضحة وممتعة.</p>'+
'<p class="bj-ab-q">«لا يوجد طالب لا يحب الرياضيات… يوجد طالب لم يجد بعد الطريقة التي تناسبه.»</p>'+
'<div class="bj-ab-grid">'+
'<div><span class="bj-ic-tile">'+ic('book')+'</span><p style="margin:0"><b>بنك القدرات المحوسب</b><span>12 محطة و5 جولات مرتبطة بمواضع الأسئلة في اختبار قياس.</span></p></div>'+
'<div><span class="bj-ic-tile m">'+ic('brain')+'</span><p style="margin:0"><b>ألعاب مبنية على أبحاث الدماغ</b><span>تراعي الذكاءات المتعددة وأنماط التعلّم المختلفة.</span></p></div>'+
'<div><span class="bj-ic-tile s">'+ic('t1')+'</span><p style="margin:0"><b>دروس وفق نموذجي 5E و ACTIVE</b><span>عروض تفاعلية خطوة بخطوة مربوطة بصفحات كتاب الطالب.</span></p></div>'+
'<div><span class="bj-ic-tile p">'+ic('users')+'</span><p style="margin:0"><b>مشاريع PBL بلغة الرياضيات</b><span>تعلّم قائم على المشروعات يربط المفهوم بالحياة.</span></p></div>'+
'</div>'+
'<div class="bj-ab-tags"><span>رياضيات المرحلة الثانوية</span><span>القدرات العامة (الكمي)</span><span>التعلّم باللعب</span><span>التصميم التعليمي</span><span>التقويم البنائي</span></div>'+
'<div class="btns" style="margin:0"><a class="btn" href="mailto:'+MAIL+'?subject='+encodeURIComponent('منصة بنفسجو')+'">'+ic('mail')+' تواصل مع المعلمة</a><a class="btn alt" href="index.html#stations">'+ic('play')+' ابدأ التعلّم</a></div>'+
'</div>';}
function openAbout(){
 const ov=document.createElement('div');ov.className='ov bj-ov';
 ov.innerHTML='<div class="dlg bj-about" role="dialog" aria-modal="true" aria-label="عن المعلمة"><button class="x" aria-label="إغلاق">'+ic('close')+'</button>'+aboutHTML()+'</div>';
 document.body.appendChild(ov);const prev=document.activeElement;
 const close=()=>{ov.remove();document.removeEventListener('keydown',k);if(history.replaceState&&location.hash==='#about')history.replaceState(null,'',location.pathname+location.search);prev&&prev.focus&&prev.focus();};
 function k(e){if(e.key==='Escape')close();}
 ov.querySelector('.x').onclick=close;ov.onclick=e=>{if(e.target===ov)close();};document.addEventListener('keydown',k);
 ov.querySelector('.x').focus();
}
window.BJ={openAbout:openAbout};
document.addEventListener('click',e=>{const b=e.target.closest('[data-bj-about]');if(b){e.preventDefault();openAbout();}});

/* ---------- التذييل ---------- */
function foot(){
 const host=document.getElementById('bj-foot');if(!host)return;
 const y=new Date().getFullYear();
 host.className='bj-foot';
 host.innerHTML='<div><picture><source srcset="assets/brand/logo-horizontal-white.svg" media="(prefers-color-scheme: dark)"><img src="assets/brand/logo-horizontal.svg" alt="بنفسجو" width="235" height="52"></picture><p>منصة تعليمية تفاعلية لاختبار القدرات العامة (الكمي): محطات قصيرة، جولات تنافسية، ألعاب تفاعلية، ومساعد شخصي اسمه بنفسجو.</p></div>'+
 '<div><h4>المنصة</h4><ul><li><a href="index.html">'+ic('book')+' المحطات والجولات</a></li><li><a href="games.html">'+ic('game')+' الألعاب التفاعلية</a></li><li><a href="claude.html">'+ic('ask')+' اسأل بنفسجو</a></li></ul></div>'+
 '<div><h4>تعرّف علينا</h4><ul><li><button type="button" data-bj-about>'+ic('teacher')+' عن المعلمة</button></li><li><a href="brand.html">'+ic('palette')+' هوية بنفسجو</a></li><li><a href="mailto:'+MAIL+'">'+ic('mail')+' تواصل معنا</a></li></ul></div>'+
 '<div class="bj-copy"><span>© '+y+' منصة بنفسجو · إعداد وتصميم أ. رناد حماد · جميع الحقوق محفوظة.</span><span>يُمنع نسخ المحتوى أو إعادة نشره.</span></div>';
}

/* ---------- السلايدر ---------- */
function slider(root){
 const tr=root.querySelector('.bj-track'),sl=[...tr.children],dots=root.querySelector('.bj-dots');
 let i=0,timer=null;const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
 dots.innerHTML=sl.map((_,k)=>'<button type="button" aria-label="الشريحة '+(k+1)+'"></button>').join('');
 const db=[...dots.children];
 function mark(n){i=n;db.forEach((d,k)=>d.setAttribute('aria-current',k===n?'true':'false'));sl.forEach((s,k)=>s.setAttribute('aria-hidden',k===n?'false':'true'));}
 function go(n){n=(n+sl.length)%sl.length;const d=sl[n].getBoundingClientRect().left-tr.getBoundingClientRect().left;tr.scrollBy({left:d,behavior:rm?'auto':'smooth'});mark(n);}
 db.forEach((d,k)=>d.onclick=()=>{go(k);restart();});
 root.querySelector('.bj-arr.nx').onclick=()=>{go(i+1);restart();};
 root.querySelector('.bj-arr.pv').onclick=()=>{go(i-1);restart();};
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting&&en.intersectionRatio>.6)mark(sl.indexOf(en.target));}),{root:tr,threshold:[.6]});
 sl.forEach(s=>io.observe(s));
 function restart(){clearInterval(timer);if(!rm)timer=setInterval(()=>{if(!document.hidden)go(i+1);},6500);}
 root.addEventListener('mouseenter',()=>clearInterval(timer));root.addEventListener('mouseleave',restart);
 root.addEventListener('focusin',()=>clearInterval(timer));
 root.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){go(i+1);restart();}if(e.key==='ArrowRight'){go(i-1);restart();}});
 mark(0);restart();
}
function init(){foot();document.querySelectorAll('.bj-hero').forEach(slider);if(location.hash==='#about')openAbout();if(window.BJI)BJI.hydrate();}
if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
