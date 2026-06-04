const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'images/H project';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png')).sort();

async function checkSizes() {
  for (const f of files) {
    try {
      const meta = await sharp(path.join(dir, f)).metadata();
      const isPortrait = meta.height > meta.width;
      console.log(`${f}: ${meta.width}x${meta.height} - ${isPortrait ? 'Portrait' : 'Landscape'}`);
    } catch(e) {
      console.log(f, 'Error');
    }
  }
}
checkSizes();
