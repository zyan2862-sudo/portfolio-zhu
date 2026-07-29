(()=>{"use strict";
const root=document.getElementById("stadium-intro"),cfg=window.STADIUM_INTRO_TIMELINE;
if(!root||!cfg)return;
if(cfg.enabled===false){root.hidden=true;return}
const main=document.getElementById("main"),header=document.querySelector(".site-header"),footer=document.querySelector("footer");
const child=root.querySelector(".intro-child"),ballWrap=root.querySelector(".intro-ball-wrap"),ball=root.querySelector(".intro-ball"),shadow=root.querySelector(".intro-ball-shadow");
const ballButton=root.querySelector(".intro-ball-button"),skip=root.querySelector(".intro-skip"),fallback=root.querySelector(".intro-fallback");
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,mobile=matchMedia("(max-width:700px)").matches;
const force=new URLSearchParams(location.search).get("intro")==="1";
let phase="loading",cancelled=false,flightFrame=0,previousFocus=document.activeElement;
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const ease=t=>1-Math.pow(1-t,4);
function setPhase(next){phase=next;root.dataset.phase=next}
function lockPage(on){
  document.body.classList.toggle("intro-locked",on);
  [main,header,footer].forEach(node=>{if(!node)return;if(on){node.setAttribute("inert","");node.setAttribute("aria-hidden","true")}else{node.removeAttribute("inert");node.removeAttribute("aria-hidden")}});
}
function focusables(){return [...root.querySelectorAll("button:not([disabled]):not([hidden])")].filter(el=>getComputedStyle(el).display!=="none")}
function trapFocus(event){
  if(event.key==="Escape"){complete(true);return}
  if(event.key!=="Tab")return;
  const list=focusables(),first=list[0],last=list[list.length-1];
  if(!list.length)return;
  if(event.shiftKey&&document.activeElement===first){last.focus();event.preventDefault()}
  else if(!event.shiftKey&&document.activeElement===last){first.focus();event.preventDefault()}
}
function preload(src){return new Promise(resolve=>{const image=new Image();image.onload=()=>resolve({src,ok:true});image.onerror=()=>resolve({src,ok:false});image.src=src})}
async function preloadAll(){
  const all=Promise.all(cfg.assets.map(preload)),timeout=wait(cfg.maxLoadWait).then(()=>null),result=await Promise.race([all,timeout]);
  if(!result)return{timedOut:true,failed:[]};
  return{timedOut:false,failed:result.filter(x=>!x.ok).map(x=>x.src)};
}
function complete(skipped=false){
  if(cancelled)return;cancelled=true;cancelAnimationFrame(flightFrame);
  sessionStorage.setItem("portfolioIntroSeen","true");
  if(skipped){root.style.transition="opacity .38s ease";root.style.opacity="0"}
  const delay=skipped?400:40;
  setTimeout(()=>{root.hidden=true;lockPage(false);document.removeEventListener("keydown",trapFocus);const h1=main?.querySelector("h1");if(h1){h1.tabIndex=-1;h1.focus({preventScroll:true})}else previousFocus?.focus?.()},delay)
}
async function approach(){
  const timing=reduced?cfg.reduced:(mobile?cfg.mobile:cfg.desktop);
  root.style.setProperty("--approach-time",`${timing.approach}ms`);
  setPhase("stadium");await wait(reduced?30:220);if(cancelled)return;
  setPhase("approaching");await wait(timing.approach+timing.readyDelay);if(cancelled)return;
  setPhase("ready");ballButton.disabled=false;ballButton.focus({preventScroll:true});
}
async function playKick(){
  if(cancelled||phase!=="ready")return;
  ballButton.disabled=true;setPhase("kicking");root.querySelector(".intro-prompt").style.opacity="0";
  for(const frame of cfg.kickFrames){
    child.src=frame.src;
    if(frame.contact)flyBall();
    await wait(reduced?Math.min(65,frame.duration):frame.duration);
    if(cancelled)return;
  }
}
function flyBall(){
  if(cancelled)return;
  setPhase("ballFlight");shadow.style.transition="opacity .16s";shadow.style.opacity="0";
  root.querySelector(".intro-kick-dust").animate([{opacity:0,transform:"translate(-50%,-50%) scale(.4)"},{opacity:.55},{opacity:0,transform:"translate(-50%,-50%) scale(1.8)"}],{duration:420,easing:"ease-out"});
  const start=performance.now(),duration=reduced?360:cfg.ballFlight.duration;
  const scene=root.getBoundingClientRect(),startRect=ballWrap.getBoundingClientRect();
  const sx=startRect.left+startRect.width/2,sy=startRect.top+startRect.height/2;
  const ex=scene.width*cfg.ballFlight.endX,ey=scene.height*cfg.ballFlight.endY;
  const cx=sx+(ex-sx)*cfg.ballFlight.controlX,cy=Math.min(sy,ey)+scene.height*cfg.ballFlight.controlY;
  function tick(now){
    const raw=Math.min(1,(now-start)/duration),t=ease(raw),u=1-t;
    const x=u*u*sx+2*u*t*cx+t*t*ex,y=u*u*sy+2*u*t*cy+t*t*ey;
    const scale=1-(1-cfg.ballFlight.endScale)*t,rotate=cfg.ballFlight.rotations*360*t;
    ballWrap.style.transform=`translate(-50%,-50%) translate3d(${x-sx}px,${y-sy}px,0) scale(${scale})`;
    ball.style.transform=`rotate(${rotate}deg)`;ball.style.filter=`drop-shadow(0 3px ${4+8*t}px #0006) blur(${Math.sin(Math.PI*t)*.65}px)`;
    if(raw<1)flightFrame=requestAnimationFrame(tick);else impact();
  }
  flightFrame=requestAnimationFrame(tick);
}
async function impact(){
  if(cancelled)return;setPhase("netImpact");root.classList.add("net-hit","camera-impact");
  await wait(reduced?70:cfg.net.impact);root.classList.remove("net-hit");root.classList.add("net-release","portal");
  await wait(reduced?100:cfg.net.release);root.classList.remove("net-release");reveal();
}
function reveal(){
  if(cancelled)return;setPhase("revealing");root.style.setProperty("--reveal-time",`${reduced?450:cfg.reveal.duration}ms`);root.classList.add("reveal-active");
  setTimeout(()=>complete(false),reduced?480:cfg.reveal.duration+30);
}
async function init(){
  if(!force&&sessionStorage.getItem("portfolioIntroSeen")==="true"){root.hidden=true;return}
  lockPage(true);document.addEventListener("keydown",trapFocus);skip.focus({preventScroll:true});
  const status=await preloadAll();if(cancelled)return;
  if(status.timedOut||status.failed.length){root.classList.add("asset-failure");console.warn("[StadiumIntro] Some assets failed or timed out:",status.failed);setPhase("ready");fallback.focus();return}
  await approach();
}
skip.addEventListener("click",()=>complete(true));fallback.addEventListener("click",()=>complete(true));ballButton.addEventListener("click",playKick);
document.addEventListener("visibilitychange",()=>{root.classList.toggle("intro-paused",document.hidden)});
init();
})();
