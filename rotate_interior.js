const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const origDir = path.join(__dirname, 'images_original', '01_Interior design');
const targetDir = path.join(__dirname, 'images', '01_Interior design');

async function fixRotation() {
    const files = fs.readdirSync(origDir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    
    for (const file of files) {
        const fullPath = path.join(origDir, file);
        const metadata = await sharp(fullPath).metadata();
        
        // 가로가 세로보다 긴 경우 (가로로 누운 사진) 90도 회전
        if (metadata.width > metadata.height) {
            console.log(`Rotating ${file} (Width: ${metadata.width}, Height: ${metadata.height})`);
            const tempPath = fullPath + '.tmp.jpg';
            await sharp(fullPath).rotate(90).toFile(tempPath);
            fs.renameSync(tempPath, fullPath); // 원본 덮어쓰기
        }
    }
    
    console.log('Rotation check complete. Re-optimizing to webp...');
    
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    
    for (const file of files) {
        const fullPath = path.join(origDir, file);
        const ext = path.extname(file).toLowerCase();
        const outPathWebp = path.join(targetDir, file.replace(new RegExp(`${ext}$`, 'i'), '.webp'));
        
        await sharp(fullPath)
            // 회전된 최신 이미지를 바탕으로 다시 webp 압축
            .resize({ width: 2560, withoutEnlargement: true })
            .webp({ quality: 80, effort: 4 })
            .toFile(outPathWebp);
        console.log(`Optimized ${file} to webp`);
    }
}

fixRotation().catch(console.error);
