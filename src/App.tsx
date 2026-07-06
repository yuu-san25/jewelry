import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Collections from './components/Collections';
import GoldRateCalculator from './components/GoldRateCalculator';
import AIJewelryConsultant from './components/AIJewelryConsultant';
import Reviews from './components/Reviews';
import Contact from './components/Contact';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Page Routing Renderer
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'collections':
        return <Collections />;
      case 'calculator':
        return <GoldRateCalculator />;
      case 'ai-consultant':
        return <AIJewelryConsultant />;
      case 'reviews':
        return <Reviews />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 selection:bg-amber-400 selection:text-stone-950">
      {/* Luxury Gold Border Accent */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-600 sticky top-0 z-55" />

      {/* Main Navbar */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Dynamic Main Body Content */}
      <main className="transition-all duration-300">
        {renderPage()}
      </main>
    </div>
  );
}
