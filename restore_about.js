const fs = require('fs');

// 1. UPDATE about.html (Move tags inside experience__content)
let html = fs.readFileSync('about.html', 'utf8');

// Move service-tags
html = html.replace(/(\s*<\/p>\s*<\/div>\s*)(<\/div>\s*)(<div class="service-tags">[\s\S]*?<\/div>)/, `$1$3$2`);

// Move tools-tags
html = html.replace(/(\s*<\/p>\s*<\/div>\s*)(<\/div>\s*)(<div class="tools-tags">[\s\S]*?<\/div>\s*<\/div>)/, `$1$3$2`);

fs.writeFileSync('about.html', html, 'utf8');

// 2. UPDATE style.css
let css = fs.readFileSync('css/style.css', 'utf8');

// Expand about-right
css = css.replace(/\.about-right\s*\{\s*margin-left:\s*22%;\s*width:\s*78%;\s*position:\s*relative;\s*\}/, 
`.about-right {
  margin: 0 auto;
  width: 95%;
  max-width: none;
  position: relative;
}`);

// Ensure dark-section__experience and dark-section__divider are full width (no max-width limit inside about-right)
css = css.replace(/\.dark-section__experience\s*\{\s*padding:\s*var\(--space-xl\)\s*0;\s*max-width:\s*var\(--max-width\);\s*margin:\s*0\s*auto;/g, 
`.dark-section__experience {
  padding: var(--space-xl) 0;
  max-width: 100%;
  margin: 0 auto;`);

if (!css.includes('.page-about .dark-section__divider {')) {
    css += `\n.page-about .dark-section__experience, .page-about .dark-section__divider {\n  max-width: 100%;\n}\n`;
}

// Ensure the projects__header (ABOUT ME) matches the dark-section__experience width and alignment
css = css.replace(/\.projects__header\s*\{\s*display:\s*flex;\s*justify-content:\s*space-between;/g, 
`.projects__header {
  display: flex;
  justify-content: space-between;
  width: 100%;`);

fs.writeFileSync('css/style.css', css, 'utf8');

// Also update index.html to have the cache buster
let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/css\/style\.css(\?v=\d+)?/, 'css/style.css?v=' + Date.now());
fs.writeFileSync('index.html', indexHtml, 'utf8');

let aboutHtml2 = fs.readFileSync('about.html', 'utf8');
aboutHtml2 = aboutHtml2.replace(/css\/style\.css(\?v=\d+)?/, 'css/style.css?v=' + Date.now());
// Remove inline styles in about.html that limit the width of the title
aboutHtml2 = aboutHtml2.replace(/style="margin-bottom: 70px; max-width: var\(--max-width\); margin-left: auto; margin-right: auto;"/g, 'style="margin-bottom: 70px; width: 100%;"');
fs.writeFileSync('about.html', aboutHtml2, 'utf8');

console.log('Restored about page!');
