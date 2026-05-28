const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const dividerIdx = html.indexOf('<div class="dark-section__divider"></div>');
const startOfExperience = html.indexOf('<!-- ② 경력 & 프로젝트 통계 -->');
const endOfTools = html.indexOf('</section>', startOfExperience);

if (dividerIdx > -1 && startOfExperience > -1 && endOfTools > -1) {
  const experienceContent = html.substring(startOfExperience, endOfTools);
  
  const beforeHero = html.substring(0, html.indexOf('<!-- ===== HERO SECTION ===== -->'));
  const darkSectionStart = `  <section class="dark-section" id="about">
    <div class="dark-section__inner">
      <div class="dark-section__content">
`;
  
  const footerAndBeyond = html.substring(html.indexOf('<!-- ===== FOOTER ===== -->'));
  
  const aboutHtml = beforeHero + darkSectionStart + experienceContent + '    </div>\n  </section>\n\n' + footerAndBeyond;
  
  // Fix the link in about.html so "projects__more-link" is just styled, we might not need to change much else.
  // Actually, wait, let's bump the v numbers too.
  let finalAboutHtml = aboutHtml.replace(/css\/style\.css\?v=[0-9]+/g, 'css/style.css?v=256');
  finalAboutHtml = finalAboutHtml.replace(/js\/script\.js\?v=[0-9]+/g, 'js/script.js?v=256');
  // Also we should change the document title maybe? 
  finalAboutHtml = finalAboutHtml.replace('<title>HYEONG-U LEE | PORTFOLIO</title>', '<title>ABOUT | HYEONG-U LEE</title>');
  
  fs.writeFileSync('about.html', finalAboutHtml);
  
  const moreAboutLink = `
        <div style="text-align: center; margin-top: 4rem; padding-bottom: 4rem;">
          <a href="about.html" class="projects__more-link" style="color: #fff;">MORE ABOUT →</a>
        </div>
`;
  
  let newIndexHtml = html.substring(0, dividerIdx) + moreAboutLink + html.substring(endOfTools);
  newIndexHtml = newIndexHtml.replace(/css\/style\.css\?v=[0-9]+/g, 'css/style.css?v=256');
  newIndexHtml = newIndexHtml.replace(/js\/script\.js\?v=[0-9]+/g, 'js/script.js?v=256');
  fs.writeFileSync('index.html', newIndexHtml);
  console.log('done');
} else {
  console.log('Could not find markers');
}
