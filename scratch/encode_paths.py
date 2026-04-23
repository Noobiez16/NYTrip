import os
import re
import urllib.parse

html_path = r'c:\Users\vladi\Documents\ProjectsIdeas\NYTrip\turismo.html'
output_path = r'c:\Users\vladi\Documents\ProjectsIdeas\NYTrip\turismo_encoded.html'

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

def encode_src(match):
    prefix = match.group(1)
    path = match.group(2)
    suffix = match.group(3)
    # Only encode if it contains a space and starts with 'assets/'
    if ' ' in path:
        # We only want to encode the path part, not the whole string if it's multiple attrs
        # But our regex is specific to src="..."
        encoded_path = urllib.parse.quote(path)
        return f'{prefix}{encoded_path}{suffix}'
    return match.group(0)

# Regex to find src="assets/..." regardless of spaces
new_content = re.sub(r'(src=")(assets/.*?)(")', encode_src, content)

with open(output_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Encoding complete. Reviewing changes...")
