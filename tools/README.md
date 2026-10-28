# Photo tools
Needs Python 3: `pip install pillow numpy scipy`

## unbg.py: remove a coloured/grey background
`python tools/unbg.py input.png output.png 14`
Last number = colour tolerance (default 14). Do not use on products close to the background colour.

## shopimg.py: put a product on the shop card canvas
`python tools/shopimg.py input.png public/img/shop/<slug>.webp 0.5 0.85`
Composites on white, crops to the product, centres on 900x900. Last two numbers = max width and height as FRACTIONS (0..1) of the canvas. Tall bottle: 0.4 0.85. Wide item: 0.8 0.8. Never pixels.
Then connect the photo to the card (CLAUDE.md, "Photos"), run `npm run build`, check the card in the browser.
