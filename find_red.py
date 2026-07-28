import cv2
import numpy as np

img = cv2.imread('public/Home Page Banner.png')
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# Red color range in HSV
lower_red1 = np.array([0, 70, 50])
upper_red1 = np.array([10, 255, 255])
lower_red2 = np.array([170, 70, 50])
upper_red2 = np.array([180, 255, 255])

mask1 = cv2.inRange(hsv, lower_red1, upper_red1)
mask2 = cv2.inRange(hsv, lower_red2, upper_red2)
mask = mask1 + mask2

# Find contours
contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

if contours:
    # Get the largest red contour
    c = max(contours, key=cv2.contourArea)
    x, y, w, h = cv2.boundingRect(c)
    print(f"Red cube bounding box: x={x}, y={y}, w={w}, h={h}")
    # Print the centroid
    M = cv2.moments(c)
    cx = int(M['m10']/M['m00'])
    cy = int(M['m01']/M['m00'])
    print(f"Red cube centroid: {cx}, {cy}")
    
    # Also find corners of the red cube
    peri = cv2.arcLength(c, True)
    approx = cv2.approxPolyDP(c, 0.04 * peri, True)
    print("Corners:")
    for pt in approx:
        print(pt[0])
