const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Remove max-width limit on about-right
css = css.replace(/\.about-right\s*\{\s*margin:\s*0 auto;\s*width:\s*95%;\s*max-width:\s*1700px;\s*position:\s*relative;\s*\}/, 
`.about-right {
  margin: 0 auto;
  width: 95%;
  max-width: none;
  position: relative;
}`);

// Add override for dark-section__divider
if (!css.includes('.page-about .dark-section__divider {')) {
    css = css.replace(/\.page-about \.dark-section__experience\s*\{\s*max-width:\s*100%;\s*\}/, 
`.page-about .dark-section__experience,
.page-about .dark-section__divider {
  max-width: 100%;
}`);
}

fs.writeFileSync('css/style.css', css, 'utf8');
