import sys
from PIL import Image, ImageFilter
import numpy as np
from scipy import ndimage as ndi
src,out,thr=sys.argv[1],sys.argv[2],int(sys.argv[3]) if len(sys.argv)>3 else 14
im=Image.open(src).convert('RGB'); a=np.asarray(im).astype(int)
bg=np.median(np.concatenate([a[:8].reshape(-1,3),a[-8:].reshape(-1,3),a[:,:8].reshape(-1,3),a[:,-8:].reshape(-1,3)]),axis=0)
m=np.abs(a-bg).sum(2)>thr
m=ndi.binary_closing(m,iterations=2); m=ndi.binary_fill_holes(m)
lab,n=ndi.label(m); s=ndi.sum(m,lab,range(1,n+1)); keep=[i+1 for i,v in enumerate(s) if v>0.004*s.max()]; m=np.isin(lab,keep)
mk=Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8))
w=Image.new('RGB',im.size,(255,255,255)); w.paste(im,mask=mk); w.save(out)
