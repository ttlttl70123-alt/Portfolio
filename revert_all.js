const fs = require('fs');
const { execSync } = require('child_process');

// 1. Save about.html
const aboutHtml = fs.readFileSync('about.html', 'utf8');

// 2. Extract about CSS
const css = fs.readFileSync('css/style.css', 'utf8');
const aboutCssTarget = "/* --- ABOUT LAYOUT --- */";
const splitIndex = css.indexOf(aboutCssTarget);

let aboutCss = "";
if (splitIndex > -1) {
    // Find where the page-about starts before the layout
    const pageAboutStart = css.indexOf('.page-about {');
    aboutCss = css.substring(pageAboutStart);
}

// 3. Reset repository to 1375179
console.log('Resetting...');
execSync('git reset --hard 1375179');

// 4. Restore about.html
fs.writeFileSync('about.html', aboutHtml, 'utf8');

// 5. Restore about CSS
let newCss = fs.readFileSync('css/style.css', 'utf8');
if (aboutCss.length > 0) {
    newCss += '\n\n' + aboutCss;
    fs.writeFileSync('css/style.css', newCss, 'utf8');
}

// 6. Fix "And More" arrow missing bug (which existed in 1375179)
let finalCss = fs.readFileSync('css/style.css', 'utf8');
finalCss = finalCss.replace(/\.footer__top-links \.projects__more-link::after \s*\{\s*content:\s*'';\s*display:\s*inline-block;\s*width:\s*0\.85em;\s*transform:\s*translateY\(0\.16em\);\s*\}/, 
`.footer__top-links .projects__more-link::after {
  content: '';
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  background-image: url('../images/Arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translateY(0.16em);
  filter: brightness(0) invert(1);
}`);
fs.writeFileSync('css/style.css', finalCss, 'utf8');

console.log('Reset and restored successfully.');
