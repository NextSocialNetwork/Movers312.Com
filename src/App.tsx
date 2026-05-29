import { useState, useEffect } from 'react';
import { 
  Phone, Truck, Users, Shield, Clock, HelpCircle, Smartphone, 
  MapPin, Clipboard, ArrowRight, Star, HeartHandshake, CheckCircle2, 
  Calendar, Check, AlertTriangle, Sparkles, X, ChevronRight, Calculator,
  Mail, ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking, HomeSizeKey, HOME_SIZES, PRICING } from './types';
import QuoteCalculator from './components/QuoteCalculator';
import BookingForm from './components/BookingForm';
import TrustBadges from './components/TrustBadges';
import MyBookings from './components/MyBookings';
import movers312LakeShore from './assets/images/movers312_lakeshore_consistent_1780071960903.png';
import movers312LoopText from './assets/images/movers312_loop_consistent_1780071977428.png';
import movers312SkylineContainers from './assets/images/movers312_containers_consistent_1780071990411.png';
import movers312WackerSkyline from './assets/images/movers312_wacker_consistent_1780072003354.png';
import movers312Logo from './assets/images/movers312_logo_1780068471801.png';

const SLIDES = [
  {
    image: movers312LakeShore,
    tag: "Lakefront Route",
    title: "Lake Shore Drive Scenic Transit",
    desc: "Our professional Ford F-350 fleet box truck cruising along scenic Lake Michigan under beautiful clear Chicago skies.",
    accent: "Rapid Dispatch"
  },
  {
    image: movers312LoopText,
    tag: "Downtown Route",
    title: "LaSalle Street Canyon Transport",
    desc: "High-capacity commercial moving vehicles navigating the historic Chicago Loop financial district with pride.",
    accent: "Urban Mastery"
  },
  {
    image: movers312SkylineContainers,
    tag: "Logistics Hub",
    title: "Southside Container Yard Dispatch",
    desc: "Robust industrial hauling and secure logistics handling from major Cook County cargo distribution terminals.",
    accent: "Secure Cargo"
  },
  {
    image: movers312WackerSkyline,
    tag: "Skyline Route",
    title: "Wacker Drive Fleet Logistics",
    desc: "Precision navigation across Wacker Drive and Franklin Street for seamless, high-volume residential relocations.",
    accent: "Elite Transit"
  }
];

