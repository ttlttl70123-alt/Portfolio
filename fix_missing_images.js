const fs = require('fs');

const htmlFiles = ['index.html', 'about.html'];
const brokenWebp = [
  'download.webp',
  'I%20Believe.webp',
  'Someday%202.webp',
  'Star.webp',
  'Like%20this.webp',
  'can.webp'
];

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  brokenWebp.forEach(bad => {
    const good = bad.replace('.webp', '.png');
    content = content.split(bad).join(good);
  });
  fs.writeFileSync(file, content);
});

console.log('Fixed!');
