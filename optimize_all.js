const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = 'images_original';
const destDir = 'images';

async function processDir(currentPath) {
  if (!fs.existsSync(currentPath)) return;
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(currentPath, entry.name);
    const destPath = srcPath.replace(srcDir, destDir);

    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      await processDir(srcPath);
    } else {
      if (entry.name.match(/\.(png|jpg|jpeg)$/i) && !entry.name.startsWith('opt_')) {
        try {
          console.log(`Optimizing ${srcPath}...`);
          let transform = sharp(srcPath).resize({ width: 1920, withoutEnlargement: true });
          
          if (entry.name.match(/\.(jpg|jpeg)$/i)) {
            transform = transform.jpeg({ quality: 80, mozjpeg: true });
          } else if (entry.name.match(/\.png$/i)) {
            transform = transform.png({ quality: 80, compressionLevel: 9, palette: true });
          }
          
          await transform.toFile(destPath);
          console.log(`Saved optimized to ${destPath}`);
        } catch (e) {
          console.error(`Error optimizing ${srcPath}`, e);
          // Fallback to copy if optimization fails
          fs.copyFileSync(srcPath, destPath);
        }
      } else {
        // Just copy other files like .svg, .webp, or already optimized ones
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

processDir(srcDir).then(() => console.log('Optimization complete!')).catch(console.error);
