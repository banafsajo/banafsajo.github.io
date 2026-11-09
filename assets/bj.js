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

/* ---------- بنفسجو المرافق: يتفاعل مع ما يفعله الطالب ---------- */
function companion(){
 if(document.body.dataset.noPal!==undefined)return;
 const P='assets/brand/poses/';let min=false;try{min=localStorage.getItem('bj_pal_min')==='1';}catch(e){}
 const el=document.createElement('div');el.className='bj-pal'+(min?' min':'');el.setAttribute('aria-live','polite');
 el.innerHTML='<button type="button" class="who" aria-label="بنفسجو: اضغط ليتحدث معك"><img alt="" src="'+P+'wave-sm.webp" width="108" height="120"></button><div class="bj-say" role="status"><button type="button" class="x" aria-label="إخفاء">×</button><div class="tx"></div></div>';
 document.body.appendChild(el);
 const img=el.querySelector('img'),who=el.querySelector('.who'),say=el.querySelector('.bj-say'),tx=el.querySelector('.tx');
 const POSES=['wave','think','win','point','face','read','fly','thumbs','sign','run','wow','laptop','magnify','love','raise'];
 POSES.forEach(n=>{const i=new Image();i.src=P+n+'-sm.webp';});
 let hideT=null,last='';
 function pose(n){if(n===last)return;last=n;img.style.opacity='0';setTimeout(()=>{img.src=P+n+'-sm.webp';img.style.opacity='1';},120);who.classList.remove('hop');void who.offsetWidth;who.classList.add('hop');}
 function talk(n,html,ms){if(min)return;pose(n);tx.innerHTML=html;say.classList.add('on');clearTimeout(hideT);hideT=setTimeout(()=>{say.classList.remove('on');pose('wave');},ms||6000);}
 const h=new Date().getHours();
 const greet=h<12?'صباح الخير':h<18?'مساء النور':'مساء الخير';
 const page=(location.pathname.split('/').pop()||'index.html');
 const TIPS=[['think','💡 <b>تلميح:</b> في النسبة المئوية، حدّد <b>الأصل</b> أولًا، وافترضه 100 إن لم يُعطَ.'],['magnify','🔍 كل محطة تخبرك <b>أين</b> يظهر سؤالها في قياس. ابدأ منها!'],['run','⏱️ الجولات فيها مؤقّت مثل الاختبار الحقيقي. جرّب واحدة!'],['read','📘 المحطات 1 إلى 4 <b>مجانية</b>: الحساب، الكسور، النسبة المئوية، النسب.'],['thumbs','👍 حلّ مثالًا ثم سؤاله التوأم مباشرة: هكذا تثبت الفكرة.'],['laptop','💻 تعمل المنصة على الجوال والحاسوب، وتقدّمك يُحفظ على جهازك.'],['love','💜 خطوة صغيرة كل يوم أفضل من ساعات في يوم واحد.'],['wow','🤯 هل تعلم؟ مجموع الأعداد من 1 إلى 100 = <b>5050</b>.'],['point','💬 عندك سؤال؟ افتح <b>اسأل بنفسجو</b> من الأعلى.']];
 let ti=Math.floor(Math.random()*TIPS.length);
 who.onclick=()=>{if(min){min=false;el.classList.remove('min');try{localStorage.setItem('bj_pal_min','0');}catch(e){}}const k=TIPS[ti++%TIPS.length];talk(k[0],k[1],7000);};
 say.querySelector('.x').onclick=()=>{min=true;el.classList.add('min');say.classList.remove('on');try{localStorage.setItem('bj_pal_min','1');}catch(e){}};
 // ترحيب حسب الصفحة
 const W={'index.html':greet+'! أنا <b>بنفسجو</b> 👋 اختر محطة واضغط «تشغيل»، وأنا معك.','games.html':'🎮 اختر لعبة! الألعاب المجانية عليها شارة «مجاني».','claude.html':'💬 اسألني هنا عن أي محطة أو قانون.','files.html':'📂 هنا ملفات جاهزة للطباعة.','brand.html':'🎨 هذا دليل هويتي! أعجبتك وضعياتي؟'};
 setTimeout(()=>talk(page==='brand.html'?'love':'wave',W[page]||W['index.html'],6500),1400);
 // يتفاعل مع البحث
 const q=document.getElementById('q');let qT=null;
 if(q)q.addEventListener('input',()=>{clearTimeout(qT);qT=setTimeout(()=>{const v=q.value.trim();if(!v)return;const n=document.querySelectorAll('#grid .card').length;talk(n?'magnify':'wow',n?('🔍 وجدت لك <b>'+n+'</b> نتيجة لـ «'+v.replace(/[<>&]/g,'')+'».'):'🤔 لم أجد شيئًا… جرّب كلمة أخرى مثل «كسور» أو «نسب».',4500);},450);});
 // عند الضغط على بطاقة مقفلة أو مفتوحة
 document.addEventListener('click',e=>{const c=e.target.closest('.card');if(!c)return;setTimeout(()=>{if(c.querySelector('.badge.lock'))talk('sign','🔑 هذه للمشتركين. أدخل رمزك مرة واحدة وتُفتح كل المحطات.',5000);else talk('thumbs','🚀 اختيار رائع! اضغط «تشغيل» وأنا أشجّعك.',4000);},80);},true);
 // عند تفعيل الاشتراك
 const lb=document.getElementById('loginbtn');if(lb)new MutationObserver(()=>{if(lb.classList.contains('ok')&&!lb.dataset.bjOk){lb.dataset.bjOk='1';if(performance.now()>3000)talk('win','🎉 تم تفعيل اشتراكك! كل المسارات مفتوحة الآن.',6000);}}).observe(lb,{attributes:true,attributeFilter:['class']});
 // آخر الصفحة
 let bot=false;window.addEventListener('scroll',()=>{const at=innerHeight+scrollY>=document.body.scrollHeight-40;if(at&&!bot){bot=true;talk('raise','وصلت للنهاية! 🙌 هل تعرّفت على <b>المعلمة</b>؟<div class="acts"><button type="button" data-bj-about>عن المعلمة</button></div>',6000);}},{passive:true});
 // خمول
 let idle=null;const reset=()=>{clearTimeout(idle);idle=setTimeout(()=>{const k=TIPS[ti++%TIPS.length];talk(k[0],k[1],6500);},45000);};['pointermove','keydown','scroll','touchstart'].forEach(ev=>addEventListener(ev,reset,{passive:true}));reset();
 window.BJ.talk=talk;
}

function init(){foot();companion();document.querySelectorAll('.bj-hero').forEach(slider);if(location.hash==='#about')openAbout();if(window.BJI)BJI.hydrate();}
if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
})();
