const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const replacement = `<div class="project-card__overlay">
              <div class="project-card__auth">
                <img src="images/Lock.png" alt="Confidential" class="project-card__lock" />
                <div class="project-card__pw-container">
                  <input type="password" class="project-card__password" />
                  <button class="project-card__submit">→</button>
                </div>
              </div>
            </div>`;

// Replace the entire overlay block, which may contain an SVG and 'CONFIDENTIAL' text, or an img
const regex = /<div class="project-card__overlay">[\s\S]*?<\/div>/g;
html = html.replace(regex, replacement);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed index.html overlay!');
