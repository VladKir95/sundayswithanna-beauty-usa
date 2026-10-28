import { categories } from './shop.mjs';
// GIFT GUIDES. Each guide is a themed list built from the products in shop.mjs.
// live: true -> page /gift-guides/<slug>/ is created. pick(item, group) decides which products go in.
// To add a guide: add one block below. To mark one "coming soon": live:false (no pick needed).
const lowest = (it) => { const s = it.rows.filter(r => r.p != null && !r.set).map(r => r.p); return s.length ? Math.min(...s) : null; };
export const guides = [
  { slug: 'under-15', title: 'Skincare gifts under $15', blurb: 'Small, lovely and easy on the budget. Good for stocking stuffers and secret Santa.', tag: 'Under $15', live: true,
    pick: (it) => { const l = lowest(it); return l != null && l <= 15; } },
  { slug: 'sun-lover', title: 'For the sunscreen lover', blurb: 'Sunscreens and sun serums for the friend who never leaves the house without SPF.', tag: 'SPF', live: true,
    pick: (it, g) => g.title === 'Sun protection' },
  { slug: 'self-care-night', title: 'A self-care night in', blurb: 'Masks and glow-givers for a quiet evening with tea and a good playlist.', tag: 'Cozy', live: true,
    pick: (it, g) => g.title === 'Hydrogel masks' || g.title === 'Serum, pads and cleansing' },
  { slug: 'for-mom', title: 'For mom', blurb: 'Gentle, thoughtful picks she will actually use.', tag: 'Soon', live: false },
  { slug: 'travel-kit', title: 'The travel beauty kit', blurb: 'Small things worth packing for a trip.', tag: 'Soon', live: false },
  { slug: 'best-friend', title: 'For your best friend', blurb: 'Fun, giftable finds from my shelf.', tag: 'Soon', live: false },
];
export function itemsFor(guide) {
  const out = [];
  for (const c of categories) for (const g of c.groups) for (const it of g.items) if (guide.pick(it, g)) out.push({ ...it, low: lowest(it) });
  return out;
}
