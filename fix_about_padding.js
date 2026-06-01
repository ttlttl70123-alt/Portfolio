const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');
// Undo bottom padding
css = css.replace(/padding:\s*var\(--space-2xl\)\s*var\(--space-lg\)\s*calc\(var\(--space-2xl\)\s*\*\s*3\);/, `padding: var(--space-2xl) var(--space-lg) calc(var(--space-2xl) * 2);`);
fs.writeFileSync('css/style.css', css, 'utf8');

let html = fs.readFileSync('about.html', 'utf8');
// Increase space between ABOUT ME and 01 by 50%
html = html.replace(/style="margin-bottom: 70px; width: 100%; margin: 0 auto;"/g, 'style="margin-bottom: 105px; width: 100%; margin: 0 auto;"');

// Cache busters
html = html.replace(/css\/style\.css(\?v=\d+)?/, 'css/style.css?v=' + Date.now());
fs.writeFileSync('about.html', html, 'utf8');

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/css\/style\.css(\?v=\d+)?/, 'css/style.css?v=' + Date.now());
fs.writeFileSync('index.html', indexHtml, 'utf8');

console.log('Fixed about padding!');
