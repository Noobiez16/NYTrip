import os
import re

html_path = r'c:\Users\vladi\Documents\ProjectsIdeas\NYTrip\turismo.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all cards, being careful with splitting
# Each card starts with <article class="card
cards = re.findall(r'<article class="card(.*?)</article>', content, re.DOTALL)

for i, card in enumerate(cards):
    title_match = re.search(r'<h4 class="card-title">(.*?)</h4>', card)
    title = title_match.group(1).strip() if title_match else f"Unnamed Card {i+1}"
    
    # Count dots
    dot_count = len(re.findall(r'<span class="dot', card))
    
    # Count images in track
    track_match = re.search(r'<div class="carousel-track">(.*?)</div>', card, re.DOTALL)
    if track_match:
        images = re.findall(r'<img .*?>', track_match.group(1))
        img_count = len(images)
    else:
        img_count = 0
        
    if img_count != dot_count and dot_count > 0:
        print(f"MISMATCH in '{title}': Images={img_count}, Dots={dot_count}")
    # elif dot_count > 0:
    #    print(f"OK: '{title}' ({img_count} items)")
