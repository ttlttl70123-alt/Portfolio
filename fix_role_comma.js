const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const files = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const regex = /(<p class="meta-label">ROLE<\/p>\s*<p class="meta-value">)([^<]+)(<\/p>)/gi;
  let changed = false;
  
  content = content.replace(regex, (match, p1, p2, p3) => {
    let text = p2.trim();
    if (text.endsWith(',')) {
      text = text.slice(0, -1).trim(); // Remove trailing comma
      changed = true;
    }
    return p1 + text + p3;
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed trailing comma in ${file}`);
  }
});
