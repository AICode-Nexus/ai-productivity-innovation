# 企业 AI 提效与创新互动分享站

面向管理者和业务团队的静态互动分享站，覆盖国内外 AI 提效趋势、企业提效地图、企业 AI Ready 准备框架与代表工具图谱、AI 新兴岗位、行业适配检查、泛企业案例、提示词模板和 90 天落地路线图。

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
