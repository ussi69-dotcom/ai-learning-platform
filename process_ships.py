
from PIL import Image
import numpy as np

def make_transparent(image_path, target_bg_color, tolerance=30):
    print(f"Processing {image_path}...")
    try:
        img = Image.open(image_path).convert("RGBA")
        data = np.array(img)

        r_t, g_t, b_t = target_bg_color
        r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

        # Improved mask logic: check for "whiteness" generally
        # If r,g,b are all > 240, it's white.
        mask = (r > 240) & (g > 240) & (b > 240)
        
        # Also apply the specific target color tolerance just in case
        # mask = (np.abs(r - r_t) < tolerance) & (np.abs(g - g_t) < tolerance) & (np.abs(b - b_t) < tolerance)

        data[mask, 3] = 0
        
        new_img = Image.fromarray(data)
        new_img.save(image_path)
        print(f"Saved transparent version to {image_path}")
    except Exception as e:
        print(f"Error: {e}")

make_transparent(
    "frontend/public/images/ships/y-wing.png",
    (255, 255, 255),
    tolerance=40
)
