export function setupWechatFloat() {
  if (document.querySelector(".wechat-float")) return;

  const style = document.createElement("style");
  style.textContent = `
    .wechat-float { position: fixed; right: max(18px, env(safe-area-inset-right)); top: 50%; z-index: 60; transform: translateY(-50%); }
    .wechat-float__button { width: 56px; height: 56px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,.18); border-radius: 999px; background: linear-gradient(135deg, #08d46b, #05a85b); color: #fff; box-shadow: 0 18px 42px rgba(7,193,96,.28), 0 12px 30px rgba(0,0,0,.24); cursor: pointer; transition: transform 180ms ease, box-shadow 180ms ease; }
    .wechat-float__button:hover, .wechat-float__button:focus-visible { transform: translateY(-2px) scale(1.04); box-shadow: 0 20px 46px rgba(7,193,96,.36), 0 14px 34px rgba(0,0,0,.28); outline: none; }
    .wechat-float__button svg { width: 29px; height: 29px; fill: currentColor; }
    .wechat-float__panel { position: absolute; right: 72px; top: 50%; width: min(240px, calc(100vw - 112px)); padding: 18px; border: 1px solid var(--line); border-radius: 18px; background: color-mix(in srgb, var(--surface) 92%, transparent); box-shadow: 0 24px 70px rgba(0,0,0,.26); backdrop-filter: blur(18px); opacity: 0; visibility: hidden; transform: translateY(-50%) translateX(10px) scale(.98); transform-origin: right center; transition: opacity 180ms ease, visibility 180ms ease, transform 180ms ease; pointer-events: none; text-align: center; }
    .wechat-float:hover .wechat-float__panel, .wechat-float:focus-within .wechat-float__panel, .wechat-float.is-open .wechat-float__panel { opacity: 1; visibility: visible; transform: translateY(-50%) translateX(0) scale(1); pointer-events: auto; }
    .wechat-float__panel::after { content: ""; position: absolute; right: -8px; top: 50%; width: 14px; height: 14px; border-top: 1px solid var(--line); border-right: 1px solid var(--line); background: color-mix(in srgb, var(--surface) 92%, transparent); transform: translateY(-50%) rotate(45deg); }
    .wechat-float__panel strong { display: block; color: var(--ink); font-size: 16px; }
    .wechat-float__panel p { margin: 8px 0 12px; color: var(--muted); font-size: 13px; line-height: 1.6; }
    .wechat-float__panel a { display: inline-flex; align-items: center; justify-content: center; min-height: 40px; padding: 0 14px; border-radius: 999px; background: #07c160; color: #fff; font-weight: 900; }
    @media (max-width: 680px) { .wechat-float { right: max(14px, env(safe-area-inset-right)); top: auto; bottom: max(88px, env(safe-area-inset-bottom)); transform: none; } .wechat-float__button { width: 52px; height: 52px; } .wechat-float__panel { right: 0; top: auto; bottom: 64px; width: min(232px, calc(100vw - 28px)); transform: translateY(10px) scale(.98); transform-origin: right bottom; } .wechat-float:hover .wechat-float__panel, .wechat-float:focus-within .wechat-float__panel, .wechat-float.is-open .wechat-float__panel { transform: translateY(0) scale(1); } .wechat-float__panel::after { right: 20px; top: auto; bottom: -8px; transform: rotate(135deg); } }
  `;

  const float = document.createElement("aside");
  float.className = "wechat-float";
  float.setAttribute("aria-label", "微信联系");
  float.innerHTML = `
    <button class="wechat-float__button" type="button" aria-label="显示微信联系方式" aria-expanded="false">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9.5 4.5c-4.1 0-7.4 2.7-7.4 6.1 0 1.9 1 3.6 2.7 4.7l-.7 2.1 2.5-1.2c.9.3 1.9.5 2.9.5.2 0 .5 0 .7-.1-.2-.7-.3-1.4-.3-2.1 0-3.4 3.1-6.1 7-6.3C15.9 6 12.9 4.5 9.5 4.5Zm7.4 5.1c-3.3 0-6 2.2-6 4.9s2.7 4.9 6 4.9c.8 0 1.5-.1 2.2-.4l2 1-.5-1.7c1.4-.9 2.3-2.3 2.3-3.9 0-2.7-2.7-4.8-6-4.8Z"/></svg>
    </button>
    <div class="wechat-float__panel" role="tooltip">
      <strong>添加刘亚东微信</strong>
      <p>悬停或点击这个按钮，打开微信名片。</p>
      <a href="https://u.wechat.com/EOA_RTk6bZetNDYPkr_x1Lo?s=2" target="_blank" rel="noreferrer">打开微信名片</a>
    </div>
  `;

  const button = float.querySelector(".wechat-float__button");
  button.addEventListener("click", () => {
    const isOpen = float.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!float.contains(event.target)) {
      float.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    }
  });

  document.head.appendChild(style);
  document.body.appendChild(float);
}
