const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Ensure the divider has max-width: 100% in .page-about so it matches the tags exactly
if (!css.includes('.page-about .dark-section__divider {\n  width: 100%;\n  max-width: 100%;\n  margin: 0 auto;\n}')) {
    css += `\n.page-about .dark-section__divider {\n  width: 100%;\n  max-width: 100%;\n  margin: 0 auto;\n}\n`;
}

// Ensure the ABOUT ME header matches the divider width
if (!css.includes('.page-about .projects__header {\n  width: 100%;\n  max-width: 100%;\n  margin: 0 auto;\n}')) {
    css += `\n.page-about .projects__header {\n  width: 100%;\n  max-width: 100%;\n  margin: 0 auto;\n}\n`;
}

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Fixed overrides!');
