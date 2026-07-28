import cv2
import numpy as np
import os

img = cv2.imread('public/Home Page Banner.png')

# The faces
faces = {
    'strategy': np.array([[721,246], [916,287], [924,502], [741,458]], np.int32),
    'technology': np.array([[741,458], [924,502], [932,717], [761,670]], np.int32),
    'media': np.array([[924,502], [1107,546], [1103,764], [932,717]], np.int32),
    
    # Newly estimated side faces
    'creative': np.array([[1111,328], [1280,240], [1270,450], [1107,546]], np.int32),
    'growth': np.array([[1107,546], [1270,450], [1260,670], [1103,764]], np.int32),
}

for name, pts in faces.items():
    pts = pts.reshape((-1, 1, 2))
    cv2.polylines(img, [pts], True, (0, 255, 0), 2)
    
os.makedirs('.gemini/antigravity-ide/brain/d9065460-59a9-4c43-8c07-71b7f0e8ed8a/scratch', exist_ok=True)
cv2.imwrite('.gemini/antigravity-ide/brain/d9065460-59a9-4c43-8c07-71b7f0e8ed8a/scratch/test_boxes.png', img)
print("Saved to scratch/test_boxes.png")
