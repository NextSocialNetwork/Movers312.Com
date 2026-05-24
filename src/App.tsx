import { useState, useEffect } from 'react';
import { 
  Phone, Truck, Users, Shield, Clock, HelpCircle, Smartphone, 
  MapPin, Clipboard, ArrowRight, Star, HeartHandshake, CheckCircle2, 
  Calendar, Check, AlertTriangle, Sparkles, X, ChevronRight, Calculator
} from 'lucide-react';
import { Booking, HomeSizeKey, HOME_SIZES, PRICING } from './types';
import QuoteCalculator from './components/QuoteCalculator';
import BookingForm from './components/BookingForm';
import TrustBadges from './components/TrustBadges';
import MyBookings from './components/MyBookings';

export default function App() {
  // Navigation & Schedulers State
  const [viewState, setViewState] = useState<'calculator' | 'booking' | 'success'>('calculator');
  const [calculatedData, setCalculatedData] = useState<any>(null);
  const [newestBooking, setNewestBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Booking | null>(null);

  // Sync bookings from localStorage on mount
  useEffect(() => {
    refreshBookingsList();
  }, []);

  const refreshBookingsList = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('mega_moving_bookings') || '[]');
      setBookings(stored);
    } catch (e) {
      console.error("Failed to load local storage bookings", e);
    }
  };

  const handleCalculate = (data: any) => {
    setCalculatedData(data);
    setViewState('booking');
    // Scroll smoothly to checkout
    const wrapper = document.getElementById('booking-view-flow');
    if (wrapper) {
      wrapper.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingSuccess = (booking: Booking) => {
    setNewestBooking(booking);
    refreshBookingsList();
    setViewState('success');
    // Scroll up to Success card
    const target = document.getElementById('state-success-card');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoBackCalculator = () => {
    setViewState('calculator');
  };

  const handleResetWorkflow = () => {
    setCalculatedData(null);
    setNewestBooking(null);
    setViewState('calculator');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col font-sans select-none antialiased">
      
      {/* Upper Announcement Header */}
      <div className="bg-brand-charcoal text-white text-xs py-2 px-4 border-b border-white/5 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-slate-300">Movers dispatched daily throughout the Greater Chicago Area</span>
          </div>
          <div className="flex items-center gap-4 text-brand-gold">
            <span>Special Rate: <strong>$150/hr</strong> Flat rate including 16-Ft Box Truck</span>
            <span>•</span>
            <span className="font-bold flex items-center gap-1">
              <Phone className="w-3 h-3" /> Call: +1 (773) 335-5446
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">
          
          {/* Logo Brand container in Geometric Balance style */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-blue flex items-center justify-center text-white font-black text-xl rounded-none">
              M
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter uppercase text-slate-900">
                MEGA MOVING <span className="text-brand-blue">CHICAGO</span>
              </span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Professional Movers &amp; 16ft Box Truck</p>
            </div>
          </div>

          {/* Quick Info & Phone Actions */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Immediate Dispatch</span>
              <a 
                href="tel:+17733355446" 
                className="text-xl font-bold text-brand-blue tracking-tight hover:text-brand-cyan transition-colors"
              >
                +1 (773) 335-5446
              </a>
            </div>

            <a 
              href="tel:+17733355446"
              className="bg-slate-900 hover:bg-brand-blue text-white px-6 py-3.5 font-bold text-xs uppercase tracking-wider transition-colors hover:scale-[1.01] active:scale-[0.99]"
            >
              Book Now
            </a>
          </div>

        </div>
      </header>

      {/* Interactive Hero Intro Banner Block under Geometric Balance Theme */}
      <section className="relative bg-white border-b border-slate-200 py-16 sm:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Promo Left Panel with geometric typography style */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-block bg-blue-100 text-brand-blue px-4 py-1 rounded-none text-xs font-bold uppercase tracking-widest">
                Serving All Chicago Neighborhoods
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter text-slate-900">
                STRESS-FREE<br />
                <span className="text-brand-blue">PROFESSIONAL</span><br />
                RELOCATION.
              </h1>

              <p className="text-slate-500 text-sm sm:text-base max-w-xl leading-relaxed">
                Includes two professional Chicago movers and a fully equipped 16-foot box truck to safely transport your home or team. Transparent, clean hourly rate with a three hours minimum request.
              </p>

              {/* Geometric Balance stats grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div className="bg-white p-6 border-l-4 border-brand-blue shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Flat Hourly Rate</p>
                  <p className="text-4xl font-black text-slate-900">
                    $150<span className="text-lg font-medium text-slate-400">/hr</span>
                  </p>
                  <p className="text-sm text-slate-500 mt-2">All-inclusive pricing. Zero hidden surcharges.</p>
                </div>
                <div className="bg-white p-6 border-l-4 border-slate-900 shadow-sm">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Minimum Requirement</p>
                  <p className="text-4xl font-black text-slate-900">
                    3 <span className="text-lg font-medium text-slate-400">Hours</span>
                  </p>
                  <p className="text-sm text-slate-500 mt-2">Base package for maximum local value.</p>
                </div>
              </div>

              {/* Core Features bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="text-brand-blue font-bold font-mono text-sm">01</span>
                  <div className="text-xs">
                    <strong className="block text-slate-800 font-bold">Movers Included</strong>
                    <span className="text-slate-500">Professional 2-man crew</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-brand-blue font-bold font-mono text-sm">02</span>
                  <div className="text-xs">
                    <strong className="block text-slate-800 font-bold">16&apos; Box Truck Included</strong>
                    <span className="text-slate-500">Fully fueled for transit</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-brand-blue font-bold font-mono text-sm">03</span>
                  <div className="text-xs">
                    <strong className="block text-slate-800 font-bold">Protection Gear</strong>
                    <span className="text-slate-500">Blankets, straps, dollies included</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Premium Photo Grid in sharp Geometric container */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-none overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group">
                <img 
                  src="/src/assets/images/chicago_moving_truck_1779593354510.png"
                  alt="Mega Moving Chicago 16 Foot Box Truck and Movers"
                  referrerPolicy="no-referrer"
                  className="w-full h-72 sm:h-96 object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/35 to-transparent"></div>
                
                {/* Visual Label */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 text-slate-900 p-4 rounded-none border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-brand-blue font-black uppercase tracking-widest block">Operational Vehicle</span>
                    <h3 className="font-extrabold text-sm text-slate-900">Custom 16-Ft Box Truck fleet</h3>
                    <p className="text-[11px] text-slate-500">Perfect for narrow Chicago gridlocks</p>
                  </div>
                  <span className="text-xl font-bold text-brand-blue">$150/hr</span>
                </div>
              </div>

              {/* Background solid geometric accents */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-48 h-48 bg-slate-100 border border-slate-200 pointer-events-none"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Dynamic Booking Schedulers Block */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16 flex-1" id="booking-view-flow">
        
        {/* Dynamic State Layout Render */}
        <div className="space-y-4">
          
          {viewState === 'calculator' && (
            <div className="space-y-8 animate-fade-in duration-300">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-brand-charcoal">
                  Calculate Your Moving Investment Instantly
                </h2>
                <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
                  Simple slider controls to view accurate costs for your move. No passwords, no generic quotes. 
                </p>
              </div>

              <QuoteCalculator onCalculate={handleCalculate} />
            </div>
          )}

          {viewState === 'booking' && calculatedData && (
            <div className="space-y-4 animate-fade-in duration-300">
              <BookingForm 
                calculatedData={calculatedData} 
                onBack={handleGoBackCalculator} 
                onBookingSuccess={handleBookingSuccess} 
              />
            </div>
          )}

          {viewState === 'success' && newestBooking && (
            <div className="bg-white rounded-none border border-slate-300 p-8 sm:p-12 max-w-3xl mx-auto space-y-8 text-center" id="state-success-card">
              <div className="bg-emerald-50 text-emerald-600 w-16 h-16 rounded-none flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-3 font-mono">
                <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1.5 rounded-none border border-emerald-200 uppercase tracking-widest">
                  Quote Inquiry Submitted
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight font-display">Your Estimated Rate is Locked!</h3>
                <p className="text-slate-500 text-xs max-w-md mx-auto">
                  Thank you, <strong className="text-slate-800">{newestBooking.fullName}</strong>. Your moving rate has been reserved under Inquiry ID: <strong className="font-mono text-brand-blue">{newestBooking.id}</strong>.
                </p>
              </div>

              {/* Direct Call Recommendation Panel */}
              <div className="bg-slate-900 text-white rounded-none p-6 border border-slate-800 space-y-4 max-w-lg mx-auto shadow-sm font-mono text-left">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase text-brand-gold font-bold tracking-widest">Immediate Confirmation Plan</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-100">Call Direct Office Line to Finalize Dispatch</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed uppercase mt-1">We reserve crew routes on a first-call basis. Mention inquiry ID <strong>{newestBooking.id}</strong> to confirm your slot immediately.</p>
                </div>

                <a 
                  href="tel:+17733355446"
                  className="w-full block text-center bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3.5 px-5 rounded-none text-xs uppercase tracking-wider cursor-pointer"
                >
                  <Phone className="w-4 h-4 inline mr-2 align-middle" />
                  <span>Call: +1 (773) 335-5446</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
                <div className="text-slate-500 text-left space-y-1">
                  <p>• Reserved Date: <strong className="text-slate-800">{newestBooking.movingDate}</strong></p>
                  <p>• Recommended Hours: <strong className="text-slate-800">{newestBooking.estimatedHours} hours</strong></p>
                  <p>• Cost Projection: <strong className="text-slate-800">${newestBooking.totalCost}</strong></p>
                </div>
                <button
                  type="button"
                  onClick={handleResetWorkflow}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-5 py-3 rounded-none border border-slate-300 transition-colors cursor-pointer text-xs uppercase tracking-wider"
                >
                  Create Another Quote Estimate
                </button>
              </div>
            </div>
          )}

        </div>

        {/* User Bookings Section */}
        {bookings.length > 0 && (
          <div className="border-t border-slate-200/80 pt-12 space-y-6">
            <MyBookings 
              bookings={bookings} 
              onRefresh={refreshBookingsList} 
              onSelectBooking={(inq) => setSelectedInquiry(inq)}
            />
          </div>
        )}

        {/* Trust factors, equipment inclusions and neighborhoods map representation */}
        <div className="border-t border-slate-200 pb-4"></div>
        <TrustBadges />

        {/* Frequently Asked Questions */}
        <section className="bg-white rounded-none p-8 sm:p-12 border border-slate-300 space-y-10" id="faq-section">
          <div className="text-center max-w-xl mx-auto space-y-3 font-mono">
            <HelpCircle className="w-8 h-8 text-brand-blue mx-auto mb-2" />
            <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight font-display">Frequently Asked Chicago Move Questions</h3>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Everything you should know about hiring our truck and crew</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
            <div className="space-y-2 border-l-2 border-slate-200 pl-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide">Is the 16 ft Box Truck truly included in the $150 hourly price?</h4>
              <p className="text-slate-500 leading-relaxed font-sans">
                Yes, absolutely! The $150 per hour rate includes the entire 16-foot box truck as well as 2 hardworking professional movers. There is no sneaky sub-rent or secondary fuel billing.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-slate-200 pl-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide">What does the 3-hour minimum reference?</h4>
              <p className="text-slate-500 leading-relaxed font-sans">
                We maintain an absolute 3-hour minimum ($450 total base investment) to dispatch our high-performance vehicles and certified crews. This ensures we can cover standard logistics, safe transport packing, travel prep, and basic operational overhead.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-slate-200 pl-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide">Do you charge extra for stairs or heavy appliances?</h4>
              <p className="text-slate-500 leading-relaxed font-sans">
                We do not charge extra fees for carrying items up standard residential apartment staircases or using freight elevators. All physical labor is included under the $150/hr rate. Note: Extremely bulky items over 300 lbs (such as upright pianos or heavy safes) must be reported to phone operations first to verify weight limits.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-slate-200 pl-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide">Are my items insured and protected during transfer?</h4>
              <p className="text-slate-500 leading-relaxed font-sans">
                Yes, Mega Moving is a fully licensed, bonded, and insured moving carrier inside the state of Illinois. We take immense care of your prized belongings, blanket-wrapping items and securing cargo within the truck using robust logistics straps.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Area */}
      <footer className="bg-brand-charcoal text-white border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/10 text-sm">
            
            <div className="space-y-3">
              <span className="text-lg font-black tracking-widest text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-brand-gold" />
                MEGA MOVING
              </span>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Chicago&apos;s premier boutique moving crew. Offering professional 16-foot box truck operations combined with licensed local muscle, customized specifically for narrow neighborhood transits.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-brand-gold uppercase tracking-wider">Fast Contact Direct</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <a href="tel:+17733355446" className="font-bold hover:text-white transition-colors">+1 (773) 335-5446</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-brand-cyan">📍</span>
                  <span>Cook County / Chicago, IL</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span>⏰</span>
                  <span>Daily Dispatch: 7:00 AM - 9:00 PM</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-brand-gold uppercase tracking-wider">Fully Vetted &amp; Compliant</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mega Moving Chicago operates legally under Illinois ICC regulations. Moving blanket wrap protection, tools, dollies, cargo straps, and 16-foot high-capacity vehicle come standard with every dispatch.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <span className="bg-white/5 px-2.5 py-1 rounded text-[10px] font-bold text-slate-300 border border-white/15 uppercase">
                  ICC Compliant
                </span>
                <span className="bg-white/5 px-2.5 py-1 rounded text-[10px] font-bold text-slate-300 border border-white/15 uppercase">
                  Insured Car
                </span>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Mega Moving Chicago. All Rights Reserved.</p>
            <p>Call hotline at <a href="tel:+17733355446" className="text-brand-cyan underline hover:text-white">+17733355446</a> to schedule your crew instantly.</p>
          </div>

        </div>
      </footer>

      {/* Inquiry detail viewer popup (For items in bookings bar) */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-[#0f172ab3] backdrop-blur-none flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-none overflow-hidden border border-slate-300 flex flex-col justify-between font-mono shadow-2xl">
            
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center border-b border-slate-800">
              <div>
                <span className="text-[9px] uppercase font-bold text-brand-gold tracking-widest">Inquiry Dispatch Archive</span>
                <h4 className="font-extrabold text-xs flex items-center gap-1.5 uppercase mt-0.5">
                  ID: <span className="text-brand-blue">{selectedInquiry.id}</span>
                </h4>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded-none transition-colors cursor-pointer"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-mono">
              
              <div className="border-b border-slate-200 pb-3">
                <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider">Customer Contact</span>
                <p className="font-black text-slate-900 text-xs mt-1 uppercase tracking-wider">{selectedInquiry.fullName}</p>
                <p className="text-slate-500 mt-1">{selectedInquiry.phone} • {selectedInquiry.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider">Moving Date</span>
                  <p className="font-bold text-slate-900 mt-1">{selectedInquiry.movingDate}</p>
                  <p className="text-slate-500 mt-0.5">{selectedInquiry.movingTime}</p>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider">Home / Cargo Style</span>
                  <p className="font-bold text-slate-900 mt-1 select-none">
                    {HOME_SIZES[selectedInquiry.homeSize]?.label || selectedInquiry.homeSize}
                  </p>
                  <p className="text-slate-500 mt-0.5">Fits in 16-Foot Box Truck</p>
                </div>
              </div>

              <div className="border-b border-slate-200 pb-3">
                <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider">Transit Details</span>
                <p className="text-slate-700 font-medium mt-1 uppercase text-[11px] leading-snug">
                  <strong>Start:</strong> {selectedInquiry.fromAddress}
                </p>
                <p className="text-slate-700 font-medium mt-1 uppercase text-[11px] leading-snug">
                  <strong>Stop:</strong> {selectedInquiry.toAddress}
                </p>
              </div>

              {selectedInquiry.notes && (
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider">Special Notes</span>
                  <p className="text-slate-600 mt-1 leading-relaxed bg-slate-50 p-3 border-l-2 border-slate-400 text-[10px] block">
                    &ldquo;{selectedInquiry.notes}&rdquo;
                  </p>
                </div>
              )}

              <div className="bg-brand-charcoal text-white p-4 rounded-none flex justify-between items-center">
                <div>
                  <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider">Hourly Rate &amp; Duration</span>
                  <span className="font-bold text-[11px] text-brand-gold">
                    ${150 + (selectedInquiry.extraMoversCount * 50)}/hr for {selectedInquiry.estimatedHours} hrs
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 uppercase font-bold block tracking-wider">Estimated Cost</span>
                  <span className="text-xl font-black text-white">${selectedInquiry.totalCost}</span>
                </div>
              </div>

              <div className="bg-amber-50 p-3 border border-slate-200 border-l-4 border-amber-500 space-y-2 text-amber-900">
                <p className="font-bold text-[10px] flex items-center gap-1 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  What happens next?
                </p>
                <p className="text-[10px] leading-normal text-amber-800 uppercase">
                  This inquiry is loaded under dispatch status <strong>Awaiting Call</strong>. To assign crew resources and standard transit routes, dial the direct office line right away or click call button.
                </p>
              </div>

            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-3">
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="flex-1 bg-white hover:bg-slate-100 text-slate-700 font-bold py-3 text-center border border-slate-300 rounded-none cursor-pointer text-xs uppercase tracking-wider"
                type="button"
              >
                Close View
              </button>
              <a 
                href="tel:+17733355446"
                className="flex-1 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3 text-center rounded-none flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
