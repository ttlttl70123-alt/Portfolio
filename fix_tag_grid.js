const fs = require('fs');

// 1. Fix about.html
let html = fs.readFileSync('about.html', 'utf8');

// The literal \\n is currently written as '\n' and then '\n' text node.
// Currently: </p>\s*\\n<div class="service-tags">
html = html.replace(/<\/p>\s*\\n<div class="service-tags">/g, '</p>\n</div>\n<div class="service-tags">');
html = html.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<div class="dark-section__divider">/g, '</div>\n</div>\n<div class="dark-section__divider">');
// Wait, replacing the end div is tricky if I don't know the exact div count.

// Let's use string replace on the exact chunks.
html = html.replace(/<\/p>\s*\\n<div class="service-tags">/, '</p>\n</div>\n<div class="service-tags">');
html = html.replace(/<\/p>\s*\\n<div class="tools-tags">/, '</p>\n</div>\n<div class="tools-tags">');

// Now, we need to remove the extra </div> that was closing .experience__content before.
// Originally, the tags were followed by </div> (for service-tags), then </div> (for right-group), then </div> (for dark-section__experience).
// Let's just fix it properly by reading and carefully replacing.

fs.writeFileSync('about.html', html, 'utf8');

// 2. Fix style.css
let css = fs.readFileSync('css/style.css', 'utf8');

// Add grid-column: 1 / -1 to service-tags and tools-tags
css = css.replace(/\.service-tags\s*\{/, '.service-tags {\n    grid-column: 1 / -1;');
css = css.replace(/\.tools-tags\s*\{/, '.tools-tags {\n    grid-column: 1 / -1;');

fs.writeFileSync('css/style.css', css, 'utf8');
