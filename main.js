const trendData = {
  individual: {
    title: "01 个人效率已经普及，但价值还停留在个人层",
    body: "AI 已经进入写作、检索、总结、分析和内容生产。真正的问题不再是员工会不会打开工具，而是企业能不能把高频经验沉淀成可复用流程。",
    facts: [
      "Gallup 2026 指标显示，美国员工中约 28% 每周至少数次在工作中使用 AI，约 50% 每年至少使用数次。",
      "个人提效常先发生在白领知识工作、内容生产、数据处理和客户沟通场景。",
      "这一阶段的管理重点是允许试用、收集案例、避免敏感数据外泄。",
    ],
  },
  workflow: {
    title: "02 从工具到流程，开始出现企业级收益",
    body: "当 AI 与知识库、CRM、工单、文档、会议和数据表连接，提效才从个人技巧变成团队能力。此时要定义输入、输出、质检和人工确认点。",
    facts: [
      "Gallup 同期数据提示，组织集成 AI 工具的比例高于员工高频使用比例，说明部署和真实采用之间存在断点。",
      "流程嵌入的关键不是功能数量，而是让员工知道在什么任务、用什么材料、按什么标准使用 AI。",
      "管理者支持、示范和复盘机制会显著影响 AI 的真实使用率。",
    ],
  },
  agent: {
    title: "03 Agent 协作把执行交给系统，把判断留给人",
    body: "Agent 的价值不是替代所有岗位，而是承担可定义、可调用工具、可检查结果的任务链。人负责目标、边界、质量和例外处理。",
    facts: [
      "Microsoft Work Trend Index 2026 把 agent、人的判断力和组织重构放在同一条主线上。",
      "适合 Agent 的任务通常具备清晰目标、可访问工具、明确停止条件和可审查输出。",
      "企业需要人机交接协议：什么时候自动执行，什么时候升级给人，谁对结果负责。",
    ],
  },
  organization: {
    title: "04 组织级创新来自新的工作设计",
    body: "进入组织重构阶段后，AI 不再只是 IT 项目，而会影响岗位职责、管理节奏、绩效指标、培训体系和数据治理。",
    facts: [
      "Microsoft 2026 调研强调，AI 影响的关键因素更多来自组织文化、管理支持和治理机制。",
      "Stanford AI Index 2026 的经济章节持续跟踪 AI 投资、采用和劳动市场影响，说明 AI 正从技术议题变成经营议题。",
      "中国信通院行业报告呈现了 AI 在制造、交通、能源等行业融合应用的趋势，国内落地更强调行业场景和产业协同。",
    ],
  },
};

const pathData = {
  input: {
    title: "输入标准化：先让 AI 吃到正确材料",
    body: "把任务背景、目标、受众、限制、样例和数据来源写清楚。输入越像工作说明书，输出越像可交付物。",
    checks: ["建立岗位常用输入清单", "区分公开信息、内部资料和敏感数据", "给 AI 一个好样例，而不是只给一句口令"],
  },
  process: {
    title: "处理自动化：把重复步骤交给 AI",
    body: "让 AI 承担检索、归纳、初稿、分类、摘要、对比、检查等步骤。流程里保留关键人工判断。",
    checks: ["拆出 3 到 5 个可自动化动作", "明确工具和知识源", "避免一次 prompt 承担过多目标"],
  },
  quality: {
    title: "质量可评估：没有标准就没有提效",
    body: "定义好坏标准、输出格式、不能错的事实、语气要求和审核清单。AI 结果不是直接交付，而是先进入质检。",
    checks: ["建立通过/不通过标准", "保留人工抽检和复核", "记录返工原因"],
  },
  handoff: {
    title: "人机可交接：让责任边界清楚",
    body: "AI 可以执行，不能天然负责。每个自动化流程都要有触发条件、停止条件、升级规则和责任人。",
    checks: ["定义自动执行和人工确认边界", "设置异常升级规则", "输出可追踪记录"],
  },
  loop: {
    title: "复盘可迭代：把经验变成资产",
    body: "每次使用后沉淀模板、示例、失败案例和指标变化。企业 AI 能力来自持续复盘，而不是一次性买工具。",
    checks: ["每周更新模板库", "统计节省时间和质量问题", "把高价值用法纳入 SOP"],
  },
};

