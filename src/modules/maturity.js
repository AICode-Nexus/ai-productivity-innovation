import { maturityLevels } from "../data/maturity.js";

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

export function setupMaturity() {
  const form = document.getElementById("maturity-form");
  if (!form) return;
  form.addEventListener("change", renderMaturity);
  renderMaturity();
}
