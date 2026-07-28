import cv2
import numpy as np

img1 = cv2.imread('public/Home Page Banner.png')
img2 = cv2.imread('public/strtegy pop.png')

# Print dimensions
print(f"Home Page Banner: {img1.shape}")
print(f"Strategy Pop: {img2.shape}")
