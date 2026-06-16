const fs = require('fs');
const path = require('path');

const oldDir = path.join(__dirname, 'images', '01_Interior design');
const newDir = path.join(__dirname, 'images', '01_Interior design');

if (fs.existsSync(oldDir)) {
    fs.renameSync(oldDir, newDir);
    console.log('Renamed folder 01_Interior design -> 01_Interior design');
} else {
    console.log('Folder 01_Interior design not found, might be already renamed.');
}

const walkSync = function(dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                filelist = walkSync(path.join(dir, file), filelist);
            }
        }
        else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

const allFiles = walkSync(__dirname);
const textFiles = allFiles.filter(f => f.endsWith('.html') || f.endsWith('.css') || f.endsWith('.js'));

let changedCount = 0;
for (const file of textFiles) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('01_Interior design')) {
        content = content.replace(/01_Interior design/g, '01_Interior design');
        fs.writeFileSync(file, content);
        changedCount++;
    }
}
console.log(`Fixed 'desgin' typo in ${changedCount} text files.`);
