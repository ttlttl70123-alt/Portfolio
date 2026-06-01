const fs = require('fs');

// 1. Update CSS
let css = fs.readFileSync('css/style.css', 'utf8');
const newCss = 
.project-card__auth {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(0, 0, 0, 0.8);
  padding: 8px;
  border-radius: 40px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
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
  width: 160px;
  opacity: 1;
  pointer-events: auto;
  padding-right: 8px;
}

.project-card__password {
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: white;
  border-radius: 20px;
  padding: 6px 12px;
  width: 100%;
  font-family: var(--font-body);
  font-size: 0.9rem;
  outline: none;
}
.project-card__password::placeholder {
  color: rgba(255, 255, 255, 0.5);
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
;
css += newCss;
fs.writeFileSync('css/style.css', css, 'utf8');

// 2. Update script.js
let js = fs.readFileSync('js/script.js', 'utf8');

const regexJs = /projectCards\.forEach\(card => \{\s*card\.addEventListener\('click', openProjectPage\);\s*\}\);/g;
const replacementJs = projectCards.forEach(card => {
    const authOverlay = card.querySelector('.project-card__auth');
    if (authOverlay) {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.project-card__submit')) {
          const pw = card.querySelector('.project-card__password').value;
          if (pw.length > 0) {
            openProjectPage({ currentTarget: card, preventDefault: () => {} });
          } else {
            alert('비밀번호를 입력해주세요.');
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
  });;

js = js.replace(regexJs, replacementJs);
fs.writeFileSync('js/script.js', js, 'utf8');

