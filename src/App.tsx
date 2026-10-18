import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Truck, 
  Phone, 
  Mail, 
  CheckCircle, 
  Trash2, 
  Search, 
  Calendar,
  ClipboardList,
  HelpCircle,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking } from './types';
import { AiSupportChat } from './components/AiSupportChat';
import { InfoPagesModal, PolicyTab } from './components/InfoPagesModal';
import { Language, LANGUAGES, translations } from './i18n/translations';
import womanMovingSofa from './assets/images/woman_moving_sofa_1783854666266.jpg';
import cozyMovingRoom from './assets/images/cozy_moving_room_1783855471413.jpg';
import officeRelocationBoxes from './assets/images/office_relocation_boxes_1783855619274.jpg';

// Complete City of Chicago & Cook County Neighborhood ZIP Grid (100% City Coverage)
const CHICAGO_NEIGHBORHOODS: { [key: string]: { name: string; region: string; x: number; y: number } } = {
  // DOWNTOWN / CENTRAL
  '60601': { name: 'Loop (Downtown / East)', region: 'Central / Downtown', x: 245, y: 220 },
  '60602': { name: 'Loop (Central)', region: 'Central / Downtown', x: 240, y: 225 },
  '60603': { name: 'Loop (Financial District)', region: 'Central / Downtown', x: 238, y: 230 },
  '60604': { name: 'Loop (Printers Row)', region: 'Central / Downtown', x: 235, y: 235 },
  '60605': { name: 'South Loop / Museum Campus', region: 'Central / Downtown', x: 245, y: 250 },
  '60606': { name: 'West Loop (Gateways / Ogilvie)', region: 'Central / Downtown', x: 220, y: 225 },
  '60607': { name: 'West Loop / Greektown / UIC', region: 'Central / Downtown', x: 205, y: 230 },
  '60610': { name: 'Near North Side / River North', region: 'Central / Downtown', x: 235, y: 185 },
  '60611': { name: 'Streeterville / Gold Coast', region: 'Central / Downtown', x: 250, y: 195 },

  // NORTH SIDE & LAKEFRONT
  '60614': { name: 'Lincoln Park', region: 'North Side', x: 230, y: 155 },
  '60657': { name: 'Lakeview / Boystown', region: 'North Side', x: 225, y: 125 },
  '60613': { name: 'Wrigleyville / Lakeview North', region: 'North Side', x: 220, y: 105 },
  '60640': { name: 'Uptown / Andersonville', region: 'North Side', x: 215, y: 80 },
  '60660': { name: 'Edgewater / Loyola', region: 'North Side', x: 210, y: 55 },
  '60626': { name: 'Rogers Park (Far North Side)', region: 'North Side', x: 200, y: 35 },

  // NORTHWEST SIDE
  '60625': { name: 'Lincoln Square / Albany Park', region: 'Northwest Side', x: 165, y: 65 },
  '60618': { name: 'Avondale / Roscoe Village', region: 'Northwest Side', x: 180, y: 110 },
  '60647': { name: 'Logan Square', region: 'Northwest Side', x: 175, y: 145 },
  '60641': { name: 'Portage Park / Old Irving', region: 'Northwest Side', x: 125, y: 95 },
  '60630': { name: 'Jefferson Park / Mayfair', region: 'Northwest Side', x: 115, y: 70 },
  '60631': { name: 'Edison Park / Norwood Park', region: 'Northwest Side', x: 80, y: 45 },
  '60639': { name: 'Hermosa / Belmont Cragin', region: 'Northwest Side', x: 120, y: 140 },
  '60656': { name: "O'Hare Area / Forest Glen", region: 'Northwest Side', x: 45, y: 65 },

  // WEST SIDE
  '60622': { name: 'Wicker Park / Bucktown', region: 'West Side', x: 195, y: 170 },
  '60642': { name: 'Noble Square / River West', region: 'West Side', x: 210, y: 185 },
  '60612': { name: 'Medical District / Near West', region: 'West Side', x: 180, y: 235 },
  '60624': { name: 'Garfield Park', region: 'West Side', x: 145, y: 225 },
  '60644': { name: 'Austin / Columbus Park', region: 'West Side', x: 105, y: 225 },
  '60608': { name: 'Pilsen / Heart of Chicago', region: 'West Side', x: 200, y: 260 },

  // SOUTH & SOUTHWEST SIDE
  '60616': { name: 'Chinatown / Bronzeville North', region: 'South Side', x: 225, y: 265 },
  '60653': { name: 'Bronzeville / Grand Blvd', region: 'South Side', x: 235, y: 290 },
  '60615': { name: 'Kenwood / Hyde Park North', region: 'South Side', x: 245, y: 315 },
  '60637': { name: 'Hyde Park / Woodlawn', region: 'South Side', x: 245, y: 340 },
  '60649': { name: 'South Shore / Rainbow Beach', region: 'South Side', x: 260, y: 365 },
  '60609': { name: 'McKinley Park / Back of Yards', region: 'South Side', x: 195, y: 290 },
  '60632': { name: 'Brighton Park / Archer Heights', region: 'Southwest Side', x: 155, y: 285 },
  '60629': { name: 'Chicago Lawn / Gage Park', region: 'Southwest Side', x: 145, y: 320 },
  '60638': { name: 'Midway Airport / Garfield Ridge', region: 'Southwest Side', x: 95, y: 315 },
  '60621': { name: 'Englewood', region: 'South Side', x: 195, y: 335 },
  '60620': { name: 'Auburn Gresham / Chatham', region: 'South Side', x: 195, y: 370 },
  '60628': { name: 'Roseland / Pullman', region: 'Far South Side', x: 210, y: 410 },
  '60643': { name: 'Beverly / Morgan Park', region: 'Far South Side', x: 160, y: 415 },
  '60655': { name: 'Mount Greenwood', region: 'Far South Side', x: 120, y: 420 },
  '60633': { name: 'Hegewisch / East Side', region: 'Far South Side', x: 270, y: 430 },

  // SUBURBS
  '60201': { name: 'Evanston (North Suburb)', region: 'Suburbs', x: 200, y: 15 },
  '60076': { name: 'Skokie (North Suburb)', region: 'Suburbs', x: 140, y: 25 },
  '60302': { name: 'Oak Park (West Suburb)', region: 'Suburbs', x: 75, y: 215 },
  '60804': { name: 'Cicero (West Suburb)', region: 'Suburbs', x: 110, y: 260 }
};

