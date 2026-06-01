const fs = require('fs');

// 1. UPDATE index.html submit button text
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<button class="project-card__submit">→<\/button>/g, '<button class="project-card__submit"></button>');
fs.writeFileSync('index.html', html, 'utf8');

// 2. UPDATE style.css
let css = fs.readFileSync('css/style.css', 'utf8');

// Fix auth overlay background
const authBaseRegex = /\.project-card__auth\s*\{\s*display:\s*flex;\s*align-items:\s*center;\s*gap:\s*12px;\s*background:\s*rgba\(0,\s*0,\s*0,\s*0\.8\);\s*padding:\s*8px;\s*border-radius:\s*40px;/g;
css = css.replace(authBaseRegex, `.project-card__auth {
  display: flex;
  align-items: center;
  gap: 16px;
  background: transparent;
  padding: 8px;
  border-radius: 0;`);

// Fix submit button styling
const submitRegex = /\.project-card__submit\s*\{[^}]*\}/g;
css = css.replace(submitRegex, `.project-card__submit {
  background: transparent;
  color: transparent;
  border: none;
  width: 48px;
  height: 48px;
  margin-left: -12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.project-card__submit::after {
  content: '';
  display: block;
  width: 24px;
  height: 24px;
  background-image: url('../images/Arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: brightness(0) invert(1);
}`);

fs.writeFileSync('css/style.css', css, 'utf8');

// 3. UPDATE script.js for stopPropagation
let js = fs.readFileSync('js/script.js', 'utf8');
const jsTarget = `} else if (e.target.closest('.project-card__pw-container')) {
          return; // Ignore clicks inside the input container
        } else {
          authOverlay.classList.toggle('is-active');`;
const jsReplacement = `} else if (e.target.closest('.project-card__pw-container')) {
          e.stopPropagation();
          return; // Ignore clicks inside the input container
        } else {
          e.stopPropagation();
          authOverlay.classList.toggle('is-active');`;
js = js.replace(jsTarget, jsReplacement);
fs.writeFileSync('js/script.js', js, 'utf8');

console.log('Fixed missing lock details!');
