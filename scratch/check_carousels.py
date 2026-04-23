import os
import re

html_path = r'c:\Users\vladi\Documents\ProjectsIdeas\NYTrip\turismo.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all cards
cards = re.split(r'<article class="card', content)[1:]

for i, card in enumerate(cards):
    # Get title
    title_match = re.search(r'<h4 class="card-title">(.*?)</h4>', card)
    title = title_match.group(1) if title_match else f"Card {i+1}"
    
    # Count images in track
    track_match = re.search(r'<div class="carousel-track">(.*?)</div>', card, re.DOTALL)
    if track_match:
        images = re.findall(r'<img .*?>', track_match.group(1))
        img_count = len(images)
    else:
        img_count = 0
        
    # Count dots
    dots_match = re.search(r'<div class="carousel-dots">(.*?)</div>', card, re.DOTALL)
    if dots_match:
        dots = re.findall(r'<span class="dot.*?>', dots_match.group(1))
        dot_count = len(dots)
    else:
        dot_count = 0
        
    if img_count != dot_count:
        print(f"MISMATCH in '{title}': Images={img_count}, Dots={dot_count}")
    elif img_count == 0:
        # print(f"No carousel in '{title}'")
        pass
    else:
        # print(f"OK: '{title}' ({img_count} items)")
        pass
