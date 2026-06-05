export function setupHeroCanvas() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const nodes = [];
  const lanes = [];
  let width = 0;
  let height = 0;
  let dpr = 1;
  let frame = 0;
  let themeColors = {};
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function readThemeColors() {
    const styles = getComputedStyle(document.documentElement);
    themeColors = {
      bg: styles.getPropertyValue("--hero-canvas-bg").trim() || "#07100f",
      grid: styles.getPropertyValue("--canvas-grid").trim() || "rgba(222, 238, 232, 0.06)",
      nodePrimary: styles.getPropertyValue("--canvas-node-primary").trim() || "#69dfb7",
      nodeSecondary: styles.getPropertyValue("--canvas-node-secondary").trim() || "#f0c95a",
      nodeTertiary: styles.getPropertyValue("--canvas-node-tertiary").trim() || "#7db0ff",
      laneA: styles.getPropertyValue("--canvas-lane-a").trim() || "rgba(240, 201, 90, 0.28)",
      laneB: styles.getPropertyValue("--canvas-lane-b").trim() || "rgba(125, 176, 255, 0.24)",
      connectionRgb: styles.getPropertyValue("--canvas-connection-rgb").trim() || "105, 223, 183",
    };
  }

  function resize() {
    readThemeColors();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes.length = 0;
    lanes.length = 0;

    const nodeCount = Math.max(44, Math.floor(width / 28));
    for (let i = 0; i < nodeCount; i += 1) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: 1.2 + Math.random() * 2.8,
        color: i % 5 === 0 ? themeColors.nodeSecondary : i % 7 === 0 ? themeColors.nodeTertiary : themeColors.nodePrimary,
      });
    }

    const laneCount = Math.max(5, Math.floor(height / 130));
    for (let i = 0; i < laneCount; i += 1) {
      lanes.push({
        y: 90 + i * ((height - 160) / Math.max(1, laneCount - 1)),
        offset: Math.random() * width,
        speed: 0.35 + Math.random() * 0.55,
        color: i % 2 ? themeColors.laneA : themeColors.laneB,
      });
    }
  }

  function drawGrid() {
    ctx.strokeStyle = themeColors.grid;
    ctx.lineWidth = 1;
    const gap = 56;
    for (let x = 0; x < width; x += gap) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gap) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  function drawLanes() {
    lanes.forEach((lane) => {
      const x = (lane.offset + frame * lane.speed) % (width + 180);
      ctx.strokeStyle = lane.color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(Math.max(0, x - 180), lane.y);
      ctx.lineTo(Math.min(width, x), lane.y);
      ctx.stroke();
    });
  }

  function tick() {
    frame += 1;
    ctx.fillStyle = themeColors.bg;
    ctx.fillRect(0, 0, width, height);
    drawGrid();
    drawLanes();

    nodes.forEach((node) => {
      if (!reducedMotion) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }
    });

    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        const a = nodes[i];
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 145) {
          ctx.strokeStyle = `rgba(${themeColors.connectionRgb}, ${0.15 * (1 - distance / 145)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    nodes.forEach((node) => {
      ctx.fillStyle = node.color;
      ctx.globalAlpha = 0.74;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    if (!reducedMotion) requestAnimationFrame(tick);
  }

  resize();
  tick();
  window.addEventListener("resize", resize);
  window.addEventListener("themechange", resize);
}
