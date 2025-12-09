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

        if (
          Math.abs(r - targetR) <= tolerance &&
          Math.abs(g - targetG) <= tolerance &&
          Math.abs(b - targetB) <= tolerance
        ) {
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
  // Dark Image (Black -> Transparent)
  await processImage("practical-prompt-engineering_dark.png", [0, 0, 0], 25);

  // Light Image (White -> Transparent)
  await processImage(
    "practical-prompt-engineering_light.png",
    [255, 255, 255],
    25
  );

  // Default (Light -> Transparent)
  await processImage("practical-prompt-engineering.png", [255, 255, 255], 25);
}

main();
