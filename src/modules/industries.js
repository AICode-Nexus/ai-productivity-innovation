import { industryData } from "../data/industries.js";

function renderList(items, className) {
  return `
    <ul class="${className}">
      ${items.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

function renderIndustries(key) {
  const output = document.getElementById("industry-output");
  const industry = industryData[key];
  if (!output || !industry) return;

  output.innerHTML = `
    <div class="industry-summary">
      <span>${industry.name}</span>
      <h3>${industry.summary}</h3>
      <p>${industry.advice}</p>
    </div>
    <div class="industry-grid">
      <section>
        <h4>优先岗位</h4>
        ${renderList(industry.priorities, "pill-list")}
      </section>
      <section>
        <h4>第一批试点</h4>
        ${renderList(industry.pilots, "detail-list")}
      </section>
      <section>
        <h4>关键风险</h4>
        ${renderList(industry.risks, "detail-list warning-list")}
      </section>
      <section>
        <h4>暂缓投入</h4>
        ${renderList(industry.defer, "detail-list muted-list")}
      </section>
    </div>
  `;
}

export function setupIndustries() {
  const select = document.getElementById("industry-select");
  if (!select) return;
  select.addEventListener("change", () => renderIndustries(select.value));
  renderIndustries(select.value || "manufacturing");
}
