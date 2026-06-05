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

export function setupPrompt() {
  const form = document.getElementById("prompt-form");
  if (!form) return;
  form.addEventListener("input", renderPrompt);
  form.addEventListener("change", renderPrompt);
  renderPrompt();
}
