from PIL import Image
import os

input_folder = "images/full"
output_folder = "images/thumbs"

os.makedirs(output_folder, exist_ok=True)

# Max thumbnail size (width, height)
max_size = (400, 400)

for filename in os.listdir(input_folder):
    if filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        # Skip if thumbnail already exists and is newer
        if os.path.exists(output_path) and os.path.getmtime(output_path) > os.path.getmtime(input_path):
            print(f"Skipping {filename}, already up-to-date")
            continue

        with Image.open(input_path) as img:
            img.thumbnail(max_size)
            img.save(output_path, "JPEG", quality=85)
            print(f"Created thumbnail: {output_path}")
