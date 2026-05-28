const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// Update pp-hero height to 94vh (midpoint of 88vh and 100vh)
css = css.replace(
  /height: 100vh;/g,
  'height: 94vh;'
);

// Update pp-hero__overlay padding to left 5.2vw
css = css.replace(
  /padding: clamp\(32px, 5vw, 64px\) 10.4vw clamp\(64px, 10vh, 120px\);/g,
  'padding: clamp(32px, 5vw, 64px) 10.4vw clamp(64px, 10vh, 120px) 5.2vw;'
);

fs.writeFileSync('css/style.css', css);
console.log('CSS updated successfully');
