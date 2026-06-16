const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  if (c.includes('<!-- <!--')) {
    c = c.replace(/<!--\s*<!--\s*(<a href="archive\.html"[^>]*>ARCHIVE<\/a>)\s*-->\s*-->/g, '<!-- $1 -->');
    fs.writeFileSync(f, c);
    count++;
  }
}
console.log('Fixed ' + count + ' files.');