const roleData = {
  sales: {
    title: "销售：从线索分层开始",
    summary: "销售最适合从客户画像、跟进优先级、异议处理和复盘开始做 AI 提效。",
    columns: [
      ["第一步", "整理客户来源、历史沟通、预算、需求和下一步动作，让 AI 做线索分层。"],
      ["模板", "生成三类客户跟进话术：高意向、观望、沉默客户。每类附带风险提醒。"],
      ["指标", "看跟进及时率、有效回复率、下一步预约率和成交周期。"],
    ],
  },
  service: {
    title: "客服：从工单摘要和知识库问答开始",
    summary: "客服提效的重点是减少重复查询、提高交接质量，并保持回复一致性。",
    columns: [
      ["第一步", "把高频问题、政策、产品说明和升级规则整理成知识库。"],
      ["模板", "让 AI 生成回复初稿、工单摘要、情绪风险和升级建议。"],
      ["指标", "看首次响应时长、一次解决率、升级率和客户满意度。"],
    ],
  },
  ops: {
    title: "运营：从活动策划和复盘开始",
    summary: "运营场景材料多、节奏快，适合用 AI 做内容组合、排期和复盘洞察。",
    columns: [
      ["第一步", "提供目标人群、活动目标、渠道、预算和历史活动数据。"],
      ["模板", "输出活动方案、社群内容、短视频脚本、复盘报告和下一轮假设。"],
      ["指标", "看内容产能、转化漏斗、复用率和复盘建议采纳率。"],
    ],
  },
  hr: {
    title: "人力：从招聘和新人培养开始",
    summary: "人力场景适合把经验型工作标准化，尤其是 JD、面试、培训和制度问答。",
    columns: [
      ["第一步", "整理岗位画像、能力要求、面试记录和培训资料。"],
      ["模板", "生成 JD、面试题、评分表、入职学习路径和制度问答。"],
      ["指标", "看筛选效率、面试一致性、新人上手周期和培训通过率。"],
    ],
  },
  product: {
    title: "研发/产品：从需求到验收标准开始",
    summary: "研发产品提效要避免只让 AI 写代码，而是让它连接需求、设计、测试和发布。",
    columns: [
      ["第一步", "输入业务目标、用户故事、约束、现有系统和非目标。"],
      ["模板", "生成 PRD 草稿、边界问题、测试用例、发布说明和风险清单。"],
      ["指标", "看需求返工率、缺陷率、评审效率和上线后问题。"],
    ],
  },
  management: {
    title: "管理：从经营简报和会议机制开始",
    summary: "管理提效不是少开会，而是让信息更快变成判断和行动。",
    columns: [
      ["第一步", "统一会议纪要、经营指标、项目状态和风险口径。"],
      ["模板", "生成经营简报、问题归因、决策选项、行动项和追踪清单。"],
      ["指标", "看会议时长、行动项完成率、风险暴露速度和决策周期。"],
    ],
  },
};

const maturityLevels = [
  {
    max: 4,
    stage: "工具尝鲜",
    title: "阶段 1：工具尝鲜",
    advice: "先选 2 个岗位和 3 个高频任务，沉淀提示词模板和好样例，避免让每个人各自摸索。",
  },
  {
    max: 9,
    stage: "流程嵌入",
    title: "阶段 2：流程嵌入",
    advice: "把模板放进 SOP，明确输入材料、输出格式、质检标准和人工审核点，开始统计节省时间和返工原因。",
  },
  {
    max: 14,
    stage: "Agent 协作",
    title: "阶段 3：Agent 协作",
    advice: "选择一个可工具调用的流程，设计触发条件、停止条件、人机交接和异常升级，先小范围试点。",
  },
  {
    max: 18,
    stage: "组织重构",
    title: "阶段 4：组织重构",
    advice: "把 AI 能力纳入岗位职责、管理节奏、数据治理和绩效复盘，建立跨部门的 AI 工作设计机制。",
  },
];

