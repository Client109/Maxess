import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const port = 4184;
const requireFromRuntime = createRequire(
  "C:/Users/lukep/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json"
);
const { chromium } = requireFromRuntime("playwright");

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function resolveRequest(url) {
  const cleanUrl = decodeURIComponent(url.split("?")[0]);
  const requested = cleanUrl === "/" ? "/static-preview/index.html" : cleanUrl;
  const absolute = normalize(join(root, requested));

  if (!absolute.startsWith(root)) return null;
  if (!existsSync(absolute)) return null;

  const stats = statSync(absolute);
  if (stats.isDirectory()) return join(absolute, "index.html");
  return absolute;
}

const server = createServer((request, response) => {
  const file = resolveRequest(request.url ?? "/");

  if (!file || !existsSync(file)) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": types[extname(file)] ?? "application/octet-stream"
  });
  createReadStream(file).pipe(response);
});

await new Promise((resolveListen) => server.listen(port, "127.0.0.1", resolveListen));

let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto(`http://127.0.0.1:${port}/static-preview/`, { waitUntil: "networkidle" });
  await page.waitForSelector(".score-row strong");

  await page.getByRole("button", { name: "Log Progress" }).first().click();
  await page.waitForFunction(() => document.body.textContent?.includes("Just now"));

  await page.getByRole("button", { name: "Mock Check-In" }).first().click();
  await page.waitForFunction(() => document.body.textContent?.includes("Checked in for Spring Showcase"));

  await page.screenshot({ path: "preview-check.png", fullPage: true });
  console.log("Preview check passed. Screenshot: preview-check.png");
} finally {
  if (browser) await browser.close();
  await new Promise((resolveClose) => server.close(resolveClose));
}
