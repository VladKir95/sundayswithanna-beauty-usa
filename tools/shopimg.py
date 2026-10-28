import sys
from PIL import Image, ImageChops
src,out,bw,bh=sys.argv[1],sys.argv[2],float(sys.argv[3]),float(sys.argv[4])
im=Image.open(src).convert('RGBA'); bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im); im=bg.convert('RGB')
d=ImageChops.difference(im,Image.new('RGB',im.size,(255,255,255))).convert('L').point(lambda v:255 if v>12 else 0)
c=im.crop(d.getbbox()); S=900; r=min(S*bw/c.width,S*bh/c.height)
c=c.resize((int(c.width*r),int(c.height*r)),Image.LANCZOS)
can=Image.new('RGB',(S,S),(255,255,255)); can.paste(c,((S-c.width)//2,(S-c.height)//2)); can.save(out,'WEBP',quality=86); print(c.size)
