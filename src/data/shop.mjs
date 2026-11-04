// SHOP DATA. Anna can add products here (or send them to Claude).
// Each category has "groups"; each group is one grey panel with product cards.
// Product with the usual three shops: item({ name, sub, review, q, y:{p}, o:{p}, a:{p,u} })
//   y = YesStyle, o = Olive Young Global, a = Amazon. p = price or null. set = "sold only as a set".
// Any other product or shop: custom({ name, sub, review, img, rows:[{ shop:'Zara', p:49.9, u:'https://...' }] })
// Optional for both: img:'/img/shop/name.webp' (photo), review:'/beauty/...' (link to my article).
export const ys = (q) => 'https://www.yesstyle.com/en/list.html?q=' + encodeURIComponent(q);
export const oy = (q) => 'https://global.oliveyoung.com/global/search/results?query=' + encodeURIComponent(q);
export const am = (q) => 'https://www.amazon.com/s?k=' + encodeURIComponent(q);
export const dp = (a) => 'https://www.amazon.com/dp/' + a;
const BRANDS = ['Beauty of Joseon','haruharu wonder','Dear, Klairs','House of Hur','Sungboon Editor','Round Lab','Dr. Jart+','Dr.Jart+','Axis-Y','Medicube','SKIN1004','TIRTIR','Whipped','glow','Huxley','innisfree','iUNIK','LANEIGE','ma:nyo','MEDIHEAL','mixsoon','numbuzin','SKINFOOD','VT','Biodance','Gisou','Anillo','Knock','Narka','Rituals','kaine','skit','Tamburins','currentbody','Shark','insta360','hince','muzigae mansion','MILKTOUCH','parnell','fwee','unleashia','NEOGEN','MISSHA','rhode','CLIO','dasique','Artclass by Rodin','about tone'];
export const brandOf = (name) => { const n = name.toLowerCase(); const b = BRANDS.find((x) => n.startsWith(x.toLowerCase() + ' ')); return b ? (b === 'Dr.Jart+' ? 'Dr. Jart+' : b) : ''; };
const SEPHORA = ['LANEIGE','Dr. Jart+','innisfree','Beauty of Joseon','rhode']; // 'glow' removed: Sephora does not carry it (checked Nov 2026)
export const item = (x) => {
  const b = brandOf(x.name || '');
  const rows = x.y ? [{ shop:'YesStyle', p:x.y.p, u: x.y.u || ys(x.y.q || x.q) }] : [];
  if (x.us !== false) {
    const sep = SEPHORA.includes(b);
    rows.push({ shop: sep ? 'Sephora' : 'Ulta Beauty', p:null, note:'see shop', u: (sep ? 'https://www.sephora.com/search?keyword=' : 'https://www.ulta.com/search?search=') + encodeURIComponent(x.q) });
  }
  if (x.o && x.o.p != null) rows.push({ shop:'Olive Young Global', p:x.o.p, set:x.o.set, u: oy(x.o.q || x.q) });
  rows.push({ shop:'Amazon', p:x.a.p, note:x.a.note, u: x.a.u || am(x.q) });
  return { ...x, rows };
};
const prodOf = (name) => { const b = brandOf(name); return (b ? name.slice(b.length) : name).toLowerCase(); };
export const tagsOf = (it, groupTitle) => {
  const g = (groupTitle || '').toLowerCase(), t = prodOf(it.name), out = [];
  if (g.startsWith('hair and body')) return ['hair','body'];
  if (/^(shampoo|scalp)/.test(g)) return ['hair'];
  if (g.startsWith('body')) return ['body'];
  if (/\bsun\b|sunscreen|spf|\buv\b/.test(t) || g.startsWith('sun')) out.push('sun');
  if (/\blip\b/.test(t)) out.push('lips');
  if (/pore|blackhead|blemish|mud mask|azela|hypochlorous|clay|mugwort|spot correcting cream/.test(t)) out.push('pores');
  if (/dark spot|niacinamide|vita c|vitamin|brighten|txa|lemon|glow (cream|toner|capsule|jelly)/.test(t)) out.push('glow');
  if (/centella|cica|calming|soothing|panthenol|pine|matcha|aloe|relief|hypochlorous/.test(t)) out.push('soothing');
  if (/collagen|firming|pdrn|peptide|bakuchiol|retinol|reedle|lifting|egf|cryo|bouncy|youth|ceramidin/.test(t)) out.push('firming');
  if (/hydrat|moistur|water|hyaluronic|ceramide|barrier|beta-glucan|birch|sleeping mask|sorbet|dokdo|milk/.test(t)) out.push('hydration');
  return [...new Set(out)];
};
export const slugOf = (name) => name.toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
export const custom = (x) => ({ ...x, rows: x.rows || [] });

const skincare = [
{ title:'Sun protection', tag:'Protect', note:'My sunscreens and sun serums', items:[
 item({ name:'Round Lab Birch Juice Moisturizing Sunscreen', img:'/img/shop/round-lab-birch-juice-sunscreen.webp', sub:'50 ml, SPF 50+ PA++++', review:'/beauty/round-lab-birch-juice-sunscreen-review/', q:'round lab birch juice moisturizing sunscreen',
   y:{p:14.02}, o:{p:17.17,set:'set with cleanser and scrunchie',q:'round lab birch juice sunscreen'}, a:{p:21.79,u:dp('B0DJGWH3TC')} }),
 item({ name:'Round Lab Birch Juice Moisturizing Sun Serum', img:'/img/shop/round-lab-birch-juice-sun-serum.webp', sub:'50 ml, SPF 50 PA++++', review:'/beauty/round-lab-birch-juice-sunscreen-review/', q:'round lab birch juice sun serum',
   y:{p:null}, o:{p:29.21,set:'2 x 50 ml set',q:'round lab birch juice sun serum'}, a:{p:24.53,u:dp('B0GXF8YXXV')} }),
 item({ name:'Round Lab Birch Juice Mild-Up Sunscreen', img:'/img/shop/round-lab-birch-juice-mild-up-sunscreen.webp', sub:'50 ml, zinc oxide, SPF 50+', review:'/beauty/round-lab-birch-juice-sunscreen-review/', q:'round lab birch juice mild up sunscreen',
   y:{p:14.30}, o:{p:null,q:'round lab birch juice mild up'}, a:{p:24.99,u:dp('B0DTMGD7NP')} }),
 item({ name:'Round Lab Birch Juice Moisturizing Sun Stick', img:'/img/shop/round-lab-birch-juice-sun-stick.webp', sub:'19 g, SPF 50+ PA++++', review:'/beauty/round-lab-birch-juice-sunscreen-review/', q:'round lab birch juice sun stick',
   y:{p:12.86}, o:{p:29.19,set:'double set with 4 pads',q:'round lab birch juice sun stick'}, a:{p:17.80,u:dp('B0F2HL5XPT')} }),
 item({ name:'Round Lab Camellia Deep Collagen Firming Sun Serum', img:'/img/shop/round-lab-camellia-sun-serum.webp', sub:'50 ml, SPF 50+ PA++++', review:'/beauty/round-lab-camellia-deep-collagen-sun-serum-review/', q:'round lab camellia deep collagen firming sun serum',
   y:{p:14.30}, o:{p:33.00,set:'50 ml set with a 7 ml mini',q:'round lab camellia deep collagen'}, a:{p:28.00,u:dp('B0GF3XH95Y')} }),
 item({ name:'Beauty of Joseon Relief Sun: Rice + Probiotics', img:'/img/shop/boj-relief-sun-rice-probiotics.webp', sub:'50 ml, SPF 50+ PA++++', review:'/beauty/beauty-of-joseon-relief-sun-review/', q:'beauty of joseon relief sun rice probiotics',
   y:{p:15.74,q:'beauty of joseon relief sun'}, o:{p:14.99,q:'beauty of joseon relief sun'}, a:{p:null,note:'check the seller'} }),
 item({ name:'Beauty of Joseon Relief Sun Aqua-Fresh: Rice + B5', img:'/img/shop/boj-relief-sun-aqua-fresh.webp', sub:'50 ml, SPF 50+ PA++++', review:'/beauty/beauty-of-joseon-relief-sun-review/', q:'beauty of joseon relief sun aqua fresh',
   y:{p:14.04,q:'beauty of joseon relief sun'}, o:{p:14.99,q:'beauty of joseon relief sun'}, a:{p:null,note:'check the seller'} }),
 item({ name:'SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum', img:'/img/shop/skin1004-hyalu-cica-sun-serum.webp', sub:'50 ml, SPF 50', review:'/beauty/round-lab-birch-juice-sunscreen-review/', q:'skin1004 hyalu-cica water-fit sun serum',
   y:{p:11.64,q:'skin1004 hyalu-cica sun serum'}, o:{p:null}, a:{p:17.39,u:dp('B0FXH5LHN8')} }),
 item({ name:'SKIN1004 Madagascar Centella Hyalu-Cica Silky-Fit Sun Stick', img:'/img/shop/skin1004-hyalu-cica-sun-stick.webp', sub:'20 g, SPF 50+', q:'skin1004 hyalu-cica silky-fit sun stick',
   o:{p:null}, a:{p:null,note:'check the seller'} }),
]},
{ title:'Serum, pads and cleansing', tag:'Glow', note:'Skincare I keep coming back to', items:[
 item({ name:'Axis-Y Dark Spot Correcting Glow Serum', img:'/img/shop/axis-y-dark-spot-glow-serum.webp', sub:'50 ml, 5% niacinamide', review:'/beauty/axis-y-dark-spot-correcting-glow-serum-review/', q:'axis-y dark spot correcting glow serum',
   y:{p:8.82,q:'axis-y dark spot'}, o:{p:null}, a:{p:null} }),
 item({ name:'Medicube Zero Pore Pad 2.0', img:'/img/shop/medicube-zero-pore-pad.webp', sub:'Toner pads for pores', review:'/beauty/medicube-zero-pore-pad-review/', q:'medicube zero pore pad 2.0',
   y:{p:26.28,q:'medicube zero pore pad'}, o:{p:null}, a:{p:18.90,u:dp('B09V7Z4TJG')} }),
 item({ name:'Round Lab 1025 Dokdo Toner', img:'/img/shop/round-lab-dokdo-toner.webp', sub:'Gentle daily toner', review:'/beauty/round-lab-birch-juice-sunscreen-review/', q:'round lab 1025 dokdo toner',
   y:{p:16.32,q:'round lab dokdo toner'}, o:{p:null}, a:{p:11.68,u:dp('B08FM5BTF6')} }),
 item({ name:'Round Lab Birch Juice Moisturizing Cleanser', img:'/img/shop/round-lab-birch-juice-cleanser.webp', sub:'Gentle daily cleanser', review:'/beauty/round-lab-birch-juice-sunscreen-review/', q:'round lab birch juice moisturizing cleanser',
   y:{p:13.78,q:'round lab birch juice'}, o:{p:null}, a:{p:13.76,u:dp('B093W78YWZ')} }),
]},
{ title:'Hydrogel masks', tag:'Treat', note:'Pink, blue and purple Biodance', items:[
 item({ name:'Biodance Bio-Collagen Real Deep Mask (pink)', img:'/img/shop/biodance-bio-collagen-pink.webp', sub:'Pack of 4 masks', review:'/beauty/biodance-bio-collagen-real-deep-mask-review/', q:'biodance bio-collagen real deep mask',
   y:{p:21.00,q:'biodance real deep mask'}, o:{p:null,q:'biodance'}, a:{p:19.00,u:dp('B0B2RM68G2')} }),
 item({ name:'Biodance Hydro Cera-nol Real Deep Mask (blue)', img:'/img/shop/biodance-hydro-cera-nol-blue.webp', sub:'Pack of 4 masks', review:'/beauty/biodance-bio-collagen-real-deep-mask-review/', q:'biodance hydro cera-nol real deep mask',
   y:{p:21.00,q:'biodance real deep mask'}, o:{p:null,q:'biodance'}, a:{p:19.00,u:dp('B0CWGSP1WY')} }),
 item({ name:'Biodance Rejuvenating Caviar PDRN Real Deep Mask (purple)', img:'/img/shop/biodance-caviar-pdrn-purple.webp', sub:'Pack of 4 masks', review:'/beauty/biodance-bio-collagen-real-deep-mask-review/', q:'biodance caviar pdrn real deep mask',
   y:{p:24.00,q:'biodance real deep mask'}, o:{p:null,q:'biodance'}, a:{p:19.00,u:dp('B0GY427BJK')} }),
]},
];

