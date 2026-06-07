export function setupWechatFloat() {
  const contact = document.querySelector("[data-wechat-contact]");
  const button = contact?.querySelector(".wechat-toggle");
  const panel = contact?.querySelector(".wechat-panel");

  if (!contact || !button || !panel) return;

  const setOpen = (isOpen) => {
    button.setAttribute("aria-expanded", String(isOpen));
    panel.hidden = !isOpen;
  };

  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("click", (event) => {
    if (!contact.contains(event.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      button.focus();
    }
  });
}
