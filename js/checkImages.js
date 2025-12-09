const fs = require("fs");
const path = require("path");

// === CONFIG ===
const projectDir = "./"; // Root of your project
const jsFiles = ["sketch.js"]; // List all JS files to scan
// Optional: add more files if needed, e.g. ["sketch.js","gradients.js"]

// === Helper ===
function findLoadImages(content) {
  const regex = /loadImage\(\s*['"`](.+?)['"`]\s*\)/g;
  const matches = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1]);
  }
  return matches;
}

// === Main ===
jsFiles.forEach((file) => {
  const filePath = path.join(projectDir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  const images = findLoadImages(content);

  images.forEach((imgPath) => {
    const imgFullPath = path.join(projectDir, imgPath);
    if (!fs.existsSync(imgFullPath)) {
      console.log(`❌ Missing image: ${imgPath} (referenced in ${file})`);
    } else {
      console.log(`✅ Found: ${imgPath}`);
    }
  });
});