const sk = (name, sub, q, y) => item({ name, sub, q, y, o:{ p:null }, a:{ p:null } });

// ---- more skincare (YesStyle prices; Olive Young and Amazon to be filled)
skincare.push(
{ title:'Cleansers', tag:'Cleanse', note:'gentle ways to start and end my day', items:[
 sk('WHIPPED Vegan Pack Cleanser DDalva', '', 'whipped vegan pack cleanser ddalva', { p:31.19, u:'https://www.yesstyle.com/en/whipped-vegan-pack-cleanser-jumbo-6-types-ddalva/info.html/pid.1132499109' }),
 sk('WHIPPED Mugtree Vegan Cookie Clay Pack Cleanser', '180 ml', 'whipped mugtree vegan cookie clay pack cleanser', { p:31.19, u:'https://www.yesstyle.com/en/whipped-mugtree-vegan-cookie-clay-pack-cleanser-180ml/info.html/pid.1134522179' }),
 sk('glow Guava Facial Cleanser', '190 ml', 'glow guava facial cleanser', { p:37.20, u:'https://www.yesstyle.com/en/glow-guava-facial-cleanser-190ml/info.html/pid.1128041562' }),
 sk('TIRTIR Milk Creamy Foam Cleanser', '90 g', 'tirtir milk creamy foam cleanser', { p:19.49, u:'https://www.yesstyle.com/en/tirtir-milk-creamy-foam-cleanser-90g/info.html/pid.1136483675' }),
 sk('Huxley Cleansing Gel Be Clean Be Moist', '200 ml', 'huxley cleansing gel be clean be moist', { p:24.84, u:'https://www.yesstyle.com/en/huxley-cleansing-gel-be-clean-be-moist-200ml/info.html/pid.1060418125' }),
 sk('iUNIK Beta-Glucan Barrier Ampoule Cleanser', '120 ml', 'iunik beta-glucan barrier ampoule cleanser', { p:16.22, u:'https://www.yesstyle.com/en/iunik-beta-glucan-barrier-ampoule-cleanser-120ml/info.html/pid.1137825955' }),
 sk('ma:nyo Herbgreen Cleansing Oil', '', 'ma:nyo herbgreen cleansing oil', { p:null }),
 sk('numbuzin Zero Blemish Oil-Free Micellar Cleansing Jelly', '200 ml', 'numbuzin zero blemish oil-free micellar cleansing jelly', { p:20.16, u:'https://www.yesstyle.com/en/numbuzin-zero-blemish-oil-free-micellar-cleansing-jelly-200ml/info.html/pid.1137994196' }),
 sk('ROUND LAB Pine Calming Cica Cleanser', '150 ml', 'round lab pine calming cica cleanser', { p:14.28, u:'https://www.yesstyle.com/en/round-lab-pine-calming-cica-cleanser-150ml/info.html/pid.1123980104' }),
 sk('ROUND LAB Camellia Deep Collagen Jelly Mask Cleanser', '150 ml', 'round lab camellia deep collagen jelly mask cleanser', { p:13.34, u:'https://www.yesstyle.com/en/round-lab-camellia-deep-collagen-jelly-mask-cleanser-150ml/info.html/pid.1135216302' }),
]},
{ title:'Toners, mists and pads', tag:'Hydrate', note:'the layers that make skin feel soft', items:[
 sk('WHIPPED Muhwabutter Vegan Milk Foam Pack Mist', '150 ml', 'whipped muhwabutter vegan milk foam pack mist', { p:31.50, u:'https://www.yesstyle.com/en/whipped-muhwabutter-vegan-milk-foam-pack-mist-150ml/info.html/pid.1136228166' }),
 sk('glow EGF Serum Mist', '70 ml', 'glow egf serum mist', { p:42.86, u:'https://www.yesstyle.com/en/glow-egf-serum-mist-70ml/info.html/pid.1138024139' }),
 sk('glow Clean & Polished Lemon Vitamin Toner', '300 ml', 'glow clean & polished lemon vitamin toner', { p:38.40, u:'https://www.yesstyle.com/en/glow-clean-polished-lemon-vitamin-toner-300ml/info.html/pid.1127090456' }),
 sk('haruharu wonder Black Rice Probiotics Barrier 2% NAD+ Serum Mist', '80 ml', 'haruharu wonder black rice probiotics barrier 2% nad serum mist', { p:18.48, u:'https://www.yesstyle.com/en/haruharu-wonder-black-rice-probiotics-barrier-2-nad-serum-mist-80ml/info.html/pid.1136761022' }),
 sk('SKIN1004 Madagascar Centella Quick Calming Pad', '70 sheets', 'skin1004 madagascar centella quick calming pad', { p:16.20, u:'https://www.yesstyle.com/en/skin1004-madagascar-centella-quick-calming-pad-70-sheets/info.html/pid.1113064808' }),
 sk('medicube Hypochlorous Acid Daily Facial Spray', '125 ml', 'medicube hypochlorous acid daily facial spray', { p:27.48, u:'https://www.yesstyle.com/en/medicube-hypochlorous-acid-daily-facial-spray-125ml/info.html/pid.1136546936' }),
 sk('medicube PDRN Pink Niacinamide Milky Toner', '150 ml', 'medicube pdrn pink niacinamide milky toner', { p:27.48, u:'https://www.yesstyle.com/en/medicube-pdrn-pink-niacinamide-milky-toner-150ml/info.html/pid.1134358426' }),
 sk('medicube PDRN Pink Collagen Glow Jelly Mist Serum', '100 ml', 'medicube pdrn pink collagen glow jelly mist serum', { p:28.68, u:'https://www.yesstyle.com/en/medicube-pdrn-pink-collagen-glow-jelly-mist-serum-100ml/info.html/pid.1136936097' }),
 sk('Beauty of Joseon Green Plum Refreshing Toner: AHA + BHA', '', 'beauty of joseon green plum refreshing toner: aha  bha', { p:16.80, u:'https://www.yesstyle.com/en/beauty-of-joseon-green-plum-refreshing-toner-aha-bha-2024-version/info.html/pid.1116280739' }),
 sk('AXIS-Y Triple PDRN Gel Toner', '270 ml', 'axis-y triple pdrn gel toner', { p:19.20, u:'https://www.yesstyle.com/en/axis-y-triple-pdrn-gel-toner-270ml/info.html/pid.1137092091' }),
 sk('AXIS-Y Dark Spot Correcting Glow Toner', '125 ml', 'axis-y dark spot correcting glow toner', { p:18.82, u:'https://www.yesstyle.com/en/axis-y-dark-spot-correcting-glow-toner-125ml/info.html/pid.1129633493' }),
 sk('Dear, Klairs Blue EGF Calming Mist', '100 ml', 'dear klairs blue egf calming mist', { p:18.48, u:'https://www.yesstyle.com/en/dear-klairs-blue-egf-calming-mist-100ml/info.html/pid.1137798263' }),
 sk('LANEIGE Cream Skin Cerapeptide Refiner', '170 ml', 'laneige cream skin cerapeptide refiner', { p:30.49, u:'https://www.yesstyle.com/en/laneige-cream-skin-cerapeptide-refiner-170ml/info.html/pid.1131685813' }),
 sk('numbuzin Zero Blemish Azela Cica Balancing Dual Pads', '60 pads', 'numbuzin zero blemish azela cica balancing dual pads', { p:23.04, u:'https://www.yesstyle.com/en/numbuzin-zero-blemish-azela-cica-balancing-dual-pads-60-pads/info.html/pid.1137994198' }),
 sk('ROUND LAB Birch Juice Moisturizing Pad', '80 pads', 'round lab birch juice moisturizing pad', { p:21.70, u:'https://www.yesstyle.com/en/round-lab-birch-juice-moisturizing-pad-80-pads/info.html/pid.1123980117' }),
 sk('ROUND LAB Soybean Panthenol Toner', '250 ml', 'round lab soybean panthenol toner', { p:20.35, u:'https://www.yesstyle.com/en/round-lab-soybean-panthenol-toner-250ml/info.html/pid.1130119229' }),
 sk('SKINFOOD Carrot Carotene Calming Water Pad', '60 pads', 'skinfood carrot carotene calming water pad', { p:15.18, u:'https://www.yesstyle.com/en/skinfood-carrot-carotene-calming-water-pad-60-pads/info.html/pid.1093254315' }),
 sk('SUNGBOON EDITOR Deep Collagen Barrier Serum Mist', '95 ml', 'sungboon editor deep collagen barrier serum mist', { p:17.82, u:'https://www.yesstyle.com/en/sungboon-editor-deep-collagen-barrier-serum-mist-95ml/info.html/pid.1135359584' }),
 sk('kaine Kombu Balancing Ampoule Toner', '150 ml', 'kaine kombu balancing ampoule toner', null),
 sk('skit Glutamilk Essence Toner', '150 ml', 'skit glutamilk essence toner', { p:26.88, u:'https://www.yesstyle.com/en/skit-glutamilk-essence-toner-150ml/info.html/pid.1138034615' }),
]},
{ title:'Serums, essences and ampoules', tag:'Glow', note:'little bottles with big results', items:[
 sk('WHIPPED Mugwort Tea Tree Vegan Whipping Bubble Serum', '92 ml', 'whipped mugwort tea tree vegan whipping bubble serum', { p:31.92, u:'https://www.yesstyle.com/en/whipped-mugwort-tea-tree-vegan-whipping-bubble-serum-92ml/info.html/pid.1137955267' }),
 sk('haruharu wonder Black Rice Probiotics Barrier Essence', '120 ml', 'haruharu wonder black rice probiotics barrier essence', { p:23.52, u:'https://www.yesstyle.com/en/haruharu-wonder-black-rice-probiotics-barrier-essence-120ml/info.html/pid.1129799320' }),
 sk('haruharu wonder Rose PDRN Soothing Serum', '30 ml', 'haruharu wonder rose pdrn soothing serum', { p:12.74, u:'https://www.yesstyle.com/en/haruharu-wonder-rose-pdrn-soothing-serum-30ml/info.html/pid.1136547924' }),
 sk('TIRTIR Matcha Dual Serum', '50 ml', 'tirtir matcha dual serum', { p:27.84, u:'https://www.yesstyle.com/en/tirtir-matcha-dual-serum-50ml/info.html/pid.1137403228' }),
 sk('AXIS-Y Artichoke Intensive Skin Barrier Ampoule', '30 ml', 'axis-y artichoke intensive skin barrier ampoule', { p:14.04, u:'https://www.yesstyle.com/en/axis-y-artichoke-intensive-skin-barrier-ampoule-30ml-upgraded-version/info.html/pid.1078919524' }),
 sk('Dear, Klairs Midnight Blue Youth Activating Drop', '20 ml', 'dear klairs midnight blue youth activating drop', { p:25.19, u:'https://www.yesstyle.com/en/dear-klairs-midnight-blue-youth-activating-drop-20ml/info.html/pid.1060708151' }),
 sk('Huxley Oil Essence Essence Like Oil Like', '30 ml', 'huxley oil essence essence like oil like', { p:29.27, u:'https://www.yesstyle.com/en/huxley-oil-essence-essence-like-oil-like-30ml/info.html/pid.1060418135' }),
 sk('innisfree Green Tea Ceramide Milk Barrier Essence', '160 ml', 'innisfree green tea ceramide milk barrier essence', { p:26.45, u:'https://www.yesstyle.com/en/innisfree-green-tea-ceramide-milk-barrier-essence-160ml/info.html/pid.1136244541' }),
 sk('iUNIK Beta-Glucan Power Moisture Serum', '50 ml', 'iunik beta-glucan power moisture serum', { p:18.00, u:'https://www.yesstyle.com/en/iunik-beta-glucan-power-moisture-serum-50ml/info.html/pid.1065077575' }),
 sk('iUNIK Beta-Glucan Lacto Barrier Milk Essence', '200 ml', 'iunik beta-glucan lacto barrier milk essence', { p:21.60, u:'https://www.yesstyle.com/en/iunik-beta-glucan-lacto-barrier-milk-essence-200ml/info.html/pid.1136389281' }),
 sk('LANEIGE Water Bank Blue Hyaluronic Serum', '50 ml', 'laneige water bank blue hyaluronic serum', { p:35.72, u:'https://www.yesstyle.com/en/laneige-water-bank-blue-hyaluronic-serum-50ml/info.html/pid.1112107297' }),
 sk('ma:nyo Bifida Biome Complex Ampoule', '50 ml', 'ma:nyo bifida biome complex ampoule', { p:29.16, u:'https://www.yesstyle.com/en/ma-nyo-bifida-biome-complex-ampoule-50ml/info.html/pid.1133475125' }),
 sk('mixsoon Bean Essence', '50 ml', 'mixsoon bean essence', { p:17.78, u:'https://www.yesstyle.com/en/mixsoon-bean-essence-jumbo-50ml/info.html/pid.1105987458' }),
 sk('mixsoon Glacier Water Hyaluronic Acid Serum Jumbo', '300 ml', 'mixsoon glacier water hyaluronic acid serum jumbo', { p:25.63, u:'https://www.yesstyle.com/en/mixsoon-glacier-water-hyaluronic-acid-serum-jumbo-300ml/info.html/pid.1105987485' }),
 sk('ROUND LAB Vita Niacinamide Dark Spot Serum', '30 ml', 'round lab vita niacinamide dark spot serum', { p:10.01, u:'https://www.yesstyle.com/en/round-lab-vita-niacinamide-dark-spot-serum-30ml/info.html/pid.1129809894' }),
 sk('ROUND LAB Pine Calming Cica Ampoule', '30 ml', 'round lab pine calming cica ampoule', { p:14.02, u:'https://www.yesstyle.com/en/round-lab-pine-calming-cica-ampoule-30ml/info.html/pid.1123980101' }),
 sk('ROUND LAB Camellia Deep Collagen Firming Ampoule', '30 ml', 'round lab camellia deep collagen firming ampoule', { p:15.07, u:'https://www.yesstyle.com/en/round-lab-camellia-deep-collagen-firming-ampoule-30ml/info.html/pid.1133275896' }),
 sk('VT Reedle Shot 100', '50 ml', 'vt reedle shot 100', { p:21.34, u:'https://www.yesstyle.com/en/vt-reedle-shot-100-50ml/info.html/pid.1121413155' }),
 sk('VT PDRN Essence 100', '30 ml', 'vt pdrn essence 100', { p:26.10, u:'https://www.yesstyle.com/en/vt-pdrn-essence-100-30ml/info.html/pid.1128725437' }),
 sk('skit Tocopherol 5 Serum', '50 ml', 'skit tocopherol 5 serum', { p:22.80, u:'https://www.yesstyle.com/en/skit-tocopherol-5-serum-50ml/info.html/pid.1138034613' }),
]},
{ title:'Creams and moisturizers', tag:'Moisturize', note:'the last step before sleep', items:[
 sk('SKIN1004 Madagascar Centella Poremizing Light Gel Cream', '75 ml', 'skin1004 madagascar centella poremizing light gel cream', { p:14.11, u:'https://www.yesstyle.com/en/skin1004-madagascar-centella-poremizing-light-gel-cream-75ml/info.html/pid.1116073911' }),
 sk('SKIN1004 Madagascar Centella Probio-Cica Enrich Cream', '50 ml', 'skin1004 madagascar centella probio-cica enrich cream', { p:16.20, u:'https://www.yesstyle.com/en/skin1004-madagascar-centella-probio-cica-enrich-cream-50ml/info.html/pid.1120208637' }),
 sk('haruharu wonder Black Rice 5 Ceramide Barrier Moisturizing Cream', '50 ml', 'haruharu wonder black rice 5 ceramide barrier moisturizing cream', { p:18.10, u:'https://www.yesstyle.com/en/haruharu-wonder-black-rice-5-ceramide-barrier-moisturizing-cream-50ml/info.html/pid.1134217071' }),
 sk('glow Aloe Barrier Support Moisturizer', '50 ml', 'glow aloe barrier support moisturizer', { p:62.40, u:'https://www.yesstyle.com/en/glow-aloe-barrier-support-moisturizer-50ml/info.html/pid.1136406514' }),
 sk('TIRTIR Matcha Calming Cream', '50 ml', 'tirtir matcha calming cream', { p:24.00, u:'https://www.yesstyle.com/en/tirtir-matcha-calming-cream-50ml/info.html/pid.1136483673' }),
 sk('medicube Deep Vita C Capsule Cream', '55 g', 'medicube deep vita c capsule cream', { p:28.68, u:'https://www.yesstyle.com/en/medicube-deep-vita-c-capsule-cream-55g/info.html/pid.1129945243' }),
 sk('medicube Collagen Jelly Cream', '110 ml', 'medicube collagen jelly cream', { p:27.48, u:'https://www.yesstyle.com/en/medicube-collagen-jelly-cream-110ml/info.html/pid.1124066776' }),
 sk('AXIS-Y Dark Spot Correcting Glow Cream', '50 ml', 'axis-y dark spot correcting glow cream', { p:15.84, u:'https://www.yesstyle.com/en/axis-y-dark-spot-correcting-glow-cream-50ml/info.html/pid.1129633494' }),
 sk('AXIS-Y TXA 2.5% Intensive Brightening Cream', '50 ml', 'axis-y txa 25% intensive brightening cream', { p:14.76, u:'https://www.yesstyle.com/en/axis-y-txa-2-5-intensive-brightening-cream-50ml/info.html/pid.1136228077' }),
 sk('Dear, Klairs Midnight Blue Clearing Water Cream', '50 g', 'dear klairs midnight blue clearing water cream', { p:22.68, u:'https://www.yesstyle.com/en/dear-klairs-midnight-blue-clearing-water-cream-50g/info.html/pid.1129743634' }),
 sk('House of Hur Phyto Brew Matcha Dual Cream and Gel', '50 ml', 'house of hur phyto brew matcha dual cream and gel', { p:21.06, u:'https://www.yesstyle.com/en/house-of-hur-phyto-brew-matcha-dual-cream-and-gel-50ml/info.html/pid.1136581298' }),
 sk('iUNIK Beta-Glucan 3X Barrier Cream', '50 ml', 'iunik beta-glucan 3x barrier cream', { p:19.20, u:'https://www.yesstyle.com/en/iunik-beta-glucan-3x-barrier-cream-50ml/info.html/pid.1132909879' }),
 sk('iUNIK Centella Relief Sorbet Cream', '50 ml', 'iunik centella relief sorbet cream', { p:17.00, u:'https://www.yesstyle.com/en/iunik-centella-relief-sorbet-cream-50ml/info.html/pid.1135668657' }),
 sk('LANEIGE Water Bank Blue Hyaluronic Moisture Cream', '50 ml', 'laneige water bank blue hyaluronic moisture cream', { p:30.52, u:'https://www.yesstyle.com/en/laneige-water-bank-blue-hyaluronic-moisture-cream-50ml/info.html/pid.1127350889' }),
 sk('LANEIGE Water Sleeping Mask', '70 ml', 'laneige water sleeping mask', { p:20.40, u:'https://www.yesstyle.com/en/laneige-water-sleeping-mask-new-70ml-ex/info.html/pid.1039258910' }),
 sk('LANEIGE Bouncy & Firm Sleeping Mask', '60 ml', 'laneige bouncy & firm sleeping mask', { p:26.56, u:'https://www.yesstyle.com/en/laneige-bouncy-firm-sleeping-mask-60ml/info.html/pid.1128822646' }),
 sk('ROUND LAB Birch Juice Moisturizing Cream', '80 ml', 'round lab birch juice moisturizing cream', { p:15.76, u:'https://www.yesstyle.com/en/round-lab-birch-juice-moisturizing-cream-80ml/info.html/pid.1086574613' }),
 sk('ROUND LAB Camellia Deep Collagen Firming Cream', '50 ml', 'round lab camellia deep collagen firming cream', { p:16.56, u:'https://www.yesstyle.com/en/round-lab-camellia-deep-collagen-firming-cream-50ml/info.html/pid.1133275900' }),
 sk('ROUND LAB Soybean Panthenol Cream', '80 ml', 'round lab soybean panthenol cream', { p:18.92, u:'https://www.yesstyle.com/en/round-lab-soybean-panthenol-cream-80ml/info.html/pid.1127642926' }),
 sk('ROUND LAB Pine Calming Cica Cream Plus', '60 ml', 'round lab pine calming cica cream plus', { p:15.65, u:'https://www.yesstyle.com/en/round-lab-pine-calming-cica-cream-plus-60ml/info.html/pid.1134196804' }),
 sk('ROUND LAB Vita Niacinamide Glow Capsule Cream', '50 ml', 'round lab vita niacinamide glow capsule cream', { p:16.56, u:'https://www.yesstyle.com/en/round-lab-vita-niacinamide-glow-capsule-cream-50ml/info.html/pid.1136315107' }),
 sk('numbuzin Zero Blemish 3X Spot Correcting Cream', '20 ml', 'numbuzin zero blemish 3x spot correcting cream', { p:15.36, u:'https://www.yesstyle.com/en/numbuzin-zero-blemish-3x-spot-correcting-cream-20ml/info.html/pid.1137994199' }),
 sk('SUNGBOON EDITOR Deep Collagen Power Boosting Cream In Serum', '30 ml', 'sungboon editor deep collagen power boosting cream in serum', { p:16.31, u:'https://www.yesstyle.com/en/sungboon-editor-deep-collagen-power-boosting-cream-in-serum-30ml/info.html/pid.1136792512' }),
 sk('kaine Caffetinal Cream', '50 ml', 'kaine caffetinal cream', null),
 sk('skit B5 Barrier Cream', '80 ml', 'skit b5 barrier cream', { p:22.24, u:'https://www.yesstyle.com/en/skit-b5-barrier-cream-80ml/info.html/pid.1138034611' }),
]},
{ title:'Eye care', tag:'Eyes', note:'for tired mornings', items:[
 sk('haruharu wonder Black Rice Bakuchiol Eye Cream', '20 ml', 'haruharu wonder black rice bakuchiol eye cream', { p:13.61, u:'https://www.yesstyle.com/en/haruharu-wonder-black-rice-bakuchiol-eye-cream-20ml/info.html/pid.1112455824' }),
 sk('medicube PDRN Pink Peptide Eye Cream', '30 ml', 'medicube pdrn pink peptide eye cream', { p:28.68, u:'https://www.yesstyle.com/en/medicube-pdrn-pink-peptide-eye-cream-30ml/info.html/pid.1134047329' }),
 sk('AXIS-Y Vegan Collagen Eye Serum', '10 ml', 'axis-y vegan collagen eye serum', { p:11.54, u:'https://www.yesstyle.com/en/axis-y-vegan-collagen-eye-serum-10ml/info.html/pid.1127471822' }),
 sk('ROUND LAB Birch Juice Moisturizing Eye Balm', '10 g', 'round lab birch juice moisturizing eye balm', { p:12.29, u:'https://www.yesstyle.com/en/round-lab-birch-juice-moisturizing-eye-balm-10g/info.html/pid.1137556653' }),
 sk('MEDIHEAL Collagen Capsule Patch Retinol', '60 patches', 'mediheal collagen capsule patch retinol', { p:null }),
 sk('medicube PDRN Pink Collagen Jelly Eye Mask', '50 pairs', 'medicube pdrn pink collagen jelly eye mask', { p:44.28, u:'https://www.yesstyle.com/en/medicube-pdrn-pink-collagen-jelly-eye-mask-50-pairs-50-pairs/info.html/pid.1137999833' }),
]},
{ title:'Masks and patches', tag:'Treat', note:'my Sunday reset helpers', items:[
 sk('medicube Zero Pore Blackhead Mud Mask', '100 g', 'medicube zero pore blackhead mud mask', { p:24.00, u:'https://www.yesstyle.com/en/medicube-zero-pore-blackhead-mud-mask-100g/info.html/pid.1129746067' }),
 sk('AXIS-Y Mugwort Pore Clarifying Wash Off Pack', '100 ml', 'axis-y mugwort pore clarifying wash off pack', { p:15.60, u:'https://www.yesstyle.com/en/axis-y-mugwort-pore-clarifying-wash-off-pack-100ml/info.html/pid.1092487531' }),
 sk('Dr. Jart+ Cryo Rubber Moisturizing Mask', '', 'dr jart cryo rubber moisturizing mask', { p:13.14, u:'https://www.yesstyle.com/en/dr-jart-cryo-rubber-moisturizing-mask-2024-version-1-set/info.html/pid.1127610514' }),
 sk('Dr. Jart+ Ceramidin Cream-Infused Mask Set', 'Set of 5 masks', 'dr jart ceramidin cream-infused mask set', { p:33.76, u:'https://www.yesstyle.com/en/dr-jart-ceramidin-cream-infused-mask-set-18g-x-5-sheets/info.html/pid.1123469835' }),
 sk('Dr. Jart+ Cryo Rubber Mask with Firming Collagen', '', 'dr jart cryo rubber mask with firming collagen', { p:null }),
 sk('MEDIHEAL Collagen Essential Mask', 'Set of 10 masks', 'mediheal collagen essential mask', { p:23.26, u:'https://www.yesstyle.com/en/mediheal-collagen-essential-mask-set-24ml-x-10-sheets/info.html/pid.1138037597' }),
 sk('numbuzin No.2 Rose PDRN Collagen Plumping Sheet Mask', '1 sheet mask', 'numbuzin no2 rose pdrn collagen plumping sheet mask', { p:5.28, u:'https://www.yesstyle.com/en/numbuzin-no-2-rose-pdrn-collagen-plumping-sheet-mask-33ml-x-1-sheet/info.html/pid.1135064260' }),
 sk('numbuzin No.2 Rose PDRN Overnight Collagen', '1 sheet mask', 'numbuzin no2 rose pdrn overnight collagen', { p:6.76, u:'https://www.yesstyle.com/en/numbuzin-no-2-rose-pdrn-overnight-collagen-mask-37g-x-1-sheet/info.html/pid.1135064257' }),
 sk('SUNGBOON EDITOR Deep Collagen Mask', '1 sheet mask', 'sungboon editor deep collagen mask', { p:7.68, u:'https://www.yesstyle.com/en/sungboon-editor-deep-collagen-mask-4-types-37g-x-1-sheet/info.html/pid.1130390106' }),
 sk('VT Collagen Reedle Shot 100 2Step Hydrogel Mask', '1 sheet mask', 'vt collagen reedle shot 100 2step hydrogel mask', { p:6.00, u:'https://www.yesstyle.com/en/vt-collagen-reedle-shot-100-2step-hydrogel-mask-1-5g-33g-x-1-sheet/info.html/pid.1130342600' }),
 sk('ROUND LAB 1025 Dokdo Hydrating Water Gel Mask', '1 sheet mask', 'round lab 1025 dokdo hydrating water gel mask', { p:3.60, u:'https://www.yesstyle.com/en/round-lab-1025-dokdo-hydrating-water-gel-mask-30ml-x-1-sheet/info.html/pid.1123980124' }),
 sk('ROUND LAB Camellia Deep Collagen Firming Gel Mask', 'Set of 4 masks', 'round lab camellia deep collagen firming gel mask', { p:15.76, u:'https://www.yesstyle.com/en/round-lab-camellia-deep-collagen-firming-gel-mask-set-34g-x-4-sheets/info.html/pid.1132851170' }),
 sk('ROUND LAB Vita Niacinamide Dark Spot Serum Mask', 'Set of 10 masks', 'round lab vita niacinamide dark spot serum mask', { p:19.68, u:'https://www.yesstyle.com/en/round-lab-vita-niacinamide-dark-spot-serum-mask-set-20ml-x-10-sheets/info.html/pid.1129809892' }),
 sk('ROUND LAB Camellia Deep Collagen V Lifting Gel Mask', 'Set of 4 masks', 'round lab camellia deep collagen v lifting gel mask', { p:15.65, u:'https://www.yesstyle.com/en/round-lab-camellia-deep-collagen-v-lifting-gel-mask-set-10g-x-4-sheets/info.html/pid.1137033773' }),
 sk('glow Diamond Drop Blemish Patch', '100 patches', 'glow diamond drop blemish patch', { p:28.80, u:'https://www.yesstyle.com/en/glow-diamond-drop-blemish-patch-100-patches/info.html/pid.1130035760' }),
 sk('skit Lifting & Glow Face Gel Patch', '4 sets', 'skit lifting glow face gel patch', { p:15.60, u:'https://www.yesstyle.com/en/skit-lifting-glow-face-gel-patch-set-4-sets/info.html/pid.1138034621' }),
 sk('skit Calming & Repair Face Gel Patch', '4 sets', 'skit calming repair face gel patch', { p:15.60, u:'https://www.yesstyle.com/en/skit-calming-repair-face-gel-patch-set-4-sets/info.html/pid.1138034619' }),
 sk('skit Hydrating & Moisture Face Gel Patch', '4 sets', 'skit hydrating moisture face gel patch', { p:15.60, u:'https://www.yesstyle.com/en/skit-hydrating-moisture-face-gel-patch-set-4-sets/info.html/pid.1138034617' }),
]},
{ title:'Lip care', tag:'Lips', note:'soft lips all day', items:[
 sk('glow Peach Peptide Lip Balm', '', 'glow peach peptide lip balm', { p:28.80, u:'https://www.yesstyle.com/en/glow-peach-peptide-lip-balm-3-types-palepink/info.html/pid.1127090466' }),
 sk('haruharu wonder Rose PDRN Peptide Glowy Balm', '10 ml', 'haruharu wonder rose pdrn peptide glowy balm', { p:11.66, u:'https://www.yesstyle.com/en/haruharu-wonder-rose-pdrn-peptide-glowy-balm-2026-version-10ml/info.html/pid.1138030930' }),
 sk('LANEIGE Lip Glowy Balm', '', 'laneige lip glowy balm', { p:14.99, u:'https://www.yesstyle.com/en/laneige-lip-glowy-balm-6-types-sweet-candy/info.html/pid.1130299070' }),
 sk('LANEIGE Lip Sleeping Mask Strawberry Shortcake', '20 g', 'laneige lip sleeping mask strawberry shortcake', { p:25.08, u:'https://www.yesstyle.com/en/laneige-lip-sleeping-mask-strawberry-shortcake-20g/info.html/pid.1136320183' }),
 sk('mixsoon Vegan Melting Lip Balm', '', 'mixsoon vegan melting lip balm', { p:8.74, u:'https://www.yesstyle.com/en/mixsoon-vegan-melting-lip-balm-2-types-02-dry-rose/info.html/pid.1118209039' }),
 sk('ROUND LAB Birch Juice Moisturizing Lip Balm', '20 g', 'round lab birch juice moisturizing lip balm', { p:11.90, u:'https://www.yesstyle.com/en/round-lab-birch-juice-moisturizing-lip-balm-20g/info.html/pid.1135216294' }),
]},
);
skincare[0].items.push(
 sk('Beauty of Joseon Matte Sun Stick', '18 g', 'beauty of joseon matte sun stick', { p:14.04, u:'https://www.yesstyle.com/en/beauty-of-joseon-matte-sun-stick-18g/info.html/pid.1119542494' }),
 sk('innisfree Daily UV Invisible Barrier Sun Serum', '50 ml', 'innisfree daily uv invisible barrier sun serum', { p:17.42, u:'https://www.yesstyle.com/en/innisfree-daily-uv-invisible-barrier-sun-serum-50ml/info.html/pid.1134565154' }),
 sk('iUNIK Centella Calming Daily Sun Water', '120 ml', 'iunik centella calming daily sun water', { p:21.00, u:'https://www.yesstyle.com/en/iunik-centella-calming-daily-sun-water-120ml/info.html/pid.1137438871' }),
);

