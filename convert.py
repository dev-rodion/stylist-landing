import os
from pathlib import Path
from PIL import Image
import pillow_heif

pillow_heif.register_heif_opener()

IMG_DIR = Path(__file__).parent / "img"
OUT_DIR = IMG_DIR / "webp"
OUT_DIR.mkdir(exist_ok=True)

MAX_WIDTH = 1400
QUALITY = 82

for src in sorted(IMG_DIR.glob("*.HEIC")):
    img = Image.open(src)
    img = img.convert("RGB")

    # Auto-rotate via EXIF
    try:
        from PIL import ImageOps
        img = ImageOps.exif_transpose(img)
    except Exception:
        pass

    # Downscale if wider than MAX_WIDTH
    if img.width > MAX_WIDTH:
        ratio = MAX_WIDTH / img.width
        img = img.resize((MAX_WIDTH, int(img.height * ratio)), Image.LANCZOS)

    out_path = OUT_DIR / (src.stem + ".webp")
    img.save(out_path, "WEBP", quality=QUALITY, method=6)

    size_kb = out_path.stat().st_size / 1024
    print(f"{src.name} → {out_path.name}  ({size_kb:.0f} KB)")

print("Done.")