const roadmapData = {
  starter: {
    title: "工具尝鲜阶段：把零散用法变成模板",
    weeks: [
      ["第 1 周", "选定 2 个高频场景，收集 10 个真实任务，写出第一版提示词。"],
      ["第 1 月", "建立岗位模板库和好样例，安排一次团队共创，明确敏感数据边界。"],
      ["第 2-3 月", "把最有效的模板放进 SOP，开始统计节省时间、返工率和使用频率。"],
    ],
  },
  workflow: {
    title: "流程嵌入阶段：把 AI 放进日常系统",
    weeks: [
      ["第 1 周", "画出目标流程，标出 AI 负责的步骤、人工审核点和工具入口。"],
      ["第 1 月", "接入知识库、表格、CRM、工单或文档流程，形成可复用操作手册。"],
      ["第 2-3 月", "建立质量抽检和复盘机制，决定是否扩展到相邻岗位。"],
    ],
  },
  agent: {
    title: "Agent 协作阶段：设计可控的任务链",
    weeks: [
      ["第 1 周", "选一个低风险、可回滚的任务链，定义触发条件和停止条件。"],
      ["第 1 月", "补齐工具权限、日志、异常升级和人机交接协议，进行小范围试运行。"],
      ["第 2-3 月", "评估产出质量、成本、延迟和业务收益，保留高价值 agent。"],
    ],
  },
  org: {
    title: "组织重构阶段：让 AI 成为经营能力",
    weeks: [
      ["第 1 周", "成立跨部门 AI 工作设计小组，盘点战略流程和高价值岗位。"],
      ["第 1 月", "建立 AI 治理、培训、复盘和指标体系，明确责任边界。"],
      ["第 2-3 月", "把 AI 能力纳入管理例会、人才发展、预算和经营复盘。"],
    ],
  },
};

function html(items) {
  return items.join("");
}

function renderTrend(key) {
  const detail = document.getElementById("trend-detail");
  const trend = trendData[key];
  if (!detail || !trend) return;

  detail.innerHTML = `
    <h3>${trend.title}</h3>
    <p>${trend.body}</p>
    <ul class="fact-list">
      ${trend.facts.map((fact) => `<li>${fact}</li>`).join("")}
    </ul>
  `;
}

function setupTrend() {
  const buttons = Array.from(document.querySelectorAll(".trend-step"));
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderTrend(button.dataset.trend);
    });
  });
  renderTrend("individual");
}

