import React, { useState } from 'react';
import { Search, SlidersHorizontal, MessageSquare, Phone, X, Award, Eye, Info } from 'lucide-react';
import { PREMIUM_PRODUCTS, GOLD_RATES, RAW_STORE_INFO } from '../data';
import { Product } from '../types';

export default function Collections() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter products based on category & search query
  const filteredProducts = PREMIUM_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Calculate live estimate for product
  const getLivePriceEstimate = (product: Product) => {
    let rate = GOLD_RATES.gold22k;
    if (product.karat === 24) rate = GOLD_RATES.gold24k;
    if (product.karat === 21) rate = GOLD_RATES.gold21k;
    if (product.karat === 18) rate = GOLD_RATES.gold18k;
    
    // For silver, we use silver rate if category is silver
    if (product.category === 'silver') {
      rate = GOLD_RATES.silver;
    }

    const goldCost = product.weightTolas * rate;
    const makingPercent = product.category === 'diamond' ? 0.25 : 0.08; // 25% for diamonds setup, 8% for gold karighari
    const makingCost = goldCost * makingPercent;
    
    // Total including making
    return Math.round(goldCost + makingCost);
  };

  const getWeightInGrams = (tolas: number) => {
    return (tolas * 11.664).toFixed(2);
  };

  const categories = [
    { id: 'all', label: 'All Designs' },
    { id: 'bridal', label: 'Bridal Sets' },
    { id: 'gold', label: 'Heritage Gold' },
    { id: 'diamond', label: 'Fine Diamonds' },
    { id: 'silver', label: 'Artisan Silver' }
  ];

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500">
          Our Signature Collections
        </h1>
        <div className="w-20 h-0.5 bg-amber-500 mx-auto mt-4" />
        <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
          Each item in our catalog is handcrafted with pristine hallmarks, combining ancient South Asian jeweler heritage with flawless contemporary styling.
        </p>
      </div>

      {/* Control Panel (Filters & Search) */}
      <div className="max-w-7xl mx-auto mb-10 bg-stone-900 border border-stone-800 p-4 sm:p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 font-semibold shadow-lg shadow-amber-500/10'
                  : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search necklace, ring, bangles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 hover:border-amber-500/40 focus:border-amber-400 focus:outline-none text-stone-100 text-sm pl-10 pr-4 py-2.5 rounded-xl transition-all"
          />
          <Search className="absolute left-3.5 top-3 w-4.5 h-4.5 text-stone-500" />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-stone-900/40 border border-stone-800 rounded-2xl">
            <SlidersHorizontal className="w-12 h-12 text-stone-600 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-medium text-stone-400">No Match Found</h3>
            <p className="text-stone-500 text-sm mt-1">Try resetting your filters or adjusting your search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const livePrice = getLivePriceEstimate(product);
              return (
                <div
                  key={product.id}
                  className="bg-stone-900 border border-stone-800/80 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between group h-full shadow-lg"
                  id={`product-card-${product.id}`}
                >
                  <div className="relative aspect-square overflow-hidden bg-stone-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="bg-stone-950/80 border border-amber-400/40 px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase text-amber-300">
                        {product.karat}K Gold
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-amber-500">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-stone-100 line-clamp-1 group-hover:text-amber-200 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-stone-400 text-xs line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {/* Live Estimator Display */}
                      <div className="bg-stone-950/80 px-3 py-2 rounded-xl border border-stone-800 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-stone-500 font-mono block">Weight</span>
                          <span className="text-xs font-mono text-stone-300 font-bold">{product.weightTolas} Tola <span className="text-stone-500 font-normal">({getWeightInGrams(product.weightTolas)}g)</span></span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-amber-400 font-mono uppercase tracking-widest block">Live Estimate</span>
                          <span className="text-sm font-serif font-bold text-amber-300">
                            Rs. {livePrice.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="py-2 px-3 bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> Details
                        </button>
                        <a
                          href={`https://wa.me/${RAW_STORE_INFO.whatsapp}?text=Hi%20Patiala%20Jewellers,%20I%20am%20inquiring%20about%20the%20"${encodeURIComponent(product.name)}"%20listed%20on%20your%20website%20collections.%20Please%20let%20me%20know%20availability%20and%20making%20timeline.`}
                          target="_blank"
                          rel="noreferrer"
                          className="py-2 px-3 bg-emerald-700/80 hover:bg-emerald-650 text-white rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current" /> Ask Rate
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-55 overflow-y-auto bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative" id="product-detail-modal">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white bg-stone-950/80 p-2 rounded-full border border-stone-800 z-10"
              id="close-modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
              {/* Product Image Column */}
              <div className="md:col-span-5 h-80 sm:h-96 md:h-full overflow-hidden rounded-xl border border-stone-800 bg-stone-950">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Details Column */}
              <div className="md:col-span-7 space-y-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-widest">
                      {selectedProduct.category}
                    </span>
                    <span className="text-stone-500 font-mono text-xs">ID: {selectedProduct.id.toUpperCase()}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-stone-100 tracking-tight mt-2">
                    {selectedProduct.name}
                  </h2>

                  <p className="text-stone-400 text-sm leading-relaxed mt-3">
                    {selectedProduct.description}
                  </p>

                  {/* Metal specs grid */}
                  <div className="grid grid-cols-3 gap-3 bg-stone-950/60 p-3.5 rounded-xl border border-stone-800 mt-5 text-center font-mono">
                    <div>
                      <span className="text-[9px] text-stone-500 uppercase tracking-widest block">Metal Karat</span>
                      <span className="text-sm font-bold text-amber-300">{selectedProduct.karat}K Gold</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-500 uppercase tracking-widest block">Net Weight</span>
                      <span className="text-sm font-bold text-stone-200">{selectedProduct.weightTolas} Tola</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-500 uppercase tracking-widest block">Gram Weight</span>
                      <span className="text-sm font-bold text-stone-200">{getWeightInGrams(selectedProduct.weightTolas)}g</span>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2 mt-5">
                    <h4 className="font-serif text-stone-300 text-sm font-semibold flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" /> Certificate Specifications & Highlights
                    </h4>
                    <ul className="text-xs text-stone-400 space-y-1.5 pl-5 list-disc leading-relaxed">
                      {selectedProduct.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price Breakdown & CTAs */}
                <div className="border-t border-stone-800 pt-5 space-y-4">
                  <div className="bg-amber-500/5 border border-amber-400/20 p-4 rounded-xl space-y-2">
                    <h4 className="font-mono text-[10px] text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" /> Price Breakdown Estimator
                    </h4>
                    
                    <div className="text-xs text-stone-400 space-y-1 font-sans">
                      <div className="flex justify-between">
                        <span>Gold Material Value:</span>
                        <span className="font-mono">Rs. {(selectedProduct.weightTolas * (selectedProduct.karat === 24 ? GOLD_RATES.gold24k : selectedProduct.karat === 22 ? GOLD_RATES.gold22k : selectedProduct.karat === 21 ? GOLD_RATES.gold21k : GOLD_RATES.gold18k)).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Making Charges & Karighari (~{selectedProduct.category === 'diamond' ? '25%' : '8%'}):</span>
                        <span className="font-mono">Rs. {Math.round((selectedProduct.weightTolas * (selectedProduct.karat === 24 ? GOLD_RATES.gold24k : selectedProduct.karat === 22 ? GOLD_RATES.gold22k : selectedProduct.karat === 21 ? GOLD_RATES.gold21k : GOLD_RATES.gold18k)) * (selectedProduct.category === 'diamond' ? 0.25 : 0.08)).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-stone-800 pt-2 flex justify-between items-center">
                      <span className="text-xs font-serif font-bold text-stone-200">Total Live Estimated Price:</span>
                      <span className="font-serif text-xl font-bold text-amber-400">
                        Rs. {getLivePriceEstimate(selectedProduct).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-[9px] text-stone-500 leading-none">
                      *Note: Calculations fluctuate daily in line with Rawalpindi Sarafa Market. Excludes local sales tax.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://wa.me/${RAW_STORE_INFO.whatsapp}?text=Hi%20Patiala%20Jewellers,%20I%20am%20inquiring%20about%20the%20"${encodeURIComponent(selectedProduct.name)}"%20(Karat:%20${selectedProduct.karat}K,%20Weight:%20${selectedProduct.weightTolas}%20Tola).%20Please%20provide%20the%20current%20final%20quotation%20and%20making%20timeline.`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-3 bg-emerald-750 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" /> WhatsApp Inquiry
                    </a>
                    <a
                      href={`tel:${RAW_STORE_INFO.phone}`}
                      className="py-3 bg-stone-800 hover:bg-stone-750 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold tracking-wider uppercase text-center flex items-center justify-center gap-1.5"
                    >
                      <Phone className="w-4 h-4" /> Call Showroom
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
