const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Change 02 text
html = html.replace(
  'data-desc=\"For a large-scale hospitality project, I went beyond simple<br>sculptural aesthetics to provide a compelling, evidence-based proposal.<br><br>By conducting in-depth case studies and data analysis, I defined<br>the core \\'why,\\' \\'how,\\' and \\'what\\' of the space to ensure its strategic viability.\"',
  'data-desc=\"For a large-scale hospitality project,<br>I went beyond simple sculptural aesthetics<br>to provide a compelling, evidence-based proposal.<br><br>By conducting in-depth case studies and data analysis,<br>I defined the core \\'why,\\' \\'how,\\' and \\'what\\' of the space<br>to ensure its strategic viability.\"'
);

// 2. Change 03 text
html = html.replace(
  '<span class=\"service-tag\" data-title=\"PRODUCT DESIGN\" data-desc=\"Designing every touchpoint with the user in mind, from spaces to products.\">',
  '<span class=\"service-tag\" data-title=\"Industrial design\" data-desc=\"Starting with my associate degree in industrial design,<br>followed by a period of preparing my portfolio<br>to study automotive design at ArtCenter in the US,<br>I developed a user-centric approach across furniture, product,<br>and transportation design.<br><br>I now integrate this meticulous ethos into my interior design work.\">'
);
html = html.replace(
  '<span><span class=\"service-tag__number\">03</span>PRODUCT DESIGN</span>',
  '<span><span class=\"service-tag__number\">03</span>Industrial design</span>'
);

// 3. WHAT I DO subtitle
html = html.replace('Let\\'s take a look at a project I worked on.', 'Let\\'s take a look at the projects I worked on.');

// 4. Update cache version
html = html.replace('href=\"css/style.css?v=141\"', 'href=\"css/style.css?v=174\"');
html = html.replace('script src=\"js/script.js?v=15\"', 'script src=\"js/script.js?v=35\"');

fs.writeFileSync('index.html', html);
console.log('Fixed index.html');
