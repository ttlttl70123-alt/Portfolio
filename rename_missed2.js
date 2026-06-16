const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\HOME\\Desktop\\Figma_Optimized_Images\\03_Product_design1';

const files = fs.readdirSync(targetDir);
const folderName = 'Product_design1';

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
console.log('Renamed 03_Product_design1');
