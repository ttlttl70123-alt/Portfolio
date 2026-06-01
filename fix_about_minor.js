const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Increase about-section bottom padding by 50%
css = css.replace(/padding:\s*var\(--space-2xl\)\s*var\(--space-lg\)\s*calc\(var\(--space-2xl\)\s*\*\s*2\);/, `padding: var(--space-2xl) var(--space-lg) calc(var(--space-2xl) * 3);`);

// 2. Move titles slightly left, text slightly right
if (!css.includes('.page-about .experience__title-wrapper {')) {
    css += `\n.page-about .experience__title-wrapper {\n  margin-left: -3vw;\n}\n.page-about .experience__content {\n  margin-left: 3vw;\n}\n`;
}

fs.writeFileSync('css/style.css', css, 'utf8');

// 3. Update HTML for 03 / 04
let html = fs.readFileSync('about.html', 'utf8');

// Change 03 to 04
html = html.replace(/<span class="service-tag__number">03<\/span>INDUSTRIAL DESIGN/, '<span class="service-tag__number">04</span>INDUSTRIAL DESIGN');

// Insert new 03 before INDUSTRIAL DESIGN
const newTag = `<span class="service-tag" data-title="3D VISUALIZATION" data-desc="Bringing spaces to life with realistic 3D renderings and visualizations<br>to effectively communicate design concepts and intents.">
            <span><span class="service-tag__number">03</span>3D VISUALIZATION</span>
            <span class="service-tag__arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"></path></svg></span>
          </span>\n          `;

const searchStr = `<span class="service-tag" data-title="INDUSTRIAL DESIGN"`;
html = html.replace(searchStr, newTag + searchStr);

// Cache busters
html = html.replace(/css\/style\.css(\?v=\d+)?/, 'css/style.css?v=' + Date.now());
fs.writeFileSync('about.html', html, 'utf8');

let indexHtml = fs.readFileSync('index.html', 'utf8');
indexHtml = indexHtml.replace(/css\/style\.css(\?v=\d+)?/, 'css/style.css?v=' + Date.now());
fs.writeFileSync('index.html', indexHtml, 'utf8');

console.log('Applied minor tweaks!');
