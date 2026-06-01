const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Expand about-right to 100%
css = css.replace(/\.about-right\s*\{\s*margin:\s*0 auto;\s*width:\s*98%;\s*position:\s*relative;\s*\}/, 
`.about-right {
  margin: 0 auto;
  width: 100%;
  position: relative;
}`);

// 2. Adjust title margin to further widen gap with number (set to 0.25)
css = css.replace(/margin-left:\s*calc\(clamp\(4rem, 12vw, 15rem\) \* -0\.15\);/g, `margin-left: calc(clamp(4rem, 12vw, 15rem) * 0.25);`);

// 3. Widen the gap between title and text (set to 20vw, 340px)
css = css.replace(/gap:\s*clamp\(var\(--space-xl\),\s*12vw,\s*220px\);/g, `gap: clamp(var(--space-xl), 20vw, 340px);`);

fs.writeFileSync('css/style.css', css, 'utf8');
