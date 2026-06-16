const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const haeundaeDir = path.join(__dirname, 'images', 'Haeundae');
const backupDir = path.join(__dirname, 'images', '_unused_originals');

async function run() {
  const newPngPath = path.join(haeundaeDir, '0_Main(blur).png');
  const targetWebpPath = path.join(haeundaeDir, '0_Main(blur)_v3.webp');
  
  // Backup v2
  const v2Path = path.join(haeundaeDir, '0_Main(blur)_v2.webp');
  if (fs.existsSync(v2Path)) {
    fs.renameSync(v2Path, path.join(backupDir, 'Haeundae_0_Main(blur)_v2.webp'));
  }

  // Convert
  if (fs.existsSync(newPngPath)) {
    console.log('Converting new PNG to WEBP (v3)...');
    await sharp(newPngPath).webp({ quality: 80 }).toFile(targetWebpPath);
    console.log('Done.');
    
    // Backup the source PNG
    fs.renameSync(newPngPath, path.join(backupDir, 'Haeundae_0_Main(blur)_original_v3.png'));
  } else {
    console.log('No new png found.');
  }
}

run().catch(console.error);
