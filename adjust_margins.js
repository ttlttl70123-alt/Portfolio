const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Adjust title margin-left (slightly to the right)
css = css.replace(/margin-left:\s*clamp\(2rem,\s*8vw,\s*10rem\);/, 
`margin-left: clamp(1rem, 4vw, 5rem);`);

// Adjust content margin-left (a bit more to the right)
css = css.replace(/margin-left:\s*clamp\(1rem,\s*4vw,\s*5rem\);/, 
`margin-left: clamp(2rem, 8vw, 10rem);`);

fs.writeFileSync('css/style.css', css, 'utf8');
