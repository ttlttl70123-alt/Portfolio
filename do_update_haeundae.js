const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const baseDir = __dirname;
const imagesDir = path.join(baseDir, 'images', 'Haeundae');
const newImagesDir = path.join(imagesDir, 'New');
const originalDir = path.join(baseDir, 'images_original', 'Haeundae');
const backupDir = path.join(baseDir, 'images_backup', 'Haeundae');

// Ensure directories exist
if (!fs.existsSync(originalDir)) fs.mkdirSync(originalDir, { recursive: true });
if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });

async function run() {
    // 1. Get current images (excluding 0_Main.webp and image 81.webp)
    const existingFiles = fs.readdirSync(imagesDir).filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.jpg'));
    const filesToBackup = existingFiles.filter(f => f !== '0_Main.webp' && f !== '0_Main(blur).webp' && f !== 'image 81.webp' && f !== 'Haeundae_0_Main(blur)_original_v3.png');

    for (const f of filesToBackup) {
        const oldPath = path.join(imagesDir, f);
        const backupPath = path.join(backupDir, f);
        fs.copyFileSync(oldPath, backupPath);
        fs.unlinkSync(oldPath);
        console.log(`Backed up and removed: ${f}`);
    }

    // 2. Get new images
    if (!fs.existsSync(newImagesDir)) {
        console.error("New directory not found!");
        return;
    }
    const newFiles = fs.readdirSync(newImagesDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp'));
    
    // Sort numerically by filename
    newFiles.sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] || '0', 10);
        const numB = parseInt(b.match(/\d+/)?.[0] || '0', 10);
        return numA - numB;
    });

    console.log("New images to process:", newFiles);

    // 3. Process new images
    let newIndex = 1;
    const newWebpNames = [];
    for (const f of newFiles) {
        const fullPath = path.join(newImagesDir, f);
        
        // Save original to images_original/Haeundae/
        // Use the original name but prefix to avoid collision or just keep original name if we want.
        // Let's use `New_${f}` or just keep `${newIndex}_original.png`
        const ext = path.extname(f);
        const origDest = path.join(originalDir, `New_${path.basename(f, ext)}${ext}`);
        fs.copyFileSync(fullPath, origDest);

        // Optimize and save to images/Haeundae/{index}.webp
        const webpName = `${newIndex}.webp`;
        const webpDest = path.join(imagesDir, webpName);
        
        await sharp(fullPath)
            .rotate()
            .resize({ width: 2560, withoutEnlargement: true })
            .webp({ quality: 80, effort: 4 })
            .toFile(webpDest);
            
        console.log(`Optimized ${f} to ${webpName}`);
        newWebpNames.push(`images/Haeundae/${webpName}`);
        newIndex++;
    }

    // 4. Delete the 'New' folder
    for (const f of fs.readdirSync(newImagesDir)) {
        fs.unlinkSync(path.join(newImagesDir, f));
    }
    fs.rmdirSync(newImagesDir);
    console.log("Deleted New directory.");

    // 5. Update HTML file
    const htmlPath = path.join(baseDir, 'haeundae-project.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');

    let replaceIndex = 0;
    // Match <img src="images/Haeundae/..." but only inside the gallery area or sequentially.
    // Since we know the exact structure, we can replace the src attribute of images that are NOT 0_Main and NOT image 81.webp.
    
    htmlContent = htmlContent.replace(/<img[^>]+src="([^"]+)"[^>]*>/g, (match, src) => {
        if (src.includes('images/Haeundae/') && !src.includes('0_Main') && !src.includes('image 81.webp')) {
            if (replaceIndex < newWebpNames.length) {
                const newMatch = match.replace(src, newWebpNames[replaceIndex]);
                replaceIndex++;
                return newMatch;
            }
        }
        return match;
    });

    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log(`Updated HTML, replaced ${replaceIndex} image references.`);
}

run().catch(console.error);
