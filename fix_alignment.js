const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

// 1. Move service-tags inside experience__content
// Current structure:
// <div class="experience__content">
//   <p class="experience__desc">...</p>
// </div>
// </div>
// <div class="service-tags">...</div>

html = html.replace(/(\s*<\/p>\s*<\/div>\s*)(<\/div>\s*)(<div class="service-tags">[\s\S]*?<\/div>)/, 
`$1$3$2`);

// 2. Move tools-tags inside experience__content
html = html.replace(/(\s*<\/p>\s*<\/div>\s*)(<\/div>\s*)(<div class="tools-tags">[\s\S]*?<\/div>\s*<\/div>)/, 
`$1$3$2`);

fs.writeFileSync('about.html', html, 'utf8');
