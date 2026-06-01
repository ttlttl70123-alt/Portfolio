const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Center the whole content block with equal left/right margins (Rule 1)
// Apply this to .about-right
css = css.replace(/\.about-right\s*\{\s*margin-left:\s*22%;\s*width:\s*78%;\s*position:\s*relative;\s*\}/, 
`.about-right {
  margin: 0 auto;
  width: 90%;
  max-width: 1700px;
  position: relative;
}`);

// 2. Align the left line of "ABOUT ME" and "01", and ensure dividers match (Rules 1 & 2 & 3)
css = css.replace(/\.projects__header\s*\{\s*display:\s*flex;\s*justify-content:\s*space-between;/g, 
`.projects__header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;`);

css = css.replace(/\.dark-section__experience\s*\{\s*padding:\s*var\(--space-xl\)\s*0;\s*max-width:\s*var\(--max-width\);\s*margin:\s*0\s*auto;/g, 
`.dark-section__experience {
  padding: var(--space-xl) 0;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;`);

if (!css.includes('.page-about .dark-section__divider {')) {
    css += `\n.page-about .dark-section__experience,\n.page-about .dark-section__divider {\n  width: 100%;\n  max-width: 100%;\n  margin: 0 auto;\n}\n`;
}

// 3. Widen the gap between "01" and "ABOUT MY EXPERIENCE"
css = css.replace(/column-gap:\s*clamp\(4rem,\s*12vw,\s*15rem\);/g, `column-gap: clamp(4rem, 18vw, 25rem);`);

fs.writeFileSync('css/style.css', css, 'utf8');

// 4. Update inline styles in about.html to allow 100% width
let html = fs.readFileSync('about.html', 'utf8');
html = html.replace(/style="margin-bottom: 70px; max-width: var\(--max-width\); margin-left: auto; margin-right: auto;"/g, 'style="margin-bottom: 70px; width: 100%; margin: 0 auto;"');

// Ensure tags are OUTSIDE the experience__right-group (they already are in 1375179 state!)

// Cache busters
html = html.replace(/css\/style\.css(\?v=\d+)?/, 'css/style.css?v=' + Date.now());
fs.writeFileSync('about.html', html, 'utf8');

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/css\/style\.css(\?v=\d+)?/, 'css/style.css?v=' + Date.now());
fs.writeFileSync('index.html', indexHtml, 'utf8');

console.log('Rules applied successfully!');
