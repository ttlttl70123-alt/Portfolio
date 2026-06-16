const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\HOME\\Desktop\\Figma_Optimized_Images';

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const items = fs.readdirSync(dir);
  
  // Separate files and directories
  const files = [];
  const dirs = [];
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      dirs.push(fullPath);
    } else {
      files.push(fullPath);
    }
  }

  // Process subdirectories first (optional)
  for (const d of dirs) {
    processDirectory(d);
  }

  // Only rename if there are files
  if (files.length > 0) {
    // Sort files alphabetically so the numbering is consistent
    files.sort();
    
    // Get folder name to use as a prefix, e.g. "01_Interior design" -> "Interior design"
    const folderName = path.basename(dir).replace(/^[0-9_]+/, '').trim() || path.basename(dir);
    
    let counter = 1;
    for (const filePath of files) {
      const ext = path.extname(filePath);
      const dirName = path.dirname(filePath);
      
      // format: 01_FolderName.jpg
      const paddedCount = String(counter).padStart(2, '0');
      const newFileName = `${paddedCount}_${folderName}${ext}`;
      const newFilePath = path.join(dirName, newFileName);
      
      // Rename only if the new name is different
      if (filePath !== newFilePath) {
        fs.renameSync(filePath, newFilePath);
        console.log(`Renamed: ${path.basename(filePath)} -> ${newFileName}`);
      }
      counter++;
    }
  }
}

processDirectory(targetDir);
console.log('Renaming complete!');
