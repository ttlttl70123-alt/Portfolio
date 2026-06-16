const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const origDir = path.join(__dirname, 'images_original');
const targetDir = path.join(__dirname, 'images');

// 1. Process images
async function processImages(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const relPath = path.relative(origDir, fullPath);
        const outPathBase = path.join(targetDir, relPath);
        
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fs.existsSync(outPathBase)) {
                fs.mkdirSync(outPathBase, { recursive: true });
            }
            await processImages(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png'].includes(ext)) {
                const outPathWebp = outPathBase.replace(new RegExp(`${ext}$`, 'i'), '.webp');
                console.log(`Processing: ${relPath}`);
                try {
                    await sharp(fullPath)
                        .rotate() // EXIF 데이터에 맞춰 올바른 방향으로 자동 회전
                        .resize({ width: 2560, withoutEnlargement: true })
                        .webp({ quality: 80, effort: 4 })
                        .toFile(outPathWebp);
                    
                    // Delete the original jpg/png from the target directory to save space
                    if (fs.existsSync(outPathBase)) {
                        fs.unlinkSync(outPathBase);
                    }
                } catch (e) {
                    console.error(`Error processing ${relPath}:`, e.message);
                }
            }
        }
    }
}

// 2. Update HTML and CSS files
function updateReferences() {
    const rootDir = __dirname;
    const files = fs.readdirSync(rootDir);
    
    // Process HTML
    const htmlFiles = files.filter(f => f.endsWith('.html'));
    for (const file of htmlFiles) {
        const filePath = path.join(rootDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace .jpg, .jpeg, .png with .webp (case insensitive)
        content = content.replace(/\.(jpg|jpeg|png)([\s"'\?])/gi, '.webp$2');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated HTML: ${file}`);
    }

    // Process CSS
    const cssPath = path.join(rootDir, 'css', 'style.css');
    if (fs.existsSync(cssPath)) {
        let cssContent = fs.readFileSync(cssPath, 'utf8');
        cssContent = cssContent.replace(/\.(jpg|jpeg|png)([\s"'\?])/gi, '.webp$2');
        fs.writeFileSync(cssPath, cssContent, 'utf8');
        console.log(`Updated CSS: style.css`);
    }
}

async function run() {
    console.log("Starting image optimization...");
    await processImages(origDir);
    console.log("Image optimization complete.");
    
    console.log("Updating file references...");
    updateReferences();
    console.log("References updated.");
}

run();
