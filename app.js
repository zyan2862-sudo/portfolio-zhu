const D=window.PORTFOLIO;let lang=localStorage.getItem("lang")||"zh";
const $=s=>document.querySelector(s), esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const title=(n,t)=>`<div class="section-title"><span>${String(n).padStart(2,"0")} /</span><h2>${t}</h2></div>`;
const chips=a=>`<div class="chips">${a.map(x=>`<span>${x}</span>`).join("")}</div>`;
function render(){
  const t=D[lang],ids=["about","focus","experience","research","education","skills","contact"];
  document.documentElement.lang=lang==="zh"?"zh-CN":lang;
  $("nav").innerHTML=t.nav.map((x,i)=>`<a href="#${ids[i]}">${x}</a>`).join("");
  $(".langs").innerHTML=["zh","ja","en"].map(x=>`<button data-lang="${x}" class="${x===lang?"active":""}" aria-pressed="${x===lang}">${x==="zh"?"中":x==="ja"?"日":"EN"}</button>`).join("");
  $(".hero-content").innerHTML=`<p class="live"><i></i>TOKYO · AVAILABLE FOR SPORT PROJECTS</p><p class="eyebrow">${t.role}</p><h1>${t.heroTitle}</h1><h3>${t.heroEn}</h3><p>${t.heroBody}</p>${chips(t.tags)}<div class="actions"><a href="#experience">${t.buttons[0]} ↓</a><a href="#research">${t.buttons[1]} ↘</a><a href="#contact">${t.buttons[2]} ↗</a></div>`;
  $("#about").innerHTML=title(1,t.aboutTitle)+`<div class="about-grid"><p class="lead">${t.aboutLead}</p><div>${t.about.map(x=>`<p>${x}</p>`).join("")}</div></div><div class="stats">${t.stats.map((x,i)=>`<article><b>${x}</b><span>${t.statLabels[i]}</span></article>`).join("")}</div>`;
  $("#focus").innerHTML=title(2,t.focusTitle)+`<div class="focus-grid">${t.focus.map(x=>`<article><small>${x[0]}</small><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join("")}</div>`;
  $("#experience").innerHTML=title(3,t.expTitle)+`<div class="timeline">${t.exp.map(x=>`<article><time>${x.date}</time><div><small>${x.status}</small><h3>${x.title}</h3><h4>${x.role}</h4><p>${x.body}</p>${x.bullets?`<ul>${x.bullets.map(b=>`<li>${b}</li>`).join("")}</ul>`:""}</div></article>`).join("")}</div><blockquote>“${t.principle}”</blockquote>`;
  $("#research").innerHTML=title(4,t.researchTitle)+`<div class="research-head"><div><small>${t.researchEn}</small><h3>${t.researchName}</h3><p>${t.researchBody}</p></div><div class="research-stats">${t.researchStats.map(x=>`<article><b>${x[0]}</b><span>${x[1]}</span></article>`).join("")}</div></div><div class="research-meta"><div><small>FRAMEWORK & METHODS</small>${chips(t.methods)}</div><div><small>TOOLS</small>${chips(t.tools)}</div></div>`;
  $("#education").innerHTML=title(5,t.eduTitle)+`<div class="education">${t.education.map(x=>`<article><time>${x[0]}</time><div><h3>${x[1]}</h3><h4>${x[2]}</h4><p>${x[3]}</p></div></article>`).join("")}</div>`;
  $("#skills").innerHTML=title(6,t.skillsTitle)+`<div class="skills-grid">${t.skills.map(x=>`<article><h3>${x[0]}</h3>${chips(x.slice(1))}</article>`).join("")}</div>`;
  $("#contact").innerHTML=title(7,t.contactTitle)+`<div class="contact-grid"><div><p>${t.contactBody}</p><ul>${t.opportunities.map(x=>`<li>${x}</li>`).join("")}</ul><a class="email" href="mailto:${D.email}">${D.email} ↗</a></div><form><label>${t.form[0]}<input name="name" required></label><label>${t.form[1]}<input name="org"></label><label>${t.form[2]}<input name="email" type="email" required></label><label>${t.form[3]}<input name="subject" required></label><label class="wide">${t.form[4]}<textarea name="message" rows="5" required></textarea></label><button class="wide" type="submit">${t.form[5]} ↗</button></form></div>`;
  $("footer").innerHTML=`<b>YAN ZHU</b><span>${t.footer}</span><span>© 2026</span>`;
  document.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{lang=b.dataset.lang;localStorage.setItem("lang",lang);render()});
  $("form").onsubmit=e=>{e.preventDefault();const f=new FormData(e.currentTarget);location.href=`mailto:${D.email}?subject=${encodeURIComponent(f.get("subject"))}&body=${encodeURIComponent(`${f.get("message")}\n\n${f.get("name")} · ${f.get("org")}\n${f.get("email")}`)}`};
}
render();
$(".theme").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("theme",document.body.classList.contains("light")?"light":"dark")};
if(localStorage.getItem("theme")==="light")document.body.classList.add("light");
$(".menu").onclick=()=>{const open=$(".site-header").classList.toggle("open");$(".menu").setAttribute("aria-expanded",open)};
document.addEventListener("click",e=>{if(e.target.matches("nav a"))$(".site-header").classList.remove("open")});
const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("seen")),{threshold:.08});document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));
