const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const haeundaeDir = path.join(__dirname, 'images', 'Haeundae');
const backupDir = path.join(__dirname, 'images', '_unused_originals');

// Ensure backup dir exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

async function run() {
  const newPngPath = path.join(haeundaeDir, '0_Main(blur).png');
  const targetWebpPath = path.join(haeundaeDir, '0_Main(blur)_v2.webp');
  
  // Backup old files if they exist
  const oldFilesToBackup = [
    '0_Main.webp',
    '0_Main.png',
    '0_Main.jpg',
    '0_Main(blur).webp'
  ];
  
  for (const file of oldFilesToBackup) {
    const filePath = path.join(haeundaeDir, file);
    if (fs.existsSync(filePath)) {
      const backupPath = path.join(backupDir, `Haeundae_${file}`);
      fs.renameSync(filePath, backupPath);
      console.log(`Backed up ${file} to ${backupPath}`);
    }
  }

  // Convert the new PNG to WEBP
  if (fs.existsSync(newPngPath)) {
    console.log('Converting new PNG to WEBP...');
    await sharp(newPngPath)
      .webp({ quality: 80 })
      .toFile(targetWebpPath);
    console.log('Conversion successful: ' + targetWebpPath);
    
    // Move the new PNG to backup as well (since we use webp)
    const backupPngPath = path.join(backupDir, 'Haeundae_0_Main(blur)_original.png');
    fs.renameSync(newPngPath, backupPngPath);
    console.log(`Moved original PNG to backup: ${backupPngPath}`);
  } else {
    console.error('New PNG not found!');
  }
}

run().catch(console.error);
