#!/usr/bin/env python

import serial, time
# sudo chmod a+rw /dev/ttyS0
ser = serial.Serial('/dev/ttyS0', 9600)

if(ser.isOpen() == False):
    ser.open()

while 1:
    serial_line = ser.readline()
    print serial_line

ser.close()

# import serial

# port = serial.Serial("/dev/ttyAMA0", 9600)
# if(port.isOpen() == False):
#     port.open()

# line = []

# try:
#     while True:
#         for c in port.read():
#             line.append(c)
#             if c == '\n':
#                 print("Line: " + line)
#                 line = []
#                 break

# # try:
# #     while True:
# #         print "OK!!!!!"
# #         line = port.read()
# #         print line

# except Exception as ex:
#     print (ex)
#     pass

# # if(port.isOpen() == True):
# #     port.close()