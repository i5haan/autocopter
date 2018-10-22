# import the necessary packages
from __future__ import print_function
from imutils.object_detection import non_max_suppression
from imutils import paths
import numpy as np
import argparse
import imutils
import cv2
from PIL import Image
from six import BytesIO
import requests
import random
import string

import urllib.request as urll
import time
from urllib.parse import urlencode

url='http://10.211.45.206:8080/shot.jpg'

max_person = 2
 

# initialize the HOG descriptor/person detector
hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

# loop over the image paths
tick = 0
while True:
	if tick%10 == 0:
		imgResp = urll.urlopen(url)
		imgNp = np.array(bytearray(imgResp.read()),dtype=np.uint8)
		img = cv2.imdecode(imgNp,-1)
		# load the image and resize it to (1) reduce detection time
		# and (2) improve detection accuracy
		image = imutils.resize(img, width=min(400, img.shape[1]))
		orig = image.copy()
	 
		# detect people in the image
		(rects, weights) = hog.detectMultiScale(image, winStride=(4, 4),
			padding=(8, 8), scale=1.05)
	 
		# draw the original bounding boxes
		for (x, y, w, h) in rects:
			cv2.rectangle(orig, (x, y), (x + w, y + h), (0, 0, 255), 2)
	 
		# apply non-maxima suppression to the bounding boxes using a
		# fairly large overlap threshold to try to maintain overlapping
		# boxes that are still people
		rects = np.array([[x, y, x + w, y + h] for (x, y, w, h) in rects])
		pick = non_max_suppression(rects, probs=None, overlapThresh=0.65)
	 
		# draw the final bounding boxes
		for (xA, yA, xB, yB) in pick:
			cv2.rectangle(image, (xA, yA), (xB, yB), (0, 255, 0), 2)
	 
		# show some information on the number of bounding boxes	
		print("[INFO] : {} original boxes, {} after suppression".format(len(rects), len(pick)))
	 
		# show the output images
		cv2.imshow("After NMS", image)
		if len(pick) > 0:
			file_name = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
			print (file_name)
			cv2.imwrite('C:/Project/Quadcopter/public/images/' + file_name + '.jpg', image)
			# frame_im = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
			# pil_im = Image.fromarray(frame_im)
			# stream = BytesIO()
			# pil_im.save(stream, format = "JPEG")
			# stream.seek(0)
			# img_for_post = stream.read()
			data = {
						'image' : file_name
						# 'name' : 'ishaan'
					}
			# files = urlencode(files).encode('utf-8');
			# print(image.tobytes())
			response = requests.post(
	            url = 'http://localhost:8080/upload',
	            data = data, 
	            headers={
	            			"content-type" : "application/x-www-form-urlencoded"
	            		}
	        )

	tick = tick + 1
	if cv2.waitKey(25) & 0xFF == ord('q'):
		cv2.destroyAllWindows()
		break