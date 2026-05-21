import os
from PIL import Image

image_dir = 'images'
for filename in os.listdir(image_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')) and not filename.startswith('opt_'):
        path = os.path.join(image_dir, filename)
        img = Image.open(path)
        
        # Convert to RGB if it's RGBA (for JPG saving)
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
            
        # Resize if width is larger than 1200px to save space
        if img.width > 1200:
            ratio = 1200 / img.width
            new_size = (1200, int(img.height * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
            
        # Save as optimized JPG
        new_filename = f"opt_{os.path.splitext(filename)[0]}.jpg"
        new_path = os.path.join(image_dir, new_filename)
        img.save(new_path, "JPEG", quality=80, optimize=True)
        print(f"Optimized {filename} -> {new_filename}")
