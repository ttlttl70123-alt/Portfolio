const sharp = require('sharp');
const fs = require('fs');

async function convert() {
  try {
    await sharp('images/CANADA.webp').png().toFile('images/CANADA.png');
    console.log('Successfully converted images/CANADA.webp to images/CANADA.png');
  } catch (err) {
    console.error('Error converting images/CANADA.webp:', err);
  }
}

convert();
