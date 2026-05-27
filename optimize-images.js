const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Install sharp if not exists
try {
  require.resolve('sharp');
} catch (e) {
  console.log('Installing sharp...');
  execSync('npm install sharp', { stdio: 'inherit' });
}

const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'images');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

async function optimizeImages() {
  const filesToOptimize = [];
  walkDir(imagesDir, (filePath) => {
    if (filePath.match(/\.(png|jpe?g)$/i)) {
      filesToOptimize.push(filePath);
    }
  });

  for (const file of filesToOptimize) {
    const ext = path.extname(file);
    const webpPath = file.replace(new RegExp(`${ext}$`, 'i'), '.webp');
    
    // Skip if webp already exists and is newer
    if (fs.existsSync(webpPath)) {
      if (fs.statSync(webpPath).mtime > fs.statSync(file).mtime) {
        continue;
      }
    }

    console.log(`Optimizing: ${file} -> ${webpPath}`);
    try {
      await sharp(file)
        .webp({ quality: 80, effort: 4 })
        .toFile(webpPath);
      console.log(`Successfully converted ${path.basename(file)}`);
    } catch (err) {
      console.error(`Error converting ${file}:`, err);
    }
  }
  
  console.log('All images optimized!');
}

optimizeImages();
