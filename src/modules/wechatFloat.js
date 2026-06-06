const wechatCardSrc = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAALCAHKAQgBAREA/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAQxAAAQIDBQQHBgQEBgIDAQAAAAECAAMRBBIhMQVBUQYiYXGBE5GhM1KxwQcUI0JDYtHwFTJicoKSorLxFiQ0U//EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EADwRAAICAQMCAgYGBQUHBQAAAAABAhEDBBIhMQVBUSJhcQYygZGhscHR8BMUI0JS4fEzYoKSovEWFVNUgrL/2gAMAwEAAhEDEQA/APy9RAAABwjaNGyh0lARuwAADmqTBCBJwBBxINJNJtEaUHUWGEWAAAAdgAAAPkgA+QSDJUdwGJGmCgAAAACxCMAASHE8vDXojCv0sLXO5m+WeVcSB1N8GvPa310vTh4Eo3JR02J4JVqRVPCtqvrkk5O9y0fsKGupvg157xeXdydPEMztY6YEX4ZXaViZ9C+JA5cSm9E6NzPGxsagvQtNTWtbndz8q9rltnQrKlS1KNpp7mGx1tydLX6reFfpAsM9bXaVrOZuy9xbx3O1nNoqKuG+89Tv3bL3FL2FpeeKj8nTeCPtyVIp4G04RuOaSg4tNpSpx+XErO6Um9CuydNzXAsXzMkEAH8NrhRrNalGdaKVZMR4QWeGfsD77G+odppxdGpNtpZ+6PDD93oAxjhP2B99pf8b7j6j/wDCw/XH/9gBa5YT9gffaX/G+4+o/wAwsP1w/wD2AF/+Fh+uP/7AC/jfcfUf+Fe++o/8A2AFrlhP2B99pf8b7j6j/AMLD9cf/ANgBa9/8LD9cf/2AF/G+4+o/8K999R/7AC1ywn7A++0v+N9x9R/4WH64//sALXv/AAsP1x//AGAF/G+4+o/8K999R/7AC1ywn7A++0v8AjfcfUf8AhYfrj/8AsALXv/hYfrj/APsAL+N9x9R/4V776j/2AFrlhP2B99pf8b7j6j/wsP1x//YAWvf/Cw/XH/APYAX8b7j6j/AMK999R/7AC1ywn7A++0v+N9x9R/4WH64//sALXv/hYfrj/+wAv433H1H/hXvvqP/AGAFrlhP2B99pf8AG+4+o/8AwsP1x/8A2AFr3/wsP1x//YAX8b7j6j/wr331H/sALXLCfsD77S/433H1H/hYfrj/APsALXv/AAsP1x//AGAF/G+4+o/8K999R/7AC1ywn7A++0v+N9x9R/4WH64//sALXv/hYfrj/+wAv433H1H/hXvvqP/AGAFrlhP2B99pf8AG+4+o/8AwsP1x/8A2AFr3/wsP1x//YAX8b7j6j/wr331H/sALXLCfsD77S/433H1H/hYfrj/APsALXv/AAsP1x//AGAF/G+4+o/8K999R/7AC1ywn7A++0v+N9x9R/4WH64//sALXv/hYfrj/+wAv433H1H/hXvvqP/AGAFrlhP2B99pf8b7j6j/wsP1x//YAWvf/Cw/XH/APYAX8b7j6j/AMK999R/7AC1ywn7A++0v+N9x9R/4WH64//sALXv/AAsP1x//AGAF/G+4+o/8K9999f/Z";

export function setupWechatFloat() {
  const existing = document.querySelector(".wechat-float");
  if (existing) return;

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
      width: 56px;
      height: 56px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 999px;
      background: linear-gradient(135deg, #08d46b, #05a85b);
      color: #fff;
      box-shadow: 0 18px 42px rgba(7, 193, 96, 0.28), 0 12px 30px rgba(0, 0, 0, 0.24);
      cursor: pointer;
      transition: transform 180ms ease, box-shadow 180ms ease;
    }

    .wechat-float__button:hover,
    .wechat-float__button:focus-visible {
      transform: translateY(-2px) scale(1.04);
      box-shadow: 0 20px 46px rgba(7, 193, 96, 0.36), 0 14px 34px rgba(0, 0, 0, 0.28);
      outline: none;
    }

    .wechat-float__button svg {
      width: 29px;
      height: 29px;
      fill: currentColor;
    }

    .wechat-float__panel {
      position: absolute;
      right: 72px;
      top: 50%;
      width: min(280px, calc(100vw - 112px));
      padding: 14px;
      border: 1px solid var(--line);
      border-radius: 18px;
      background: color-mix(in srgb, var(--surface) 92%, transparent);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.26);
      backdrop-filter: blur(18px);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-50%) translateX(10px) scale(0.98);
      transform-origin: right center;
      transition: opacity 180ms ease, visibility 180ms ease, transform 180ms ease;
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
      background: color-mix(in srgb, var(--surface) 92%, transparent);
      transform: translateY(-50%) rotate(45deg);
    }

    .wechat-float__panel img {
      display: block;
      width: 100%;
      border-radius: 12px;
      background: #fff;
    }

    .wechat-float__panel p {
      margin: 10px 0 0;
      color: var(--muted);
      font-size: 13px;
      font-weight: 800;
      text-align: center;
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
        bottom: 64px;
        width: min(260px, calc(100vw - 28px));
        transform: translateY(10px) scale(0.98);
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
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M9.5 4.5c-4.1 0-7.4 2.7-7.4 6.1 0 1.9 1 3.6 2.7 4.7l-.7 2.1 2.5-1.2c.9.3 1.9.5 2.9.5.2 0 .5 0 .7-.1-.2-.7-.3-1.4-.3-2.1 0-3.4 3.1-6.1 7-6.3C15.9 6 12.9 4.5 9.5 4.5Zm-2.4 5.1c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9Zm4.8 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9Zm5 0c-3.3 0-6 2.2-6 4.9s2.7 4.9 6 4.9c.8 0 1.5-.1 2.2-.4l2 1-.5-1.7c1.4-.9 2.3-2.3 2.3-3.9 0-2.7-2.7-4.8-6-4.8Zm-2 4.1c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7Zm4 0c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7Z"/>
      </svg>
    </button>
    <div class="wechat-float__panel" role="tooltip">
      <img src="${wechatCardSrc}" alt="刘亚东微信二维码，扫码添加好友" loading="lazy" />
      <p>微信扫一扫，添加刘亚东</p>
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
