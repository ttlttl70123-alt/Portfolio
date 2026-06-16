const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
  });

  const page = await browser.newPage();
  
  // create output directory
  const outDir = path.join(__dirname, 'pdf_export');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir);
  }

  // list of pages to convert
  const files = [
    'index.html',
    'about.html',
    'projects.html'
  ];

  for (const file of files) {
    const fileUrl = `file:///${path.join(__dirname, file).replace(/\\/g, '/')}`;
    console.log(`Converting ${file} to PDF...`);
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    await page.pdf({
      path: path.join(outDir, file.replace('.html', '.pdf')),
      format: 'A4',
      printBackground: true,
    });
    console.log(`Saved ${file.replace('.html', '.pdf')}`);
  }

  await browser.close();
  console.log('PDF generation complete!');
})();
