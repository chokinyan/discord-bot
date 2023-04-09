import os
from moviepy.editor import *

#for i in os.listdir("M:\Mon Drive\sons like"):
video = VideoFileClip(r"test3\testdejs\son\IMG_2478.TRIM.MOV")
video.audio.write_audiofile(r"test3\testdejs\son\erika.mp3")