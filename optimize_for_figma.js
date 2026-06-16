const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDir = 'C:\\Users\\HOME\\Desktop\\portfolio\\images_original';
const outputDir = 'C:\\Users\\HOME\\Desktop\\Figma_Optimized_Images';

// Ensure output dir exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function ensureDir(filePath) {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
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
      const relativePath = path.relative(inputDir, fullPath);
      let outPath = path.join(outputDir, relativePath);
      ensureDir(outPath);
      
      if (['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'].includes(ext)) {
        try {
          const image = sharp(fullPath);
          const metadata = await image.metadata();
          
          let pipeline = image;
          
          // Resize if larger than 2560 on either side to save space, but large enough for 1980x1080 without quality loss
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
            // Convert everything else to high-quality JPG
            outPath = outPath.replace(new RegExp(ext + '$'), '.jpg');
            pipeline = pipeline.jpeg({ quality: 90, mozjpeg: true });
          }
          
          await pipeline.toFile(outPath);
          console.log(`Optimized: ${relativePath}`);
        } catch (err) {
          console.error(`Error processing ${relativePath}:`, err.message);
          // Fallback: just copy
          fs.copyFileSync(fullPath, outPath);
        }
      } else {
        // Just copy other files like SVG
        fs.copyFileSync(fullPath, outPath);
        console.log(`Copied: ${relativePath}`);
      }
    }
  }
}

processImages(inputDir).then(() => {
  console.log('All images optimized and saved to ' + outputDir);
}).catch(console.error);
