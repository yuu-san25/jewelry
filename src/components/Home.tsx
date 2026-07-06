import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, MapPin, Share2, Bookmark, Award, ShieldCheck, Heart, Sparkles, ChevronRight } from 'lucide-react';
import { RAW_STORE_INFO, GOLD_RATES } from '../data';

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

export default function Home({ setCurrentPage }: HomeProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Patiala Jewellers Rawalpindi',
        text: 'Check out Patiala Jewellers - Premium Bridal and Gold jewelry in Rawalpindi!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! Share it with family and friends.');
    }
  };

  const handleSave = () => {
    alert('Patiala Jewellers has been bookmarked to your favorites!');
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen">
      {/* Hero Showcase Section */}
      <section className="relative h-[85vh] overflow-hidden flex items-center justify-center">
        {/* Banner Image Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/patiala_hero_1783334034706.jpg"
            alt="Patiala Jewellers Royal Masterpiece"
            className="w-full h-full object-cover filter brightness-45 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-900/35" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs sm:text-sm tracking-widest uppercase font-mono">
              <Sparkles className="w-3.5 h-3.5" /> Est. Heritage Jeweller in Parsi Market
            </span>
            
            <h1 className="font-serif text-5xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-amber-200 via-amber-300 to-amber-500 tracking-tight leading-none">
              Patiala Jewellers
            </h1>
            
            <p className="font-serif italic text-lg sm:text-2xl text-stone-300 max-w-2xl mx-auto font-light">
              "Crafting the Golden Legacies of Rawalpindi’s Most Celebrated Brides"
            </p>

            <p className="font-sans text-sm sm:text-base text-stone-400 max-w-xl mx-auto leading-relaxed">
              Authentic 22-Karat hallmark gold, pristine custom Kundan sets, and certified diamonds, crafted with precision in Mohalla, Rawalpindi.
            </p>

            <div className="pt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setCurrentPage('collections')}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base tracking-wide shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 cursor-pointer"
                id="cta-collections"
              >
                Explore Collections <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentPage('calculator')}
                className="bg-stone-900 hover:bg-stone-800 border border-amber-400/55 text-amber-300 px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base tracking-wide transition-all cursor-pointer"
                id="cta-calculator"
              >
                Check Daily Gold Rates
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Profile Quick Action Center & Rating Widget */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Rating Block */}
          <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-stone-800 pb-6 md:pb-0 md:pr-8 text-center md:text-left">
            <h3 className="font-serif text-2xl font-semibold text-amber-300 flex items-center justify-center md:justify-start gap-2">
              Google Verified Profile
            </h3>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-stone-100 tracking-tight font-mono">{RAW_STORE_INFO.rating}</span>
              <div>
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <p className="text-stone-400 text-xs sm:text-sm font-sans mt-0.5">
                  Based on <strong className="text-stone-200">{RAW_STORE_INFO.reviewCount}</strong> Google Map reviews
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-500 font-mono mt-3">
              Shop # 7, Parsi market, Murree Rd, Rawalpindi
            </p>
          </div>

          {/* Quick Buttons Center */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-5 gap-3">
            <a
              href={`tel:${RAW_STORE_INFO.phone}`}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-800 hover:bg-stone-800/80 border border-stone-700 hover:border-amber-400/50 text-stone-100 text-xs font-medium transition-all group"
              id="action-call"
            >
              <Phone className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform mb-2" />
              Call Store
            </a>
            <a
              href="https://maps.app.goo.gl/YVMyH7C2HBy8pL7S7" 
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-800 hover:bg-stone-800/80 border border-stone-700 hover:border-amber-400/50 text-stone-100 text-xs font-medium transition-all group"
              id="action-directions"
            >
              <MapPin className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform mb-2" />
              Directions
            </a>
            <a
              href={`https://wa.me/${RAW_STORE_INFO.whatsapp}?text=Hi%20Patiala%20Jewellers,%20I%20am%20interested%20in%20custom%20jewelry.`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-800 hover:bg-stone-800/80 border border-stone-700 hover:border-amber-400/50 text-stone-100 text-xs font-medium transition-all group"
              id="action-whatsapp"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform mb-2" />
              WhatsApp
            </a>
            <button
              onClick={handleShare}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-800 hover:bg-stone-800/80 border border-stone-700 hover:border-amber-400/50 text-stone-100 text-xs font-medium transition-all group cursor-pointer"
              id="action-share"
            >
              <Share2 className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform mb-2" />
              Share
            </button>
            <button
              onClick={handleSave}
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-stone-800 hover:bg-stone-800/80 border border-stone-700 hover:border-amber-400/50 text-stone-100 text-xs font-medium transition-all group cursor-pointer"
              id="action-save"
            >
              <Bookmark className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform mb-2" />
              Save
            </button>
          </div>
        </div>
      </section>

      {/* Live Market Gold Rates Ticker Banner */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-br from-stone-900 to-amber-950/20 border border-amber-500/20 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-400">
                Live Gold & Silver Rates Estimator
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 font-sans mt-1">
                Prices calculated per <strong className="text-amber-300">Tola</strong> (Traditional Pakistani Weight • ~11.66 Grams)
              </p>
            </div>
            <div className="bg-amber-400/10 border border-amber-400/30 px-3.5 py-1.5 rounded-lg">
              <span className="text-xs font-mono text-amber-300 uppercase tracking-wider block">Last Updated</span>
              <span className="text-xs font-mono text-stone-200">{GOLD_RATES.lastUpdated}</span>
            </div>
          </div>

          {/* Rates Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 text-center">
              <span className="text-xs uppercase tracking-widest text-amber-500 font-mono">24K Gold</span>
              <span className="block font-serif text-xl sm:text-2xl font-bold text-amber-100 mt-2">
                Rs. {GOLD_RATES.gold24k.toLocaleString()}
              </span>
              <span className="text-[10px] text-stone-500 font-mono block mt-1">99.9% Purity (Fine Gold)</span>
            </div>
            <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 text-center">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">22K Gold</span>
              <span className="block font-serif text-xl sm:text-2xl font-bold text-amber-200 mt-2">
                Rs. {GOLD_RATES.gold22k.toLocaleString()}
              </span>
              <span className="text-[10px] text-stone-500 font-mono block mt-1">91.6% (Ideal for Bridal)</span>
            </div>
            <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 text-center">
              <span className="text-xs uppercase tracking-widest text-amber-300/80 font-mono">21K Gold</span>
              <span className="block font-serif text-xl sm:text-2xl font-bold text-amber-300/90 mt-2">
                Rs. {GOLD_RATES.gold21k.toLocaleString()}
              </span>
              <span className="text-[10px] text-stone-500 font-mono block mt-1">87.5% (High Durability)</span>
            </div>
            <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 text-center">
              <span className="text-xs uppercase tracking-widest text-amber-200/60 font-mono">18K Gold</span>
              <span className="block font-serif text-xl sm:text-2xl font-bold text-amber-300/70 mt-2">
                Rs. {GOLD_RATES.gold18k.toLocaleString()}
              </span>
              <span className="text-[10px] text-stone-500 font-mono block mt-1">75.0% (Diamond Settings)</span>
            </div>
            <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800 text-center col-span-2 lg:col-span-1">
              <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">Silver (Chandi)</span>
              <span className="block font-serif text-xl sm:text-2xl font-bold text-stone-100 mt-2">
                Rs. {GOLD_RATES.silver.toLocaleString()}
              </span>
              <span className="text-[10px] text-stone-500 font-mono block mt-1">Fine Sterling (Chandi Rate)</span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setCurrentPage('calculator')}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-amber-400 hover:text-amber-300 transition-colors"
            >
              Access Gold weight & Karat Calculator <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Brand Values / Purity Standards */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-t border-stone-900">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-100">
            Why Rawalpindi Chooses Patiala
          </h2>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-4" />
          <p className="text-stone-400 text-sm sm:text-base font-sans mt-4 leading-relaxed">
            For decades, Patiala Jewellers has stood as a beacon of unmatched transparency, genuine metal purities, and master jewelry design services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-stone-900/40 p-6 rounded-2xl border border-stone-800 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
              <ShieldCheck className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-200">100% Hallmark Purity</h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Every single piece is tested and certified. We provide authentic jewelry receipts outlining correct karat configurations, net weights, and stone valuations.
            </p>
          </div>

          <div className="bg-stone-900/40 p-6 rounded-2xl border border-stone-800 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-200">Masterful Karighari</h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Our master artisans (karighars) carry generations of expert metal smithing, specializing in micro-die casting, wire filigree, and royal stone settings.
            </p>
          </div>

          <div className="bg-stone-900/40 p-6 rounded-2xl border border-stone-800 text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30">
              <Heart className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="font-serif text-xl font-medium text-stone-200">Transparent Pricing</h3>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              We bill exactly in alignment with the Sarafa Association market rates, guaranteeing honest transactions, minimal karighari wastage, and genuine trade values.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Collections Highlight (Cards with Zoom layout) */}
      <section className="max-w-6xl mx-auto px-4 py-16 border-t border-stone-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-100">
              Featured Signature Collections
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm font-sans mt-2">
              Browse some of our highly requested premium jewelry designs.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('collections')}
            className="text-amber-400 hover:text-amber-300 text-sm font-semibold tracking-wide flex items-center gap-1 cursor-pointer"
          >
            See Entire Catalog <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Bridal Highlight Card */}
          <div className="group overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div className="h-64 overflow-hidden relative">
              <img
                src="/src/assets/images/bridal_collection_1783334048565.jpg"
                alt="Bridal Kundan Set"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-stone-950/80 border border-amber-400/40 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-amber-300">
                Signature Bridal
              </span>
            </div>
            <div className="p-5 flex-grow">
              <h3 className="font-serif text-xl font-medium text-stone-200">Kundan Masterpieces</h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Elaborate kundan designs complete with necklace, chandbalis, tikka, and jhumars, tailored uniquely for matching wedding themes.
              </p>
            </div>
            <div className="px-5 pb-5 pt-1">
              <button
                onClick={() => setCurrentPage('collections')}
                className="w-full py-2 bg-stone-800 hover:bg-stone-750 text-amber-300 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Bridal Sets
              </button>
            </div>
          </div>

          {/* Traditional Gold Card */}
          <div className="group overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div className="h-64 overflow-hidden relative">
              <img
                src="/src/assets/images/gold_collection_1783334062106.jpg"
                alt="Handcrafted Pure Gold Kara"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-stone-950/80 border border-amber-400/40 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-amber-300">
                22K Heritage
              </span>
            </div>
            <div className="p-5 flex-grow">
              <h3 className="font-serif text-xl font-medium text-stone-200">Heritage Pure Gold</h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Hand-engraved gold bangles, bracelets, rings, and heavy heritage haar sets reflecting the timeless traditions of Punjab and Deccan.
              </p>
            </div>
            <div className="px-5 pb-5 pt-1">
              <button
                onClick={() => setCurrentPage('collections')}
                className="w-full py-2 bg-stone-800 hover:bg-stone-750 text-amber-300 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Pure Gold Items
              </button>
            </div>
          </div>

          {/* Luxury Diamonds Card */}
          <div className="group overflow-hidden rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition-all flex flex-col justify-between">
            <div className="h-64 overflow-hidden relative">
              <img
                src="/src/assets/images/diamond_collection_1783334076159.jpg"
                alt="Brilliant Cut Solitaire"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-stone-950/80 border border-amber-400/40 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase text-amber-300">
                Certified Diamonds
              </span>
            </div>
            <div className="p-5 flex-grow">
              <h3 className="font-serif text-xl font-medium text-stone-200">Signature Diamonds</h3>
              <p className="text-stone-400 text-xs sm:text-sm mt-2 leading-relaxed">
                Precious solitaires, designer cocktail rings, delicate bracelets, and studs featuring top-grade diamonds set in premium white and rose gold.
              </p>
            </div>
            <div className="px-5 pb-5 pt-1">
              <button
                onClick={() => setCurrentPage('collections')}
                className="w-full py-2 bg-stone-800 hover:bg-stone-750 text-amber-300 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Diamonds
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Consulting Prompt Banner */}
      <section className="bg-stone-900 border-y border-amber-500/25 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
          <div className="inline-flex items-center gap-1 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-4 h-4 animate-spin-slow" /> Custom Jewelry AI Advisory
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-stone-100">
            Design Your Dream Ornament Virtually
          </h2>
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Not sure how much a custom 5 Tola 22K bridal set would cost based on today's Murree Road gold rates? Chat instantly with our AI Royal Design Advisor for custom quotes, design comparisons, and wedding jewelry selections.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setCurrentPage('ai-consultant')}
              className="bg-stone-950 hover:bg-stone-800 text-amber-300 border border-amber-400/60 px-8 py-3.5 rounded-full font-semibold tracking-wide transition-all shadow-lg flex items-center gap-2 mx-auto cursor-pointer"
            >
              Consult Royal Advisor Now <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer Details */}
      <footer className="bg-stone-950 border-t border-stone-900 text-stone-400 text-xs sm:text-sm py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="font-serif text-amber-400 text-lg font-bold tracking-wider">PATIALA JEWELLERS</h4>
            <p className="text-stone-500 leading-relaxed text-xs">
              Trusted bridal & fine jewelry showroom on Murree Road, Rawalpindi. Handcrafting memories since inception with unmatched clarity and authentic hallmark certifications.
            </p>
          </div>
          <div className="space-y-3">
            <h5 className="font-mono text-stone-200 text-xs uppercase tracking-widest font-bold">Contact Info</h5>
            <p className="leading-relaxed text-xs">
              Shop # 7, Parsi market,<br />
              Murree Rd, Mohalla, Rawalpindi, 46000<br />
              <span className="text-stone-300">Phone:</span> {RAW_STORE_INFO.phone}<br />
              <span className="text-stone-300">WhatsApp:</span> {RAW_STORE_INFO.whatsappFormatted}
            </p>
          </div>
          <div className="space-y-3">
            <h5 className="font-mono text-stone-200 text-xs uppercase tracking-widest font-bold">Showroom Hours</h5>
            <p className="leading-relaxed text-xs">
              <span className="text-stone-300">Mon - Sat:</span> {RAW_STORE_INFO.hours.open} - {RAW_STORE_INFO.hours.close}<br />
              <span className="text-stone-300">Sunday:</span> Closed<br />
              <span className="text-amber-500 font-medium">Visiting during wedding season? We recommend booking an appointment slot in advance!</span>
            </p>
          </div>
          <div className="space-y-3">
            <h5 className="font-mono text-stone-200 text-xs uppercase tracking-widest font-bold">Quick Shortcuts</h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => setCurrentPage('collections')} className="text-left hover:text-amber-300">Catalog</button>
              <button onClick={() => setCurrentPage('calculator')} className="text-left hover:text-amber-300">Calculator</button>
              <button onClick={() => setCurrentPage('ai-consultant')} className="text-left hover:text-amber-300">AI Advisor</button>
              <button onClick={() => setCurrentPage('reviews')} className="text-left hover:text-amber-300">Reviews</button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-stone-900 text-center text-stone-600 text-[10px] font-mono uppercase tracking-wider">
          © {new Date().getFullYear()} Patiala Jewellers Rawalpindi. Licensed Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
