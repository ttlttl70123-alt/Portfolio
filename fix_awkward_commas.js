const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const blockRegex = /<p class="meta-label">ROLE<\/p>\s*<p class="meta-value">([\s\S]*?)<\/p>/gi;
  let changed = false;
  
  content = content.replace(blockRegex, (match, innerHtml) => {
    let newInner = innerHtml.replace(/,\s*<br>/gi, '<br>');
    newInner = newInner.trim();
    if (newInner.endsWith(',')) {
      newInner = newInner.slice(0, -1);
    }
    
    if (newInner !== innerHtml) changed = true;
    return match.replace(innerHtml, newInner);
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Removed awkward commas in ${file}`);
  }
});
