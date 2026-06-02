const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'images/3d_visualization';
const files = fs.readdirSync(dir);

async function processFiles() {
  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const inputPath = path.join(dir, file);
      const ext = path.extname(file);
      const basename = path.basename(file, ext);
      const outputPath = path.join(dir, basename + '.webp');
      
      console.log('Optimizing ' + file + '...');
      await sharp(inputPath)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log('Saved to ' + outputPath);
      
      // Delete the original file after successful conversion to save space
      fs.unlinkSync(inputPath);
    }
  }
}

processFiles().catch(console.error);
