const fs = require('fs');
const path = require('path');
const imagesDir = path.join(__dirname, 'images');
const nestedImagesDir = path.join(imagesDir, 'images');

// 1. Delete original jpg/png from images (but NOT inside nested images directory, though there shouldn't be any)
function deleteOriginals(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fullPath === nestedImagesDir) continue; // skip the nested folder
        if (fs.statSync(fullPath).isDirectory()) {
            deleteOriginals(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                fs.unlinkSync(fullPath);
            }
        }
    }
}

// 2. Move webp files from nested directory up
function moveFiles(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    const files = fs.readdirSync(src);
    for (const file of files) {
        const srcPath = path.join(src, file);
        const destPath = path.join(dest, file);
        if (fs.statSync(srcPath).isDirectory()) {
            moveFiles(srcPath, destPath);
        } else {
            // overwrite if exists (shouldn't, but just in case)
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            fs.renameSync(srcPath, destPath);
        }
    }
}

console.log("Deleting old jpg/png files from images...");
deleteOriginals(imagesDir);

console.log("Moving optimized webp files...");
if (fs.existsSync(nestedImagesDir)) {
    moveFiles(nestedImagesDir, imagesDir);
    fs.rmSync(nestedImagesDir, { recursive: true, force: true });
}

console.log("Fixing backup folder structure...");
const backupDir = path.join(__dirname, 'images_original');
const nestedBackupDir = path.join(backupDir, 'images');
if (fs.existsSync(nestedBackupDir)) {
    moveFiles(nestedBackupDir, backupDir);
    fs.rmSync(nestedBackupDir, { recursive: true, force: true });
}

console.log("Done!");