export default function App() {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

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
      
      {/* Upper Announcement Header - Upgraded to elegant premium bar */}
      <div className="bg-[#0f172a] text-white text-xs py-2.5 px-4 shadow-sm font-medium font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300 uppercase tracking-widest text-[9px] font-bold">Dispatch Operations Active Daily</span>
          </div>
          <div className="flex items-center gap-4 text-amber-400 uppercase text-[9px] tracking-widest font-bold">
            <span>Special Rate: <strong className="text-white font-black">$150/hr</strong></span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-white bg-white/10 px-2.5 py-1 rounded-md border border-white/5">
              <Phone className="w-3 h-3 text-brand-cyan" /> +1 (312) 385-9229
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Upgraded to sleek high-contrast sticky glass header */}
      <header className="sticky top-0 z-40 bg-white/80 text-[#0f172a] border-b border-slate-100 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          
          {/* Logo Brand container with sleek typography details */}
          <div className="flex items-center gap-3">
            <img 
              src={movers312Logo} 
              alt="Movers312 Logo" 
              className="w-[115px] h-[80px] object-contain hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-slate-900">
                Movers312<span className="text-brand-blue font-extrabold">.Com</span>
              </span>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 font-mono">Professional Movers &amp; 16ft Box Truck</p>
            </div>
          </div>

          {/* Quick Info & Phone Actions */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex flex-col text-right font-mono">
              <span className="text-[9px] uppercase tracking-widest text-[#2563eb] font-extrabold">Immediate Routing</span>
              <a 
                href="tel:+13123859229" 
                className="text-base font-bold text-slate-900 tracking-tight hover:text-brand-blue transition-colors"
              >
                +1 (312) 385-9229
              </a>
              <a 
                href="mailto:Movers312.Com@Gmail.Com"
                className="text-[9px] uppercase font-bold text-slate-400 hover:text-amber-500 transition-colors mt-0.5 tracking-wider flex items-center justify-end gap-1 font-semibold"
              >
                <Mail className="w-2.5 h-2.5 text-[#2563eb]" />
                <span>Movers312.Com@Gmail.Com</span>
              </a>
            </div>

            <a 
              href="tel:+13123859229"
              className="td-btn-gold py-3 px-6 text-xs uppercase font-bold shadow-md relative"
            >
              Book Now
            </a>
          </div>

        </div>
      </header>

      {/* Interactive Hero Intro Banner Block - Upgraded to elegant dotted layout */}
      <section className="relative bg-white dot-grid-pattern border-b border-slate-150 py-16 sm:py-24 overflow-hidden">
        
        {/* Soft background glow accents */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-sky-100/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Promo Left Panel with premium high-contrast typography and layout balance */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="inline-flex items-center gap-1.5 bg-[#0f172a] text-amber-400 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-widest shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Serving All Chicago Neighborhoods
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tighter text-slate-900 uppercase font-display">
                STRESS-FREE<br />
                <span className="text-[#2563eb]">PROFESSIONAL</span><br />
                RELOCATION.
              </h1>

              <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
                Includes two professional Chicago movers and a fully equipped 16-foot box truck to safely transport your home or team. Transparent, clean hourly rate with a three hours minimum request.
              </p>

              {/* Dynamic modernized stats cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                <div className="td-card p-6 flex flex-col justify-between bg-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/40 rounded-full blur-xl group-hover:scale-125 transition-all duration-500"></div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-brand-blue font-mono mb-1 tracking-wider">Flat Hourly Rate</p>
                    <p className="text-4.5xl font-black text-slate-900 font-display flex items-baseline">
                      $150<span className="text-sm font-medium text-slate-400 ml-1 font-mono">/hr</span>
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 font-mono">All-inclusive pricing. Zero hidden surcharges.</p>
                </div>
                
                <div className="td-card p-6 flex flex-col justify-between bg-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50/40 rounded-full blur-xl group-hover:scale-125 transition-all duration-500"></div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-amber-500 font-mono mb-1 tracking-wider">Minimum Requirement</p>
                    <p className="text-4.5xl font-black text-slate-900 font-display flex items-baseline">
                      3 <span className="text-sm font-medium text-slate-400 ml-1 font-mono">Hours</span>
                    </p>
                  </div>
                  <p className="text-xs text-slate-400 mt-3 font-mono">Base package for maximum local value.</p>
                </div>
              </div>

              {/* Core Features bullets - clean lines */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-[#2563eb] font-extrabold text-sm bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">01</span>
                  <div className="text-[11px] uppercase tracking-wider">
                    <strong className="block text-slate-905 font-bold">Movers</strong>
                    <span className="text-slate-400 text-[10px]">Professional 2-man crew</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#2563eb] font-extrabold text-sm bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">02</span>
                  <div className="text-[11px] uppercase tracking-wider">
                    <strong className="block text-slate-905 font-bold">16&apos; Box Truck</strong>
                    <span className="text-slate-400 text-[10px]">Fully fueled for transit</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#2563eb] font-extrabold text-sm bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">03</span>
                  <div className="text-[11px] uppercase tracking-wider">
                    <strong className="block text-slate-905 font-bold">Protection</strong>
                    <span className="text-slate-400 text-[10px]">Wraps, straps &amp; dollies</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Premium Photo Slider - Styled Up to Majestic Modern Heights with Glass Effects */}
            <div className="lg:col-span-5 relative" id="photo-slider-container">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-900 group h-[30rem] sm:h-[34rem] shadow-2xl shadow-blue-900/10 transition-all duration-300">
                
                {/* Dynamic Timer Countdown Indicator (Linear fill countdown over 5.5s) */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
                  <motion.div
                    key={currentSlide}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5.5, ease: "linear" }}
                    className="h-full bg-brand-blue shadow-[0_0_8px_#2563eb]"
                  />
                </div>

                {/* Custom Branded Business Graphic Overlay Badge */}
                <div className="absolute top-4 left-4 z-30 bg-slate-950/85 backdrop-blur-md border border-white/10 px-4 py-3.5 rounded-xl shadow-xl flex items-center gap-3 select-none">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/5 shadow-md shrink-0">
                    <img 
                      src={movers312Logo} 
                      alt="Movers312 Mini Logo" 
                      className="w-8 h-8 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="text-left font-mono">
                    <div className="text-[11px] font-black text-white tracking-widest uppercase flex items-center gap-1.5 leading-none">
                      <Sparkles className="w-3 h-3 text-amber-400 fill-amber-400" />
                      Movers312
                    </div>
                    <div className="text-[10px] text-slate-300 font-bold mt-1 tracking-tight flex items-center gap-1.5 leading-none">
                      <Phone className="w-3 h-3 text-emerald-400" />
                      Phone: +13123859229
                    </div>
                    <div className="text-[9.5px] text-[#3b82f6] hover:text-[#60a5fa] font-bold mt-1 tracking-tight flex items-center gap-1.5 leading-none">
                      <Truck className="w-3 h-3 text-blue-400" />
                      www.Movers312.Com
                    </div>
                  </div>
                </div>

                {/* Image Transition Layer with AnimatePresence */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      src={SLIDES[currentSlide].image}
                      alt={SLIDES[currentSlide].title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover select-none pointer-events-none filter brightness-95" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right Overlaid Chevron Controls - Sleek modern glass look */}
                <button
                  type="button"
                  id="prev-slide-btn"
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-brand-blue hover:text-white hover:scale-110 active:scale-90 text-slate-800 p-3 rounded-full border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-md z-30 flex items-center justify-center h-11 w-11"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  id="next-slide-btn"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-brand-blue hover:text-white hover:scale-110 active:scale-90 text-slate-800 p-3 rounded-full border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer backdrop-blur-md z-30 flex items-center justify-center h-11 w-11"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bottom Pill Pagination Indicators */}
                <div className="absolute bottom-28 left-6 flex items-center gap-1.5 z-20">
                  {SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      id={`slide-dot-${idx}`}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlide ? 'w-8 bg-brand-blue shadow-[0_0_6px_rgba(37,99,235,0.7)]' : 'w-2.5 bg-white/40 hover:bg-white'}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Visual Label - Stylized as an Elegant, Backdrop-Blurred floating glass panel */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md text-slate-800 p-5 rounded-xl border border-white/20 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 z-10">
                  <div className="flex-1 min-w-0">
                    <motion.span 
                      key={`tag-${currentSlide}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] text-[#2563eb] font-black uppercase tracking-widest block font-mono mb-0.5"
                    >
                      {SLIDES[currentSlide].tag}
                    </motion.span>
                    <motion.h3 
                      key={`title-${currentSlide}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-bold text-xs sm:text-sm text-slate-900 font-mono tracking-tight"
                    >
                      {SLIDES[currentSlide].title}
                    </motion.h3>
                    <motion.p 
                      key={`desc-${currentSlide}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[11px] text-slate-500 truncate mt-0.5"
                    >
                      {SLIDES[currentSlide].desc}
                    </motion.p>
                  </div>
                  <motion.span 
                    key={`accent-${currentSlide}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs font-bold text-white bg-slate-900 px-3.5 py-1.5 rounded-lg shrink-0 font-mono"
                  >
                    {SLIDES[currentSlide].accent}
                  </motion.span>
                </div>
              </div>

              {/* Background solid modern shadow element */}
              <div className="absolute -z-10 -bottom-3 -right-3 w-48 h-48 bg-slate-100 rounded-2xl border border-slate-200 pointer-events-none"></div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Dynamic Booking Schedulers Block */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 flex-1" id="booking-view-flow">
        
        {/* Dynamic State Layout Render */}
        <div className="space-y-4">
          
          {viewState === 'calculator' && (
            <div className="space-y-8 animate-fade-in duration-300">
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <span className="text-[#2563eb] text-[10px] font-extrabold uppercase px-3 py-1 bg-blue-50 rounded-full font-mono border border-blue-105">
                  Instant Access Form
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f172a] uppercase">
                  Calculate Your Moving Investment Instantly
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm max-w-xl mx-auto font-mono">
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
            <div className="td-card max-w-3xl mx-auto p-8 sm:p-12 space-y-8 text-center bg-white border border-slate-100" id="state-success-card">
              <div className="bg-emerald-50 text-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-9 h-9 animate-bounce" />
              </div>

              <div className="space-y-3 font-mono">
                <span className="bg-emerald-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xs">
                  Quote Inquiry Submitted
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a] uppercase tracking-tight font-display">Your Estimated Rate is Locked!</h3>
                <p className="text-slate-600 text-xs max-w-md mx-auto leading-relaxed font-sans font-medium">
                  Thank you, <strong className="text-slate-950 uppercase">{newestBooking.fullName}</strong>. Your moving rate has been reserved under Inquiry ID: <strong className="font-mono text-[#2563eb]">{newestBooking.id}</strong>.
                </p>
              </div>

              {/* Direct Call Recommendation Panel */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4 max-w-lg mx-auto font-mono text-left shadow-xl">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase text-amber-400 font-extrabold tracking-widest">Immediate Confirmation Plan</span>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-100">Call Direct Office Line to Finalize Dispatch</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed uppercase mt-1">We reserve crew routes on a first-call basis. Mention inquiry ID <strong className="text-brand-cyan">{newestBooking.id}</strong> to confirm your slot immediately.</p>
                </div>

                <a 
                  href="tel:+13123859229"
                  className="td-btn-gold w-full block text-center text-slate-950 font-bold py-3.5 px-5 text-sm uppercase tracking-wider cursor-pointer"
                >
                  <Phone className="w-4 h-4 inline mr-2 align-middle text-slate-950" />
                  <span>Call: +1 (312) 385-9229</span>
                </a>
              </div>

              {/* Cash App Payment Notification on Success */}
              <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-6 text-left max-w-lg mx-auto space-y-2 font-mono">
                <span className="text-[10px] text-amber-800 font-extrabold uppercase block tracking-wider leading-relaxed text-center">⚠️ Security Deposit of $100 Must be Paid Upon Booking:</span>
                <p className="text-[11px] text-slate-600 leading-relaxed font-sans normal-case font-medium text-center">To lock your dispatch slot, the <strong className="text-slate-900">$100 security deposit</strong> must be paid via Cash App. This is deducted from the 3-hour minimum ($450 total base including the $100 security deposit), leaving a Grand Total of <strong className="text-slate-950 font-bold">${newestBooking.totalCost}</strong> due on the move day.</p>
                <div className="bg-white p-4 rounded-xl border border-amber-200 text-xs font-black select-all flex flex-col items-center justify-center gap-2 text-slate-905 text-center shadow-xs">
                  <span className="text-[10px] tracking-wider text-slate-405 font-mono uppercase">CASH APP:</span>
                  <a
                    href="https://cash.app/$muahz26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-emerald-600 hover:bg-emerald-550 active:bg-emerald-700 px-6 py-2.5 border border-emerald-500 text-[14px] font-black tracking-widest select-all font-mono rounded-xl animate-pulse inline-flex items-center gap-2 normal-case transition-all duration-200 cursor-pointer shadow-md shadow-emerald-500/10"
                    title="Click to open Cash App"
                  >
                    <span>$muahz26</span>
                    <span className="text-[11px] opacity-90 font-sans font-normal">(Open Link)</span>
                  </a>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
                <div className="text-slate-500 text-left space-y-1.5 uppercase text-[10px]">
                  <p>• Reserved Date: <strong className="text-slate-950">{newestBooking.movingDate}</strong></p>
                  <p>• Recommended Hours: <strong className="text-slate-950">{newestBooking.estimatedHours} hours</strong></p>
                  <p>• Cost Projection: <strong className="text-slate-905 font-black text-xs">${newestBooking.totalCost}</strong> <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 border border-emerald-100 font-bold tracking-wider rounded">Remaining Day of Move balance ($100 security deposit already deducted)</span></p>
                </div>
                <button
                  type="button"
                  onClick={handleResetWorkflow}
                  className="td-btn-blue font-bold px-5 py-3 text-xs uppercase tracking-wider shadow-md"
                >
                  Create Another Quote Estimate
                </button>
              </div>
            </div>
          )}

        </div>

        {/* User Bookings Section */}
        {bookings.length > 0 && (
          <div className="border-t border-[#1e293b] pt-12 space-y-6">
            <MyBookings 
              bookings={bookings} 
              onRefresh={refreshBookingsList} 
              onSelectBooking={(inq) => setSelectedInquiry(inq)}
            />
          </div>
        )}

        {/* Trust factors, equipment inclusions and neighborhoods map representation */}
        <div className="border-t border-[#1e293b] pb-4"></div>
        <TrustBadges />

        {/* Frequently Asked Questions */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xs space-y-10" id="faq-section">
          <div className="text-center max-w-xl mx-auto space-y-3 font-mono">
            <HelpCircle className="w-8 h-8 text-[#2563eb] mx-auto mb-2" />
            <h3 className="text-2xl font-black text-[#0f172a] uppercase tracking-tight">Frequently Asked Chicago Move Questions</h3>
            <p className="text-[10px] text-[#2563eb] uppercase tracking-widest font-bold">Everything you should know about hiring our truck and crew</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-mono">
            <div className="space-y-2 border-l-2 border-[#2563eb] pl-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide">Is the 16 ft Box Truck truly included in the $150 hourly price?</h4>
              <p className="text-slate-600 leading-relaxed font-sans">
                Yes, absolutely! The $150 per hour rate includes the entire 16-foot box truck as well as 2 hardworking professional movers. There is no sneaky sub-rent or secondary fuel billing.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#2563eb] pl-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide">What does the 3-hour minimum reference?</h4>
              <p className="text-slate-600 leading-relaxed font-sans">
                We maintain an absolute 3-hour minimum ($450 total base investment) to dispatch our high-performance vehicles and certified crews. This ensures we can cover standard logistics, safe transport packing, travel prep, and basic overhead.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#2563eb] pl-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide">Do you charge extra for stairs or heavy appliances?</h4>
              <p className="text-slate-600 leading-relaxed font-sans">
                We do not charge extra fees for carrying items up standard residential apartment staircases or using freight elevators. All physical labor is included under the $150/hr rate. Extremely bulky items over 300 lbs must be reported to phone operations first to verify weight limits.
              </p>
            </div>

            <div className="space-y-2 border-l-2 border-[#2563eb] pl-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-wide">Are my items insured and protected during transfer?</h4>
              <p className="text-slate-600 leading-relaxed font-sans">
                Yes, Movers312.Com is a fully licensed, bonded, and insured moving carrier inside the state of Illinois. We take immense care of your prized belongings, blanket-wrapping items and securing cargo within the truck using robust logistics straps.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer Area */}
      <footer className="bg-brand-charcoal text-white border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10 text-sm">
            
            <div className="space-y-3">
              <span className="text-base font-black tracking-wider text-white flex items-center gap-2">
                <img 
                  src={movers312Logo} 
                  alt="Movers312 Logo" 
                  className="w-8 h-8 object-contain rounded-full bg-white p-0.5 shadow-sm"
                  referrerPolicy="no-referrer"
                />
                Movers312.Com
              </span>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Chicago&apos;s premier boutique moving crew. Offering professional 16-foot box truck operations combined with licensed local muscle, customized specifically for narrow neighborhood transits.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-brand-gold uppercase tracking-wider">Contact Office:</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2 font-bold select-text">
                  <Phone className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <a href="tel:+13123859229" className="hover:text-white transition-colors">+1 (312) 385-9229</a>
                </li>
                <li className="flex items-center gap-2 font-bold select-text">
                  <Mail className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <a href="mailto:Movers312.Com@Gmail.Com" className="hover:text-white transition-colors">Movers312.Com@Gmail.Com</a>
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
              <h4 className="font-bold text-sm text-brand-gold uppercase tracking-wider">Fully Insured &amp; Bonded</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Movers312.Com operates legally under Illinois ICC regulations. Moving blanket wrap protection, tools, dollies, cargo straps, and 16-foot high-capacity vehicle come standard with every dispatch.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-white/5 px-2.5 py-1 rounded text-[10px] font-bold text-slate-300 border border-white/15 uppercase">
                  ICC Compliant
                </span>
                <span className="bg-white/5 px-2.5 py-1 rounded text-[10px] font-bold text-slate-300 border border-white/15 uppercase">
                  Insured Car
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-sm text-brand-gold uppercase tracking-wider">Welcome To Chicago:</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <a 
                    href="https://www.icc.illinois.gov/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-gold transition-colors block border-b border-white/5 pb-1 text-xs"
                  >
                     Illinois Commerce Commission (ICC)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://moversguide.usps.com/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-gold transition-colors block border-b border-white/5 pb-1 text-xs"
                  >
                     USPS Official Change of Address
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.chicago.gov/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-gold transition-colors block border-b border-white/5 pb-1 text-xs"
                  >
                     City of Chicago Parking Permits
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.cookcountyil.gov/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-gold transition-colors block text-xs"
                  >
                     Cook County Government Portal
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Movers312.Com. All Rights Reserved.</p>
            <p>Call hotline at <a href="tel:+13123859229" className="text-brand-cyan underline hover:text-white">+13123859229</a> to schedule your crew instantly.</p>
          </div>

        </div>
      </footer>

      {/* Inquiry detail viewer popup (For items in bookings bar) */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0b1528] max-w-lg w-full rounded-none overflow-hidden border-2 border-[#1e293b] flex flex-col justify-between font-mono">
            
            <div className="bg-[#070e1a] text-white p-5 flex justify-between items-center border-b-2 border-[#1e293b]">
              <div>
                <span className="text-[9px] uppercase font-bold text-brand-gold tracking-widest block">Inquiry Dispatch Archive</span>
                <h4 className="font-extrabold text-xs flex items-center gap-1.5 uppercase mt-0.5">
                  ID: <span className="text-brand-cyan">{selectedInquiry.id}</span>
                </h4>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-white p-1 hover:bg-[#111d35] rounded-none transition-colors cursor-pointer border border-[#1e293b]"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-mono text-slate-300">
              
              <div className="border-b border-[#1e293b] pb-3 text-left">
                <span className="text-[9px] text-[#2563eb] uppercase font-bold block tracking-wider">Customer Contact</span>
                <p className="font-black text-white text-xs mt-1 uppercase tracking-wider">{selectedInquiry.fullName}</p>
                <p className="text-slate-400 mt-1">{selectedInquiry.phone} • {selectedInquiry.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-[#1e293b] pb-3 text-left">
                <div>
                  <span className="text-[9px] text-[#2563eb] uppercase font-bold block tracking-wider">Moving Date</span>
                  <p className="font-bold text-white mt-1">{selectedInquiry.movingDate}</p>
                  <p className="text-slate-400 mt-0.5">{selectedInquiry.movingTime}</p>
                </div>
                <div>
                  <span className="text-[9px] text-[#2563eb] uppercase font-bold block tracking-wider">Home / Cargo Style</span>
                  <p className="font-bold text-white mt-1 select-none">
                    {HOME_SIZES[selectedInquiry.homeSize]?.label || selectedInquiry.homeSize}
                  </p>
                  <p className="text-slate-400 mt-0.5">Fits in 16-Foot Box Truck</p>
                </div>
              </div>

              <div className="border-b border-[#1e293b] pb-3 text-left">
                <span className="text-[9px] text-[#2563eb] uppercase font-bold block tracking-wider">Transit Details</span>
                <p className="text-slate-200 font-medium mt-1 uppercase text-[11px] leading-snug">
                  <strong>Start:</strong> {selectedInquiry.fromAddress}
                </p>
                <p className="text-slate-200 font-medium mt-1 uppercase text-[11px] leading-snug">
                  <strong>Stop:</strong> {selectedInquiry.toAddress}
                </p>
              </div>

              {selectedInquiry.notes && (
                <div className="border-b border-[#1e293b] pb-3 text-left font-sans">
                  <span className="text-[9px] text-[#2563eb] uppercase font-bold font-mono block tracking-wider">Special Notes</span>
                  <p className="text-slate-300 mt-1 leading-relaxed bg-[#070e1a]/85 p-3 border-l-2 border-brand-gold text-[10px] block">
                    &ldquo;{selectedInquiry.notes}&rdquo;
                  </p>
                </div>
              )}

              <div className="bg-[#070e1a] text-white p-4 rounded-none border-2 border-[#1e293b] flex justify-between items-center">
                <div className="text-left font-mono">
                  <span className="text-[9px] text-slate-500 uppercase font-bold block tracking-wider">Hourly Rate &amp; Duration</span>
                  <span className="font-bold text-[11px] text-brand-gold">
                    ${150 + (selectedInquiry.extraMoversCount * 50)}/hr for {selectedInquiry.estimatedHours} hrs
                  </span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[9px] text-slate-500 uppercase font-bold block tracking-wider">Grand Total (Remaining Due)</span>
                  <span className="text-xl font-black text-emerald-400">${selectedInquiry.totalCost}</span>
                  <span className="text-[8px] text-slate-400 block tracking-wider font-bold animate-none uppercase">$100 Security Deposit Deducted</span>
                </div>
              </div>

              <div className="bg-[#351e06]/30 p-3 border-2 border-[#542d0c]/50 border-l-4 border-brand-gold space-y-2 text-brand-gold text-left font-mono text-[9px]">
                <p className="font-bold text-[10px] flex items-center gap-1 uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 text-brand-gold" />
                  What happens next?
                </p>
                <p className="text-[10px] leading-normal text-slate-350 uppercase flex flex-wrap items-center gap-1">
                  1. Send the <strong>$100 Security Deposit</strong> via Cash App: <span className="text-emerald-400 font-bold ml-1 normal-case">Cash App:</span>{' '}
                  <a
                    href="https://cash.app/$muahz26"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-2.5 py-1 rounded font-mono select-all animate-pulse normal-case transition-all duration-200 cursor-pointer hover:underline inline-flex items-center gap-1 shadow-md"
                    title="Click to open Cash App"
                  >
                    <strong>$muahz26</strong>
                    <span className="text-[8px] opacity-80 font-sans font-normal">(Open Link)</span>
                  </a>
                </p>
                <p className="text-[10px] leading-normal text-slate-350 uppercase">
                  2. This is fully deducted from your 3-hr minimum ($450 base, leaving a grand total of <strong>${selectedInquiry.totalCost}</strong> payable day of move).
                </p>
                <p className="text-[10px] leading-normal text-slate-350 uppercase">
                  3. Contact hotline <strong>+1 (312) 385-9229</strong> with ID <strong>{selectedInquiry.id}</strong> to finalize scheduling slot.
                </p>
              </div>

            </div>

            <div className="p-4 bg-[#070e1a] border-t-2 border-[#1e293b] flex gap-3 shadow-inner">
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="td-btn-blue text-center py-3 flex-1 text-xs uppercase tracking-wider text-white font-bold"
                type="button"
              >
                Close View
              </button>
              <a 
                href="tel:+13123859229"
                className="td-btn-gold text-slate-950 font-bold py-3 text-center flex-1 flex items-center justify-center gap-1.5 cursor-pointer text-xs uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>Call Hotline</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
