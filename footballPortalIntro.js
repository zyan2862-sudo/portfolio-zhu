(()=>{"use strict";
const root=document.getElementById("football-intro");
if(!root)return;
const $=(s,c=root)=>c.querySelector(s);
const els={
    curtain:$(".fi-curtain"),wide:$(".fi-wide-scene"),close:$(".fi-close-scene"),ballWrap:$(".fi-ball-wrap"),ball:$(".fi-ball"),
    ballVisual:$(".fi-football-visual"),highlight:$(".football-highlight"),shadow:$(".fi-shadow"),
    particles:$(".fi-particles"),wideLights:$(".fi-wide-lights"),closeLit:$(".fi-close-lit"),closeLights:$(".fi-close-lights"),
 goal:$(".fi-close-goal"),frame:$(".fi-close-frame"),netIdle:$(".fi-close-net-idle"),netHit:$(".fi-close-net-hit"),
 netRelease:$(".fi-close-net-release"),portal:$(".fi-close-portal"),hole:$("#fi-mask-hole"),skip:$(".fi-skip"),
 fallback:$(".fi-fallback"),debug:$(".fi-debug"),readout:$("[data-debug-readout]")
  };
  const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
  const lightCurrent={x:42,y:30,opacity:0,rx:0,ry:0,scale:1,sx:0,sy:0,ss:.82,so:.42};
  const lightTarget={...lightCurrent};
  let lightRaf=0,touchResetTimer=0;
  const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
  const setLightTarget=(next={})=>Object.assign(lightTarget,next);
  const resetFootballLight=()=>setLightTarget({x:42,y:30,opacity:0,rx:0,ry:0,scale:1,sx:0,sy:0,ss:.82,so:.42});
  const renderFootballLight=()=>{
    if(!els.ballVisual||!els.highlight||!els.shadow)return;
    const factor=reducedMotion.matches?1:.13;
    Object.keys(lightCurrent).forEach(key=>{lightCurrent[key]+=(lightTarget[key]-lightCurrent[key])*factor});
    els.ballVisual.style.setProperty("--light-x",`${lightCurrent.x}%`);
    els.ballVisual.style.setProperty("--light-y",`${lightCurrent.y}%`);
    els.ballVisual.style.setProperty("--light-opacity",lightCurrent.opacity.toFixed(3));
    els.ballVisual.style.setProperty("--ball-rx",`${lightCurrent.rx.toFixed(2)}deg`);
    els.ballVisual.style.setProperty("--ball-ry",`${lightCurrent.ry.toFixed(2)}deg`);
    els.ballVisual.style.setProperty("--ball-scale",lightCurrent.scale.toFixed(4));
    els.shadow.style.setProperty("--shadow-x",`${lightCurrent.sx.toFixed(2)}px`);
    els.shadow.style.setProperty("--shadow-y",`${lightCurrent.sy.toFixed(2)}px`);
    els.shadow.style.setProperty("--shadow-scale",lightCurrent.ss.toFixed(3));
    els.shadow.style.setProperty("--shadow-opacity",lightCurrent.so.toFixed(3));
    lightRaf=requestAnimationFrame(renderFootballLight);
  };
  const updateFootballLight=(clientX,clientY)=>{
    if(!els.ball||root.dataset.phase!=="idle")return;
    const rect=els.ball.getBoundingClientRect();
    const cx=rect.left+rect.width/2,cy=rect.top+rect.height/2;
    const radius=Math.min(rect.width,rect.height)/2;
    const dx=clientX-cx,dy=clientY-cy,distance=Math.hypot(dx,dy);
    const activation=radius+160;
    if(distance>activation){resetFootballLight();return}
    const proximity=clamp(1-Math.max(0,distance-radius)/160,0,1);
    const x=clamp((clientX-rect.left)/rect.width*100,12,88);
    const y=clamp((clientY-rect.top)/rect.height*100,12,88);
    const ry=reducedMotion.matches?0:clamp(dx/radius,-1,1)*2*proximity;
    const rx=reducedMotion.matches?0:clamp(-dy/radius,-1,1)*2*proximity;
    setLightTarget({
      x,y,opacity:.12+proximity*.58,rx,ry,
      scale:reducedMotion.matches?1:1+proximity*.02,
      sx:-ry*.8,sy:rx*.5,ss:.82-proximity*.04,so:.42+proximity*.06
    });
  };
  const touchFootballLight=event=>{
    if(event.pointerType!=="touch"||!els.ball)return;
    const rect=els.ball.getBoundingClientRect();
    setLightTarget({
      x:clamp((event.clientX-rect.left)/rect.width*100,12,88),
      y:clamp((event.clientY-rect.top)/rect.height*100,12,88),
      opacity:.58,rx:0,ry:0,scale:1,sx:0,sy:0,ss:.79,so:.48
    });
    clearTimeout(touchResetTimer);
    touchResetTimer=setTimeout(resetFootballLight,300);
  };
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const mobile=matchMedia("(max-width: 700px)").matches;
const base=window.FOOTBALL_INTRO_CONFIG||{};
const d=base.duration||{};
const source=mobile?base.mobile:base.desktop;
const settings=JSON.parse(JSON.stringify(source||{}));
let running=false,paused=false,abort=0,phase="loading";
const ease={out:t=>1-Math.pow(1-t,3),inOut:t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2};
const setPhase=p=>{phase=p;root.dataset.phase=p;if(els.readout)els.readout.textContent=p};
const style=(el,props)=>Object.assign(el.style,props);
function applySettings(){
 const b=settings.ball,g=settings.closeGoal;
 style(els.ballWrap,{"--ball-x":`${b.x}%`,"--ball-y":`${b.y}%`,"--ball-size":`${b.size}px`});
 style(els.goal,{"--goal-x":`${g.x}%`,"--goal-y":`${g.y}%`,"--goal-width":`${g.width}vw`,"--goal-height":`${g.height}vh`});
}
function waitWhilePaused(){return new Promise(resolve=>{const tick=()=>paused?requestAnimationFrame(tick):resolve();tick()})}
async function tween(ms,update,easing=ease.inOut){
 const token=abort,start=performance.now();let last=start;
 return new Promise(resolve=>{
  const frame=async now=>{
   if(token!==abort)return resolve(false);
   if(paused){await waitWhilePaused();last=performance.now();return requestAnimationFrame(frame)}
   const elapsed=now-start-(last-start>100?last-start:0),t=Math.min(1,elapsed/Math.max(1,ms));
   update(easing(t),t);
   if(t<1)requestAnimationFrame(frame);else resolve(true);
  };requestAnimationFrame(frame);
 });
}
function resetVisuals(){
 setPhase("idle");applySettings();resetFootballLight();
 style(els.ballWrap,{left:`${settings.ball.x}%`,top:`${settings.ball.y}%`,transform:"translate(-50%,-50%) scale(1)",opacity:"1"});
 style(els.wide,{opacity:"1",transform:"scale(1)"});style(els.close,{opacity:"0",visibility:"hidden",transform:"scale(1.05)"});
 style(els.wideLights,{opacity:".05"});style(els.closeLit,{opacity:"0"});style(els.closeLights,{opacity:"0"});
 [els.frame,els.netIdle,els.netHit,els.netRelease,els.portal].forEach(e=>style(e,{opacity:"0",transform:"scale(1)"}));
 els.hole.setAttribute("x",".5");els.hole.setAttribute("y",".66");els.hole.setAttribute("width","0");els.hole.setAttribute("height","0");
 document.documentElement.classList.add("intro-locked");document.body.classList.add("intro-active");
}
function bezier(t,p0,p1,p2,p3){const q=1-t;return q*q*q*p0+3*q*q*t*p1+3*q*t*t*p2+t*t*t*p3}
async function play(){
 if(running)return;running=true;abort++;const token=abort;resetFootballLight();
 setPhase("press");await tween(reduce?1:d.press||180,t=>{els.ball.style.transform=`scale(${1-.12*t})`},ease.out);
 if(token!==abort)return;
 setPhase("launch");await tween(reduce?1:d.launch||220,t=>{els.ball.style.transform=`scale(${.88+.12*t})`;els.particles.style.opacity=`${.9*(1-t)}`},ease.out);
 if(token!==abort)return;
 setPhase("flight");
 const start=settings.ball,target=settings.distantGoal,curve=settings.curve||0;
 await tween(reduce?1:d.flight||1180,t=>{
   const x=bezier(t,start.x,start.x+curve,target.x-curve*.35,target.x);
   const y=bezier(t,start.y,start.y-18,target.y+8,target.y);
   const scale=1-(1-(settings.targetScale||.19))*t;
   style(els.ballWrap,{left:`${x}%`,top:`${y}%`,transform:`translate(-50%,-50%) scale(${scale}) rotate(${540*t}deg)`});
 },ease.inOut);
 if(token!==abort)return;
 setPhase("cameraPush");style(els.close,{visibility:"visible"});
 await tween(reduce?1:settings.cameraTime||d.cameraPush||1150,t=>{
   style(els.wide,{opacity:`${1-t}`,transform:`scale(${1+1.35*t})`});
   style(els.close,{opacity:`${t}`,transform:`scale(${1.05-.05*t})`});
   els.ballWrap.style.opacity=`${1-t}`;
 },ease.inOut);
 if(token!==abort)return;
 setPhase("impact");style(els.frame,{opacity:"1"});style(els.netHit,{opacity:"1"});style(els.ballWrap,{opacity:"0"});
 await tween(reduce?1:d.impact||420,t=>{els.netHit.style.transform=`scale(${1+.035*Math.sin(Math.PI*t)})`;els.netHit.style.opacity=`${1-t*.55}`});
 if(token!==abort)return;
 style(els.netHit,{opacity:"0"});style(els.netRelease,{opacity:"1"});
 setPhase("lighting");
 await tween(reduce?1:d.lighting||1050,t=>{els.closeLit.style.opacity=`${t}`;els.closeLights.style.opacity=`${.78*t}`;els.netRelease.style.opacity=`${1-.45*t}`;els.frame.style.filter=`drop-shadow(0 0 ${18*t}px rgba(255,222,160,${.6*t}))`},ease.out);
 if(token!==abort)return;
 setPhase("portal");style(els.portal,{opacity:"0"});
 await tween(reduce?1:d.portalHold||620,t=>{els.portal.style.opacity=`${.82*t}`},ease.out);
 if(token!==abort)return;
 const ms=settings.maskScale||1;
 await tween(reduce?1:d.portal||1150,t=>{
   const e=ease.inOut(t),w=.72*e*ms,h=.54*e*ms;
   els.hole.setAttribute("x",String(.5-w/2));els.hole.setAttribute("y",String(.59-h/2));
   els.hole.setAttribute("width",String(w));els.hole.setAttribute("height",String(h));
   els.portal.style.opacity=String(.85*(1-e*.85));
 },ease.inOut);
 if(token!==abort)return;
 setPhase("entering");
 await tween(reduce?1:d.entering||700,t=>{
   const e=ease.inOut(t),w=.72+(1.6-.72)*e,h=.54+(1.6-.54)*e;
   els.hole.setAttribute("x",String(.5-w/2));els.hole.setAttribute("y",String(.5-h/2));
   els.hole.setAttribute("width",String(w));els.hole.setAttribute("height",String(h));
 },ease.inOut);
 if(token!==abort)return;complete();
}
function complete(){
 setPhase("complete");running=false;document.documentElement.classList.remove("intro-locked");document.body.classList.remove("intro-active");
 root.hidden=true;const target=document.querySelector(".hero h1, main h1, #main");if(target){target.setAttribute("tabindex","-1");target.focus({preventScroll:true})}
}
function replay(){abort++;running=false;paused=false;root.hidden=false;resetVisuals()}
function showPhase(p){
 abort++;running=false;paused=true;resetVisuals();setPhase(p);
 if(["cameraPush","impact","lighting","portal"].includes(p)){style(els.wide,{opacity:"0"});style(els.close,{opacity:"1",visibility:"visible",transform:"scale(1)"});style(els.ballWrap,{opacity:"0"});style(els.frame,{opacity:"1"})}
 if(p==="impact")style(els.netHit,{opacity:"1"});
 if(p==="lighting"){style(els.netRelease,{opacity:".55"});style(els.closeLit,{opacity:"1"});style(els.closeLights,{opacity:".78"})}
 if(p==="portal"){style(els.closeLit,{opacity:"1"});style(els.closeLights,{opacity:".78"});style(els.portal,{opacity:".7"});els.hole.setAttribute("x",".14");els.hole.setAttribute("y",".32");els.hole.setAttribute("width",".72");els.hole.setAttribute("height",".54")}
}
els.ball.addEventListener("click",play);els.skip.addEventListener("click",complete);els.fallback.addEventListener("click",complete);
els.ball.addEventListener("pointerenter",()=>els.ballWrap.classList.add("is-hover"));els.ball.addEventListener("pointerleave",()=>els.ballWrap.classList.remove("is-hover"));
window.addEventListener("pointermove",(event)=>{
 if(event.pointerType==="touch"||running)return;
 updateFootballLight(event.clientX,event.clientY);
},{passive:true});
els.ball.addEventListener("pointerdown",(event)=>{
 if(event.pointerType==="touch")touchFootballLight(event);
},{passive:true});
document.documentElement.addEventListener("mouseleave",resetFootballLight);
window.addEventListener("blur",resetFootballLight);
if(typeof reducedMotion.addEventListener==="function")reducedMotion.addEventListener("change",resetFootballLight);
const debugMode=new URLSearchParams(location.search).get("introDebug")==="1";
if(debugMode){
 els.debug.hidden=false;
 els.debug.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;if(b.dataset.debug==="replay")replay();if(b.dataset.debug==="pause")paused=!paused;if(b.dataset.phase)showPhase(b.dataset.phase)});
 els.debug.addEventListener("input",e=>{
  if(e.target.dataset.debug==="bounds")root.classList.toggle("fi-show-bounds",e.target.checked);
  const key=e.target.dataset.setting;if(!key)return;const v=+e.target.value;
  const map={ballX:["ball","x"],ballY:["ball","y"],targetX:["distantGoal","x"],targetY:["distantGoal","y"],goalX:["closeGoal","x"],goalY:["closeGoal","y"],goalWidth:["closeGoal","width"],goalHeight:["closeGoal","height"]};
  if(map[key])settings[map[key][0]][map[key][1]]=v;else settings[key]=v;applySettings();
 });
 root.querySelectorAll("[data-setting]").forEach(input=>{const key=input.dataset.setting;const map={ballX:settings.ball.x,ballY:settings.ball.y,targetX:settings.distantGoal.x,targetY:settings.distantGoal.y,goalX:settings.closeGoal.x,goalY:settings.closeGoal.y,goalWidth:settings.closeGoal.width,goalHeight:settings.closeGoal.height,curve:settings.curve,cameraTime:settings.cameraTime||d.cameraPush,maskScale:settings.maskScale};input.value=map[key]});
}
resetVisuals();setPhase("idle");renderFootballLight();
})();
