import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin, Clock, Calendar, ShieldCheck, Ticket, Check, Copy } from 'lucide-react';
import { RAW_STORE_INFO } from '../data';
import { Appointment } from '../types';

export default function Contact() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('1:00 PM');
  const [serviceType, setServiceType] = useState<'bridal_consult' | 'custom_design' | 'gold_buy_sell' | 'valuation'>('bridal_consult');
  const [notes, setNotes] = useState('');

  // Active Confirmed Appointment
  const [confirmedTicket, setConfirmedTicket] = useState<Appointment | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('patiala_appointments');
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) return;

    const newAppointment: Appointment = {
      id: `PJ-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      phone,
      date,
      timeSlot,
      serviceType,
      notes
    };

    const updated = [newAppointment, ...appointments];
    setAppointments(updated);
    localStorage.setItem('patiala_appointments', JSON.stringify(updated));
    setConfirmedTicket(newAppointment);

    // Reset Form fields
    setName('');
    setPhone('');
    setDate('');
    setNotes('');
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getServiceLabel = (type: string) => {
    switch (type) {
      case 'bridal_consult': return 'Bridal Jewelry Selection';
      case 'custom_design': return 'Bespoke Custom Designing';
      case 'gold_buy_sell': return 'Gold Trade & Exchange';
      case 'valuation': return 'Authentic Metal Valuation';
      default: return 'Jewelry Consultation';
    }
  };

  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500">
            Visit Our Showroom & Booking
          </h1>
          <div className="w-20 h-0.5 bg-amber-500 mx-auto mt-4" />
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Located in the historic Parsi Market off Murree Road, Rawalpindi. Book an appointment below to ensure dedicated, private consultation during wedding season.
          </p>
        </div>

        {/* Store Info & Maps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Map Card */}
          <div className="lg:col-span-5 bg-stone-900 border border-stone-850 p-6 rounded-2xl space-y-6 shadow-xl">
            <h3 className="font-serif text-xl font-bold text-amber-400">Patiala Showroom Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 animate-bounce" />
                <div>
                  <h4 className="font-semibold text-stone-200 text-sm sm:text-base">Our Address</h4>
                  <p className="text-stone-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Shop # 7, Parsi market, Murree Rd, Mohalla, Rawalpindi, 46000
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-200 text-sm sm:text-base">Phone Contacts</h4>
                  <p className="text-stone-400 text-xs sm:text-sm mt-0.5">
                    Showroom: <a href={`tel:${RAW_STORE_INFO.phone}`} className="text-amber-400 font-mono font-medium hover:underline">{RAW_STORE_INFO.phone}</a>
                  </p>
                  <p className="text-stone-400 text-xs sm:text-sm">
                    WhatsApp: <a href={`https://wa.me/${RAW_STORE_INFO.whatsapp}`} target="_blank" rel="noreferrer" className="text-emerald-400 font-mono font-medium hover:underline">{RAW_STORE_INFO.whatsappFormatted}</a>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-stone-200 text-sm sm:text-base">Business Hours</h4>
                  <p className="text-stone-400 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Monday - Saturday: {RAW_STORE_INFO.hours.open} - {RAW_STORE_INFO.hours.close}<br />
                    <span className="text-rose-400 font-medium">Sunday: Closed</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Custom Vector Handcrafted Map */}
            <div className="space-y-2">
              <h4 className="font-serif text-stone-300 text-xs sm:text-sm font-semibold">Local Sarafa Map Guild</h4>
              <div className="h-64 rounded-xl border border-stone-800 bg-stone-950 p-4 relative overflow-hidden flex flex-col justify-between">
                {/* SVG/CSS Map Layout */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Roads */}
                <div className="absolute top-1/2 left-0 right-0 h-8 bg-stone-900 border-y border-stone-800 flex items-center justify-center">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-stone-500 font-bold">Murree Road (Rawalpindi Main Arterial)</span>
                </div>
                <div className="absolute top-0 bottom-0 left-[60%] w-6 bg-stone-900 border-x border-stone-800 flex items-center justify-center">
                  <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-stone-500 font-bold rotate-90 whitespace-nowrap">Parsi Market Road</span>
                </div>

                {/* Metro Station Icon Placeholder */}
                <div className="absolute top-10 left-10 p-2 rounded bg-stone-900 border border-stone-800 text-[8px] font-mono uppercase tracking-wider text-stone-500">
                  🚈 Committee Chowk Metro
                </div>

                {/* Patiala Jewellers Marker */}
                <div className="absolute top-1/3 left-[65%] z-10 flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-stone-950 shadow-lg shadow-amber-500 animate-pulse" />
                  <div className="bg-stone-900 border border-amber-500/55 p-1 px-2.5 rounded text-[10px] font-serif font-black text-amber-400 tracking-wider shadow-xl mt-1.5 whitespace-nowrap">
                    Patiala Jewellers (Shop 7)
                  </div>
                </div>

                {/* Map Directions Button link */}
                <div className="relative z-10 mt-auto w-full">
                  <a
                    href="https://maps.app.goo.gl/YVMyH7C2HBy8pL7S7"
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center py-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white rounded-lg text-[10px] font-mono uppercase tracking-widest transition-colors"
                  >
                    Open Google Maps Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Booker Column */}
          <div className="lg:col-span-7 space-y-6">
            {!confirmedTicket ? (
              <form
                onSubmit={handleBookAppointment}
                className="bg-stone-900 border border-stone-850 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl"
                id="appointment-form"
              >
                <div className="border-b border-stone-800 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-stone-200">Book Dedicated Consultation</h3>
                  <p className="text-stone-400 text-xs sm:text-sm mt-1">
                    Reserve an exclusive slot with our head jewelry design consultant.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-400 block">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mariam Nawaz"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-850 hover:border-amber-500/25 focus:border-amber-400 focus:outline-none text-stone-100 text-sm p-3 rounded-xl transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-400 block">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0300-5761435"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-850 hover:border-amber-500/25 focus:border-amber-400 focus:outline-none text-stone-100 text-sm p-3 rounded-xl transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-400 block flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" /> Appointment Date
                    </label>
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-850 hover:border-amber-500/25 focus:border-amber-400 focus:outline-none text-stone-100 text-sm p-3 rounded-xl transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase text-stone-400 block">Preferred Time Slot</label>
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-850 focus:border-amber-400 focus:outline-none text-stone-300 text-sm p-3.5 rounded-xl font-mono"
                    >
                      <option value="11:30 AM">11:30 AM (Morning)</option>
                      <option value="1:00 PM">1:00 PM (Afternoon)</option>
                      <option value="3:00 PM">3:00 PM (Afternoon)</option>
                      <option value="5:00 PM">5:00 PM (Evening)</option>
                      <option value="7:00 PM">7:00 PM (Evening)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-stone-400 block">Consultation Category</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value as any)}
                    className="w-full bg-stone-950 border border-stone-850 focus:border-amber-400 focus:outline-none text-stone-300 text-sm p-3.5 rounded-xl font-sans"
                  >
                    <option value="bridal_consult">Bridal Sets Selection (Necklace, Jhumkas, Tikka)</option>
                    <option value="custom_design">Bespoke Jewelry Customization (Your raw gold or design sketches)</option>
                    <option value="gold_buy_sell">Gold Scrap Exchange / Safe Trades</option>
                    <option value="valuation">Official Lab Valuation & Purity Appraisal Reports</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase text-stone-400 block">Special Design Requests / Notes (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Describe any weight preferences in Tolas, matching dress colors, or budget limits..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-850 hover:border-amber-500/25 focus:border-amber-400 focus:outline-none text-stone-100 text-sm p-3 rounded-xl transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold rounded-xl text-sm sm:text-base tracking-wide shadow-lg shadow-amber-500/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  id="book-btn"
                >
                  <Calendar className="w-5 h-5" /> Book Showroom Appointment
                </button>

                <p className="text-[10px] text-stone-500 leading-relaxed text-center flex items-center justify-center gap-1 uppercase font-mono mt-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" /> Verified booking slot. No consultation fee.
                </p>
              </form>
            ) : (
              /* Royal Confirmed VIP Ticket Card */
              <div className="bg-gradient-to-br from-stone-900 to-amber-950/20 border-2 border-amber-500/35 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden" id="confirmed-ticket">
                {/* Visual tickets cutouts */}
                <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-stone-950 border-r border-amber-500/30 transform -translate-y-1/2" />
                <div className="absolute top-1/2 -right-4 w-8 h-8 rounded-full bg-stone-950 border-l border-amber-500/30 transform -translate-y-1/2" />

                <div className="text-center space-y-2 border-b border-dashed border-stone-800 pb-5">
                  <Ticket className="w-10 h-10 text-amber-400 mx-auto animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">Showroom Booking Ticket</span>
                  <h3 className="font-serif text-2xl font-black text-stone-100 tracking-tight">Appointment Confirmed</h3>
                  <p className="text-stone-400 text-xs font-sans">
                    Welcome, {confirmedTicket.name}. Your VIP consultation is safely cataloged.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 font-mono text-xs text-stone-300">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-stone-500 uppercase block">Booking ID</span>
                    <span className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      {confirmedTicket.id}
                      <button
                        onClick={() => handleCopyCode(confirmedTicket.id)}
                        className="text-stone-400 hover:text-white"
                        title="Copy Code"
                      >
                        {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </span>
                  </div>
                  <div className="space-y-0.5 text-right">
                    <span className="text-[10px] text-stone-500 uppercase block">Consultation Type</span>
                    <span className="text-xs text-stone-200 font-sans font-semibold">{getServiceLabel(confirmedTicket.serviceType)}</span>
                  </div>
                  <div className="space-y-0.5 pt-3 border-t border-stone-850">
                    <span className="text-[10px] text-stone-500 uppercase block">Scheduled Date</span>
                    <span className="text-xs text-stone-200 font-bold">{confirmedTicket.date}</span>
                  </div>
                  <div className="space-y-0.5 pt-3 border-t border-stone-850 text-right">
                    <span className="text-[10px] text-stone-500 uppercase block">Scheduled Time</span>
                    <span className="text-xs text-stone-200 font-bold">{confirmedTicket.timeSlot}</span>
                  </div>
                </div>

                {confirmedTicket.notes && (
                  <div className="bg-stone-950 p-3 rounded-xl border border-stone-850 text-xs font-sans text-stone-400 italic">
                    <strong className="text-stone-300 font-mono text-[10px] uppercase block tracking-wider not-italic mb-1">Your notes:</strong>
                    "{confirmedTicket.notes}"
                  </div>
                )}

                <div className="border-t border-dashed border-stone-800 pt-5 text-center space-y-4">
                  <div className="text-[10px] text-stone-400 font-sans leading-relaxed">
                    Please display this booking card or state code <strong className="text-amber-300">{confirmedTicket.id}</strong> at Shop # 7, Parsi Market on the specified hour.
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmedTicket(null)}
                      className="flex-1 py-3 bg-stone-800 hover:bg-stone-750 text-stone-200 hover:text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
                    >
                      Book Another
                    </button>
                    <a
                      href={`https://wa.me/${RAW_STORE_INFO.whatsapp}?text=Hi%20Patiala%20Jewellers,%20I%20have%20booked%20an%20appointment!%20%0A-%20Name:%20${encodeURIComponent(confirmedTicket.name)}%0A-%20Booking%20ID:%20${confirmedTicket.id}%0A-%20Date:%20${confirmedTicket.date}%0A-%20Time:%20${confirmedTicket.timeSlot}%0A-%20Type:%20${getServiceLabel(confirmedTicket.serviceType)}.%20Please%20verify%20on%20your%20end.%20Thanks!`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 bg-emerald-700 hover:bg-emerald-650 text-white rounded-xl text-xs font-bold uppercase text-center flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40"
                    >
                      <MessageSquare className="w-4 h-4 fill-current" /> Confirm on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
