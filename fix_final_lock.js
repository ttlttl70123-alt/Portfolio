const fs = require('fs');

// 1. ADD → to submit buttons in index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/<button class="project-card__submit"><\/button>/g, '<button class="project-card__submit">→</button>');
// update cache buster
html = html.replace(/css\/style\.css(\?v=\d+)?/, 'css/style.css?v=' + Date.now());
fs.writeFileSync('index.html', html, 'utf8');

// 2. Add Lock CSS
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
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  padding: 0;
}
`;
if (!css.includes('.project-card__auth {')) {
    css += lockCss;
    fs.writeFileSync('css/style.css', css, 'utf8');
}
console.log('Fixed lock screen');
