const fs = require('fs');

// 1. Fix CSS
let css = fs.readFileSync('css/style.css', 'utf8');

// Remove border from password field
const pwRegex = /\.project-card__password\s*\{[^}]*\}/g;
css = css.replace(pwRegex, \.project-card__password {
  border: none;
  background: transparent;
  color: white;
  border-radius: 0;
  padding: 6px 0;
  width: 100px;
  font-family: Arial, sans-serif;
  font-size: 1.4rem;
  letter-spacing: 16px;
  text-indent: 6px;
  outline: none !important;
  background-image: repeating-linear-gradient(to right, white 0, white 14px, transparent 14px, transparent 24px);
  background-size: 96px 2px;
  background-position: center bottom 6px;
  background-repeat: no-repeat;
  box-sizing: border-box;
  box-shadow: none;
}\);

// Revert footer arrow size
const footerArrowRegex = /\.footer__top-links \.projects__more-link::after\s*\{[^}]*\}/g;
css = css.replace(footerArrowRegex, \.footer__top-links .projects__more-link::after {
  content: '';
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  margin-left: 0.15em;
  background-image: url('../images/Arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(0);
  transform: translateY(0.16em);
}\);

fs.writeFileSync('css/style.css', css, 'utf8');

// 2. Revert JS to toggle
let js = fs.readFileSync('js/script.js', 'utf8');
js = js.replace(/authOverlay\.classList\.add\('is-active'\);/g, "authOverlay.classList.toggle('is-active');");
fs.writeFileSync('js/script.js', js, 'utf8');

