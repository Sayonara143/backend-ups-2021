from cv2 import cv2 
import matplotlib.pyplot as plt
image2 = cv2.imread("lol10.jpg")
gray_img = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)
 
plt.imshow(gray_img)
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')
faces = face_cascade.detectMultiScale(gray_img)
print('Faces found: ', len(faces))
 
for (x, y, w, h) in faces:
  cv2.rectangle(image2, (x, y), (x+w, y+h), (0, 255, 0), 2)
     
plt.imshow(image2)
cv2.imshow("pp", image2)