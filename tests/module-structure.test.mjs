import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const themeStorageKey = "ai-productivity-theme-v2";

const requiredFiles = [
  "server.mjs",
  "src/main.js",
  "src/data/trends.js",
  "src/data/pathway.js",
  "src/data/roles.js",
  "src/data/maturity.js",
  "src/data/roadmap.js",
  "src/data/industries.js",
  "src/modules/trend.js",
  "src/modules/pathway.js",
  "src/modules/maturity.js",
  "src/modules/roles.js",
  "src/modules/industries.js",
  "src/modules/prompt.js",
  "src/modules/roadmap.js",
  "src/modules/copy.js",
  "src/modules/presentMode.js",
  "src/modules/theme.js",
  "src/modules/reveal.js",
  "src/modules/heroCanvas.js",
  "scripts/build-site.mjs",
  ".github/workflows/package-and-deploy.yml",
  "styles/base.css",
  "styles/layout.css",
  "styles/hero.css",
  "styles/sections.css",
  "styles/tools.css",
  "styles/responsive.css",
];

async function read(path) {
  return readFile(path, "utf8");
}

function getLightThemeBlock(css) {
  const match = css.match(/:root\[data-theme="light"\]\s*{(?<body>[\s\S]*?)\n}/);
  assert.ok(match?.groups?.body);
  return match.groups.body;
}

test("single entry loads modular JavaScript and split CSS", async () => {
  const html = await read("index.html");
  const css = await read("styles.css");

  assert.match(html, /<script\s+type="module"\s+src="\.\/src\/main\.js"><\/script>/);
  assert.doesNotMatch(html, /<script\s+src="\.\/main\.js"><\/script>/);

  for (const stylesheet of [
    "base.css",
    "layout.css",
    "hero.css",
    "sections.css",
    "tools.css",
    "responsive.css",
  ]) {
    assert.match(css, new RegExp(`@import "./styles/${stylesheet}";`));
  }
});

test("planned module files exist and are imported by the app entry", async () => {
  for (const path of requiredFiles) {
    await read(path);
  }

  const main = await read("src/main.js");
  for (const moduleName of [
    "trend",
    "pathway",
    "maturity",
    "roles",
    "industries",
    "prompt",
    "roadmap",
    "copy",
    "presentMode",
    "theme",
    "reveal",
    "heroCanvas",
  ]) {
    assert.match(main, new RegExp(`from "\\./modules/${moduleName}\\.js"`));
  }
});

test("header exposes an accessible sun and moon theme icon button", async () => {
  const html = await read("index.html");
  const layoutCss = await read("styles/layout.css");
  const baseCss = await read("styles/base.css");

  assert.match(html, /<html lang="zh-CN" data-theme="dark">/);
  assert.match(html, /class="theme-toggle"/);
  assert.match(html, /id="theme-toggle"/);
  assert.match(html, /aria-label="切换到白色主题"/);
  assert.match(html, /aria-pressed="true"/);
  assert.match(html, /data-theme-toggle/);
  assert.match(html, /class="lucide lucide-sun theme-icon theme-icon-sun"/);
  assert.match(html, /class="lucide lucide-moon theme-icon theme-icon-moon"/);
  assert.doesNotMatch(html, /data-theme-option="dark"[^>]*>\s*黑\s*<\/button>/);
  assert.doesNotMatch(html, /data-theme-option="light"[^>]*>\s*白\s*<\/button>/);
  assert.match(layoutCss, /\.theme-toggle/);
  assert.match(layoutCss, /\.theme-toggle\s*{[^}]*width:\s*44px/s);
  assert.match(layoutCss, /\.theme-toggle\s*{[^}]*height:\s*44px/s);
  assert.match(layoutCss, /\.theme-toggle\s*{[^}]*border:\s*0/s);
  assert.match(layoutCss, /\.theme-toggle\s*{[^}]*background:\s*transparent/s);
  assert.match(baseCss, /:root\[data-theme="dark"\]/);
  assert.match(baseCss, /:root\[data-theme="light"\]/);
});

