const Jimp = require("jimp");
const path = require("path");

async function processImage(filename, targetColor, tolerance) {
  const activePath = path.join(__dirname, "frontend/public/images", filename);
  console.log(`Processing ${activePath}...`);

  try {
    const image = await Jimp.read(activePath);
    const targetR = targetColor[0];
    const targetG = targetColor[1];
    const targetB = targetColor[2];

    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];

        // Check for white background (or close to white)
        // If target is white (255,255,255), we check if r,g,b are all close to 255
        // Or simply check if they are > threshold

        let isMatch = false;

        if (targetR === 255 && targetG === 255 && targetB === 255) {
          // For white, we can be more aggressive: if it's very bright, kill it
          if (r > 240 && g > 240 && b > 240) {
            isMatch = true;
          }
        } else {
          if (
            Math.abs(r - targetR) <= tolerance &&
            Math.abs(g - targetG) <= tolerance &&
            Math.abs(b - targetB) <= tolerance
          ) {
            isMatch = true;
          }
        }

        if (isMatch) {
          this.bitmap.data[idx + 3] = 0; // Set Alpha to 0
        }
      }
    );

    await image.writeAsync(activePath);
    console.log(`Success: ${filename}`);
  } catch (err) {
    console.error(`Error processing ${filename}:`, err);
  }
}

async function main() {
  await processImage("ships/y-wing.png", [255, 255, 255], 30);
}

main();
