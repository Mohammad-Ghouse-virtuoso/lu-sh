#!/usr/bin/env python3
"""Process Data-assets into public/wedding layers."""

from __future__ import annotations

import os
import shutil
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "Data-assets"
OUT = ROOT / "public" / "wedding"
AUDIO_SRC = ROOT / "Wedding Nasheed (Slowed + Reverb) ｜ A Soulful Love Melody 💖 [bAxOyeSwwvQ].mp3"
AUDIO_OUT = ROOT / "public" / "audio" / "wedding-nasheed.mp3"
OG_OUT = ROOT / "public" / "og" / "invite-og.jpg"

# rembg optional
try:
    from rembg import remove as rembg_remove

    HAS_REMBG = True
except Exception:
    HAS_REMBG = False
    rembg_remove = None


def ensure_dirs() -> None:
    for p in [
        OUT / "curtains",
        OUT / "calligraphy",
        OUT / "flowers",
        OUT / "ornaments",
        OUT / "textures",
        OUT / "seals",
        AUDIO_OUT.parent,
        OG_OUT.parent,
    ]:
        p.mkdir(parents=True, exist_ok=True)


def find(name_substr: str) -> Path | None:
    name_substr_l = name_substr.lower()
    for p in SRC.iterdir():
        if name_substr_l in p.name.lower():
            return p
    return None


def open_rgb(path: Path) -> Image.Image:
    return Image.open(path).convert("RGBA")


def remove_near_white(img: Image.Image, threshold: int = 240) -> Image.Image:
    """Make near-white pixels transparent (for stock JPGs on white)."""
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                pixels[x, y] = (r, g, b, 0)
            elif r > 220 and g > 220 and b > 220:
                # soft edge
                avg = (r + g + b) / 3
                alpha = int(max(0, min(255, (255 - avg) * 4)))
                pixels[x, y] = (r, g, b, alpha)
    return img


def remove_checkerboardish(img: Image.Image) -> Image.Image:
    """Heuristic: for PNGs saved as JPG with gray checkerboard, rembg preferred."""
    if HAS_REMBG:
        raw = rembg_remove(img.convert("RGBA"))
        if isinstance(raw, bytes):
            from io import BytesIO

            return Image.open(BytesIO(raw)).convert("RGBA")
        return raw.convert("RGBA")
    return remove_near_white(img, threshold=235)


def trim_alpha(img: Image.Image, padding: int = 4) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img
    l, t, r, b = bbox
    l = max(0, l - padding)
    t = max(0, t - padding)
    r = min(img.width, r + padding)
    b = min(img.height, b + padding)
    return img.crop((l, t, r, b))


def save_png(img: Image.Image, path: Path, max_w: int | None = None) -> None:
    out = img.convert("RGBA")
    if max_w and out.width > max_w:
        ratio = max_w / out.width
        out = out.resize((max_w, int(out.height * ratio)), Image.Resampling.LANCZOS)
    out.save(path, "PNG", optimize=True)
    print(f"  wrote {path.relative_to(ROOT)} ({out.size[0]}x{out.size[1]})")


def save_webp(img: Image.Image, path: Path, max_w: int | None = None, quality: int = 82) -> None:
    out = img.convert("RGBA")
    if max_w and out.width > max_w:
        ratio = max_w / out.width
        out = out.resize((max_w, int(out.height * ratio)), Image.Resampling.LANCZOS)
    out.save(path, "WEBP", quality=quality, method=6)
    print(f"  wrote {path.relative_to(ROOT)} ({out.size[0]}x{out.size[1]})")


