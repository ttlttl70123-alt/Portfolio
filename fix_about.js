const fs = require('fs');
const { execSync } = require('child_process');

const html = execSync('git show HEAD:index.html').toString('utf8');

const dividerIdx = html.indexOf('<div class="dark-section__divider"></div>');
const startOfExperience = html.indexOf('<!-- ② 경력 & 프로젝트 통계 -->');
const endOfTools = html.indexOf('</section>', startOfExperience);
const footerIdx = html.indexOf('<!-- ===== FOOTER (CONTACT) ===== -->');

if (dividerIdx > -1 && startOfExperience > -1 && endOfTools > -1 && footerIdx > -1) {
  const experienceContent = html.substring(startOfExperience, endOfTools);
  
  const beforeHero = html.substring(0, html.indexOf('<!-- ===== HERO SECTION ===== -->'));
  const darkSectionStart = '  <section class="dark-section" id="about">\n    <div class="dark-section__inner">\n      <div class="dark-section__content">\n';
  const footerAndBeyond = html.substring(footerIdx);
  
  let aboutHtml = beforeHero + darkSectionStart + experienceContent + '      </div>\n    </div>\n  </section>\n\n  ' + footerAndBeyond;
  
  aboutHtml = aboutHtml.replace(/css\/style\.css\?v=[0-9]+/g, 'css/style.css?v=258');
  aboutHtml = aboutHtml.replace(/js\/script\.js\?v=[0-9]+/g, 'js/script.js?v=258');
  aboutHtml = aboutHtml.replace('<title>HYEONG-U LEE | PORTFOLIO</title>', '<title>ABOUT | HYEONG-U LEE</title>');
  aboutHtml = aboutHtml.replace('<a href="#" class="header__logo">HYEONG-U LEE</a>', '<a href="index.html" class="header__logo">HYEONG-U LEE</a>');
  
  const oldNav = `<nav class="header__nav" id="main-nav">
      <a href="#projects" class="header__link">PROJECTS</a>
      <a href="#about" class="header__link">ABOUT</a>
      <a href="#contact" class="header__link">CONTACT</a>
    </nav>`;
  const newNav = `<nav class="header__nav" id="main-nav">
      <a href="index.html#projects" class="header__link">PROJECTS</a>
      <a href="#about" class="header__link">ABOUT</a>
      <a href="index.html#contact" class="header__link">CONTACT</a>
    </nav>`;
  aboutHtml = aboutHtml.replace(oldNav, newNav);
  
  fs.writeFileSync('about.html', aboutHtml);
  
  const moreAboutLink = '\n        <div style="text-align: center; margin-top: 4rem; padding-bottom: 4rem;">\n          <a href="about.html" class="projects__more-link" style="color: #fff;">MORE ABOUT →</a>\n        </div>\n';
  
  let newIndexHtml = html.substring(0, dividerIdx) + moreAboutLink + '      </div>\n    </div>\n  ' + html.substring(endOfTools);
  newIndexHtml = newIndexHtml.replace(/css\/style\.css\?v=[0-9]+/g, 'css/style.css?v=258');
  newIndexHtml = newIndexHtml.replace(/js\/script\.js\?v=[0-9]+/g, 'js/script.js?v=258');
  
  newIndexHtml = newIndexHtml.replace('<a href="#about" class="header__link">ABOUT</a>', '<a href="about.html" class="header__link">ABOUT</a>');
  
  fs.writeFileSync('index.html', newIndexHtml);
  console.log('Fixed both files perfectly');
} else {
  console.log('Error finding markers');
}
