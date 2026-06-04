const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'images', 'Noonee');
const destDir = path.join(__dirname, 'images_original', 'Noonee');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
const otherFiles = files.filter(f => f.toLowerCase() !== 'main.jpg').sort();
const mainFile = files.find(f => f.toLowerCase() === 'main.jpg');

if (mainFile) {
  fs.copyFileSync(path.join(srcDir, mainFile), path.join(destDir, 'Main.jpg'));
}

otherFiles.forEach((file, index) => {
  const ext = path.extname(file);
  const newName = (index + 1).toString().padStart(2, '0') + ext;
  fs.copyFileSync(path.join(srcDir, file), path.join(destDir, newName));
});

// Delete original bulky files in images/Noonee so optimize_all.js can write fresh ones
files.forEach(file => fs.unlinkSync(path.join(srcDir, file)));

console.log('Noonee setup complete');
