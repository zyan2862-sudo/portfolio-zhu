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
      ${copy.keywords.map((item,index)=>`<button type="button" class="sport-letter" data-key="${item.word.toLowerCase()}" data-sport-index="${index}" aria-label="${item.letter} — ${item.word}" aria-pressed="false"><b>${item.letter}</b></button>`).join("")}
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
    button.addEventListener("click",()=>window.matchMedia("(max-width: 767px), (hover: none)").matches&&select(index));
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
  profileFrameworkCleanup=()=>{clearTimeout(timer);if(pointerRaf)cancelAnimationFrame(pointerRaf);window.removeEventListener("resize",updateNodeCenters);stage.removeEventListener("pointermove",onPointerMove);stage.removeEventListener("pointerleave",onStageLeave);observer.disconnect()};
}
const aboutCopy={
  zh:{label:"ABOUT ME",local:"关于我",heading:"体育让我看见，<br>人与世界如何连接。",sub:"Connecting People, Operations and Insights Through Sport.",body:["朱妍，现居东京，法政大学体育健康学研究科体育管理方向硕士研究生。","我关注国际体育赛事、体育活动运营、项目管理与体育消费者研究。曾参与北京2022冬奥会相关项目，并在日本持续积累体育活动运营、地区体育和赛事现场经验。","我的优势在于将项目执行、数据分析和中日英沟通结合起来，在复杂的体育项目中连接参与者、组织和现场。"],view:"查看我的经历",contact:"联系我",location:"东京，日本",languages:"中文 / 日本語 / English",focus:"当前关注",badgeRole:"体育管理专业研究生"},
  ja:{label:"ABOUT ME",local:"私について",heading:"スポーツを通して、<br>人と世界のつながりを見る。",sub:"Connecting People, Operations and Insights Through Sport.",body:["朱妍。東京在住、法政大学大学院スポーツ健康学研究科でスポーツマネジメントを学ぶ修士課程の学生です。","国際スポーツ大会、イベント運営、プロジェクトマネジメント、スポーツ消費者研究に取り組んでいます。北京2022関連プロジェクトを経験し、日本でも地域スポーツと大会現場で実践を重ねています。","プロジェクト実行、データ分析、中日英のコミュニケーションを組み合わせ、人・組織・現場をつなぐことが私の強みです。"],view:"経験を見る",contact:"お問い合わせ",location:"東京、日本",languages:"中文 / 日本語 / English",focus:"CURRENT FOCUS",badgeRole:"スポーツマネジメント専攻 大学院生"},
  en:{label:"ABOUT ME",local:"About",heading:"Sport shows me how<br>people connect with the world.",sub:"Connecting People, Operations and Insights Through Sport.",body:["I am Yan Zhu, a Tokyo-based master’s student in Sport Management at Hosei University.","My work spans international sport events, field operations, project management, and sport consumer research. Beijing 2022 was a formative experience, followed by continued hands-on work in Japanese sport and community settings.","I bring project execution, data analysis, and Chinese–Japanese–English communication together to connect participants, organizations, and the field."],view:"View Experience",contact:"Contact Me",location:"Tokyo, Japan",languages:"中文 / 日本語 / English",focus:"CURRENT FOCUS",badgeRole:"Graduate Student in Sport Management"}
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
          <div><dt>${ui.result}</dt><dd>${project.result}</dd></div>
          <div><dt>${ui.skills}</dt><dd class="cyber-project-card__skills">${project.skills.map(item=>`<span>${item}</span>`).join("")}</dd></div>
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
  let activeIndex=Math.min(2,total-1),flippedCardId=null,openCard=null,isTransitioning=false,ignoreClickUntil=0,hoverSelectLockedUntil=0,wheelLocked=false,transitionTimer=0,wheelTimer=0,autoTimer=0,autoPaused=false;
  const circularOffset=(index,current)=>{
    let offset=index-current;
    if(offset>total/2)offset-=total;
    if(offset<-total/2)offset+=total;
    return offset
  };
  const cardPose=offset=>{
    const distance=Math.abs(offset),side=Math.sign(offset);
    if(distance===0)return{x:"0%",scale:1.08,rotate:"0deg",opacity:1,z:10};
    if(distance===1)return{x:`${side*76}%`,scale:.88,rotate:`${side*-8}deg`,opacity:.76,z:6};
    if(distance===2)return{x:`${side*128}%`,scale:.72,rotate:`${side*-13}deg`,opacity:.34,z:3};
    return{x:`${side*154}%`,scale:.64,rotate:`${side*-16}deg`,opacity:0,z:0}
  };
  const paintLayers=()=>{
    cards.forEach((card,index)=>{
      const offset=circularOffset(index,activeIndex),pose=cardPose(offset),distance=Math.abs(offset);
      card.dataset.layer=distance===0?"center":distance===1?"near":distance===2?"outer":"hidden";
      card.dataset.side=offset<0?"left":offset>0?"right":"center";
      card.classList.toggle("is-center",offset===0);
      card.style.setProperty("--circular-offset",offset);
      card.style.setProperty("--card-x",pose.x);
      card.style.setProperty("--card-scale",pose.scale);
      card.style.setProperty("--card-rotate",pose.rotate);
      card.style.setProperty("--card-opacity",pose.opacity);
      card.style.setProperty("--card-z",pose.z);
      card.setAttribute("aria-hidden",distance>2?"true":"false");
      card.querySelector(".cyber-project-card__front").tabIndex=distance>2?-1:0
    });
    dots.forEach((dot,index)=>{
      dot.classList.toggle("is-current",index===activeIndex);
      dot.setAttribute("aria-current",index===activeIndex?"true":"false");
    });
    root.style.setProperty("--active-index",activeIndex);
    root.querySelector("[data-project-counter]")?.replaceChildren(document.createTextNode(`PROJECT ${String(activeIndex+1).padStart(2,"0")} / ${String(total).padStart(2,"0")}`))
  };
  const closeCard=card=>{
    if(!card)return;
    card.querySelector(".cyber-project-card__inner").classList.remove("is-flipped");
    card.classList.remove("is-active");
    card.querySelector(".cyber-project-card__front").setAttribute("aria-expanded","false");
    card.querySelector(".cyber-project-card__back").setAttribute("aria-hidden","true");
    if(openCard===card){openCard=null;flippedCardId=null;root.classList.remove("has-active-card")}
  };
  const selectCard=index=>{
    if(!total||isTransitioning)return;
    const next=(index%total+total)%total;
    if(next===activeIndex)return;
    if(openCard)closeCard(openCard);
    clearTimeout(transitionTimer);
    isTransitioning=true;
    root.classList.add("is-switching");
    activeIndex=next;
    paintLayers();
    transitionTimer=setTimeout(()=>{isTransitioning=false;root.classList.remove("is-switching")},reduced?80:580)
  };
  const stopAuto=()=>clearTimeout(autoTimer);
  const scheduleAuto=()=>{
    stopAuto();
    if(reduced||autoPaused||document.hidden)return;
    autoTimer=setTimeout(()=>{
      if(openCard||isTransitioning||autoPaused||document.hidden){scheduleAuto();return}
      selectCard(activeIndex+1);
      scheduleAuto()
    },5500)
  };
  const restartAuto=()=>{stopAuto();scheduleAuto()};
  const open=card=>{
    restartAuto();
    if(performance.now()<ignoreClickUntil)return;
    const index=cards.indexOf(card);
    if(index!==activeIndex){selectCard(index);return}
    if(isTransitioning)return;
    if(openCard&&openCard!==card)closeCard(openCard);
    const inner=card.querySelector(".cyber-project-card__inner"),front=card.querySelector(".cyber-project-card__front"),back=card.querySelector(".cyber-project-card__back");
    if(inner.classList.contains("is-flipped")){closeCard(card);return}
    inner.classList.add("is-flipped");card.classList.add("is-active");root.classList.add("has-active-card");front.setAttribute("aria-expanded","true");back.setAttribute("aria-hidden","false");openCard=card;flippedCardId=card.dataset.projectId;
    card.scrollIntoView({behavior:reduced?"auto":"smooth",block:"nearest",inline:"center"});
  };
  cards.forEach(card=>{
    const front=card.querySelector(".cyber-project-card__front"),back=card.querySelector(".cyber-project-card__back");
    card.addEventListener("pointerenter",event=>{
      if(coarse||event.pointerType==="touch"||openCard||performance.now()<hoverSelectLockedUntil)return;
      const index=cards.indexOf(card);
      if(index===activeIndex)return;
      hoverSelectLockedUntil=performance.now()+820;
      restartAuto();
      selectCard(index)
    });
    front.addEventListener("click",()=>open(card));
    front.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();open(card)}});
    card.querySelector(".cyber-project-card__close").addEventListener("click",event=>{event.stopPropagation();closeCard(card);front.focus()});
    back.addEventListener("click",event=>{if(!event.target.closest("button")){closeCard(card);front.focus()}});
    if(!coarse&&!reduced){
      front.addEventListener("pointermove",event=>{
        if(card.classList.contains("is-active"))return;
        const box=card.getBoundingClientRect(),x=(event.clientX-box.left)/box.width-.5,y=(event.clientY-box.top)/box.height-.5;
        card.style.setProperty("--tilt-x",`${(-y*4).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y",`${(x*4).toFixed(2)}deg`);
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
  let pointerDown=false,dragStartX=0,dragStartY=0,dragDistance=0,horizontalDrag=false;
  deck.addEventListener("pointerdown",event=>{
    if(event.button!==undefined&&event.button!==0)return;
    stopAuto();pointerDown=true;horizontalDrag=false;dragDistance=0;dragStartX=event.clientX;dragStartY=event.clientY;
    deck.setPointerCapture?.(event.pointerId)
  });
  deck.addEventListener("pointermove",event=>{
    if(!pointerDown)return;
    const dx=event.clientX-dragStartX,dy=event.clientY-dragStartY;
    dragDistance=dx;
    if(!horizontalDrag&&Math.abs(dx)>10&&Math.abs(dx)>Math.abs(dy)*1.15)horizontalDrag=true;
    if(horizontalDrag){
      deck.classList.add("is-dragging");
      deck.style.setProperty("--drag-x",`${Math.max(-90,Math.min(90,dx*.28))}px`);
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
      if(Math.abs(dragDistance)>=60)selectCard(activeIndex+(dragDistance<0?1:-1))
    }
    horizontalDrag=false;dragDistance=0;scheduleAuto()
  };
  deck.addEventListener("pointerup",stopDrag);deck.addEventListener("pointercancel",stopDrag);
  deck.addEventListener("wheel",event=>{
    const amount=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
    if(Math.abs(amount)<18||wheelLocked)return;
    event.preventDefault();
    restartAuto();
    wheelLocked=true;
    selectCard(activeIndex+(amount>0?1:-1));
    clearTimeout(wheelTimer);wheelTimer=setTimeout(()=>wheelLocked=false,520)
  },{passive:false});
  dots.forEach((dot,index)=>dot.addEventListener("click",()=>{restartAuto();selectCard(index)}));
  root.querySelector("[data-project-prev]")?.addEventListener("click",()=>{restartAuto();selectCard(activeIndex-1)});
  root.querySelector("[data-project-next]")?.addEventListener("click",()=>{restartAuto();selectCard(activeIndex+1)});
  deck.addEventListener("keydown",event=>{
    if(event.key==="ArrowLeft"){event.preventDefault();restartAuto();selectCard(activeIndex-1)}
    if(event.key==="ArrowRight"){event.preventDefault();restartAuto();selectCard(activeIndex+1)}
    if((event.key==="Enter"||event.key===" ")&&event.target===deck){event.preventDefault();open(cards[activeIndex])}
  });
  const visibilityAuto=()=>document.hidden?stopAuto():scheduleAuto();
  document.addEventListener("visibilitychange",visibilityAuto);
  paintLayers();
  scheduleAuto();
  projectExplorerCleanup=()=>{
    stopAuto();clearTimeout(transitionTimer);clearTimeout(wheelTimer);
    document.removeEventListener("visibilitychange",visibilityAuto)
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
      <span>02 / EXPERIENCE</span>
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
        <div class="long-panel-frame">
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
  const paint=key=>{
    if(!key||key===visible)return;
    visible=key;
    const item=items.find(x=>x.id===key);if(!item)return;
    nodes.forEach(node=>{const on=node.dataset.longKey===key;node.classList.toggle("is-active",on);node.setAttribute("aria-pressed",String(on));if(on)node.setAttribute("aria-current","true");else node.removeAttribute("aria-current")});
    energy.style.setProperty("--energy-length",String([.23,.58,.94][items.indexOf(item)]));
    panel.classList.add("is-switching");
    clearTimeout(longExperienceTimer);
    longExperienceTimer=setTimeout(()=>{
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
    },reduced?0:145);
  };
  const selectNode=node=>{
    active=node.dataset.longKey;
    longExperienceActive=active;
    paint(active);
  };
  nodes.forEach(node=>{
    node.addEventListener("pointerenter",event=>{if(event.pointerType!=="touch")selectNode(node)});
    node.addEventListener("focus",()=>selectNode(node));
    node.addEventListener("click",()=>selectNode(node));
  });
  longExperienceCleanup=()=>clearTimeout(longExperienceTimer);
}
let heroForegroundCleanup=null;
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
  let readyTimer=0,doneTimer=0,accessFrame=0;
  const booted=sessionStorage.getItem("heroSystemBooted")==="true";
  hero.classList.remove("is-booting","hero-main-ready","hero-boot-complete","is-accessing","reduced-boot");
  if(reduced){
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
  heroForegroundCleanup=()=>{
    clearTimeout(readyTimer);
    clearTimeout(doneTimer);
    cancelAnimationFrame(accessFrame);
    title.removeEventListener("pointerenter",activate);
    title.removeEventListener("pointerleave",deactivate);
    title.removeEventListener("focus",activate);
    title.removeEventListener("blur",deactivate);
  };
}
function render(){
  const t=D[lang],ids=["about","experience","projects","research","skills","contact"],projectLabel={zh:"项目",ja:"プロジェクト",en:"Projects"}[lang];
  document.documentElement.lang=lang==="zh"?"zh-CN":lang;
  const navItems=[t.nav[0],t.nav[2],projectLabel,t.nav[3],t.nav[5],t.nav[6]];$("nav").innerHTML=navItems.map((x,i)=>`<a href="#${ids[i]}">${x}</a>`).join("");
  $(".langs").innerHTML=["zh","ja","en"].map(x=>`<button data-lang="${x}" class="${x===lang?"active":""}" aria-pressed="${x===lang}">${x==="zh"?"中":x==="ja"?"日":"EN"}</button>`).join("");
  $(".hero-content").innerHTML=`<div class="hero-access-title" tabindex="0"><h1><span>${t.heroAccessTitle[0]}</span><span>${t.heroAccessTitle[1]}</span></h1><span class="hero-title-scan" aria-hidden="true"></span><i class="hero-corner hero-corner-tl" aria-hidden="true"></i><i class="hero-corner hero-corner-tr" aria-hidden="true"></i><i class="hero-corner hero-corner-br" aria-hidden="true"></i><i class="hero-corner hero-corner-bl" aria-hidden="true"></i><small>ACCESS GRANTED</small></div>`;
  $("#about").className="section reveal about-premium";
  $("#about").innerHTML=aboutSection(aboutCopy[lang]);
  $("#experience").className="section reveal long-experience-section";
  $("#experience").innerHTML=longExperienceMarkup(t);
  $("#projects").innerHTML=`<div class="cyber-projects"><header class="cyber-projects__head compact-section-heading"><span>03 / PROJECTS</span><small>${t.projectUi.title}</small><i aria-hidden="true"></i></header><div class="cyber-project-deck-shell"><button class="cyber-project-arrow is-prev" type="button" data-project-prev aria-label="Previous project"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M20.5 6 10.5 16l10 10M11 16h15"/></svg></button><div class="cyber-project-grid cyber-project-deck" data-project-deck tabindex="0" role="group" aria-label="Project character selection">${t.projects.map((project,index)=>projectCard(project,t.projectUi,index)).join("")}</div><button class="cyber-project-arrow is-next" type="button" data-project-next aria-label="Next project"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="m11.5 6 10 10-10 10M21 16H6"/></svg></button><div class="cyber-project-hologram" aria-hidden="true"><i></i><i></i><i></i></div></div><div class="cyber-project-instructions"><span class="desktop-project-hint">◎ ${t.projectUi.hover}</span><span>↻ ${t.projectUi.flip}</span><span class="desktop-project-hint">↔ ${t.projectUi.drag}</span><span class="mobile-project-hint">↔ ${t.projectUi.swipe}</span><span class="mobile-project-hint">↻ ${t.projectUi.tap}</span></div></div>`;
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
  const frameworkCopy=t.profileFramework;
  const frameworkUi=window.SKILLS_UI[lang];
  $(".profile-framework-head").innerHTML="";
  $("#skills").innerHTML=profileFrameworkMarkup(frameworkCopy,frameworkUi);
  $(".profile-framework .skills-section-index").innerHTML=`<span>05 / PROFILE</span><small>${t.skillsTitle}</small><i aria-hidden="true"></i>`;
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
function moveReel(){if(!reel)return;const offset=(scrollY-reel.offsetTop+innerHeight)*.22;reelRows.forEach(row=>row.style.transform=`translate3d(${row.dataset.direction==="right"?offset-260:-(offset-260)}px,0,0)`);reelTick=false}
addEventListener("scroll",()=>{if(!reelTick){requestAnimationFrame(moveReel);reelTick=true}},{passive:true});moveReel();
const heroBackgrounds=[...document.querySelectorAll(".hero-cinematic-bg")],heroBackgroundButtons=[...document.querySelectorAll(".hero-scene-switcher button")];let heroBackgroundIndex=0,heroBackgroundLocked=false;
function changeHeroBackground(next){if(!heroBackgrounds.length||heroBackgroundLocked||next===heroBackgroundIndex)return;heroBackgroundLocked=true;heroBackgrounds[heroBackgroundIndex]?.classList.remove("active");heroBackgroundButtons[heroBackgroundIndex]?.classList.remove("active");heroBackgroundIndex=next;$(".hero").dataset.heroScene=next;heroBackgrounds[next]?.classList.add("active");heroBackgroundButtons[next]?.classList.add("active");setTimeout(()=>heroBackgroundLocked=false,1000)}
heroBackgroundButtons.forEach((button,index)=>button.onclick=()=>changeHeroBackground(index));
if(heroBackgrounds.length&&!matchMedia("(prefers-reduced-motion: reduce)").matches)setInterval(()=>changeHeroBackground((heroBackgroundIndex+1)%heroBackgrounds.length),6000);
const observer=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("seen")),{threshold:.08});document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));
const motionObserver=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("is-in-view",e.isIntersecting)),{rootMargin:"220px 0px"});document.querySelectorAll("main section,.sport-reel").forEach(s=>motionObserver.observe(s));
const sectionObserver=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){document.querySelectorAll("nav a").forEach(a=>a.classList.toggle("current",a.getAttribute("href")==="#"+e.target.id))}}),{rootMargin:"-30% 0px -60%"});document.querySelectorAll("main section[id]").forEach(s=>sectionObserver.observe(s));
