import { roleData } from "../data/roles.js";

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

export function setupRoles() {
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