// move my first favourites into the right groups, then drop the old mixed group
const take = (n) => { for (const g of skincare) { const i = g.items.findIndex((x) => x.name === n); if (i >= 0) return g.items.splice(i, 1)[0]; } };
const into = (title, n) => skincare.find((g) => g.title === title).items.unshift(take(n));
into('Cleansers', 'Round Lab Birch Juice Moisturizing Cleanser');
into('Toners, mists and pads', 'Round Lab 1025 Dokdo Toner');
into('Toners, mists and pads', 'Medicube Zero Pore Pad 2.0');
into('Serums, essences and ampoules', 'Axis-Y Dark Spot Correcting Glow Serum');
const bio = skincare.find((g) => g.title === 'Hydrogel masks').items.splice(0);
skincare.find((g) => g.title === 'Masks and patches').items.unshift(...bio);
skincare.splice(0, skincare.length, ...skincare.filter((g) => g.items.length > 0));

// Verified prices: Amazon (by ASIN) and Sephora (product pages), checked Oct 26, 2026
// Photos for skincare cards: name -> file in /public/img/shop
const IMGS = {
  'kaine Kombu Balancing Ampoule Toner': 'kaine-kombu-toner',
  'skit Glutamilk Essence Toner': 'skit-glutamilk-essence-toner',
  'skit Tocopherol 5 Serum': 'skit-tocopherol-5-serum',
  'kaine Caffetinal Cream': 'kaine-caffetinal-cream',
  'skit Hydrating & Moisture Face Gel Patch': 'skit-hydrating-moisture-patch',
  'skit Calming & Repair Face Gel Patch': 'skit-calming-repair-patch',
  'skit Lifting & Glow Face Gel Patch': 'skit-lifting-glow-patch',
  'skit B5 Barrier Cream': 'skit-b5-barrier-cream',
  'ROUND LAB Birch Juice Moisturizing Lip Balm': 'round-lab-birch-lip-balm',
  'mixsoon Vegan Melting Lip Balm': 'mixsoon-vegan-melting-lip-balm',
  'LANEIGE Lip Sleeping Mask Strawberry Shortcake': 'laneige-lip-sleeping-mask-strawberry',
  'LANEIGE Lip Glowy Balm': 'laneige-lip-glowy-balm',
  'haruharu wonder Rose PDRN Peptide Glowy Balm': 'haruharu-rose-pdrn-glowy-balm',
  'glow Peach Peptide Lip Balm': 'glow-peach-peptide-lip-balm',
  'LANEIGE Bouncy & Firm Sleeping Mask': 'laneige-bouncy-firm-mask',
  'LANEIGE Water Sleeping Mask': 'laneige-water-sleeping-mask',
  'glow Diamond Drop Blemish Patch': 'glow-diamond-drop-patch',
  'ROUND LAB Camellia Deep Collagen V Lifting Gel Mask': 'round-lab-camellia-v-lifting-mask',
  'ROUND LAB Vita Niacinamide Dark Spot Serum Mask': 'round-lab-vita-serum-mask',
  'ROUND LAB Camellia Deep Collagen Firming Gel Mask': 'round-lab-camellia-gel-mask',
  'ROUND LAB 1025 Dokdo Hydrating Water Gel Mask': 'round-lab-dokdo-gel-mask',
  'medicube PDRN Pink Collagen Jelly Eye Mask': 'medicube-pdrn-jelly-eye-mask',
  'VT Collagen Reedle Shot 100 2Step Hydrogel Mask': 'vt-collagen-reedle-hydrogel-mask',
  'SUNGBOON EDITOR Deep Collagen Mask': 'sungboon-deep-collagen-mask',
  'numbuzin No.2 Rose PDRN Overnight Collagen': 'numbuzin-no2-overnight-mask',
  'numbuzin No.2 Rose PDRN Collagen Plumping Sheet Mask': 'numbuzin-no2-rose-sheet-mask',
  'MEDIHEAL Collagen Capsule Patch Retinol': 'mediheal-collagen-capsule-patch',
  'MEDIHEAL Collagen Essential Mask': 'mediheal-collagen-essential-mask',
  'Dr. Jart+ Cryo Rubber Mask with Firming Collagen': 'drjart-cryo-rubber-firming',
  'Dr. Jart+ Ceramidin Cream-Infused Mask Set': 'drjart-ceramidin-cream-mask',
  'Dr. Jart+ Cryo Rubber Moisturizing Mask': 'drjart-cryo-rubber-moisturizing',
  'AXIS-Y Mugwort Pore Clarifying Wash Off Pack': 'axis-y-mugwort-wash-off-pack',
  'medicube Zero Pore Blackhead Mud Mask': 'medicube-zero-pore-mud-mask',
  'ROUND LAB Birch Juice Moisturizing Eye Balm': 'round-lab-birch-eye-balm',
  'AXIS-Y Vegan Collagen Eye Serum': 'axis-y-vegan-collagen-eye-serum',
  'medicube PDRN Pink Peptide Eye Cream': 'medicube-pdrn-peptide-eye-cream',
  'haruharu wonder Black Rice Bakuchiol Eye Cream': 'haruharu-bakuchiol-eye-cream',
  'SUNGBOON EDITOR Deep Collagen Power Boosting Cream In Serum': 'sungboon-power-boosting-serum',
  'numbuzin Zero Blemish 3X Spot Correcting Cream': 'numbuzin-3x-spot-cream',
  'ROUND LAB Vita Niacinamide Glow Capsule Cream': 'round-lab-vita-glow-capsule-cream',
  'ROUND LAB Pine Calming Cica Cream Plus': 'round-lab-pine-cica-cream',
  'ROUND LAB Soybean Panthenol Cream': 'round-lab-soybean-cream',
  'ROUND LAB Camellia Deep Collagen Firming Cream': 'round-lab-camellia-firming-cream',
  'ROUND LAB Birch Juice Moisturizing Cream': 'round-lab-birch-cream',
  'LANEIGE Water Bank Blue Hyaluronic Moisture Cream': 'laneige-water-bank-cream',
  'iUNIK Centella Relief Sorbet Cream': 'iunik-centella-sorbet-cream',
  'iUNIK Beta-Glucan 3X Barrier Cream': 'iunik-beta-glucan-3x-cream',
  'House of Hur Phyto Brew Matcha Dual Cream and Gel': 'hoh-phyto-brew-matcha-cream',
  'Dear, Klairs Midnight Blue Clearing Water Cream': 'klairs-midnight-blue-water-cream',
  'AXIS-Y TXA 2.5% Intensive Brightening Cream': 'axis-y-txa-brightening-cream',
  'AXIS-Y Dark Spot Correcting Glow Cream': 'axis-y-dark-spot-cream',
  'medicube Collagen Jelly Cream': 'medicube-collagen-jelly-cream',
  'medicube Deep Vita C Capsule Cream': 'medicube-deep-vita-c-cream',
  'TIRTIR Matcha Calming Cream': 'tirtir-matcha-calming-cream',
  'glow Aloe Barrier Support Moisturizer': 'glow-aloe-barrier-moisturizer',
  'haruharu wonder Black Rice 5 Ceramide Barrier Moisturizing Cream': 'haruharu-5-ceramide-cream',
  'SKIN1004 Madagascar Centella Probio-Cica Enrich Cream': 'skin1004-probio-cica-cream',
  'SKIN1004 Madagascar Centella Poremizing Light Gel Cream': 'skin1004-poremizing-gel-cream',
  'VT PDRN Essence 100': 'vt-pdrn-essence-100',
  'VT Reedle Shot 100': 'vt-reedle-shot-100',
  'ROUND LAB Camellia Deep Collagen Firming Ampoule': 'round-lab-camellia-firming-ampoule',
  'ROUND LAB Pine Calming Cica Ampoule': 'round-lab-pine-cica-ampoule',
  'ROUND LAB Vita Niacinamide Dark Spot Serum': 'round-lab-vita-niacinamide-serum',
  'mixsoon Glacier Water Hyaluronic Acid Serum Jumbo': 'mixsoon-glacier-water-serum',
  'mixsoon Bean Essence': 'mixsoon-bean-essence',
  'ma:nyo Bifida Biome Complex Ampoule': 'manyo-bifida-biome-ampoule',
  'LANEIGE Water Bank Blue Hyaluronic Serum': 'laneige-water-bank-serum',
  'iUNIK Beta-Glucan Lacto Barrier Milk Essence': 'iunik-beta-glucan-lacto-essence',
  'iUNIK Beta-Glucan Power Moisture Serum': 'iunik-beta-glucan-power-serum',
  'innisfree Green Tea Ceramide Milk Barrier Essence': 'innisfree-green-tea-ceramide-essence',
  'Huxley Oil Essence Essence Like Oil Like': 'huxley-oil-essence',
  'Dear, Klairs Midnight Blue Youth Activating Drop': 'klairs-midnight-blue-drop',
  'AXIS-Y Artichoke Intensive Skin Barrier Ampoule': 'axis-y-artichoke-ampoule',
  'TIRTIR Matcha Dual Serum': 'tirtir-matcha-dual-serum',
  'haruharu wonder Rose PDRN Soothing Serum': 'haruharu-rose-pdrn-serum',
  'haruharu wonder Black Rice Probiotics Barrier Essence': 'haruharu-barrier-essence',
  'WHIPPED Mugwort Tea Tree Vegan Whipping Bubble Serum': 'whipped-mugwort-bubble-serum',
  'SUNGBOON EDITOR Deep Collagen Barrier Serum Mist': 'sungboon-barrier-serum-mist',
  'SKINFOOD Carrot Carotene Calming Water Pad': 'skinfood-carrot-pad',
  'ROUND LAB Soybean Panthenol Toner': 'round-lab-soybean-toner',
  'ROUND LAB Birch Juice Moisturizing Pad': 'round-lab-birch-pad',
  'numbuzin Zero Blemish Azela Cica Balancing Dual Pads': 'numbuzin-azela-cica-pads',
  'LANEIGE Cream Skin Cerapeptide Refiner': 'laneige-cream-skin-refiner',
  'Dear, Klairs Blue EGF Calming Mist': 'klairs-blue-egf-mist',
  'AXIS-Y Dark Spot Correcting Glow Toner': 'axis-y-dark-spot-toner',
  'AXIS-Y Triple PDRN Gel Toner': 'axis-y-triple-pdrn-toner',
  'Beauty of Joseon Green Plum Refreshing Toner: AHA + BHA': 'boj-green-plum-toner',
  'medicube PDRN Pink Collagen Glow Jelly Mist Serum': 'medicube-pdrn-glow-jelly-mist',
  'medicube PDRN Pink Niacinamide Milky Toner': 'medicube-pdrn-niacinamide-toner',
  'medicube Hypochlorous Acid Daily Facial Spray': 'medicube-hypochlorous-spray',
  'SKIN1004 Madagascar Centella Quick Calming Pad': 'skin1004-quick-calming-pad',
  'haruharu wonder Black Rice Probiotics Barrier 2% NAD+ Serum Mist': 'haruharu-nad-serum-mist',
  'glow Clean & Polished Lemon Vitamin Toner': 'glow-lemon-vitamin-toner',
  'glow EGF Serum Mist': 'glow-egf-serum-mist',
  'WHIPPED Muhwabutter Vegan Milk Foam Pack Mist': 'whipped-muhwabutter-pack-mist',
  'ROUND LAB Camellia Deep Collagen Jelly Mask Cleanser': 'round-lab-camellia-jelly-cleanser',
  'ROUND LAB Pine Calming Cica Cleanser': 'round-lab-pine-cica-cleanser',
  'numbuzin Zero Blemish Oil-Free Micellar Cleansing Jelly': 'numbuzin-zero-blemish-cleansing-jelly',
  'ma:nyo Herbgreen Cleansing Oil': 'manyo-herbgreen-cleansing-oil',
  'iUNIK Beta-Glucan Barrier Ampoule Cleanser': 'iunik-beta-glucan-ampoule-cleanser',
  'Huxley Cleansing Gel Be Clean Be Moist': 'huxley-cleansing-gel',
  'TIRTIR Milk Creamy Foam Cleanser': 'tirtir-milk-creamy-foam-cleanser',
  'glow Guava Facial Cleanser': 'glow-guava-facial-cleanser',
  'WHIPPED Mugtree Vegan Cookie Clay Pack Cleanser': 'whipped-mugtree-clay-cleanser',
  'WHIPPED Vegan Pack Cleanser DDalva': 'whipped-ddalva-pack-cleanser',
  'iUNIK Centella Calming Daily Sun Water': 'iunik-centella-daily-sun-water',
  'innisfree Daily UV Invisible Barrier Sun Serum': 'innisfree-daily-uv-sun-serum',
  'Beauty of Joseon Matte Sun Stick': 'boj-matte-sun-stick',
};
for (const g of skincare) for (const it of g.items) if (IMGS[it.name]) it.img = '/img/shop/' + IMGS[it.name] + '.webp';

