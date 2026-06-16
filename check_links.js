const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
let brokenLinks = [];

function checkFileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch(e) {
    return false;
  }
}

function processHtml(file) {
  const content = fs.readFileSync(file, 'utf8');
  const imgRegex = /<img[^>]+src="([^"]+)"/g;
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    let imgSrc = match[1];
    if (imgSrc.includes('?')) imgSrc = imgSrc.split('?')[0]; // Remove query params like ?v=2
    if (imgSrc.startsWith('http')) continue;
    
    // Convert URL encoding (like %20 to space)
    imgSrc = decodeURIComponent(imgSrc);
    
    const fullPath = path.join(rootDir, imgSrc);
    if (!checkFileExists(fullPath)) {
      brokenLinks.push({ file: path.basename(file), link: imgSrc });
    }
  }
}

function processCss(file) {
  const content = fs.readFileSync(file, 'utf8');
  const urlRegex = /url\(['"]?([^'"()]+)['"]?\)/g;
  let match;
  while ((match = urlRegex.exec(content)) !== null) {
    let bgSrc = match[1];
    if (bgSrc.includes('?')) bgSrc = bgSrc.split('?')[0];
    if (bgSrc.startsWith('http') || bgSrc.startsWith('data:')) continue;
    
    // CSS paths are relative to the CSS file
    bgSrc = decodeURIComponent(bgSrc);
    const fullPath = path.resolve(path.dirname(file), bgSrc);
    if (!checkFileExists(fullPath)) {
      brokenLinks.push({ file: path.basename(file), link: bgSrc });
    }
  }
}

function processJs(file) {
  const content = fs.readFileSync(file, 'utf8');
  const srcRegex = /'([^']+\.(webp|png|jpg|jpeg))'/gi;
  let match;
  while ((match = srcRegex.exec(content)) !== null) {
    let src = match[1];
    src = decodeURIComponent(src);
    const fullPath = path.join(rootDir, src);
    if (!checkFileExists(fullPath)) {
      brokenLinks.push({ file: path.basename(file), link: src });
    }
  }
}

// Read all HTML files
fs.readdirSync(rootDir).forEach(file => {
  if (file.endsWith('.html')) {
    processHtml(path.join(rootDir, file));
  }
});

// Read CSS files
const cssDir = path.join(rootDir, 'css');
if (fs.existsSync(cssDir)) {
  fs.readdirSync(cssDir).forEach(file => {
    if (file.endsWith('.css')) {
      processCss(path.join(cssDir, file));
    }
  });
}

// Read JS files
const jsDir = path.join(rootDir, 'js');
if (fs.existsSync(jsDir)) {
  fs.readdirSync(jsDir).forEach(file => {
    if (file.endsWith('.js')) {
      processJs(path.join(jsDir, file));
    }
  });
}

if (brokenLinks.length > 0) {
  console.log(`Found ${brokenLinks.length} broken image links:`);
  brokenLinks.forEach(b => console.log(`- In ${b.file}: ${b.link}`));
} else {
  console.log('All image links are valid!');
}
