const fs = require('fs');
const b64 = fs.readFileSync('images/Arrow.png').toString('base64');
const dataUri = 'data:image/png;base64,' + b64;

let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Replace the footer arrow to use mask-image with base64 data URI
const arrowRegex = /\.footer__top-links \.projects__more-link::after\s*\{[^}]*\}/;
const newArrowCSS = \.footer__top-links .projects__more-link::after {
  content: '';
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  margin-left: 0.15em;
  -webkit-mask-image: url('\');
  mask-image: url('\');
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: currentColor;
  transform: translateY(0.16em);
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}\;
css = css.replace(arrowRegex, newArrowCSS);

// 2. Remove the filter from the hover state
const hoverRegex = /\.footer__top-links \.projects__more-link:hover::after\s*\{[^}]*\}/;
const newHoverCSS = \.footer__top-links .projects__more-link:hover::after {
  transform: translateY(0.16em) translateX(8px);
}\;
css = css.replace(hoverRegex, newHoverCSS);

// 3. Reduce gap between HYEONG-U LEE and CREATES CHANGE
css = css.replace(/margin-top: calc\(var\(--space-sm\) \* 0\.7\);/g, 'margin-top: -10px;');

fs.writeFileSync('css/style.css', css, 'utf8');
