const wechatCardUrl = "https://u.wechat.com/EOA_RTk6bZetNDYPkr_x1Lo?s=2";

export function setupWechatFloat() {
  if (document.querySelector(".wechat-float")) return;

  const style = document.createElement("style");
  style.textContent = `
    .wechat-float {
      position: fixed;
      right: max(18px, env(safe-area-inset-right));
      top: 50%;
      z-index: 60;
      transform: translateY(-50%);
    }
    .wechat-float__button {
      position: relative;
      width: 58px;
      height: 58px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255,255,255,.2);
      border-radius: 999px;
      background: radial-gradient(circle at 30% 20%, #48ff9b 0, #07c160 42%, #038847 100%);
      color: #fff;
      box-shadow: 0 18px 42px rgba(7,193,96,.3), 0 12px 30px rgba(0,0,0,.24);
      cursor: pointer;
      transition: transform 180ms ease, box-shadow 180ms ease;
    }
    .wechat-float__button::before {
      content: "";
      position: absolute;
      inset: -6px;
      border-radius: inherit;
      border: 1px solid rgba(7,193,96,.34);
      animation: wechat-pulse 2.4s ease-out infinite;
    }
    .wechat-float__button:hover,
    .wechat-float__button:focus-visible {
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 20px 46px rgba(7,193,96,.4), 0 14px 34px rgba(0,0,0,.28);
      outline: none;
    }
    .wechat-float__button svg {
      width: 30px;
      height: 30px;
      fill: currentColor;
    }
    .wechat-float__panel {
      position: absolute;
      right: 76px;
      top: 50%;
      width: min(292px, calc(100vw - 116px));
      padding: 18px;
      border: 1px solid var(--line);
      border-radius: 24px;
      background: linear-gradient(180deg, color-mix(in srgb, var(--surface) 94%, transparent), color-mix(in srgb, var(--surface) 86%, transparent));
      box-shadow: 0 28px 80px rgba(0,0,0,.3);
      backdrop-filter: blur(20px);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-50%) translateX(12px) scale(.98);
      transform-origin: right center;
      transition: opacity 180ms ease, visibility 180ms ease, transform 180ms ease;
      pointer-events: none;
      overflow: hidden;
    }
    .wechat-float__panel::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 16% 0, rgba(7,193,96,.2), transparent 34%), radial-gradient(circle at 100% 10%, rgba(70,130,255,.18), transparent 32%);
      pointer-events: none;
    }
    .wechat-float:hover .wechat-float__panel,
    .wechat-float:focus-within .wechat-float__panel,
    .wechat-float.is-open .wechat-float__panel {
      opacity: 1;
      visibility: visible;
      transform: translateY(-50%) translateX(0) scale(1);
      pointer-events: auto;
    }
    .wechat-float__panel::after {
      content: "";
      position: absolute;
      right: -8px;
      top: 50%;
      width: 14px;
      height: 14px;
      border-top: 1px solid var(--line);
      border-right: 1px solid var(--line);
      background: color-mix(in srgb, var(--surface) 90%, transparent);
      transform: translateY(-50%) rotate(45deg);
    }
    .wechat-float__profile,
    .wechat-float__qr,
    .wechat-float__tip,
    .wechat-float__link {
      position: relative;
      z-index: 1;
    }
    .wechat-float__profile {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
    }
    .wechat-float__avatar {
      width: 48px;
      height: 48px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px;
      background: linear-gradient(135deg, rgba(7,193,96,.95), rgba(86,154,255,.88));
      color: #fff;
      font-size: 20px;
      font-weight: 900;
      box-shadow: inset 0 1px 0 rgba(255,255,255,.28), 0 14px 30px rgba(7,193,96,.22);
    }
    .wechat-float__name {
      display: block;
      color: var(--ink);
      font-size: 17px;
      font-weight: 900;
      line-height: 1.2;
    }
    .wechat-float__meta {
      display: block;
      margin-top: 4px;
      color: var(--muted);
      font-size: 12px;
      font-weight: 800;
    }
    .wechat-float__qr {
      display: block;
      width: 100%;
      border: 10px solid #fff;
      border-radius: 18px;
      background: #fff;
      box-shadow: 0 14px 36px rgba(0,0,0,.12);
    }
    .wechat-float__tip {
      margin: 12px 0 12px;
      color: var(--muted);
      font-size: 13px;
      font-weight: 800;
      text-align: center;
    }
    .wechat-float__link {
      width: 100%;
      min-height: 42px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 999px;
      background: #07c160;
      color: #fff;
      font-size: 14px;
      font-weight: 900;
      box-shadow: 0 12px 26px rgba(7,193,96,.25);
    }
    @keyframes wechat-pulse {
      0% { opacity: .8; transform: scale(.86); }
      70% { opacity: 0; transform: scale(1.28); }
      100% { opacity: 0; transform: scale(1.28); }
    }
    @media (max-width: 680px) {
      .wechat-float {
        right: max(14px, env(safe-area-inset-right));
        top: auto;
        bottom: max(88px, env(safe-area-inset-bottom));
        transform: none;
      }
      .wechat-float__button {
        width: 52px;
        height: 52px;
      }
      .wechat-float__panel {
        right: 0;
        top: auto;
        bottom: 66px;
        width: min(282px, calc(100vw - 28px));
        transform: translateY(10px) scale(.98);
        transform-origin: right bottom;
      }
      .wechat-float:hover .wechat-float__panel,
      .wechat-float:focus-within .wechat-float__panel,
      .wechat-float.is-open .wechat-float__panel {
        transform: translateY(0) scale(1);
      }
      .wechat-float__panel::after {
        right: 20px;
        top: auto;
        bottom: -8px;
        transform: rotate(135deg);
      }
    }
  `;

  const float = document.createElement("aside");
  float.className = "wechat-float";
  float.setAttribute("aria-label", "微信联系");
  float.innerHTML = `
    <button class="wechat-float__button" type="button" aria-label="显示微信二维码" aria-expanded="false">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9.5 4.5c-4.1 0-7.4 2.7-7.4 6.1 0 1.9 1 3.6 2.7 4.7l-.7 2.1 2.5-1.2c.9.3 1.9.5 2.9.5.2 0 .5 0 .7-.1-.2-.7-.3-1.4-.3-2.1 0-3.4 3.1-6.1 7-6.3C15.9 6 12.9 4.5 9.5 4.5Zm7.4 5.1c-3.3 0-6 2.2-6 4.9s2.7 4.9 6 4.9c.8 0 1.5-.1 2.2-.4l2 1-.5-1.7c1.4-.9 2.3-2.3 2.3-3.9 0-2.7-2.7-4.8-6-4.8Z"/></svg>
    </button>
    <div class="wechat-float__panel" role="tooltip">
      <div class="wechat-float__profile">
        <span class="wechat-float__avatar">刘</span>
        <span><strong class="wechat-float__name">刘亚东</strong><span class="wechat-float__meta">安徽 · 合肥｜AI 提效交流</span></span>
      </div>
      <img class="wechat-float__qr" src="./assets/wechat-qr.svg" alt="刘亚东微信二维码，扫码添加好友" loading="lazy" />
      <p class="wechat-float__tip">微信扫一扫，添加好友</p>
      <a class="wechat-float__link" href="${wechatCardUrl}" target="_blank" rel="noreferrer">打开微信名片</a>
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
