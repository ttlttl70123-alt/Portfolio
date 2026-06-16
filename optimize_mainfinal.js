const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputFile = 'C:\\Users\\HOME\\Desktop\\portfolio\\images\\3d_visualization\\mainfinal.png';
const outputDir = 'C:\\Users\\HOME\\Desktop\\Figma_Optimized_Images\\3d_visualization';

(async () => {
  try {
    const ext = path.extname(inputFile).toLowerCase();
    let outPath = path.join(outputDir, path.basename(inputFile));
    
    const image = sharp(inputFile);
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
    console.log(`Optimized: mainfinal.png`);
    
    // Rename it to match the convention: find the next available number
    const files = fs.readdirSync(outputDir).filter(f => f.includes('3d_visualization'));
    const maxCount = files.length;
    const newCount = String(maxCount + 1).padStart(2, '0');
    const newName = `${newCount}_3d_visualization${path.extname(outPath)}`;
    
    fs.renameSync(outPath, path.join(outputDir, newName));
    console.log(`Renamed to: ${newName}`);
    
  } catch (err) {
    console.error(`Error:`, err.message);
  }
})();
