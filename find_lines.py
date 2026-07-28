import cv2
import numpy as np

img = cv2.imread('public/Home Page Banner.png')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
edges = cv2.Canny(gray, 50, 150, apertureSize=3)

# Find lines on the right side of the image (x > 1100, y > 200, y < 800)
roi = edges[200:800, 1100:1400]
lines = cv2.HoughLinesP(roi, 1, np.pi/180, 50, minLineLength=50, maxLineGap=10)

if lines is not None:
    for line in lines:
        x1, y1, x2, y2 = line[0]
        # x coordinates are relative to 1100, y to 200
        x1, x2 = x1 + 1100, x2 + 1100
        y1, y2 = y1 + 200, y2 + 200
        
        # We are looking for lines that go up and to the right
        # So dx > 0, dy < 0
        dx = x2 - x1
        dy = y2 - y1
        if dx != 0:
            slope = dy / dx
            # slope should be negative, around -0.5
            if -0.8 < slope < -0.3:
                print(f"Up-Right line: ({x1}, {y1}) to ({x2}, {y2}), slope={slope:.2f}")
