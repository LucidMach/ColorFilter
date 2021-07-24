import sys
import numpy as np
from PIL import Image

print(sys.argv[1])

pic = Image.open("./input/image.png")
pic_arr = np.asarray(pic)

if sys.argv[1] == "red":
    pic_red = pic_arr.copy()
    pic_red[:, :, 1] = 0
    pic_red[:, :, 2] = 0
    data = Image.fromarray(pic_red)
    data.save("./output/image.png")
    sys.exit()

if sys.argv[1] == "green":
    pic_green = pic_arr.copy()
    pic_green[:, :, 0] = 0
    pic_green[:, :, 2] = 0
    data = Image.fromarray(pic_green)
    data.save("./output/image.png")
    sys.exit()

if sys.argv[1] == "blue":
    pic_blue = pic_arr.copy()
    pic_blue[:, :, 0] = 0
    pic_blue[:, :, 1] = 0
    data = Image.fromarray(pic_blue)
    data.save("./output/image.png")
    sys.exit()

if sys.argv[1] == "yellow":
    pic_yellow = pic_arr.copy()
    pic_yellow[:, :, 2] = 0
    data = Image.fromarray(pic_yellow)
    data.save("./output/image.png")
    sys.exit()

if sys.argv[1] == "pink":
    pic_pink = pic_arr.copy()
    pic_pink[:, :, 1] = 0
    data = Image.fromarray(pic_pink)
    data.save("./output/image.png")
    sys.exit()

if sys.argv[1] == "cyan":
    pic_cyan = pic_arr.copy()
    pic_cyan[:, :, 0] = 0
    data = Image.fromarray(pic_cyan)
    data.save("./output/image.png")
    sys.exit()
