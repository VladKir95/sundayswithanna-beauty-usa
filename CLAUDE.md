# Sundays with Anna (beauty): project guide for Claude

US-audience beauty and wellness site. Astro 5, static. Run: `npm install`, `npm run dev` (http://localhost:4321), shop page: http://localhost:4321/shop/. Nothing is published yet.
Standing rules (user's style, publishing, Anna's voice) live in Claude's account memory. Most important:
- NEVER publish, deploy or merge anything without an explicit "да" from the user.
- Article text is in Anna's first person. Never invent personal facts about her.
- Ingredient lists come from the brand's official site and are collapsed under a toggle.
- SEO research (DataForSEO) is required before every article; keep it in keywords.md.
- If CSS or images do not refresh: restart `npm run dev` and press Ctrl+F5.

## Design
Flat grey blocks (#F7F7F7 / #EDEDED), Inter Tight (uppercase bold grey headings), Newsreader (body), Reenie Beanie (pink handwritten notes). Accents: #B0475E, #C2517A, soft pink #F2C6D3 (text on it: #8F2E47). Global CSS: `src/styles/global.css`; the shop page has its own inline CSS in `src/pages/shop.astro`.

## Shop (/shop/)
- Page: `src/pages/shop.astro`. Data: `src/data/shop.mjs`. Photos: `public/img/shop/<slug>.webp` (900x900, white background).
- `categories` (bottom of shop.mjs) -> groups -> items. Empty categories (Makeup, Clothes, Home) show "Soon".
- Add a product:
  - Most items: `sk('Brand Product Name', 'size', 'search query', { p: price, u: 'YesStyle product URL' })` in the right group. Pass `null` as the 4th argument if YesStyle does not sell it.
  - Special shops (Gisou, Rituals, Tamburins, tech): `custom({ name, sub, img, rows:[{ shop, p, note, u }] })`.
  - New brand: add it to the `BRANDS` array (brand filter). The item name must start with the brand.
- Photos: skincare items get the photo from the `IMGS` map (name -> file slug). Other groups: set `img:'/img/shop/<slug>.webp'` on the item itself (the map covers skincare only).
- Card badge: pink "Read my review" when the item has a review link, otherwise grey "Review coming soon". Check how existing reviewed items are marked in shop.mjs before adding one.
- Each card has an anchor id from `slugOf(name)`; review pages link to it via `src/components/BuyCard.astro` ("See it in my shop"). shop.astro also writes schema.org ItemList JSON-LD.
- Price rows: YesStyle, Sephora or Ulta (search link), Olive Young (unset on purpose), Amazon (`dp('ASIN')` for a known listing, else a search link; show a price only when the listing is the exact product).

## Photos
See `tools/README.md`. Short: `python tools/unbg.py in.png out.png 14` removes a coloured background; `python tools/shopimg.py in.png public/img/shop/<slug>.webp 0.5 0.85` crops and centres on a 900x900 white canvas. The last two numbers are FRACTIONS of the canvas, not pixels. Always look at the result.

## Reviews
Articles live in `src/pages/beauty/`. Each product review has: "Product facts" box, "What's inside and what it targets" (key ingredients + official list, collapsed), and a skin-concern table. Order to write them: `review-queue.md` (US search demand).

## Known gaps / to do
- Domain and hosting not chosen: no `site` in Astro config, no canonical, no sitemap, schema URLs are relative.
- Many products have no Amazon price; few have a Sephora price.
- Low-resolution photos: WHIPPED, ma:nyo, LANEIGE Water Bank Serum.
- "Some links may be affiliate links" is still on gift-guide pages (no affiliate links yet).
- `src/pages/shop-intro-variants.astro` is a test redirect: delete it.
- Ideas not started: "Anna's pick" badge, MailerLite signup, Search Console.
