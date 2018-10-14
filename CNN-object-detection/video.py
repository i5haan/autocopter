# Using Android IP Webcam video .jpg stream (tested) in Python2 OpenCV3

import urllib.request as urll
import cv2
import numpy as np
import time

# Replace the URL with your own IPwebcam shot.jpg IP:port
url='http://100.120.164.64:8080/shot.jpg'


while True:
    imgResp = urll.urlopen(url)
    imgNp = np.array(bytearray(imgResp.read()),dtype=np.uint8)
    img = cv2.imdecode(imgNp,-1)
    cv2.imshow('IPWebcam',img)

    #To give the processor some less stress
    #time.sleep(0.1) 

    # Quit if q is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break