const AMZ = {"Round Lab Birch Juice Moisturizing Sun Serum": [24.52, "B0GXF8YXXV"], "Round Lab Birch Juice Moisturizing Sun Stick": [17.79, "B0F2HL5XPT"], "Round Lab Camellia Deep Collagen Firming Sun Serum": [28, "B0GF3XH95Y"], "Beauty of Joseon Relief Sun: Rice + Probiotics": [17.99, "B0FXBR5T6R"], "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum": [15.3, "B0GZKFT521"], "Round Lab Birch Juice Moisturizing Cleanser": [15.29, "B093W78YWZ"], "glow Guava Facial Cleanser": [31, "B0CVL4Z94B"], "Huxley Cleansing Gel Be Clean Be Moist": [20, "B06XTMF4XQ"], "iUNIK Beta-Glucan Barrier Ampoule Cleanser": [20.9, "B0H82S13G7"], "Medicube Zero Pore Pad 2.0": [18.9, "B0CW1KV8B6"], "Round Lab 1025 Dokdo Toner": [14.59, "B08FM5BTF6"], "SKIN1004 Madagascar Centella Quick Calming Pad": [17.5, "B09NNBKF15"], "medicube PDRN Pink Niacinamide Milky Toner": [18.3, "B0FT8MB86T"], "Beauty of Joseon Green Plum Refreshing Toner: AHA + BHA": [18, "B0DJDC71XL"], "AXIS-Y Triple PDRN Gel Toner": [24.99, "B0G33JLFNK"], "AXIS-Y Dark Spot Correcting Glow Toner": [17.99, "B0DDPGRMRH"], "ROUND LAB Birch Juice Moisturizing Pad": [17.99, "B093ZGW6PR"], "SUNGBOON EDITOR Deep Collagen Barrier Serum Mist": [18.2, "B0CJF85J67"], "Axis-Y Dark Spot Correcting Glow Serum": [11.99, "B091238V7N"], "AXIS-Y Artichoke Intensive Skin Barrier Ampoule": [17.99, "B08Z7Z1FH6"], "iUNIK Beta-Glucan Power Moisture Serum": [19.17, "B07NNVZNQR"], "LANEIGE Water Bank Blue Hyaluronic Serum": [45, "B09WZT6H8Q"], "ROUND LAB Vita Niacinamide Dark Spot Serum": [26.99, "B0DRP5P6LZ"], "ROUND LAB Pine Calming Cica Ampoule": [18.99, "B0BYMCTP2H"], "ROUND LAB Camellia Deep Collagen Firming Ampoule": [20.5, "B0DTP5HMF3"], "medicube Collagen Jelly Cream": [19.98, "B0CM2PPNMW"], "AXIS-Y Dark Spot Correcting Glow Cream": [17.99, "B0DKSHYVNQ"], "iUNIK Beta-Glucan 3X Barrier Cream": [15.99, "B0DSBTDC72"], "iUNIK Centella Relief Sorbet Cream": [15.99, "B0GH6VJYRY"], "ROUND LAB Birch Juice Moisturizing Cream": [23.99, "B081VS3F27"], "ROUND LAB Camellia Deep Collagen Firming Cream": [22, "B0DTP87RC6"], "ROUND LAB Soybean Panthenol Cream": [26.64, "B0DPW4LKDS"], "ROUND LAB Pine Calming Cica Cream Plus": [19.59, "B0BYMKJJMY"], "numbuzin Zero Blemish 3X Spot Correcting Cream": [12, "B0HF4868LH"], "AXIS-Y Vegan Collagen Eye Serum": [15.43, "B0CWPCX1D2"], "medicube Zero Pore Blackhead Mud Mask": [18.9, "B0D1G7XF9X"], "AXIS-Y Mugwort Pore Clarifying Wash Off Pack": [14.99, "B0912BD42B"], "ROUND LAB Camellia Deep Collagen V Lifting Gel Mask": [20.95, "B0F1G3FCGY"], "LANEIGE Water Sleeping Mask": [33, "B0F7ZJQP4K"], "LANEIGE Bouncy & Firm Sleeping Mask": [36, "B0CZ7MXPG8"], "ROUND LAB Pine Calming Cica Cleanser": [13.5, "B0DTH8C6DG"], "medicube PDRN Pink Collagen Glow Jelly Mist Serum": [19.8, "B0FPPKK2Z5"], "WHIPPED Mugwort Tea Tree Vegan Whipping Bubble Serum": [33, "B0GXV6JX4R"], "haruharu wonder Rose PDRN Soothing Serum": [19.99, "B0FXX2JZLS"], "VT Reedle Shot 100": [23.5, "B0C2TQ24VY"]};
const SEP = {"LANEIGE Cream Skin Cerapeptide Refiner": [36, "https://www.sephora.com/product/cream-skin-refillable-toner-moisturizer-with-ceramides-peptides-P505897"], "LANEIGE Water Bank Blue Hyaluronic Serum": [45, "https://www.sephora.com/product/laneige-water-bank-blue-hyaluronic-serum-P482692"], "LANEIGE Water Bank Blue Hyaluronic Moisture Cream": [32, "https://www.sephora.com/product/laneige-water-bank-blue-hyaluronic-cream-moisturizer-P482693"], "LANEIGE Water Sleeping Mask": [33, "https://www.sephora.com/product/water-sleeping-mask-reform-repack-P518721"], "LANEIGE Bouncy & Firm Sleeping Mask": [36, "https://www.sephora.com/product/laneige-bouncy-firm-radiance-boosting-sleeping-mask-P510369"], "LANEIGE Lip Glowy Balm": [19, "https://www.sephora.com/product/glowy-lip-balm-P443563"], "LANEIGE Lip Sleeping Mask Strawberry Shortcake": [24, "https://www.sephora.com/product/lip-sleeping-mask-P420652"], "Dr. Jart+ Cryo Rubber Moisturizing Mask": [16.5, "https://www.sephora.com/product/cryo-rubber-mask-moisturizing-P520342"], "Beauty of Joseon Green Plum Refreshing Toner: AHA + BHA": [18, "https://www.sephora.com/product/green-plum-refreshing-toner-P517632"], "innisfree Daily UV Invisible Barrier Sun Serum": [20, "https://www.sephora.com/product/daily-uv-invisible-barrier-sunscreen-serum-broad-spectrum-spf-47-with-green-tea-P525110"]};
// Ulta Beauty prices checked on ulta.com (Nov 2026): name -> [price, product URL]
const ULTA = {"Round Lab Birch Juice Moisturizing Sunscreen": [24.99, "https://www.ulta.com/p/birch-juice-moisturizing-uvlock-spf-45-pimprod2049647"], "Round Lab Birch Juice Mild-Up Sunscreen": [24.99, "https://www.ulta.com/p/birch-juice-mild-up-uvlock-spf-50-pimprod2049648"], "Round Lab Birch Juice Moisturizing Sun Stick": [24.99, "https://www.ulta.com/p/birch-juice-moisturizing-uvlock-sun-stick-spf-50-pimprod2052318"], "Round Lab Birch Juice Moisturizing Cleanser": [17.0, "https://www.ulta.com/p/birch-juice-moisturizing-cleanser-pimprod2049655"], "ROUND LAB Pine Calming Cica Cleanser": [17.0, "https://www.ulta.com/p/pine-calming-cica-cleanser-pimprod2053772"], "Round Lab 1025 Dokdo Toner": [16.99, "https://www.ulta.com/p/1025-dokdo-toner-pimprod2052236"], "ROUND LAB Birch Juice Moisturizing Pad": [28.0, "https://www.ulta.com/p/birch-juice-moisturizing-pad-pimprod2049656"], "ROUND LAB Pine Calming Cica Ampoule": [27.0, "https://www.ulta.com/p/pine-calming-cica-ampoule-pimprod2053769"], "ROUND LAB Birch Juice Moisturizing Cream": [29.99, "https://www.ulta.com/p/birch-juice-moisturizing-cream-pimprod2049659"], "ROUND LAB Vita Niacinamide Glow Capsule Cream": [28.0, "https://www.ulta.com/p/vita-niacinamide-glow-capsule-cream-pimprod2059347"], "medicube PDRN Pink Niacinamide Milky Toner": [21.0, "https://www.ulta.com/p/pdrn-pink-niacinamide-milky-toner-pimprod2053544"], "medicube Zero Pore Blackhead Mud Mask": [18.9, "https://www.ulta.com/p/zero-pore-blackhead-mud-mask-pimprod2056604"], "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum": [26.0, "https://www.ulta.com/p/madagascar-centella-hyalu-cica-water-fit-sun-serum-uv-spf50-pimprod2055614"], "SKIN1004 Madagascar Centella Poremizing Light Gel Cream": [26.0, "https://www.ulta.com/p/madagascar-centella-poremizing-light-gel-cream-pimprod2045886"], "SKIN1004 Madagascar Centella Probio-Cica Enrich Cream": [30.0, "https://www.ulta.com/p/madagascar-centella-probio-cica-enrich-cream-pimprod2053572"], "SKIN1004 Madagascar Centella Quick Calming Pad": [25.0, "https://www.ulta.com/p/madagascar-centella-quick-calming-pad-pimprod2053560"], "medicube Deep Vita C Capsule Cream": [22.0, "https://www.ulta.com/p/deep-vita-c-capsule-cream-pimprod2053652"], "medicube Hypochlorous Acid Daily Facial Spray": [23.9, "https://www.ulta.com/p/hypochlorous-acid-daily-facial-spray-pimprod2054914"], "AXIS-Y Triple PDRN Gel Toner": [25.0, "https://www.ulta.com/p/triple-pdrn-gel-toner-pimprod2061896"], "AXIS-Y Dark Spot Correcting Glow Toner": [24.0, "https://www.ulta.com/p/dark-spot-correcting-glow-toner-pimprod2061900"], "Axis-Y Dark Spot Correcting Glow Serum": [17.99, "https://www.ulta.com/p/dark-spot-correcting-glow-serum-pimprod2061895"], "AXIS-Y Artichoke Intensive Skin Barrier Ampoule": [27.5, "https://www.ulta.com/p/artichoke-intensive-skin-barrier-ampoule-pimprod2061899"], "AXIS-Y Vegan Collagen Eye Serum": [17.99, "https://www.ulta.com/p/vegan-collagen-eye-serum-pimprod2061897"], "AXIS-Y Mugwort Pore Clarifying Wash Off Pack": [24.0, "https://www.ulta.com/p/mugwort-pore-clarifying-wash-off-pack-pimprod2061901"], "TIRTIR Matcha Dual Serum": [29.0, "https://www.ulta.com/p/matcha-pdrn-dual-serum-pimprod2058172"], "TIRTIR Matcha Calming Cream": [25.0, "https://www.ulta.com/p/matcha-pdrn-calming-cream-pimprod2055952"], "mixsoon Bean Essence": [21.0, "https://www.ulta.com/p/bean-essence-brightening-hydrator-pimprod2052505"], "MEDIHEAL Collagen Essential Mask": [8.8, "https://www.ulta.com/p/collagen-essential-mask-pimprod2052786"], "VT Reedle Shot 100": [26.0, "https://www.ulta.com/p/reedle-shot-100-pimprod2051958"], "VT PDRN Essence 100": [28.0, "https://www.ulta.com/p/pdrn-essence-100-pimprod2051957"], "ma:nyo Bifida Biome Complex Ampoule": [23.0, "https://www.ulta.com/p/bifida-biome-complex-ampoule-pimprod2045871"], "kaine Kombu Balancing Ampoule Toner": [24.0, "https://www.ulta.com/p/kombu-balancing-ampoule-toner-mkt77008678"], "kaine Caffetinal Cream": [37.0, "https://www.ulta.com/p/caffetinal-cream-mkt77008673"]};
const NOSEP = ['Beauty of Joseon Relief Sun: Rice + Probiotics', 'Beauty of Joseon Relief Sun Aqua-Fresh: Rice + B5', 'Beauty of Joseon Matte Sun Stick'];
for (const g of skincare) for (const it of g.items) {
  const a = AMZ[it.name], s = SEP[it.name];
  if (a) { const r = it.rows.find((x) => x.shop === 'Amazon'); r.p = a[0]; r.u = dp(a[1]); }
  if (s) { const r = it.rows.find((x) => x.shop === 'Sephora'); if (r) { r.p = s[0]; r.u = s[1]; r.note = undefined; } }
  const ul = ULTA[it.name];
  if (ul) { const r = it.rows.find((x) => x.shop === 'Ulta Beauty'); if (r) { r.p = ul[0]; r.u = ul[1]; r.note = undefined; } }
  // Not sold at Sephora (checked Nov 2026): point to Ulta instead
  if (NOSEP.includes(it.name)) { const r = it.rows.find((x) => x.shop === 'Sephora'); if (r) { r.shop = 'Ulta Beauty'; r.u = 'https://www.ulta.com/search?search=' + encodeURIComponent(it.name); } }
}

