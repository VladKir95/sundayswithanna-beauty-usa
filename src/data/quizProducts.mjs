// SKIN QUIZ PRODUCT PICKS. To add a product to the quiz, add one block below. No other file needs to change.
//   name, why   : title and one honest line (use facts from the review / official page)
//   href, label : where the card links ('/beauty/...-review/' + 'Read my review', or '/shop/' + 'See it in my shop')
//   role        : 'spf' (sunscreen slot, one is shown) or 'care' (treatments, moisturizers, masks, up to 3 shown)
//   concerns    : which quiz concerns it fits: 'pores' | 'spots' | 'red' | 'dry' | 'age' | 'maint'
//   types       : skin types it suits: 'dry' | 'normal' | 'combo' | 'oily'  (leave [] if it suits all)
//   sensitive   : true if it is a good pick for reactive skin;  avoidSensitive: true if it is too strong for it
//   priority    : 0 to 2, higher shows first when two products fit equally well
//   live        : false hides it without deleting
export const quizProducts = [
  { key:'sun', role:'spf', live:true, priority:1, types:['oily','combo','normal'], concerns:[],
    name:'Round Lab Birch Juice Moisturizing Sun Serum', why:'A light sun serum that absorbs fast and leaves no white cast.',
    href:'/beauty/round-lab-birch-juice-sunscreen-review/', label:'Read my review' },
  { key:'mild', role:'spf', live:true, priority:1, types:[], concerns:[], sensitive:true,
    name:'Round Lab Birch Juice Mild-Up Sunscreen', why:'A zinc oxide sunscreen with a soft tone-up finish. Mineral filters are a common pick for reactive skin.',
    href:'/beauty/round-lab-birch-juice-sunscreen-review/', label:'Read my review' },
  { key:'boj', role:'spf', live:true, priority:1, types:['dry'], concerns:[],
    name:'Beauty of Joseon Relief Sun: Rice + Probiotics', why:'A creamier sunscreen that feels comfortable on dry skin.',
    href:'/beauty/beauty-of-joseon-relief-sun-review/', label:'Read my review' },
  { key:'cam', role:'spf', live:true, priority:1, types:[], concerns:['age'],
    name:'Round Lab Camellia Deep Collagen Firming Sun Serum', why:'A light sun serum that absorbs without a trace and sits well under makeup.',
    href:'/beauty/round-lab-camellia-deep-collagen-sun-serum-review/', label:'Read my review' },

  { key:'pad', role:'care', live:true, priority:2, types:['oily','combo'], concerns:['pores'], avoidSensitive:false,
    name:'Medicube Zero Pore Pad 2.0', why:'Toner pads aimed at blackheads, excess sebum and visible pores.',
    href:'/beauty/medicube-zero-pore-pad-review/', label:'Read my review' },
  { key:'pore', role:'care', live:true, priority:1, types:['oily','combo'], concerns:['pores'],
    name:'SKIN1004 Poremizing Fresh Ampoule', why:'A lightweight pore-clarifying ampoule with centella and Himalayan mineral salts.',
    href:'/#favourites', label:'See it in my favourites' },
  { key:'axis', role:'care', live:true, priority:2, types:[], concerns:['spots'],
    name:'Axis-Y Dark Spot Correcting Glow Serum', why:'A gentle serum with 5% niacinamide for dark spots and post-acne marks.',
    href:'/beauty/axis-y-dark-spot-correcting-glow-serum-review/', label:'Read my review' },
  { key:'glow', role:'care', live:true, priority:2, types:['dry'], concerns:['red','dry'], sensitive:true,
    name:'glow Aloe Barrier Support Moisturizer', why:'A barrier-support moisturizer with aloe, niacinamide and ceramide NP.',
    href:'/#favourites', label:'See it in my favourites' },
  { key:'mist', role:'care', live:true, priority:1, types:[], concerns:['red','maint'], sensitive:true,
    name:'haruharu wonder Black Rice Serum Mist', why:'A serum mist with a 5-ceramide complex. The brand says it is tested on sensitive skin.',
    href:'/#favourites', label:'See it in my favourites' },
  { key:'bio', role:'care', live:true, priority:1, types:[], concerns:['spots','dry','maint'],
    name:'Biodance Bio-Collagen Real Deep Mask', why:'A hydrogel mask that leaves skin soft and luminous.',
    href:'/beauty/biodance-bio-collagen-real-deep-mask-review/', label:'Read my review' },
  { key:'jart', role:'care', live:true, priority:2, types:[], concerns:['age'],
    name:'Dr.Jart+ Cryo Rubber Mask with Firming Collagen', why:'A collagen ampoule plus a cooling rubber mask, aimed at a firmer-looking finish.',
    href:'/#favourites', label:'See it in my favourites' },
];
