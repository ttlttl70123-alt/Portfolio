const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const baseDir = 'C:\\Users\\HOME\\Desktop\\Figma_Optimized_Images';
const targetFolders = [
  '01_Interior design',
  '03_Product_design1',
  '3d_visualization'
];

async function compressThumbnails() {
  for (const folder of targetFolders) {
    const dirPath = path.join(baseDir, folder);
    const outDir = path.join(dirPath, 'Thumbnail_Compressed');
    
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir);
    }
    
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);
      
      // Skip directories (including the newly created Thumbnail_Compressed)
      if (stat.isFile()) {
        const ext = path.extname(file).toLowerCase();
        let outPath = path.join(outDir, file);
        
        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
          try {
            const image = sharp(fullPath);
            let pipeline = image;
            
            // Resize to fit within 1000x1000 (roughly 1.5x of 670 for retina sharpness, but still very small)
            pipeline = pipeline.resize({
              width: 800,
              height: 800,
              fit: 'inside',
              withoutEnlargement: true
            });
            
            if (ext === '.png') {
              pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
            } else {
              pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
            }
            
            await pipeline.toFile(outPath);
            console.log(`Compressed thumb: ${folder}/${file}`);
          } catch (err) {
            console.error(`Error processing ${file}:`, err.message);
          }
        }
      }
    }
  }
}

compressThumbnails().then(() => {
  console.log('Thumbnail compression complete!');
}).catch(console.error);