// ---- Hair & body care ----
// PRICES: fill in as found. y = YesStyle, o = Olive Young Global, a = Amazon (null = "check price").
const PR = {
  'Gisou Hair & Body Mist Honey Dewy': { a:29, au:dp('B0H1X9544P'), g:29, gu:'https://gisou.com/products/honey-infused-hair-body-mist', s:29, su:'https://www.sephora.com/product/honey-dewy-honey-infused-hair-and-body-mist-P525103' },
  'Gisou Honey Gloss Ceramide Therapy Hydrating Shampoo': { a:26.96, au:dp('B0FKZ8H9VX'), g:27, gu:'https://gisou.com/products/honey-gloss-ceramide-therapy-hydrating-shampoo', s:27, su:'https://www.sephora.com/product/honey-gloss-ceramide-therapy-hydrating-shampoo-P516617' },
  'Gisou Honey Milk 5-in-1 Styling Cream': { a:29, au:dp('B0FP73C9YB'), g:29, gu:'https://gisou.com/products/honey-milk-5-in-1-styling-cream', s:29, su:'https://www.sephora.com/product/honey-milk-5-in-1-styling-cream-P517861' },
  'Anillo Lime Sunday Shampoo': { a:26.8, au:dp('B0BML2LXBL'), y:30.55, yu:'https://www.yesstyle.com/en/anillo-lime-sunday-refresh-shampoo-450ml/info.html/pid.1131983062' },
  'Anillo Rosy Night Shampoo': { a:26.8, au:dp('B0BHVHKK9B'), y:30.55, yu:'https://www.yesstyle.com/en/anillo-rosy-night-repair-shampoo-450ml/info.html/pid.1131983070' },
  'Knock Mellow Body Wash Caramelt': { a:23, au:dp('B0H4YZBCGS'), y:34.02, yu:'https://www.yesstyle.com/en/knock-mellow-body-wash-caramelt-300ml/info.html/pid.1137968104' },
  'Knock Sandy Scrub Wash': { a:23, au:dp('B0H93VD28B'), y:34.02, yu:'https://www.yesstyle.com/en/knock-sandy-scrub-wash-sea-salt-300ml/info.html/pid.1137968106' },
  'Knock Signature Blending Oil Caramelt': { a:16, au:dp('B0GY8Z2M29'), y:19.38, yu:'https://www.yesstyle.com/en/knock-signature-blending-oil-caramelt-13ml/info.html/pid.1137968110' },
  'Rituals Body Lotion Mousse The Ritual of Sakura': { a:22.48, au:dp('B0GQJ71Z3R') },
  'Rituals Foaming Shower Gel The Ritual of Karma': { a:26.91, au:dp('B07XP67L2P'), r:17, ru:'https://www.rituals.com/en-us/the-ritual-of-karma-foaming-shower-gel-1120249.html' },
  'Rituals Salt Body Scrub The Ritual of Jing': { a:29.84, au:dp('B08SC1RMQR'), r:26, ru:'https://www.rituals.com/en-us/the-ritual-of-jing-body-scrub-300g-1119961.html' },
  'Whipped Vegan Juicy Hair Keratin Perfume Muhwabutter': { y:19.0, yu:'https://www.yesstyle.com/en/whipped-vegan-juicy-hair-keratin-perfume-2-types-muhwabutter/info.html/pid.1136646819' },
  'Narka Fresh Cooling Matcha-PDRN Pack Shampoo': { y:28.9, yu:'https://www.yesstyle.com/en/narka-fresh-cooling-matcha-pdrn-pack-shampoo-500g/info.html/pid.1138001656' },
  'Narka Fresh Veil Hair Sebum Mist': { y:17.33, yu:'https://www.yesstyle.com/en/narka-fresh-veil-hair-sebum-mist-80ml/info.html/pid.1137965323' },
  'Anillo Dark Biome Shampoo': { y:40.9, yu:'https://www.yesstyle.com/en/anillo-dark-beer-biome-shampoo-500ml/info.html/pid.1132940983' },
  'Anillo Lime Sunday Hair Conditioner': { y:23.64, yu:'https://www.yesstyle.com/en/anillo-lime-sunday-refresh-hair-conditioner-150ml/info.html/pid.1131983056' },
  'Anillo Dark Beer Biome Treatment': { y:37.26, yu:'https://www.yesstyle.com/en/anillo-dark-beer-biome-treatment-500ml/info.html/pid.1132940982' },
  'Anillo Rosy Night Ampoule Treatment': { y:28.5, yu:'https://www.yesstyle.com/en/anillo-rosy-night-repair-ampoule-treatment-200ml/info.html/pid.1131983068' },
  'Anillo Rosy Night Essence': { y:20.41, yu:'https://www.yesstyle.com/en/anillo-rosy-night-repair-hair-essence-50ml/info.html/pid.1131983066' },
  'Anillo Lime Sunday Essence': { y:19.33, yu:'https://www.yesstyle.com/en/anillo-lime-sunday-refresh-hair-essence-50ml/info.html/pid.1131983054' },
  'Anillo Dark Beer Scalp Foam Ampoule': { y:36.12, yu:'https://www.yesstyle.com/en/anillo-dark-beer-biome-scalp-foam-ampoule-95ml/info.html/pid.1137959504' },
  'Knock Seoul Vanilla Body Toner': { y:38.3, yu:'https://www.yesstyle.com/en/knock-melt-in-body-toner-seoul-vanilla-300ml/info.html/pid.1137968116' },
  'Knock Softy Hand Cream Zesty': { y:15.17, yu:'https://www.yesstyle.com/en/knock-softy-hand-cream-3-types-pistachio/info.html/pid.1137992580' },
  'Gisou Hair & Body Mist Glazed Cherry': { g:29, gu:'https://gisou.com/products/honey-infused-hair-body-mist', s:29, su:'https://www.sephora.com/product/honey-infused-hair-body-mist-glazed-cherry-P525070' },
};
const sh = (q) => 'https://www.sephora.com/search?keyword=' + encodeURIComponent(q);
const hb = (name, sub, q, extra = {}) => { const x = PR[name] || {}; return item({ name, sub, q, us:false, ...extra,
  y:{ p: x.y ?? null, u: x.yu }, o:{ p: x.o ?? null }, a:{ p: x.a ?? null, u: x.au } }); };