def process_curtains() -> None:
    print("Curtains...")
    curtain_path = find("Curtain Light")
    if not curtain_path:
        raise SystemExit("Curtain asset missing")

    raw = open_rgb(curtain_path)
    # Remove checkerboard / bg
    cut = remove_checkerboardish(raw)
    cut = trim_alpha(cut)

    w, h = cut.size
    mid = w // 2
    # Overlap slightly so center seam isn't hollow
    overlap = max(8, w // 40)
    left = cut.crop((0, 0, mid + overlap, h))
    right = cut.crop((mid - overlap, 0, w, h))

    # Soften inner edges: ensure both sides look full when closed (scale to same height)
    target_h = 1600
    def fit_h(im: Image.Image) -> Image.Image:
        ratio = target_h / im.height
        return im.resize((max(1, int(im.width * ratio)), target_h), Image.Resampling.LANCZOS)

    left = fit_h(left)
    right = fit_h(right)

    # If left/right mass is uneven, also produce mirrored pair from left as backup
    # Prefer original split; also save mirrored-symmetric pair for animation layers
    save_png(left, OUT / "curtains" / "left.png", max_w=900)
    save_png(right, OUT / "curtains" / "right.png", max_w=900)

    # Symmetry backup: mirror left for right-alt
    save_png(ImageOps.mirror(left), OUT / "curtains" / "right-mirrored.png", max_w=900)

    # Valance = top 22% of full curtain
    val_h = int(cut.height * 0.22)
    valance = cut.crop((0, 0, cut.width, val_h))
    save_png(fit_h(valance) if False else valance, OUT / "curtains" / "valance.png", max_w=1200)

    # Extra velvet side panels from burgundy velvet stock (mirrored pair)
    velvet = find("Velvet Fabric")
    if velvet:
        v = remove_near_white(open_rgb(velvet), threshold=245)
        v = trim_alpha(v)
        v = fit_h(v)
        save_png(v, OUT / "curtains" / "velvet-left.png", max_w=700)
        save_png(ImageOps.mirror(v), OUT / "curtains" / "velvet-right.png", max_w=700)


def process_bismillah() -> None:
    print("Bismillah...")
    path = find("Quran Basmala")
    if not path:
        raise SystemExit("Bismillah asset missing")
    img = open_rgb(path)
    cut = remove_checkerboardish(img)
    # Also punch residual white
    cut = remove_near_white(cut, threshold=248)
    cut = trim_alpha(cut)
    save_webp(cut, OUT / "calligraphy" / "bismillah.webp", max_w=900)
    save_png(cut, OUT / "calligraphy" / "bismillah.png", max_w=900)


def process_ornaments() -> None:
    print("Ornaments...")
    gold = find("Elegant gold ornamental flourish")
    if gold:
        img = remove_near_white(open_rgb(gold), threshold=245)
        img = trim_alpha(img)
        save_webp(img, OUT / "ornaments" / "divider.webp", max_w=800)
        save_png(img, OUT / "ornaments" / "divider.png", max_w=800)

    glitter = find("Gold Glitter")
    if glitter:
        img = remove_checkerboardish(open_rgb(glitter))
        img = trim_alpha(img)
        save_webp(img, OUT / "ornaments" / "gold-dust.webp", max_w=700)

    mandala = find("floral mandala")
    if mandala:
        img = remove_near_white(open_rgb(mandala), threshold=245)
        img = trim_alpha(img)
        save_webp(img, OUT / "ornaments" / "mandala.webp", max_w=600)


def process_textures() -> None:
    print("Textures...")
    paper = find("Fine art fond beige") or find("papier")
    if paper:
        img = Image.open(paper).convert("RGB")
        img = ImageOps.fit(img, (1200, 1600), Image.Resampling.LANCZOS)
        img.save(OUT / "textures" / "paper-texture.jpg", "JPEG", quality=82, optimize=True)
        print(f"  wrote textures/paper-texture.jpg")

    # Burgundy solidish from velvet crop or color palette ref
    velvet = find("Velvet Fabric")
    if velvet:
        img = Image.open(velvet).convert("RGB")
        # take densest fabric region
        w, h = img.size
        crop = img.crop((0, int(h * 0.15), int(w * 0.55), int(h * 0.85)))
        crop = ImageOps.fit(crop, (1200, 1800), Image.Resampling.LANCZOS)
        # darken slightly toward PRD burgundy
        enhancer = ImageEnhance.Color(crop)
        crop = enhancer.enhance(0.9)
        dark = ImageEnhance.Brightness(crop).enhance(0.55)
        dark.save(OUT / "textures" / "burgundy-background.jpg", "JPEG", quality=80, optimize=True)
        print("  wrote textures/burgundy-background.jpg")


def process_flowers() -> None:
    print("Flowers...")
    # Curated picks by filename substrings that look like isolated florals
    picks = [
        ("bunga mawar", "rose-01"),
        ("botanical illustration", "botanical-01"),
        ("Soft Blush Floral Wall Art Printable _ Romantic Rose Botanical Decor.jpg", "rose-corner-01"),
        ("Soft Blush Floral Wall Art Printable _ Romantic Rose Botanical Decor (1).jpg", "rose-corner-02"),
        ("Soft Blush Floral Wall Art Printable _ Romantic Rose Botanical Decor (2).jpg", "rose-corner-03"),
        ("Elegant Floral Clipart", "floral-clipart"),
        ("Floral Clipart PNG 10", "bouquet-set"),
        ("Rosa empoeirada", "garland"),
        ("Colorful arrangement with lush peonies", "hanging-bouquet"),
        ("_10 Stunning Floral", "floral-png-set"),
        ("png", "floral-help"),  # may match many — handled carefully below
    ]

    used = set()
    count = 0
    # Prefer specific known good files first
    preferred = [
        p
        for p in SRC.iterdir()
        if any(
            k in p.name
            for k in [
                "bunga mawar",
                "botanical illustration",
                "Soft Blush",
                "Elegant Floral Clipart",
                "Floral Clipart PNG 10",
                "Rosa empoeirada",
                "Colorful arrangement",
                "Stunning Floral",
                "png⠀",
                "Roses pattern",
            ]
        )
    ]

    for path in preferred:
        if count >= 10:
            break
        if path in used:
            continue
        used.add(path)
        try:
            img = open_rgb(path)
            cut = remove_checkerboardish(img)
            cut = remove_near_white(cut, threshold=248)
            cut = trim_alpha(cut)
            if cut.getbbox() is None:
                continue
            # Skip nearly empty
            alpha = cut.split()[-1]
            if sum(1 for px in alpha.getdata() if px > 20) < 500:
                continue
            name = f"flower-{count + 1:02d}"
            save_webp(cut, OUT / "flowers" / f"{name}.webp", max_w=700)
            save_png(cut, OUT / "flowers" / f"{name}.png", max_w=700)
            count += 1
        except Exception as e:
            print(f"  skip {path.name}: {e}")

    # Extract a few petal-ish crops from rose assets for particle effect
    rose = find("bunga mawar") or (preferred[0] if preferred else None)
    if rose:
        img = remove_checkerboardish(open_rgb(rose))
        img = trim_alpha(img)
        # small centered crops as petal proxies
        w, h = img.size
        for i, box in enumerate(
            [
                (int(w * 0.3), int(h * 0.2), int(w * 0.55), int(h * 0.4)),
                (int(w * 0.45), int(h * 0.35), int(w * 0.7), int(h * 0.55)),
                (int(w * 0.25), int(h * 0.45), int(w * 0.5), int(h * 0.65)),
            ]
        ):
            petal = trim_alpha(img.crop(box))
            if petal.getbbox():
                save_webp(petal, OUT / "flowers" / f"petal-{i + 1}.webp", max_w=120)


def process_audio() -> None:
    print("Audio...")
    if AUDIO_SRC.exists():
        shutil.copy2(AUDIO_SRC, AUDIO_OUT)
        print(f"  wrote {AUDIO_OUT.relative_to(ROOT)}")
    else:
        print("  nasheed missing — skip")


def process_og() -> None:
    print("OG image...")
    w, h = 1200, 630
    canvas = Image.new("RGB", (w, h), "#240D0D")

    # subtle burgundy texture
    tex_path = OUT / "textures" / "burgundy-background.jpg"
    if tex_path.exists():
        tex = Image.open(tex_path).convert("RGB")
        tex = ImageOps.fit(tex, (w, h), Image.Resampling.LANCZOS)
        canvas = Image.blend(canvas, tex, 0.45)

    # gold frame
    draw = ImageDraw.Draw(canvas)
    margin = 28
    for i, color in enumerate(["#C9A45C", "#E5D0A0", "#C9A45C"]):
        inset = margin + i * 3
        draw.rectangle([inset, inset, w - inset, h - inset], outline=color, width=2)

    # bismillah
    bis = OUT / "calligraphy" / "bismillah.png"
    if bis.exists():
        b = Image.open(bis).convert("RGBA")
        bw = 520
        ratio = bw / b.width
        b = b.resize((bw, int(b.height * ratio)), Image.Resampling.LANCZOS)
        canvas.paste(b, ((w - bw) // 2, 70), b)

    # text
    try:
        font_lg = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", 42)
        font_md = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 28)
        font_sm = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf", 22)
    except Exception:
        font_lg = font_md = font_sm = ImageFont.load_default()

    def center_text(text: str, y: int, font, fill: str = "#E5D0A0") -> None:
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        draw.text(((w - tw) // 2, y), text, font=font, fill=fill)

    center_text("Shaik Mohammad Lukhman-E-Hayath", 320, font_md, "#F3E8D0")
    center_text("&", 365, font_sm, "#C9A45C")
    center_text("Shaik Shaheen Banu", 400, font_md, "#F3E8D0")
    center_text("31 August 2026  ·  Dawat-e-Valima", 480, font_sm, "#C9A45C")
    center_text("Wedding Invitation", 540, font_sm, "#E5D0A0")

    canvas.save(OG_OUT, "JPEG", quality=88, optimize=True)
    print(f"  wrote {OG_OUT.relative_to(ROOT)}")


def main() -> None:
    print(f"HAS_REMBG={HAS_REMBG}")
    ensure_dirs()
    process_curtains()
    process_bismillah()
    process_ornaments()
    process_textures()
    process_flowers()
    process_audio()
    process_og()
    print("Done.")


if __name__ == "__main__":
    main()
