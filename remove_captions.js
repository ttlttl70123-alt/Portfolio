const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove the entire div containing these placeholder texts
    const regex1 = /[ \t]*<div class="pp-gallery__caption">THIS IS<br>A SAMPLE<br>DESCRIPTION<br>TEXT BOX<\/div>\r?\n?/g;
    const regex2 = /[ \t]*<div class="pp-gallery__caption">HERE IS<br>ANOTHER<br>FOUR LINE<br>EXAMPLE<\/div>\r?\n?/g;
    
    let original = content;
    content = content.replace(regex1, '');
    content = content.replace(regex2, '');
    
    if (original !== content) {
        fs.writeFileSync(file, content, 'utf8');
        count++;
        console.log(`Removed captions in ${file}`);
    }
});

console.log(`Total files updated: ${count}`);