const gisou = (name, sub, q, img) => { const x = PR[name] || {}; return custom({ name, sub, img, rows:[
  { shop:'Gisou', p: x.g ?? null, u: x.gu || 'https://www.gisou.com/search?q=' + encodeURIComponent(q) },
  { shop:'Sephora', p: x.s ?? null, u: x.su || sh(q) },
  { shop:'Amazon', p: x.a ?? null, u: x.au || am(q) } ] }); };
const rituals = (name, sub, q, img) => { const x = PR[name] || {}; return custom({ name, sub, img, rows:[
  { shop:'Rituals', p: x.r ?? null, u: x.ru || 'https://www.rituals.com/en-us/body' },
  { shop:'Amazon', p: x.a ?? null, u: x.au || am(q) } ] }); };

const hairBody = [
{ title:'Hair and body mists', tag:'Scent', note:'the ones that smell like a treat', items:[
 gisou('Gisou Hair & Body Mist Glazed Cherry', 'Hair and body mist, 100 ml', 'gisou hair and body mist glazed cherry', '/img/shop/gisou-glazed-cherry-mist.webp'),
 gisou('Gisou Hair & Body Mist Honey Dewy', 'Hair and body mist, 100 ml', 'gisou hair and body mist honey dewy', '/img/shop/gisou-honey-dewy-mist.webp'),
 hb('Whipped Vegan Juicy Hair Keratin Perfume Muhwabutter', 'Hair perfume', 'whipped vegan juicy hair keratin perfume muhwabutter', { img:'/img/shop/whipped-muhwabutter.webp' }),
 { ...sk('medicube Vanilla Hair Body Fragrance Mist', 'Hair and body mist, 250 ml', 'medicube vanilla hair body fragrance mist', { p:31.08, u:'https://www.yesstyle.com/en/medicube-vanilla-hair-body-fragrance-mist-250ml/info.html/pid.1137981222' }), img:'/img/shop/medicube-vanilla-mist.webp' },
 custom({ name:'Tamburins Hair Perfume White Darjeeling', sub:'Hair perfume, 80 ml. I bought mine in Seoul', img:'/img/shop/tamburins-white-darjeeling-hair-perfume.webp', rows:[
  { shop:'Tamburins', p:null, note:'official site, from ₩48,000', u:'https://www.tamburins.com/en/item/12002319/' } ] }),
]},
{ title:'Shampoo, conditioner and styling', tag:'Hair', note:'my hair day essentials', items:[
 gisou('Gisou Honey Gloss Ceramide Therapy Hydrating Shampoo', '250 ml', 'gisou honey gloss ceramide therapy hydrating shampoo', '/img/shop/gisou-honey-gloss-shampoo.webp'),
 gisou('Gisou Honey Milk 5-in-1 Styling Cream', 'Styling cream', 'gisou honey milk 5-in-1 styling cream', '/img/shop/gisou-honey-milk-cream.webp'),
 hb('Narka Fresh Cooling Matcha-PDRN Pack Shampoo', 'Cooling shampoo', 'narka fresh cooling matcha pdrn pack shampoo', { img:'/img/shop/narka-matcha-shampoo.webp' }),
 hb('Narka Fresh Veil Hair Sebum Mist', 'Hair mist', 'narka fresh veil hair sebum mist', { img:'/img/shop/narka-veil-mist.webp' }),
 hb('Anillo Lime Sunday Shampoo', 'Shampoo', 'anillo lime sunday shampoo', { img:'/img/shop/anillo-lime-sunday-shampoo.webp' }),
 hb('Anillo Rosy Night Shampoo', 'Shampoo', 'anillo rosy night shampoo', { img:'/img/shop/anillo-rosy-night-shampoo.webp' }),
 hb('Anillo Dark Biome Shampoo', 'Shampoo', 'anillo dark biome shampoo', { img:'/img/shop/anillo-dark-biome-shampoo.webp' }),
 hb('Anillo Lime Sunday Hair Conditioner', 'Conditioner', 'anillo lime sunday hair conditioner', { img:'/img/shop/anillo-lime-conditioner.webp' }),
]},
{ title:'Scalp and hair treatments', tag:'Treat', note:'little extras for healthy hair', items:[
 hb('Anillo Dark Beer Biome Treatment', 'Hair treatment', 'anillo dark beer biome treatment', { img:'/img/shop/anillo-dark-beer-treatment.webp' }),
 hb('Anillo Rosy Night Ampoule Treatment', 'Ampoule treatment', 'anillo rosy night ampoule treatment', { img:'/img/shop/anillo-rosy-ampoule-treatment.webp' }),
 hb('Anillo Rosy Night Essence', 'Hair essence', 'anillo rosy night essence', { img:'/img/shop/anillo-rosy-essence.webp' }),
 hb('Anillo Lime Sunday Essence', 'Hair essence', 'anillo lime sunday essence', { img:'/img/shop/anillo-lime-essence.webp' }),
 hb('Anillo Dark Beer Scalp Foam Ampoule', 'Scalp foam ampoule', 'anillo dark beer scalp foam ampoule', { img:'/img/shop/anillo-dark-beer-foam.webp' }),
 hb('Anillo Sky Blue Hair Clip', 'Hair clip', 'anillo sky blue hair clip', { img:'/img/shop/anillo-sky-blue-clip.webp' }),
]},
{ title:'Body care', tag:'Body', note:'cozy scents for shower time', items:[
 hb('Knock Seoul Vanilla Body Toner', 'Body toner', 'knock seoul vanilla body toner', { img:'/img/shop/knock-vanilla-body-toner.webp' }),
 hb('Knock Mellow Body Wash Caramelt', 'Body wash', 'knock mellow body wash caramelt', { img:'/img/shop/knock-mellow-body-wash.webp' }),
 hb('Knock Sandy Scrub Wash', 'Body scrub wash', 'knock sandy scrub wash', { img:'/img/shop/knock-sandy-scrub-wash.webp' }),
 hb('Knock Signature Blending Oil Caramelt', 'Blending oil', 'knock signature blending oil caramelt', { img:'/img/shop/knock-blending-oil.webp' }),
 hb('Knock Softy Hand Cream Zesty', 'Hand cream', 'knock softy hand cream zesty', { img:'/img/shop/knock-softy-hand-cream.webp' }),
 rituals('Rituals Body Lotion Mousse The Ritual of Sakura', 'Body lotion mousse', 'rituals body lotion mousse ritual of sakura', '/img/shop/rituals-sakura-mousse.webp'),
 rituals('Rituals Foaming Shower Gel The Ritual of Karma', 'Foaming shower gel', 'rituals foaming shower gel ritual of karma', '/img/shop/rituals-karma-shower-gel.webp'),
 rituals('Rituals Salt Body Scrub The Ritual of Jing', 'Salt body scrub', 'rituals salt body scrub ritual of jing', '/img/shop/rituals-jing-salt-scrub.webp'),
]},
];


