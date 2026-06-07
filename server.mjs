import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(".");
const preferredPort = Number(process.env.PORT || process.argv[2] || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function resolvePath(url, port) {
  const { pathname } = new URL(url, `http://localhost:${port}`);
  const safePath = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, "");
  const filePath = resolve(join(root, safePath === "/" ? "index.html" : safePath));
  return filePath.startsWith(root) ? filePath : null;
}

function listen(port, attempts = 0) {
  const server = createServer(async (request, response) => {
    if (!request.url) {
      response.writeHead(400);
      response.end("Bad request");
      return;
    }

    const filePath = resolvePath(request.url, port);
    if (!filePath) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    try {
      const fileStat = await stat(filePath);
      const servedPath = fileStat.isDirectory() ? join(filePath, "index.html") : filePath;
      const contentType = mimeTypes[extname(servedPath)] || "application/octet-stream";

      response.writeHead(200, { "Content-Type": contentType });
      createReadStream(servedPath).pipe(response);
    } catch {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
    }
  });

  server.listen(port, () => {
    console.log(`AI Productivity site running at http://localhost:${port}/`);
  });

  server.once("error", (error) => {
    if (error.code === "EADDRINUSE" && attempts < 10) {
      listen(port + 1, attempts + 1);
      return;
    }
    throw error;
  });
}

listen(preferredPort);
