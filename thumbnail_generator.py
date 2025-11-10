from PIL import Image, ImageOps
import os
import re

# Folders
full_folder = "images/full"
thumb_folder = "images/thumbs"
index_file = "index.html"

# Thumbnail settings
os.makedirs(thumb_folder, exist_ok=True)
max_size = (1000, 1000)

# Generate thumbnails
for filename in sorted(os.listdir(full_folder)):
    if filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp")):
        full_path = os.path.join(full_folder, filename)
        thumb_path = os.path.join(thumb_folder, filename)

        # Only regenerate if missing or outdated
        if not os.path.exists(thumb_path) or os.path.getmtime(thumb_path) < os.path.getmtime(full_path):
            with Image.open(full_path) as img:
                img = ImageOps.exif_transpose(img)  # Correct orientation
                img.thumbnail(max_size)
                img.save(thumb_path, "JPEG", quality=85)
                print(f"Created thumbnail: {thumb_path}")

# Build gallery HTML entries (with loading="lazy" to match existing format)
entries = [
    f'<a href="{full_folder}/{filename}" target="_blank">'
    f'<img src="{thumb_folder}/{filename}" alt="{filename}" loading="lazy"/></a>'
    for filename in sorted(os.listdir(full_folder))
    if filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))
]

# Update index.html
with open(index_file, "r", encoding="utf-8") as f:
    html = f.read()

# Pattern that handles closing div on same line or separate line
pattern = r'(<div class="gallery-track">)(.*?)(</div>)'

match = re.search(pattern, html, flags=re.DOTALL | re.IGNORECASE)
if match:
    print("Match found!")
    # Preserve the indentation from the original
    indent = "    "
    new_content = "\n" + indent + ("\n" + indent).join(entries) + "\n" + indent
    
    new_html = re.sub(
        pattern,
        r'\1' + new_content + r'\3',
        html,
        flags=re.DOTALL | re.IGNORECASE
    )
    with open(index_file, "w", encoding="utf-8") as f:
        f.write(new_html)
    print(f"Gallery updated in index.html with {len(entries)} images!")
else:
    print("No match found for gallery track div.")
    print("Trying to find gallery-track in HTML...")
    if 'class="gallery-track"' in html:
        print("gallery-track div exists in HTML")
    else:
        print("gallery-track div NOT FOUND in HTML")