// ---- makeup (YesStyle / Ulta / Amazon search links; prices to be filled when the exact listing is confirmed)
const mk = (name, sub, q, a = {}, y = {}) => item({ name, sub, q, y:{ p:null, ...y }, o:{ p:null }, a:{ p:null, ...a } });
const makeup = [
{ title:'Base and concealers', tag:'Base', note:'cushions, BB cream, concealers and primers', items:[
 mk('hince Cover Master Pink Cushion', '21 Pure Ivory, Odd Spring edition', 'hince cover master pink cushion 21 pure ivory', { p:25, u:dp('B0FW4K17W4'), note:'price may vary by shade' }, { p:21.25 }),
 mk('TIRTIR Mask Fit Red Cushion', '17W French Vanilla', 'tirtir mask fit red cushion 17w french vanilla', {}, { p:15 }),
 mk('fwee Cushion Glass', '02 Natural, Nude Glass', 'fwee cushion glass natural 02 nude glass', {}, { p:18.2 }),
 mk('LANEIGE Neo Cushion Matte', '', 'laneige neo cushion matte', {}, { p:30 }),
 mk('parnell Glacial Biome Water No-Sebum Cushion', '', 'parnell glacial biome water no-sebum cushion', {}, { p:11.02 }),
 mk('MISSHA Perfect Cover BB Cream EX', 'No. 21', 'missha perfect cover bb cream ex no.21', { p:14.90, u:dp('B002B9DWBC') }, { p:14.9, u:'https://www.yesstyle.com/en/missha-m-perfect-cover-bb-cream-spf42-pa-7-colors/info.html/pid.1048964957' }),
 mk('glow Not Dry Concealer Pale and Blush Beige', 'Dual-ended', 'glow not dry concealer dual-ended pale blush beige', {}, { p:34.8 }),
 mk('glow Not Dry Concealer Pink and White', 'Dual-ended', 'glow not dry concealer dual-ended pink white', {}, { p:34.8 }),
 mk('unleashia Bye Bye My Blemish Concealer', '1.0', 'unleashia bye bye my blemish concealer 1.0'),
 mk('TIRTIR Reflect Glow Prep Primer', '', 'tirtir reflect glow prep primer', {}, { p:16.5, u:'https://www.yesstyle.com/en/tirtir-prep-primer-2-types-reflect-glow/info.html/pid.1137677017' }),
 mk('hince Pore-Shot Blur Primer', '', 'hince pore-shot blur primer'),
]},
{ title:'Powders and setting', tag:'Set', note:'blur, fix and keep it in place', items:[
 mk('MILKTOUCH Air Blur Rice Setting Powder', 'Translucent', 'milktouch air blur rice setting powder translucent', { p:26, u:dp('B0FJRRM9DP') }),
 mk('hince Radiance UV Loose Powder', 'Translucent', 'hince radiance uv loose powder translucent'),
 mk('innisfree No-Sebum Mineral Powder', '', 'innisfree no-sebum mineral powder', { p:14, u:dp('B0CWN955CQ') }, { p:5 }),
 mk('about tone Blur Powder Pact', '01 Fair, Silver edition', 'about tone silver edition blur powder pact 01 fair', {}, { p:7.84 }),
 mk('fwee Shaking Synergy Mist Powder', 'Fixing, blur, lasting', 'fwee shaking synergy mist powder', {}, { p:19.38 }),
]},
{ title:'Cheeks and glow', tag:'Glow', note:'blush, bronzer and a little shimmer', items:[
 mk('glow Cocktail Blush', 'Purple Flame', 'glow cocktail blush purple flame', {}, { p:32 }),
 mk('hince Raw Glow Dewy Ball', '15 Peach Dew', 'hince raw glow dewy ball 15 peach dew', {}, { p:16.14 }),
 mk('Artclass by Rodin Poudre Bronzante Moderne', 'Boutique edition', 'artclass by rodin poudre bronzante moderne'),
 mk('hince Face and Body Glitter Balm', '', 'hince face and body glitter balm'),
]},
{ title:'Lips', tag:'Lips', note:'tints, glosses, oils and tinted balms', items:[
 mk('glow Diamond Tinted Lip Oil 0921', 'Tinted lip oil', 'glow diamond tinted lip oil 0921', {}, { p:57.6, u:'https://www.yesstyle.com/en/glow-diamond-tinted-lip-oil-5-colors-0326/info.html/pid.1137986339' }),
 mk('glow Diamond Tinted Lip Oil 0920', 'Tinted lip oil', 'glow diamond tinted lip oil 0920', {}, { p:57.6, u:'https://www.yesstyle.com/en/glow-diamond-tinted-lip-oil-5-colors-0326/info.html/pid.1137986339' }),
 mk('hince Raw Glow Gel Tint Odd Rose', 'Odd Spring edition', 'hince raw glow gel tint odd rose', {}, { p:17.34 }),
 mk('TIRTIR Waterism Glow Tint', '19 Bad Rosy', 'tirtir waterism glow tint 19 bad rosy', {}, { p:13.5, u:'https://www.yesstyle.com/en/tirtir-waterism-glow-tint-10-colors-09-salmon-syrup/info.html/pid.1129748633' }),
 mk('muzigae mansion Icy Glow Tint', '03', 'muzigae mansion icy glow tint 03'),
 mk('NEOGEN Metal Glow Lip Tint Serum', 'All shades', 'neogen metal glow lip tint serum', { p:32.3, note:'price may vary by shade' }),
 mk('hince Mute Switch Gloss', '', 'hince mute switch gloss'),
 (() => { const r = mk('rhode Peptide Lip Tint', 'Salty Tan', 'rhode peptide lip tint salty tan'); r.rows.unshift({ shop:'rhode', p:20, u:'https://www.rhodeskin.com/products/peptide-lip-tint' }); return r; })(),
 mk('Axis-Y Vita Glow Lip Oil', 'Dreamy Olive', 'axis-y vita glow lip oil dreamy olive', {}, { p:10.5 }),
 mk('fwee Tinted Lip Balm Banana Strawberry', 'Tinted lip balm', 'fwee tinted lip balm banana strawberry', {}, { p:12.8 }),
 mk('fwee Tinted Lip Balm Acai Vanilla', 'Tinted lip balm', 'fwee tinted lip balm acai vanilla', {}, { p:12.8 }),
 mk('haruharu wonder Rose PDRN Peptide Glowy Balm Ruby Red', 'Tinted lip balm', 'haruharu wonder rose pdrn peptide glowy balm ruby red', { p:14, u:dp('B0HCMS4752') }, { p:11.2 }),
 mk('haruharu wonder Rose PDRN Peptide Glowy Balm Petal Pink', 'Tinted lip balm', 'haruharu wonder rose pdrn peptide glowy balm petal pink', { p:14, u:dp('B0HCMS253N') }, { p:11.2 }),
 mk('Anillo Glow Balm Velvet Wine', 'Tinted lip balm', 'anillo glow balm velvet wine', { p:16, u:dp('B0G9T2147W') }, { p:14.4 }),
 mk('Anillo Glow Balm Fig Haze', 'Tinted lip balm', 'anillo glow balm fig haze', { p:16, u:dp('B0G9T1N35D') }, { p:14.4 }),
 mk('Anillo Glow Balm Nude Blur', 'Tinted lip balm', 'anillo glow balm nude blur', { p:16, u:dp('B0G9V9HDHX') }, { p:14.4 }),
]},
{ title:'Eyes and brows', tag:'Eyes', note:'palettes, color pots and brow tools', items:[
 mk('CLIO Pro Eye Palette Air 12', 'Crystalpaw', 'clio pro eye palette air 12 crystalpaw', { p:27.99, u:dp('B0GVXZZ91L') }, { p:23.67 }),
 mk('glow Lonely Legend Eyeshadow', 'Vicious', 'glow lonely legend eyeshadow vicious', {}, { p:33.0 }),
 mk('dasique Souffle Color Pot', 'I own all the shades', 'dasique souffle color pot', {}, { p:15.3 }),
 mk('unleashia Shaper Defining Eyebrow Pencil', '2 Kraft Brown', 'unleashia shaper defining eyebrow pencil 2 kraft brown', {}, { p:13.0, u:'https://www.yesstyle.com/en/unleashia-shaper-defining-eyebrow-pencil-3-colors-n-3-taupe-gray/info.html/pid.1115860716' }),
 mk('unleashia Shaper Pomade Eyebrow Fixer', 'Clear', 'unleashia shaper pomade eyebrow fixer clear', {}, { p:11.17 }),
]},
{ title:'Brushes and tools', tag:'Tools', note:'what I apply it all with', items:[
 mk('glow Face Brush C1', '', 'glow face brush c1'),
 mk('glow Face Brush H1', '', 'glow face brush h1'),
 mk('glow Mini Cloud Sponge', '', 'glow mini cloud sponge', {}, { p:14 }),
 mk('fwee Fingerlike Silicone Lip Brush', '', 'fwee fingerlike silicone lip brush', {}, { p:7.2 }),
]},
];

