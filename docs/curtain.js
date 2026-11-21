'use strict';
/* Each half has driven carriers at the top, then two increasingly heavy
   follower masses. The mesh keeps the outside edge pinned to the wing. */
function makeCurtain(canvas,onFrame){
  const texture=new Image();texture.src='velvet.webp';
  const ctx=canvas.getContext('2d',{alpha:true});
  const cloth={rail:0,body:0,hem:0,railV:0,bodyV:0,hemV:0,tension:0,tensionV:0};
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  let aim=0,tensionAim=0,frame=0,last=0,settled=null,width=0,height=0;
  let source=null, fallback;
  function size(){
    const rect=canvas.getBoundingClientRect(),ratio=Math.min(devicePixelRatio||1,1.5);
    width=canvas.width=Math.max(1,Math.round(rect.width*ratio));
    height=canvas.height=Math.max(1,Math.round(rect.height*ratio));
    draw();
  }
  function spring(name,goal,k,damping,dt){
    const v=name+'V';
    cloth[v]+=(k*(goal-cloth[name])-damping*cloth[v])*dt;
    cloth[name]+=cloth[v]*dt;
  }
  function draw(){
    if(!width || !height)return;
    ctx.clearRect(0,0,width,height);
    // Horizontal bands preserve the weave while allowing the head and hem
    // to travel at different speeds. A gathered waist pinches the side folds.
    const rows=Math.min(130,Math.ceil(height/4));
    for(let side=0;side<2;side++){
      ctx.save();if(side){ctx.translate(width,0);ctx.scale(-1,1);}
      const panel=source||fallback;
      for(let i=0;i<rows;i++){
        const v=i/rows,step=1/rows,mid=Math.sin(Math.PI*v);
        const blend=v<.5?v*2:(v-.5)*2;
        const k=blend*blend*(3-2*blend);
        let travel=v<.5?cloth.rail+(cloth.body-cloth.rail)*k:cloth.body+(cloth.hem-cloth.body)*k;
        // A slight phase difference breaks perfect mirror symmetry.
        if(side)travel-=.013*Math.min(1,Math.abs(cloth.bodyV))*(.25+v);
        const tensionBow=.013*mid*cloth.tension;
        const gathered=.046+.087*(1-v)**3+.05*v**4;
        const reach=width*((.501-.004*v)*(1-travel)+gathered*travel-tensionBow);
        const lift=(.035*travel+.019*cloth.tension)*Math.pow(v,2);
        const y=height*(v-lift);
        const bandHeight=height*step*(1-2*lift/(v||1))+.9;
        const ripple=.012*Math.sin(v*5.2+(side?1.4:.2))*travel+.014*cloth.tension*mid;
        const sy=Math.max(0,Math.min(.999,v+ripple*Math.sin(Math.PI*v)));
        if(panel)ctx.drawImage(panel,0,sy*panel.height,panel.width,Math.min(panel.height*(step+.0008),panel.height*(1-sy)),0,y,Math.max(1,reach),bandHeight);
        else {ctx.fillStyle='#662134';ctx.fillRect(0,y,reach,bandHeight);}
      }
      ctx.restore();
    }
    onFrame(cloth,aim);
  }
  function animate(time){
    const elapsed=last?Math.min(.045,(time-last)/1000):.016;last=time;
    const n=Math.ceil(elapsed/.008);
    for(let i=0;i<n;i++){
      const dt=elapsed/n;
      spring('tension',tensionAim,155,21,dt);
      spring('rail',aim,85,16,dt);
      spring('body',cloth.rail,72,14,dt);
      spring('hem',cloth.body,47,10.5,dt);
    }
    const resting=['rail','body','hem','tension'].every(name=>Math.abs(cloth[name]-(name==='tension'?tensionAim:aim))<.001 && Math.abs(cloth[name+'V'])<.007);
    if(resting || reduce.matches){
      for(const name of ['rail','body','hem','tension']){cloth[name]=name==='tension'?tensionAim:aim;cloth[name+'V']=0;}
      frame=last=0;draw();const done=settled;settled=null;done?.();return;
    }
    draw();frame=requestAnimationFrame(animate);
  }
  function set(open,tight,done){
    aim=Math.max(0,Math.min(1,open));tensionAim=tight;settled=done;
    if(!frame)frame=requestAnimationFrame(animate);
  }
  // Keep a small texture resident for slow devices and for the first draw.
  fallback=document.createElement('canvas');fallback.width=256;fallback.height=8;
  const fc=fallback.getContext('2d'),gradient=fc.createLinearGradient(0,0,256,0);
  for(let i=0;i<=48;i++){const l=12+(1+Math.sin(i*Math.PI/3))*6;gradient.addColorStop(i/48,'hsl(345 55% '+l+'%)');}
  fc.fillStyle=gradient;fc.fillRect(0,0,256,8);
  texture.decode().then(()=>{
    source=document.createElement('canvas');source.width=texture.naturalWidth;source.height=texture.naturalHeight;
    source.getContext('2d').drawImage(texture,0,0);draw();
  }).catch(()=>draw());
  new ResizeObserver(size).observe(canvas);
  return {set,instant(open){cancelAnimationFrame(frame);frame=last=0;settled=null;aim=open;tensionAim=0;Object.assign(cloth,{rail:open,body:open,hem:open,railV:0,bodyV:0,hemV:0,tension:0,tensionV:0});draw();}};
}
