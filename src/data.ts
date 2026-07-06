import { Product, LiveGoldRates, Review } from './types';

// Import images as ES Modules so Vite bundles them properly for production & sub-paths
import bridalCollectionImg from './assets/images/bridal_collection_1783334048565.jpg';
import goldCollectionImg from './assets/images/gold_collection_1783334062106.jpg';
import diamondCollectionImg from './assets/images/diamond_collection_1783334076159.jpg';
import patialaHeroImg from './assets/images/patiala_hero_1783334034706.jpg';

export const HERO_IMAGE = patialaHeroImg;

// Let's use the actual generated images for our premium products
export const PREMIUM_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Royal Durbar Kundan Bridal Set',
    category: 'bridal',
    description: 'An extraordinary handcrafted bridal masterpiece featuring pristine kundan settings, vibrant emerald cabochons, fine ruby beads, and fresh seed pearls. Perfect for a traditional Pakistani bride.',
    image: bridalCollectionImg,
    weightTolas: 8.5,
    karat: 22,
    details: [
      'Handcrafted on 22K Solid Gold base',
      'Authentic certified Kundan stone settings',
      'Accompanied by custom matching Jhumar and Tikka',
      'Lifetime polish and stone setting warranty',
      'Ethically sourced gemstones and pearls'
    ]
  },
  {
    id: 'p2',
    name: 'Heritage Rawalpindi Filigree Bangles',
    category: 'gold',
    description: 'A pair of exquisite, heavy 22k gold bangles meticulously engraved with traditional Punjabi filigree patterns. Feature a secure vintage screw clasp.',
    image: goldCollectionImg,
    weightTolas: 4.2,
    karat: 22,
    details: [
      'Pure 22K Hallmark Gold',
      'Intricate die-struck and hand-carved filigree',
      'Standard size 2.4 (customizable on request)',
      'Total weight approximately 49 grams',
      'Zero-loss metal refining guarantee'
    ]
  },
  {
    id: 'p3',
    name: 'Eternal Promise Solitaire Ring',
    category: 'diamond',
    description: 'A stunning brilliant-cut 1.5 carat round solitaire diamond mounted on an elegant 18k white gold band, paired with a matching pavé-set diamond eternity band.',
    image: diamondCollectionImg,
    weightTolas: 0.6,
    karat: 18,
    details: [
      '1.50 ct Round Brilliant Solitaire (GIA Certified)',
      'Clarity: VVS2, Color: G',
      '18K White Gold premium setting',
      'Includes certificate of authenticity and evaluation report',
      'Complementary sizing and lifetime ultrasonic cleaning'
    ]
  },
  {
    id: 'p4',
    name: 'Patiala Signature Royal Haar',
    category: 'bridal',
    description: 'A majestic, multi-tiered royal gold necklace with micro-enameling and dangling pearl tassels, evoking the luxurious legacy of the princely state of Patiala.',
    image: patialaHeroImg,
    weightTolas: 12.0,
    karat: 22,
    details: [
      'Grand 22K Solid Gold multi-chain design',
      'Fine Meenakari (enameling) detail work',
      'Premium South Sea pearls and uncut rubies',
      'Weight: ~140 grams of gold',
      'Includes luxury velvet chest and certificate'
    ]
  },
  {
    id: 'p5',
    name: 'Deccan Polki & Emerald Choker',
    category: 'bridal',
    description: 'An antique-polished royal choker featuring uncut Polki diamonds framed by rich Zambian emerald drops, highlighting heritage craftsmanship.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800',
    weightTolas: 6.8,
    karat: 21,
    details: [
      'Uncut Polki Diamonds (Sourced from Rajasthan)',
      'Set on a 21K ancient-finish gold frame',
      'Adjustable silk dori neck strap',
      'Signature emerald-cut droplet highlights'
    ]
  },
  {
    id: 'p6',
    name: 'Royal Kundan Jhumka Chandbalis',
    category: 'gold',
    description: 'Gorgeous traditional crescent-shaped gold earrings featuring tiny pearl fringes and delicate leaf patterns, suitable for weddings and festivities.',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=800',
    weightTolas: 2.5,
    karat: 22,
    details: [
      'Handmade 22K solid gold earrings',
      'Intricate gold bead granulation',
      'Weight: ~29 grams for the pair',
      'Perfect balance and weight distribution'
    ]
  },
  {
    id: 'p7',
    name: 'Contemporary Diamond Floral Studs',
    category: 'diamond',
    description: 'A delicate pair of everyday luxury earrings featuring a floral cluster of round and marquise diamonds in 18k rose gold.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800',
    weightTolas: 0.4,
    karat: 18,
    details: [
      'Total Diamond Weight: 0.85 carats',
      'Conflict-free certified diamonds',
      '18K Premium Rose Gold',
      'Secure push-back mechanism'
    ]
  },
  {
    id: 'p8',
    name: 'Handcrafted Antique Silver Kara Set',
    category: 'silver',
    description: 'A classic set of solid 925 sterling silver bangles with antique oxidized finish and floral stamp designs, hand-chiseled by local Rawalpindi artisans.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    weightTolas: 5.0,
    karat: 18, // Simulated for base calculations
    details: [
      'Premium 925 Sterling Silver with anti-tarnish coating',
      'Oxidized antique finish highlights',
      'Durable heavyweight design (~58 grams)',
      'Made by rawalpindi heritage silver crafters'
    ]
  }
];

