#!/usr/bin/env python3
"""
Create a temporary placeholder image for testimonial
"""
from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(output_path):
    """Create a simple placeholder image for testimonial"""
    try:
        # Create a 64x64 image with a neutral background
        img = Image.new('RGB', (64, 64), color=(200, 200, 200))
        draw = ImageDraw.Draw(img)
        
        # Draw a simple circle for a profile placeholder
        draw.ellipse([8, 8, 56, 56], fill=(150, 150, 150), outline=(100, 100, 100), width=2)
        
        # Add "D" for Denise
        try:
            # Try to use a system font
            font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 20)
        except:
            # Fallback to default font
            font = ImageFont.load_default()
        
        # Draw the letter "D"
        bbox = draw.textbbox((0, 0), "D", font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        x = (64 - text_width) // 2
        y = (64 - text_height) // 2 - 2
        
        draw.text((x, y), "D", fill=(80, 80, 80), font=font)
        
        # Ensure directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Save as WebP
        img.save(output_path, 'WebP', optimize=True, quality=85)
        
        print(f"✅ Placeholder image created: {output_path}")
        return True
        
    except Exception as e:
        print(f"❌ Error creating placeholder: {e}")
        return False

if __name__ == "__main__":
    output_path = "frontend/public/images/testimonials/denise-customer-64.webp"
    create_placeholder_image(output_path)