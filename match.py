import cv2
import numpy as np

img1 = cv2.imread('public/Home Page Banner.png')
img2 = cv2.imread('public/strtegy pop.png')

# Convert to grayscale
gray1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
gray2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)

# The "IM" red cube is around the center of the image.
# Let's crop a 100x100 region from the center of gray2 where the red cube is.
# In strtegy pop.png (1672x941), center is approx 836, 470
# Let's crop a window around center of gray2: 
y_start, y_end = int(941*0.4), int(941*0.6)
x_start, x_end = int(1672*0.4), int(1672*0.6)
template = gray2[y_start:y_end, x_start:x_end]

# Multi-scale template matching to find scale and offset
found = None
for scale in np.linspace(0.5, 1.5, 50):
    resized_template = cv2.resize(template, (0,0), fx=scale, fy=scale)
    if resized_template.shape[0] > gray1.shape[0] or resized_template.shape[1] > gray1.shape[1]:
        continue
    
    result = cv2.matchTemplate(gray1, resized_template, cv2.TM_CCOEFF_NORMED)
    _, max_val, _, max_loc = cv2.minMaxLoc(result)
    
    if found is None or max_val > found[0]:
        found = (max_val, max_loc, scale)

if found:
    max_val, max_loc, scale = found
    print(f"Match value: {max_val}")
    print(f"Location: {max_loc}")
    print(f"Scale: {scale}")
    
    # Calculate offset mapping
    # Let (X2, Y2) be a point in strtegy pop.png (0-1672, 0-941)
    # The template starts at x_start, y_start in img2.
    # It was found at max_loc (x, y) in img1 with scale `scale`.
    # So a point (X2, Y2) in img2 maps to:
    # X1 = max_loc[0] + (X2 - x_start) * scale
    # Y1 = max_loc[1] + (Y2 - y_start) * scale
    print(f"x_start={x_start}, y_start={y_start}")
else:
    print("No match found")