function renderPath(key) {
  const detail = document.getElementById("path-detail");
  const path = pathData[key];
  if (!detail || !path) return;

  detail.innerHTML = `
    <h3>${path.title}</h3>
    <p>${path.body}</p>
    <ul class="detail-list">
      ${path.checks.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function setupPathway() {
  const buttons = Array.from(document.querySelectorAll(".path-node"));
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderPath(button.dataset.path);
    });
  });
  renderPath("input");
}

function getMaturityScore(form) {
  const data = new FormData(form);
  let score = 0;
  for (const value of data.values()) score += Number(value);
  return score;
}

function renderMaturity() {
  const form = document.getElementById("maturity-form");
  const result = document.getElementById("maturity-result");
  if (!form || !result) return;

  const score = getMaturityScore(form);
  const level = maturityLevels.find((item) => score <= item.max) || maturityLevels[maturityLevels.length - 1];
  result.innerHTML = `
    <span class="result-stage">${level.stage} · ${score}/18</span>
    <h3>${level.title}</h3>
    <p>${level.advice}</p>
  `;
}

function setupMaturity() {
  const form = document.getElementById("maturity-form");
  if (!form) return;
  form.addEventListener("change", renderMaturity);
  renderMaturity();
}

function renderRole(key) {
  const output = document.getElementById("role-output");
  const role = roleData[key];
  if (!output || !role) return;

  output.innerHTML = `
    <h3>${role.title}</h3>
    <p>${role.summary}</p>
    <div class="role-columns">
      ${role.columns
        .map(
          ([title, body]) => `
            <div>
              <h4>${title}</h4>
              <p>${body}</p>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function setupRoles() {
  const buttons = Array.from(document.querySelectorAll("#role-tabs button"));
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderRole(button.dataset.role);
    });
  });
  renderRole("sales");
}

function buildPrompt(form) {
  const data = new FormData(form);
  const role = data.get("role");
  const task = data.get("task");
  const material = data.get("material");
  const standard = data.get("standard");

  return `你现在是一名${role}的 AI 工作助理。

任务：
${task}

可使用的输入材料：
${material}

输出要求：
1. 先复述你理解的目标和关键约束。
2. 输出可以直接执行的方案，不要只给原则。
3. 如果信息不足，请列出需要我补充的字段。
4. 标出可能出错、需要人工确认或涉及合规风险的地方。

质量标准：
${standard}

请按以下结构输出：
- 目标理解
- 关键假设
- 执行方案
- 可复制话术/模板
- 风险与人工确认点
- 下一步行动清单`;
}

function renderPrompt() {
  const form = document.getElementById("prompt-form");
  const output = document.getElementById("prompt-output");
  if (!form || !output) return;
  output.textContent = buildPrompt(form);
}

function setupPrompt() {
  const form = document.getElementById("prompt-form");
  if (!form) return;
  form.addEventListener("input", renderPrompt);
  form.addEventListener("change", renderPrompt);
  renderPrompt();
}

function renderRoadmap() {
  const select = document.getElementById("roadmap-stage");
  const output = document.getElementById("roadmap-output");
  if (!select || !output) return;

  const roadmap = roadmapData[select.value];
  output.innerHTML = `
    <h3>${roadmap.title}</h3>
    <ul class="roadmap-list">
      ${roadmap.weeks.map(([time, action]) => `<li><strong>${time}：</strong>${action}</li>`).join("")}
    </ul>
  `;
}

function getRoadmapText() {
  const select = document.getElementById("roadmap-stage");
  const roadmap = roadmapData[select?.value || "starter"];
  return html([
    `${roadmap.title}\n`,
    ...roadmap.weeks.map(([time, action]) => `${time}: ${action}`),
  ].map((line) => `${line}\n`));
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast("已复制到剪贴板");
  } catch {
    showToast("复制失败，请手动选择文本");
  }
}

function setupCopy() {
  document.querySelectorAll("[data-copy-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.copyTarget);
      copyText(target?.textContent || "");
    });
  });

  document.getElementById("roadmap-copy")?.addEventListener("click", () => {
    copyText(getRoadmapText());
  });
}

function setupRoadmap() {
  const select = document.getElementById("roadmap-stage");
  select?.addEventListener("change", renderRoadmap);
  renderRoadmap();
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1800);
}

function setupPresentMode() {
  const button = document.getElementById("present-toggle");
  if (!button) return;
  button.addEventListener("click", () => {
    const active = document.body.classList.toggle("present-mode");
    button.setAttribute("aria-pressed", String(active));
    button.textContent = active ? "退出投屏" : "投屏模式";
  });
}

function setupReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  reveals.forEach((item) => observer.observe(item));
}

function setupCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const nodes = [];
  const lanes = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes.length = 0;
    lanes.length = 0;

    const nodeCount = Math.max(44, Math.floor(width / 28));
    for (let i = 0; i < nodeCount; i += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: 1.2 + Math.random() * 2.8,
        color: i % 5 === 0 ? "#f0c95a" : i % 7 === 0 ? "#7db0ff" : "#69dfb7",
      });
    }

    const laneCount = Math.max(5, Math.floor(height / 130));
    for (let i = 0; i < laneCount; i += 1) {
      lanes.push({
        y: 90 + i * ((height - 160) / Math.max(1, laneCount - 1)),
        offset: Math.random() * width,
        speed: 0.35 + Math.random() * 0.55,
        color: i % 2 ? "rgba(240, 201, 90, 0.28)" : "rgba(125, 176, 255, 0.24)",
      });
    }
  }

  function drawGrid() {
    ctx.strokeStyle = "rgba(222, 238, 232, 0.06)";
    ctx.lineWidth = 1;
    const gap = 56;
    for (let x = 0; x < width; x += gap) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gap) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  function drawLanes() {
    lanes.forEach((lane) => {
      const x = (lane.offset + frame * lane.speed) % (width + 180);
      ctx.strokeStyle = lane.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(Math.max(0, x - 180), lane.y);
      ctx.lineTo(Math.min(width, x), lane.y);
      ctx.stroke();
    });
  }

  function tick() {
    frame += 1;
    ctx.fillStyle = "#07100f";
    ctx.fillRect(0, 0, width, height);
    drawGrid();
    drawLanes();

    nodes.forEach((node) => {
      if (!reducedMotion) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
    });

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 145) {
          ctx.strokeStyle = `rgba(105, 223, 183, ${0.15 * (1 - distance / 145)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach((node) => {
      ctx.fillStyle = node.color;
      ctx.globalAlpha = 0.74;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (!reducedMotion) requestAnimationFrame(tick);
  }

  resize();
  tick();
  window.addEventListener("resize", resize);
}

setupTrend();
setupPathway();
setupMaturity();
setupRoles();
setupPrompt();
setupRoadmap();
setupCopy();
setupPresentMode();
setupReveal();
setupCanvas();
