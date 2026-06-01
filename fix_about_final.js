const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Widen the gap between 01 and about
css = css.replace(/column-gap:\s*clamp\(4rem,\s*12vw,\s*15rem\);/g, `column-gap: clamp(4rem, 18vw, 25rem);`);

// 2. Ensure "ABOUT ME" title and the "01 / WHAT I CAN DO" lines match exactly.
// In about.html, ABOUT ME is in .projects__header
// In about.html, 01 is in .dark-section__experience
// Both must have max-width: 95% and margin: 0 auto so their left borders perfectly align!

css = css.replace(/\.projects__header\s*\{\s*display:\s*flex;\s*justify-content:\s*space-between;\s*width:\s*100%;/g, 
`.projects__header {
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;`);

css = css.replace(/\.dark-section__experience\s*\{\s*padding:\s*var\(--space-xl\)\s*0;\s*max-width:\s*100%;\s*margin:\s*0\s*auto;/g, 
`.dark-section__experience {
  padding: var(--space-xl) 0;
  max-width: 95%;
  margin: 0 auto;`);

css = css.replace(/\.page-about \.dark-section__experience,\s*\.page-about \.dark-section__divider\s*\{\s*max-width:\s*100%;\s*\}/g,
`.page-about .dark-section__experience,
.page-about .dark-section__divider {
  max-width: 95%;
  margin: 0 auto;
}`);

// 3. Make sure the ABOUT ME title in about.html doesn't have inline max-width
let aboutHtml = fs.readFileSync('about.html', 'utf8');
aboutHtml = aboutHtml.replace(/style="margin-bottom: 70px; max-width: var\(--max-width\); margin-left: auto; margin-right: auto;"/g, 'style="margin-bottom: 70px; width: 95%; margin: 0 auto;"');
// If it was already replaced to width: 100%:
aboutHtml = aboutHtml.replace(/style="margin-bottom: 70px; width: 100%;"/g, 'style="margin-bottom: 70px; width: 95%; margin: 0 auto;"');
fs.writeFileSync('about.html', aboutHtml, 'utf8');

// 4. Align about me left line with bottom texts
// Right now .experience__right-group has gap. Let's make sure its gap is also wider if needed.
css = css.replace(/gap:\s*clamp\(var\(--space-xl\),\s*12vw,\s*220px\);/g, `gap: clamp(var(--space-xl), 18vw, 25rem);`);

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Applied final about tweaks!');
