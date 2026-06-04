const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'images', 'Noonee');
const files = fs.readdirSync(dir).filter(f => f.match(/^\d{2}\.jpg$/)).sort();

async function analyze() {
  let html = '    <div class="pp-gallery">\n';
  let side = 'left'; 
  for (const file of files) {
    const metadata = await sharp(path.join(dir, file)).metadata();
    const isPortrait = metadata.height > metadata.width;
    
    if (isPortrait) {
      if (side === 'left') {
        html += `      <img src="images/Noonee/${file}" alt="" class="pp-gallery__img-placeholder portrait" loading="lazy">\n`;
        html += `      <div class="pp-gallery__empty"></div>\n`;
        side = 'right';
      } else {
        html += `      <div class="pp-gallery__empty"></div>\n`;
        html += `      <img src="images/Noonee/${file}" alt="" class="pp-gallery__img-placeholder portrait" loading="lazy">\n`;
        side = 'left';
      }
    } else {
      html += `      <img src="images/Noonee/${file}" alt="" class="pp-gallery__img-placeholder landscape" loading="lazy">\n`;
    }
  }
  html += '    </div>';
  console.log(html);
}

analyze().catch(console.error);
