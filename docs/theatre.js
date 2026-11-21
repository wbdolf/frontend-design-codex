'use strict';
const $=s=>document.querySelector(s);
const acts={
  1:{label:'第一幕',roman:'ACT I',name:'遗失的来信',line:'今夜，有人把月亮落在了剧场。',letter:'你翻起空座的椅垫。一封信只写了一行。',quote:'「捡到月亮的人，请在天亮以前归还。」'},
  2:{label:'第二幕',roman:'ACT II',name:'归还月光',line:'天快亮了，河面还留着一盏灯。',letter:'座椅上多了一张回执，纸角沾着细细的金粉。',quote:'「月亮已经收好。谢谢你留灯等我。」'}
};
const rig=$('#rig'),loge=$('#loge'),box=$('#box'),field=$('.field'),statusEl=$('#status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const readState=()=>history.state?.theatre;
let act=acts[readState()?.act]?Number(readState().act):1;
let phase='closed',drag=null,cordTarget=0,cordPosition=0,autoTimer=0;
let returnScroll=0,focusAfterOpen=false;
function save(boxOpen=false){
  history.replaceState({...history.state,theatre:{act,open:phase==='open',box:boxOpen}},'');
}
const cloth=makeCurtain($('#drape'),(state,aim)=>{
  const desired=drag?cordTarget:phase==='tension'?24:phase==='opening'?Math.max(0,1-state.rail)*92:0;
  cordPosition=drag?desired:cordPosition+(desired-cordPosition)*.24;
  if(reduced.matches || (state.rail===aim&&!drag&&phase!=='opening'))cordPosition=0;
  rig.style.setProperty('--pull',cordPosition.toFixed(1)+'px');
  rig.style.setProperty('--sway',Math.max(-7,Math.min(7,state.hemV*4-state.railV*3)).toFixed(1)+'deg');
  field.style.setProperty('--light',Math.min(1,state.body).toFixed(3));
});
function renderAct(){
  const a=acts[act];document.body.classList.toggle('act2',act===2);
  $('#roman').textContent=a.roman;$('#actname').textContent=a.label+' · '+a.name;$('#tagline').textContent=a.line;
  $('#boxact').textContent=a.label+' · '+a.name;$('#lettercopy').textContent=a.letter;$('#quote').textContent=a.quote;$('#leave').textContent='← 返回'+a.label;
  document.querySelectorAll('.choose').forEach(b=>{const active=Number(b.dataset.act)===act;b.setAttribute('aria-pressed',active);b.querySelector('.go').textContent=active?'回到本幕 ↑':'上台 ↗';});
}
function ready(focus=false){
  box.querySelector('img').loading='eager';
  phase='open';document.body.classList.add('running');rig.disabled=true;loge.disabled=false;
  statusEl.textContent=acts[act].label+' · 演出中';$('#instruction').textContent='台侧包厢已亮灯';$('#replay').hidden=false;save();
  if(focus)loge.focus({preventScroll:true});
}
function finish(){
  phase='opening';statusEl.textContent='开幕中';rig.disabled=true;
  cloth.set(1,.07,()=>{cloth.set(1,0);ready(focusAfterOpen);});
}
function autoOpen(keyboard=false){
  if(phase!=='closed')return;
  box.querySelector('img').loading='eager';
  focusAfterOpen=keyboard;
  phase='tension';statusEl.textContent='幕绳收紧';cordTarget=32;
  cloth.set(.006,1);
  if(reduced.matches){finish();return;}
  rig.style.setProperty('--pull','20px');
  autoTimer=setTimeout(finish,230);
}
function reset(focus=false,instant=false){
  clearTimeout(autoTimer);drag=null;phase=instant?'closed':'closing';
  document.body.classList.remove('running');loge.disabled=true;rig.disabled=!instant;$('#replay').hidden=true;
  const done=()=>{phase='closed';rig.disabled=false;statusEl.textContent='候场';$('#instruction').textContent='下拉或轻点幕绳开幕';save();if(focus)rig.focus({preventScroll:true});};
  if(instant){cloth.instant(0);done();}else{statusEl.textContent='合幕中';cloth.set(0,0,done);}
}
rig.addEventListener('pointerdown',e=>{
  if(phase!=='closed'||drag||e.button!==0)return;
  box.querySelector('img').loading='eager';
  focusAfterOpen=false;
  drag={id:e.pointerId,start:e.clientY,distance:0,moved:false};
  rig.setPointerCapture(e.pointerId);
});
rig.addEventListener('pointermove',e=>{
  if(!drag||drag.id!==e.pointerId)return;
  const travel=Math.min(1,Math.max(0,e.clientY-drag.start)/(field.clientWidth<650?115:165));
  drag.distance=travel;if(Math.abs(e.clientY-drag.start)>5)drag.moved=true;
  cordTarget=Math.min(116,Math.max(0,e.clientY-drag.start));
  rig.style.setProperty('--pull',cordTarget+'px');
  const tension=Math.min(1,travel/.22);
  cloth.set(Math.max(0,travel-.18)/.82*.92,tension*(1-.5*travel));
  const label=travel>=.59?'松手开幕':travel>.18?'幕布展开中':travel>.015?'幕绳收紧':'候场';
  if(statusEl.textContent!==label)statusEl.textContent=label;
});
function release(e,cancel){
  if(!drag || e.pointerId!==drag.id)return;
  const {distance,moved}=drag;drag=null;
  if(rig.hasPointerCapture(e.pointerId))rig.releasePointerCapture(e.pointerId);
  if(cancel || moved && distance<.59){reset(false);return;}
  if(moved)finish();else autoOpen();
}
rig.onpointerup=e=>release(e,false);rig.onpointercancel=rig.onlostpointercapture=e=>release(e,true);
rig.onclick=e=>{if(e.detail===0)autoOpen(true);};
$('#replay').onclick=()=>reset(true);
// A single reversible camera track follows the actual arch in the current crop.
const surroundings=[...document.querySelectorAll('body > .skip, body > header, body > main, body > footer')];
const roomView=box.querySelector('.room-view img'), roomText=box.querySelector('.room-overlay');
let travel=0,destination=0,raf=0,lastFrame=0,geometry=null,backPending=false;
const ease=(start,end,value)=>{
  const n=Math.max(0,Math.min(1,(value-start)/(end-start)));
  return n*n*(3-2*n);
};
// Clip the oversized moving scene to the physical viewport. On a touch
// viewport an unclipped transformed layer can enlarge fixed-position elements.
const cameraWindow=$('#camera-window');
const placeholder=document.createElement('div');
placeholder.className='field-space';
function mountCamera(){
  field.before(placeholder);
  cameraWindow.hidden=false;
  cameraWindow.append(field);
}
function unmountCamera(){
  placeholder.replaceWith(field);
  for(const prop of ['position','left','top','width','height','transform'])field.style[prop]='';
  cameraWindow.hidden=true;
}
function measurePassage(){
  const slot=placeholder.getBoundingClientRect();
  Object.assign(field.style,{position:'absolute',left:slot.left+'px',top:slot.top+'px',width:slot.width+'px',height:slot.height+'px'});
  const old=field.style.transform;
  field.style.transform='none';
  const scene=field.getBoundingClientRect(),arch=loge.querySelector('img').getBoundingClientRect();
  geometry={left:scene.left,top:scene.top,x:arch.left+arch.width*.50,y:arch.top+arch.height*.43,
    scale:Math.min(14,Math.max(innerWidth/(arch.width*.85),innerHeight/(arch.height*.85)))};
  field.style.transform=old;
}
function drawPassage(){
  const p=travel,g=geometry;
  const zoom=reduced.matches?0:ease(0,.89,p), pan=ease(0,.78,p);
  const scale=Math.pow(g.scale,zoom);
  const dx=(innerWidth*.54-g.x)*pan-(g.x-g.left)*(scale-1);
  const dy=(innerHeight*.47-g.y)*pan-(g.y-g.top)*(scale-1);
  field.style.transform=reduced.matches?'none':'translate3d('+dx+'px,'+dy+'px,0) scale('+scale+')';
  const inside=ease(.51,.86,p);
  box.style.opacity=String(inside);
  roomView.style.transform='scale('+(1+(reduced.matches?0:.085*ease(.51,1,p)))+')';
  roomText.style.opacity=String(ease(.72,.98,p));
  field.querySelector('.marquee').style.opacity=String(1-ease(.04,.30,p));
  loge.querySelector('span').style.opacity=String(1-ease(.12,.30,p));
  box.style.pointerEvents=p>.69?'auto':'none';
}
function restAtDestination(){
  raf=lastFrame=0;
  if(destination){
    box.dataset.view='inside';
    $('#leave').focus({preventScroll:true});
    return;
  }
  box.hidden=true;box.inert=true;delete box.dataset.view;
  document.body.classList.remove('travelling');
  surroundings.forEach(el=>el.inert=false);
  unmountCamera();
  field.querySelector('.marquee').style.opacity='';
  loge.querySelector('span').style.opacity='';
  window.scrollTo({top:returnScroll,behavior:'instant'});
  loge.focus({preventScroll:true});geometry=null;
}
function advance(time){
  const dt=lastFrame?Math.min(80,time-lastFrame):16;
  lastFrame=time;
  travel=reduced.matches?destination:Math.max(0,Math.min(1,travel+(destination?1:-1)*dt/1650));
  drawPassage();
  if(travel===destination)restAtDestination();
  else raf=requestAnimationFrame(advance);
}
function moveToRoom(inside,instant=false){
  destination=inside?1:0;
  box.dataset.view=inside?'entering':'leaving';
  if(instant || reduced.matches){
    cancelAnimationFrame(raf);travel=destination;drawPassage();restAtDestination();
  }else if(!raf){lastFrame=0;raf=requestAnimationFrame(advance);}
}
function enter(push=true,instant=false){
  if(phase!=='open'||destination)return;
  if(box.hidden){
    returnScroll=push?scrollY:(readState()?.scroll??scrollY);
    window.scrollTo({top:returnScroll,behavior:'instant'});
    document.body.classList.add('travelling');mountCamera();measurePassage();
    surroundings.forEach(el=>el.inert=true);
    box.hidden=false;box.inert=false;
  }
  if(push)history.pushState({theatre:{act,open:true,box:true,scroll:returnScroll}},'','#loge-7');
  moveToRoom(true,instant);
}
function exitBox(){
  if(box.hidden||!destination)return;
  moveToRoom(false);
}
loge.onclick=()=>enter();
function leave(){
  if(!destination||backPending)return;
  if(readState()?.box){backPending=true;history.back();}
  else exitBox();
}
$('#leave').onclick=leave;
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&destination){e.preventDefault();leave();}});
window.addEventListener('resize',()=>{if(!box.hidden){measurePassage();drawPassage();}});
window.onpopstate=()=>{
  backPending=false;
  const s=readState();
  if(s?.box){
    if(acts[s.act]){act=s.act;renderAct();}
    if(phase!=='open'){cloth.instant(1);ready();history.replaceState({theatre:s},'');}
    enter(false);
  }else exitBox();
};
document.querySelectorAll('.choose').forEach(b=>b.onclick=()=>{
  const target=Number(b.dataset.act);
  if(phase==='closing'||phase==='opening'||phase==='tension'||drag)return;
  act=target;renderAct();if(phase==='open')ready();else save();
  $('#stage').scrollIntoView({behavior:reduced.matches?'instant':'smooth'});
  (phase==='open'?loge:rig).focus({preventScroll:true});
});
const initial=readState();
renderAct();
if(initial?.open || location.hash==='#loge-7'){
  cloth.instant(1);ready();
  if(initial?.box){history.replaceState({theatre:initial},'');enter(false,true);}
  else if(location.hash==='#loge-7'){
    history.replaceState(history.state,'',location.pathname+location.search);
    enter(true,true);
  }
}else reset(false,true);
