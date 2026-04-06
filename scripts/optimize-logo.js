const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'public', 'images', 'logo.webp');
const outputPath = path.join(__dirname, '..', 'public', 'images', 'logo-optimized.webp');

async function optimize() {
  try {
    console.log('Starting optimization for:', inputPath);
    
    // Check if sharp is available
    await sharp(inputPath)
      .metadata()
      .then(metadata => {
        console.log(`Original dimensions: ${metadata.width}x${metadata.height}`);
        console.log(`Original size: ${(fs.statSync(inputPath).size / 1024).toFixed(2)} KB`);
      });

    // Resize to max 1000px width (plenty for high-DPI desktop and mobile)
    await sharp(inputPath)
      .resize(1000) // Keep aspect ratio
      .webp({ quality: 80, effort: 6 })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    console.log('Optimized image created at:', outputPath);
    console.log(`New size: ${(newSize / 1024).toFixed(2)} KB`);
    console.log(`Savings: ${((1 - newSize / fs.statSync(inputPath).size) * 100).toFixed(2)}%`);

    // Replace the original
    fs.renameSync(outputPath, inputPath);
    console.log('Replaced original logo.webp with optimized version.');
  } catch (err) {
    console.error('Error optimizing image:', err);
    process.exit(1);
  }
}

optimize();
