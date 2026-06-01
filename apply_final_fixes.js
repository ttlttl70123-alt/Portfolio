const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// 1. Password Shake Error CSS
const errorCSS = `
@keyframes shake-error {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}

.project-card__auth.is-error {
  animation: shake-error 0.3s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.project-card__auth.is-red .project-card__password {
  color: #ff4d4d;
  background-image: repeating-linear-gradient(to right, #ff4d4d 0, #ff4d4d 14px, transparent 14px, transparent 24px) !important;
}

.project-card__auth.is-red .project-card__lock {
  filter: brightness(0) saturate(100%) invert(46%) sepia(48%) saturate(3028%) hue-rotate(333deg) brightness(105%) contrast(101%);
}

.project-card__auth.is-red .project-card__submit::after {
  filter: brightness(0) saturate(100%) invert(46%) sepia(48%) saturate(3028%) hue-rotate(333deg) brightness(105%) contrast(101%);
}
`;

if (!css.includes('@keyframes shake-error')) {
  css += errorCSS;
}

// 2. AND MORE Arrow Mask-Image
const b64 = fs.readFileSync('images/Arrow.png').toString('base64');
const dataUri = 'data:image/png;base64,' + b64;
const arrowRegex = /\.footer__top-links \.projects__more-link::after\s*\{[^}]*\}/;
const newArrowCSS = `.footer__top-links .projects__more-link::after {
  content: '';
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  margin-left: 0.15em;
  -webkit-mask-image: url('${dataUri}');
  mask-image: url('${dataUri}');
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  background-color: currentColor;
  transform: translateY(0.16em);
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}`;

css = css.replace(arrowRegex, newArrowCSS);

const hoverRegex = /\.footer__top-links \.projects__more-link:hover::after\s*\{[^}]*\}/;
const newHoverCSS = `.footer__top-links .projects__more-link:hover::after {
  transform: translateY(0.16em) translateX(8px);
}`;

if (css.match(hoverRegex)) {
    css = css.replace(hoverRegex, newHoverCSS);
} else {
    css += `\n.footer__top-links .projects__more-link:hover::after {\n  transform: translateY(0.16em) translateX(8px);\n}\n`;
}

// 3. Footer margin
css = css.replace(/margin-top: calc\(var\(--space-sm\) \* 0\.7\);/g, 'margin-top: -10px;');

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Successfully applied fixes.');
