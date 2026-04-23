import os
import re

html_path = r'c:\Users\vladi\Documents\ProjectsIdeas\NYTrip\turismo.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Improved regex to find carousel segments
segments = re.findall(r'<article class="card.*?<h4 class="card-title">(.*?)</h4>.*?<div class="carousel-track">(.*?)</div>.*?<div class="carousel-dots">(.*?)</div>', content, re.DOTALL)

for title, track_content, dots_content in segments:
    # Count images
    images = re.findall(r'<img .*?>', track_content)
    img_count = len(images)
    
    # Count dots
    dots = re.findall(r'<span class="dot.*?>', dots_content)
    dot_count = len(dots)
    
    if img_count != dot_count:
        print(f"MISMATCH in '{title}': Images={img_count}, Dots={dot_count}")
    # else:
    #     print(f"OK: '{title}' ({img_count} items)")

# Check specifically for unencoded spaces in ALL src attributes
all_srcs = re.findall(r'src="(assets/.*?)"', content)
unencoded = [src for src in all_srcs if ' ' in src]
if unencoded:
    print(f"\nFOUND {len(unencoded)} UNENCODED PATHS WITH SPACES.")
    # for src in unencoded[:5]:
    #     print(f"  - {src}")
