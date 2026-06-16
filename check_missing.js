const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'images');
const origDir = path.join(__dirname, 'images_original');

const walkSync = function(dir, filelist) {
  if (!fs.existsSync(dir)) return filelist || [];
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

console.log("=== 1. Images in 'images' but NOT in 'images_original' (Need to be moved and optimized) ===");
const imgFiles = walkSync(imgDir);
const origFiles = walkSync(origDir);

// Check if any non-webp files are in images/ directly (user probably dropped them there)
imgFiles.forEach(f => {
    const ext = path.extname(f).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const rel = path.relative(imgDir, f);
        console.log(`Unoptimized file found in images/: ${rel}`);
    }
});

console.log("\n=== 2. Missing References in HTML ===");
const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
const missingRefs = new Set();
htmlFiles.forEach(html => {
    const content = fs.readFileSync(path.join(__dirname, html), 'utf8');
    // Match basic src="images/..." or url('images/...') or "images/..." in JSON
    const regex = /images\/([a-zA-Z0-9_\-\.\/\ \(\)]+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        let relPath = match[1];
        // Handle possible query strings
        relPath = relPath.split('?')[0];
        const fullPath = path.join(imgDir, relPath);
        if (!fs.existsSync(fullPath)) {
            missingRefs.add(`${html}: images/${relPath}`);
        }
    }
});
missingRefs.forEach(m => console.log(`Missing referenced file: ${m}`));
