
from PIL import Image
import numpy as np
import sys

def make_transparent(image_path, target_bg_color, tolerance=30):
    print(f"Processing {image_path}...")
    img = Image.open(image_path).convert("RGBA")
    data = np.array(img)

    # breakdown target color
    r_t, g_t, b_t = target_bg_color

    # breakdown image data
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]

    # Calculate distance from target color
    # fast euclidean distance approximation
    mask = (np.abs(r - r_t) < tolerance) & (np.abs(g - g_t) < tolerance) & (np.abs(b - b_t) < tolerance)

    # Set alpha to 0 where mask is true
    data[mask, 3] = 0
    
    # Optional: Feathering/Anti-aliasing the edges could be done here but simple masking is a good start for flat backgrounds

    new_img = Image.fromarray(data)
    new_img.save(image_path)
    print(f"Saved transparent version to {image_path}")

# Dark Image (Black Background -> Transparent)
make_transparent(
    "/home/ussi/ai-learning-platform/frontend/public/images/practical-prompt-engineering_dark.png",
    (0, 0, 0),
    tolerance=15
)

# Light Image (White Background -> Transparent)
make_transparent(
    "/home/ussi/ai-learning-platform/frontend/public/images/practical-prompt-engineering_light.png",
    (255, 255, 255),
    tolerance=15
)

# Also update the default one (which is light)
make_transparent(
    "/home/ussi/ai-learning-platform/frontend/public/images/practical-prompt-engineering.png",
    (255, 255, 255),
    tolerance=15
)
