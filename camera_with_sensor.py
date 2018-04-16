#!/usr/bin/env python

import socket
import cv2
import urllib
import requests
import numpy as np

from datetime import datetime

TCP_IP = '10.89.107.168'
TCP_PORT = 5005
BUFFER_SIZE = 1

#MESSAGE = "Hello, World!"
#cap = cv2.VideoCapture('https://192.168.0.100:8080/stream/video.mjepg')

#while True:
#  ret, frame = cap.read()
#  print(cap)
#  cv2.imshow('Video', frame)

#  if cv2.waitKey(1) == 27:
#    exit(0)

r = requests.get('https://'+TCP_IP+':8080/stream/video.mjpeg', verify=False, auth=('user', '123456'), stream=True)
if(r.status_code == 200):
    bytes = bytes()
    for chunk in r.iter_content(chunk_size=8192):
        bytes += chunk
        a = bytes.find(b'\xff\xd8')
        b = bytes.find(b'\xff\xd9')
        if a != -1 and b != -1:
            jpg = bytes[a:b+2]
            bytes = bytes[b+2:]
            i = cv2.imdecode(np.fromstring(jpg, dtype=np.uint8), cv2.IMREAD_COLOR)
            s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            s.connect((TCP_IP, TCP_PORT))
            data = s.recv(BUFFER_SIZE)

	    #print "received data:", data
            if data == ('1').encode('utf-8') :
                temp='./public/images/'+str(datetime.now().strftime('%Y_%m_%d_%H_%M_%S'))+'.png'
                cv2.imwrite(temp,i)
            s.close()
            cv2.imshow('i', i)
            if cv2.waitKey(1) == 27:
		#print(str(datetime.now()))
                temp='./public/images/'+str(datetime.now().strftime('%Y_%m_%d_%H_%M_%S'))+'.png'
		#print(temp)
                cv2.imwrite(temp,i)
                exit(0)

	
		
else:
    print("Received unexpected status code {}".format(r.status_code))
