const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');
let lines = css.split(/\r?\n/);

let startIndex = lines.findIndex(l => l.includes('CUSTOM CURSOR')) - 1;
let endIndex = lines.findIndex(l => l.includes('.project-transition--down {')) - 1;

const correctBlock = `/* ==========================================
   CUSTOM CURSOR
   ========================================== */
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(150, 150, 150, 0.4);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background-color 0.2s;
  mix-blend-mode: difference;
}

.custom-cursor--hover {
  width: 40px;
  height: 40px;
  background-color: rgba(200, 200, 200, 0.2);
}

.cursor-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9998;
  filter: url(#crayon);
}

/* ==========================================
   PROJECT TRANSITION & PAGE
   ========================================== */

/* Black transition screen that slides up */
.project-transition {
  position: fixed;
  inset: 0;
  background-color: var(--color-bg-dark);
  z-index: 9100;
  transform: translateY(100%);
  pointer-events: none;
}

.project-transition--up {
  animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}`;

lines.splice(startIndex, endIndex - startIndex + 1, correctBlock);
fs.writeFileSync('css/style.css', lines.join('\n'));
console.log('Fixed!');
