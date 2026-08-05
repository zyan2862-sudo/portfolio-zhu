const D=window.PORTFOLIO;let lang=localStorage.getItem("lang")||"zh";
const $=s=>document.querySelector(s), esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const title=(n,t)=>`<div class="section-title"><span>${String(n).padStart(2,"0")} /</span><h2>${t}</h2></div>`;
const chips=a=>`<div class="chips">${a.map(x=>`<span>${x}</span>`).join("")}</div>`;
const profileFrameworkCopy={
  zh:{
    title:"专业领域・技能",sections:["专业领域","专业技能","语言能力","资格 / 认证"],
    fields:[
      {icon:"◎",title:"国际体育大会",summary:"伙伴对应、相关人员信息管理、多语言协调、项目推进。",detail:"北京2022冬季奥林匹克运动会相关项目经验，以及国际伙伴、组织与利益相关者之间的信息协调。",link:"查看相关经历",href:"#experience"},
      {icon:"⌁",title:"体育运营",summary:"准备、现场实施、引导、竞赛辅助、裁判、计时及活动复盘。",detail:"参与赛事准备、现场执行、人员引导、竞赛支持及活动后的问题整理与复盘。",link:"查看相关经历",href:"#projects"},
      {icon:"⌕",title:"研究・数据分析",summary:"问卷设计、实地调查、数据整理、统计分析及研究报告。",detail:"围绕体育消费者、雪上运动旅游与感知风险，开展问卷调查、数据分析和研究成果汇报。",link:"查看相关经历",href:"#research"},
      {icon:"◌",title:"跨文化沟通",summary:"运用中文、日语和英语，在不同文化环境中进行协调与沟通。",detail:"利用中国与日本的学习、工作和生活经验，连接不同语言、文化与组织背景的参与者。",link:"查看相关经历",href:"#contact"}
    ],
    tools:[["W","Word","研究报告、正式文档和资料整理。"],["X","Excel","数据整理、表格制作及项目进度管理。"],["P","PPT","研究发表、提案资料及项目汇报。"],["◉","SPSS","问卷数据整理与统计分析。"],["M+","Mplus","验证性因子分析及结构方程模型分析。"],["◇","Figma","网页结构、视觉排版及原型设计。"],["✦","AI Tools","资料整理、内容辅助、设计探索与工作效率提升。"]],
    toolPrompt:"选择工具，查看实际用途。",
    languages:[["中文","母语","母语沟通、资料撰写、跨文化协调及中国市场相关信息整理。"],["日语","商务及学术沟通","大学院课程、研究发表、赛事现场及利益相关者沟通。"],["英语","工作沟通与文献阅读","学术文献阅读、国际赛事信息整理及基础工作沟通。"]],
    certificate:{name:"国际助理项目经理",level:"IPMP-D 级合格标准",detail:"项目管理基础知识、项目计划、组织协调及实施支持能力。",keywords:["项目计划","组织协调","进度管理","执行支持"]},
    actions:[["查看我的经历","VIEW EXPERIENCE","#experience"],["联系我","CONTACT ME","#contact"]]
  },
  ja:{
    title:"専門領域・スキル",sections:["専門領域","専門スキル","語学力","資格 / 認証"],
    fields:[
      {icon:"◎",title:"国際スポーツ大会",summary:"パートナー対応、関係者情報管理、多言語調整、プロジェクト推進。",detail:"北京2022冬季オリンピック関連プロジェクトで、国際パートナー、組織、ステークホルダー間の情報調整を経験しました。",link:"関連経験を見る",href:"#experience"},
      {icon:"⌁",title:"スポーツ運営",summary:"準備、現場実施、誘導、競技補助、審判・計時、振り返り。",detail:"大会準備、現場実行、参加者誘導、競技支援、終了後の課題整理と振り返りに携わっています。",link:"関連経験を見る",href:"#projects"},
      {icon:"⌕",title:"研究・データ分析",summary:"質問紙設計、現地調査、データ整備、統計分析、研究報告。",detail:"スポーツ消費者、スノースポーツ観光、知覚リスクをテーマに調査・分析・成果発表を行っています。",link:"関連経験を見る",href:"#research"},
      {icon:"◌",title:"異文化コミュニケーション",summary:"中国語・日本語・英語を用い、異文化環境で調整と対話を行います。",detail:"中国と日本での学習・仕事・生活経験を生かし、異なる言語、文化、組織背景を持つ人々をつなぎます。",link:"関連経験を見る",href:"#contact"}
    ],
    tools:[["W","Word","研究報告、正式文書、資料整理。"],["X","Excel","データ整理、表作成、進行管理。"],["P","PPT","研究発表、提案、プロジェクト報告。"],["◉","SPSS","質問紙データの整理と統計分析。"],["M+","Mplus","確認的因子分析と構造方程式モデリング。"],["◇","Figma","Web構成、ビジュアルレイアウト、プロトタイプ。"],["✦","AI Tools","情報整理、制作支援、デザイン探索、業務効率化。"]],
    toolPrompt:"ツールを選択して用途を表示。",
    languages:[["中国語","母語","母語での対話、文書作成、異文化調整、中国市場情報の整理。"],["日本語","ビジネス・学術コミュニケーション","大学院授業、研究発表、大会現場、ステークホルダー対応。"],["英語","業務コミュニケーション・文献読解","学術文献、国際大会情報、基本的な業務コミュニケーション。"]],
    certificate:{name:"国際アシスタント・プロジェクトマネジャー",level:"IPMP-D レベル合格基準",detail:"プロジェクト管理の基礎、計画、組織調整、実施支援能力。",keywords:["計画","組織調整","進捗管理","実施支援"]},
    actions:[["経験を見る","VIEW EXPERIENCE","#experience"],["お問い合わせ","CONTACT ME","#contact"]]
  },
  en:{
    title:"Professional Fields & Skills",sections:["Professional Fields","Tools","Languages","Qualification / Certification"],
    fields:[
      {icon:"◎",title:"International Sport Events",summary:"Partner liaison, personnel information, multilingual coordination, and project delivery.",detail:"Experience related to Beijing 2022, coordinating information among international partners, organizations, and stakeholders.",link:"View related experience",href:"#experience"},
      {icon:"⌁",title:"Sport Operations",summary:"Preparation, field delivery, guidance, competition support, officiating, timing, and review.",detail:"Hands-on work across event preparation, field execution, participant guidance, competition support, and post-event review.",link:"View related experience",href:"#projects"},
      {icon:"⌕",title:"Research & Data Analysis",summary:"Questionnaire design, fieldwork, data organization, statistical analysis, and reporting.",detail:"Survey research and analysis on sport consumers, snow-sport tourism, perceived risk, and research communication.",link:"View related experience",href:"#research"},
      {icon:"◌",title:"Cross-cultural Communication",summary:"Coordination across cultural settings in Chinese, Japanese, and English.",detail:"Connecting participants across languages, cultures, and organizational contexts through study, work, and life in China and Japan.",link:"View related experience",href:"#contact"}
    ],
    tools:[["W","Word","Research reports, formal documents, and information organization."],["X","Excel","Data organization, tables, and project tracking."],["P","PPT","Research presentations, proposals, and project reporting."],["◉","SPSS","Survey data preparation and statistical analysis."],["M+","Mplus","Confirmatory factor analysis and structural equation modeling."],["◇","Figma","Web structure, visual layout, and prototyping."],["✦","AI Tools","Information organization, content support, design exploration, and productivity."]],
    toolPrompt:"Select a tool to see how I use it.",
    languages:[["Chinese","Native","Native communication, writing, cross-cultural coordination, and China-market information."],["Japanese","Business and academic communication","Graduate study, research presentations, event operations, and stakeholder communication."],["English","Work communication and literature review","Academic reading, international event information, and essential workplace communication."]],
    certificate:{name:"International Assistant Project Manager",level:"IPMP-D Qualification Standard",detail:"Foundations in project management, project planning, organizational coordination, and implementation support.",keywords:["Project planning","Coordination","Progress management","Delivery support"]},
    actions:[["View Experience","VIEW EXPERIENCE","#experience"],["Contact Me","CONTACT ME","#contact"]]
  }
};
function profileFrameworkMarkup(copy,ui){
  const active=ui.cards[0],toolIcons={Word:"W",Excel:"X",PowerPoint:"P",SPSS:"Σ",Mplus:"M", "AI Tools":"✦"},languageMarks=["ZH","JA","EN"],allTools=copy.tools.flatMap(group=>group.items);
  const certificate=profileFrameworkCopy[lang].certificate,qualificationLabel=profileFrameworkCopy[lang].sections[3];
  const loadout=copy.loadoutUi||{
    zh:{system:"系统装备库",summary:"语言模块 // 工具模块",online:"状态：在线",languages:"语言模块",languageStatus:"语言 // 03 已启用",tools:"工具"},
    ja:{system:"システム装備",summary:"言語モジュール // ツールモジュール",online:"ステータス：オンライン",languages:"言語モジュール",languageStatus:"言語 // 03 稼働中",tools:"ツール"},
    en:{system:"SYSTEM LOADOUT",summary:"LANGUAGE MODULES // TOOL MODULES",online:"STATUS: ONLINE",languages:"LANGUAGE MODULES",languageStatus:"LNG // 03 ACTIVE",tools:"TOOLS"}
  }[lang];
  const languageCodes=["CHINESE // NATIVE","JAPANESE // BUSINESS","ENGLISH // BUSINESS"];
  const languageStates=["NATIVE","BUSINESS","BUSINESS"];
  return `<div class="skills-section-index" aria-label="Section 05">05 /</div><div class="skills-ui-top"><span><i></i>${ui.portfolio}</span><b>••• <i></i> ${ui.section} <i></i> •••</b><span>${ui.identity}<em>05</em></span></div>
  <div class="skills-ui-title"><h2>${ui.title}</h2><p>${ui.subtitle}</p><i></i></div>
  <div class="sport-hifi-stage">
    <svg class="sport-interaction-lines" viewBox="0 0 1672 941" preserveAspectRatio="none" aria-hidden="true">
      <path data-line-index="0" d="M532 488 L704 495"></path>
      <path data-line-index="1" d="M835 209 L835 390"></path>
      <path data-line-index="2" d="M1137 488 L966 495"></path>
      <path data-line-index="3" d="M629 759 L742 648"></path>
      <path data-line-index="4" d="M1037 759 L930 648"></path>
      <path class="sport-card-line" data-card-line-index="0" d="M500 430 L500 468 L532 488"></path>
      <path class="sport-card-line" data-card-line-index="1" d="M835 209 L880 183 L920 183"></path>
      <path class="sport-card-line" data-card-line-index="2" d="M1137 488 L1170 488 L1187 466"></path>
      <path class="sport-card-line" data-card-line-index="3" d="M568 690 L568 730 L629 759"></path>
      <path class="sport-card-line" data-card-line-index="4" d="M1037 759 L1080 730 L1103 730"></path>
      <circle class="sport-card-junction" data-card-junction-index="0" cx="500" cy="468" r="7"></circle>
      <circle class="sport-card-junction" data-card-junction-index="1" cx="880" cy="183" r="7"></circle>
      <circle class="sport-card-junction" data-card-junction-index="2" cx="1170" cy="488" r="7"></circle>
      <circle class="sport-card-junction" data-card-junction-index="3" cx="568" cy="730" r="7"></circle>
      <circle class="sport-card-junction" data-card-junction-index="4" cx="1080" cy="730" r="7"></circle>
    </svg>
    <div class="sport-overlay-center" aria-live="polite"><span></span></div>
    <button type="button" class="sport-core-hotspot" aria-label="SPORT core"></button>
    <div class="sport-orbit" role="group" aria-label="SPORT ${copy.centerLabel}"><span class="sport-orbit-ring" aria-hidden="true"></span><span class="sport-orbit-layer sport-outer-orbit" aria-hidden="true"></span><span class="sport-orbit-layer sport-middle-dashed-orbit" aria-hidden="true"></span><span class="sport-orbit-layer sport-inner-scan-orbit" aria-hidden="true"></span><span class="sport-orbit-path" aria-hidden="true"></span>
      ${copy.keywords.map((item,index)=>`<button type="button" class="sport-letter" data-key="${item.word.toLowerCase()}" data-sport-index="${index}" aria-label="${item.letter} — ${item.word}" aria-pressed="false"><b>${item.letter}<em class="sport-letter-ripples" aria-hidden="true"><i></i><i></i></em></b></button>`).join("")}
      <div class="sport-center" aria-live="polite"><strong>SPORT</strong><small>FIVE QUALITIES<br>THAT SHAPE WHO I AM.</small><p></p></div>
    </div>
    ${copy.keywords.map((item,index)=>`<article class="sport-detail-overlay sport-info-card" data-key="${item.word.toLowerCase()}" aria-live="polite">
      <i class="sport-info-card__icon" aria-hidden="true">${ui.cards[index][0]}</i>
      <div class="sport-info-card__content"><h3>${item.word}</h3><p class="sport-info-card__subtitle">${ui.cards[index][2]}</p><span class="sport-info-card__divider"></span><p class="sport-info-card__description">${item.description}</p></div>
      <div class="sport-info-card__hud-lines" aria-hidden="true"></div>
    </article>`).join("")}
    <p class="sport-hover-note">⌾ &nbsp; ${ui.hover}</p>
  </div>
  <div class="sport-support skills-loadout">
    <header class="loadout-statusbar"><span>${loadout.system}</span><b>${loadout.summary}</b><em>${loadout.online}</em></header>
    <section class="sport-languages">
      <div class="loadout-section-title"><p class="sport-support-title">◎ &nbsp; ${loadout.languages}</p><small>${loadout.languageStatus}</small></div>
      <div class="language-module-grid">${copy.languages.map((item,index)=>`<article class="language-module">
        <small class="module-id">L-0${index+1}</small><i class="language-flag">${languageMarks[index]}</i>
        <span class="language-copy"><strong>${item[0]}</strong><small>${item[1]}</small><em>${languageCodes[index]}</em></span>
        <b class="module-state">${languageStates[index]}</b><i class="module-light" aria-hidden="true"></i>
      </article>`).join("")}</div>
    </section>
    <section class="sport-tools">
      <div class="loadout-section-title"><p class="sport-support-title">⌘ &nbsp; ${loadout.tools}</p></div>
      <div class="tool-module-grid">${allTools.map((item,index)=>`<article class="tool-module">
        <small class="module-id">M-0${index+1}</small><b class="tool-module-icon">${toolIcons[item]||item[0]}</b>
        <span class="tool-module-copy"><strong>${item}</strong></span>
        <i class="module-light" aria-hidden="true"></i>
      </article>`).join("")}</div>
      <div class="loadout-section-title qualification-section-title"><p class="sport-support-title">◇ &nbsp; ${qualificationLabel}</p></div>
      <article class="qualification-module">
        <span class="qualification-module__code">IPMP // D</span>
        <div><small>${qualificationLabel}</small><strong>${certificate.name}</strong><em>${certificate.level}</em></div>
        <p>${certificate.detail}</p>
        <i aria-hidden="true">D</i>
      </article>
    </section>
  </div>`;
}
let profileFrameworkCleanup=null;
function setupProfileFramework(copy,ui){
  if(profileFrameworkCleanup)profileFrameworkCleanup();
  const section=$("#profile-framework"),stage=section.querySelector(".sport-hifi-stage"),buttons=[...section.querySelectorAll(".sport-letter")],center=section.querySelector(".sport-center"),orbit=section.querySelector(".sport-orbit"),details=[...section.querySelectorAll(".sport-detail-overlay")],lines=[...section.querySelectorAll(".sport-interaction-lines path:not(.sport-card-line)")],cardLines=[...section.querySelectorAll(".sport-card-line")],cardJunctions=[...section.querySelectorAll(".sport-card-junction")],overlayCenter=section.querySelector(".sport-overlay-center span"),core=section.querySelector(".sport-core-hotspot");
  const keys=["spirit","passion","optimism","research","transcultural"];
  const cardPositions=[
    {left:"1%",top:"30%"},
    {left:"55%",top:"3%"},
    {left:"73%",top:"36%"},
    {left:"1%",top:"66%"},
    {left:"73%",top:"66%"}
  ];
  let activeKey=null,previewKey=null,timer=0,pointerRaf=0,nodeCenters=[];
  const select=(index,temporary=false)=>{
    const angles=[180,-90,0,135,45];
    const nextKey=index===null?null:keys[index];
    if(temporary)previewKey=nextKey;else{activeKey=nextKey;previewKey=null}
    const shownKey=previewKey||activeKey,shownIndex=keys.indexOf(shownKey);
    buttons.forEach((button,i)=>{button.classList.toggle("active",i===shownIndex);button.classList.toggle("dimmed",shownIndex>=0&&i!==shownIndex);button.setAttribute("aria-pressed",String(keys[i]===activeKey))});
    lines.forEach((line,i)=>line.classList.toggle("active",i===shownIndex));
    cardLines.forEach((line,i)=>line.classList.toggle("active",i===shownIndex));
    cardJunctions.forEach((node,i)=>node.classList.toggle("active",i===shownIndex));
    orbit.classList.toggle("has-active",shownIndex>=0);
    section.dataset.activeKey=shownKey||"";
    if(shownIndex>=0)orbit.style.setProperty("--sport-active-angle",`${angles[shownIndex]}deg`);
    clearTimeout(timer);
    if(shownIndex<0){
      overlayCenter.textContent="";
      center.querySelector("p").textContent="";
      details.forEach(card=>card.classList.remove("is-visible","changing"));
      return;
    }
    const item=copy.keywords[shownIndex];
    center.querySelector("p").textContent=item.word;
    overlayCenter.textContent=item.word;
    details.forEach((card,index)=>{
      card.classList.remove("changing");
      card.classList.toggle("is-visible",index===shownIndex);
      if(index===shownIndex&&!window.matchMedia("(max-width: 767px)").matches){
        card.style.left=cardPositions[index].left;
        card.style.top=cardPositions[index].top;
      }
    });
  };
  buttons.forEach((button,index)=>{
    button.addEventListener("pointerenter",()=>select(index,true));
    button.addEventListener("focus",()=>select(index,true));
    button.addEventListener("blur",()=>select(null,true));
    button.addEventListener("click",()=>select(index));
  });
  core.addEventListener("pointerenter",()=>section.classList.add("core-preview"));
  core.addEventListener("pointerleave",()=>section.classList.remove("core-preview"));
  const updateNodeCenters=()=>{nodeCenters=buttons.map(button=>{const rect=button.getBoundingClientRect();return{x:rect.left+rect.width/2,y:rect.top+rect.height/2}})};
  const onPointerMove=event=>{
    if(window.matchMedia("(max-width: 767px), (hover: none)").matches)return;
    if(pointerRaf)return;
    const x=event.clientX,y=event.clientY;
    pointerRaf=requestAnimationFrame(()=>{
      pointerRaf=0;
      let closest=-1,min=Infinity;
      nodeCenters.forEach((point,index)=>{const distance=Math.hypot(x-point.x,y-point.y);if(distance<min){min=distance;closest=index}});
      if(min<=145){
        if(previewKey!==keys[closest])select(closest,true);
      }else if(previewKey!==null)select(null,true);
    });
  };
  const onStageLeave=()=>select(null,true);
  updateNodeCenters();
  window.addEventListener("resize",updateNodeCenters);
  stage.addEventListener("pointermove",onPointerMove);
  stage.addEventListener("pointerleave",onStageLeave);
  const observer=new IntersectionObserver(([entry])=>section.classList.toggle("is-paused",!entry.isIntersecting),{threshold:.08});
  observer.observe(section);
  requestAnimationFrame(()=>section.classList.add("profile-ready"));
  select(null);
  profileFrameworkCleanup=()=>{clearTimeout(timer);document.body.classList.remove("sport-portal-lock");if(pointerRaf)cancelAnimationFrame(pointerRaf);window.removeEventListener("resize",updateNodeCenters);stage.removeEventListener("pointermove",onPointerMove);stage.removeEventListener("pointerleave",onStageLeave);observer.disconnect()};
}
const aboutCopy={
  zh:{label:"ABOUT ME",local:"关于我",heading:"体育让我看见<br>人与世界如何连接",sub:"Connecting People, Operations and Insights Through Sport.",body:["朱妍，现居东京，法政大学体育健康学研究科体育管理方向硕士研究生。","我关注国际体育赛事、体育活动运营、项目管理与体育消费者研究。曾参与北京2022冬奥会相关项目，并在日本持续积累体育活动运营、地区体育和赛事现场经验。","我的优势在于将项目执行、数据分析和中日英沟通结合起来，在复杂的体育项目中连接参与者、组织和现场。"],view:"查看我的经历",contact:"联系我",location:"东京，日本",languages:"中文 / 日本語 / English",focus:"当前关注",badgeRole:"体育管理专业研究生"},
  ja:{label:"ABOUT ME",local:"私について",heading:"スポーツを通して、<br>人と世界のつながりを見る。",sub:"Connecting People, Operations and Insights Through Sport.",body:["朱妍。東京在住、法政大学大学院スポーツ健康学研究科でスポーツマネジメントを学ぶ修士課程の学生です。","国際スポーツ大会、イベント運営、プロジェクトマネジメント、スポーツ消費者研究に取り組んでいます。北京2022関連プロジェクトを経験し、日本でも地域スポーツと大会現場で実践を重ねています。","プロジェクト実行、データ分析、中日英のコミュニケーションを組み合わせ、人・組織・現場をつなぐことが私の強みです。"],view:"経験を見る",contact:"お問い合わせ",location:"東京、日本",languages:"中文 / 日本語 / English",focus:"CURRENT FOCUS",badgeRole:"スポーツマネジメント専攻 大学院生"},
  en:{label:"ABOUT ME",local:"About",heading:"Sport shows me how<br>people connect with the world.",sub:"Connecting People, Operations and Insights Through Sport.",body:["I am Yan Zhu, a Tokyo-based master’s student in Sport Management at Hosei University.","My work spans international sport events, field operations, project management, and sport consumer research. Beijing 2022 was a formative experience, followed by continued hands-on work in Japanese sport and community settings.","I bring project execution, data analysis, and Chinese–Japanese–English communication together to connect participants, organizations, and the field."],view:"View Experience",contact:"Contact Me",location:"Tokyo, Japan",languages:"中文 / 日本語 / English",focus:"CURRENT FOCUS",badgeRole:"Graduate Student in Sport Management"}
};
function aboutSection(copy){
  const tags=["International Sports Events","Event Operations","Consumer Research","Multilingual Coordination"];
  return `<div id="aboutSplashCursor" class="about-splash-cursor" aria-hidden="true"></div><div class="about-shell"><div class="about-intro">
    <div class="about-kicker"><span>01 / ${copy.label}</span><small>${copy.local}</small></div>
    <h2>${copy.heading}</h2><p class="about-subtitle">${copy.sub}</p>
    <div class="about-body">${copy.body.map(x=>`<p>${x}</p>`).join("")}</div>
    <div class="about-tags">${tags.map(x=>`<span>${x}</span>`).join("")}</div>
    <div class="about-actions"><a href="#experience">${copy.view}<i>→</i></a><a href="#contact">${copy.contact}<i>↗</i></a></div>
  </div><div class="badge-stage">
    <div class="lanyard" aria-hidden="true"><i></i><i></i></div><div class="badge-clip" aria-hidden="true"><span></span></div>
    <div class="badge-wrap"><div class="badge-card" tabindex="0" role="button" aria-pressed="false" aria-label="${copy.focus}">
      <div class="badge-face badge-front"><div class="badge-glare" aria-hidden="true"></div><div class="badge-photo"><img src="images/profile-badge.webp" alt="${D[lang].name} professional portrait"></div>
        <div class="badge-minimal-info">
          <h3>${D[lang].name}</h3>
          <div class="badge-school"><strong>${lang==="en"?"HOSEI UNIVERSITY":"法政大学"}</strong><span>${copy.badgeRole}</span></div>
          <div class="badge-base"><span>BASE / ${copy.location}</span><span>${copy.languages}</span></div>
        </div>
      </div>
      <div class="badge-face badge-back" aria-hidden="true"><img src="images/about-badge-cyber-mascot-cutout.png" alt="" draggable="false"><span aria-hidden="true">YZ / SPORT</span></div>
    </div><aside class="badge-more badge-more-hidden" aria-hidden="true"><button type="button" aria-label="Close">×</button></aside></div>
  </div></div>`;
}
function projectCategory(project){
  return project.category||"PROJECT";
}
function projectCard(project,ui,index){
  const number=project.number||String(index+1).padStart(2,"0"),category=projectCategory(project);
  return `<article class="cyber-project-card" data-category="${category}" data-project-id="${project.id}" style="--card-index:${index}">
    <span class="cyber-project-card__selection-fx" aria-hidden="true"><i></i><i></i><i></i><i></i><b>PROJECT SELECTED</b></span>
    <div class="cyber-project-card__inner" id="project-card-${project.id}">
      <section class="cyber-project-card__face cyber-project-card__front" tabindex="0" role="button" aria-label="${project.title}，${ui.flip}" aria-expanded="false" aria-controls="project-back-${project.id}">
        <figure><img src="${project.image}" alt="${project.alt}" loading="lazy"></figure>
        <span class="cyber-project-card__number">${number}</span>
        <span class="cyber-project-card__category">${category}</span>
        <div class="cyber-project-card__front-copy"><h3>${project.title}</h3><time>${project.date}</time><b><i>«</i> ${ui.flip} <i>»</i></b></div>
      </section>
      <section class="cyber-project-card__face cyber-project-card__back" id="project-back-${project.id}" aria-hidden="true">
        <button class="cyber-project-card__close" type="button" aria-label="${ui.back}">${ui.back}</button>
        <header><small>PROJECT ${number}</small><h3>${project.title}</h3></header>
        <dl>
          <div><dt>${ui.role}</dt><dd>${project.role}</dd></div>
          <div><dt>${ui.mission}</dt><dd>${project.mission}</dd></div>
          <div><dt>${ui.actions}</dt><dd><ul>${project.actions.map(item=>`<li>${item}</li>`).join("")}</ul></dd></div>
        </dl>
      </section>
    </div>
  </article>`;
}
let projectExplorerCleanup=null;
function setupProjectExplorer(t){
  if(projectExplorerCleanup)projectExplorerCleanup();
  const root=$("#projects .cyber-projects"),deck=root?.querySelector("[data-project-deck]"),cards=[...root?.querySelectorAll(".cyber-project-card")||[]],dots=[...root?.querySelectorAll("[data-project-dot]")||[]];
  if(!root||!deck)return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,coarse=matchMedia("(pointer: coarse)").matches;
  const total=cards.length;
  let activeIndex=Math.min(2,total-1),flippedCardId=null,isDragging=false,isSwitching=false,ignoreClickUntil=0,wheelLocked=false,transitionTimer=0,wheelTimer=0,selectionTimer=0;
  const circularOffset=(index,current)=>{
    let offset=index-current;
    if(offset>total/2)offset-=total;
    if(offset<-total/2)offset+=total;
    return offset
  };
  const cardPose=offset=>{
    const distance=Math.abs(offset),side=Math.sign(offset);
    if(distance===0)return{x:"0%",y:"-16px",scale:1.43,rotate:"0deg",opacity:1,z:10};
    if(distance===1)return{x:`${side*98}%`,y:"8px",scale:1.092,rotate:`${side*-6}deg`,opacity:.74,z:6};
    if(distance===2)return{x:`${side*166}%`,y:"22px",scale:.888,rotate:`${side*-10}deg`,opacity:.36,z:3};
    return{x:`${side*192}%`,y:"30px",scale:.768,rotate:`${side*-13}deg`,opacity:0,z:0}
  };
  const paintLayers=()=>{
    cards.forEach((card,index)=>{
      const offset=circularOffset(index,activeIndex),pose=cardPose(offset),distance=Math.abs(offset);
      card.dataset.layer=distance===0?"center":distance===1?"near":distance===2?"outer":"hidden";
      card.dataset.side=offset<0?"left":offset>0?"right":"center";
      card.classList.toggle("is-center",offset===0);
      card.style.setProperty("--circular-offset",offset);
      card.style.setProperty("--card-x",pose.x);
      card.style.setProperty("--card-y",pose.y);
      card.style.setProperty("--card-scale",pose.scale);
      card.style.setProperty("--card-rotate",pose.rotate);
      card.style.setProperty("--card-opacity",pose.opacity);
      card.style.setProperty("--card-z",pose.z);
      card.setAttribute("aria-hidden",distance>2?"true":"false");
      card.querySelector(".cyber-project-card__front").tabIndex=distance>2?-1:0;
      card.classList.toggle("is-flipped",card.dataset.projectId===flippedCardId)
    });
    dots.forEach((dot,index)=>{
      dot.classList.toggle("is-current",index===activeIndex);
      dot.setAttribute("aria-current",index===activeIndex?"true":"false");
    });
    root.style.setProperty("--active-index",activeIndex);
  };
  const closeFlipped=()=>{
    if(!flippedCardId)return;
    const card=cards.find(item=>item.dataset.projectId===flippedCardId);
    if(!card){flippedCardId=null;root.classList.remove("has-active-card");return}
    card.querySelector(".cyber-project-card__inner").classList.remove("is-flipped");
    card.classList.remove("is-active","is-flipped");
    card.querySelector(".cyber-project-card__front").setAttribute("aria-expanded","false");
    card.querySelector(".cyber-project-card__back").setAttribute("aria-hidden","true");
    flippedCardId=null;
    root.classList.remove("has-active-card")
  };
  const pulseSelection=()=>{
    clearTimeout(selectionTimer);
    root.classList.remove("selection-pulse");
    cards.forEach(card=>card.classList.remove("is-selection-lock"));
    void root.offsetWidth;
    root.classList.add("selection-pulse");
    cards[activeIndex]?.classList.add("is-selection-lock");
    selectionTimer=setTimeout(()=>{
      root.classList.remove("selection-pulse");
      cards[activeIndex]?.classList.remove("is-selection-lock")
    },reduced?80:940)
  };
  const selectCard=index=>{
    if(!total||isSwitching)return;
    const next=(index%total+total)%total;
    if(next===activeIndex)return;
    clearTimeout(transitionTimer);
    isSwitching=true;
    root.classList.add("is-switching");
    const wasFlipped=Boolean(flippedCardId);
    closeFlipped();
    const moveToCenter=()=>{
      activeIndex=next;
      paintLayers();
      transitionTimer=setTimeout(()=>{isSwitching=false;root.classList.remove("is-switching");pulseSelection()},reduced?80:620)
    };
    if(wasFlipped&&!reduced)requestAnimationFrame(()=>requestAnimationFrame(moveToCenter));
    else moveToCenter()
  };
  const open=card=>{
    if(performance.now()<ignoreClickUntil)return;
    const index=cards.indexOf(card);
    if(index!==activeIndex){selectCard(index);return}
    if(isSwitching||isDragging)return;
    const inner=card.querySelector(".cyber-project-card__inner"),front=card.querySelector(".cyber-project-card__front"),back=card.querySelector(".cyber-project-card__back");
    if(flippedCardId===card.dataset.projectId){closeFlipped();return}
    closeFlipped();
    flippedCardId=card.dataset.projectId;
    inner.classList.add("is-flipped");card.classList.add("is-active","is-flipped");root.classList.add("has-active-card");front.setAttribute("aria-expanded","true");back.setAttribute("aria-hidden","false")
  };
  cards.forEach(card=>{
    const front=card.querySelector(".cyber-project-card__front"),back=card.querySelector(".cyber-project-card__back");
    front.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();open(card)}});
    card.querySelector(".cyber-project-card__close").addEventListener("click",event=>{event.stopPropagation();closeFlipped();front.focus()});
    back.addEventListener("click",event=>{if(!event.target.closest("button")){closeFlipped();front.focus()}});
    if(!coarse&&!reduced){
      front.addEventListener("pointermove",event=>{
        if(cards.indexOf(card)!==activeIndex||flippedCardId||isDragging)return;
        const box=card.getBoundingClientRect(),x=(event.clientX-box.left)/box.width-.5,y=(event.clientY-box.top)/box.height-.5;
        card.style.setProperty("--tilt-x",`${(-y*6).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y",`${(x*6).toFixed(2)}deg`);
        card.style.setProperty("--card-glow-x",`${((x+.5)*100).toFixed(1)}%`);
        card.style.setProperty("--card-glow-y",`${((y+.5)*100).toFixed(1)}%`);
      });
      front.addEventListener("pointerleave",()=>{
        card.style.setProperty("--tilt-x","0deg");
        card.style.setProperty("--tilt-y","0deg");
        card.style.setProperty("--card-glow-x","50%");
        card.style.setProperty("--card-glow-y","40%")
      });
    }
  });
  deck.addEventListener("click",event=>{
    if(event.target.closest(".cyber-project-card__back"))return;
    const card=event.target.closest(".cyber-project-card");
    if(card&&deck.contains(card))open(card)
  });
  let pointerDown=false,dragStartX=0,dragStartY=0,dragDistance=0,horizontalDrag=false;
  deck.addEventListener("pointerdown",event=>{
    if(event.button!==undefined&&event.button!==0)return;
    pointerDown=true;horizontalDrag=false;dragDistance=0;dragStartX=event.clientX;dragStartY=event.clientY
  });
  deck.addEventListener("pointermove",event=>{
    if(!pointerDown)return;
    const dx=event.clientX-dragStartX,dy=event.clientY-dragStartY;
    dragDistance=dx;
    if(!horizontalDrag&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.15){
      horizontalDrag=true;
      deck.setPointerCapture?.(event.pointerId)
    }
    if(horizontalDrag){
      isDragging=true;
      deck.classList.add("is-dragging");
      deck.style.setProperty("--drag-x",`${Math.max(-180,Math.min(180,dx*.62))}px`);
      event.preventDefault()
    }
  });
  const stopDrag=event=>{
    if(!pointerDown)return;
    pointerDown=false;
    if(deck.hasPointerCapture?.(event.pointerId))deck.releasePointerCapture(event.pointerId);
    deck.classList.remove("is-dragging");
    deck.style.setProperty("--drag-x","0px");
    if(horizontalDrag){
      ignoreClickUntil=performance.now()+320;
      if(Math.abs(dragDistance)>=60){
        const cardStep=Math.max(90,deck.clientWidth*.18),steps=Math.max(1,Math.min(total-1,Math.round(Math.abs(dragDistance)/cardStep)));
        selectCard(activeIndex+(dragDistance<0?steps:-steps))
      }
    }
    isDragging=false;horizontalDrag=false;dragDistance=0
  };
  deck.addEventListener("pointerup",stopDrag);deck.addEventListener("pointercancel",stopDrag);
  deck.addEventListener("wheel",event=>{
    if(Math.abs(event.deltaX)<=Math.abs(event.deltaY))return;
    const amount=event.deltaX;
    if(Math.abs(amount)<18||wheelLocked)return;
    event.preventDefault();
    wheelLocked=true;
    selectCard(activeIndex+(amount>0?1:-1));
    clearTimeout(wheelTimer);wheelTimer=setTimeout(()=>wheelLocked=false,520)
  },{passive:false});
  dots.forEach((dot,index)=>dot.addEventListener("click",()=>selectCard(index)));
  root.querySelector("[data-project-prev]")?.addEventListener("click",()=>selectCard(activeIndex-1));
  root.querySelector("[data-project-next]")?.addEventListener("click",()=>selectCard(activeIndex+1));
  deck.addEventListener("keydown",event=>{
    if(event.key==="ArrowLeft"){event.preventDefault();selectCard(activeIndex-1)}
    if(event.key==="ArrowRight"){event.preventDefault();selectCard(activeIndex+1)}
    if(event.key==="Escape"&&flippedCardId){event.preventDefault();closeFlipped()}
    if((event.key==="Enter"||event.key===" ")&&event.target===deck){event.preventDefault();open(cards[activeIndex])}
  });
  let ambientObserver=null;
  if("IntersectionObserver" in window){
    ambientObserver=new IntersectionObserver(([entry])=>{
      root.classList.toggle("is-ambient-paused",!entry.isIntersecting)
    },{threshold:.04});
    ambientObserver.observe(root)
  }
  paintLayers();
  pulseSelection();
  projectExplorerCleanup=()=>{
    clearTimeout(transitionTimer);clearTimeout(wheelTimer);clearTimeout(selectionTimer);ambientObserver?.disconnect()
  };
}
let contactCleanup=null;
function setupContact(t){
  if(contactCleanup)contactCleanup();
  const section=$("#contact"),copy=t.contact;
  if(!section)return;
  section.querySelector(".contact-eyebrow").textContent="06 /";
  section.querySelector(".contact-copy-panel h2").innerHTML=`<span class="contact-main-title">${copy.eyebrow}</span>`;
  const toast=section.querySelector(".contact-toast");
  let toastTimer=0;
  const showToast=(message,success)=>{
    clearTimeout(toastTimer);toast.textContent=message;toast.classList.toggle("is-error",!success);toast.classList.add("show");
    toastTimer=setTimeout(()=>toast.classList.remove("show"),1600);
  };
  const fallbackCopy=value=>{
    const area=document.createElement("textarea");
    area.value=value;area.setAttribute("readonly","");area.style.position="fixed";area.style.opacity="0";
    document.body.appendChild(area);area.select();
    const ok=document.execCommand("copy");area.remove();
    if(!ok)throw new Error("copy failed");
  };
  section.querySelectorAll(".contact-copy").forEach(button=>button.addEventListener("click",async()=>{
    const value=button.dataset.copyValue,icon=button.querySelector(".contact-copy-icon");
    try{
      if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(value);else fallbackCopy(value);
      icon.textContent="✓";button.classList.add("copied");showToast(copy.copied,true);
      setTimeout(()=>{icon.textContent="⧉";button.classList.remove("copied")},1200);
    }catch(error){showToast(copy.copyFailed,false)}
  }));
  const stage=section.querySelector(".contact-character-stage"),motion=section.querySelector(".contact-character-follow");
  stage.removeAttribute("tabindex");stage.removeAttribute("role");stage.removeAttribute("aria-label");
  motion.classList.add("contact-character-video-wrap");
  motion.classList.remove("contact-character-motion","contact-character-auto");
  const animatedCharacter=new Image();
  animatedCharacter.className="contact-character-video";
  animatedCharacter.src="images/contact-ski-transparent.webp?v=4";
  animatedCharacter.alt="滑雪人物连续动画";
  animatedCharacter.draggable=false;
  motion.replaceChildren(animatedCharacter);
  contactCleanup=()=>{clearTimeout(toastTimer)};
}
let longExperienceActive="beijing-2022",longExperienceTimer=0,longExperienceCleanup=null;
function longExperienceMarkup(t){
  const items=t.longExperience,ui=t.longExperienceUi,first=items.find(x=>x.id===longExperienceActive)||items[0];
  const detailIcon=kind=>({
    role:`<svg viewBox="0 0 24 24"><circle cx="12" cy="7" r="3.4"/><path d="M5.5 20c.5-4.2 2.6-6.3 6.5-6.3s6 2.1 6.5 6.3"/></svg>`,
    focus:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/></svg>`,
    impact:`<svg viewBox="0 0 24 24"><path d="M4 19V9m5 10V5m5 14v-7m5 7V3"/><path d="m3 14 6-5 5 2 7-7"/></svg>`,
    duration:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3.5 2"/></svg>`
  })[kind];
  return `<div class="long-experience-shell">
    <header class="long-experience-heading">
      <span>03 / EXPERIENCE</span>
      <h2>${ui.title}</h2>
      <i aria-hidden="true"></i>
    </header>
    <div class="long-experience-layout">
      <nav class="long-experience-track" aria-label="${ui.title}" data-long-track>
        <svg viewBox="0 0 440 640" preserveAspectRatio="none" aria-hidden="true">
          <path class="long-track-base" d="M132 38 C252 170 252 470 132 602"/>
          <path class="long-track-energy" pathLength="1" d="M132 38 C252 170 252 470 132 602"/>
        </svg>
        ${items.map(item=>`<button class="long-experience-node status-${item.status}${item.id===first.id?" is-active":""}" type="button" data-long-key="${item.id}" data-status="${item.status}" aria-label="${item.shortTitle||item.title} — ${item.statusLabel}" aria-pressed="${item.id===first.id}" ${item.id===first.id?'aria-current="true"':""} aria-controls="longExperienceDetail"><span class="long-node-core" aria-hidden="true"><i class="long-node-orbit"></i><i class="long-node-scan"></i><i class="long-node-center"></i></span><span class="long-node-copy"><b>${item.shortTitle||item.title}</b><small>${item.statusLabel}</small><i aria-hidden="true"></i></span></button>`).join("")}
      </nav>
      <article class="long-experience-panel status-${first.status}" id="longExperienceDetail" aria-live="polite">
        <div class="long-panel-frame"><i class="long-panel-scan" aria-hidden="true"></i>
          <div class="long-panel-inner">
            <div class="long-panel-top"><span>${ui.detail}</span><i aria-hidden="true"></i></div>
            <figure class="long-panel-image"><img data-long-image src="${first.image}" alt="${first.alt}" loading="lazy"><figcaption data-long-name>${first.shortTitle||first.title}</figcaption><span class="long-panel-status" data-long-status>${first.statusLabel}</span></figure>
            <div class="long-panel-content" data-long-content>
              <div class="long-detail-row"><i class="long-detail-icon">${detailIcon("role")}</i><span>${ui.role}</span><strong data-long-role>${first.role}</strong></div>
              <div class="long-detail-row"><i class="long-detail-icon">${detailIcon("focus")}</i><span data-long-focus-label>${first.focusLabel||ui.focus}</span><strong data-long-focus>${first.focus}</strong></div>
              <div class="long-detail-row"><i class="long-detail-icon">${detailIcon("impact")}</i><span data-long-impact-label>${first.impactLabel||ui.impact}</span><strong data-long-impact>${first.impact}</strong></div>
              <div class="long-detail-row"><i class="long-detail-icon">${detailIcon("duration")}</i><span>${ui.duration}</span><strong data-long-duration>${first.duration}</strong></div>
            </div>
            <div class="long-panel-bottom-accent" aria-hidden="true"><span></span><span></span><span></span></div>
          </div>
        </div>
      </article>
    </div>
  </div>`;
}
function setupLongExperience(t){
  if(longExperienceCleanup)longExperienceCleanup();
  const section=$("#experience"),track=section?.querySelector("[data-long-track]"),panel=section?.querySelector(".long-experience-panel");
  if(!track||!panel)return;
  const items=t.longExperience,ui=t.longExperienceUi,nodes=[...track.querySelectorAll("[data-long-key]")],energy=track.querySelector(".long-track-energy");
  let active=items.some(x=>x.id===longExperienceActive)?longExperienceActive:items[0].id,visible=active;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const paint=(key,immediate=false)=>{
    if(!key||key===visible)return;
    visible=key;
    const item=items.find(x=>x.id===key);if(!item)return;
    nodes.forEach(node=>{const on=node.dataset.longKey===key;node.classList.toggle("is-active",on);node.setAttribute("aria-pressed",String(on));if(on)node.setAttribute("aria-current","true");else node.removeAttribute("aria-current")});
    energy.style.setProperty("--energy-length",String([.23,.58,.94][items.indexOf(item)]));
    panel.classList.toggle("is-switching",!immediate);
    clearTimeout(longExperienceTimer);
    const updatePanel=()=>{
      const image=panel.querySelector("[data-long-image]");
      image.src=item.image;image.alt=item.alt;
      panel.classList.remove("status-completed","status-ongoing","status-upcoming");
      panel.classList.add(`status-${item.status}`);
      panel.querySelector("[data-long-name]").textContent=item.shortTitle||item.title;
      panel.querySelector("[data-long-status]").textContent=item.statusLabel;
      panel.querySelector("[data-long-role]").textContent=item.role;
      panel.querySelector("[data-long-focus-label]").textContent=item.focusLabel||ui.focus;
      panel.querySelector("[data-long-focus]").textContent=item.focus;
      panel.querySelector("[data-long-impact-label]").textContent=item.impactLabel||ui.impact;
      panel.querySelector("[data-long-impact]").textContent=item.impact;
      panel.querySelector("[data-long-duration]").textContent=item.duration;
      panel.classList.remove("is-switching");
    };
    if(immediate||reduced)updatePanel();
    else longExperienceTimer=setTimeout(updatePanel,145);
  };
  const selectNode=(node,immediate=false)=>{
    active=node.dataset.longKey;
    longExperienceActive=active;
    paint(active,immediate);
  };
  nodes.forEach(node=>{
    node.addEventListener("pointerenter",event=>{if(event.pointerType!=="touch")selectNode(node)});
    node.addEventListener("focus",()=>selectNode(node));
    node.addEventListener("click",()=>selectNode(node));
  });
  let scrollScene=null;
  if(window.gsap&&window.ScrollTrigger&&innerWidth>=900){
    gsap.registerPlugin(ScrollTrigger);
    scrollScene=ScrollTrigger.create({
      id:"long-experience-scroll-scene",
      trigger:section,
      start:"top top",
      end:()=>`+=${Math.round(innerHeight*1.65)}`,
      pin:true,
      pinSpacing:true,
      anticipatePin:1,
      invalidateOnRefresh:true,
      onEnter:()=>{if(nodes[0])selectNode(nodes[0],true)},
      onLeaveBack:()=>{if(nodes[0])selectNode(nodes[0],true)},
      onUpdate:self=>{
        const index=Math.min(items.length-1,Math.floor(self.progress*items.length));
        const node=nodes[index];
        if(node&&node.dataset.longKey!==active)selectNode(node,true);
      },
      onEnterBack:self=>{
        const index=Math.min(items.length-1,Math.floor(self.progress*items.length));
        if(nodes[index])selectNode(nodes[index],true);
      }
    });
  }
  let motionCleanup=()=>{};
  if(window.gsap){
    const mm=gsap.matchMedia();
    mm.add({desktop:"(min-width:900px)",reduce:"(prefers-reduced-motion: reduce)"},context=>{
      if(!context.conditions.desktop||context.conditions.reduce)return;
      const image=panel.querySelector("[data-long-image]"),scan=panel.querySelector(".long-panel-scan");
      const scanTween=gsap.fromTo(scan,{yPercent:-130,autoAlpha:0},{yPercent:920,autoAlpha:.42,duration:4.8,repeat:-1,repeatDelay:1.35,ease:"none"});
      let frame=0,pointerX=.5,pointerY=.5;
      const renderDepth=()=>{
        const x=(pointerX-.5)*2,y=(pointerY-.5)*2;
        gsap.to(panel,{rotationY:x*2.2,rotationX:-y*1.5,x:x*3,y:y*2,duration:.48,ease:"power2.out",overwrite:"auto",transformPerspective:1200,transformOrigin:"50% 50%"});
        gsap.to(image,{x:-x*7,y:-y*5,scale:1.018,duration:.62,ease:"power2.out",overwrite:"auto"});
        frame=0;
      };
      const move=event=>{
        const bounds=panel.getBoundingClientRect();
        pointerX=(event.clientX-bounds.left)/bounds.width;
        pointerY=(event.clientY-bounds.top)/bounds.height;
        if(!frame)frame=requestAnimationFrame(renderDepth);
      };
      const reset=()=>{
        cancelAnimationFrame(frame);frame=0;
        gsap.to(panel,{rotationX:0,rotationY:0,x:0,y:0,duration:.7,ease:"power3.out",overwrite:"auto"});
        gsap.to(image,{x:0,y:0,scale:1,duration:.75,ease:"power3.out",overwrite:"auto"});
      };
      panel.addEventListener("pointermove",move);
      panel.addEventListener("pointerleave",reset);
      return ()=>{cancelAnimationFrame(frame);panel.removeEventListener("pointermove",move);panel.removeEventListener("pointerleave",reset);scanTween.kill();gsap.killTweensOf([panel,image,scan])};
    });
    motionCleanup=()=>mm.revert();
  }
  longExperienceCleanup=()=>{clearTimeout(longExperienceTimer);scrollScene?.kill();motionCleanup()};
}

/* Orbital Experience is an additive scene. The original long-experience DOM and
   interaction above remain intact as a reversible legacy implementation. */
let orbitalExperienceCleanup=null;
function orbitalExperienceMarkup(t){
  const items=t.longExperience,hubAssets=["experience-hub-beijing-v4.png","experience-hub-yuru-v4.png","experience-hub-aichi-v4.png"];
  return `<div class="orbital-experience" data-orbital-experience>
    <div class="orbital-experience__stage">
      <img class="orbital-experience__universe" src="public/images/experience/experience-orbit-user-v4-2x.png" alt="" aria-hidden="true">
      <div class="orbital-experience__shade" aria-hidden="true"></div>
      <div class="orbital-experience__gold-route" aria-hidden="true"><i></i><i></i></div>
      <header class="orbital-experience__heading compact-section-heading">
        <span>03 / EXPERIENCE</span>
        <small>${t.longExperienceUi.title}</small>
        <i aria-hidden="true"></i>
      </header>
      <div class="orbital-experience__progress" aria-hidden="true"><i></i><b>01</b><b>02</b><b>03</b><em>PROJECTS</em></div>
      <div class="orbital-experience__beacons" role="tablist" aria-label="${t.longExperienceUi.title}">
        ${items.map((item,index)=>`<button type="button" role="tab" data-orbit-beacon="${index}" aria-selected="${index===0}" aria-controls="orbitMission${index}" aria-label="${item.shortTitle||item.title}"><img class="is-alpha-hub" src="public/images/experience/${hubAssets[index]}" alt=""><span><b>0${index+1}</b><strong>${item.shortTitle||item.title}</strong><small>${item.duration}</small></span></button>`).join("")}
      </div>
      <div class="orbital-experience__missions">
        ${items.map((item,index)=>`<article class="orbital-mission${index===0?" is-active":""}" id="orbitMission${index}" data-orbit-mission="${index}" aria-hidden="${index!==0}">
          <small>MISSION 0${index+1} · ${item.statusLabel}</small>
          <h3>${item.shortTitle||item.title}</h3>
          <p>${item.role}</p>
          <dl><div><dt>${t.longExperienceUi.focus}</dt><dd>${item.focus}</dd></div><div><dt>${t.longExperienceUi.impact}</dt><dd>${item.impact}</dd></div></dl>
          <time>${item.duration}</time>
        </article>`).join("")}
      </div>
      <div class="orbital-experience__hint"><span>SCROLL</span><i></i><b>向下滚动 · 轨道向右转</b></div>
      <div class="orbital-experience__exit" aria-hidden="true"><small>NEXT MISSION</small><strong>PROJECTS</strong><span>03 / PROJECT DECK</span></div>
    </div>
  </div>`;
}
function setupOrbitalExperience(){
  orbitalExperienceCleanup?.();
  const section=$("#experience"),root=section?.querySelector("[data-orbital-experience]"),stage=root?.querySelector(".orbital-experience__stage");
  if(!root||!stage||!window.gsap||!window.ScrollTrigger)return;
  const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger,reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const universe=root.querySelector(".orbital-experience__universe"),missions=[...root.querySelectorAll("[data-orbit-mission]")],beacons=[...root.querySelectorAll("[data-orbit-beacon]")],progress=root.querySelector(".orbital-experience__progress i"),heading=root.querySelector(".orbital-experience__heading"),hint=root.querySelector(".orbital-experience__hint"),exit=root.querySelector(".orbital-experience__exit");
  let activeIndex=0,orbitRx=0,orbitRy=0;
  const measureOrbit=()=>{
    orbitRx=stage.clientWidth*(innerWidth<=900?.34:.31);
    orbitRy=stage.clientHeight*(innerWidth<=900?.2:.38);
  };
  const positionBeacons=sceneProgress=>{
    const slots=[
      {angle:175,scale:.82},
      {angle:90,scale:1.05},
      {angle:29,scale:.82}
    ];
    const stops=[
      {p:0,slots:[1,0,2]},
      {p:.13,slots:[1,0,2]},
      {p:.4,slots:[2,1,0]},
      {p:.58,slots:[0,2,1]}
    ];
    let from=stops[0],to=stops[1];
    for(let index=1;index<stops.length;index++){
      if(sceneProgress<=stops[index].p){from=stops[index-1];to=stops[index];break}
      from=to=stops[index];
    }
    const segment=from===to?1:Math.max(0,Math.min(1,(sceneProgress-from.p)/(to.p-from.p)));
    beacons.forEach((beacon,index)=>{
      const start=slots[from.slots[index]],end=slots[to.slots[index]];
      let endAngle=end.angle;
      while(endAngle>=start.angle)endAngle-=360;
      const delta=from===to?0:endAngle-start.angle;
      const radians=(start.angle+delta*segment)*Math.PI/180;
      const x=Math.cos(radians)*orbitRx;
      const y=Math.sin(radians)*orbitRy;
      const scale=start.scale+(end.scale-start.scale)*segment;
      gsap.set(beacon,{x,y,scale,opacity:1,clearProps:"zIndex"});
    });
  };
  const setActive=index=>{
    const next=Math.max(0,Math.min(2,index));
    if(next===activeIndex&&missions[next]?.classList.contains("is-active"))return;
    activeIndex=next;
    missions.forEach((mission,i)=>{const on=i===next;mission.classList.toggle("is-active",on);mission.setAttribute("aria-hidden",String(!on))});
    beacons.forEach((beacon,i)=>beacon.setAttribute("aria-selected",String(i===next)));
    section.dataset.orbitMission=String(next+1);
  };
  gsap.set(missions,{autoAlpha:0,xPercent:18,rotationY:-8,transformOrigin:"50% 50%"});
  gsap.set(missions[0],{autoAlpha:1,xPercent:0,rotationY:0});
  gsap.set(beacons,{xPercent:-50,yPercent:-50,rotation:0,transformOrigin:"50% 50%"});
  measureOrbit();
  positionBeacons(0);
  gsap.set(exit,{autoAlpha:0,yPercent:16});
  const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{
    id:"orbital-experience",trigger:root,start:"top top",end:()=>`+=${Math.round(innerHeight*(reduced?1.5:3.25))}`,
    pin:stage,pinSpacing:true,scrub:reduced?true:.6,anticipatePin:1,invalidateOnRefresh:true,
    snap:reduced?false:{snapTo:[0,.13,.4,.58,.87,1],duration:{min:.12,max:.32},delay:.06,ease:"power1.inOut"},
    onRefresh:self=>{measureOrbit();positionBeacons(self.progress)},
    onUpdate:self=>{setActive(self.progress<.15?0:self.progress<.44?1:2);positionBeacons(self.progress);progress.style.transform=`scaleX(${self.progress})`}
  }});
  const turn=(from,to,at)=>{
    tl.to(missions[from],{autoAlpha:0,xPercent:-22,rotationY:8,duration:.1},at)
      .to(missions[to],{autoAlpha:1,xPercent:0,rotationY:0,duration:.11},at+.05);
  };
  tl.to(universe,{scale:1.005,duration:.12},0);
  turn(0,1,.13);
  turn(1,2,.4);
  tl.to(hint,{autoAlpha:0,yPercent:20,duration:.08},.68)
    .to(missions[2],{autoAlpha:0,xPercent:-24,duration:.11},.78)
    .to(heading,{autoAlpha:0,xPercent:-8,duration:.1},.79)
    .to(exit,{autoAlpha:1,yPercent:0,duration:.12},.82)
    .to(universe,{xPercent:-2,scale:1.03,filter:"brightness(.5) saturate(.8)",duration:.18},.78)
    .to(stage,{autoAlpha:.08,scale:.985,duration:.08},.94);
  beacons.forEach((beacon,index)=>beacon.addEventListener("click",()=>{
    const trigger=tl.scrollTrigger,start=trigger.start,end=trigger.end,target=start+(end-start)*[0,.29,.58][index];
    scrollTo({top:target,behavior:reduced?"auto":"smooth"});
  }));
  const refresh=()=>ScrollTrigger.refresh();
  universe.addEventListener("load",refresh,{once:true});
  orbitalExperienceCleanup=()=>{tl.scrollTrigger?.kill();tl.kill();universe.removeEventListener("load",refresh)};
}
let chapterRouteCleanup=null;
function setupChapterRoute(){
  chapterRouteCleanup?.();
  document.querySelector("[data-chapter-route]")?.remove();
  if(!window.gsap||!window.ScrollTrigger)return;
  document.body.insertAdjacentHTML("beforeend",`<div class="chapter-route" data-chapter-route aria-label="Portfolio chapter navigation">
    <nav class="chapter-zone-rail">
      <span class="chapter-zone-line" aria-hidden="true"><i></i></span>
      <a href="#experience" data-zone-link="1"><small>ZONE</small><strong>01</strong><em>/ 03</em></a>
      <a href="#projects" data-zone-link="2"><small>ZONE</small><strong>02</strong><em>/ 03</em></a>
      <a href="#research" data-zone-link="3"><small>ZONE</small><strong>03</strong><em>/ 03</em></a>
    </nav>
    <div class="chapter-energy-route" aria-hidden="true"><i></i><b></b><span></span></div>
  </div>`);
  const root=document.querySelector("[data-chapter-route]"),fill=root.querySelector(".chapter-zone-line i"),links=[...root.querySelectorAll("[data-zone-link]")],energy=root.querySelector(".chapter-energy-route");
  const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger,triggers=[];
  const setZone=zone=>links.forEach((link,index)=>link.classList.toggle("is-active",index===zone-1));
  triggers.push(ScrollTrigger.create({trigger:"#experience",start:"top bottom",endTrigger:"#research",end:"bottom top",onToggle:self=>root.classList.toggle("is-visible",self.isActive)}));
  triggers.push(ScrollTrigger.create({trigger:"#experience",start:"top center",endTrigger:"#research",end:"bottom center",scrub:true,onUpdate:self=>{gsap.set(fill,{scaleY:self.progress});energy.style.setProperty("--route-progress",self.progress)}}));
  [["#experience",1],["#projects",2],["#research",3]].forEach(([selector,zone])=>triggers.push(ScrollTrigger.create({trigger:selector,start:"top center",end:"bottom center",onEnter:()=>setZone(zone),onEnterBack:()=>setZone(zone)})));
  setZone(1);
  chapterRouteCleanup=()=>{triggers.forEach(trigger=>trigger.kill());root.remove()};
}
let heroForegroundCleanup=null,heroEntryOpened=false;
let heroMessageCleanup=null;
function setupHeroMessage(t){
  if(heroMessageCleanup)heroMessageCleanup();
  const dialog=document.querySelector(".hero-message-dialog"),form=dialog?.querySelector(".hero-message-form"),close=dialog?.querySelector(".hero-message-close"),status=dialog?.querySelector(".hero-message-status");
  if(!dialog||!form)return;
  const copy=t.messageCard;
  dialog.querySelector("[data-message-title]").textContent=copy.title;
  dialog.querySelector("[data-message-name]").textContent=copy.name;
  dialog.querySelector("[data-message-email]").textContent=copy.email;
  dialog.querySelector("[data-message-message]").textContent=copy.message;
  dialog.querySelector("[data-message-send]").textContent=copy.send;
  const lang=document.documentElement.lang;
  const placeholders=lang==="ja"
    ?["お名前またはニックネーム","メールアドレスを入力","メッセージを入力してください…"]
    :lang==="en"
      ?["Enter your name or nickname","Enter your email address","Write your message here…"]
      :["输入你的名字或昵称","输入你的邮箱地址","写下你的留言…"];
  form.querySelector('input[name="name"]').placeholder=placeholders[0];
  form.querySelector('input[name="email"]').placeholder=placeholders[1];
  form.querySelector('textarea[name="message"]').placeholder=placeholders[2];
  dialog.querySelector("[data-message-privacy]").textContent=lang==="ja"
    ?"入力された情報は秘密として保護されます。"
    :lang==="en"
      ?"Your information will be kept confidential."
      :"您的信息将被保密。";
  close.setAttribute("aria-label",copy.close);
  const open=()=>{status.textContent="";dialog.showModal();requestAnimationFrame(()=>dialog.classList.add("is-open"))};
  const dismiss=()=>{dialog.classList.remove("is-open");setTimeout(()=>dialog.open&&dialog.close(),180)};
  const submit=async event=>{
    event.preventDefault();
    const submitButton=form.querySelector(".hero-message-submit");
    submitButton.disabled=true;
    status.textContent=copy.sending;
    try{
      const payload=new FormData(form);
      payload.append("_template","table");
      payload.append("_captcha","false");
      const response=await fetch("https://formsubmit.co/ajax/zyan2862@gmail.com",{method:"POST",headers:{Accept:"application/json"},body:payload});
      const result=await response.json().catch(()=>null);
      const accepted=result?.success===true||result?.success==="true";
      if(!response.ok||!accepted)throw new Error(result?.message||"message delivery failed");
      form.reset();
      status.textContent=copy.activation;
    }catch(error){
      status.textContent=location.protocol==="file:"?copy.serverRequired:copy.error;
      console.error("Message delivery failed:",error);
    }finally{
      submitButton.disabled=false;
    }
  };
  window.addEventListener("hero-lanyard-message",open);
  close.addEventListener("click",dismiss);
  dialog.addEventListener("click",event=>{if(event.target===dialog)dismiss()});
  form.addEventListener("submit",submit);
  heroMessageCleanup=()=>{
    window.removeEventListener("hero-lanyard-message",open);
    close.removeEventListener("click",dismiss);
    form.removeEventListener("submit",submit);
  };
}
function setupHeroForeground(){
  if(heroForegroundCleanup)heroForegroundCleanup();
  const hero=document.querySelector(".hero-video-intro"),title=hero?.querySelector(".hero-access-title");
  if(!hero||!title)return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const titleChars=[...title.querySelectorAll(".hero-title-char")],headset=title.querySelector(".hero-vr-headset"),headsetButton=title.querySelector(".hero-vr-headset-wrap");
  const gsap=window.gsap;
  let readyTimer=0,doneTimer=0,accessFrame=0,titleTimeline=null;
  const booted=sessionStorage.getItem("heroSystemBooted")==="true";
  hero.classList.remove("is-booting","hero-main-ready","hero-boot-complete","is-accessing","reduced-boot");
  if(!gsap){
    titleChars.forEach(char=>Object.assign(char.style,{opacity:"1",visibility:"visible",transform:"none",filter:"none"}));
    if(headset)Object.assign(headset.style,{opacity:"1",visibility:"visible",transform:"none",filter:"none"});
  }else if(reduced){
    hero.classList.add("hero-main-ready","hero-boot-complete","reduced-boot");
  }else if(booted){
    hero.classList.add("hero-main-ready","hero-boot-complete");
  }else{
    sessionStorage.setItem("heroSystemBooted","true");
    hero.classList.add("is-booting");
    readyTimer=setTimeout(()=>hero.classList.add("hero-main-ready"),1250);
    doneTimer=setTimeout(()=>{
      hero.classList.remove("is-booting");
      hero.classList.add("hero-boot-complete");
    },1800);
  }
  if(reduced){
    gsap.set(titleChars,{autoAlpha:1,yPercent:0,rotationX:0,filter:"none"});
    if(headset)gsap.set(headset,{autoAlpha:1,y:0,scale:1,rotation:0});
  }else{
    titleTimeline=gsap.timeline({delay:booted?.16:1.08,defaults:{ease:"power3.out"}});
    gsap.set(titleChars,{autoAlpha:.26,yPercent:38,rotationX:-38,filter:"blur(4px)"});
    if(headset)gsap.set(headset,{autoAlpha:0,y:18,scale:.76,rotation:-7});
    const revealSteps=[...new Set(titleChars.map(char=>Number(char.dataset.revealStep)))].sort((a,b)=>a-b);
    revealSteps.forEach((step,index)=>{
      const stepChars=titleChars.filter(char=>Number(char.dataset.revealStep)===step);
      const isAccessStep=stepChars.some(char=>char.classList.contains("hero-title-access-char"));
      const at=index*.17;
      titleTimeline.to(stepChars,{autoAlpha:1,yPercent:0,rotationX:0,filter:"blur(0px)",duration:.48,clearProps:"filter"},at);
      if(isAccessStep&&headset)titleTimeline.to(headset,{autoAlpha:1,y:0,scale:1,rotation:0,duration:.54,ease:"back.out(1.55)"},at);
    });
  }
  const activate=()=>{
    if(reduced)return;
    cancelAnimationFrame(accessFrame);
    hero.classList.remove("is-accessing");
    accessFrame=requestAnimationFrame(()=>hero.classList.add("is-accessing"));
  };
  const deactivate=()=>{
    cancelAnimationFrame(accessFrame);
    hero.classList.remove("is-accessing");
  };
  title.addEventListener("pointerenter",activate);
  title.addEventListener("pointerleave",deactivate);
  title.addEventListener("focus",activate);
  title.addEventListener("blur",deactivate);
  const enterPortfolio=()=>{
    heroEntryOpened=true;
    document.documentElement.classList.remove("hero-entry-locked");
    hero.classList.add("hero-entry-open");
    document.querySelector(".sport-reel")?.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"});
  };
  if(headsetButton&&!heroEntryOpened){
    document.documentElement.classList.add("hero-entry-locked");
    requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:"auto"}));
  }
  headsetButton?.addEventListener("click",enterPortfolio);
  heroForegroundCleanup=()=>{
    document.documentElement.classList.remove("hero-entry-locked");
    clearTimeout(readyTimer);
    clearTimeout(doneTimer);
    cancelAnimationFrame(accessFrame);
    title.removeEventListener("pointerenter",activate);
    title.removeEventListener("pointerleave",deactivate);
    title.removeEventListener("focus",activate);
    title.removeEventListener("blur",deactivate);
    headsetButton?.removeEventListener("click",enterPortfolio);
    titleTimeline?.kill();
    gsap?.killTweensOf([...titleChars,...(headset?[headset]:[])]);
  };
}
let chapterZoneRailCleanup=null;
function setupChapterZoneRail(){
  chapterZoneRailCleanup?.();
  document.querySelector("[data-zone-rail]")?.remove();
  if(innerWidth<900||!window.gsap||!window.ScrollTrigger)return;
  gsap.registerPlugin(ScrollTrigger);
  const chapterLabels={
    zh:["关于我","专业能力","经历","项目","研究"],
    ja:["自己紹介","専門能力","経験","プロジェクト","研究"],
    en:["ABOUT","PROFILE","EXPERIENCE","PROJECTS","RESEARCH"]
  }[lang]||["ABOUT","PROFILE","EXPERIENCE","PROJECTS","RESEARCH"];
  const chapters=["about","profile-framework","experience","projects","research"].map((id,index)=>({id,label:chapterLabels[index]}));
  const rail=document.createElement("aside");
  rail.className="chapter-zone-rail";
  rail.dataset.zoneRail="";
  rail.setAttribute("aria-label","Portfolio chapters");
  rail.innerHTML=`<div class="chapter-zone-track" aria-hidden="true"><i></i></div>${chapters.map((chapter,index)=>`<a href="#${chapter.id}" data-zone-index="${index}" aria-label="${String(index+1).padStart(2,"0")} ${chapter.label}"><b>${String(index+1).padStart(2,"0")}</b><em>/ 0${chapters.length}</em><span>${chapter.label}</span></a>`).join("")}`;
  document.body.appendChild(rail);
  const links=[...rail.querySelectorAll("a")],progress=rail.querySelector(".chapter-zone-track i"),triggers=[];
  const setActive=index=>links.forEach((link,i)=>{const active=i===index;link.classList.toggle("is-active",active);if(active)link.setAttribute("aria-current","true");else link.removeAttribute("aria-current")});
  gsap.set(rail,{autoAlpha:0});
  triggers.push(ScrollTrigger.create({trigger:"#about",start:"top 72%",endTrigger:"#research",end:"bottom bottom",onToggle:self=>gsap.set(rail,{autoAlpha:self.isActive?1:0})}));
  const progressTween=gsap.to(progress,{scaleY:1,ease:"none",scrollTrigger:{trigger:"#about",start:"top center",endTrigger:"#research",end:"bottom center",scrub:.25}});
  triggers.push(progressTween.scrollTrigger);
  chapters.forEach((chapter,index)=>triggers.push(ScrollTrigger.create({trigger:`#${chapter.id}`,start:"top center",end:"bottom center",onToggle:self=>{if(self.isActive)setActive(index)}})));
  const clickHandlers=links.map(link=>{const handler=event=>{event.preventDefault();document.querySelector(link.getAttribute("href"))?.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"})};link.addEventListener("click",handler);return [link,handler]});
  setActive(0);
  requestAnimationFrame(()=>ScrollTrigger.refresh());
  chapterZoneRailCleanup=()=>{triggers.forEach(trigger=>trigger?.kill());progressTween.kill();clickHandlers.forEach(([link,handler])=>link.removeEventListener("click",handler));gsap.killTweensOf(rail);rail.remove()};
}
// Temporary editing mode: set back to true when the ticket gate is restored.
const REQUIRE_TICKET_TEAR_TO_CONTINUE=false;
function setupTransitionTicket(){
  const section=document.querySelector(".transition-ticket-section"),ticket=section?.querySelector(".transition-ticket"),stub=ticket?.querySelector(".transition-ticket__stub");
  if(!ticket||!stub)return;
  const liveDate=stub.querySelector("[data-ticket-current-date]");
  if(liveDate){
    const now=new Date();
    const pad=value=>String(value).padStart(2,"0");
    const currentDate=`${now.getFullYear()}.${pad(now.getMonth()+1)}.${pad(now.getDate())}`;
    liveDate.textContent=currentDate;
    liveDate.dateTime=`${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}`;
  }
  if(ticket.dataset.ticketReady==="true")return;
  ticket.dataset.ticketReady="true";
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const experience=document.querySelector("#experience");
  let startX=0,dragging=false,readyToTear=false,torn=false,gateFrame=0,deniedTimer=0;
  document.documentElement.classList.toggle("transition-gate-locked",REQUIRE_TICKET_TEAR_TO_CONTINUE);
  const gateLimit=()=>Math.max(0,(experience?.offsetTop??section.offsetTop+section.offsetHeight)-innerHeight);
  const deny=()=>{
    section.classList.remove("is-gate-denied");
    void section.offsetWidth;
    section.classList.add("is-gate-denied");
    clearTimeout(deniedTimer);
    deniedTimer=window.setTimeout(()=>section.classList.remove("is-gate-denied"),650);
  };
  const enforceGate=()=>{
    gateFrame=0;
    if(torn)return;
    const limit=gateLimit();
    if(scrollY>limit+2){
      scrollTo({top:limit,behavior:"auto"});
      deny();
    }
  };
  const watchGate=()=>{
    if(!gateFrame)gateFrame=requestAnimationFrame(enforceGate);
  };
  if(REQUIRE_TICKET_TEAR_TO_CONTINUE){
    addEventListener("scroll",watchGate,{passive:true});
    document.addEventListener("click",event=>{
      const link=event.target.closest('a[href="#experience"]');
      if(!link||torn)return;
      event.preventDefault();
      section.scrollIntoView({behavior:reduced?"auto":"smooth",block:"center"});
      deny();
      stub.focus({preventScroll:true});
    });
  }
  const arm=()=>{
    ticket.classList.add("is-armed");
    section.classList.add("is-armed");
  };
  if("IntersectionObserver" in window){
    const ticketObserver=new IntersectionObserver(entries=>{
      if(entries[0]?.isIntersecting){
        arm();
        ticketObserver.disconnect();
      }
    },{threshold:.28});
    ticketObserver.observe(ticket);
  }else arm();
  const tear=()=>{
    if(torn)return;
    torn=true;
    ticket.classList.add("is-tearing");
    section.classList.add("is-tearing");
    window.setTimeout(()=>{
      document.documentElement.classList.remove("transition-gate-locked");
      ticket.classList.remove("is-tearing");
      ticket.classList.add("is-torn","is-complete");
      section.classList.add("is-torn","is-complete");
      ticket.setAttribute("aria-label","Access to Experience granted");
    },reduced?0:760);
    window.setTimeout(()=>{
      experience?.classList.remove("ticket-entry");
      void experience?.offsetWidth;
      experience?.classList.add("ticket-entry");
    },reduced?0:850);
    window.setTimeout(()=>{
      experience?.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"});
    },reduced?0:980);
  };
  stub.addEventListener("click",tear);
  stub.addEventListener("pointerdown",event=>{
    if(event.button!==undefined&&event.button!==0)return;
    event.preventDefault();
    startX=event.clientX;
    dragging=true;
    readyToTear=false;
    stub.setPointerCapture?.(event.pointerId);
    section.classList.add("is-dragging");
  });
  stub.addEventListener("pointermove",event=>{
    if(!dragging||torn)return;
    const threshold=innerWidth<640?72:110,distance=Math.max(0,event.clientX-startX),progress=Math.min(100,Math.round(distance/threshold*100));
    readyToTear=progress>=100;
    stub.style.setProperty("--tear-drag",`${Math.min(distance,threshold+18)}px`);
    ticket.style.setProperty("--tear-progress",String(progress/100));
    section.classList.toggle("is-tear-ready",readyToTear);
  });
  const release=event=>{
    if(!dragging)return;
    const complete=readyToTear;
    dragging=false;
    readyToTear=false;
    section.classList.remove("is-dragging");
    section.classList.remove("is-tear-ready");
    stub.releasePointerCapture?.(event.pointerId);
    if(complete)tear();
    else{
      stub.style.removeProperty("--tear-drag");
      ticket.style.removeProperty("--tear-progress");
    }
  };
  stub.addEventListener("pointerup",release);
  stub.addEventListener("pointercancel",release);
  stub.addEventListener("lostpointercapture",release);
  ticket.addEventListener("keydown",event=>{
    if((event.key==="Enter"||event.key===" ")&&document.activeElement===ticket){
      event.preventDefault();
      stub.focus();
    }
  });
}
let tarotTransitionCleanup=null;
function setupTarotTransition(){
  if(tarotTransitionCleanup)tarotTransitionCleanup();
  const section=$("#tarot-transition"),selected=section?.querySelector("[data-research-card]"),cards=[...section?.querySelectorAll(".tarot-card")||[]];
  const sticky=section?.querySelector(".tarot-sticky"),heading=section?.querySelector(".tarot-heading"),stage=section?.querySelector(".tarot-stage"),space=section?.querySelector(".tarot-space"),signal=section?.querySelector(".tarot-signal"),ring=section?.querySelector(".tarot-ring"),deck=section?.querySelector(".tarot-deck");
  if(!section||!selected||!sticky||!window.gsap||!window.ScrollTrigger)return;
  const gsap=window.gsap,ScrollTrigger=window.ScrollTrigger,faces=cards.map(card=>card.querySelector(".tarot-project-face")),backs=cards.map(card=>card.querySelector(".tarot-back")),inners=cards.map(card=>card.querySelector(".tarot-card-inner")),others=cards.filter(card=>card!==selected);
  gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();
  let timeline=null,drawTimeline=null,drawReady=false,drawn=false;
  const setDrawReady=ready=>{
    drawReady=ready&&!drawn;
    section.classList.toggle("is-draw-ready",drawReady);
    cards.forEach((card,index)=>{
      card.tabIndex=drawReady?0:-1;
      card.setAttribute("aria-hidden",drawReady?"false":"true");
      card.setAttribute("aria-label",drawReady?`Draw tarot card ${index+1}`:"Transition card");
    });
  };
  const syncState=()=>{
    const progress=timeline?timeline.progress():0;
    section.style.setProperty("--tarot-progress",progress.toFixed(3));
    if(!drawn)section.dataset.phase=progress<.2?"gather":progress<.45?"shuffle":progress<.69?"spread":"draw-ready";
    section.classList.toggle("is-active",progress>0&&progress<1);
  };
  media.add({desktop:"(min-width: 701px)",mobile:"(max-width: 700px)",reduce:"(prefers-reduced-motion: reduce)"},context=>{
    const {mobile,reduce}=context.conditions,gap=mobile?46:Math.max(58,Math.min(112,innerWidth*.072)),split=reduce?0:(mobile?42:88),lift=mobile?-66:-92,finalLift=mobile?-76:-108;
    gsap.set(cards,{x:index=>(index-3)*gap,y:index=>Math.abs(index-3)*8,z:index=>(3-Math.abs(index-3))*15,rotation:index=>(index-3)*4.8,scale:index=>1-Math.abs(index-3)*.038,opacity:index=>1-Math.abs(index-3)*.055,force3D:true});
    gsap.set(faces,{autoAlpha:1,filter:"blur(0px) brightness(1)"});
    gsap.set(backs,{autoAlpha:0});
    gsap.set(inners,{rotationY:0,transformStyle:"preserve-3d"});
    gsap.set([space,heading,stage,signal],{clearProps:"visibility"});
    timeline=gsap.timeline({defaults:{ease:"none"},onUpdate:syncState,scrollTrigger:{id:"tarot-transition",trigger:section,start:"top top",end:()=>`+=${Math.round(innerHeight*(mobile?1.7:2.15))}`,pin:sticky,pinSpacing:true,scrub:reduce?true:.45,anticipatePin:1,invalidateOnRefresh:true,onUpdate:self=>{
      const progress=timeline?.progress()||0;
      if(progress>=.69&&!drawn){
        setDrawReady(true);
        const lockAt=self.start+(self.end-self.start)*.72;
        if(self.scroll()>lockAt+2)self.scroll(lockAt)
      }else if(progress<.67&&!drawn)setDrawReady(false)
    }}});
    timeline.addLabel("collect",0)
      .to(cards,{x:index=>(index-3)*2,y:index=>Math.abs(index-3)*2,z:index=>index*-4,rotation:0,scale:.95,duration:.2,ease:"power3.inOut"},"collect")
      .addLabel("shuffle",.2)
      .to(faces,{autoAlpha:0,filter:"blur(6px) brightness(.3)",duration:.25,ease:"power2.inOut"},"shuffle")
      .to(backs,{autoAlpha:1,duration:.25,ease:"power2.inOut"},"shuffle")
      .to(cards,{x:index=>(index%2?1:-1)*split+(index-3)*3,y:index=>(index%3-1)*(reduce?0:30),z:index=>(index%2?75:-38),rotation:index=>(index%2?1:-1)*(reduce?0:8),duration:.075,ease:"power2.inOut",stagger:{amount:.018,from:"center"}},"shuffle")
      .to(cards,{x:index=>(index%2?-1:1)*split*.78,y:index=>(1-index%3)*(reduce?0:24),z:index=>(index%2?-45:92),rotation:index=>(index%2?-1:1)*(reduce?0:6),duration:.075,ease:"power2.inOut",stagger:{amount:.018,from:"edges"}},.275)
      .to(cards,{x:index=>(index-3)*2,y:index=>Math.abs(index-3)*2,z:index=>index*-4,rotation:0,duration:.1,ease:"power3.inOut",stagger:{amount:.015,from:"center"}},.35)
      .addLabel("spread",.45)
      .to(cards,{x:index=>(index-3)*gap*1.06,y:index=>Math.abs(index-3)*6,z:index=>(3-Math.abs(index-3))*18,rotation:index=>(index-3)*2.6,scale:index=>1-Math.abs(index-3)*.028,opacity:index=>1-Math.abs(index-3)*.045,duration:.25,ease:"power3.inOut",stagger:{amount:.025,from:"center"}},"spread")
      .addLabel("choose",.7)
      .to({hold:0},{hold:1,duration:.3},"choose");
    const drawCard=card=>{
      if(!drawReady||drawn)return;
      drawn=true;setDrawReady(false);section.dataset.phase="reveal";section.classList.add("is-drawing");card.classList.add("is-chosen");
      const unchosen=cards.filter(item=>item!==card),inner=card.querySelector(".tarot-card-inner");
      gsap.set(card,{zIndex:80});
      drawTimeline=gsap.timeline({defaults:{overwrite:"auto"},onComplete:()=>{
        section.classList.add("is-drawn");
        section.classList.add("is-exiting");
        const transitionTrigger=timeline?.scrollTrigger;
        transitionTrigger?.kill(true,true);
        ScrollTrigger.refresh();
        const research=document.querySelector("#research");
        if(!research)return;
        const researchTop=research.getBoundingClientRect().top+scrollY;
        scrollTo({top:researchTop,behavior:"auto"});
      }})
        .to(unchosen,{y:"+=30",z:-80,scale:.74,autoAlpha:0,duration:reduce ? .2 : .48,ease:"power3.in",stagger:{amount:reduce ? 0 : .08,from:"center"}},0)
        .to(card,{x:0,y:lift,z:210,rotation:0,scale:1.2,autoAlpha:1,duration:reduce ? .25 : .55,ease:"power3.inOut"},0)
        .to(heading,{autoAlpha:.12,y:-18,duration:reduce ? .18 : .35,ease:"power2.inOut"},0)
        .to(signal,{autoAlpha:0,y:14,duration:reduce ? .15 : .28,ease:"power2.in"},0)
        .to(ring,{filter:"brightness(1.65)",scale:1.08,duration:reduce ? .2 : .34,yoyo:true,repeat:1,ease:"power2.inOut"},.08)
        .to(card,{y:finalLift,z:230,scale:1.26,duration:reduce ? .2 : .42,ease:"power2.inOut"},reduce ? .15 : .34)
        .to(inner,{rotationY:180,duration:reduce ? .25 : .62,ease:"power3.inOut"},reduce ? .2 : .38)
        .to(heading,{autoAlpha:0,y:-26,duration:reduce ? .15 : .25,ease:"power2.in"},reduce ? .32 : .68)
    };
    const onCardClick=event=>{const card=event.target.closest(".tarot-card");if(card)drawCard(card)};
    deck.addEventListener("click",onCardClick);
    syncState();
    return()=>{deck.removeEventListener("click",onCardClick);drawTimeline?.kill();timeline?.scrollTrigger?.kill();timeline?.kill();timeline=null};
  });
  requestAnimationFrame(()=>ScrollTrigger.refresh());
  tarotTransitionCleanup=()=>{media.revert();drawTimeline?.kill();ScrollTrigger.getById("tarot-transition")?.kill();gsap.killTweensOf([...cards,...faces,...backs,...inners,heading,signal,ring])};
}
const researchSignalCopy={
  zh:{eyebrow:"04B / RESEARCH SIGNAL",title:"研究信号",subtitle:"从调查数据到可解释的体育消费者洞察",status:"SIGNAL SYNTHESIS // LIVE",metric:"357",metricLabel:"有效样本",location:"长野",locationLabel:"实地调查",language:"中・日・英",languageLabel:"问卷语言",risk:"风险维度",riskValue:"05",model:"分析模型",modelValue:"CFA / SEM",output:"研究输出",outputValue:"重游意愿",nodes:[{title:"调查设计",body:"围绕访日外国雪上运动游客构建多语言问卷。",value:"SURVEY"},{title:"实地采集",body:"在长野雪场获取真实体育旅游体验数据。",value:"FIELD"},{title:"风险识别",body:"聚焦语言、天气、身体、财务与时间风险。",value:"RISK 05"},{title:"结构验证",body:"使用 CFA 检验测量结构与变量关系。",value:"CFA"},{title:"路径分析",body:"通过 SEM 解释感知风险如何影响重游意愿。",value:"SEM"},{title:"洞察转化",body:"把统计结果转化为雪场与体育旅游运营建议。",value:"INSIGHT"}],hint:"选择山脊上的研究节点查看信号"},
  ja:{eyebrow:"04B / RESEARCH SIGNAL",title:"リサーチ・シグナル",subtitle:"調査データから解釈可能なスポーツ消費者インサイトへ",status:"SIGNAL SYNTHESIS // LIVE",metric:"357",metricLabel:"有効回答",location:"長野",locationLabel:"現地調査",language:"中・日・英",languageLabel:"質問紙言語",risk:"リスク次元",riskValue:"05",model:"分析モデル",modelValue:"CFA / SEM",output:"研究成果",outputValue:"再訪意向",nodes:[{title:"調査設計",body:"訪日外国人スノースポーツ観光客向けの多言語質問紙を設計。",value:"SURVEY"},{title:"現地収集",body:"長野のスキー場で実際の観光体験データを収集。",value:"FIELD"},{title:"リスク特定",body:"言語・天候・身体・財務・時間のリスクに着目。",value:"RISK 05"},{title:"構造検証",body:"CFAで測定構造と変数関係を検証。",value:"CFA"},{title:"パス分析",body:"SEMで知覚リスクが再訪意向に与える影響を分析。",value:"SEM"},{title:"洞察変換",body:"統計結果をスキー場とスポーツツーリズムの改善提案へ。",value:"INSIGHT"}],hint:"山稜の研究ノードを選択してシグナルを確認"},
  en:{eyebrow:"04B / RESEARCH SIGNAL",title:"RESEARCH SIGNAL",subtitle:"From field data to interpretable sport-consumer insight",status:"SIGNAL SYNTHESIS // LIVE",metric:"357",metricLabel:"VALID RESPONSES",location:"NAGANO",locationLabel:"FIELD STUDY",language:"ZH · JA · EN",languageLabel:"SURVEY LANGUAGES",risk:"RISK DIMENSIONS",riskValue:"05",model:"ANALYSIS MODEL",modelValue:"CFA / SEM",output:"RESEARCH OUTPUT",outputValue:"REVISIT INTENT",nodes:[{title:"Survey Design",body:"A multilingual questionnaire built for international snow-sport visitors.",value:"SURVEY"},{title:"Field Collection",body:"First-hand sport-tourism data collected at a Nagano ski destination.",value:"FIELD"},{title:"Risk Mapping",body:"Language, weather, physical, financial and time risks identified.",value:"RISK 05"},{title:"Structure Check",body:"CFA validates the measurement structure and construct relationships.",value:"CFA"},{title:"Path Analysis",body:"SEM explains how perceived risk shapes revisit intention.",value:"SEM"},{title:"Insight Translation",body:"Statistical results become actionable recommendations for operators.",value:"INSIGHT"}],hint:"SELECT A RIDGE NODE TO INSPECT THE SIGNAL"}
};
function researchSignalMarkup(copy){
  const nodes=copy.nodes.map((node,index)=>`<button class="research-signal-node" type="button" data-signal-node="${index}" aria-label="${node.title}" aria-pressed="${index===0}"><span>${String(index+1).padStart(2,"0")}</span></button>`).join("");
  return `<div class="research-signal-shell">
    <img class="research-signal-mountain" src="public/images/research-signal/research-signal-mountain.png" alt="${copy.title}">
    <div class="research-signal-vignette" aria-hidden="true"></div>
    <header class="research-signal-header"><div class="compact-section-heading"><span id="researchSignalTitle">${copy.eyebrow}</span><small>${lang==="zh"?"研究":lang==="ja"?"研究":"Research"}</small><i aria-hidden="true"></i></div><p>${copy.subtitle}</p></header>
    <aside class="research-signal-rail research-signal-rail--left" aria-label="Research field metrics">
      <article><small>DATA / 01</small><strong>${copy.metric}</strong><span>${copy.metricLabel}</span></article>
      <article><small>FIELD / 02</small><strong>${copy.location}</strong><span>${copy.locationLabel}</span></article>
      <article><small>LANG / 03</small><strong>${copy.language}</strong><span>${copy.languageLabel}</span></article>
    </aside>
    <aside class="research-signal-rail research-signal-rail--right" aria-label="Research analysis metrics">
      <article><small>${copy.risk}</small><strong>${copy.riskValue}</strong><span class="research-signal-bars"><i></i><i></i><i></i><i></i><i></i></span></article>
      <article><small>${copy.model}</small><strong>${copy.modelValue}</strong><span>SPSS · Mplus</span></article>
      <article><small>${copy.output}</small><strong>${copy.outputValue}</strong><span>INSIGHT / 100%</span></article>
    </aside>
    <div class="research-signal-nodes" role="group" aria-label="Research signal nodes">${nodes}</div>
    <div class="research-signal-beam" aria-hidden="true"><i></i><i></i></div>
    <article class="research-signal-insight" aria-live="polite"><small>${copy.hint}</small><strong data-signal-value>${copy.nodes[0].value}</strong><h3 data-signal-title>${copy.nodes[0].title}</h3><p data-signal-body>${copy.nodes[0].body}</p></article>
    <div class="research-signal-exit" aria-hidden="true"><span>SIGNAL ROUTED TO PROFILE</span><i></i></div>
  </div>`;
}
let researchSignalCleanup=null;
function setupResearchSignal(){
  if(researchSignalCleanup)researchSignalCleanup();
  const section=$("#research-signal"),shell=section?.querySelector(".research-signal-shell"),mountain=section?.querySelector(".research-signal-mountain"),header=section?.querySelector(".research-signal-header"),rails=[...section?.querySelectorAll(".research-signal-rail article")||[]],nodes=[...section?.querySelectorAll("[data-signal-node]")||[]],beam=section?.querySelector(".research-signal-beam"),insight=section?.querySelector(".research-signal-insight"),exit=section?.querySelector(".research-signal-exit");
  if(!section||!shell||!window.gsap)return;
  const copy=researchSignalCopy[lang],titleEl=section.querySelector("[data-signal-title]"),bodyEl=section.querySelector("[data-signal-body]"),valueEl=section.querySelector("[data-signal-value]");
  const cleanups=[];
  const activate=index=>{
    const item=copy.nodes[index];if(!item)return;
    nodes.forEach((node,i)=>{const active=i===index;node.classList.toggle("is-active",active);node.setAttribute("aria-pressed",String(active))});
    insight.classList.remove("is-updating");void insight.offsetWidth;insight.classList.add("is-updating");
    titleEl.textContent=item.title;bodyEl.textContent=item.body;valueEl.textContent=item.value;
  };
  nodes.forEach((node,index)=>{const select=()=>activate(index);node.addEventListener("click",select);node.addEventListener("pointerenter",select);cleanups.push(()=>{node.removeEventListener("click",select);node.removeEventListener("pointerenter",select)})});
  activate(0);
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let entered=false,observer=null,ambient=[];
  let insightX=null,insightY=null;
  const followsPointer=matchMedia("(min-width: 901px) and (hover: hover) and (prefers-reduced-motion: no-preference)").matches;
  const moveInsight=event=>{
    if(!insightX||!insightY)return;
    insightX((event.clientX/innerWidth-.5)*34);
    insightY((event.clientY/innerHeight-.5)*38);
  };
  const resetInsight=()=>{insightX?.(0);insightY?.(0)};
  if(followsPointer){
    insightX=gsap.quickTo(insight,"x",{duration:.42,ease:"power3.out"});
    insightY=gsap.quickTo(insight,"y",{duration:.42,ease:"power3.out"});
    shell.addEventListener("pointermove",moveInsight,{passive:true});
    shell.addEventListener("pointerleave",resetInsight);
  }
  if(reduced){gsap.set([header,...rails,nodes,beam,insight,exit],{clearProps:"all"});section.classList.add("is-signal-ready")}
  else{
    gsap.set(header,{autoAlpha:0,y:-22});gsap.set(rails,{autoAlpha:0,x:index=>index<3?-28:28});gsap.set(nodes,{autoAlpha:0,scale:.65});gsap.set(beam,{autoAlpha:0,scaleY:.12,transformOrigin:"50% 100%"});gsap.set(insight,{autoAlpha:0,y:24});gsap.set(exit,{autoAlpha:0,y:16});
    const enter=()=>{
      if(entered)return;entered=true;section.classList.add("is-signal-ready");
      gsap.to(header,{autoAlpha:1,y:0,duration:.75,ease:"power3.out"});
      gsap.to(rails,{autoAlpha:1,x:0,duration:.7,stagger:.07,ease:"power3.out"});
      gsap.to(nodes,{autoAlpha:1,scale:1,duration:.52,stagger:{amount:.5,from:"end"},ease:"back.out(1.7)"});
      gsap.to(beam,{autoAlpha:1,scaleY:1,duration:1.15,ease:"power3.inOut"});
      gsap.to(insight,{autoAlpha:1,y:0,duration:.7,delay:.48,ease:"power3.out"});
      gsap.to(exit,{autoAlpha:1,y:0,duration:.6,delay:.75,ease:"power2.out"});
      ambient.push(gsap.to(mountain,{scale:1.035,duration:11,yoyo:true,repeat:-1,ease:"sine.inOut"}),gsap.to(nodes,{filter:"brightness(1.35)",duration:1.8,yoyo:true,repeat:-1,stagger:{each:.18,repeat:-1,yoyo:true},ease:"sine.inOut"}));
    };
    observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting)enter()},{threshold:.16});observer.observe(section);
  }
  researchSignalCleanup=()=>{observer?.disconnect();cleanups.forEach(fn=>fn());ambient.forEach(tween=>tween.kill());shell.removeEventListener("pointermove",moveInsight);shell.removeEventListener("pointerleave",resetInsight);gsap.killTweensOf([header,...rails,...nodes,beam,insight,exit,mountain])};
}
function render(){
  orbitalExperienceCleanup?.();
  chapterRouteCleanup?.();
  researchSignalCleanup?.();
  document.querySelector("[data-chapter-route]")?.remove();
  const t=D[lang],ids=["about","skills","experience","projects","research","contact"],projectLabel={zh:"项目",ja:"プロジェクト",en:"Projects"}[lang];
  document.documentElement.lang=lang==="zh"?"zh-CN":lang;
  const navItems=[t.nav[0],t.nav[5],t.nav[2],projectLabel,t.nav[3],t.nav[6]];$("nav").innerHTML=navItems.map((x,i)=>`<a href="#${ids[i]}">${x}</a>`).join("");
  $(".langs").innerHTML=["zh","ja","en"].map(x=>`<button data-lang="${x}" class="${x===lang?"active":""}" aria-pressed="${x===lang}">${x==="zh"?"中":x==="ja"?"日":"EN"}</button>`).join("");
  let heroRevealStep=0;
  const heroChars=(text,sharedStep=null,extraClass="")=>[...text].map(char=>`<span class="hero-title-char ${extraClass}" data-reveal-step="${sharedStep??heroRevealStep++}">${char===" "?"&nbsp;":char}</span>`).join("");
  const heroLine=(text,index)=>{
    if(lang==="zh"&&index===0&&text.includes("接入")){
      const [before,after]=text.split("接入");
      const beforeMarkup=heroChars(before);
      const accessStep=heroRevealStep++;
      const enterHint={zh:"点击眼镜进入",ja:"ゴーグルをクリック",en:"CLICK HEADSET TO ENTER"}[lang];
      return `${beforeMarkup}<span class="hero-vr-anchor"><button class="hero-vr-headset-wrap" type="button" aria-label="${enterHint}"><img class="hero-vr-headset" src="public/images/metaverse/vr-headset-enter.png" alt="" draggable="false"><span class="hero-vr-entry-hint">${enterHint}<i aria-hidden="true">↘</i></span></button>${heroChars("接入",accessStep,"hero-title-access-char")}</span>${heroChars(after)}`;
    }
    return heroChars(text);
  };
  $(".hero-content").innerHTML=`<div class="hero-access-title" tabindex="0"><h1><span class="hero-title-line">${heroLine(t.heroAccessTitle[0],0)}</span><span class="hero-title-line">${heroLine(t.heroAccessTitle[1],1)}</span></h1><span class="hero-title-scan" aria-hidden="true"></span><i class="hero-corner hero-corner-tl" aria-hidden="true"></i><i class="hero-corner hero-corner-tr" aria-hidden="true"></i><i class="hero-corner hero-corner-br" aria-hidden="true"></i><i class="hero-corner hero-corner-bl" aria-hidden="true"></i><small>ACCESS GRANTED</small></div>`;
  $("#about").className="section reveal about-premium";
  $("#about").innerHTML=aboutSection(aboutCopy[lang]);
  $("#experience").className="section reveal long-experience-section";
  $("#experience").innerHTML=longExperienceMarkup(t);
  $("#projects").innerHTML=`<div class="cyber-projects"><header class="cyber-projects__head compact-section-heading"><span>03 / PROJECTS</span><small>${t.projectUi.title}</small><i aria-hidden="true"></i></header><div class="cyber-project-deck-shell"><button class="cyber-project-arrow is-prev" type="button" data-project-prev aria-label="Previous project"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M20.5 6 10.5 16l10 10M11 16h15"/></svg></button><div class="cyber-project-grid cyber-project-deck" data-project-deck tabindex="0" role="group" aria-label="Project character selection">${t.projects.map((project,index)=>projectCard(project,t.projectUi,index)).join("")}</div><button class="cyber-project-arrow is-next" type="button" data-project-next aria-label="Next project"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="m11.5 6 10 10-10 10M21 16H6"/></svg></button><div class="cyber-project-hologram" aria-hidden="true"><span class="hologram-beam"></span><i class="hologram-ring hologram-ring--outer"></i><i class="hologram-ring hologram-ring--lock"></i><i class="hologram-ring hologram-ring--data"></i><i class="hologram-ring hologram-ring--inner"></i><b class="hologram-core"></b><em class="hologram-shadow"></em></div></div><div class="cyber-project-selector"><span>PROJECT SELECTED</span><div class="cyber-project-selector__dots" role="group" aria-label="Project selection">${t.projects.map((_,index)=>`<button type="button" data-project-dot aria-label="Select project ${index+1}">${String(index+1).padStart(2,"0")}</button>`).join("")}</div></div><div class="cyber-project-instructions"><span class="desktop-project-hint">SELECT SIDE CARD</span><span>↻ ${t.projectUi.flip}</span><span class="desktop-project-hint">↔ ${t.projectUi.drag}</span><span class="mobile-project-hint">SWIPE TO SELECT</span><span class="mobile-project-hint">TAP TO VIEW DETAILS</span></div></div>`;
  $("#projects .cyber-projects__head>span").textContent="04 / PROJECTS";
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
  </svg><div class="research-bg-shade"></div><div class="research-grain" aria-hidden="true"></div></div><div class="research-interaction" role="application" aria-label="点击雪道以点亮对应区域" tabindex="0"></div><div class="research-click-ripple" aria-hidden="true"></div><img class="research-pangoo-cursor" src="public/images/research/pangoo-skier.png" alt="" aria-hidden="true"><header class="compact-section-heading research-compact-heading"><span>04 / RESEARCH</span><small>${{zh:"研究",ja:"研究",en:"Research"}[lang]}</small><i aria-hidden="true"></i></header><div class="research-documentary"><div class="research-copy"><small>${t.researchEn}</small><h3>${t.researchName}</h3><p>${t.researchBody}</p></div><div class="research-flow">${researchFlow.map((x,i)=>`<article><span>0${i+1}</span><div><b>${x[0]}</b><p>${x[1]}</p></div></article>`).join("")}</div><div class="research-stats">${researchStatCards.map((x,i)=>`<article><small>0${i+1}</small><b>${x[0]}</b><span>${x[1]}</span></article>`).join("")}</div><div class="research-tags">${researchTags.map(x=>`<span>${x}</span>`).join("")}</div></div>`;
  $("#research .research-compact-heading>span").textContent="05 / RESEARCH";
  const frameworkCopy=t.profileFramework;
  const frameworkUi=window.SKILLS_UI[lang];
  $(".profile-framework-head").innerHTML="";
  $("#skills").innerHTML=profileFrameworkMarkup(frameworkCopy,frameworkUi);
  $(".profile-framework .skills-section-index").innerHTML=`<span>02 / PROFILE</span><small>${t.skillsTitle}</small><i aria-hidden="true"></i>`;
  $("#contact").innerHTML=title(6,t.contactTitle)+`<div class="contact-grid"><div><p>${t.contactBody}</p><ul>${t.opportunities.map(x=>`<li>${x}</li>`).join("")}</ul><a class="email" href="mailto:${D.email}">${D.email} ↗</a></div><form><label>${t.form[0]}<input name="name" required></label><label>${t.form[1]}<input name="org"></label><label>${t.form[2]}<input name="email" type="email" required></label><label>${t.form[3]}<input name="subject" required></label><label class="wide">${t.form[4]}<textarea name="message" rows="5" required></textarea></label><button class="wide" type="submit">${t.form[5]} ↗</button></form></div>`;
  const contact=t.contact;
  $("#contact").innerHTML=`<div class="contact-shell"><div class="contact-copy-panel"><p class="contact-eyebrow">06 /</p><h2>${contact.headline}</h2><p class="contact-message">${contact.message}</p><div class="contact-person"><span class="contact-person-icon" aria-hidden="true">◎</span><span class="contact-person-copy"><small>${contact.nameLabel}</small><strong>${contact.name}</strong><em>${contact.school}</em><b>${contact.identity}</b></span></div><div class="contact-methods"><div class="contact-method"><button class="contact-copy" type="button" data-copy-value="${contact.phone}" aria-label="${contact.copy} ${contact.phone}"><span><small>${contact.phoneLabel}</small><strong>${contact.phone}</strong></span><span class="contact-copy-action"><i class="contact-copy-icon">⧉</i>${contact.copy}</span></button><a href="tel:09042821181" aria-label="${contact.call}">↗</a></div><div class="contact-method"><button class="contact-copy" type="button" data-copy-value="${contact.email}" aria-label="${contact.copy} ${contact.email}"><span><small>${contact.emailLabel}</small><strong>${contact.email}</strong></span><span class="contact-copy-action"><i class="contact-copy-icon">⧉</i>${contact.copy}</span></button><a href="mailto:${contact.email}" aria-label="${contact.mail}">↗</a></div></div><div class="contact-status"><span>${contact.tokyo}</span><span>${contact.available}</span></div></div><div class="contact-character-stage"><div class="contact-glow" aria-hidden="true"></div><div class="contact-character-follow"><div class="contact-character-float"><img class="contact-character-image" src="images/contact-character.png" alt="${contact.imageAlt}" draggable="false"><div class="contact-character-placeholder"><span>YZ</span><p>${contact.imageFallback}</p></div></div></div></div></div><div class="contact-toast" role="status" aria-live="polite" aria-atomic="true"></div><form hidden aria-hidden="true"></form>`;
  $("footer").innerHTML=`<b>YAN ZHU</b><span>${t.footer}</span><span>© 2026</span>`;
  setupResearchInteraction();
  setupLongExperience(t);
  setupProjectExplorer(t);
  setupProfileFramework(frameworkCopy,frameworkUi);
  setupContact(t);
  setupInteractiveBadge();
  setupHeroForeground();
  setupHeroMessage(t);
  setupChapterZoneRail();
  document.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{lang=b.dataset.lang;localStorage.setItem("lang",lang);render()});
}
let badgeCleanup=null;
function setupInteractiveBadge(){
  if(badgeCleanup)badgeCleanup();
  const section=$("#about"),stage=section?.querySelector(".badge-stage"),wrap=section?.querySelector(".badge-wrap"),card=section?.querySelector(".badge-card"),more=section?.querySelector(".badge-more"),close=section?.querySelector(".badge-more button");
  if(!stage||!wrap||!card||!more)return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,coarse=matchMedia("(pointer: coarse)").matches;
  let dragging=false,moved=false,startX=0,startY=0,x=0,y=0,raf=0;
  const limits=()=>innerWidth<700?{x:28,y:90}:{x:60,y:180};
  const apply=()=>{const r=limits(),dx=Math.max(-r.x,Math.min(r.x,x)),dy=Math.max(0,Math.min(r.y,y));wrap.style.setProperty("--badge-x",`${dx}px`);wrap.style.setProperty("--badge-y",`${dy}px`);wrap.style.setProperty("--badge-rotate",`${dx/r.x*7}deg`);stage.style.setProperty("--lanyard-x",`${dx}px`);stage.style.setProperty("--lanyard-extra",`${dy}px`);stage.style.setProperty("--clip-y",`${dy}px`);raf=0};
  const schedule=()=>{if(!raf)raf=requestAnimationFrame(apply)};
  const toggle=force=>{const flipped=force??!section.classList.contains("badge-flipped");section.classList.toggle("badge-flipped",flipped);card.setAttribute("aria-pressed",String(flipped));more.setAttribute("aria-hidden","true")};
  function down(e){if(e.button!==undefined&&e.button!==0)return;dragging=true;moved=false;startX=e.clientX-x;startY=e.clientY-y;card.setPointerCapture?.(e.pointerId);section.classList.add("badge-dragging")}
  function move(e){
    if(!dragging){if(coarse||reduced)return;const r=card.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;card.style.setProperty("--tilt-x",`${-py*4}deg`);card.style.setProperty("--tilt-y",`${px*4}deg`);return}
    x=e.clientX-startX;y=e.clientY-startY;moved=moved||Math.hypot(x,y)>8;schedule();e.preventDefault();
  }
  function up(e){if(!dragging)return;dragging=false;section.classList.remove("badge-dragging");card.releasePointerCapture?.(e.pointerId);if(!moved&&coarse)toggle();x=0;y=0;wrap.classList.add("returning");schedule();setTimeout(()=>wrap.classList.remove("returning"),750)}
  const enter=()=>{if(!coarse&&!dragging)toggle(true)};
  const leave=()=>{if(!dragging){if(!coarse)toggle(false);card.style.setProperty("--tilt-x","0deg");card.style.setProperty("--tilt-y","0deg")}};
  const key=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggle()}if(e.key==="Escape")toggle(false)};
  card.addEventListener("pointerenter",enter);card.addEventListener("pointerdown",down);card.addEventListener("pointermove",move);card.addEventListener("pointerup",up);card.addEventListener("pointercancel",up);card.addEventListener("pointerleave",leave);card.addEventListener("keydown",key);close?.addEventListener("click",e=>{e.stopPropagation();toggle(false)});
  requestAnimationFrame(()=>section.classList.add("about-entered"));
  badgeCleanup=()=>{cancelAnimationFrame(raf);card.removeEventListener("pointerenter",enter);card.removeEventListener("pointerdown",down);card.removeEventListener("pointermove",move);card.removeEventListener("pointerup",up);card.removeEventListener("pointercancel",up);card.removeEventListener("pointerleave",leave);card.removeEventListener("keydown",key)};
}
let researchInteractionCleanup=null;
function setupResearchInteraction(){
  if(researchInteractionCleanup)researchInteractionCleanup();
  const section=$("#research"),svg=$(".research-scene-svg"),path=$("#researchSkiPath"),wide=$(".research-reveal-wide"),core=$(".research-reveal-core"),full=$(".research-final-reveal"),hit=$(".research-interaction"),cursor=$(".research-pangoo-cursor"),ripple=$(".research-click-ripple");
  if(!section||!svg||!path||!wide||!core||!full||!hit||!cursor)return;
  const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches,coarse=matchMedia("(pointer: coarse)").matches,clamp=n=>Math.max(0,Math.min(1,n));
  let current=0,target=0,frame=0,inside=false,running=false,pointerX=0,pointerY=0,cursorX=0,cursorY=0;
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
    if(running)frame=requestAnimationFrame(animate);
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
  const visibilityObserver=new IntersectionObserver(entries=>{
    const visible=entries[0]?.isIntersecting&&document.visibilityState!=="hidden";
    if(visible&&!running){running=true;frame=requestAnimationFrame(animate)}
    else if(!visible&&running){running=false;cancelAnimationFrame(frame)}
  },{rootMargin:"180px 0px"});
  applyProgress(0);
  visibilityObserver.observe(section);
  researchInteractionCleanup=()=>{running=false;cancelAnimationFrame(frame);visibilityObserver.disconnect();hit.removeEventListener("pointermove",pointerMove);hit.removeEventListener("pointerdown",activate);hit.removeEventListener("pointerleave",leave)};
}
render();
$(".theme").onclick=()=>{document.body.classList.toggle("light");localStorage.setItem("theme",document.body.classList.contains("light")?"light":"dark")};
if(localStorage.getItem("theme")==="light")document.body.classList.add("light");
$(".menu").onclick=()=>{const open=$(".site-header").classList.toggle("open");$(".menu").setAttribute("aria-expanded",open)};
document.addEventListener("click",e=>{if(e.target.matches("nav a"))$(".site-header").classList.remove("open")});
const reel=document.querySelector(".sport-reel"),reelRows=[...document.querySelectorAll(".sport-reel-row")];let reelTick=false;
function setupSportReelTitle(){
  const title=reel?.querySelector(":scope>p"),gsapApi=window.gsap;
  if(!title||!gsapApi)return;
  const label=title.textContent.trim(),words=label.split(/\s+/);
  title.setAttribute("aria-label",label);
  title.innerHTML=`<span class="sport-reel-title-words" aria-hidden="true">${words.map(word=>`<span class="sport-reel-title-word">${word}</span>`).join(" ")}</span><i class="sport-reel-title-scan" aria-hidden="true"></i>`;
  const wordElements=[...title.querySelectorAll(".sport-reel-title-word")],scan=title.querySelector(".sport-reel-title-scan"),reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduced){gsapApi.set(wordElements,{autoAlpha:1});return}
  const timeline=gsapApi.timeline({paused:true})
    .fromTo(wordElements,{autoAlpha:0,yPercent:78,rotationX:-62,transformOrigin:"50% 100%"},{autoAlpha:1,yPercent:0,rotationX:0,duration:.58,stagger:{amount:.46,from:"start"},ease:"power3.out",force3D:true},0)
    .fromTo(scan,{autoAlpha:0,xPercent:-115},{autoAlpha:1,xPercent:115,duration:.72,ease:"power2.inOut"},.18)
    .to(scan,{autoAlpha:0,duration:.12},.78)
    .fromTo(wordElements,{textShadow:"0 0 0 rgba(255,47,190,0)"},{textShadow:"0 0 20px rgba(255,47,190,.34),0 0 34px rgba(45,132,255,.2)",duration:.28,stagger:.025,yoyo:true,repeat:1,ease:"sine.inOut"},.42);
  let played=false;
  const visibilityObserver=new IntersectionObserver(entries=>{
    if(entries[0]?.isIntersecting&&!played){played=true;timeline.play()}
  },{threshold:.28});
  visibilityObserver.observe(title);
  title.addEventListener("pointerenter",()=>{if(timeline.progress()===1)timeline.restart()});
}
setupSportReelTitle();
function moveReel(){if(!reel)return;const offset=(scrollY-reel.offsetTop+innerHeight)*.22;reelRows.forEach(row=>row.style.transform=`translate3d(${row.dataset.direction==="right"?offset-260:-(offset-260)}px,0,0)`);reelTick=false}
addEventListener("scroll",()=>{if(!reelTick){requestAnimationFrame(moveReel);reelTick=true}},{passive:true});moveReel();
const heroBackgrounds=[...document.querySelectorAll(".hero-cinematic-bg")],heroBackgroundButtons=[...document.querySelectorAll(".hero-scene-switcher button")];let heroBackgroundIndex=0,heroBackgroundLocked=false;
function changeHeroBackground(next){if(!heroBackgrounds.length||heroBackgroundLocked||next===heroBackgroundIndex)return;heroBackgroundLocked=true;heroBackgrounds[heroBackgroundIndex]?.classList.remove("active");heroBackgroundButtons[heroBackgroundIndex]?.classList.remove("active");heroBackgroundIndex=next;$(".hero").dataset.heroScene=next;heroBackgrounds[next]?.classList.add("active");heroBackgroundButtons[next]?.classList.add("active");setTimeout(()=>heroBackgroundLocked=false,1000)}
heroBackgroundButtons.forEach((button,index)=>button.onclick=()=>changeHeroBackground(index));
if(heroBackgrounds.length&&!matchMedia("(prefers-reduced-motion: reduce)").matches)setInterval(()=>changeHeroBackground((heroBackgroundIndex+1)%heroBackgrounds.length),6000);
document.querySelectorAll(".reveal").forEach(x=>x.classList.add("seen"));
const motionObserver=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("is-in-view",e.isIntersecting)),{rootMargin:"220px 0px"});document.querySelectorAll("main section,.sport-reel").forEach(s=>motionObserver.observe(s));
const sectionObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("current",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-30% 0px -60%"});document.querySelectorAll("main section[id]").forEach(s=>sectionObserver.observe(s));
