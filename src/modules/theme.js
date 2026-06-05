const THEME_STORAGE_KEY = "ai-productivity-theme";
const themes = new Set(["dark", "light"]);

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Theme switching still works when storage is unavailable.
  }
}

function getPreferredTheme() {
  const storedTheme = getStoredTheme();
  if (themes.has(storedTheme)) return storedTheme;

  if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
    return "light";
  }

  return "dark";
}

export function setupTheme() {
  const button = document.querySelector("[data-theme-toggle]");
  if (!button) return;

  const applyTheme = (theme, persist = false) => {
    if (!themes.has(theme)) return;

    document.documentElement.dataset.theme = theme;
    button.dataset.activeTheme = theme;
    button.setAttribute("aria-pressed", String(theme === "dark"));
    button.setAttribute("aria-label", theme === "dark" ? "切换到白色主题" : "切换到黑色主题");

    if (persist) storeTheme(theme);
    window.dispatchEvent?.(new CustomEvent("themechange", { detail: { theme } }));
  };

  button.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  });

  applyTheme(getPreferredTheme());
}
