export function setupPresentMode() {
  const button = document.getElementById("present-toggle");
  if (!button) return;

  const setActive = (active) => {
    document.body.classList.toggle("present-mode", active);
    button.setAttribute("aria-pressed", String(active));
    button.setAttribute("aria-label", active ? "退出全屏" : "进入全屏");
  };

  const enterFullscreen = async () => {
    setActive(true);
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
      } catch {
        // Keep the visual fullscreen mode active when native fullscreen is unavailable.
      }
    }
  };

  const exitFullscreen = async () => {
    if (document.fullscreenElement && document.exitFullscreen) {
      try {
        await document.exitFullscreen();
        return;
      } catch {
        // Fall through to reset the visual fullscreen mode.
      }
    }
    setActive(false);
  };

  button.addEventListener("click", () => {
    const active = document.fullscreenElement || document.body.classList.contains("present-mode");
    if (active) {
      exitFullscreen();
      return;
    }
    enterFullscreen();
  });

  document.addEventListener("fullscreenchange", () => {
    setActive(Boolean(document.fullscreenElement));
  });
}