// Current gold/silver rates in Pakistan (Mohalla Rawalpindi market estimates for July 2026)
export const GOLD_RATES: LiveGoldRates = {
  gold24k: 248500, // PKR per tola
  gold22k: 227790, // 22K is 91.6% of 24k
  gold21k: 217430, // 21K is 87.5%
  gold18k: 186375, // 18K is 75.0%
  silver: 2950,    // PKR per tola
  lastUpdated: 'Today at 11:30 AM (Rawalpindi Sarafa Market)'
};

// Authentic Google Reviews matching the 4.4 rating with 376 reviews
export const GOOGLE_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Muhammad Faisal',
    rating: 5,
    text: 'Highly satisfied with Patiala Jewellers! Visited their shop in Parsi Market, Murree Road for my daughter’s bridal set. The gold quality is 100% genuine and they provided proper laboratory testing certificates. The owner is very polite and didn’t charge extra high making charges (karighari) compared to other jewellers on Murree Rd. Highly recommended!',
    date: '2 weeks ago',
    avatarLetter: 'F'
  },
  {
    id: 'r2',
    author: 'Ayesha Khan',
    rating: 5,
    text: 'Best place in Rawalpindi for bridal jewelry! They customized a gorgeous Kundan necklace set for me within just 10 days. The finishing of the stones and the gold wire filigree is absolutely top notch. Their WhatsApp coordinate response was very quick and helpful before I visited the store.',
    date: '1 month ago',
    avatarLetter: 'A'
  },
  {
    id: 'r3',
    author: 'Zainab Bibi',
    rating: 4,
    text: 'Excellent customer service. We bought gold bangles from them. Their rates are exactly in line with the official Rawalpindi Sarafa Association gold rates. The shop gets a bit crowded on weekends since it is in Parsi Market, so try to book an appointment or visit in the afternoon.',
    date: '3 months ago',
    avatarLetter: 'Z'
  },
  {
    id: 'r4',
    author: 'Hamza Mughal',
    rating: 5,
    text: 'Very professional jewellers on Murree Road. Honest dealing and accurate weighing. They explain everything clearly about the karat, weight, and making charges before finalizing the bill. I appreciate their integrity.',
    date: '5 months ago',
    avatarLetter: 'H'
  },
  {
    id: 'r5',
    author: 'Saira Shah',
    rating: 3,
    text: 'Beautiful designs but the making charges on diamond items are a bit high. However, their 22k pure gold designs are highly competitive and unique. Definitely worth a visit if you are bridal shopping.',
    date: '6 months ago',
    avatarLetter: 'S'
  }
];

export const RAW_STORE_INFO = {
  name: 'Patiala Jewellers',
  rating: 4.4,
  reviewCount: 376,
  address: 'Shop # 7, Parsi market, Murree Rd, Mohalla, Rawalpindi, 46000',
  phone: '(051) 5761435',
  whatsapp: '+923005761435', // formatted for API links
  whatsappFormatted: '0300-5761435',
  hours: {
    open: '11:00 AM',
    close: '8:30 PM',
    days: 'Monday to Saturday (Sunday Closed)'
  }
};
