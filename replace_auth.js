const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacement1 = '<div class="project-card__overlay">\n              <div class="project-card__auth">\n                <img src="images/Lock.png" alt="Confidential" class="project-card__lock" />\n                <div class="project-card__pw-container">\n                  <input type="password" class="project-card__password" placeholder="Password" />\n                  <button class="project-card__submit">→</button>\n                </div>\n              </div>\n            </div>';

html = html.replace(/<div class="project-card__overlay">\s*<img src="images\/Lock\.png" alt="Confidential" class="project-card__lock" \/>\s*<\/div>/g, replacement1);

fs.writeFileSync('index.html', html, 'utf8');
