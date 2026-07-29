const D=window.PORTFOLIO;let lang=localStorage.getItem("lang")||"zh";
const $=s=>document.querySelector(s), esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const title=(n,t)=>`<div class="section-title"><span>${String(n).padStart(2,"0")} /</span><h2>${t}</h2></div>`;
const chips=a=>`<div class="chips">${a.map(x=>`<span>${x}</span>`).join("")}</div>`;
const aboutCopy={
  zh:{label:"ABOUT ME",local:"关于我",heading:"体育让我看见，<br>人与世界如何连接。",sub:"Connecting People, Operations and Insights Through Sport.",body:["朱妍，现居东京，法政大学体育健康学研究科体育管理方向硕士研究生。","我关注国际体育赛事、体育活动运营、项目管理与体育消费者研究。曾参与北京2022冬奥会相关项目，并在日本持续积累体育活动运营、地区体育和赛事现场经验。","我的优势在于将项目执行、数据分析和中日英沟通结合起来，在复杂的体育项目中连接参与者、组织和现场。"],view:"查看我的经历",contact:"联系我",location:"东京，日本",languages:"中文 / 日本語 / English",focus:"当前关注"},
  ja:{label:"ABOUT ME",local:"私について",heading:"スポーツを通して、<br>人と世界のつながりを見る。",sub:"Connecting People, Operations and Insights Through Sport.",body:["朱妍。東京在住、法政大学大学院スポーツ健康学研究科でスポーツマネジメントを学ぶ修士課程の学生です。","国際スポーツ大会、イベント運営、プロジェクトマネジメント、スポーツ消費者研究に取り組んでいます。北京2022関連プロジェクトを経験し、日本でも地域スポーツと大会現場で実践を重ねています。","プロジェクト実行、データ分析、中日英のコミュニケーションを組み合わせ、人・組織・現場をつなぐことが私の強みです。"],view:"経験を見る",contact:"お問い合わせ",location:"東京、日本",languages:"中文 / 日本語 / English",focus:"CURRENT FOCUS"},
  en:{label:"ABOUT ME",local:"About",heading:"Sport shows me how<br>people connect with the world.",sub:"Connecting People, Operations and Insights Through Sport.",body:["I am Yan Zhu, a Tokyo-based master’s student in Sport Management at Hosei University.","My work spans international sport events, field operations, project management, and sport consumer research. Beijing 2022 was a formative experience, followed by continued hands-on work in Japanese sport and community settings.","I bring project execution, data analysis, and Chinese–Japanese–English communication together to connect participants, organizations, and the field."],view:"View Experience",contact:"Contact Me",location:"Tokyo, Japan",languages:"中文 / 日本語 / English",focus:"CURRENT FOCUS"}
};
function aboutSection(copy){
  const tags=["International Sports Events","Event Operations","Consumer Research","Multilingual Coordination"];
  return `<div class="about-shell"><div class="about-intro">
    <div class="about-kicker"><span>01 / ${copy.label}</span><small>${copy.local}</small></div>
    <h2>${copy.heading}</h2><p class="about-subtitle">${copy.sub}</p>
    <div class="about-body">${copy.body.map(x=>`<p>${x}</p>`).join("")}</div>
    <div class="about-tags">${tags.map(x=>`<span>${x}</span>`).join("")}</div>
    <div class="about-actions"><a href="#experience">${copy.view}<i>→</i></a><a href="#contact">${copy.contact}<i>↗</i></a></div>
  </div><div class="badge-stage">
    <div class="lanyard" aria-hidden="true"><i></i><i></i></div><div class="badge-clip" aria-hidden="true"><span></span></div>
    <div class="badge-wrap"><div class="badge-card" tabindex="0" role="button" aria-expanded="false" aria-label="${copy.focus}">
      <div class="badge-glare" aria-hidden="true"></div><div class="badge-photo"><img src="images/profile-badge.webp" alt="${D[lang].name} professional portrait"></div>
      <div class="badge-identity"><div><small>SPORT MANAGEMENT</small><h3>${D[lang].name}</h3><b>YAN ZHU</b></div><span class="badge-mark">YZ.</span></div>
      <div class="badge-fields"><p>International Sports Events<br>Event Operations · Consumer Research</p><p><span>${copy.location}</span><span>${copy.languages}</span></p></div>
      <div class="badge-foot"><span>SPORT / 001</span><i class="badge-code" aria-hidden="true"></i></div>
    </div><aside class="badge-more" aria-hidden="true"><button type="button" aria-label="Close">×</button><small>${copy.focus}</small><ul><li>International sports event operations</li><li>Sports consumer behavior</li><li>Cross-cultural project coordination</li><li>Sports tourism research</li></ul></aside></div>
  </div></div>`;
}
function render(){
  const t=D[lang],ids=["about","focus","experience","projects","research","education","skills","contact"],projectLabel={zh:"项目",ja:"プロジェクト",en:"Projects"}[lang];
  document.documentElement.lang=lang==="zh"?"zh-CN":lang;
  const navItems=[...t.nav];navItems.splice(3,0,projectLabel);$("nav").innerHTML=navItems.map((x,i)=>`<a href="#${ids[i]}">${x}</a>`).join("");
  $(".langs").innerHTML=["zh","ja","en"].map(x=>`<button data-lang="${x}" class="${x===lang?"active":""}" aria-pressed="${x===lang}">${x==="zh"?"中":x==="ja"?"日":"EN"}</button>`).join("");
  $(".hero-content").innerHTML=`<p class="hero-name">${t.name}<span> / Yan Zhu</span></p><p class="eyebrow">${t.role}</p><h1>${t.heroTitle}</h1><h3>${t.heroEn}</h3><p>${t.heroBody}</p><div class="actions"><a href="#experience">${t.buttons[0]} →</a><a href="#research">${t.buttons[1]} →</a><a href="#contact">${t.buttons[2]} ✉</a></div>`;
  $("#about").className="section reveal about-premium";
  $("#about").innerHTML=aboutSection(aboutCopy[lang]);
  $("#focus").innerHTML=title(2,t.focusTitle)+`<div class="focus-grid">${t.focus.map(x=>`<article><small>${x[0]}</small><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("")}</div>`;
  const experienceItems=t.exp.filter((_,i)=>i!==2);
  $("#experience").innerHTML=title(2,t.expTitle)+`<div class="experience-route" aria-hidden="true"><svg viewBox="0 0 420 1000" preserveAspectRatio="none"><path d="M95 -30 C245 115 240 265 150 370 C76 458 92 570 208 665 C292 735 280 868 225 1030"/></svg></div><div class="timeline">${experienceItems.map(x=>`<article><time>${x.date}</time><div class="experience-copy"><small>${x.status}</small><h3>${x.title}</h3><h4>${x.role}</h4><p>${x.body}</p>${x.bullets?`<ul>${x.bullets.map(b=>`<li>${b}</li>`).join("")}</ul>`:""}</div></article>`).join("")}</div>`;
  const projects={zh:[["千叶罗德海洋球迷调查","参与千叶罗德海洋主场的球迷相关调查，在真实赛事环境中接触观众并观察球迷体验与现场氛围。具体调查内容与成果将在确认后补充。","images/chiba-lotte-survey-graded.png"],["法政体育节匹克球项目策划与现场运营","围绕法政体育节设计匹克球项目方案，并参与活动当日的资料、设备和现场运营工作。具体职责与成果可继续补充。","images/pickleball-operations.jpg"],["地区体育活动与小学生相扑大会支援","参与选手招集、人员引导、比赛流程和现场动线支持，并从参与者体验角度提出运营改善建议。","images/sumo-venue-graded.png"],["体育现场观察：六大学野球与排球赛事","通过日本高校棒球与排球赛事现场，持续观察场馆运营、观众体验、应援文化和赛事氛围。","images/hosei-baseball-graded.png"]],ja:[["千葉ロッテマリーンズ・ファン調査","千葉ロッテマリーンズのホームゲームにおけるファン関連調査に参加し、実際の観戦環境でファン体験と会場の雰囲気を観察しました。調査内容と成果の詳細は確認後に追加します。","images/chiba-lotte-survey-graded.png"],["法政スポーツフェスティバル・ピックルボール企画・現場運営","企画に加え、当日の資料、備品、現場運営にも参加しました。具体的な役割と成果は今後追記できます。","images/pickleball-operations.jpg"],["地域スポーツ・小学生相撲大会支援","選手招集、誘導、競技進行、動線管理を支援し、参加者体験の視点から運営改善を提案しました。","images/sumo-venue-graded.png"],["スポーツ現場観察：六大学野球・バレーボール","大学野球とバレーボールの現場から、会場運営、観客体験、応援文化、大会の雰囲気を観察しています。","images/hosei-baseball-graded.png"]],en:[["Chiba Lotte Marines Fan Research","Participated in fan-related research at a Chiba Lotte Marines home game, engaging with the live event setting and observing fan experience and stadium atmosphere. Further details will be added after confirmation.","images/chiba-lotte-survey-graded.png"],["Hosei Sports Festival Pickleball: Planning & Field Operations","Contributed to the program concept and to on-site materials, equipment, and event-day operations. Specific responsibilities and outcomes can be expanded later.","images/pickleball-operations.jpg"],["Community Sport & Youth Sumo Event Support","Supported athlete calls, participant guidance, competition flow, and venue movement, while proposing operations improvements from a participant-experience perspective.","images/sumo-venue-graded.png"],["Field Observation: University Baseball & Volleyball","Observing venue operations, spectator experience, supporter culture, and event atmosphere across Japanese university baseball and volleyball.","images/hosei-baseball-graded.png"]]}[lang];
  $("#projects").innerHTML=title(4,projectLabel)+`<div class="project-grid">${projects.map((p,i)=>`<article><figure><img src="${p[2]}" alt="${p[0]}"><span>PROJECT / 0${i+1}</span></figure><div><h3>${p[0]}</h3><p>${p[1]}</p></div></article>`).join("")}</div>`;
  const researchFlow={
    zh:[["研究对象","访日外国雪上运动游客"],["核心风险","语言 / 天气 / 身体 / 财务 / 时间"],["结果","重游意愿"],["方法","问卷调查 + CFA / SEM"]],
    ja:[["研究対象","訪日外国人スノースポーツ観光客"],["中核リスク","言語 / 天候 / 身体 / 財務 / 時間"],["結果","再訪意向"],["方法","質問紙調査 + CFA / SEM"]],
    en:[["Research group","International snow-sport visitors"],["Core risks","Language / weather / physical / financial / time"],["Outcome","Revisit intention"],["Method","Survey + CFA / SEM"]]
  }[lang];
  const researchTags={zh:["体育旅游","感知风险","重游意愿","消费者行为"],ja:["スポーツツーリズム","知覚リスク","再訪意向","消費者行動"],en:["Sport tourism","Perceived risk","Revisit intention","Consumer behavior"]}[lang];
  const researchStatCards={
    zh:[["357","有效数据"],["长野","调查地点"],["中・日・英","问卷语言"],["SPSS, Mplus","统计分析"]],
    ja:[["357","有効データ"],["長野","調査地"],["中・日・英","質問紙言語"],["SPSS, Mplus","統計分析"]],
    en:[["357","Valid responses"],["Nagano","Survey location"],["ZH · JA · EN","Survey languages"],["SPSS, Mplus","Statistical analysis"]]
  }[lang];
  const scene=window.RESEARCH_SCENE;
  $("#research").innerHTML=`<div class="research-bg"><img class="research-dark-frame" src="public/images/research/night-ski-dark.png" alt="从暗场逐步点亮的夜间雪场研究场景"><div class="research-ambient" aria-hidden="true"></div><svg class="research-scene-svg" viewBox="0 0 ${scene.viewBox.width} ${scene.viewBox.height}" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
    <filter id="researchBlurWide" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="34"/></filter>
    <filter id="researchBlurMedium" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="16"/></filter>
    <filter id="researchBlurTight" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="7"/></filter>
    <radialGradient id="researchWarmGlow"><stop offset="0" stop-color="#fffceb" stop-opacity=".96"/><stop offset=".22" stop-color="#ffe5a3" stop-opacity=".62"/><stop offset="1" stop-color="#f4c970" stop-opacity="0"/></radialGradient>
    <radialGradient id="researchMovingGlow"><stop offset="0" stop-color="#fff8d9" stop-opacity=".44"/><stop offset=".42" stop-color="#f7d899" stop-opacity=".19"/><stop offset="1" stop-color="#d9c28a" stop-opacity="0"/></radialGradient>
    <mask id="researchLitReveal" maskUnits="userSpaceOnUse" x="0" y="0" width="${scene.viewBox.width}" height="${scene.viewBox.height}">
      <rect width="${scene.viewBox.width}" height="${scene.viewBox.height}" fill="black"/>
      <path class="research-reveal-wide" pathLength="1" d="${scene.path}" fill="none" stroke="white" stroke-linecap="round"/>
      <path class="research-reveal-core" pathLength="1" d="${scene.path}" fill="none" stroke="white" stroke-linecap="round"/>
      <rect class="research-final-reveal" width="${scene.viewBox.width}" height="${scene.viewBox.height}" fill="white" opacity="0"/>
    </mask>
  </defs>
  <image class="research-lit-frame" href="public/images/research/night-ski-lit-clean.webp" width="${scene.viewBox.width}" height="${scene.viewBox.height}" preserveAspectRatio="xMidYMid slice" mask="url(#researchLitReveal)"/>
  <path id="researchSkiPath" d="${scene.path}" fill="none"/>
  </svg><div class="research-bg-shade"></div><div class="research-grain" aria-hidden="true"></div></div><div class="research-interaction" role="application" aria-label="点击雪道以点亮对应区域" tabindex="0"></div><div class="research-click-ripple" aria-hidden="true"></div><img class="research-pangoo-cursor" src="public/images/research/pangoo-skier.png" alt="" aria-hidden="true">`+title(5,t.researchTitle)+`<div class="research-documentary"><div class="research-copy"><small>${t.researchEn}</small><h3>${t.researchName}</h3><p>${t.researchBody}</p></div><div class="research-flow">${researchFlow.map((x,i)=>`<article><span>0${i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></article>`).join("")}</div><div class="research-stats">${researchStatCards.map((x,i)=>`<article><small>0${i+1}</small><b>${x[0]}</b><span>${x[1]}</span></article>`).join("")}</div><div class="research-tags">${researchTags.map(x=>`<span>${x}</span>`).join("")}</div></div>`;
  $("#education").innerHTML=title(6,t.eduTitle)+`<div class="education">${t.education.map(x=>`<article><time>${x[0]}</time><div><h3>${x[1]}</h3><h4>${x[2]}</h4><p>${x[3]}</p></div></article>`).join("")}</div>`;
  $("#skills").innerHTML=title(7,t.skillsTitle)+`<div class="skills-grid">${t.skills.map(x=>`<article><h3>${x[0]}</h3>${chips(x.slice(1))}</article>`).join("")}</div>`;
  $("#contact").innerHTML=title(8,t.contactTitle)+`<div class="contact-grid"><div><p>${t.contactBody}</p><ul>${t.opportunities.map(x=>`<li>${x}</li>`).join("")}</ul><a class="email" href="mailto:${D.email}">${D.email} ↗</a></div><form><label>${t.form[0]}<input name="name" required></label><label>${t.form[1]}<input name="org"></label><label>${t.form[2]}<input name="email" type="email" required></label><label>${t.form[3]}<input name="subject" required></label><label class="wide">${t.form[4]}<textarea name="message" rows="5" required></textarea></label><button class="wide" type="submit">${t.form[5]} ↗</button></form></div>`;
  $("footer").innerHTML=`<b>YAN ZHU</b><span>${t.footer}</span><span>© 2026</span>`;
  setupResearchInteraction();
  setupInteractiveBadge();
  document.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{lang=b.dataset.lang;localStorage.setItem("lang",lang);render()});
  $("form").onsubmit=e=>{e.preventDefault();const f=new FormData(e.currentTarget);location.href=`mailto:${D.email}?subject=${encodeURIComponent(f.get("subject"))}&body=${encodeURIComponent(`${f.get("message")}\n\n${f.get("name")} · ${f.get("org")}\n${f.get("email")}`)}`};
}
let badgeCleanup=null;
function setupInteractiveBadge(){
  if(badgeCleanup)badgeCleanup();
  const section=$("#about"),stage=section?.querySelector(".badge-stage"),wrap=section?.querySelector(".badge-wrap"),card=section?.querySelector(".badge-card"),more=section?.querySelector(".badge-more"),close=section?.querySelector(".badge-more button");
  if(!stage||!wrap||!card||!more)return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,coarse=matchMedia("(pointer: coarse)").matches;
  let dragging=false,moved=false,startX=0,startY=0,x=0,y=0,raf=0;
  const limits=()=>innerWidth<700?{x:28,y:90}:{x:60,y:180};
  const apply=()=>{const r=limits(),dx=Math.max(-r.x,Math.min(r.x,x)),dy=Math.max(0,Math.min(r.y,y));wrap.style.setProperty("--badge-x",`${dx}px`);wrap.style.setProperty("--badge-y",`${dy}px`);wrap.style.setProperty("--badge-rotate",`${dx/r.x*7}deg`);stage.style.setProperty("--lanyard-x",`${dx*.2}px`);stage.style.setProperty("--lanyard-extra",`${dy*.32}px`);raf=0};
  const schedule=()=>{if(!raf)raf=requestAnimationFrame(apply)};
  const toggle=force=>{const open=force??!section.classList.contains("badge-open");section.classList.toggle("badge-open",open);card.setAttribute("aria-expanded",String(open));more.setAttribute("aria-hidden",String(!open))};
  function down(e){if(e.button!==undefined&&e.button!==0)return;dragging=true;moved=false;startX=e.clientX-x;startY=e.clientY-y;card.setPointerCapture?.(e.pointerId);section.classList.add("badge-dragging")}
  function move(e){
    if(!dragging){if(coarse||reduced)return;const r=card.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;card.style.setProperty("--tilt-x",`${-py*4}deg`);card.style.setProperty("--tilt-y",`${px*4}deg`);return}
    x=e.clientX-startX;y=e.clientY-startY;moved=moved||Math.hypot(x,y)>8;schedule();e.preventDefault();
  }
  function up(e){if(!dragging)return;dragging=false;section.classList.remove("badge-dragging");card.releasePointerCapture?.(e.pointerId);if(!moved)toggle();x=0;y=0;wrap.classList.add("returning");schedule();setTimeout(()=>wrap.classList.remove("returning"),750)}
  const leave=()=>{if(!dragging){card.style.setProperty("--tilt-x","0deg");card.style.setProperty("--tilt-y","0deg")}};
  const key=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle()}if(e.key==="Escape")toggle(false)};
  card.addEventListener("pointerdown",down);card.addEventListener("pointermove",move);card.addEventListener("pointerup",up);card.addEventListener("pointercancel",up);card.addEventListener("pointerleave",leave);card.addEventListener("keydown",key);close?.addEventListener("click",e=>{e.stopPropagation();toggle(false)});
  requestAnimationFrame(()=>section.classList.add("about-entered"));
  badgeCleanup=()=>{cancelAnimationFrame(raf);card.removeEventListener("pointerdown",down);card.removeEventListener("pointermove",move);card.removeEventListener("pointerup",up);card.removeEventListener("pointercancel",up);card.removeEventListener("pointerleave",leave);card.removeEventListener("keydown",key)};
}
let researchInteractionCleanup=null;
function setupResearchInteraction(){
  if(researchInteractionCleanup)researchInteractionCleanup();
  const section=$("#research"),svg=$(".research-scene-svg"),path=$("#researchSkiPath"),wide=$(".research-reveal-wide"),core=$(".research-reveal-core"),full=$(".research-final-reveal"),hit=$(".research-interaction"),cursor=$(".research-pangoo-cursor"),ripple=$(".research-click-ripple");
  if(!section||!svg||!path||!wide||!core||!full||!hit||!cursor)return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,coarse=matchMedia("(pointer: coarse)").matches,clamp=n=>Math.max(0,Math.min(1,n));
  let current=0,target=0,frame=0,inside=false,pointerX=0,pointerY=0,cursorX=0,cursorY=0;
  const length=path.getTotalLength();
  function applyProgress(value){
    const p=clamp(value);
    wide.style.strokeDashoffset=String(1-p);
    core.style.strokeDashoffset=String(1-p);
    full.style.opacity=String(p>.96?(p-.96)/.04:0);
    section.style.setProperty("--research-progress",p);
  }
  function animate(){
    current+= (target-current)*(reduced?.55:.28);
    if(Math.abs(target-current)<.0005)current=target;
    applyProgress(current);
    if(inside&&!coarse){
      cursorX+=(pointerX-cursorX)*(reduced?1:.2);cursorY+=(pointerY-cursorY)*(reduced?1:.2);
      cursor.style.transform=`translate3d(${cursorX}px,${cursorY}px,0) translate(-48%,-58%)`;
    }
    frame=requestAnimationFrame(animate);
  }
  function localPoint(event){
    const point=svg.createSVGPoint();point.x=event.clientX;point.y=event.clientY;
    return point.matrixTransform(svg.getScreenCTM().inverse());
  }
  function nearestProgress(event){
    const p=localPoint(event);let best=0,distance=Infinity;
    for(let i=0;i<=120;i++){const q=path.getPointAtLength(length*i/120),d=(q.x-p.x)**2+(q.y-p.y)**2;if(d<distance){distance=d;best=i/120}}
    return best;
  }
  function pointerMove(event){
    const rect=section.getBoundingClientRect();pointerX=event.clientX-rect.left;pointerY=event.clientY-rect.top;
    if(!inside){cursorX=pointerX;cursorY=pointerY;inside=true;cursor.classList.add("visible")}
    section.style.setProperty("--pointer-x",`${pointerX}px`);section.style.setProperty("--pointer-y",`${pointerY}px`);
    if(event.pointerType!=="touch")target=nearestProgress(event);
  }
  function activate(event){
    if(event.pointerType==="mouse"&&event.button!==0)return;
    pointerMove(event);
    if(event.pointerType==="touch"||coarse)target=nearestProgress(event);
    cursor.classList.remove("clicked");void cursor.offsetWidth;cursor.classList.add("clicked");
    ripple.style.left=`${pointerX}px`;ripple.style.top=`${pointerY}px`;ripple.classList.remove("active");void ripple.offsetWidth;ripple.classList.add("active");
  }
  const leave=()=>{inside=false;cursor.classList.remove("visible")};
  hit.addEventListener("pointermove",pointerMove);hit.addEventListener("pointerdown",activate);hit.addEventListener("pointerleave",leave);
  hit.addEventListener("keydown",event=>{if(event.key==="ArrowDown"||event.key==="ArrowRight"){target=clamp(target+.1);event.preventDefault()}if(event.key==="ArrowUp"||event.key==="ArrowLeft"){target=clamp(target-.1);event.preventDefault()}});
  applyProgress(0);frame=requestAnimationFrame(animate);
  researchInteractionCleanup=()=>{cancelAnimationFrame(frame);hit.removeEventListener("pointermove",pointerMove);hit.removeEventListener("pointerdown",activate);hit.removeEventListener("pointerleave",leave)};
}
render();
$(".theme").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("theme",document.body.classList.contains("light")?"light":"dark")};
if(localStorage.getItem("theme")==="light")document.body.classList.add("light");
$(".menu").onclick=()=>{const open=$(".site-header").classList.toggle("open");$(".menu").setAttribute("aria-expanded",open)};
document.addEventListener("click",e=>{if(e.target.matches("nav a"))$(".site-header").classList.remove("open")});
const reel=document.querySelector(".sport-reel"),reelRows=[...document.querySelectorAll(".sport-reel-row")];let reelTick=false;
function moveReel(){if(!reel)return;const offset=(scrollY-reel.offsetTop+innerHeight)*.22;reelRows.forEach(row=>row.style.transform=`translate3d(${row.dataset.direction==="right"?offset-260:-(offset-260)}px,0,0)`);reelTick=false}
addEventListener("scroll",()=>{if(!reelTick){requestAnimationFrame(moveReel);reelTick=true}},{passive:true});moveReel();
const heroBackgrounds=[...document.querySelectorAll(".hero-cinematic-bg")],heroBackgroundButtons=[...document.querySelectorAll(".hero-scene-switcher button")];let heroBackgroundIndex=0,heroBackgroundLocked=false;
function changeHeroBackground(next){if(heroBackgroundLocked||next===heroBackgroundIndex)return;heroBackgroundLocked=true;heroBackgrounds[heroBackgroundIndex].classList.remove("active");heroBackgroundButtons[heroBackgroundIndex].classList.remove("active");heroBackgroundIndex=next;$(".hero").dataset.heroScene=next;heroBackgrounds[next].classList.add("active");heroBackgroundButtons[next].classList.add("active");setTimeout(()=>heroBackgroundLocked=false,1000)}
heroBackgroundButtons.forEach((button,index)=>button.onclick=()=>changeHeroBackground(index));
if(!matchMedia("(prefers-reduced-motion: reduce)").matches)setInterval(()=>changeHeroBackground((heroBackgroundIndex+1)%heroBackgrounds.length),6000);
const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("seen")),{threshold:.08});document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));
const sectionObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("current",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-30% 0px -60%"});document.querySelectorAll("main section[id]").forEach(s=>sectionObserver.observe(s));
