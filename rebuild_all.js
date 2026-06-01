const fs = require('fs');

// 1. UPDATE index.html
let html = fs.readFileSync('index.html', 'utf8');
const replacement1 = `<div class="project-card__overlay">
              <div class="project-card__auth">
                <img src="images/Lock.png" alt="Confidential" class="project-card__lock" />
                <div class="project-card__pw-container">
                  <input type="password" class="project-card__password" />
                  <button class="project-card__submit">→</button>
                </div>
              </div>
            </div>`;
html = html.replace(/<div class="project-card__overlay">\s*<img src="images\/Lock\.png" alt="Confidential" class="project-card__lock" \/>\s*<\/div>/g, replacement1);
fs.writeFileSync('index.html', html, 'utf8');

// 2. UPDATE style.css
let css = fs.readFileSync('css/style.css', 'utf8');

// A. Auth Overlay Base CSS
const authBase = `
.project-card__auth {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.8);
  padding: 8px;
  border-radius: 40px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.project-card__pw-container {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 0;
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card__auth.is-active .project-card__pw-container {
  width: 140px;
  opacity: 1;
  pointer-events: auto;
  padding-right: 0;
}

.project-card__password {
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
}

.project-card__submit {
  background: white;
  color: black;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}
`;
css += authBase;

// B. Auth Error Animation
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
css += errorCSS;

// C. Arrow Mask-Image
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
if (css.match(arrowRegex)) {
  css = css.replace(arrowRegex, newArrowCSS);
}

const hoverRegex = /\.footer__top-links \.projects__more-link:hover::after\s*\{[^}]*\}/;
const newHoverCSS = `.footer__top-links .projects__more-link:hover::after {
  transform: translateY(0.16em) translateX(8px);
}`;
if (css.match(hoverRegex)) {
  css = css.replace(hoverRegex, newHoverCSS);
} else {
  css += `\n.footer__top-links .projects__more-link:hover::after {\n  transform: translateY(0.16em) translateX(8px);\n}\n`;
}

// D. Footer Margin
css = css.replace(/margin-top:\s*var\(--space-sm\);/g, 'margin-top: -10px;');
css = css.replace(/margin-top:\s*calc\(var\(--space-sm\) \* 0\.7\);/g, 'margin-top: -10px;');

// E. White Theme Modal Fixes
css = css.replace(/\.service-modal__content\s*\{([^}]*?)background-color:\s*#050505;([^}]*?)\}/g, `.service-modal__content {$1background-color: #ffffff;$2}`);
css = css.replace(/\.service-modal__close\s*\{([^}]*?)color:\s*var\(--color-text-muted\);([^}]*?)\}/g, `.service-modal__close {$1color: #000000;$2}`);
css = css.replace(/\.service-modal__close:hover\s*\{([^}]*?)color:\s*var\(--color-text-light\);([^}]*?)\}/g, `.service-modal__close:hover {$1color: var(--color-accent);$2}`);
css = css.replace(/\.service-modal__title\s*\{([^}]*?)color:\s*var\(--color-text-light\);([^}]*?)\}/g, `.service-modal__title {$1color: #000000;$2}`);
css = css.replace(/\.service-modal__body\s*\{([^}]*?)color:\s*var\(--color-text-muted-light\);([^}]*?)\}/g, `.service-modal__body {$1color: #333333;$2}`);
css = css.replace(/\.service-modal__desc\s*\{([^}]*?)color:\s*var\(--color-text-muted-light\);([^}]*?)\}/g, `.service-modal__desc {$1color: #333333;$2}`);

fs.writeFileSync('css/style.css', css, 'utf8');

// 3. UPDATE script.js
let js = fs.readFileSync('js/script.js', 'utf8');
const regexJs = /projectCards\.forEach\(card => \{\s*card\.addEventListener\('click', openProjectPage\);\s*\}\);/g;
const replacementJs = `projectCards.forEach(card => {
    const authOverlay = card.querySelector('.project-card__auth');
    if (authOverlay) {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.project-card__submit')) {
          const pwInput = card.querySelector('.project-card__password');
          const pw = pwInput.value;
          if (pw === '4598') {
            openProjectPage({ currentTarget: card, preventDefault: () => {} });
          } else {
            authOverlay.classList.add('is-error');
            authOverlay.classList.add('is-red');
            setTimeout(() => {
              authOverlay.classList.remove('is-red');
            }, 75);
            setTimeout(() => {
              authOverlay.classList.remove('is-error');
              pwInput.value = '';
              pwInput.focus();
            }, 300);
          }
        } else if (e.target.closest('.project-card__pw-container')) {
          return; // Ignore clicks inside the input container
        } else {
          authOverlay.classList.toggle('is-active');
          if (authOverlay.classList.contains('is-active')) {
            const input = card.querySelector('.project-card__password');
            if (input) input.focus();
          }
        }
      });
      // Allow pressing Enter in the password field
      const inputField = card.querySelector('.project-card__password');
      if (inputField) {
        inputField.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            const btn = card.querySelector('.project-card__submit');
            if (btn) btn.click();
          }
        });
      }
    } else {
      card.addEventListener('click', openProjectPage);
    }
  });`;
js = js.replace(regexJs, replacementJs);
fs.writeFileSync('js/script.js', js, 'utf8');

console.log('Restoration completed!');
