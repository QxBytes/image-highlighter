from PIL import Image
import sys
#Default: 70 chars for 11 pt. roboto mono 142 chars for 7 pt, .1 margins
#Template: #{hr}{hg}{hb}\n
#Image input: input.png // output: output.png
#Requires PILLOW pip module
def write(im, template, output):
    (width, height) = im.size
    for y in range(0, height):
        for x in range(0, width):
            r, g, b, a = im.getpixel((x,y))
            black = 0
            if r + g + b > 382 and a > 128:
                black = 255
            #you need all of the a=a or the thing won't know the order
            output.write(
                template.format(
                    a=a,
                    r=r,
                    g=g,
                    b=b,
                    x=x,
                    y=y,
                    bw=black,
                    ha=format((a),'x').zfill(2),
                    hr=format((r),'x').zfill(2),
                    hg=format((g),'x').zfill(2),
                    hb=format((b),'x').zfill(2)
                )
            )

def fit(image, basewidth):
    #increases or decreases width to fit basewidth
    wpercent = (basewidth/float(image.size[0]))
    #adjusts height accordingly
    hsize = int((float(image.size[1])*float(wpercent)))
    image = image.resize((basewidth,hsize))
    return image

default_path = "input.png"
input_path = default_path if len(sys.argv) <= 2 else sys.argv[2] 
im = Image.open(input_path)
im = im.convert('RGBA')

default_resize = 70
resize = default_resize if len(sys.argv) <= 3 else sys.argv[3]
#Do not resize if -1
if resize >= 0:
    im = fit(im, resize)

default_template = "#{hr}{hg}{hb} "
template = default_template if len(sys.argv) == 1 else sys.argv[1] 

file = open("output.txt","w")
write(im, template, file)
file.close()

im.show()


