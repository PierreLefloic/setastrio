from PIL import Image
import os
import re

# Folders
full_folder = "images/full"
thumb_folder = "images/thumbs"
index_file = "index.html"

# Thumbnail settings
os.makedirs(thumb_folder, exist_ok=True)
max_size = (400, 400)

# Generate thumbnails
for filename in sorted(os.listdir(full_folder)):
    if filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
        full_path = os.path.join(full_folder, filename)
        thumb_path = os.path.join(thumb_folder, filename)

        # Only regenerate if missing or outdated
        if not os.path.exists(thumb_path) or os.path.getmtime(thumb_path) < os.path.getmtime(full_path):
            with Image.open(full_path) as img:
                img.thumbnail(max_size)
                img.save(thumb_path, "JPEG", quality=85)
                print(f"Created thumbnail: {thumb_path}")

# Build gallery HTML entries
entries = [
    f'<a href="{os.path.join(full_folder, filename)}" target="_blank">'
    f'<img src="{os.path.join(thumb_folder, filename)}" alt="{filename}" /></a>'
    for filename in sorted(os.listdir(full_folder))
    if filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))
]

# Update index.html
with open(index_file, "r", encoding="utf-8") as f:
    html = f.read()

new_html = re.sub(
    r'(<div class="gallery-track">).*?(</div>)',
    r'\1' + "\n    ".join(entries) + r'\2',
    html,
    flags=re.DOTALL
)

with open(index_file, "w", encoding="utf-8") as f:
    f.write(new_html)

print("Gallery updated in index.html!")
