const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

css = css.replace('.service-modal--horizontal .service-modal__right {\n  transform: scale(0.8);\n  transform-origin: center right;\n  flex-direction: column;', '.service-modal--horizontal .service-modal__right {\n  flex-direction: column;');
css = css.replace('.service-modal--horizontal .service-modal__right {\r\n  transform: scale(0.8);\r\n  transform-origin: center right;\r\n  flex-direction: column;', '.service-modal--horizontal .service-modal__right {\n  flex-direction: column;');

fs.writeFileSync('css/style.css', css);
console.log('Cleaned scale(0.8)');

