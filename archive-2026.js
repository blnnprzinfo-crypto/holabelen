(function(){
  var rail=document.querySelector('.archive-rail');
  var orb=document.querySelector('.drag-orb');

  function updateClock(){
    var now=new Date();
    document.querySelectorAll('[data-hour]').forEach(function(el){el.textContent=String(now.getHours()).padStart(2,'0')});
    document.querySelectorAll('[data-minute]').forEach(function(el){el.textContent=String(now.getMinutes()).padStart(2,'0')});
  }
  updateClock(); window.setInterval(updateClock,30000);

  if(rail){
    var active=false,startX=0,startScroll=0,moved=false;
    function begin(x){active=true;moved=false;startX=x;startScroll=rail.scrollLeft}
    /* Solo se captura el puntero cuando hay arrastre real, para que un clic simple abra el proyecto */
    function move(x,e){if(!active)return;var delta=x-startX;if(!moved&&Math.abs(delta)>5){moved=true;rail.classList.add('dragging');if(e&&e.pointerId!=null)rail.setPointerCapture(e.pointerId)}if(moved)rail.scrollLeft=startScroll-delta}
    function end(){active=false;rail.classList.remove('dragging')}
    rail.addEventListener('pointerdown',function(e){if(e.pointerType==='mouse'&&e.button!==0)return;if(e.pointerType!=='mouse')return;begin(e.clientX)});
    rail.addEventListener('pointermove',function(e){move(e.clientX,e)});
    rail.addEventListener('dragstart',function(e){e.preventDefault()});
    rail.addEventListener('pointerup',end);rail.addEventListener('pointercancel',end);
    rail.addEventListener('click',function(e){if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
    rail.addEventListener('wheel',function(e){if(Math.abs(e.deltaY)>Math.abs(e.deltaX)){rail.scrollLeft+=e.deltaY;e.preventDefault()}},{passive:false});
    if(orb){orb.addEventListener('pointerdown',function(e){begin(e.clientX);orb.setPointerCapture(e.pointerId)});orb.addEventListener('pointermove',function(e){move(e.clientX)});orb.addEventListener('pointerup',end);orb.addEventListener('pointercancel',end)}
  }

  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
    var items=document.querySelectorAll('.case-text,.plate,.duo,.quad,.grid4');
    items.forEach(function(el){el.classList.add('reveal')});
    var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('in');observer.unobserve(entry.target)}})},{threshold:.08,rootMargin:'0px 0px -5%'});
    items.forEach(function(el){observer.observe(el)});
  }
})();
