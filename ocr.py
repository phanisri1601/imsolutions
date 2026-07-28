import cv2
import pytesseract

img = cv2.imread('public/Home Page Banner.png')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

data = pytesseract.image_to_data(gray, output_type=pytesseract.Output.DICT)

for i in range(len(data['text'])):
    if int(data['conf'][i]) > 30 and len(data['text'][i].strip()) > 2:
        print(f"Text: {data['text'][i]}, X: {data['left'][i]}, Y: {data['top'][i]}, W: {data['width'][i]}, H: {data['height'][i]}")
