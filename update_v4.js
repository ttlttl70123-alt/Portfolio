const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const haeundaeDir = path.join(__dirname, 'images', 'Haeundae');
const backupDir = path.join(__dirname, 'images', '_unused_originals');

async function run() {
  // 1. Restore 0_Main.webp
  const backupMain = path.join(backupDir, 'Haeundae_0_Main.webp');
  const targetMain = path.join(haeundaeDir, '0_Main.webp');
  if (fs.existsSync(backupMain)) {
    fs.copyFileSync(backupMain, targetMain);
    console.log('Restored 0_Main.webp');
  }

  // 2. Convert 0_Main(blur).png to v4
  const pngPath = path.join(haeundaeDir, '0_Main(blur).png');
  const v4Path = path.join(haeundaeDir, '0_Main(blur)_v4.webp');
  if (fs.existsSync(pngPath)) {
    await sharp(pngPath).webp({ quality: 80 }).toFile(v4Path);
    console.log('Created v4 blurred webp.');
    fs.renameSync(pngPath, path.join(backupDir, 'Haeundae_0_Main(blur)_original_v4.png'));
  }

  // 3. Move v3 to backup
  const v3Path = path.join(haeundaeDir, '0_Main(blur)_v3.webp');
  if (fs.existsSync(v3Path)) {
    fs.renameSync(v3Path, path.join(backupDir, 'Haeundae_0_Main(blur)_v3.webp'));
  }
}

run().catch(console.error);
