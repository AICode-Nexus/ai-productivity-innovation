import { pathData } from "../data/pathway.js";

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

export function setupPathway() {
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
