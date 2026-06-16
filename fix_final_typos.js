const fs = require('fs');
const path = require('path');

// 1. Rename files and folders
function renameRecursive(dir) {
    if (!fs.existsSync(dir)) return;
    const items = fs.readdirSync(dir);
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const isDir = fs.statSync(fullPath).isDirectory();
        
        if (isDir) {
            renameRecursive(fullPath);
        }
        
        if (item.includes('Archive') || item.includes('Thumbnail')) {
            const newItem = item.replace(/Archive/g, 'Archive').replace(/Thumbnail/g, 'Thumbnail');
            const newPath = path.join(dir, newItem);
            fs.renameSync(fullPath, newPath);
            console.log(`Renamed: ${item} -> ${newItem}`);
        }
    }
}

renameRecursive(path.join(__dirname, 'images'));
renameRecursive(path.join(__dirname, 'images_original'));

// 2. Update contents in HTML, CSS, JS
function updateFileContents(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'images' && file !== 'images_original') {
                updateFileContents(fullPath);
            }
        } else if (file.match(/\.(html|css|js)$/)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = false;
            
            if (content.includes('Archive')) {
                content = content.replace(/Archive/g, 'Archive');
                updated = true;
            }
            if (content.includes('Thumbnail')) {
                content = content.replace(/Thumbnail/g, 'Thumbnail');
                updated = true;
            }
            
            if (updated) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated content in: ${file}`);
            }
        }
    }
}

updateFileContents(__dirname);
console.log('Final typo check and replacement complete.');
