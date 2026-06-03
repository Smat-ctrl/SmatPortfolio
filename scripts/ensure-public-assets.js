const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const assets = [
  {
    file: "pdf.worker.min.mjs",
    source: path.join(root, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs"),
  },
  {
    file: "coffee-media.jpg",
    url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=90",
  },
  {
    file: "cooking-media.jpg",
    url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=90",
  },
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          download(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", reject);
  });
}

async function main() {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  for (const asset of assets) {
    const dest = path.join(publicDir, asset.file);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) continue;

    if (asset.source && fs.existsSync(asset.source)) {
      fs.copyFileSync(asset.source, dest);
      continue;
    }

    if (asset.url) {
      try {
        await download(asset.url, dest);
        console.log(`Downloaded ${asset.file}`);
      } catch (err) {
        console.warn(`Could not fetch ${asset.file}:`, err.message);
      }
    }
  }

  const required = ["avatar.png", "resume.pdf", "coffee-media.jpg", "cooking-media.jpg"];
  const missing = required.filter((f) => !fs.existsSync(path.join(publicDir, f)));

  if (missing.length) {
    console.warn(
      `Warning: missing public files: ${missing.join(", ")}. Add them to the public/ folder.`,
    );
  }
}

main();
