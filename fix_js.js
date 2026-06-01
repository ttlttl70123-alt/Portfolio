const fs = require('fs');
let js = fs.readFileSync('js/script.js', 'utf8');

js = js.replace(/authOverlay\.classList\.add\('is-error'\);\s*authOverlay\.classList\.add\('is-red'\);\s*setTimeout\(\(\) => \{\s*authOverlay\.classList\.remove\('is-red'\);\s*\}, 75\);\s*setTimeout\(\(\) => \{\s*authOverlay\.classList\.remove\('is-error'\);/g, `pwInput.classList.add('is-error');
              setTimeout(() => {
                pwInput.classList.remove('is-error');`);

js = js.replace(/pwInput\.value = '';\s*pwInput\.focus\(\);\s*\}, 300\);/g, `pwInput.value = '';
                pwInput.focus();
              }, 400);`);

fs.writeFileSync('js/script.js', js, 'utf8');
console.log('Fixed js/script.js');
