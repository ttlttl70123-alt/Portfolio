const fs = require('fs');

// 1. Restore the EXACT input field design
let css = fs.readFileSync('css/style.css', 'utf8');

const pwRegex = /\.project-card__password\s*\{[^}]*\}/g;
css = css.replace(pwRegex, `.project-card__password {
  border: none;
  background: transparent;
  color: white;
  border-radius: 0;
  padding: 4px 0;
  width: 90px;
  font-family: monospace;
  font-size: 1.2rem;
  letter-spacing: 12px;
  text-indent: 6px;
  outline: none;
  background-image: linear-gradient(to right, white 14px, transparent 14px);
  background-size: 22.5px 2px;
  background-position: center bottom;
  background-repeat: repeat-x;
}`);

// The error shake animation was already added, but I will make sure the background-gradient is correct for error!
const errorCssReplace = /\.project-card__password\.is-error\s*\{[^}]*\}/g;
if (css.match(errorCssReplace)) {
  css = css.replace(errorCssReplace, `.project-card__password.is-error {
  animation: shakeAuth 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  color: #ff4d4d;
  background-image: repeating-linear-gradient(to right, #ff4d4d 0, #ff4d4d 14px, transparent 14px, transparent 24px) !important;
}`);
} else {
  css += `\n.project-card__password.is-error {
  animation: shakeAuth 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  color: #ff4d4d;
  background-image: repeating-linear-gradient(to right, #ff4d4d 0, #ff4d4d 14px, transparent 14px, transparent 24px) !important;
}\n`;
}

// 2. Restore the EXACT submit button design, but bigger (width 36px instead of 28px)
const submitRegex = /\.project-card__submit\s*\{[^}]*\}/g;
css = css.replace(submitRegex, `.project-card__submit {
  background: transparent;
  color: transparent;
  border: none;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: 8px;
}`);

// If ::after exists, replace it, else add it
const submitAfterRegex = /\.project-card__submit::after\s*\{[^}]*\}/g;
if (css.match(submitAfterRegex)) {
  css = css.replace(submitAfterRegex, `.project-card__submit::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-image: url('../images/Arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(0) invert(1);
}`);
} else {
  css += `\n.project-card__submit::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background-image: url('../images/Arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(0) invert(1);
}\n`;
}

// 3. Restore the Footer Arrows, WITHOUT invert filter (assuming Arrow.png is black, so it shows on white footer)
const footerArrowRegex = /\.footer__top-links \.projects__more-link::after\s*\{[^}]*\}/g;
css = css.replace(footerArrowRegex, `.footer__top-links .projects__more-link::after {
  content: '';
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  margin-left: 0.15em;
  background-image: url('../images/Arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: translateY(0.16em);
}`);

fs.writeFileSync('css/style.css', css, 'utf8');

// 4. Clean up index.html (remove text arrow if present)
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<button class="project-card__submit">→<\/button>/g, '<button class="project-card__submit"></button>');
html = html.replace(/css\/style\.css(\?v=\d+)?/, 'css/style.css?v=' + Date.now());
fs.writeFileSync('index.html', html, 'utf8');
console.log('Restoration complete!');