test("theme module defaults to black regardless of system color preference", async () => {
  const { setupTheme } = await import("../src/modules/theme.js");
  const previousDocument = globalThis.document;
  const previousWindow = globalThis.window;
  const previousLocalStorage = globalThis.localStorage;
  const harness = createThemeHarness(null, { prefersLight: true });

  globalThis.document = harness.document;
  globalThis.window = harness.window;
  globalThis.localStorage = harness.localStorage;

  try {
    setupTheme();

    assert.equal(harness.document.documentElement.dataset.theme, "dark");
    assert.equal(harness.toggle.getAttribute("aria-pressed"), "true");
    assert.equal(harness.toggle.getAttribute("aria-label"), "切换到白色主题");
    assert.equal(harness.localStorage.getItem(themeStorageKey), null);
  } finally {
    globalThis.document = previousDocument;
    globalThis.window = previousWindow;
    globalThis.localStorage = previousLocalStorage;
  }
});

test("theme module toggles and persists black and white theme choices", async () => {
  const { setupTheme } = await import("../src/modules/theme.js");
  const previousDocument = globalThis.document;
  const previousWindow = globalThis.window;
  const previousLocalStorage = globalThis.localStorage;
  const harness = createThemeHarness("light");

  globalThis.document = harness.document;
  globalThis.window = harness.window;
  globalThis.localStorage = harness.localStorage;

  try {
    setupTheme();

    assert.equal(harness.document.documentElement.dataset.theme, "light");
    assert.equal(harness.toggle.getAttribute("aria-pressed"), "false");
    assert.equal(harness.toggle.getAttribute("aria-label"), "切换到黑色主题");

    harness.toggle.click();

    assert.equal(harness.document.documentElement.dataset.theme, "dark");
    assert.equal(harness.localStorage.getItem(themeStorageKey), "dark");
    assert.equal(harness.toggle.getAttribute("aria-pressed"), "true");
    assert.equal(harness.toggle.getAttribute("aria-label"), "切换到白色主题");

    harness.toggle.click();

    assert.equal(harness.document.documentElement.dataset.theme, "light");
    assert.equal(harness.localStorage.getItem(themeStorageKey), "light");
    assert.equal(harness.toggle.getAttribute("aria-pressed"), "false");
  } finally {
    globalThis.document = previousDocument;
    globalThis.window = previousWindow;
    globalThis.localStorage = previousLocalStorage;
  }
});

function createThemeHarness(storedTheme, options = {}) {
  const store = new Map();
  if (storedTheme) {
    store.set(themeStorageKey, storedTheme);
  }
  const toggle = createThemeToggle();

  return {
    toggle,
    document: {
      documentElement: { dataset: {} },
      querySelector(selector) {
        return selector === "[data-theme-toggle]" ? toggle : null;
      },
    },
    localStorage: {
      getItem(key) {
        return store.get(key) ?? null;
      },
      setItem(key, value) {
        store.set(key, value);
      },
    },
    window: {
      matchMedia() {
        return {
          matches: options.prefersLight ?? false,
          addEventListener() {},
          removeEventListener() {},
        };
      },
    },
  };
}

function createThemeToggle() {
  const attributes = new Map();
  const listeners = new Map();

  return {
    dataset: {},
    setAttribute(name, value) {
      attributes.set(name, String(value));
    },
    getAttribute(name) {
      return attributes.get(name) ?? null;
    },
    addEventListener(eventName, listener) {
      listeners.set(eventName, listener);
    },
    click() {
      listeners.get("click")?.({ currentTarget: this });
    },
  };
}

test("data modules preserve default startup keys", async () => {
  const [{ trendData }, { pathData }, { roleData }, { roadmapData }, { maturityLevels }] = await Promise.all([
    import("../src/data/trends.js"),
    import("../src/data/pathway.js"),
    import("../src/data/roles.js"),
    import("../src/data/roadmap.js"),
    import("../src/data/maturity.js"),
  ]);

  assert.ok(trendData.individual);
  assert.ok(pathData.input);
  assert.ok(roleData.sales);
  assert.ok(roadmapData.starter);
  assert.equal(maturityLevels.at(-1).max, 18);
});

test("README documents the Node static server workflow", async () => {
  const readme = await read("README.md");
  assert.match(readme, /npm run dev/);
  assert.match(readme, /GitHub Pages/);
});

