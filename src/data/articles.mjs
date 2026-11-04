// Cards for "Keep reading" blocks. Key = article URL.
const R = ['facts', 'ing', 'skin'];
const N = ['research', 'sources'];
export const articles = {
  '/beauty/round-lab-birch-juice-sunscreen-review/': { kind: 'Review', pill: 'Sun protection', title: 'Round Lab Birch Juice sunscreen: all four versions compared', intro: 'Sunscreen, sun serum, Mild-Up and the stick: texture, white cast, under makeup, and which one to buy.', img: '/img/round-lab-cover.webp', pos: '50% 50%', chips: R },
  '/beauty/medicube-zero-pore-pad-review/': { kind: 'Review', pill: 'Visible pores', title: 'Medicube Zero Pore Pad 2.0, three years in', intro: 'How I use it, what it did for blackheads and pores, and how it compares with Celimax.', img: '/img/sink.webp', pos: '50% 100%', chips: R },
  '/beauty/morning-skincare-routine-dry-skin-winter/': { kind: 'Routine', pill: 'Dry and tight', title: 'My morning routine for dry skin in winter', intro: 'What I used at Badeschloss in Bad Gastein: face products, eye patches and SPF.', img: '/img/bshelf.webp', pos: '50% 50%', chips: ['face', 'eye', 'sun'] },
  '/beauty/round-lab-camellia-deep-collagen-sun-serum-review/': { kind: 'Review', pill: 'Sun protection', title: 'Round Lab Camellia Deep Collagen sun serum', intro: 'SPF 50+ with collagen and retinoid: what they really do, the texture and how to use it.', chips: R },
  '/beauty/beauty-of-joseon-relief-sun-review/': { kind: 'Review', pill: 'Sun protection', title: 'Beauty of Joseon Relief Sun: Rice + Probiotics vs Aqua-Fresh', intro: 'UV filters, SPF lab results, white cast and who it suits.', chips: R },
  '/beauty/biodance-bio-collagen-real-deep-mask-review/': { kind: 'Review', pill: 'Dry and tight', title: 'Biodance Bio-Collagen mask: pink, blue and purple compared', intro: 'How long to wear it, what it can and cannot do, and the blue and purple versions.', chips: R },
  '/beauty/axis-y-dark-spot-correcting-glow-serum-review/': { kind: 'Review', pill: 'Dark spots', title: 'Axis-Y Dark Spot Glow Serum', intro: 'What 5% niacinamide can and cannot do, what TikTok and Reddit say, and how to use it.', chips: R },
  '/notes/gut-health-and-skin-barrier/': { kind: 'Note', pill: 'Gut health', title: 'Gut health and skin, part 1', intro: 'How gut health can show up on your skin, what the research really says and what I would do first.', chips: N },
  '/notes/foods-and-supplements-for-skin/': { kind: 'Note', pill: 'Food and skin', title: 'Foods for glowing skin, part 2', intro: 'The foods I come back to, how I think about magnesium, omega-3s, zinc and probiotics, and real daily limits.', chips: N },
  '/notes/foods-that-cause-breakouts/': { kind: 'Note', pill: 'Breakouts', title: 'Hidden skin triggers, part 3', intro: 'What the research shows about sugar, dairy, alcohol, stress and sleep, and how I find my own triggers.', chips: N },
  '/notes/gut-health-checklist/': { kind: 'Note', pill: 'Gut health', img: '/img/curlers-selfie-hero.webp', pos: '42% 40%', title: 'Gut health checklist, part 4', intro: 'Small daily habits for better digestion and glowing skin: protein, plants, a walk after meals, sleep and calm.', chips: N },
  '/notes/best-foods-for-skin/': { kind: 'Note', pill: 'Food and skin', title: 'Best foods for skin, part 5', intro: 'My grocery list for glowing skin and a healthy gut, with real numbers and honest limits.', chips: N },
};
