import React, { useState } from 'react';
import { GOLD_RATES, RAW_STORE_INFO } from '../data';
import { Calculator, Scale, RefreshCw, Printer, AlertCircle, Info, FileText } from 'lucide-react';

export default function GoldRateCalculator() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'converter'>('calculator');

  // Calculator State
  const [weightInput, setWeightInput] = useState<number>(1);
  const [weightUnit, setWeightUnit] = useState<'tolas' | 'grams'>('tolas');
  const [selectedKarat, setSelectedKarat] = useState<number>(22);
  const [makingType, setMakingType] = useState<'percent' | 'flat'>('percent');
  const [makingValue, setMakingValue] = useState<number>(8); // 8% default
  const [salesTaxPercent, setSalesTaxPercent] = useState<number>(2); // 2% standard tax

  // Converter State
  const [convertFrom, setConvertFrom] = useState<'tolas' | 'grams' | 'mashas' | 'rattis'>('tolas');
  const [convertValue, setConvertValue] = useState<number>(1);

  // Constants
  const TOLA_TO_GRAMS = 11.664;
  const TOLA_TO_MASHAS = 12;
  const TOLA_TO_RATTIS = 96;

  // Calculate live gold rate based on Karat
  const getKaratRate = (karat: number): number => {
    switch (karat) {
      case 24: return GOLD_RATES.gold24k;
      case 22: return GOLD_RATES.gold22k;
      case 21: return GOLD_RATES.gold21k;
      case 18: return GOLD_RATES.gold18k;
      default: return GOLD_RATES.gold22k;
    }
  };

  // Run calculation
  const currentRatePerTola = getKaratRate(selectedKarat);
  const weightInTolas = weightUnit === 'tolas' ? weightInput : weightInput / TOLA_TO_GRAMS;
  const weightInGrams = weightUnit === 'grams' ? weightInput : weightInput * TOLA_TO_GRAMS;

  const rawGoldValue = weightInTolas * currentRatePerTola;
  
  let totalMakingCharges = 0;
  if (makingType === 'percent') {
    totalMakingCharges = rawGoldValue * (makingValue / 100);
  } else {
    totalMakingCharges = weightInGrams * makingValue; // Flat rate per gram
  }

  const taxAmount = (rawGoldValue + totalMakingCharges) * (salesTaxPercent / 100);
  const grandTotal = rawGoldValue + totalMakingCharges + taxAmount;

  // Convert weight to other units
  const performWeightConversion = () => {
    // Standardize to Tolas first
    let tolas = 0;
    if (convertFrom === 'tolas') tolas = convertValue;
    else if (convertFrom === 'grams') tolas = convertValue / TOLA_TO_GRAMS;
    else if (convertFrom === 'mashas') tolas = convertValue / TOLA_TO_MASHAS;
    else if (convertFrom === 'rattis') tolas = convertValue / TOLA_TO_RATTIS;

    return {
      tolas: tolas.toFixed(4),
      grams: (tolas * TOLA_TO_GRAMS).toFixed(4),
      mashas: (tolas * TOLA_TO_MASHAS).toFixed(2),
      rattis: (tolas * TOLA_TO_RATTIS).toFixed(2)
    };
  };

  const convertedResults = performWeightConversion();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500">
          Gold Price & Unit Calculator
        </h1>
        <div className="w-20 h-0.5 bg-amber-500 mx-auto mt-4" />
        <p className="text-stone-400 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed">
          Estimate current fine gold metal costs instantly in line with the Rawalpindi Sarafa Market. Configure making costs and sales tax variables.
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mb-8 bg-stone-900 border border-stone-800 p-1.5 rounded-2xl flex">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex-1 py-3 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'calculator'
              ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/10'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Calculator className="w-4.5 h-4.5" /> Price Calculator
        </button>
        <button
          onClick={() => setActiveTab('converter')}
          className={`flex-1 py-3 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'converter'
              ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/10'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          <Scale className="w-4.5 h-4.5" /> Traditional Unit Converter
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {activeTab === 'calculator' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Input Form Column */}
            <div className="md:col-span-6 bg-stone-900 border border-stone-800 rounded-2xl p-6 space-y-5 shadow-xl">
              <h3 className="font-serif text-lg font-bold text-stone-200 flex items-center gap-2 border-b border-stone-800 pb-3">
                <FileText className="w-5 h-5 text-amber-400" /> Quotation Input
              </h3>

              {/* Weight Input */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-stone-400 tracking-wider flex justify-between">
                  <span>Gold Weight</span>
                  <span className="text-amber-400 font-bold">{weightUnit === 'tolas' ? `${weightInput} Tola` : `${weightInput} Gram`}</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0.001"
                    step="0.001"
                    value={weightInput}
                    onChange={(e) => setWeightInput(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="flex-grow bg-stone-950 border border-stone-800 hover:border-amber-500/35 focus:border-amber-400 focus:outline-none text-stone-100 text-sm p-3 rounded-xl transition-all font-mono"
                  />
                  <select
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value as 'tolas' | 'grams')}
                    className="bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-stone-300 text-sm px-4 rounded-xl font-mono"
                  >
                    <option value="tolas">Tolas</option>
                    <option value="grams">Grams</option>
                  </select>
                </div>
              </div>

              {/* Karat Selection */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-stone-400 tracking-wider block">
                  Select Purity (Karat)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[24, 22, 21, 18].map((k) => (
                    <button
                      key={k}
                      onClick={() => setSelectedKarat(k)}
                      className={`py-2.5 text-xs font-bold rounded-xl border font-mono transition-all cursor-pointer ${
                        selectedKarat === k
                          ? 'bg-amber-500/10 text-amber-400 border-amber-400'
                          : 'bg-stone-950 text-stone-400 border-stone-800 hover:text-stone-200'
                      }`}
                    >
                      {k}K Gold
                    </button>
                  ))}
                </div>
              </div>

              {/* Making Charges Config */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase font-mono text-stone-400 tracking-wider block">
                    Making Charges (Karighari)
                  </label>
                  <div className="flex gap-2 bg-stone-950 p-1 rounded-lg border border-stone-800">
                    <button
                      onClick={() => { setMakingType('percent'); setMakingValue(8); }}
                      className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer ${makingType === 'percent' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'}`}
                    >
                      Percentage %
                    </button>
                    <button
                      onClick={() => { setMakingType('flat'); setMakingValue(1500); }}
                      className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer ${makingType === 'flat' ? 'bg-amber-500 text-stone-950' : 'text-stone-400'}`}
                    >
                      Flat Rate (Rs/g)
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={makingValue}
                    onChange={(e) => setMakingValue(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-stone-100 text-sm p-3 rounded-xl transition-all font-mono"
                  />
                  <span className="text-sm font-semibold text-stone-400 w-16 text-center font-mono">
                    {makingType === 'percent' ? '%' : 'PKR/g'}
                  </span>
                </div>
              </div>

              {/* Local Sales Tax Config */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-stone-400 tracking-wider flex justify-between">
                  <span>Punjab Provincial Sales Tax</span>
                  <span className="font-mono text-stone-500">{salesTaxPercent}%</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={salesTaxPercent}
                  onChange={(e) => setSalesTaxPercent(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-stone-950 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Info Disclaimer */}
              <div className="bg-stone-950 p-3 rounded-xl border border-stone-850 flex items-start gap-2 text-stone-500">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-sans leading-relaxed">
                  Calculations based on Rawalpindi gold rate of <strong className="text-stone-400">Rs. {currentRatePerTola.toLocaleString()} / Tola</strong> for {selectedKarat}K gold. The official 24K pure gold rate is Rs. {GOLD_RATES.gold24k.toLocaleString()}.
                </p>
              </div>
            </div>

            {/* Receipt Invoice Print Column */}
            <div className="md:col-span-6 bg-stone-900 border border-amber-500/20 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between h-full">
              {/* Gold watermark accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full filter blur-3xl -mr-16 -mt-16 pointer-events-none" />

              <div className="space-y-6">
                <div className="text-center border-b border-dashed border-stone-800 pb-5">
                  <h4 className="font-serif text-xl font-bold tracking-widest text-amber-400 uppercase">
                    PATIALA JEWELLERS
                  </h4>
                  <p className="text-[10px] uppercase font-mono text-stone-500 tracking-widest mt-1">
                    Shop # 7, Parsi Market, Murree Rd, Rawalpindi
                  </p>
                  <p className="text-[10px] text-stone-500 font-mono mt-0.5">
                    Phone: (051) 5761435
                  </p>
                </div>

                {/* Estimate Bill Details */}
                <div className="space-y-3 font-mono text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Item Material:</span>
                    <span>{selectedKarat}K Gold Hallmark</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Gross Weight:</span>
                    <span>{weightInTolas.toFixed(3)} Tolas ({weightInGrams.toFixed(3)}g)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Karat Rate (per Tola):</span>
                    <span>Rs. {currentRatePerTola.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-dashed border-stone-800 my-4" />

                  <div className="flex justify-between">
                    <span className="text-stone-400">Gold Metal Cost:</span>
                    <span className="text-stone-100 font-bold">Rs. {Math.round(rawGoldValue).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-400">
                      Karighari Charges ({makingType === 'percent' ? `${makingValue}%` : `Rs.${makingValue}/g`}):
                    </span>
                    <span className="text-stone-100 font-bold">Rs. {Math.round(totalMakingCharges).toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-stone-400">Sales Tax / Provincial VAT ({salesTaxPercent}%):</span>
                    <span className="text-stone-100 font-bold">Rs. {Math.round(taxAmount).toLocaleString()}</span>
                  </div>

                  <div className="border-t border-dashed border-stone-800 my-4" />

                  <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-xl flex justify-between items-center">
                    <span className="font-serif text-sm font-bold text-stone-300">Total Estimated Cost:</span>
                    <span className="font-serif text-2xl font-black text-amber-400">
                      Rs. {Math.round(grandTotal).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Local validation stamp */}
                <div className="border-t border-dashed border-stone-800 pt-5 text-center text-[10px] text-stone-500 font-mono space-y-1">
                  <p className="flex items-center justify-center gap-1.5 uppercase tracking-wide font-semibold text-stone-400">
                    <Info className="w-3.5 h-3.5 text-amber-500" /> Estimates are Non-Binding
                  </p>
                  <p className="leading-relaxed">
                    Final billing determined upon live weighing and official market gold rates on the day of store deposit or purchase.
                  </p>
                </div>
              </div>

              {/* Action row */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-800">
                <button
                  onClick={handlePrint}
                  className="py-3 bg-stone-800 hover:bg-stone-750 text-stone-200 hover:text-white rounded-xl text-xs font-bold font-mono uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                  id="print-estimate"
                >
                  <Printer className="w-4 h-4" /> Print Invoice
                </button>
                <a
                  href={`https://wa.me/${RAW_STORE_INFO.whatsapp}?text=Hi%20Patiala%20Jewellers,%20I%20used%20your%20Gold%20Calculator%20and%20got%20this%20estimate:%20%0A-%20Gold:%20${selectedKarat}K%0A-%20Weight:%20${weightInTolas.toFixed(3)}%20Tolas%20(${weightInGrams.toFixed(2)}g)%0A-%20Est%20Total:%20Rs.%20${Math.round(grandTotal).toLocaleString()}%0APlease%20let%20me%20know%20if%20I%20can%20book%20a%20slot%20to%20place%20an%20order.`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 bg-emerald-750 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold font-mono uppercase text-center flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40"
                >
                  Book with Quote
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-6">
            <h3 className="font-serif text-xl font-bold text-stone-200 flex items-center gap-2 border-b border-stone-800 pb-3">
              <RefreshCw className="w-5 h-5 text-amber-400" /> Traditional Weight Converter
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-stone-400 tracking-wider block">Convert From</label>
                <select
                  value={convertFrom}
                  onChange={(e) => setConvertFrom(e.target.value as 'tolas' | 'grams' | 'mashas' | 'rattis')}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-stone-300 text-sm p-3.5 rounded-xl font-mono"
                >
                  <option value="tolas">Tolas</option>
                  <option value="grams">Grams</option>
                  <option value="mashas">Mashas</option>
                  <option value="rattis">Rattis</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-mono text-stone-400 tracking-wider block">Enter Amount</label>
                <input
                  type="number"
                  min="0.001"
                  step="0.01"
                  value={convertValue}
                  onChange={(e) => setConvertValue(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full bg-stone-950 border border-stone-800 focus:border-amber-400 focus:outline-none text-stone-100 text-sm p-3.5 rounded-xl font-mono"
                />
              </div>
            </div>

            {/* Conversion Result Grid */}
            <div className="bg-stone-950/70 border border-stone-800 rounded-2xl p-5 space-y-4 font-mono">
              <h4 className="text-stone-400 text-xs uppercase tracking-wider text-center pb-2 border-b border-stone-850">
                Conversion Results
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-stone-900/60 border border-stone-850 rounded-xl text-center">
                  <span className="text-[10px] uppercase text-stone-500">Tolas</span>
                  <span className="block text-xl font-black text-amber-300 mt-1">{convertedResults.tolas}</span>
                </div>
                <div className="p-4 bg-stone-900/60 border border-stone-850 rounded-xl text-center">
                  <span className="text-[10px] uppercase text-stone-500">Grams</span>
                  <span className="block text-xl font-black text-stone-100 mt-1">{convertedResults.grams}</span>
                </div>
                <div className="p-4 bg-stone-900/60 border border-stone-850 rounded-xl text-center">
                  <span className="text-[10px] uppercase text-stone-500">Mashas</span>
                  <span className="block text-xl font-black text-stone-100 mt-1">{convertedResults.mashas}</span>
                </div>
                <div className="p-4 bg-stone-900/60 border border-stone-850 rounded-xl text-center">
                  <span className="text-[10px] uppercase text-stone-500">Rattis</span>
                  <span className="block text-xl font-black text-stone-100 mt-1">{convertedResults.rattis}</span>
                </div>
              </div>

              <div className="bg-amber-500/5 p-3.5 rounded-xl border border-amber-400/20 text-xs leading-relaxed text-stone-400">
                <p className="font-sans font-medium flex items-center gap-1.5 text-amber-300">
                  <Scale className="w-4 h-4 shrink-0" /> South Asian Standard Sarafa Rule:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 font-sans text-[11px]">
                  <li>1 Tola = 11.664 Grams</li>
                  <li>1 Tola = 12 Mashas (Each Masha is ~0.97 grams)</li>
                  <li>1 Masha = 8 Rattis (Each Ratti is ~0.12 grams, hence 1 Tola = 96 Rattis)</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
