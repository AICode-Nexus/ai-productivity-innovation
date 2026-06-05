import { roadmapData } from "../data/roadmap.js";

export function renderRoadmap() {
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

export function getRoadmapText() {
  const select = document.getElementById("roadmap-stage");
  const roadmap = roadmapData[select?.value || "starter"];
  return [`${roadmap.title}\n`, ...roadmap.weeks.map(([time, action]) => `${time}: ${action}`)]
    .map((line) => `${line}\n`)
    .join("");
}

export function setupRoadmap() {
  const select = document.getElementById("roadmap-stage");
  select?.addEventListener("change", renderRoadmap);
  renderRoadmap();
}
