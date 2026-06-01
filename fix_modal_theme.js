const fs = require('fs');

let css = fs.readFileSync('css/style.css', 'utf8');

// Modal Background
css = css.replace(/\.service-modal__content\s*\{([^}]*?)background-color:\s*#050505;([^}]*?)\}/g, `.service-modal__content {$1background-color: #ffffff;$2}`);

// Close Button
css = css.replace(/\.service-modal__close\s*\{([^}]*?)color:\s*var\(--color-text-muted\);([^}]*?)\}/g, `.service-modal__close {$1color: #000000;$2}`);
css = css.replace(/\.service-modal__close:hover\s*\{([^}]*?)color:\s*var\(--color-text-light\);([^}]*?)\}/g, `.service-modal__close:hover {$1color: var(--color-accent);$2}`);

// Title
css = css.replace(/\.service-modal__title\s*\{([^}]*?)color:\s*var\(--color-text-light\);([^}]*?)\}/g, `.service-modal__title {$1color: #000000;$2}`);

// Body & Desc
css = css.replace(/\.service-modal__body\s*\{([^}]*?)color:\s*var\(--color-text-muted-light\);([^}]*?)\}/g, `.service-modal__body {$1color: #333333;$2}`);
css = css.replace(/\.service-modal__desc\s*\{([^}]*?)color:\s*var\(--color-text-muted-light\);([^}]*?)\}/g, `.service-modal__desc {$1color: #333333;$2}`);

// Side Thumbnails Background
css = css.replace(/\.gallery-side-thumb\s*\{([^}]*?)background-color:\s*#1a1a1a;([^}]*?)\}/g, `.gallery-side-thumb {$1background-color: #e0e0e0;$2}`);

// Side Thumbnails Overlay
css = css.replace(/\.gallery-side-overlay\s*\{([^}]*?)background-color:\s*rgba\(0,\s*0,\s*0,\s*0\.5\);([^}]*?)\}/g, `.gallery-side-overlay {$1background-color: rgba(255, 255, 255, 0.6);$2}`);

// Nav Arrows (assuming they might be over white or image, let's keep them black with white shadow for visibility)
css = css.replace(/\.gallery-nav\s*\{([^}]*?)color:\s*#ffffff;([^}]*?)filter:\s*drop-shadow\(0 2px 4px rgba\(0, 0, 0, 0\.8\)\) drop-shadow\(0 8px 16px rgba\(0, 0, 0, 0\.4\)\);([^}]*?)\}/g, `.gallery-nav {$1color: #000000;$2filter: drop-shadow(0 2px 4px rgba(255, 255, 255, 0.8)) drop-shadow(0 8px 16px rgba(255, 255, 255, 0.4));$3}`);

fs.writeFileSync('css/style.css', css, 'utf8');
