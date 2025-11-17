#!/usr/bin/env python3
"""
Process testimonial image: resize to 64x64px and convert to WebP
"""
import sys
from PIL import Image, ImageOps

def process_testimonial_image(input_path, output_path):
    """Process image for testimonial use"""
    try:
        # Open and load the image
        with Image.open(input_path) as img:
            # Convert to RGB if needed (for WebP compatibility)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Create a square crop from the center
            img_square = ImageOps.fit(img, (64, 64), Image.Resampling.LANCZOS)
            
            # Save as WebP with optimization
            img_square.save(
                output_path, 
                'WebP', 
                optimize=True, 
                quality=85,
                method=6  # Best compression
            )
            
        print(f"✅ Successfully processed image: {input_path} -> {output_path}")
        print(f"   Size: 64x64px WebP format")
        return True
        
    except Exception as e:
        print(f"❌ Error processing image: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python3 process_testimonial_image.py <input_path> <output_path>")
        print("Example: python3 process_testimonial_image.py denise.jpg frontend/public/images/testimonials/denise-customer-64.webp")
        sys.exit(1)
    
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    
    success = process_testimonial_image(input_path, output_path)
    sys.exit(0 if success else 1)