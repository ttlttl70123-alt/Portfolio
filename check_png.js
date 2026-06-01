const fs = require('fs');
const buffer = fs.readFileSync('images/Arrow.png');
console.log('Buffer starts with:', buffer.slice(0, 16).toString('hex'));
