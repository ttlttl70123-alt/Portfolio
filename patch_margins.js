const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// Increase horizontal margin to 10.4vw (8vw + 30%)
css = css.replace(/padding: clamp\(32px, 5vw, 64px\) 8vw;/g, 'padding: clamp(32px, 5vw, 64px) 10.4vw;');
css = css.replace(/right: 8vw;/g, 'right: 10.4vw;');
css = css.replace(/padding: clamp\(48px, 7vw, 96px\) 8vw;/g, 'padding: clamp(48px, 7vw, 96px) 10.4vw;');
css = css.replace(/padding: clamp\(24px, 4vw, 48px\) 8vw clamp\(80px, 10vw, 120px\);/g, 'padding: clamp(24px, 4vw, 48px) 10.4vw clamp(80px, 10vw, 120px);');

// Remove border-bottom from pp-content
css = css.replace(/border-bottom: 1px solid #e8e8e8;\r?\n\s*align-items: start;/g, 'align-items: start;');

// Change aspect ratio of gallery images to previous 16 / 10
css = css.replace(/aspect-ratio: 16 \/ 9;/g, 'aspect-ratio: 16 / 10;');
css = css.replace(/aspect-ratio: 4 \/ 3;/g, 'aspect-ratio: 16 / 10;');

fs.writeFileSync('css/style.css', css);
console.log('CSS updated successfully');
