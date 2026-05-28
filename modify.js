
const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

// The header ends right before the main content section
const headerEndIdx = html.indexOf('</header>') + 9;
// The custom cursor div is at the end
const bodyEndIdx = html.indexOf('<div class="custom-cursor">');

if (headerEndIdx === -1 || bodyEndIdx === -1) {
    console.error('Could not find header or custom-cursor in about.html');
    process.exit(1);
}

let beforeHeader = html.substring(0, headerEndIdx);
let contentToWrap = html.substring(headerEndIdx, bodyEndIdx);
let afterContent = html.substring(bodyEndIdx);

const newContent = `
  <div class="about-layout">
    <div class="about-left">
      <img src="images/pic.png" alt="Hyeong-u Lee" class="about-left-image">
    </div>
    <div class="about-right">${contentToWrap}    </div>
  </div>
`;

let newHtml = beforeHeader + newContent + afterContent;

// Remove 'dark-section' class from section id='about' to prevent JS from turning header dark
newHtml = newHtml.replace('<section class="dark-section" id="about">', '<section class="about-section" id="about">');

newHtml = newHtml.replace(/css\/style\.css\?v=[0-9]+/g, 'css/style.css?v=277');

fs.writeFileSync('about.html', newHtml);
console.log('done about.html');

let css = fs.readFileSync('css/style.css', 'utf8');

const additionalOverrides = `
/* --- ABOUT LAYOUT --- */
.about-layout {
  display: flex;
  min-height: 100vh;
  width: 100%;
}
.about-left {
  position: fixed;
  top: 0;
  left: 0;
  width: 35%;
  height: 100vh;
  background-color: #f0f0f0;
}
.about-left-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.about-right {
  margin-left: 35%;
  width: 65%;
  position: relative;
}
.about-section {
  width: 100%;
  overflow: hidden;
}
.page-about .header {
  /* Let header naturally be transparent and turn white on scroll via JS */
  background-color: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
}
.page-about .header.header--scrolled {
  background-color: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
}
.page-about .header--dark {
  /* Nullify dark header effect just in case */
  background-color: transparent !important;
}

@media (max-width: 1024px) {
  .about-layout {
    flex-direction: column;
  }
  .about-left {
    position: relative;
    width: 100%;
    height: 50vh;
  }
  .about-right {
    margin-left: 0;
    width: 100%;
  }
}
`;

if (!css.includes('/* --- ABOUT LAYOUT --- */')) {
  css += additionalOverrides;
  fs.writeFileSync('css/style.css', css);
  console.log('done css');
}
