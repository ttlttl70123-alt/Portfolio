const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'images');
const origDir = path.join(__dirname, 'images_original');

const walkSync = function(dir, filelist) {
  if (!fs.existsSync(dir)) return filelist || [];
  const files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

// 1. Move unoptimized files from images to images_original
const imgFiles = walkSync(imgDir);
imgFiles.forEach(f => {
    const ext = path.extname(f).toLowerCase();
    if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const rel = path.relative(imgDir, f);
        const origPath = path.join(origDir, rel);
        if (!fs.existsSync(path.dirname(origPath))) {
            fs.mkdirSync(path.dirname(origPath), { recursive: true });
        }
        fs.renameSync(f, origPath);
        console.log(`Moved ${rel} to images_original`);
    }
});

// 2. Move manually optimized .webp files from images_original to images
const origFiles = walkSync(origDir);
origFiles.forEach(f => {
    const ext = path.extname(f).toLowerCase();
    if (ext === '.webp') {
        const rel = path.relative(origDir, f);
        const targetPath = path.join(imgDir, rel);
        if (!fs.existsSync(path.dirname(targetPath))) {
            fs.mkdirSync(path.dirname(targetPath), { recursive: true });
        }
        fs.renameSync(f, targetPath);
        console.log(`Moved ${rel} to images`);
    }
});
