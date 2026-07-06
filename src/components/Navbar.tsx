import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Star, Clock } from 'lucide-react';
import { RAW_STORE_INFO } from '../data';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isStoreOpen, setIsStoreOpen] = useState(true);

  // Determine if store is open based on Pakistan time (or simple local hour simulation)
  useEffect(() => {
    const updateStoreStatus = () => {
      const now = new Date();
      // Pakistan Standard Time is UTC+5. We can also just use the client's current local hour
      const hour = now.getHours();
      const minutes = now.getMinutes();
      const timeVal = hour + minutes / 60;
      
      // Open from 11:00 AM (11.0) to 8:30 PM (20.5)
      // Sunday closed
      const day = now.getDay();
      if (day === 0) {
        setIsStoreOpen(false);
      } else {
        setIsStoreOpen(timeVal >= 11 && timeVal < 20.5);
      }
    };

    updateStoreStatus();
    const interval = setInterval(updateStoreStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'calculator', label: 'Gold Calculator' },
    { id: 'ai-consultant', label: 'AI Royal Advisor' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Book Appointment' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-stone-900 border-b border-amber-500/30 text-stone-100 shadow-xl">
      {/* Top Bar for store announcement & rates ticker */}
      <div className="bg-amber-500 text-stone-950 text-xs py-1.5 px-4 font-mono font-medium flex justify-between items-center overflow-hidden">
        <div className="flex items-center gap-4 animate-pulse">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Timings: 11:00 AM - 8:30 PM (Parsi Market, Murree Rd)
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-current" />
            Rated {RAW_STORE_INFO.rating} ★ ({RAW_STORE_INFO.reviewCount} Reviews)
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <button
              onClick={() => { setCurrentPage('home'); setIsOpen(false); }}
              className="flex flex-col text-left group cursor-pointer focus:outline-none"
              id="brand-logo"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 group-hover:from-yellow-200 group-hover:to-amber-300 transition duration-300">
                PATIALA
              </span>
              <span className="font-sans text-xs sm:text-[10px] uppercase tracking-[0.25em] text-amber-500/95 font-medium -mt-1">
                Jewellers • Rawalpindi
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium tracking-wide transition-colors ${
                  currentPage === item.id
                    ? 'text-amber-400 border-b-2 border-amber-400 rounded-none'
                    : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Contact Fast Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Dynamic Store Status */}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
              isStoreOpen 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                : 'bg-rose-950 text-rose-400 border border-rose-500/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isStoreOpen ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`} />
              {isStoreOpen ? 'Store Open' : 'Store Closed'}
            </span>

            <a
              href={`tel:${RAW_STORE_INFO.phone}`}
              className="bg-stone-800 hover:bg-stone-700 text-amber-400 border border-amber-500/30 p-2.5 rounded-full transition-all"
              title="Call Store"
              id="quick-call"
            >
              <Phone className="w-4.5 h-4.5" />
            </a>
            <a
              href={`https://wa.me/${RAW_STORE_INFO.whatsapp}?text=Hi%20Patiala%20Jewellers,%20I%20saw%20your%20website%20and%20wanted%20to%20ask%20about%20your%20jewelry%20collections.`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-650 hover:bg-emerald-600 text-white p-2.5 rounded-full transition-all flex items-center gap-1.5"
              title="WhatsApp Store"
              id="quick-whatsapp"
            >
              <MessageSquare className="w-4.5 h-4.5 fill-current" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 focus:outline-none"
              aria-expanded="false"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-stone-950 border-t border-amber-500/20 px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`mob-nav-${item.id}`}
              onClick={() => {
                setCurrentPage(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium ${
                currentPage === item.id
                  ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-400'
                  : 'text-stone-300 hover:bg-stone-900 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-stone-800 flex items-center justify-around">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              isStoreOpen 
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                : 'bg-rose-950 text-rose-400 border border-rose-500/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isStoreOpen ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`} />
              {isStoreOpen ? 'Open Now' : 'Closed Now'}
            </span>
            <a
              href={`tel:${RAW_STORE_INFO.phone}`}
              className="flex items-center gap-2 text-amber-400 bg-stone-900 border border-amber-500/30 px-4 py-2 rounded-full text-sm font-medium"
            >
              <Phone className="w-4 h-4" /> Call
            </a>
            <a
              href={`https://wa.me/${RAW_STORE_INFO.whatsapp}?text=Hi`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-emerald-700 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              <MessageSquare className="w-4 h-4 fill-current" /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