test("GitHub Actions package workflow tests builds and deploys the static site", async () => {
  const packageJson = await read("package.json");
  const workflow = await read(".github/workflows/package-and-deploy.yml");
  const buildScript = await read("scripts/build-site.mjs");

  assert.match(packageJson, /"build":\s*"node scripts\/build-site\.mjs"/);
  assert.match(workflow, /^permissions:\n\s+contents:\s+read/m);
  assert.match(workflow, /pull_request:/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /npm test/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /actions\/upload-artifact@v4/);
  assert.match(workflow, /name:\s+static-site/);
  assert.match(workflow, /actions\/upload-pages-artifact@v3/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /github\.ref == 'refs\/heads\/main'/);
  assert.match(workflow, /id-token:\s+write/);

  for (const staticEntry of ["index.html", "styles.css", "styles", "src", "assets"]) {
    assert.match(buildScript, new RegExp(`"${staticEntry}"`));
  }

  assert.doesNotMatch(buildScript, /server\.mjs/);
  assert.doesNotMatch(buildScript, /tests/);
});

test("build output cache busts CSS and module entry assets", async () => {
  const result = spawnSync(process.execPath, ["scripts/build-site.mjs"], {
    encoding: "utf8",
    env: { ...process.env, GITHUB_SHA: "1234567890abcdef" },
  });

  assert.equal(result.status, 0, result.stderr);

  const distHtml = await read("dist/index.html");
  const distCss = await read("dist/styles.css");

  assert.match(distHtml, /href="\.\/styles\.css\?v=1234567890ab"/);
  assert.match(distHtml, /src="\.\/src\/main\.js\?v=1234567890ab"/);

  for (const stylesheet of [
    "base.css",
    "layout.css",
    "hero.css",
    "sections.css",
    "tools.css",
    "responsive.css",
  ]) {
    assert.match(distCss, new RegExp(`@import "./styles/${stylesheet}\\?v=1234567890ab";`));
  }
});

test("header control uses fullscreen wording", async () => {
  const html = await read("index.html");
  const presentMode = await read("src/modules/presentMode.js");
  const readme = await read("README.md");

  assert.match(html, /aria-label="进入全屏"/);
  assert.match(html, /class="lucide lucide-maximize mode-icon mode-icon-enter"/);
  assert.match(html, /class="lucide lucide-minimize mode-icon mode-icon-exit"/);
  assert.doesNotMatch(html, />\s*全屏模式\s*</);
  assert.doesNotMatch(html, /投屏模式/);
  assert.match(presentMode, /退出全屏/);
  assert.match(presentMode, /进入全屏/);
  assert.doesNotMatch(presentMode, /投屏/);
  assert.match(readme, /全屏模式/);
  assert.doesNotMatch(readme, /投屏模式/);
});

test("header and footer link to the project GitHub repository with the logo", async () => {
  const html = await read("index.html");
  const baseCss = await read("styles/base.css");
  const layoutCss = await read("styles/layout.css");
  const officialGithubLogo = "https://github.githubassets.com/favicons/favicon.png";

  const repositoryLinks = html.match(
    /href="https:\/\/github\.com\/AICode-Nexus\/ai-productivity-innovation"/g,
  );

  assert.equal(repositoryLinks?.length, 2);
  assert.match(html, /class="github-link header-github"/);
  assert.match(html, /class="github-link footer-github"/);
  assert.doesNotMatch(html, /<svg class="github-icon"/);
  assert.doesNotMatch(html, /src="\.\/assets\/github-mark\.svg"/);
  assert.doesNotMatch(html, /GitHub-Mark-ea2971cee799\.png/);
  assert.equal((html.match(new RegExp(`src="${officialGithubLogo}"`, "g")) ?? []).length, 2);
  assert.equal((html.match(/class="github-logo"/g) ?? []).length, 2);
  assert.equal((html.match(/aria-label="在 GitHub 上查看项目"/g) ?? []).length, 2);
  assert.match(html, /target="_blank"/);
  assert.match(html, /rel="noreferrer"/);
  assert.match(layoutCss, /\.github-link\s*{[^}]*border:\s*0/s);
  assert.match(layoutCss, /\.github-link\s*{[^}]*background:\s*transparent/s);
  assert.match(layoutCss, /\.github-logo\s*{[^}]*filter:\s*var\(--github-filter\)/s);
  assert.match(baseCss, /--github-filter:\s*invert\(1\)/);
  assert.match(baseCss, /--github-filter:\s*none/);
  assert.match(layoutCss, /\.github-logo\s*{[^}]*width:\s*24px/s);
});

