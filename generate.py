import os
import re

# Configuration
PROJECTS_DIR = "static"  # Path to your assets folder
OUTPUT_FILE = "generated_sections.html"

# Helper function to sort files numerically (e.g., 2 comes before 10)
def natural_sort_key(s):
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\digit+)', s)]

def generate_html():
    html_output = []
    
    # 1. Get all project folders inside the static directory
    if not os.path.exists(PROJECTS_DIR):
        print(f"Error: The directory '{PROJECTS_DIR}' does not exist.")
        return
        
    folders = [f for f in os.listdir(PROJECTS_DIR) if os.path.isdir(os.path.join(PROJECTS_DIR, f))]
    folders.sort(key=natural_sort_key) # Ensures folders are sorted properly

    for folder in folders:
        folder_path = os.path.join(PROJECTS_DIR, folder)
        all_files = os.listdir(folder_path)
        
        # 2. Separate and sort videos and images
        videos = [f for f in all_files if f.endswith(('.webm', '.mp4'))]
        images = [f for f in all_files if f.endswith(('.jpg', '.jpeg', '.png', '.webp'))]
        
        videos.sort(key=natural_sort_key)
        images.sort(key=natural_sort_key)
        
        # Default fallback video if the folder is empty
        video_src = f"static/{folder}/{videos[0]}" if videos else f"static/{folder}/video.webm"
        
        # 3. Generate the Section Header
        section_id = f"project-{folder.lower()}"
        section_html = f'''            <section id="{section_id}" class="content-body">
                <div class="video-container">
                    <video class="video-3d" src="{video_src}" preload="auto" autoplay loop muted playsinline></video>
                </div>
                <div class="project-details">
                    <h2 class="active-project-title">{folder.upper().replace("-", " ")}</h2>
                    <p class="active-project-desc">TODO</p>
                </div>
                <div class="project-gallery">'''
        
        html_output.append(section_html)
        
        # 4. Loop through images and apply classes based on index (0-indexed)
        for index, img in enumerate(images):
            img_path = f"static/{folder}/{img}"
            
            if index == 2:
                # 3rd image gets 'counter-card'
                card_class = "gallery-card counter-card"
            elif index >= 3:
                # 4th image and onwards get 'hidden-asset'
                card_class = "gallery-card hidden-asset"
            else:
                # 1st and 2nd image get standard class
                card_class = "gallery-card"
                
            html_output.append(f'                    <div class="{card_class}"><img src="{img_path}"></div>')
            
        # 5. Close the section
        html_output.append('                </div>\n            </section>\n')

    # Write everything to a file
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write("\n".join(html_output))
        
    print(f"Success! Generated HTML for {len(folders)} projects inside '{OUTPUT_FILE}'")

if __name__ == "__main__":
    generate_html()