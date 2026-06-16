const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = 'C:\\Users\\HOME\\Desktop\\portfolio\\images\\3d_visualization';
const outputDir = 'C:\\Users\\HOME\\Desktop\\Figma_Optimized_Images\\3d_visualization';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processImages(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processImages(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      let outPath = path.join(outputDir, file);
      
      if (['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'].includes(ext)) {
        try {
          const image = sharp(fullPath);
          const metadata = await image.metadata();
          
          let pipeline = image;
          
          if (metadata.width > 2560 || metadata.height > 2560) {
            pipeline = pipeline.resize({
              width: 2560,
              height: 2560,
              fit: 'inside',
              withoutEnlargement: true
            });
          }
          
          if (ext === '.png') {
            pipeline = pipeline.png({ quality: 90, compressionLevel: 8 });
          } else {
            outPath = outPath.replace(new RegExp(ext + '$'), '.jpg');
            pipeline = pipeline.jpeg({ quality: 90, mozjpeg: true });
          }
          
          await pipeline.toFile(outPath);
          console.log(`Optimized: ${file}`);
        } catch (err) {
          console.error(`Error processing ${file}:`, err.message);
          fs.copyFileSync(fullPath, outPath);
        }
      } else {
        fs.copyFileSync(fullPath, outPath);
      }
    }
  }
}

processImages(inputDir).then(() => {
  console.log('Done optimizing 3d_visualization');
}).catch(console.error);
