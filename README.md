# 企业 AI 提效与创新互动分享站

面向管理者和业务团队的静态互动分享站，覆盖国内外 AI 提效趋势、企业提效地图、企业 AI Ready 准备框架与代表工具图谱、Claude Code / Codex 账号与中转站风险、个人 Agent / 自托管运行时、国内算力供给、AI 新兴岗位、T 型人才培养、行业适配检查、泛企业案例、提示词模板和 90 天落地路线图。

## Account & Compute Note

截至 2026 年 6 月，页面把 Claude Code、Codex、账号套餐、地区支持、中转站和国内算力问题作为 AI Ready 的基础约束来讲：

- Claude Code 与 Codex 优先通过官方账号、企业订阅或官方 API 管理，避免团队把生产流程建立在个人账号、共享账号或不可审计链路上。
- 灰色中转站只能作为风险提醒，不应承载客户数据、源代码、财务/医疗/教育等敏感材料，也不应进入生产系统。
- 国内落地需要准备多模型策略：海外官方 API、国内云 MaaS、国产模型、私有化部署和人工降级路径应按场景分层使用。

## Preview

本项目无构建依赖，使用零依赖 Node 静态服务预览：

```bash
npm run dev
```

然后访问 `http://localhost:4173/`。

## Package

生成 GitHub Pages 可发布的静态站点包：

```bash
npm run build
```

构建产物输出到 `dist/`，只包含页面运行需要的静态文件。

## Structure

- `index.html`：页面结构与分享内容
- `styles.css`：样式入口，汇总 `styles/` 下的分区样式
- `src/main.js`：交互入口，按模块初始化页面能力
- `src/data/`：趋势、创新路径、岗位、行业适配、成熟度和路线图数据
- `src/modules/`：自测、场景选择、提示词生成、复制、全屏模式和动态视觉
- `server.mjs`：本地静态预览服务
- `assets/`：站点图标与可选视觉资源

## Publish

GitHub Actions 会在 push / pull request 时运行测试并打包静态站点；`main` 分支通过 GitHub Pages workflow 发布：

<https://aicode-nexus.github.io/ai-productivity-innovation/>

## Sources

- [Microsoft Work Trend Index 2026](https://www.microsoft.com/en-us/worklab/work-trend-index/agents-human-agency-and-the-opportunity-for-every-organization)
- [Gallup Artificial Intelligence Indicator](https://www.gallup.com/699797/indicator-artificial-intelligence.aspx)
- [Stanford AI Index Report 2026, Economy chapter](https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf)
- [中国信通院《人工智能赋能行业发展》](https://www.caict.ac.cn/kxyj/qwfb/ztbg/202501/P020250103478870154671.pdf)
- [OpenClaw Docs](https://docs.openclaw.ai/)
- [Hermes Agent GitHub](https://github.com/NousResearch/hermes-agent)
- [Hey Hermes](https://heyhermes.app/)
