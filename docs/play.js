'use strict';
const variants={
  a:{label:'幕绳开幕',action:'拉绳开幕',next:'幕已开启'},
  b:{label:'戏票开幕',action:'撕票开幕',next:'已验入场'},
  c:{label:'场灯开幕',action:'推灯开幕',next:'场灯已亮'}
};
const request=new URLSearchParams(location.search).get('v');
const variant=Object.hasOwn(variants,request)?request:'a';
const {action,next}=variants[variant];
document.body.classList.add(variant);
const title='<div class="titling"><p class="act">第一幕 <i></i> 遗失的来信</p><h1><span>月亮</span><span>失物处</span></h1><p class="line">今夜，有人把月亮落在了剧场。</p></div>';
const picture='<img class="art" src="scenery.webp" width="1536" height="1024" alt="绯红丝绒幕帘内，衔信的小狐站在弯月照亮的柳林前。">';
const box='<button class="box" disabled><span aria-hidden="true">✧</span> 七号包厢 <span aria-hidden="true">↗</span></button>';
const opening='<button class="open" aria-label="'+action+'"><i class="mechanism" aria-hidden="true"></i><span class="verb">'+action+'</span></button>';
const scenes={
 a:'<section class="proscenium">'+picture+'<div class="shade"></div><div class="wing left"></div><div class="wing right"></div>'+title+'<div class="rope-controls">'+opening+'</div><div class="balcony">'+box+'</div></section>',
 b:'<section class="ticket"><div class="ticket-main"><div class="ticket-copy">'+title+'</div><div class="plate">'+picture+'</div></div><div class="stub"><div class="seat-no" aria-hidden="true">07</div>'+opening+box+'<i class="barcode" aria-hidden="true"></i></div></section>',
 c:'<section class="lightdesk"><div class="house"><div class="stage-model">'+picture+'</div><canvas id="seats" aria-hidden="true"></canvas>'+box+'</div><div class="desk-copy">'+title+'<div class="fader">'+opening+'</div></div></section>'
};
document.querySelector('#scene').innerHTML=scenes[variant];
const start=document.querySelector('.open'),entry=document.querySelector('.box'),dialog=document.querySelector('dialog'),phase=document.querySelector('#phase');
let opened=false;
function raiseCurtain(){
  if(opened)return;
  opened=true;document.body.classList.add('opened');
  start.querySelector('.verb').textContent=next;
  start.disabled=true;entry.disabled=false;phase.textContent='演出中 · 第一幕';
  if(variant==='c')drawSeats();
  entry.focus({preventScroll:true});
}
start.addEventListener('click',raiseCurtain);
let press;
start.onpointerdown=e=>{if(e.button===0){press={x:e.clientX,y:e.clientY};start.setPointerCapture(e.pointerId);}};
start.onpointermove=e=>{
  if(!press || opened)return;
  const dist=variant==='a'?e.clientY-press.y:variant==='b'?Math.abs(e.clientX-press.x):press.y-e.clientY;
  const progress=Math.min(Math.max(dist,0),44);
  start.style.setProperty('--pull',progress+'px');
  if(progress>=42){press=null;raiseCurtain();}
};
start.onpointerup=start.onpointercancel=()=>{press=null;start.style.removeProperty('--pull');};
entry.onclick=()=>{dialog.showModal();document.querySelector('#back').focus();};
document.querySelector('#back').onclick=()=>dialog.close();
dialog.onclose=()=>entry.focus({preventScroll:true});
function drawSeats(){
  const cv=document.querySelector('#seats');
  if(!cv)return;
  const w=cv.clientWidth,h=cv.clientHeight;
  if(!w || !h)return;
  const dpr=Math.min(window.devicePixelRatio,2);
  cv.width=w*dpr;cv.height=h*dpr;
  const ctx=cv.getContext('2d');
  ctx.scale(w*dpr/600,h*dpr/370);
  // Fanned rows follow the sight line to the stage, with a center and two side aisles.
  for(let row=0;row<8;row++){
    const r=113+row*24, count=16+row*2;
    for(let n=0;n<count;n++){
      const a=(n/(count-1)-0.5)*2.18;
      if(Math.abs(a)<.054 || Math.abs(Math.abs(a)-.63)<.047)continue;
      const x=300+r*Math.sin(a),y=-12+r*Math.cos(a);
      ctx.save();ctx.translate(x,y);ctx.rotate(-a);
      ctx.fillStyle=opened?'#987244':'#355c58';ctx.strokeStyle=opened?'#e7ca8b':'#95aa93';ctx.lineWidth=.9;
      ctx.beginPath();ctx.roundRect(-5,-6,10,12,2);ctx.fill();ctx.stroke();ctx.restore();
    }
  }
  ctx.strokeStyle=opened?'#d9a85c':'#617e71';ctx.lineWidth=1;
  for(let side of [-1,1]){
    ctx.beginPath();ctx.moveTo(300+side*92,20);ctx.lineTo(300+side*263,135);ctx.lineTo(300+side*280,170);ctx.stroke();
  }
  ctx.fillStyle='#9eb3a2';ctx.font='12px monospace';ctx.textAlign='center';ctx.fillText('STALLS',300,327);
}
if(variant==='c') new ResizeObserver(drawSeats).observe(document.querySelector('.house'));