test("global interface svg icons stay on the lucide visual system", async () => {
  const html = await read("index.html");
  const baseCss = await read("styles/base.css");
  const inlineSvgTags = [...html.matchAll(/<svg\b[^>]*>/g)].map((match) => match[0]);

  assert.equal(inlineSvgTags.length, 4);

  for (const svgTag of inlineSvgTags) {
    assert.match(svgTag, /class="lucide /);
    assert.match(svgTag, /width="20"/);
    assert.match(svgTag, /height="20"/);
    assert.match(svgTag, /aria-hidden="true"/);
    assert.match(svgTag, /focusable="false"/);
  }

  assert.equal((baseCss.match(/%3Cpath d='m6 9 6 6 6-6'\/%3E/g) ?? []).length, 2);
  assert.equal((baseCss.match(/stroke-width='2'/g) ?? []).length, 2);
  assert.doesNotMatch(baseCss, /stroke-width='2\.4'/);
});

test("light theme stays white dominant with subtle accent color", async () => {
  const baseCss = await read("styles/base.css");
  const lightTheme = getLightThemeBlock(baseCss);

  assert.match(lightTheme, /--bg:\s*#fbfcfb/);
  assert.match(lightTheme, /--surface:\s*#ffffff/);
  assert.match(lightTheme, /--surface-2:\s*#f4f7f6/);
  assert.match(lightTheme, /--surface-3:\s*#edf2f0/);
  assert.match(lightTheme, /--accent:\s*#0f766e/);
  assert.match(lightTheme, /--accent-2:\s*#c2410c/);
  assert.match(lightTheme, /--accent-3:\s*#be123c/);
  assert.match(lightTheme, /--accent-4:\s*#2563eb/);
  assert.match(lightTheme, /--hero-canvas-bg:\s*#fbfcfb/);
  assert.match(lightTheme, /--tools-bg:\s*#f7f9f8/);
  assert.match(lightTheme, /--canvas-node-secondary:\s*#ea580c/);
  assert.match(lightTheme, /--canvas-node-tertiary:\s*#2563eb/);
  assert.doesNotMatch(lightTheme, /--bg:\s*#f0fdfa/);
  assert.doesNotMatch(lightTheme, /--surface-2:\s*#e6fffb/);
  assert.doesNotMatch(lightTheme, /--surface-3:\s*#ccfbf1/);
  assert.doesNotMatch(lightTheme, /--tools-bg:\s*#effdf9/);
  assert.doesNotMatch(lightTheme, /--hero-canvas-bg:\s*#ecfeff/);
  assert.doesNotMatch(lightTheme, /--accent-2:\s*#8a5b00/);
});

test("fullscreen control uses native fullscreen api with visual fallback", async () => {
  const presentMode = await read("src/modules/presentMode.js");

  assert.match(presentMode, /requestFullscreen/);
  assert.match(presentMode, /exitFullscreen/);
  assert.match(presentMode, /fullscreenchange/);
  assert.match(presentMode, /present-mode/);
});

test("fullscreen header keeps the mode button anchored to the right", async () => {
  const layoutCss = await read("styles/layout.css");

  assert.match(layoutCss, /\.site-header\s*{[^}]*display:\s*grid/s);
  assert.match(layoutCss, /\.site-header\s*{[^}]*grid-template-columns:\s*max-content minmax\(0,\s*1fr\) max-content max-content max-content/s);
  assert.match(layoutCss, /\.header-github\s*{[^}]*grid-column:\s*3/s);
  assert.match(layoutCss, /\.theme-toggle\s*{[^}]*grid-column:\s*4/s);
  assert.match(layoutCss, /\.mode-toggle\s*{[^}]*grid-column:\s*5/s);
  assert.match(layoutCss, /\.mode-toggle\s*{[^}]*justify-self:\s*end/s);
  assert.match(layoutCss, /\.mode-toggle\s*{[^}]*width:\s*44px/s);
  assert.match(layoutCss, /\.mode-toggle\s*{[^}]*height:\s*44px/s);
  assert.match(layoutCss, /\.mode-toggle\s*{[^}]*border:\s*0/s);
  assert.match(layoutCss, /\.mode-toggle\s*{[^}]*background:\s*transparent/s);
});

test("fullscreen header keeps the center navigation visible", async () => {
  const layoutCss = await read("styles/layout.css");

  assert.doesNotMatch(
    layoutCss,
    /body\.present-mode\s+\.nav-links\s*{[^}]*display:\s*none/s,
  );
});

test("mobile header uses compact columns so controls remain in view", async () => {
  const responsiveCss = await read("styles/responsive.css");

  assert.match(responsiveCss, /@media \(max-width:\s*680px\)/);
  assert.match(responsiveCss, /\.site-header\s*{[^}]*grid-template-columns:\s*minmax\(72px,\s*1fr\) 44px 44px max-content/s);
  assert.match(responsiveCss, /\.site-header\s*{[^}]*column-gap:\s*6px/s);
  assert.match(responsiveCss, /\.brand\s*{[^}]*min-width:\s*0/s);
});

test("maturity radio rows have aligned touch-friendly option styling", async () => {
  const toolsCss = await read("styles/tools.css");

  assert.match(toolsCss, /\.quiz-option/);
  assert.match(toolsCss, /\.quiz-option\s*{[^}]*min-height:\s*44px/s);
  assert.match(toolsCss, /\.quiz-option\s*{[^}]*align-items:\s*center/s);
  assert.match(toolsCss, /\.quiz-option\s*{[^}]*grid-template-columns:\s*20px minmax\(0,\s*1fr\)/s);
  assert.match(toolsCss, /input\[type="radio"\]\s*{[^}]*appearance:\s*none/s);
  assert.match(toolsCss, /input\[type="radio"\]\s*{[^}]*align-self:\s*center/s);
});

test("page includes the AI Ready preparation course", async () => {
  const html = await read("index.html");

  assert.match(html, /href="#ai-ready">\s*AI Ready\s*<\/a>/);
  assert.match(html, /<section[^>]+id="ai-ready"[^>]+aria-labelledby="ai-ready-title"/);
  assert.match(html, /企业 AI Ready：上 AI 前先准备这六件事/);

  for (const readinessArea of [
    "战略与场景",
    "数据与知识",
    "工具与平台",
    "算力与模型",
    "人才与流程",
    "治理与评估",
  ]) {
    assert.match(html, new RegExp(readinessArea));
  }
});

test("AI Ready course includes a concrete tools models and agents map", async () => {
  const html = await read("index.html");

  assert.match(html, /工具、模型与 Agent 图谱/);

  for (const category of [
    "算力与模型供给",
    "代码与研发 Agent",
    "内容与视频创作工具",
    "Agent、Skills 与工作流平台",
  ]) {
    assert.match(html, new RegExp(category));
  }

  for (const toolName of [
    "Codex",
    "Claude Code",
    "Qwen Code",
    "GLM",
    "Seedance 2.0",
    "LiblibAI",
    "MCP",
    "Dify",
  ]) {
    assert.match(html, new RegExp(toolName));
  }
});

test("AI emerging jobs and industry checker are wired into the page", async () => {
  const html = await read("index.html");
  const main = await read("src/main.js");
  const { roleData, emergingRoleCards } = await import("../src/data/roles.js");
  const { industryData } = await import("../src/data/industries.js");

  assert.match(html, /href="#emerging"/);
  assert.match(html, /id="emerging"/);
  assert.match(html, /id="industry-checker"/);
  assert.match(main, /setupIndustries\(\)/);

  for (const key of ["fde", "agentEngineer", "aiProductEngineer", "contextEngineer", "aiGovernance", "aiEnablement"]) {
    assert.ok(roleData[key], `${key} role data should exist`);
  }

  assert.equal(emergingRoleCards.length, 6);
  assert.equal(Object.keys(industryData).length, 6);

  for (const industry of Object.values(industryData)) {
    assert.ok(industry.priorities.length >= 3);
    assert.ok(industry.pilots.length >= 3);
    assert.ok(industry.risks.length >= 2);
    assert.ok(industry.defer.length >= 1);
  }

  for (const role of [
    "Forward Deployed Engineer",
    "AI Agent 工程师",
    "AI 产品工程师",
    "上下文/知识工程师",
    "AI 评测与治理负责人",
    "AI Enablement / 落地教练",
  ]) {
    assert.match(html, new RegExp(`<option>${role}</option>`));
  }
});
