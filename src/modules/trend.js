import { trendData } from "../data/trends.js";

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

export function setupTrend() {
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
