const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\HOME\\Desktop\\Figma_Optimized_Images\\02_Spatial_Strategy_Planning';

const files = fs.readdirSync(targetDir);
const folderName = 'Spatial_Strategy_Planning';

let counter = 1;
for (const file of files) {
  const filePath = path.join(targetDir, file);
  if (fs.statSync(filePath).isFile()) {
    const ext = path.extname(file);
    const paddedCount = String(counter).padStart(2, '0');
    const newFileName = `${paddedCount}_${folderName}${ext}`;
    fs.renameSync(filePath, path.join(targetDir, newFileName));
    counter++;
  }
}
console.log('Renamed 02_Spatial_Strategy_Planning');
