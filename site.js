/* Hola BELÉN — comportamiento compartido ES/EN
   1. rutas por ancla  2. saludo que cambia de idioma al hacer scroll  3. cabecera
   4. vista previa del índice  5. móvil con el feed de Losie Tattoo  6. visor de imágenes  7. barra de lectura */
(function(){
  var doc=document.documentElement, lang=doc.lang||'es', EN=lang==='en';
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var home=document.getElementById('home');
  var cases=[].slice.call(document.querySelectorAll('.case'));
  var ids=cases.map(function(c){return c.id});
  var baseTitle=document.title;

  /* ---------- 1. rutas: #proyecto abre su página; cualquier otra ancla vuelve a la home ---------- */
  function route(){
    var h=decodeURIComponent(location.hash.slice(1)), isProj=ids.indexOf(h)>-1;
    home.hidden=isProj;
    cases.forEach(function(c){c.hidden=(c.id!==h)});
    document.querySelectorAll('.site-head nav a[data-sec]').forEach(function(a){
      if(a.getAttribute('data-sec')===(isProj?'trabajo':h))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    });
    if(isProj){window.scrollTo({top:0,left:0,behavior:'instant'});var t=document.querySelector('#'+h+' h1');document.title=(t?t.textContent+' · ':'')+'Belén Pérez'}
    else{document.title=baseTitle;var el=h&&document.getElementById(h);if(el)el.scrollIntoView();else if(!h)window.scrollTo({top:0,left:0,behavior:'instant'})}
    updateHead(); progress();
  }
  window.addEventListener('hashchange',route);

  /* ---------- 2. saludo: Hola, Bon dia, Hello, Bonjour (los idiomas que habla) ---------- */
  var saludo=document.querySelector('.saludo'), words=[], labels=[], current=-1;
  if(saludo){
    words=[].slice.call(saludo.querySelectorAll('.w'));
    labels=[].slice.call(saludo.querySelectorAll('.langs span'));
    if(reduce)saludo.classList.add('quieto');
  }
  function show(i){
    if(i===current)return; current=i;
    words.forEach(function(w,k){w.classList.toggle('on',k===i);w.classList.toggle('fuera',k<i)});
    labels.forEach(function(l,k){l.classList.toggle('on',k===i)});
  }
  function saludoTick(){
    if(!saludo||reduce||home.hidden)return;
    var r=saludo.getBoundingClientRect(), span=r.height-innerHeight;
    var p=span>0?Math.min(1,Math.max(0,-r.top/span)):0;
    show(Math.min(words.length-1,Math.floor(p*words.length*0.999)));
    saludo.style.setProperty('--p',p.toFixed(3));
  }
  if(saludo)show(0);

  /* ---------- 3. cabecera: transparente mientras se ve el saludo ---------- */
  function updateHead(){
    var on=false;
    if(saludo&&!home.hidden){var r=saludo.getBoundingClientRect();on=r.bottom>innerHeight*.35}
    document.body.classList.toggle('en-portada',on);
  }

  /* ---------- 7. barra de lectura en las páginas de proyecto ---------- */
  var bar=document.querySelector('.leer');
  function progress(){
    if(!bar)return;
    if(!home.hidden){bar.style.transform='scaleX(0)';return}
    var max=document.documentElement.scrollHeight-innerHeight;
    bar.style.transform='scaleX('+(max>0?Math.min(1,scrollY/max):0)+')';
  }

  var ticking=false;
  window.addEventListener('scroll',function(){if(!ticking){ticking=true;requestAnimationFrame(function(){saludoTick();updateHead();progress();if(window.__pinta)window.__pinta();ticking=false})}},{passive:true});
  window.addEventListener('resize',function(){saludoTick();updateHead()});
  route(); saludoTick();

  /* ---------- 4. vista previa que sigue al cursor en el índice ---------- */
  var peek=document.querySelector('.peek');
  if(peek&&window.matchMedia('(hover:hover)').matches){
    var pimg=null,x=0,y=0,raf=0;
    function place(){peek.style.left=x+'px';peek.style.top=y+'px';raf=0}
    document.querySelectorAll('.index a[data-img]').forEach(function(a){
      a.addEventListener('mouseenter',function(){if(!pimg){pimg=document.createElement('img');pimg.alt='';peek.appendChild(pimg)}pimg.src=a.getAttribute('data-img');peek.classList.add('on')});
      a.addEventListener('mouseleave',function(){peek.classList.remove('on')});
      a.addEventListener('mousemove',function(e){var w=peek.offsetWidth;x=(e.clientX+40+w>innerWidth)?e.clientX-40-w:e.clientX+40;y=e.clientY;if(!raf)raf=requestAnimationFrame(place)});
    });
  }

  /* ---------- 5. móvil con el feed de @losietattoomurcia (enero a mayo de 2026) ---------- */
  var FEED=[["01","2026-01-04",0],["02","2026-01-05",0],["03","2026-01-07",1],["04","2026-01-08",0],["05","2026-01-11",0],["06","2026-01-15",0],["07","2026-01-19",1],["08","2026-01-23",1],["09","2026-01-26",0],["10","2026-01-27",1],["11","2026-02-02",0],["12","2026-02-06",1],["13","2026-02-08",0],["14","2026-02-16",1],["15","2026-02-20",0],["16","2026-02-23",1],["17","2026-03-02",0],["18","2026-03-09",0],["19","2026-03-17",0],["20","2026-03-24",0],["21","2026-03-26",0],["22","2026-04-01",0],["23","2026-04-05",1],["24","2026-04-12",0],["25","2026-04-14",0],["26","2026-04-16",0],["27","2026-04-20",1],["28","2026-04-20",0],["29","2026-04-22",0],["30","2026-04-28",0],["31","2026-04-30",0],["32","2026-05-05",0],["33","2026-05-08",0],["34","2026-05-12",0],["35","2026-05-15",0],["36","2026-05-19",0],["37","2026-05-21",0],["38","2026-05-25",0],["39","2026-05-26",0],["40","2026-05-27",0],["41","2026-05-29",1]];
  var MES=EN?['Jan','Feb','Mar','Apr','May']:['Ene','Feb','Mar','Abr','May'];
  var MESL=EN?['January','February','March','April','May']:['enero','febrero','marzo','abril','mayo'];
  var T=EN?{all:'All',post:'Post',reel:'Reel',close:'Back to profile',posts:'posts',of:'of'}:{all:'Todo',post:'Publicación',reel:'Reel',close:'Volver al perfil',posts:'publicaciones',of:'de'};
  function fecha(d){var m=+d.slice(5,7),dd=+d.slice(8,10);return EN?MESL[m-1]+' '+dd+', 2026':dd+' de '+MESL[m-1]+' de 2026'}
  document.querySelectorAll('[data-feed]').forEach(function(ph){
    var base=ph.getAttribute('data-feed'), screen=ph.querySelector('.ph-screen');
    var grid=document.createElement('div');grid.className='ph-grid';
    var chips=document.createElement('div');chips.className='ph-chips';chips.setAttribute('role','toolbar');chips.setAttribute('aria-label',EN?'Filter by month':'Filtrar por mes');
    var count=ph.querySelector('.ph-count');
    function mk(label,m){var b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-pressed',m===0?'true':'false');b.addEventListener('click',function(){
      chips.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');
      var n=0;grid.querySelectorAll('button').forEach(function(t){var ok=m===0||+t.dataset.m===m;t.hidden=!ok;if(ok)n++});
      if(count)count.textContent=n;grid.scrollTop=0});chips.appendChild(b)}
    mk(T.all,0);MES.forEach(function(l,i){mk(l,i+1)});
    FEED.slice().reverse().forEach(function(p){
      var b=document.createElement('button');b.type='button';b.dataset.m=+p[1].slice(5,7);b.dataset.i=p[0];
      b.setAttribute('aria-label',(p[2]?T.reel:T.post)+', '+fecha(p[1]));
      b.innerHTML='<img src="'+base+p[0]+'.webp" alt="" loading="lazy">'+(p[2]?'<span class="ph-reel" aria-hidden="true"></span>':'');
      b.addEventListener('click',function(){open(p)});grid.appendChild(b);
    });
    var view=document.createElement('div');view.className='ph-view';view.hidden=true;
    view.innerHTML='<button type="button" class="ph-back">← '+T.close+'</button><p></p>';
    view.querySelector('.ph-back').addEventListener('click',function(){view.hidden=true;grid.focus()});
    function open(p){var im=view.querySelector('img');if(!im){im=document.createElement('img');view.insertBefore(im,view.querySelector('p'))}im.src=base+p[0]+'.webp';im.alt=(p[2]?T.reel:T.post)+' '+fecha(p[1]);view.querySelector('p').textContent=(p[2]?T.reel:T.post)+' · '+fecha(p[1]);view.hidden=false;view.querySelector('.ph-back').focus()}
    grid.tabIndex=-1;
    screen.appendChild(chips);screen.appendChild(grid);screen.appendChild(view);
    if(count)count.textContent=FEED.length;
  });

  /* ---------- 6. visor: clic en una imagen de proyecto para verla a pantalla completa ---------- */
  var lb=document.createElement('dialog');lb.className='visor';
  lb.innerHTML='<button type="button" class="visor-x" aria-label="'+(EN?'Close':'Cerrar')+'">×</button>';
  document.body.appendChild(lb);
  /* la imagen del visor se crea al abrirlo, para no dejar una imagen vacía en la página */
  function visorImg(){var v=lb.querySelector('img');if(!v){v=document.createElement('img');lb.appendChild(v)}return v}
  lb.addEventListener('click',function(e){if(e.target!==lb.querySelector('img'))lb.close()});
  document.querySelectorAll('.case .plates img').forEach(function(im){if(im.closest('.phone'))return;
    im.tabIndex=0;im.setAttribute('role','button');
    function go(){var v=visorImg();v.src=im.currentSrc||im.src;v.alt=im.alt;if(lb.showModal)lb.showModal()}
    im.addEventListener('click',go);
    im.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}});
  });

  /* ---------- 8. telón azul al entrar y salir de un proyecto ---------- */
  var telon=document.createElement('div');telon.className='telon';telon.setAttribute('aria-hidden','true');
  telon.innerHTML='<span></span>';document.body.appendChild(telon);
  var corriendo=false;
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href^="#"]');
    if(!a||reduce||corriendo||e.metaKey||e.ctrlKey||e.shiftKey)return;
    var to=a.getAttribute('href').slice(1), from=location.hash.slice(1);
    var cambia=(ids.indexOf(to)>-1&&to!==from)||(ids.indexOf(from)>-1&&ids.indexOf(to)===-1);
    if(!cambia)return;
    e.preventDefault();corriendo=true;
    var dest=a.closest('.case,.exp,.index,.work');
    telon.querySelector('span').textContent=(document.querySelector('#'+(ids.indexOf(to)>-1?to:'x')+' h1')||{}).textContent||'';
    telon.className='telon cubre';
    setTimeout(function(){
      location.hash=to;
      setTimeout(function(){telon.className='telon destapa';setTimeout(function(){telon.className='telon';corriendo=false},560)},90);
    },520);
  });

  /* ---------- 9. texto que se enciende palabra a palabra al hacer scroll ---------- */
  var revela=[].slice.call(document.querySelectorAll('[data-revela]'));
  if(!reduce&&revela.length){
    revela.forEach(function(el){
      var t=el.textContent.trim().split(/\s+/);
      el.setAttribute('aria-label',el.textContent.trim());
      el.innerHTML=t.map(function(w){return '<span class="pal" aria-hidden="true">'+w+'</span>'}).join(' ');
    });
    var pinta=function(){
      revela.forEach(function(el){
        if(!el.offsetParent)return;
        var r=el.getBoundingClientRect(), vh=innerHeight;
        var p=Math.min(1,Math.max(0,(vh*.88-r.top)/(r.height+vh*.45)));
        var w=el.children, n=Math.round(p*w.length*1.15);
        for(var i=0;i<w.length;i++)w[i].classList.toggle('on',i<n);
      });
    };
    window.__pinta=pinta;
    window.addEventListener('hashchange',function(){setTimeout(pinta,50)});
    pinta();
  }

  /* ---------- 10. imágenes que se descubren al entrar en pantalla ---------- */
  if(!reduce&&'IntersectionObserver' in window){
    var asoman=document.querySelectorAll('.proj figure, .exp-phone .phone');
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('dentro');io.unobserve(x.target)}})},{rootMargin:'0px 0px -12% 0px'});
    asoman.forEach(function(f){f.classList.add('asoma');io.observe(f)});
  }

})();
