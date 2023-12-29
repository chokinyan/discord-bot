import os
from moviepy.editor import *

#for i in os.listdir("M:\Mon Drive\sons like"):
video = VideoFileClip(r"bot\son\IMG_2478.TRIM.MOV")
video.audio.write_audiofile(r"bot\son\erika.mp3")