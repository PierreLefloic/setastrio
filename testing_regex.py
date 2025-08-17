import re
import os

# Folders
full_folder = "images/full"
thumb_folder = "images/thumbs"
index_file = "to_be_matched.html"

# Build gallery HTML entries (use forward slashes for web paths)
entries = [
    f'<a href="{full_folder}/{filename}" target="_blank">'
    f'<img src="{thumb_folder}/{filename}" alt="{filename}" /></a>'
    for filename in sorted(os.listdir(full_folder))
    if filename.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))
]

# Update index.html
with open(index_file, "r", encoding="utf-8") as f:
    html = f.read()

pattern = r'(<div class="gallery-track"\s*>).*?(</div>)'

match = re.search(pattern, html, flags=re.DOTALL | re.IGNORECASE)
if match:
    print("Match found!")
    new_html = re.sub(
        pattern,
        r'\1\n    ' + "\n    ".join(entries) + r'\2',
        html,
        flags=re.DOTALL | re.IGNORECASE
    )
    with open(index_file, "w", encoding="utf-8") as f:
        f.write(new_html)
    print("Gallery updated in index.html!")
else:
    print("No match found for gallery track div.")