export default function App() {
  // Multilingual state
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const t = translations[currentLang] || translations.en;

  // Hero Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const SIZE_LABELS = {
    studio: t.sizeStudio,
    '1bed': t.size1bed,
    '2bed': t.size2bed,
    '3bed_plus': t.size3bed
  };

  // Quote input states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [movingDate, setMovingDate] = useState('');
  const [timeSlot, setTimeSlot] = useState<'morning' | 'afternoon'>('morning');
  const [startZip, setStartZip] = useState('60601');
  const [endZip, setEndZip] = useState('60614');
  const [sizeOfMove, setSizeOfMove] = useState<'studio' | '1bed' | '2bed' | '3bed_plus'>('1bed');
  const [laborOnly, setLaborOnly] = useState(false);
  const [heavyItems, setHeavyItems] = useState(false);
  const [specialNotes, setSpecialNotes] = useState('');

  // Premium interactive additions
  const [packingKit, setPackingKit] = useState(false);
  const [stairLevel, setStairLevel] = useState<'none' | 'stairs' | 'walkway'>('none');
  const [crewAndTruck, setCrewAndTruck] = useState<'2movers_16ft' | '3movers_26ft' | '4movers_26ft'>('2movers_16ft');
  const [estimatedHours, setEstimatedHours] = useState(2);

  // Live calculated cost states
  const [basePrice, setBasePrice] = useState(360);
  const [distanceMiles, setDistanceMiles] = useState(3.5);
  const [laborDiscount, setLaborDiscount] = useState(0);
  const [heavyFee, setHeavyFee] = useState(0);
  const [packingFee, setPackingFee] = useState(0);
  const [stairFee, setStairFee] = useState(0);
  const [estimatedCost, setEstimatedCost] = useState(390);

  // Booking history
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [successBookingId, setSuccessBookingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Modal viewer for historic receipt
  const [viewedBooking, setViewedBooking] = useState<Booking | null>(null);

  // Policy & Info Pages Modal state
  const [activePolicyTab, setActivePolicyTab] = useState<PolicyTab | null>(null);

  // Interactive Moving Company features state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checklistTasks, setChecklistTasks] = useState([
    { id: 'declutter', textKey: 'task1' as const, category: '4 Weeks Before', completed: false },
    { id: 'fragile', textKey: 'task2' as const, category: '2 Weeks Before', completed: false },
    { id: 'parking', textKey: 'task3' as const, category: '1 Week Before', completed: false },
    { id: 'deposit', textKey: 'task4' as const, category: 'Moving Week', completed: false },
    { id: 'essentials', textKey: 'task5' as const, category: 'Moving Day', completed: false },
  ]);

  const toggleChecklistTask = (id: string) => {
    setChecklistTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Load bookings from LocalStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('movers312_bookings');
    if (stored) {
      try {
        setBookings(JSON.parse(stored));
      } catch (e) {
        console.error("Could not parse saved bookings", e);
      }
    }
  }, []);

  // Sync bookings to LocalStorage on change
  const saveBookings = (newBookings: Booking[]) => {
    setBookings(newBookings);
    localStorage.setItem('movers312_bookings', JSON.stringify(newBookings));
  };

  // Live pricing recalculator engine
  useEffect(() => {
    const activeHours = Math.max(2, estimatedHours);
    const hourlyRate = crewAndTruck === '2movers_16ft' ? 120 : crewAndTruck === '3movers_26ft' ? 180 : 230;
    const base = activeHours * hourlyRate;

    const p1 = CHICAGO_NEIGHBORHOODS[startZip] || { x: 190, y: 240 };
    const p2 = CHICAGO_NEIGHBORHOODS[endZip] || { x: 170, y: 140 };
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    const euclidean = Math.sqrt(dx * dx + dy * dy);
    const calculatedMiles = Math.round((euclidean * 0.05 + 1.2) * 10) / 10;
    setDistanceMiles(calculatedMiles);

    const heavy = heavyItems ? 150 : 0;
    const pack = packingKit ? 45 : 0;
    const stair = stairLevel === 'stairs' ? (35 * activeHours) : stairLevel === 'walkway' ? (40 * activeHours) : 0;

    let subtotal = base + heavy + pack + stair;
    
    let disc = 0;
    if (laborOnly) {
      disc = Math.round(subtotal * 0.25);
      subtotal -= disc;
    }

    setBasePrice(base);
    setHeavyFee(heavy);
    setPackingFee(pack);
    setStairFee(stair);
    setLaborDiscount(disc);
    setEstimatedCost(Math.max(100, subtotal));
  }, [estimatedHours, crewAndTruck, startZip, endZip, heavyItems, packingKit, stairLevel, laborOnly]);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `M312-${Math.floor(100000 + Math.random() * 900000)}`;
      const newBooking: Booking = {
        id: generatedId,
        fullName,
        email,
        phone,
        movingDate,
        timeSlot,
        startZip,
        endZip,
        sizeOfMove,
        laborOnly,
        heavyItems,
        specialNotes,
        estimatedCost,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };

      const updated = [newBooking, ...bookings];
      saveBookings(updated);
      setSuccessBookingId(generatedId);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log("Confetti trigger notice");
      }
    }, 600);
  };

  const handleCancelBooking = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this recorded estimate from your local log?")) {
      const filtered = bookings.filter(b => b.id !== id);
      saveBookings(filtered);
      if (viewedBooking?.id === id) setViewedBooking(null);
    }
  };

  const resetFormState = () => {
    setSuccessBookingId(null);
  };

  const filteredBookings = bookings.filter(b => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      b.id.toLowerCase().includes(q) ||
      b.fullName.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.startZip.includes(q) ||
      b.endZip.includes(q)
    );
  });

  const startCoord = CHICAGO_NEIGHBORHOODS[startZip] || { x: 190, y: 240 };
  const endCoord = CHICAGO_NEIGHBORHOODS[endZip] || { x: 170, y: 140 };

  return (
    <div dir={currentLang === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#faf9f5] text-[#122119] font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Notification Bar */}
      <div className="bg-[#122119] text-[#a4ccb6] text-[11px] font-mono py-2 px-4 border-b border-[#1b3426]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-900 text-emerald-300 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase border border-emerald-700/50">
              {t.iccLicense}
            </span>
            <span className="text-white/80 hidden sm:inline">{t.liveDispatch}</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            {/* Language Selector */}
            <div className="flex items-center gap-1 bg-emerald-950 px-2 py-1 rounded border border-emerald-800 text-white font-sans">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <select 
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value as Language)}
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer font-bold"
              >
                {LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-[#122119] text-white">
                    {lang.flag} {lang.label}
                  </option>
                ))}
              </select>
            </div>
            <span>📞 <a href="tel:+13123859229" className="hover:text-emerald-400 font-bold underline transition underline-offset-2">(312) 385-9229</a></span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#fcfbf9]/95 backdrop-blur-md border-b border-[#e9e7df] py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo brand */}
          <div className="flex items-center gap-4">
            <div className="bg-emerald-600 text-[#faf9f5] p-2 rounded-lg flex items-center justify-center shadow-xs border border-emerald-500/20">
              <Truck className="w-5 h-5" />
            </div>
            <div className="h-8 w-px bg-[#e9e7df]"></div>
            <div>
              <div className="flex items-baseline leading-none gap-0.5">
                <span className="text-xl font-extrabold tracking-tight text-[#122119]">{t.companyTitle}</span>
                <span className="text-xl font-bold tracking-tight text-emerald-600">312</span>
              </div>
              <p className="text-[9px] uppercase font-bold tracking-widest text-emerald-800/65 mt-0.5 font-mono">{t.tagline}</p>
            </div>
          </div>

          {/* Quick CTAs */}
          <div className="flex items-center gap-3">
            <a
              id="header-call-cta"
              href="tel:+13123859229"
              className="inline-flex items-center gap-2 bg-[#122119] text-white hover:bg-emerald-850 px-4 py-2.5 text-xs font-semibold rounded-lg transition-all shadow-sm font-mono border border-transparent hover:border-emerald-700/30"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>(312) 385-9229</span>
            </a>
          </div>
        </div>
      </header>

      {/* Full Hero Slider with High Quality Chicago Backgrounds */}
      <section className="relative overflow-hidden bg-[#122119] text-white min-h-[460px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[560px] flex items-center justify-center">
        {/* Background Slider with AnimatePresence */}
        <div className="absolute inset-0 w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${
                  currentSlide === 0
                    ? officeRelocationBoxes
                    : currentSlide === 1
                    ? cozyMovingRoom
                    : womanMovingSofa
                })`
              }}
            />
          </AnimatePresence>
        </div>

        {/* Ambient Overlay for contrast & premium aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-[#122119]/60 z-10"></div>

        {/* Diagonal Light Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(48,213,200,0.15),transparent_50%)] z-10 pointer-events-none" />

        {/* Active Slide Text Content */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 sm:px-12 md:px-16 text-center sm:text-left py-16 sm:py-20 flex flex-col justify-center space-y-6 select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Highlight Badge */}
              <motion.div
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-2 bg-emerald-950/80 text-[#30D5C8] border border-[#30D5C8]/40 px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-mono font-bold"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>
                  {currentSlide === 0
                    ? (t.heroBadge || "★ CHICAGO'S BEST MOVING COMPANY")
                    : currentSlide === 1
                    ? "🛡️ COOK COUNTY LICENSED AUTHORITY"
                    : "📦 100% SATISFACTION GUARANTEED"}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl text-white"
              >
                {currentSlide === 0 ? (
                  <>
                    {t.heroTitle?.includes("CHICAGO") ? (
                      <>
                        CHICAGO'S BEST <span className="text-[#30D5C8]">{t.companyTitle}</span>
                      </>
                    ) : (
                      t.heroTitle || "CHICAGO'S BEST MOVING COMPANY"
                    )}
                  </>
                ) : currentSlide === 1 ? (
                  currentLang === 'es' ? "MUDANZAS DE APARTAMENTOS Y EDIFICIOS" :
                  currentLang === 'lt' ? "PREMIUM BUTŲ IR REZIDENCINIS KRAUSTYMAS" :
                  currentLang === 'ru' ? "ПРЕМИАЛЬНЫЙ КВАРТИРНЫЙ ПЕРЕЕЗД" :
                  currentLang === 'ja' ? "プレミアムマンション・個人向け引越し" :
                  currentLang === 'ar' ? "نقل شقق وسكني فاخر ومتميز" :
                  "PREMIUM APARTMENT & RESIDENTIAL MOVERS"
                ) : (
                  currentLang === 'es' ? "MUDANZAS COMERCIALES Y OFICINAS" :
                  currentLang === 'lt' ? "KOMERCINIS IR BIURŲ PERKRAUSTYMAS" :
                  currentLang === 'ru' ? "КОММЕРЧЕСКИЙ ПЕРЕЕЗД И ОФИСЫ" :
                  currentLang === 'ja' ? "法人・オフィス移転プロフェッショナル" :
                  currentLang === 'ar' ? "نقل تجاري ومكاتب للشركات" :
                  "COMMERCIAL OFFICE RELOCATION EXPERTS"
                )}
              </motion.h1>

              {/* Subtitle description */}
              <motion.p
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl leading-relaxed font-sans"
              >
                {currentSlide === 0 ? (
                  t.heroSubtitle || "Movers312 — Licensed & Fully Insured Elite Residential & Commercial Relocation Services Across Chicagoland."
                ) : currentSlide === 1 ? (
                  currentLang === 'es' ? "Logística impecable de pasadizos, escaleras y ascensores de gran altura para una transición sin estrés." :
                  currentLang === 'lt' ? "Nepriekaištinga logistika laiptais ir liftais dangoraižiuose sklandžiam kraustymuisi." :
                  currentLang === 'ru' ? "Безупречная логистика на этажах без лифта и в небоскребах для спокойного переезда." :
                  currentLang === 'ja' ? "階段作業、高層エレベーター、細い路地の搬入など、難しい条件もお任せください。" :
                  currentLang === 'ar' ? "خدمات لوجستية مثالية للسلالم والمصاعد والأبراج لضمان تجربة نقل مريحة وخالية من التوتر." :
                  "Flawless walkthrough, staircase, and high-rise elevator logistics across Chicago and Cook County for a stress-free transition."
                ) : (
                  currentLang === 'es' ? "Minimice el tiempo de inactividad con nuestros servicios eficientes de mudanza comercial de fin de semana y nocturnas." :
                  currentLang === 'lt' ? "Sumažinkite prastovas naudodamiesi efektyviu komerciniu kraustymu savaitgaliais ar naktimis." :
                  currentLang === 'ru' ? "Минимизация времени простоя благодаря быстрой и надежной работе в выходные и ночные смены." :
                  currentLang === 'ja' ? "オフィスの休日に合わせた夜間・週末の迅速な移転作業で、業務のダウンタイムを最小限に抑えます。" :
                  currentLang === 'ar' ? "تقليل وقت توقف العمل إلى الحد الأدنى بفضل خدمات النقل التجاري والمكتبي السريعة خلال عطلات نهاية الأسبوع أو الفترات المسائية." :
                  "Minimize business downtime with our highly coordinated, professional weekend and after-hours commercial dispatch services."
                )}
              </motion.p>

              {/* Checkmarks / Feature list */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2.5 text-[10px] sm:text-xs font-mono font-bold text-[#30D5C8]"
              >
                {currentSlide === 0 ? (
                  <>
                    <span className="bg-emerald-950/80 px-3.5 py-1.5 rounded-lg border border-emerald-800/60 shadow-xs">✓ {t.feature1 || "100% Upfront Pricing"}</span>
                    <span className="bg-emerald-950/80 px-3.5 py-1.5 rounded-lg border border-emerald-800/60 shadow-xs">✓ {t.feature2 || "No Hidden Fees"}</span>
                    <span className="bg-emerald-950/80 px-3.5 py-1.5 rounded-lg border border-emerald-800/60 shadow-xs">✓ {t.feature3 || "Fully Licensed & Insured"}</span>
                    <span className="bg-emerald-950/80 px-3.5 py-1.5 rounded-lg border border-emerald-800/60 shadow-xs">✓ {t.feature4 || "Professional Crew"}</span>
                  </>
                ) : currentSlide === 1 ? (
                  <>
                    <span className="bg-emerald-950/80 px-3.5 py-1.5 rounded-lg border border-[#30D5C8]/20 shadow-xs">✓ {currentLang === 'es' ? "Especialista en muebles pesados" : "Heavy Furniture & Piano Specialist"}</span>
                    <span className="bg-emerald-950/80 px-3.5 py-1.5 rounded-lg border border-[#30D5C8]/20 shadow-xs">✓ {currentLang === 'es' ? "Asistencia el mismo día" : "Same-Day Last-Minute Help"}</span>
                    <span className="bg-emerald-950/80 px-3.5 py-1.5 rounded-lg border border-[#30D5C8]/20 shadow-xs">✓ {currentLang === 'es' ? "Equipo de embalaje completo" : "Full Packing & Unpacking Kits"}</span>
                  </>
                ) : (
                  <>
                    <span className="bg-emerald-950/80 px-3.5 py-1.5 rounded-lg border border-[#30D5C8]/20 shadow-xs">✓ {currentLang === 'es' ? "Coordinación dedicada" : "Dedicated Moving Coordinator"}</span>
                    <span className="bg-emerald-950/80 px-3.5 py-1.5 rounded-lg border border-[#30D5C8]/20 shadow-xs">✓ {currentLang === 'es' ? "Desmontaje y montaje" : "Office Disassembly & Setup"}</span>
                    <span className="bg-emerald-950/80 px-3.5 py-1.5 rounded-lg border border-[#30D5C8]/20 shadow-xs">✓ {currentLang === 'es' ? "Seguro de carga comercial" : "Full Commercial Cargo Insurance"}</span>
                  </>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrow Left */}
        <button
          onClick={() => setCurrentSlide(prev => (prev === 0 ? 2 : prev - 1))}
          aria-label="Previous Slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#30D5C8]/30 border border-white/10 hover:border-[#30D5C8]/50 text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-xs focus:outline-none"
        >
          <ChevronLeft className="w-5 h-5 text-white/80 hover:text-white" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % 3)}
          aria-label="Next Slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-[#30D5C8]/30 border border-white/10 hover:border-[#30D5C8]/50 text-white flex items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-xs focus:outline-none"
        >
          <ChevronRight className="w-5 h-5 text-white/80 hover:text-white" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                idx === currentSlide ? "bg-[#30D5C8] w-7" : "bg-white/30 hover:bg-white/60 w-2"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 -mt-6 mb-20 relative z-20 w-full flex-grow">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: Dynamic Form Configuration Grid */}
          <div className="lg:col-span-7 bg-[#f2f1ec] border border-[#e2dfd5] rounded-2xl p-6 md:p-8 shadow-md">
            
            <div className="border-b border-[#e2dfd5] pb-5 mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-[#122119] tracking-tight">{t.step1Title}</h2>
                <p className="text-xs text-[#6e7d75] mt-1">Configure parameters to get an instant, binding quote.</p>
              </div>
              <span className="font-mono text-[10px] bg-[#122119] text-white px-2.5 py-1 rounded-md uppercase font-bold tracking-wider">
                Step Config
              </span>
            </div>

            <form id="calculator-input-form" onSubmit={handleSubmitBooking} className="space-y-6">
              
              {/* SECTION A: ZIP ROUTE COORDINATES */}
              <div className="space-y-3 bg-[#fcfbf9] border border-[#e2dfd5] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs bg-emerald-100 text-[#122119] font-black w-5 h-5 rounded-md flex items-center justify-center">A</span>
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#122119] font-mono">Chicagoland ZIP Coordinates</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#3d5246] mb-1">
                      {t.startZipLabel}
                    </label>
                    <select
                      id="origin-zip-selector"
                      value={startZip}
                      onChange={(e) => setStartZip(e.target.value)}
                      className="w-full border border-[#cbd2cd] hover:border-[#122119] rounded-lg px-3 py-2.5 text-xs bg-white text-[#122119] focus:outline-none focus:ring-1 focus:ring-[#122119] transition font-mono"
                    >
                      {Object.entries(CHICAGO_NEIGHBORHOODS).map(([zip, details]) => (
                        <option key={zip} value={zip}>
                          {zip} • {details.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#3d5246] mb-1">
                      {t.endZipLabel}
                    </label>
                    <select
                      id="destination-zip-selector"
                      value={endZip}
                      onChange={(e) => setEndZip(e.target.value)}
                      className="w-full border border-[#cbd2cd] hover:border-[#122119] rounded-lg px-3 py-2.5 text-xs bg-white text-[#122119] focus:outline-none focus:ring-1 focus:ring-[#122119] transition font-mono"
                    >
                      {Object.entries(CHICAGO_NEIGHBORHOODS).map(([zip, details]) => (
                        <option key={zip} value={zip}>
                          {zip} • {details.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Info block displaying computed coordinates */}
                <div className="pt-2 flex flex-col md:flex-row items-start md:items-center justify-between text-[11px] text-[#4d5f54] border-t border-[#f2f1ec] mt-1.5 gap-2 font-mono">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold">Origin Node:</span> 
                    <span className="bg-[#f2f1ec] px-1.5 py-0.5 rounded text-xs text-[#122119]">[{startZip}: x{startCoord.x}, y{startCoord.y}]</span>
                    <span className="text-gray-400">➔</span>
                    <span className="font-bold">Destination Node:</span> 
                    <span className="bg-[#f2f1ec] px-1.5 py-0.5 rounded text-xs text-[#122119]">[{endZip}: x{endCoord.x}, y{endCoord.y}]</span>
                  </div>
                  <div className="font-bold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                    {distanceMiles} miles transport
                  </div>
                </div>
              </div>

              {/* SECTION B: PROPERTY SIZE */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs bg-emerald-100 text-[#122119] font-black w-5 h-5 rounded-md flex items-center justify-center">B</span>
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#122119] font-mono">{t.sizeOfMoveLabel}</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['studio', '1bed', '2bed', '3bed_plus'] as const).map((key) => {
                    const selected = sizeOfMove === key;
                    const recommendedHours = key === 'studio' ? 2 : key === '1bed' ? 4 : key === '2bed' ? 6 : 8;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setSizeOfMove(key);
                          setEstimatedHours(recommendedHours);
                        }}
                        className={`flex flex-col text-left p-3.5 rounded-xl border transition duration-200 ${
                          selected
                            ? 'bg-[#122119] text-[#faf9f5] border-[#122119] shadow-sm'
                            : 'bg-white text-[#1a2d23] border-[#cbd2cd] hover:border-[#122119] hover:bg-[#fafaf6]'
                        }`}
                      >
                        <span className="block font-bold text-xs uppercase tracking-tight">{SIZE_LABELS[key]}</span>
                        <span className="block text-[10px] opacity-75 mt-0.5 leading-snug">
                          {key === 'studio' && "2 Crew • Studio"}
                          {key === '1bed' && "2 Crew • 1 Bed"}
                          {key === '2bed' && "3 Crew • 2 Bed"}
                          {key === '3bed_plus' && "4 Crew • 3+ Bed"}
                        </span>
                        <span className="mt-2 text-xs font-mono font-bold block self-end">
                          Est. {recommendedHours} Hrs
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* SECTION B.2: CREW AND HOURLY PICKER */}
                <div className="bg-white border border-[#e2dfd5] rounded-xl p-5 space-y-4">
                  <div className="space-y-4 pb-2">
                    <label className="block text-xs font-extrabold text-emerald-900 font-mono uppercase tracking-wider bg-emerald-50 border border-emerald-150 px-3 py-1.5 rounded-lg w-fit">
                      🚛 {t.crewTruckLabel}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setCrewAndTruck('2movers_16ft')}
                        className={`p-4 rounded-xl border text-left transition duration-150 relative overflow-hidden ${
                          crewAndTruck === '2movers_16ft'
                            ? 'bg-emerald-50/55 border-emerald-600 text-emerald-950 font-bold shadow-sm'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-[#fafaf6]'
                        }`}
                      >
                        <div className="text-xs font-black tracking-tight">{t.crew2}</div>
                        {crewAndTruck === '2movers_16ft' && <div className="absolute right-0 top-0 bg-emerald-600 text-white text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-bl">Active</div>}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCrewAndTruck('3movers_26ft')}
                        className={`p-4 rounded-xl border text-left transition duration-150 relative overflow-hidden ${
                          crewAndTruck === '3movers_26ft'
                            ? 'bg-emerald-50/55 border-emerald-600 text-emerald-950 font-bold shadow-sm'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-[#fafaf6]'
                        }`}
                      >
                        <div className="text-xs font-black tracking-tight">{t.crew3}</div>
                        {crewAndTruck === '3movers_26ft' && <div className="absolute right-0 top-0 bg-emerald-600 text-white text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-bl">Active</div>}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCrewAndTruck('4movers_26ft')}
                        className={`p-4 rounded-xl border text-left transition duration-150 relative overflow-hidden ${
                          crewAndTruck === '4movers_26ft'
                            ? 'bg-emerald-50/55 border-emerald-600 text-emerald-950 font-bold shadow-sm'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-[#fafaf6]'
                        }`}
                      >
                        <div className="text-xs font-black tracking-tight">{t.crew4}</div>
                        {crewAndTruck === '4movers_26ft' && <div className="absolute right-0 top-0 bg-emerald-600 text-white text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-bl">Active</div>}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-[#f2f1ec]">
                    <div>
                      <h4 className="text-xs font-bold text-[#122119] font-sans">{t.estHoursLabel}</h4>
                      <p className="text-[10px] text-[#6e7d75]">{t.estHoursHelp}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-[#f2f1ec] px-3 py-1.5 rounded-lg border border-[#cbd2cd] self-stretch sm:self-auto justify-between">
                      <button 
                        type="button" 
                        onClick={() => setEstimatedHours(h => Math.max(2, h - 1))}
                        disabled={estimatedHours <= 2}
                        className="w-7 h-7 rounded-md bg-white hover:bg-emerald-50 text-[#122119] border border-[#cbd2cd] disabled:opacity-30 disabled:hover:bg-white font-mono font-bold text-sm transition flex items-center justify-center cursor-pointer select-none"
                      >
                        -
                      </button>
                      <span className="font-mono font-black text-xs text-[#122119] min-w-[50px] text-center select-none">
                        {estimatedHours} Hrs
                      </span>
                      <button 
                        type="button" 
                        onClick={() => setEstimatedHours(h => Math.min(16, h + 1))}
                        disabled={estimatedHours >= 16}
                        className="w-7 h-7 rounded-md bg-white hover:bg-emerald-50 text-[#122119] border border-[#cbd2cd] disabled:opacity-30 disabled:hover:bg-white font-mono font-bold text-sm transition flex items-center justify-center cursor-pointer select-none"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION C: DATE & TIME */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs bg-emerald-100 text-[#122119] font-black w-5 h-5 rounded-md flex items-center justify-center">C</span>
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#122119] font-mono">{t.step2Title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1.5">
                      {t.movingDateLabel}
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-800 pointer-events-none" />
                      <input
                        id="target-date-input"
                        type="date"
                        required
                        value={movingDate}
                        onChange={(e) => setMovingDate(e.target.value)}
                        className="w-full border border-[#cbd2cd] hover:border-[#122119] rounded-lg pl-9 pr-3 py-2 text-xs bg-white text-[#122119] focus:outline-none focus:ring-1 focus:ring-[#122119] transition font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1.5">
                      {t.timeSlotLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id="time-slot-morn-btn"
                        type="button"
                        onClick={() => setTimeSlot('morning')}
                        className={`py-2 text-[11px] rounded-lg font-bold border transition ${
                          timeSlot === 'morning'
                            ? 'bg-[#122119] border-[#122119] text-white'
                            : 'bg-white border-[#cbd2cd] text-[#1a2d23] hover:bg-slate-50'
                        }`}
                      >
                        🌅 {t.morningSlot}
                      </button>
                      <button
                        id="time-slot-aft-btn"
                        type="button"
                        onClick={() => setTimeSlot('afternoon')}
                        className={`py-2 text-[11px] rounded-lg font-bold border transition ${
                          timeSlot === 'afternoon'
                            ? 'bg-[#122119] border-[#122119] text-white'
                            : 'bg-white border-[#cbd2cd] text-[#1a2d23] hover:bg-slate-50'
                        }`}
                      >
                        🌇 {t.afternoonSlot}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION D: LOGISTICS OPTIONS */}
              <div className="space-y-3 bg-[#fcfbf9] border border-[#e2dfd5] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs bg-emerald-100 text-[#122119] font-black w-5 h-5 rounded-md flex items-center justify-center">D</span>
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#122119] font-mono">{t.stairAccessLabel}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                      {(['none', 'stairs', 'walkway'] as const).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setStairLevel(level)}
                          className={`py-2 px-1 text-[10px] font-bold rounded-md border transition ${
                            stairLevel === level
                              ? 'bg-emerald-850 text-white border-emerald-850'
                              : 'bg-white border-[#cbd2cd] text-[#1a2d23] hover:bg-[#fafaf6]'
                          }`}
                        >
                          {level === 'none' && t.stairNone}
                          {level === 'stairs' && t.stairWalkup}
                          {level === 'walkway' && t.stairCourtyard}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1.5">
                      {t.packingKitLabel}
                    </label>
                    <button
                      type="button"
                      onClick={() => setPackingKit(!packingKit)}
                      className={`w-full py-2 px-3 text-left rounded-md border transition flex items-center justify-between text-xs font-semibold ${
                        packingKit
                          ? 'bg-emerald-50 text-emerald-950 border-emerald-500'
                          : 'bg-white border-[#cbd2cd] text-[#1a2d23] hover:bg-[#fafaf6]'
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        📦 {t.packingKitDesc}
                      </span>
                      <span className="font-mono font-bold">+$45</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <label
                    id="labor-only-toggle"
                    className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition ${
                      laborOnly 
                        ? 'bg-emerald-50 border-emerald-500' 
                        : 'bg-white border-[#cbd2cd] hover:bg-[#fafaf6]'
                    }`}
                  >
                    <input
                      id="labor-only-checkbox"
                      type="checkbox"
                      checked={laborOnly}
                      onChange={(e) => setLaborOnly(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 text-emerald-800 rounded border-gray-300 focus:ring-emerald-500 accent-emerald-800"
                    />
                    <div>
                      <span className="block text-xs font-bold text-[#122119]">{t.laborOnlyLabel} (-25%)</span>
                    </div>
                  </label>

                  <label
                    id="heavy-items-toggle"
                    className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition ${
                      heavyItems 
                        ? 'bg-emerald-50 border-emerald-500' 
                        : 'bg-white border-[#cbd2cd] hover:bg-[#fafaf6]'
                    }`}
                  >
                    <input
                      id="heavy-items-checkbox"
                      type="checkbox"
                      checked={heavyItems}
                      onChange={(e) => setHeavyItems(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 text-emerald-800 rounded border-gray-300 focus:ring-emerald-500 accent-emerald-800"
                    />
                    <div>
                      <span className="block text-xs font-bold text-[#122119]">{t.heavyItemsLabel}</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* SECTION E: USER IDENTIFICATION */}
              <div className="space-y-3 bg-white border border-[#e2dfd5] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs bg-emerald-100 text-[#122119] font-black w-5 h-5 rounded-md flex items-center justify-center">E</span>
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#122119] font-mono">{t.step2Title}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1">{t.fullNameLabel} *</label>
                    <input
                      id="contact-fullname-input"
                      type="text"
                      required
                      placeholder={t.fullNamePlaceholder}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border border-[#cbd2cd] hover:border-[#122119] rounded-lg px-3 py-2 text-xs bg-white text-[#122119] focus:outline-none focus:ring-1 focus:ring-[#122119] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1">{t.emailLabel} *</label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      placeholder={t.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-[#cbd2cd] hover:border-[#122119] rounded-lg px-3 py-2 text-xs bg-white text-[#122119] focus:outline-none focus:ring-1 focus:ring-[#122119] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1">{t.phoneLabel} *</label>
                    <input
                      id="contact-phone-input"
                      type="tel"
                      required
                      placeholder={t.phonePlaceholder}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-[#cbd2cd] hover:border-[#122119] rounded-lg px-3 py-2 text-xs bg-white text-[#122119] focus:outline-none focus:ring-1 focus:ring-[#122119] transition font-mono"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label className="block text-xs font-semibold text-[#3d5246] mb-1">{t.specialNotesLabel}</label>
                  <textarea
                    id="contact-notes-textarea"
                    rows={2}
                    placeholder={t.specialNotesPlaceholder}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full border border-[#cbd2cd] hover:border-[#122119] rounded-lg px-3 py-2 text-xs bg-white text-[#122119] focus:outline-none focus:ring-1 focus:ring-[#122119] transition resize-none"
                  />
                </div>
              </div>

              {/* ACTION: GENERATE ESTIMATE */}
              <button
                id="submit-form-button"
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#122119] hover:bg-[#1f3729] text-white hover:text-emerald-350 font-bold py-3 px-6 rounded-xl transition duration-200 text-xs uppercase tracking-widest font-mono flex items-center justify-center gap-2 cursor-pointer border border-emerald-800/30"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>{t.submitting}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>{t.bookButton}</span>
                  </>
                )}
              </button>

            </form>

          </div>

          {/* COLUMN 2: Cost Sticky Invoice Receipt & Map Visualizer */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-[100px]">
            
            {/* Full City of Chicago Map SVG & Coverage Card */}
            <div className="bg-[#122119] text-white border border-[#1b3426] rounded-2xl overflow-hidden p-4 shadow-md space-y-3 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-2.5 gap-2">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-extrabold flex items-center gap-1.5 uppercase">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                    {t.chicagoMapTitle}
                  </span>
                </div>
                <span className="text-[9px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full w-fit">
                  ✓ {t.wholeChicagoCoverage}
                </span>
              </div>

              {/* Interactive SVG Canvas */}
              <div className="relative h-72 w-full bg-[#0a130e] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full text-emerald-950/20" viewBox="0 0 350 450">
                  <defs>
                    <linearGradient id="lakeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#032b24" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#051f1a" stopOpacity="0.95" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Lake Michigan Coastline & Water Body (East) */}
                  <path 
                    d="M 230 0 C 245 40, 255 100, 265 140 C 275 190, 280 230, 275 270 C 270 320, 285 370, 310 420 L 350 450 L 350 0 Z" 
                    fill="url(#lakeGrad)" 
                    stroke="rgba(34, 197, 94, 0.25)" 
                    strokeWidth="1.5"
                  />
                  <text x="290" y="160" fill="rgba(164, 204, 182, 0.22)" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="2" transform="rotate(85 290 160)">
                    LAKE MICHIGAN
                  </text>

                  {/* Chicago City Streets & Grid Lines */}
                  <line x1="80" y1="0" x2="80" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="140" y1="0" x2="140" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="260" y1="0" x2="260" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  <line x1="0" y1="80" x2="350" y2="80" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="160" x2="350" y2="160" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="240" x2="350" y2="240" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="320" x2="350" y2="320" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="400" x2="350" y2="400" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  {/* Kennedy & Dan Ryan Expressway Corridor (I-90/I-94) */}
                  <path 
                    d="M 50 60 Q 120 100 175 145 T 235 220 T 210 330 T 220 420" 
                    fill="none" 
                    stroke="rgba(34, 197, 94, 0.18)" 
                    strokeWidth="2.5" 
                    strokeDasharray="4, 4" 
                  />
                  {/* Eisenhower Expressway (I-290 West) */}
                  <path 
                    d="M 75 225 L 235 225" 
                    fill="none" 
                    stroke="rgba(34, 197, 94, 0.15)" 
                    strokeWidth="2" 
                    strokeDasharray="3, 3" 
                  />

                  {/* Regional Landmark Labels */}
                  <text x="35" y="55" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace">✈ O'Hare</text>
                  <text x="75" y="305" fill="rgba(255,255,255,0.25)" fontSize="7" fontFamily="monospace">✈ Midway</text>
                  <text x="238" y="210" fill="rgba(34,197,94,0.6)" fontSize="8" fontFamily="monospace" fontWeight="bold">★ LOOP</text>
                  <text x="210" y="100" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">Wrigleyville</text>
                  <text x="225" y="335" fill="rgba(255,255,255,0.2)" fontSize="7" fontFamily="monospace">Hyde Park</text>

                  {/* Active Route Vector Line */}
                  <line 
                    x1={startCoord.x} 
                    y1={startCoord.y} 
                    x2={endCoord.x} 
                    y2={endCoord.y} 
                    stroke="#22c55e" 
                    strokeWidth="4" 
                    strokeLinecap="round"
                    strokeDasharray="8, 6"
                    className="animate-map-pulse"
                    filter="url(#glow)"
                  />

                  {/* All City Neighborhood Nodes */}
                  {Object.entries(CHICAGO_NEIGHBORHOODS).map(([zip, d]) => {
                    const isStart = zip === startZip;
                    const isEnd = zip === endZip;
                    const isTerminalNode = isStart || isEnd;

                    return (
                      <g 
                        key={zip} 
                        className="cursor-pointer group"
                        onClick={() => {
                          if (!isStart) setEndZip(zip);
                        }}
                      >
                        <title>{zip} • {d.name} ({d.region}) - Click to set destination</title>
                        {isTerminalNode && (
                          <circle 
                            cx={d.x} 
                            cy={d.y} 
                            r="12" 
                            fill={isStart ? "rgba(34, 197, 94, 0.35)" : "rgba(255, 255, 255, 0.3)"} 
                            className="animate-ping"
                          />
                        )}
                        <circle 
                          cx={d.x} 
                          cy={d.y} 
                          r={isTerminalNode ? "6" : "3"} 
                          fill={isStart ? "#22c55e" : isEnd ? "#ffffff" : "rgba(255, 255, 255, 0.25)"} 
                          stroke={isTerminalNode ? "#122119" : "transparent"}
                          strokeWidth="1.5"
                          className="transition-all duration-200 group-hover:scale-150"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Pickup Tag Overlay */}
                <div className="absolute top-2 left-2 bg-[#122119]/95 border border-emerald-500/30 px-2.5 py-1.5 rounded-lg text-[10px] font-mono shadow-md backdrop-blur-xs flex gap-2 items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <div>
                    <span className="text-emerald-400 block font-bold text-[9px] uppercase tracking-wider">Origin Pickup</span>
                    <span className="text-white block font-black">{startZip} • {CHICAGO_NEIGHBORHOODS[startZip]?.name || startZip}</span>
                  </div>
                </div>

                {/* Destination Tag Overlay */}
                <div className="absolute bottom-2 right-2 bg-[#122119]/95 border border-white/20 px-2.5 py-1.5 rounded-lg text-[10px] font-mono text-right shadow-md backdrop-blur-xs flex gap-2 items-center">
                  <div>
                    <span className="text-white block font-bold text-[9px] uppercase tracking-wider">Destination Drop</span>
                    <span className="text-emerald-300 block font-black">{endZip} • {CHICAGO_NEIGHBORHOODS[endZip]?.name || endZip}</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                </div>
              </div>

              {/* Neighborhood / Region Quick Select Chips */}
              <div className="pt-1">
                <p className="text-[10px] font-mono text-emerald-400 font-bold mb-1.5 flex items-center justify-between">
                  <span>📍 Quick Select Chicago Origin Neighborhood:</span>
                  <span className="text-white/60 text-[9px]">{Object.keys(CHICAGO_NEIGHBORHOODS).length}+ ZIPs Covered</span>
                </p>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-emerald-800">
                  {Object.entries(CHICAGO_NEIGHBORHOODS).slice(0, 18).map(([zip, details]) => {
                    const isSelected = zip === startZip || zip === endZip;
                    return (
                      <button
                        key={zip}
                        type="button"
                        onClick={() => setStartZip(zip)}
                        className={`text-[9px] font-mono px-2 py-0.5 rounded transition ${
                          isSelected 
                            ? 'bg-emerald-500 text-emerald-950 font-black' 
                            : 'bg-emerald-950/70 text-emerald-200 hover:bg-emerald-800 hover:text-white border border-emerald-800/40'
                        }`}
                      >
                        {zip} {details.name.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sticky Invoice pricing tag CARD */}
            <div id="receipt-view-zone" className="bg-[#122119] text-white border border-[#1b3426] rounded-2xl overflow-hidden shadow-lg">
              
              <div className="bg-[#0b1410] px-6 py-4.5 border-b border-[#1b3426] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest font-black text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/40">
                    {t.priceLockBadge}
                  </span>
                  <h3 className="text-sm font-bold tracking-tight text-[#faf9f5] mt-1.5 font-mono">{t.guaranteedQuoteTitle}</h3>
                </div>
                <Truck className="w-5 h-5 text-emerald-400" />
              </div>

              <div className="p-6 space-y-3.5 font-mono text-xs">
                <div className="flex justify-between items-baseline py-0.5">
                  <div className="space-y-0.5">
                    <span className="text-white font-bold block">{t.baseRate}</span>
                    <span className="text-[#a4ccb6] text-[10px] block">
                      {estimatedHours} Hrs @ ${crewAndTruck === '2movers_16ft' ? '120' : crewAndTruck === '3movers_26ft' ? '180' : '230'}/hr
                    </span>
                  </div>
                  <span className="font-bold text-sm text-white">${basePrice}</span>
                </div>

                {packingKit && (
                  <div className="flex justify-between items-baseline py-0.5 border-t border-white/5 pt-3">
                    <span className="text-white font-bold block">{t.packingFee}</span>
                    <span className="font-bold text-emerald-400">+${packingFee}</span>
                  </div>
                )}

                {stairLevel !== 'none' && (
                  <div className="flex justify-between items-baseline py-0.5 border-t border-white/5 pt-3">
                    <span className="text-white font-bold block">{t.stairFee}</span>
                    <span className="font-bold text-emerald-400">+${stairFee}</span>
                  </div>
                )}

                {heavyItems && (
                  <div className="flex justify-between items-baseline py-0.5 border-t border-white/5 pt-3 text-red-400">
                    <span className="text-red-400 font-bold block">{t.heavyFee}</span>
                    <span className="font-bold text-red-400">+${heavyFee}</span>
                  </div>
                )}

                {laborOnly && (
                  <div className="flex justify-between items-baseline py-0.5 border-t border-white/5 pt-3 text-emerald-300">
                    <span className="font-bold block">{t.laborDiscount}</span>
                    <span className="font-bold text-emerald-300">-${laborDiscount}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline py-0.5 border-t border-white/5 pt-3 text-[#00D632]">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[#00D632] font-bold">
                      <span>Deposit Required</span>
                      <a 
                        href="https://cash.app/$Movers312" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[8px] font-mono tracking-wider font-extrabold text-[#00D632] bg-emerald-950/80 hover:bg-emerald-900 border border-[#00D632]/35 px-2 py-0.5 rounded shrink-0 transition"
                      >
                        CASH APP
                      </a>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-[#00D632]">$100</span>
                </div>

                <div className="pt-4 border-t-2 border-dashed border-[#1b3426] mt-6 flex justify-between items-center bg-[#0d1712] p-4 rounded-xl">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest font-bold text-[#a4ccb6] font-mono leading-none">
                      {t.totalGuaranteed}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-3xl font-black text-white leading-none">${estimatedCost}</span>
                  </div>
                </div>

                <div className="bg-[#122119] rounded-lg p-3 text-[10px] text-[#a4ccb6] leading-relaxed border border-emerald-800/20 space-y-1.5">
                  <div>🛡️ {t.depositNotice}</div>
                  <div className="text-red-300 font-semibold flex items-start gap-1">
                    <span>⚠️</span>
                    <span>{t.cancelFeeNotice}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* SECTION: CHECKLIST & FAQ */}
        <section id="movers312-core-features" className="mt-16 bg-[#faf9f5] border border-[#e2dfd5] rounded-2xl p-6 md:p-8 space-y-10 shadow-sm">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-[#cbd2cd]/55">
            {/* Checklist */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-850" />
                <h3 className="font-extrabold text-[#122119] text-sm md:text-base tracking-tight">
                  {t.checklistTitle}
                </h3>
              </div>
              <p className="text-xs text-[#5e6c62] font-serif leading-relaxed">
                {t.checklistSubtitle}
              </p>

              <div className="space-y-2">
                {checklistTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => toggleChecklistTask(task.id)}
                    className={`w-full flex items-start gap-3 p-3 text-left border rounded-xl transition ${
                      task.completed 
                        ? 'bg-emerald-50/50 border-emerald-500 text-[#122119]' 
                        : 'bg-white border-gray-200 hover:bg-[#fafaf6]'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                        task.completed 
                          ? 'bg-emerald-800 border-emerald-800 text-white' 
                          : 'border-slate-300 bg-white'
                      }`}>
                        {task.completed && (
                          <svg className="w-2.5 h-2.5 fill-none stroke-current stroke-3 font-bold" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-mono tracking-wider text-emerald-800 font-extrabold leading-none">
                        {task.category}
                      </span>
                      <span className={`block text-xs leading-relaxed font-sans mt-1 ${task.completed ? 'line-through text-[#6e7d75]' : 'text-[#122119] font-semibold'}`}>
                        {t[task.textKey]}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-800" />
                <h3 className="font-extrabold text-[#122119] text-sm md:text-base tracking-tight">
                  {t.faqTitle}
                </h3>
              </div>

              <div className="space-y-2">
                {[
                  { q: t.q1, a: t.a1 },
                  { q: t.q2, a: t.a2 },
                  { q: t.q3, a: t.a3 },
                  { q: t.q4, a: t.a4 },
                ].map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="border border-[#cbd2cd]/65 rounded-xl bg-white overflow-hidden transition-all duration-200">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex justify-between items-center p-3 text-left hover:bg-[#fafaf6] transition font-sans"
                      >
                        <span className="text-xs font-bold text-[#122119] pr-4">{faq.q}</span>
                        <span className="text-emerald-800 font-bold shrink-0 text-xs font-mono">{isOpen ? '−' : '+'}</span>
                      </button>
                      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-48 border-t border-slate-100 p-3 bg-slate-50/50' : 'max-h-0'}`}>
                        <p className="text-[11px] text-[#4d5f54] font-serif leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SUCCESS BOOKING BANNER */}
        {successBookingId && (
          <div id="booking-success-indicator" className="mt-12 max-w-3xl mx-auto bg-white border border-emerald-200 shadow-xl rounded-2xl p-6 md:p-8 text-center animate-fade-in">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-100">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#122119] tracking-tight">{t.successTitle}</h3>
            <p className="text-[#4d5f54] text-xs mt-1 max-w-md mx-auto">
              {t.reservationId}: <strong className="text-[#122119] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-mono font-bold tracking-wide text-xs">{successBookingId}</strong>.
            </p>

            <div className="mt-6 bg-[#00D632]/5 border-2 border-[#00D632] rounded-xl p-5 text-left space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-[#122119] tracking-tight">{t.depositHeader}</h4>
                  <p className="text-xs text-[#4d5f54] font-serif leading-relaxed">
                    {t.depositBody}
                  </p>
                  <p className="text-[11px] text-red-700 font-sans font-bold flex items-center gap-1 mt-1.5">
                    <span>⚠️</span>
                    <span>{t.cancelFeeNotice}</span>
                  </p>
                </div>
                <a 
                  href="https://cash.app/$Movers312"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto shrink-0 bg-[#00D632] hover:bg-[#00b529] text-black font-black px-5 py-3 rounded-xl font-mono text-center shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group border border-emerald-400/30"
                >
                  <span>$Movers312 ➔</span>
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center text-xs">
              <button
                id="estimate-another-btn"
                onClick={resetFormState}
                className="border border-[#cbd2cd] text-[#3d5246] font-bold px-5 py-2.5 rounded-lg hover:bg-slate-50 transition cursor-pointer"
              >
                {t.calculateAnother}
              </button>
            </div>
          </div>
        )}

        {/* HISTORIC DISPATCH LEDGER SYSTEM */}
        <section id="saved-estimates-ledger" className="mt-16 bg-[#eef0eb] border border-[#d6dad0] rounded-2xl p-6 md:p-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#cbd2cd] pb-5 mb-6">
            <div>
              <h3 className="font-extrabold text-[#122119] text-base md:text-lg tracking-tight">{t.historyTitle}</h3>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-800" />
              <input
                id="history-search-input"
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-[#cbd2cd] rounded-xl text-xs bg-white text-[#122119] focus:outline-none focus:border-[#122119] transition font-mono"
              />
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="py-12 border-2 border-dashed border-[#ccd0c7] rounded-xl text-center bg-white/40">
              <h4 className="font-bold text-[#122119] text-xs">{t.noBookingsFound}</h4>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="border-b border-[#cbd2cd] text-[#5e6c62] font-bold text-[10px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">LEDGER KEY</th>
                    <th className="py-2.5 px-3">CUSTOMER</th>
                    <th className="py-2.5 px-3">ROUTE</th>
                    <th className="py-2.5 px-3">SCHEDULED</th>
                    <th className="py-2.5 px-3">RATE</th>
                    <th className="py-2.5 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d4d9ce]">
                  {filteredBookings.map((b) => (
                    <tr 
                      key={b.id} 
                      onClick={() => setViewedBooking(b)}
                      className="hover:bg-[#fafaf7]/55 transition cursor-pointer group"
                    >
                      <td className="py-3 px-3 font-bold text-[#122119] group-hover:underline">
                        {b.id}
                      </td>
                      <td className="py-3 px-3 font-sans">
                        <div className="font-bold text-[#122119] text-xs">{b.fullName}</div>
                        <div className="text-[10px] text-[#5e6c62] font-mono mt-0.5">{b.phone}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 font-bold text-[#122119]">
                          <span>ZIP {b.startZip}</span>
                          <span className="text-slate-400">➔</span>
                          <span>ZIP {b.endZip}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#122119]">{b.movingDate}</div>
                      </td>
                      <td className="py-3 px-3 font-extrabold text-xs text-[#122119] font-mono">
                        ${b.estimatedCost}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          id={`delete-booking-${b.id}`}
                          onClick={(e) => handleCancelBooking(b.id, e)}
                          className="text-[#627267] hover:text-red-700 hover:bg-[#e1e4de] p-1.5 rounded transition bg-transparent cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </section>

      </main>

      {/* MODAL LIGHTBOX */}
      {viewedBooking && (
        <div className="fixed inset-0 bg-[#122119]/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#fcfbf9] border border-[#cbd2cd] shadow-2xl rounded-2xl max-w-xl w-full overflow-hidden animate-fade-in my-8">
            <div className="bg-[#122119] text-white p-5 border-b border-[#1b3426] flex items-center justify-between font-mono">
              <div>
                <span className="text-[10px] text-emerald-400 font-extrabold tracking-wider bg-emerald-950 px-2 py-0.5 rounded">
                  ESTIMATE SLIP
                </span>
                <h3 className="text-sm font-bold mt-1.5">{viewedBooking.id}</h3>
              </div>
              <button 
                onClick={() => setViewedBooking(null)}
                className="text-[#a4ccb6] hover:text-white text-xs border border-white/20 hover:border-white px-2 py-1 rounded cursor-pointer"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4 border-b border-[#e2dfd5] pb-4">
                <div>
                  <span className="text-[#627267] text-[10px] block font-bold">NAME</span>
                  <span className="text-[#122119] font-bold text-sm leading-relaxed">{viewedBooking.fullName}</span>
                </div>
                <div>
                  <span className="text-[#627267] text-[10px] block font-bold">CONTACT</span>
                  <span className="text-[#122119] font-bold block mt-0.5 font-sans">{viewedBooking.phone}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-[#e2dfd5] pb-4">
                <div>
                  <span className="text-[#627267] text-[10px] block font-bold">ROUTE</span>
                  <span className="text-[#122119] font-bold block mt-0.5">ZIP {viewedBooking.startZip} ➔ ZIP {viewedBooking.endZip}</span>
                </div>
                <div>
                  <span className="text-[#627267] text-[10px] block font-bold">DATE</span>
                  <span className="text-[#122119] font-bold block mt-0.5">{viewedBooking.movingDate}</span>
                </div>
              </div>

              <div className="flex justify-between items-center bg-[#122119] text-white p-4.5 rounded-xl border border-emerald-900 mt-6">
                <div>
                  <span className="text-[10px] text-[#a4ccb6] block leading-none">TOTAL TARIFF RATE</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#faf9f5]">${viewedBooking.estimatedCost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-black text-[#30D5C8]/75 py-12 px-6 md:px-12 border-t border-[#0b1410] text-[11px] font-mono">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#30D5C8]/10 text-[#30D5C8] p-2 rounded-lg flex items-center justify-center border border-[#30D5C8]/20">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-white font-black text-xs">MOVERS</span>
                <span className="text-[#30D5C8] font-black text-xs">312</span>
              </div>
            </div>
            <p className="leading-relaxed font-sans text-xs text-[#30D5C8]/70">
              {t.footerDesc}
            </p>
            <p className="text-[10px] text-emerald-400 font-bold">
              {t.footerLanguages}
            </p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-1">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#30D5C8]/25 hover:text-white text-[#30D5C8] flex items-center justify-center border border-white/10 hover:border-[#30D5C8]/50 transition-all duration-300" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#30D5C8]/25 hover:text-white text-[#30D5C8] flex items-center justify-center border border-white/10 hover:border-[#30D5C8]/50 transition-all duration-300" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#30D5C8]/25 hover:text-white text-[#30D5C8] flex items-center justify-center border border-white/10 hover:border-[#30D5C8]/50 transition-all duration-300" title="X (Twitter)">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#30D5C8]/25 hover:text-white text-[#30D5C8] flex items-center justify-center border border-white/10 hover:border-[#30D5C8]/50 transition-all duration-300" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Company & Legal Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[#30D5C8] font-extrabold uppercase tracking-wider text-xs">{t.companyLegal}</h4>
            <ul className="space-y-2 font-sans text-xs">
              <li>
                <button
                  onClick={() => setActivePolicyTab('about')}
                  className="text-[#30D5C8]/80 hover:text-white hover:underline transition-colors text-left flex items-center gap-1.5"
                >
                  <span>›</span> {t.aboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyTab('privacy')}
                  className="text-[#30D5C8]/80 hover:text-white hover:underline transition-colors text-left flex items-center gap-1.5"
                >
                  <span>›</span> {t.privacyPolicy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyTab('disclaimer')}
                  className="text-[#30D5C8]/80 hover:text-white hover:underline transition-colors text-left flex items-center gap-1.5"
                >
                  <span>›</span> {t.disclaimer}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActivePolicyTab('ai-policy')}
                  className="text-[#30D5C8]/80 hover:text-white hover:underline transition-colors text-left flex items-center gap-1.5"
                >
                  <span>›</span> {t.aiChatPolicy}
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[#30D5C8] font-extrabold uppercase tracking-wider text-xs">COMMUNICATION</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 font-sans text-xs">
                <Phone className="w-3.5 h-3.5 text-[#30D5C8]/60 shrink-0" />
                <span>(312) 385-9229</span>
              </li>
              <li className="flex items-center gap-2 font-sans text-xs">
                <Mail className="w-3.5 h-3.5 text-[#30D5C8]/60 shrink-0" />
                <span className="break-all">Movers312.Com@Gmail.Com</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-[#30D5C8] font-extrabold uppercase tracking-wider text-xs">SECURITY & LICENSING</h4>
            <div className="flex flex-col gap-1.5">
              <span className="bg-[#30D5C8]/10 border border-[#30D5C8]/30 text-[#30D5C8] px-2 py-0.5 rounded text-[9px] font-bold text-center">100% BONDED</span>
              <span className="bg-[#30D5C8]/10 border border-[#30D5C8]/30 text-[#30D5C8] px-2 py-0.5 rounded text-[9px] font-bold text-center">COOK COUNTY ICC</span>
              <span className="bg-[#30D5C8]/10 border border-[#30D5C8]/30 text-[#30D5C8] px-2 py-0.5 rounded text-[9px] font-bold text-center">USDOT COMPLIANT</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* High Google Ranking Keywords & SEO Directory */}
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
            <h4 className="text-[#30D5C8] font-extrabold uppercase tracking-widest text-[10px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#30D5C8] rounded-full animate-pulse"></span>
              CHICAGO'S BEST MOVING COMPANY — POPULAR SEARCHES & HIGH-RANKING KEYWORDS
            </h4>
            <span className="text-[9px] text-white/40 font-mono">Chicago & Cook County SEO Authority</span>
          </div>
          
          <p className="text-[10px] leading-relaxed text-[#30D5C8]/60 font-sans">
            As the premier choice for <strong className="text-white font-bold">Chicago's Best Moving Company</strong>, MOVERS312 delivers unmatched reliability and award-winning customer service across Illinois. Our certified teams specialize in <strong className="text-white font-bold">top-rated local movers Chicago</strong>, providing seamless <strong className="text-white font-bold">affordable apartment movers Chicago</strong> solutions for high-rises and walkups alike. Whether you require a <strong className="text-white font-bold">professional commercial office relocation</strong> or a customized <strong className="text-white font-bold">Cook County full-service packing and unpacking</strong> crew, we guarantee 100% pricing transparency. Connect with the finest <strong className="text-white font-bold">same-day last-minute movers Chicago</strong> has to offer, fully licensed and insured for your peace of mind.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-2">
            <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-lg space-y-1.5">
              <span className="text-white font-bold text-[9px] block border-b border-white/10 pb-1 uppercase tracking-wider text-[#30D5C8]">Local Moving</span>
              <ul className="space-y-1 text-white/50 text-[9px] list-disc list-inside font-sans">
                <li>Best Chicago Movers</li>
                <li>Local Movers Chicago IL</li>
                <li>Cook County Moving Co</li>
                <li>Loop Downtown Relocation</li>
              </ul>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-lg space-y-1.5">
              <span className="text-white font-bold text-[9px] block border-b border-white/10 pb-1 uppercase tracking-wider text-[#30D5C8]">Specialized Help</span>
              <ul className="space-y-1 text-white/50 text-[9px] list-disc list-inside font-sans">
                <li>Chicago Piano Movers</li>
                <li>Heavy Furniture Loading</li>
                <li>Fine Art Transport IL</li>
                <li>Last-Minute Movers</li>
              </ul>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-lg space-y-1.5">
              <span className="text-white font-bold text-[9px] block border-b border-white/10 pb-1 uppercase tracking-wider text-[#30D5C8]">Residential</span>
              <ul className="space-y-1 text-white/50 text-[9px] list-disc list-inside font-sans">
                <li>Apartment Movers Chicago</li>
                <li>Walkup Stair Logistics</li>
                <li>High-Rise Moving Guide</li>
                <li>Student Moving Evanston</li>
              </ul>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-lg space-y-1.5">
              <span className="text-white font-bold text-[9px] block border-b border-white/10 pb-1 uppercase tracking-wider text-[#30D5C8]">Commercial</span>
              <ul className="space-y-1 text-white/50 text-[9px] list-disc list-inside font-sans">
                <li>Office Moving Chicago</li>
                <li>Corporate Relocations</li>
                <li>Retail Storage Transport</li>
                <li>Commercial Movers IL</li>
              </ul>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-2.5 rounded-lg space-y-1.5 col-span-2 sm:col-span-1">
              <span className="text-white font-bold text-[9px] block border-b border-white/10 pb-1 uppercase tracking-wider text-[#30D5C8]">Packing Kits</span>
              <ul className="space-y-1 text-white/50 text-[9px] list-disc list-inside font-sans">
                <li>Full Packing & Box Kits</li>
                <li>Fragile Glassware Wrap</li>
                <li>Wardrobe Box Storage</li>
                <li>Unpacking Help Chicago</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal Policy Links Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-[#30D5C8]/80 font-sans border-t border-white/5 pt-6 mt-8">
          <button onClick={() => setActivePolicyTab('about')} className="hover:text-white hover:underline transition-colors">
            {t.aboutUs}
          </button>
          <span className="text-white/20">•</span>
          <button onClick={() => setActivePolicyTab('privacy')} className="hover:text-white hover:underline transition-colors">
            {t.privacyPolicy}
          </button>
          <span className="text-white/20">•</span>
          <button onClick={() => setActivePolicyTab('disclaimer')} className="hover:text-white hover:underline transition-colors">
            {t.disclaimer}
          </button>
          <span className="text-white/20">•</span>
          <button onClick={() => setActivePolicyTab('ai-policy')} className="hover:text-white hover:underline transition-colors">
            {t.aiChatPolicy}
          </button>
        </div>

        {/* Absolute Bottom Footer Copyright */}
        <div className="mt-4 text-center">
          <p className="text-[10px] text-white/30 font-mono tracking-widest uppercase">
            Copyright ©️ Movers312.Com | 2026. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Info & Legal Policy Modal */}
      <InfoPagesModal
        activeTab={activePolicyTab}
        onClose={() => setActivePolicyTab(null)}
        onSelectTab={(tab) => setActivePolicyTab(tab)}
        currentLang={currentLang}
      />
      
      <AiSupportChat currentLang={currentLang} />
    </div>
  );
}