export const categories = [
  { id:'skincare', title:'Skincare', groups: skincare },
  { id:'hair-body', title:'Hair & body care', groups: hairBody },
  { id:'makeup', title:'Makeup', groups: makeup },
  { id:'fashion', title:'Clothes and fashion', groups:[ { title:'Clothes and fashion', tag:'Soon', note:'my favourites are coming soon', items:[] } ] },
  { id:'home', title:'Home goods', groups:[ { title:'Home goods', tag:'Soon', note:'my favourites are coming soon', items:[] } ] },
  { id:'tech', title:'Tech things', groups:[
    { title:'Beauty devices', tag:'Glow', note:'skincare tech for home', items:[
      custom({ name:'medicube AGE-R Booster Pro', sub:'Facial device, black', img:'/img/shop/medicube-age-r-booster-pro.webp', rows:[
        { shop:'YesStyle', p:228.00, u:'https://www.yesstyle.com/en/medicube-age-r-booster/info.html/pid.1130177273' },
        { shop:'Amazon', p:187.79, u:dp('B0CWK6YQ7V') } ] }),
      custom({ name:'currentbody LED Light Therapy Panel', sub:'Full-body LED panel', img:'/img/shop/currentbody-led-panel.webp', rows:[
        { shop:'CurrentBody', p:null, note:'official site, £899.99', u:'https://www.currentbody.com/products/currentbody-skin-led-light-therapy-full-body-panel' } ] }),
      custom({ name:'Shark CryoGlow LED Face Mask', sub:'Red light mask with under-eye cooling', img:'/img/shop/shark-cryoglow-led-face-mask.webp', rows:[
        { shop:'Shark', p:349.99, u:'https://www.sharkninja.com/shark-cryoglow-red-blue-infrared-iqled-face-mask-under-eye-cooling---blue-frost/FW312.html' },
        { shop:'Amazon', p:339.99, u:dp('B0DSGJCS47') } ] }),
    ]},
    { title:'Cameras', tag:'Create', note:'my gadget picks', items:[
      custom({ name:'insta360 Luna Pro', sub:'Gimbal camera', img:'/img/shop/insta360-luna-pro.webp', rows:[
        { shop:'Insta360', p:599.99, u:'https://store.insta360.com/product/luna-pro' } ] }),
    ]},
  ] },
];
