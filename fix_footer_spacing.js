const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

const regex = /\.footer__brand-tagline\s*\{\s*display:\s*flex;\s*gap:\s*calc\(var\(--space-md\) \/ 2\);\s*margin-top:\s*var\(--space-sm\);\s*\}/g;

css = css.replace(regex, `.footer__brand-tagline {
  display: flex;
  gap: calc(var(--space-md) / 2);
  margin-top: calc(var(--space-sm) * 0.7);
}`);

const regex2 = /\.footer__brand-tagline\s*\{\s*display:\s*flex;\s*gap:\s*var\(--space-md\);\s*margin-top:\s*var\(--space-sm\);\s*\}/g;
css = css.replace(regex2, `.footer__brand-tagline {
  display: flex;
  gap: var(--space-md);
  margin-top: calc(var(--space-sm) * 0.7);
}`);

fs.writeFileSync('css/style.css', css, 'utf8');
