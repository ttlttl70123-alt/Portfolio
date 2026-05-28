const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// Update pp-hero height
css = css.replace(
  /height: 88vh;/g,
  'height: 100vh;'
);

// Update pp-hero__overlay padding
css = css.replace(
  /padding: clamp\(32px, 5vw, 64px\) 8vw;/g,
  'padding: clamp(32px, 5vw, 64px) 10.4vw clamp(64px, 10vh, 120px);'
);

fs.writeFileSync('css/style.css', css);
console.log('CSS updated successfully');
