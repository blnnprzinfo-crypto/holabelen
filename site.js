/* hola belén — navegación y vista previa del índice (compartido ES/EN) */
(function(){
  var home=document.getElementById('home');
  var cases=[].slice.call(document.querySelectorAll('.case'));
  var ids=cases.map(function(c){return c.id});

  /* Rutas por ancla: #proyecto abre su página; cualquier otra vuelve a la home */
  function route(){
    var h=decodeURIComponent(location.hash.slice(1)), isProj=ids.indexOf(h)>-1;
    home.hidden=isProj;
    cases.forEach(function(c){c.hidden=(c.id!==h)});
    document.querySelectorAll('.site-head nav a[data-sec]').forEach(function(a){
      if(a.getAttribute('data-sec')===(isProj?'trabajo':h))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    });
    if(isProj){window.scrollTo({top:0,left:0,behavior:'instant'});var t=document.querySelector('#'+h+' h1');document.title=(t?t.textContent+' · ':'')+'hola belén'}
    else{document.title='hola belén';var el=h&&document.getElementById(h);if(el)el.scrollIntoView();else if(!h)window.scrollTo({top:0,left:0,behavior:'instant'})}
  }
  window.addEventListener('hashchange',route); route();

  /* El logo pequeño de la cabecera aparece cuando el grande de la portada sale de pantalla */
  var hero=document.querySelector('.hero');
  if(hero&&'IntersectionObserver' in window){
    new IntersectionObserver(function(en){document.body.classList.toggle('en-portada',en[0].isIntersecting&&!home.hidden)},{rootMargin:'-80px 0px 0px 0px'}).observe(hero);
    window.addEventListener('hashchange',function(){if(home.hidden)document.body.classList.remove('en-portada')});
  }

  /* Vista previa que sigue al cursor en el índice (solo con ratón) */
  var peek=document.querySelector('.peek');
  if(peek&&window.matchMedia('(hover:hover)').matches){
    var img=null, x=0,y=0,raf=0;
    function place(){peek.style.left=x+'px';peek.style.top=y+'px';raf=0}
    document.querySelectorAll('.index a[data-img]').forEach(function(a){
      a.addEventListener('mouseenter',function(){if(!img){img=document.createElement('img');img.alt='';peek.appendChild(img)}img.src=a.getAttribute('data-img');peek.classList.add('on')});
      a.addEventListener('mouseleave',function(){peek.classList.remove('on')});
      a.addEventListener('mousemove',function(e){var w=peek.offsetWidth;x=(e.clientX+40+w>innerWidth)?e.clientX-40-w:e.clientX+40;y=e.clientY;if(!raf)raf=requestAnimationFrame(place)});
    });
  }
})();
