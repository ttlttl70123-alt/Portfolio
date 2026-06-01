const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Undo archive-main margins
css = css.replace(/\.archive-main\s*\{[^}]*?\}/g, match => {
    let newMatch = match.replace(/max-width:\s*95%;/, 'max-width: var(--max-width);');
    newMatch = newMatch.replace(/padding:\s*20px 2\.5% var\(--space-2xl\);/, 'padding: 20px var(--space-lg) var(--space-2xl);');
    return newMatch;
});

// Undo archive-gallery gap
css = css.replace(/\.archive-gallery\s*\{\s*display:\s*flex;\s*gap:\s*12px;/g, `.archive-gallery {\n  display: flex;\n  gap: 24px;`);

// Undo archive-column gap
css = css.replace(/\.archive-column\s*\{\s*display:\s*flex;\s*flex-direction:\s*column;\s*gap:\s*12px;\s*flex:\s*1;\s*\}/g, `.archive-column {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  flex: 1;\n}`);

fs.writeFileSync('css/style.css', css, 'utf8');
console.log('Undid archive tweaks!');
