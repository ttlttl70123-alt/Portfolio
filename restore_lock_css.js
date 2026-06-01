const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

const lockCss = `
.project-card__auth {
  display: flex;
  align-items: center;
  gap: 16px;
  background: transparent;
  padding: 8px;
  border-radius: 0;
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
}
`;

if (!css.includes('.project-card__auth {')) {
    css += lockCss;
    fs.writeFileSync('css/style.css', css, 'utf8');
    console.log('Restored lock css');
} else {
    console.log('Already has lock css');
}
