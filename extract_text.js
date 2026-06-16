const fs = require('fs');
const path = require('path');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

let textData = {};

function extractText(html) {
  const texts = [];
  // Basic regex to find content between tags
  const regex = /<(h[1-6]|p|div|span|a)[^>]*>([^<]+)<\/\1>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const content = match[2].trim();
    if (content.length > 10 && !content.includes('{')) {
      texts.push(content);
    }
  }
  
  // also get texts with <br>
  const brRegex = /<(h[1-6]|p|div|span|a)[^>]*>((?:[^<]+|<br\s*\/?>)+)<\/\1>/gi;
  while ((match = brRegex.exec(html)) !== null) {
    const content = match[2].replace(/<br\s*\/?>/gi, ' ').trim();
    if (content.length > 20 && !content.includes('{')) {
      texts.push(content);
    }
  }
  
  // Also get data-desc attributes
  const descRegex = /data-desc="([^"]+)"/g;
  while ((match = descRegex.exec(html)) !== null) {
    texts.push(match[1].replace(/<br\s*\/?>/gi, ' ').trim());
  }

  return [...new Set(texts)];
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const fileTexts = extractText(html);
  if (fileTexts.length > 0) {
    textData[file] = fileTexts;
  }
}

fs.writeFileSync('texts.json', JSON.stringify(textData, null, 2));
console.log('Done');
