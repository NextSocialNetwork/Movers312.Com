import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Truck, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  Star, 
  FileText, 
  ShieldCheck, 
  Award, 
  Trash2, 
  Search, 
  Calendar,
  ClipboardList,
  HelpCircle
} from 'lucide-react';
import { Booking } from './types';

// Asset Imports

// Chicago Zips distance coordinate estimation grid (positioned for standard SVG viewbox)
const CHICAGO_NEIGHBORHOODS: { [key: string]: { name: string; x: number; y: number } } = {
  '60601': { name: 'Loop (Downtown)', x: 190, y: 240 },
  '60611': { name: 'Streeterville / Gold Coast', x: 205, y: 200 },
  '60614': { name: 'Lincoln Park', x: 170, y: 140 },
  '60657': { name: 'Lakeview', x: 155, y: 90 },
  '60622': { name: 'Wicker Park / Bucktown', x: 90, y: 175 },
  '60637': { name: 'Hyde Park (South Side)', x: 260, y: 390 },
  '60605': { name: 'South Loop', x: 200, y: 280 },
  '60201': { name: 'Evanston (North Suburb)', x: 130, y: 30 }
};

const SIZE_LABELS = {
  studio: 'Studio Unit',
  '1bed': '1-Bedroom Flat',
  '2bed': '2-Bedroom Residence',
  '3bed_plus': '3+ Bedroom Estate'
};

export default function App() {
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
  const [estimatedHours, setEstimatedHours] = useState(3); // Default to 3 hours based on user preference

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

  // Interactive Moving Company features state
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checklistTasks, setChecklistTasks] = useState([
    { id: 'declutter', text: 'Step 1: Declutter rooms & donate/sell unneeded items', category: '4 Weeks Before', completed: false },
    { id: 'fragile', text: 'Step 2: Pack fragile box glassware carefully (Or select our Material Prep Kit!)', category: '2 Weeks Before', completed: false },
    { id: 'parking', text: 'Step 3: Clear paths, reserve elevator access, or pre-arrange alley parking routes', category: '1 Week Before', completed: false },
    { id: 'deposit', text: 'Step 4: Lock in crew dispatch by sending the required $100 security deposit on Cash App', category: 'Moving Week', completed: false },
    { id: 'essentials', text: 'Step 5: Bundle essential records, laptop, medicines, and keys in your personal backpack', category: 'Moving Day', completed: false },
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
    // 1. Base Rate (Hourly based: $120/hr, $180/hr, or $230/hr depending on chosen option, 3 hours minimum enforced)
    const activeHours = Math.max(3, estimatedHours);
    const hourlyRate = crewAndTruck === '2movers_16ft' ? 120 : crewAndTruck === '3movers_26ft' ? 180 : 230;
    const base = activeHours * hourlyRate;
    setBasePrice(base);

    // 2. Distance Calculation using math coordinates
    const startCoord = CHICAGO_NEIGHBORHOODS[startZip] || { x: 190, y: 240 };
    const endCoord = CHICAGO_NEIGHBORHOODS[endZip] || { x: 170, y: 140 };
    
    // Scale distance
    const dx = (startCoord.x - endCoord.x) / 15;
    const dy = (startCoord.y - endCoord.y) / 15;
    const distanceEst = Math.sqrt(dx * dx + dy * dy);
    
    const miles = Math.max(1.5, Math.round(distanceEst * 2.8 * 10) / 10);
    setDistanceMiles(miles);

    // Travel Fee (Calculated as 0 per user requirement)
    const travel = 0;

    // 3. Labor Only discount (-25%)
    let currentSub = base + travel;
    let discountAmt = 0;
    if (laborOnly) {
      discountAmt = Math.round(currentSub * 0.25);
    }
    setLaborDiscount(discountAmt);

    // 4. Specialty Heavy Cargo Fee (+$200)
    const heavy = heavyItems ? 200 : 0;
    setHeavyFee(heavy);

    // 5. Packing Kit (+$45)
    const packCost = packingKit ? 45 : 0;
    setPackingFee(packCost);

    // 6. Escalator/Stairs/Walkway Fee (Stairs $35/hr, Long Walkway $40/hr)
    let stairsCost = 0;
    if (stairLevel === 'stairs') {
      stairsCost = estimatedHours * 35;
    } else if (stairLevel === 'walkway') {
      stairsCost = estimatedHours * 40;
    }
    setStairFee(stairsCost);

    // 7. Final Total Price
    const finalTotal = currentSub - discountAmt + heavy + packCost + stairsCost;
    setEstimatedCost(finalTotal);

  }, [sizeOfMove, estimatedHours, startZip, endZip, laborOnly, heavyItems, packingKit, stairLevel, crewAndTruck]);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !movingDate) {
      alert("Please fill in all contact and reservation fields to register your relocation request.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newId = `M312-${Math.floor(100000 + Math.random() * 900000)}`;
      
      // Pack additional parameters in special notes
      const notesList: string[] = [];
      const hourlyRate = crewAndTruck === '2movers_16ft' ? 120 : crewAndTruck === '3movers_26ft' ? 180 : 230;
      const crewDesc = crewAndTruck === '2movers_16ft' 
        ? '2 Movers & 16-FT Box Truck (Urban Fleet)' 
        : crewAndTruck === '3movers_26ft' 
          ? '3 Movers & 26-FT Box Truck (Urban Fleet)' 
          : '4 Movers & 26-FT Box Truck (Urban Fleet)';
      notesList.push(`Estimated Duration: ${estimatedHours} Hours (at $${hourlyRate}/hr, ${crewDesc})`);
      notesList.push("Security Deposit: $100 Paid via Cash App");
      if (packingKit) notesList.push("Requested Packing-Material Prep Kit");
      if (stairLevel === 'stairs') notesList.push("High-Altitude Stairway Challenge");
      if (stairLevel === 'walkway') notesList.push("Long Walkway (Court Yards) Route Challenge");
      if (specialNotes.trim()) notesList.push(`Guidelines: ${specialNotes}`);

      const compiledNotes = notesList.join(" | ");

      const newBooking: Booking = {
        id: newId,
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
        specialNotes: compiledNotes,
        estimatedCost,
        status: 'Pending',
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const updated = [newBooking, ...bookings];
      saveBookings(updated);
      setSuccessBookingId(newId);
      setIsSubmitting(false);

      // Trigger high-fidelity celebration burst
      confetti({
        particleCount: 120,
        spread: 75,
        origin: { y: 0.65 },
        colors: ['#122119', '#15803d', '#ffffff', '#eab308']
      });

      // Scroll smoothly down to the receipt zone
      const successEl = document.getElementById('booking-success-indicator');
      if (successEl) {
        successEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  const handleCancelBooking = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this archived quote?")) {
      const updated = bookings.filter(b => b.id !== id);
      saveBookings(updated);
      if (viewedBooking?.id === id) {
        setViewedBooking(null);
      }
    }
  };

  // Filter local bookings list
  const filteredBookings = bookings.filter(b => {
    const q = searchQuery.toLowerCase();
    return (
      b.id.toLowerCase().includes(q) ||
      b.fullName.toLowerCase().includes(q) ||
      b.email.toLowerCase().includes(q) ||
      b.phone.toLowerCase().includes(q) ||
      b.startZip.includes(q) ||
      b.endZip.includes(q)
    );
  });

  const resetFormState = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setMovingDate('');
    setTimeSlot('morning');
    setStartZip('60601');
    setEndZip('60614');
    setSizeOfMove('1bed');
    setLaborOnly(false);
    setHeavyItems(false);
    setPackingKit(false);
    setStairLevel('none');
    setSpecialNotes('');
    setSuccessBookingId(null);
  };

  // Quick helper to fetch coord info
  const startCoord = CHICAGO_NEIGHBORHOODS[startZip] || { x: 190, y: 240 };
  const endCoord = CHICAGO_NEIGHBORHOODS[endZip] || { x: 170, y: 140 };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-[#1a2d23] flex flex-col font-sans antialiased selection:bg-[#15803d]/30 selection:text-[#122119]">
      
      {/* Top Ticker Status Ticker */}
      <div className="bg-[#122119] text-white py-2 px-4 text-xs border-b border-[#1b3426] overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 font-mono">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[#a4ccb6] uppercase tracking-wider text-[10px] font-semibold">
              ILLINOIS ICC DISPATCH #3280B
            </span>
            <span className="text-white/20">|</span>
            <span className="text-white/80">Live Driver's Dispatch</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>📞 <a href="tel:+13123859229" className="hover:text-emerald-400 font-bold underline transition underline-offset-2">(312) 385-9229</a></span>
          </div>
        </div>
      </div>

      {/* Modernist Nav Header */}
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
                <span className="text-xl font-extrabold tracking-tight text-[#122119]">MOVERS</span>
                <span className="text-xl font-bold tracking-tight text-emerald-600">312</span>
              </div>
              <p className="text-[9px] uppercase font-bold tracking-widest text-emerald-800/65 mt-0.5 font-mono">Chicago Moving Company</p>
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

      {/* Main Structural Hero Banner */}
      <section className="relative overflow-hidden bg-[#122119] text-white py-14 px-6 md:px-12">
        {/* Abstract lines pattern in background resembling coordinates layout */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-900/40 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-mono">
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Chicagoland's Top-Rated Moving Crew</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none text-[#faf9f5]">
            Movers312 Professional Moving Services & Price Estimator
          </h1>
          <p className="text-[#a4ccb6] text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Configure your moving parameters, crew requirements, and access variables below for a guaranteed, 100% binding quote instantly!
          </p>
        </div>
      </section>

      {/* Dynamic Main Workspace Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 -mt-10 mb-20 relative z-20 w-full flex-grow">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUMN 1: Dynamic Form Configuration Grid (7 Cols) */}
          <div className="lg:col-span-7 bg-[#f2f1ec] border border-[#e2dfd5] rounded-2xl p-6 md:p-8 shadow-md">
            
            <div className="border-b border-[#e2dfd5] pb-5 mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-[#122119] tracking-tight">Configuration Parameters</h2>
                <p className="text-xs text-[#6e7d75] mt-1">Specify layout dimensions and cargo conditions.</p>
              </div>
              <span className="font-mono text-[10px] bg-[#122119] text-light text-white px-2.5 py-1 rounded-md uppercase font-bold tracking-wider">
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
                      Pick-up ZIP (Origin Location)
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
                      Drop-off ZIP (Destination Location)
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

              {/* SECTION B: PROPERTY SIZE (Interactive Custom Cards) */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs bg-emerald-100 text-[#122119] font-black w-5 h-5 rounded-md flex items-center justify-center">B</span>
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#122119] font-mono">Residence Volume & Estimated Hours</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(['studio', '1bed', '2bed', '3bed_plus'] as const).map((key) => {
                    const selected = sizeOfMove === key;
                    const recommendedHours = key === 'studio' ? 3 : key === '1bed' ? 4 : key === '2bed' ? 6 : 8;
                    const pricingText = `Est. ${recommendedHours} Hrs`;
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
                        <span className="block font-bold text-xs uppercase tracking-tight">{SIZE_LABELS[key].split(' ')[0]}</span>
                        <span className="block text-[10px] opacity-75 mt-0.5 leading-snug font-serif">
                          {key === 'studio' && "2 Crew • Simple Lift"}
                          {key === '1bed' && "2 Crew • Small Flat"}
                          {key === '2bed' && "3 Crew • Heavy Safe"}
                          {key === '3bed_plus' && "4 Crew • Elite Truck"}
                        </span>
                        <span className="mt-2 text-xs font-mono font-bold block self-end">
                          {pricingText}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* SECTION B.2: HOURLY ESTIMATOR AND HOURLY STEPPER */}
                <div className="bg-white border border-[#e2dfd5] rounded-xl p-5 space-y-4">
                  {/* Crew & Vehicle Configuration Picker */}
                  <div className="space-y-4 pb-2">
                    <label className="block text-xs font-extrabold text-emerald-900 font-mono uppercase tracking-wider bg-emerald-50 border border-emerald-150 px-3 py-1.5 rounded-lg w-fit">
                      🚛 Select 16-FT or 26-FT Urban Fleet Configuration
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
                        <div className="text-xs font-black tracking-tight">2 Movers & 16-FT Urban Fleet</div>
                        <div className="text-[10px] font-mono text-[#5e6c62] mt-1 font-bold bg-slate-150/40 w-fit px-1.5 py-0.5 rounded">$120/Hr (3h min)</div>
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
                        <div className="text-xs font-black tracking-tight">3 Movers & 26-FT Urban Fleet</div>
                        <div className="text-[10px] font-mono text-[#5e6c62] mt-1 font-bold bg-slate-150/40 w-fit px-1.5 py-0.5 rounded">$180/Hr (3h min)</div>
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
                        <div className="text-xs font-black tracking-tight">4 Movers & 26-FT Urban Fleet</div>
                        <div className="text-[10px] font-mono text-[#5e6c62] mt-1 font-bold bg-slate-150/40 w-fit px-1.5 py-0.5 rounded">$230/Hr (3h min)</div>
                        {crewAndTruck === '4movers_26ft' && <div className="absolute right-0 top-0 bg-emerald-600 text-white text-[8px] font-mono font-black uppercase px-2 py-0.5 rounded-bl">Active</div>}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-2 border-t border-[#f2f1ec]">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/50">
                          Tariff Rate: ${crewAndTruck === '2movers_16ft' ? '120' : crewAndTruck === '3movers_26ft' ? '180' : '230'} / hr
                        </span>
                        <span className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200/50">
                          {crewAndTruck === '2movers_16ft' ? '2 Movers & 16-FT Box Truck (Urban Fleet)' : crewAndTruck === '3movers_26ft' ? '3 Movers & 26-FT Box Truck (Urban Fleet)' : '4 Movers & 26-FT Box Truck (Urban Fleet)'}
                        </span>
                        <span className="text-[10px] uppercase font-mono tracking-widest font-extrabold text-[#122119] bg-slate-100 px-2.5 py-0.5 rounded border border-gray-200">
                          3 Hrs Min
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[#122119] mt-2 font-sans">Adjust Estimated Duration</h4>
                    </div>
                    <div className="flex items-center gap-3 bg-[#f2f1ec] px-3 py-1.5 rounded-lg border border-[#cbd2cd] self-stretch sm:self-auto justify-between">
                      <button 
                        type="button" 
                        onClick={() => setEstimatedHours(h => Math.max(3, h - 1))}
                        disabled={estimatedHours <= 3}
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
                  <div className="text-[11px] text-[#4d5f54] leading-relaxed font-serif flex justify-between items-center bg-[#fcfbf9] p-3 rounded-lg border border-[#f2f1ec]">
                    <span>Base Labor Rate Estimate ({estimatedHours} hours × ${crewAndTruck === '2movers_16ft' ? '120' : crewAndTruck === '3movers_26ft' ? '180' : '230'}/hr - {crewAndTruck === '2movers_16ft' ? '2 Movers & 16-FT Box Truck (Urban Fleet)' : crewAndTruck === '3movers_26ft' ? '3 Movers & 26-FT Box Truck (Urban Fleet)' : '4 Movers & 26-FT Box Truck (Urban Fleet)'}):</span>
                    <span className="font-mono font-bold text-[#122119]">${estimatedHours * (crewAndTruck === '2movers_16ft' ? 120 : crewAndTruck === '3movers_26ft' ? 180 : 230)}</span>
                  </div>
                </div>
              </div>

              {/* SECTION C: DATE & TIME SPECIFIERS */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs bg-emerald-100 text-[#122119] font-black w-5 h-5 rounded-md flex items-center justify-center">C</span>
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#122119] font-mono">Dispatch Calendar & Timings</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1.5">
                      Relocation Date Check-In
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
                      Preferred Service Window
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id="time-slot-morn-btn"
                        type="button"
                        onClick={() => setTimeSlot('morning')}
                        className={`py-2 text-xs rounded-lg font-bold border transition ${
                          timeSlot === 'morning'
                            ? 'bg-[#122119] border-[#122119] text-white'
                            : 'bg-white border-[#cbd2cd] text-[#1a2d23] hover:bg-slate-50'
                        }`}
                      >
                        🌅 8:00 AM Prompt
                      </button>
                      <button
                        id="time-slot-aft-btn"
                        type="button"
                        onClick={() => setTimeSlot('afternoon')}
                        className={`py-2 text-xs rounded-lg font-bold border transition ${
                          timeSlot === 'afternoon'
                            ? 'bg-[#122119] border-[#122119] text-white'
                            : 'bg-white border-[#cbd2cd] text-[#1a2d23] hover:bg-slate-50'
                        }`}
                      >
                        🌇 1:00 PM Window
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION D: OPTIONAL LOGISTICS ADDITIONS */}
              <div className="space-y-3 bg-[#fcfbf9] border border-[#e2dfd5] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs bg-emerald-100 text-[#122119] font-black w-5 h-5 rounded-md flex items-center justify-center">D</span>
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#122119] font-mono">Stairways & Material Kit Options</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Stairway Difficulty challenge level */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1.5">
                      Stairway / Elevation Obstacles
                    </label>
                    <div className="grid grid-cols-3 gap-1">
                      {(['none', 'stairs', 'walkway'] as const).map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setStairLevel(level)}
                          className={`py-2 text-[10px] font-bold rounded-md border transition ${
                            stairLevel === level
                              ? 'bg-emerald-850 text-white border-emerald-850'
                              : 'bg-white border-[#cbd2cd] text-[#1a2d23] hover:bg-[#fafaf6]'
                          }`}
                        >
                          {level === 'none' && "None / Ramp"}
                          {level === 'stairs' && "3rd Floor+ Stairs (+$35/hr)"}
                          {level === 'walkway' && "Long Walkway (+$40/hr)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Packing Toggles */}
                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1.5">
                      Material Packing Supply Kit
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
                        📦 Add Professional Tape & Box Kit
                      </span>
                      <span className="font-mono font-bold">+$45</span>
                    </button>
                  </div>
                </div>

                {/* Original Toggles (heavy items, labor only) redesigned beautifully */}
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
                      <span className="block text-xs font-bold text-[#122119]">Labor Only Focus (-25%)</span>
                      <span className="block text-[10px] text-[#5e6c62] mt-0.5">We provide professional lifters; you supply the trailer.</span>
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
                      <span className="block text-xs font-bold text-[#122119]">Heavy Specialty Cargo (+$200)</span>
                      <span className="block text-[10px] text-[#5e6c62] mt-0.5">Applies to Upright Piano, heavy gun safes, pool tables, sports equipment, jacuzzi.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* SECTION E: USER IDENTIFICATION */}
              <div className="space-y-3 bg-white border border-[#e2dfd5] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs bg-emerald-100 text-[#122119] font-black w-5 h-5 rounded-md flex items-center justify-center">E</span>
                  <h3 className="text-xs uppercase font-extrabold tracking-wider text-[#122119] font-mono">Contact Authorized Personnel</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1">Authorized Contact Full Name *</label>
                    <input
                      id="contact-fullname-input"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border border-[#cbd2cd] hover:border-[#122119] rounded-lg px-3 py-2 text-xs bg-white text-[#122119] focus:outline-none focus:ring-1 focus:ring-[#122119] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1">Email Coordinates *</label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-[#cbd2cd] hover:border-[#122119] rounded-lg px-3 py-2 text-xs bg-white text-[#122119] focus:outline-none focus:ring-1 focus:ring-[#122119] transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#3d5246] mb-1">Direct Phone Contact *</label>
                    <input
                      id="contact-phone-input"
                      type="tel"
                      required
                      placeholder="(312) 555-0150"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-[#cbd2cd] hover:border-[#122119] rounded-lg px-3 py-2 text-xs bg-white text-[#122119] focus:outline-none focus:ring-1 focus:ring-[#122119] transition font-mono"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label className="block text-xs font-semibold text-[#3d5246] mb-1">Guidelines, Obstacles or Narrow Alleys (Optional)</label>
                  <textarea
                    id="contact-notes-textarea"
                    rows={2}
                    placeholder="Provide guidelines regarding narrow back alleys, tight spiral elevators, long walkways, or parking permits..."
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
                    <span>Locking Dispatch Coordinates...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Generate & Lock Binding Estimate</span>
                  </>
                )}
              </button>

            </form>

          </div>

          {/* COLUMN 2: Cost Sticky Invoice Receipt & Map Visualizer (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-[100px]">
            
            {/* Visual dynamic Chicago Moving Map SVG */}
            <div className="bg-[#122119] text-white border border-[#1b3426] rounded-2xl overflow-hidden p-4 shadow-md space-y-3 relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-extrabold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                  DISPATCH ROUTE VISUALIZER
                </span>
                <span className="text-[9px] font-mono text-[#a4ccb6]">GRID VIEW</span>
              </div>

              {/* SVG Coordinate plotting map */}
              <div className="relative h-60 w-full bg-[#0d1712] border border-white/5 rounded-xl flex items-center justify-center">
                
                {/* SVG ocean representing Lake Michigan */}
                <svg className="absolute inset-0 w-full h-full text-emerald-950/20 pointer-events-none" viewBox="0 0 350 450">
                  {/* Lake Michigan Coastline shape */}
                  <path d="M 230 0 C 230 100, 310 150, 310 250 C 310 350, 350 400, 340 450 L 350 450 L 350 0 Z" fill="rgba(34, 197, 94, 0.08)" />
                  <path d="M 230 0 C 230 100, 310 150, 310 250 C 310 350, 350 400, 340 450" fill="none" stroke="rgba(34, 197, 94, 0.15)" strokeWidth="2" />
                  
                  {/* Fine grid lines decoration */}
                  <line x1="50" y1="0" x2="50" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="100" y1="0" x2="100" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="150" y1="0" x2="150" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="200" y1="0" x2="200" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="250" y1="0" x2="250" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="300" y1="0" x2="300" y2="450" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  <line x1="0" y1="100" x2="350" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="200" x2="350" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="300" x2="350" y2="300" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="0" y1="400" x2="350" y2="400" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  {/* Draw connection route line from pickup to dropoff */}
                  <line 
                    x1={startCoord.x} 
                    y1={startCoord.y} 
                    x2={endCoord.x} 
                    y2={endCoord.y} 
                    stroke="#22c55e" 
                    strokeWidth="3.5" 
                    strokeLinecap="round"
                    strokeDasharray="8, 6"
                    className="animate-map-pulse" 
                  />

                  {/* Inner dynamic route path */}
                  <line 
                    x1={startCoord.x} 
                    y1={startCoord.y} 
                    x2={endCoord.x} 
                    y2={endCoord.y} 
                    stroke="#ffffff" 
                    strokeWidth="1" 
                    strokeLinecap="round"
                  />

                  {/* Plot point station labels */}
                  {Object.entries(CHICAGO_NEIGHBORHOODS).map(([zip, d]) => {
                    const isStart = zip === startZip;
                    const isEnd = zip === endZip;
                    const isTerminalNode = isStart || isEnd;
                    return (
                      <g key={zip} className="transition-all duration-300">
                        {/* Glow halo around terminal points */}
                        {isTerminalNode && (
                          <circle 
                            cx={d.x} 
                            cy={d.y} 
                            r="11" 
                            fill={isStart ? "rgba(34, 197, 94, 0.25)" : "rgba(229, 231, 235, 0.25)"} 
                          />
                        )}
                        <circle 
                          cx={d.x} 
                          cy={d.y} 
                          r={isTerminalNode ? "6" : "3.5"} 
                          fill={isStart ? "#22c55e" : isEnd ? "#ffffff" : "rgba(255, 255, 255, 0.12)"} 
                          stroke={isTerminalNode ? "#122119" : "none"}
                          strokeWidth="1.5"
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Floating Map Indicators overlay styled as carbon cards */}
                <div className="absolute top-2 left-2 bg-[#122119]/90 border border-white/10 px-2.5 py-1.5 rounded text-[10px] font-mono leading-none flex gap-3">
                  <div>
                    <span className="text-emerald-400 block font-bold">● PICKUP ORIGIN</span>
                    <span className="text-white block mt-0.5">{startZip} - {CHICAGO_NEIGHBORHOODS[startZip]?.name.split(' (')[0]}</span>
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 bg-[#122119]/95 border border-white/10 px-2.5 py-1.5 rounded text-[10px] font-mono leading-none flex gap-3 text-right">
                  <div>
                    <span className="text-white block font-bold">○ DROP DESTINATION</span>
                    <span className="text-emerald-400 block mt-0.5">{endZip} - {CHICAGO_NEIGHBORHOODS[endZip]?.name.split(' (')[0]}</span>
                  </div>
                </div>

                {/* Coast labeling */}
                <span className="absolute top-10 right-4 text-[10px] uppercase font-bold tracking-widest text-[#a4ccb6]/35 font-mono rotate-90 transform origin-right">
                  Lake Michigan
                </span>
              </div>
            </div>

            {/* Sticky Invoice pricing tag CARD */}
            <div id="receipt-view-zone" className="bg-[#122119] text-white border border-[#1b3426] rounded-2xl overflow-hidden shadow-lg">
              
              {/* Receipt Header resembling custom airport luggage invoice tag */}
              <div className="bg-[#0b1410] px-6 py-4.5 border-b border-[#1b3426] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest font-black text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800/40">
                    Quote Ledger
                  </span>
                  <h3 className="text-sm font-bold tracking-tight text-[#faf9f5] mt-1.5 font-mono">BINDING TARIFF BREAKDOWN</h3>
                </div>
                <Truck className="w-5 h-5 text-emerald-400" />
              </div>

              {/* Line itemizations */}
              <div className="p-6 space-y-3.5 font-mono text-xs">
                
                {/* Base price hourly calculation line */}
                <div className="flex justify-between items-baseline py-0.5">
                  <div className="space-y-0.5">
                    <span className="text-white font-bold block">Base Hourly Labor Fee</span>
                    <span className="text-[#a4ccb6] text-[10px] block">
                      {estimatedHours} Hrs @ ${crewAndTruck === '2movers_16ft' ? '120' : crewAndTruck === '3movers_26ft' ? '180' : '230'}/hr ({crewAndTruck === '2movers_16ft' ? '2 Movers, 16-FT Box Truck (Urban Fleet)' : crewAndTruck === '3movers_26ft' ? '3 Movers, 26-FT Box Truck (Urban Fleet)' : '4 Movers, 26-FT Box Truck (Urban Fleet)'})
                    </span>
                  </div>
                  <span className="font-bold text-sm text-white">${basePrice}</span>
                </div>



                {/* Optional Packing materials surcharge */}
                {packingKit && (
                  <div className="flex justify-between items-baseline py-0.5 border-t border-white/5 pt-3">
                    <div className="space-y-0.5">
                      <span className="text-white font-bold block">Packing Materials Box Kit</span>
                      <span className="text-[#a4ccb6] text-[10px] block">Tape, heavy duty bubble wrappers</span>
                    </div>
                    <span className="font-bold text-emerald-400">+${packingFee}</span>
                  </div>
                )}

                {/* Stair Level adjustment surcharges */}
                {stairLevel !== 'none' && (
                  <div className="flex justify-between items-baseline py-0.5 border-t border-white/5 pt-3">
                    <div className="space-y-0.5">
                      <span className="text-white font-bold block">Elevation / Stairs / Walkway Fee</span>
                      <span className="text-[#a4ccb6] text-[10px] block">{stairLevel === 'stairs' ? "3rd Floor & Up Stairs ($35/hr)" : "Long Walkway / Courtyards ($40/hr)"}</span>
                    </div>
                    <span className="font-bold text-emerald-400">+${stairFee}</span>
                  </div>
                )}

                {/* Optional specialty heavy cargo charges */}
                {heavyItems && (
                  <div className="flex justify-between items-baseline py-0.5 border-t border-white/5 pt-3 text-red-400">
                    <div className="space-y-0.5">
                      <span className="text-red-400 font-bold block">Oversized Specialty Handling</span>
                      <span className="text-red-400/80 text-[10px] block">Piano or professional unit gear</span>
                    </div>
                    <span className="font-bold text-red-400">+${heavyFee}</span>
                  </div>
                )}

                {/* Labor only discount deductions */}
                {laborOnly && (
                  <div className="flex justify-between items-baseline py-0.5 border-t border-white/5 pt-3 text-emerald-300">
                    <div className="space-y-0.5">
                      <span className="font-bold block">Labor-Only Rate Deduction (-25%)</span>
                      <span className="text-emerald-300/80 text-[10px] block">User furnishes moving container / truck</span>
                    </div>
                    <span className="font-bold text-emerald-300">-${laborDiscount}</span>
                  </div>
                )}

                {/* Secure scheduling deposit paid via Cash app */}
                <div className="flex justify-between items-baseline py-0.5 border-t border-white/5 pt-3 text-[#00D632]">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[#00D632] font-bold">
                      <span className="hover:underline">Security Deposit Required</span>
                      <a 
                        href="https://cash.app/$Movers312" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[8px] font-mono tracking-wider font-extrabold text-[#00D632] bg-emerald-950/80 hover:bg-emerald-900 border border-[#00D632]/35 px-2 py-0.5 rounded shrink-0 transition"
                      >
                        CASH APP
                      </a>
                    </div>
                    <span className="text-[#a4ccb6] text-[10px] block">Required to lock dispatch moving window</span>
                  </div>
                  <span className="font-bold text-sm text-[#00D632]">$100</span>
                </div>

                {/* BINDING GUARANTEED TOTAL */}
                <div className="pt-4 border-t-2 border-dashed border-[#1b3426] mt-6 flex justify-between items-center bg-[#0d1712] p-4 rounded-xl">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest font-bold text-[#a4ccb6] font-mono leading-none">
                      Guaranteed Bound Estimate
                    </span>
                    <span className="block text-[9px] text-[#5e6c62] mt-1 font-mono leading-tight">
                      BIP / State Insured Included
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-3xl font-black text-white leading-none">${estimatedCost}</span>
                  </div>
                </div>

                <div className="bg-[#122119] rounded-lg p-3 text-[10px] text-[#a4ccb6] leading-relaxed border border-emerald-800/20">
                  🛡️ <strong className="text-white font-bold">Illinois Tariffs Locked</strong> — Estimates are generated from actual coordinates matrices in our cook county system. No secondary surprise charges will apply.
                </div>
              </div>
            </div>

            {/* White glove standards card */}
            <div className="bg-[#f2f1ec] border border-[#e2dfd5] rounded-xl p-5 space-y-3.5">
              <h4 className="font-bold text-[#122119] text-xs uppercase tracking-wider font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Moving Guarantees
              </h4>
              <ul className="space-y-2 text-xs text-[#35473e] font-serif">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Free 12 heavy duty moving blankets per crew</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Dual layered security straps on specialized wall systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Wardrobe boxes accessible for wardrobe transfer</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* SECTION: MOVERS312 SPECIALIZED LOGISTICS & VALUE ADDS */}
        <section id="movers312-core-features" className="mt-16 bg-[#faf9f5] border border-[#e2dfd5] rounded-2xl p-6 md:p-8 space-y-10 shadow-sm">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-800 font-bold font-mono text-[10px] tracking-widest uppercase block bg-emerald-50 border border-emerald-200/50 w-fit mx-auto px-2.5 py-0.5 rounded-md">
              PROFESSIONAL CHICAGO RELOCATION CORE
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-[#122119] tracking-tight">
              Why Chicago Trusts Movers312 Team
            </h2>
            <p className="text-[#5e6c62] text-xs font-serif leading-relaxed">
              Serving our community since 2018 with absolute safety assurance, high-capacity vehicles, and a carefully trained local workforce. Here are our premier features designed for you:
            </p>
          </div>

          {/* Interactive Bento Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#cbd2cd] rounded-xl p-5 space-y-3 hover:border-emerald-500 hover:shadow-md transition">
              <div className="bg-emerald-50/50 text-[#122119] p-2.5 rounded-lg w-fit border border-emerald-100">
                <Truck className="w-5 h-5 text-emerald-800" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#122119] font-mono">1. Pure Bound Estimates</h3>
              <p className="text-[11px] text-[#4d5f54] font-serif leading-relaxed">
                The quote simulated here is matching what you sign. Zero hidden gas, mileage, or seasonal up-charges ever.
              </p>
            </div>

            <div className="bg-white border border-[#cbd2cd] rounded-xl p-5 space-y-3 hover:border-emerald-500 hover:shadow-md transition">
              <div className="bg-emerald-50/50 text-[#122119] p-2.5 rounded-lg w-fit border border-emerald-100">
                <ShieldCheck className="w-5 h-5 text-emerald-800" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#122119] font-mono">2. Premium Wraps & Pads</h3>
              <p className="text-[11px] text-[#4d5f54] font-serif leading-relaxed">
                All crew assets include up to 12 heavy duty moving blankets and premium stretch wrap layers free-of-charge.
              </p>
            </div>

            <div className="bg-white border border-[#cbd2cd] rounded-xl p-5 space-y-3 hover:border-emerald-500 hover:shadow-md transition">
              <div className="bg-emerald-50/50 text-[#122119] p-2.5 rounded-lg w-fit border border-emerald-100">
                <Award className="w-5 h-5 text-emerald-800" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#122119] font-mono">3. Professional Dispatch 24/7</h3>
              <p className="text-[11px] text-[#4d5f54] font-serif leading-relaxed">
                Led by local supervisor Matt, our professional movers know typical Chicago tight corridors and stairs challenges.
              </p>
            </div>

            <div className="bg-white border border-[#cbd2cd] rounded-xl p-5 space-y-3 hover:border-emerald-500 hover:shadow-md transition">
              <div className="bg-emerald-50/50 text-[#122119] p-2.5 rounded-lg w-fit border border-emerald-100">
                <MapPin className="w-5 h-5 text-emerald-800" />
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#122119] font-mono">4. Cook County Licensed</h3>
              <p className="text-[11px] text-[#4d5f54] font-serif leading-relaxed">
                Movers312 is fully registered cargo logistics carrier (US DOT #4893122) operating safely inside strict guidelines.
              </p>
            </div>
          </div>

          {/* Interactive Moving Checklist Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-[#cbd2cd]/55">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-emerald-850" />
                <h3 className="font-extrabold text-[#122119] text-sm md:text-base tracking-tight">
                  Movers312 Interactive Moving Checklist
                </h3>
              </div>
              <p className="text-xs text-[#5e6c62] font-serif leading-relaxed">
                We design stress-free moving. Mark off your tasks below as you progress closer to your scheduled dispatch coordinates:
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 bg-[#f2f1ec] p-3 rounded-lg border border-[#cbd2cd]/40">
                <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#122119]">
                  <span>MOVING READINESS METER</span>
                  <span>{checklistTasks.filter(t => t.completed).length} OF {checklistTasks.length} COMPLETED</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-800 h-full transition-all duration-300"
                    style={{ width: `${(checklistTasks.filter(t => t.completed).length / checklistTasks.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
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
                        {task.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive FAQs Section */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-800" />
                <h3 className="font-extrabold text-[#122119] text-sm md:text-base tracking-tight">
                  Dispatched Logistics Help Desk FAQs
                </h3>
              </div>
              <p className="text-xs text-[#5e6c62] font-serif leading-relaxed">
                Click any prompt to expand instant guidance from our central Cook County logistics dispatch center:
              </p>

              {/* FAQ Accordion List */}
              <div className="space-y-2">
                {[
                  {
                    q: "How does the $100 Cash App deposit work?",
                    a: "The $100 holding deposit is sent directly to our secure Cash App user $Movers312. This verifies your schedule request, holds your specific truck size, commits your crew, and is 100% credited to your final move bill."
                  },
                  {
                    q: "Is Movers312 fully licensed and safe?",
                    a: "Yes! Led by expert operator Matt, we are a legitimate registered agency in Cook County with US DOT license cargo coverage (#4893122) and binding rates protecting you against unexpected surcharges."
                  },
                  {
                    q: "Can I adjust my duration during moving operations?",
                    a: "Absolutely. Our expert crew adapts on-site. If packing needs more hours, Matt matches standard pro-rated transparent rates ($120/hr, $180/hr, or $230/hr as quoted) on your actual dispatch log."
                  },
                  {
                    q: "Do you supply heavy lift tools and blankets?",
                    a: "Yes, every Movers312 job gets up to 12 heavy-duty padded cargo blankets, standard tools for bed frame disassembly, and expert furniture protection wrap elements at no extra fee."
                  }
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

        {/* SECTION: BOOKING SUCCESS INDICATOR overlay */}
        {successBookingId && (
          <div id="booking-success-indicator" className="mt-12 max-w-3xl mx-auto bg-white border border-emerald-200 shadow-xl rounded-2xl p-6 md:p-8 text-center animate-fade-in">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-100">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#122119] tracking-tight">Your Route Coordinates are Locked!</h3>
            <p className="text-[#4d5f54] text-xs mt-1 max-w-md mx-auto">
              Your request is logged directly in local storage. Dispatch key generated is <strong className="text-[#122119] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded font-mono font-bold tracking-wide text-xs">{successBookingId}</strong>.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-left text-xs bg-[#fcfbf9] border border-[#e2dfd5] rounded-xl p-4 font-mono">
              <div>
                <span className="block text-[#6e7d75] font-semibold text-[10px] mb-0.5">DISPATCH KEY</span>
                <span className="text-[#122119] font-black">{successBookingId}</span>
              </div>
              <div>
                <span className="block text-[#6e7d75] font-semibold text-[10px] mb-0.5">MOVING DATE</span>
                <span className="text-[#122119] font-bold">{movingDate}</span>
              </div>
              <div>
                <span className="block text-[#6e7d75] font-semibold text-[10px] mb-0.5">TIME WINDOW</span>
                <span className="text-[#122119] font-bold capitalize">{timeSlot}</span>
              </div>
              <div>
                <span className="block text-[#6e7d75] font-semibold text-[10px] mb-0.5">LOCKED QUOTE</span>
                <span className="text-emerald-700 font-extrabold text-sm">${estimatedCost}</span>
              </div>
            </div>

            {/* CASH APP DEPOSIT REQUIREMENT NOTICE BANNER - SIGNATURE GREEN */}
            <div className="mt-6 bg-[#00D632]/5 border-2 border-[#00D632] rounded-xl p-5 text-left space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#00D632] text-black font-semibold text-[10px] px-2.5 py-0.5 rounded-full font-mono uppercase tracking-wider">
                      CASH APP SECURITY DEPOSIT
                    </span>
                    <span className="bg-emerald-950 text-[#00D632] font-mono font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Required
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[#122119] tracking-tight">Lock Dispatch Guarantee Via Cash App</h4>
                  <p className="text-xs text-[#4d5f54] font-serif leading-relaxed">
                    To officially register your request & guarantee your crew dispatch moving window, please transfer the $100 security deposit.
                  </p>
                </div>
                <a 
                  href="https://cash.app/$Movers312"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto shrink-0 bg-[#00D632] hover:bg-[#00b529] text-black font-black px-5 py-3 rounded-xl font-mono text-center shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group border border-emerald-400/30 hover:scale-[1.02] active:scale-[0.98]"
                  title="Open Cash App at https://cash.app/$Movers312"
                >
                  <div className="text-left">
                    <div className="text-[10px] opacity-75 font-semibold tracking-wider leading-none">SEND DEPOSIT</div>
                    <div className="text-sm font-black mt-0.5 flex items-center gap-1">
                      <span>$Movers312</span>
                      <span className="text-[10px] bg-black text-[#00D632] font-extrabold px-1 rounded">➔</span>
                    </div>
                  </div>
                </a>
              </div>

              <div className="bg-[#00D632]/10 border border-[#00D632]/20 rounded-lg p-3 text-[11px] text-[#0d591b] leading-relaxed font-sans">
                ⚠️ <strong className="text-green-950 font-bold">CRITICAL MEMO DETAILS:</strong> Enter your Dispatch Key <span className="font-mono bg-white px-2 py-0.5 border border-[#00D632]/30 text-[#122119] font-black rounded">{successBookingId}</span> into the transaction description so our cook county dispatch system can match and authorize your booking instantly.
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center text-xs">
              <a
                href="#saved-estimates-ledger"
                className="bg-[#122119] text-[#faf9f5] font-bold px-5 py-2.5 rounded-lg hover:bg-[#1e3428] font-mono uppercase tracking-wider transition"
              >
                Go To Ledger Logs Below
              </a>
              <button
                id="estimate-another-btn"
                onClick={resetFormState}
                className="border border-[#cbd2cd] text-[#3d5246] font-bold px-5 py-2.5 rounded-lg hover:bg-slate-50 transition"
              >
                Estimate New Target Route
              </button>
            </div>
          </div>
        )}

        {/* SECTION: HISTORIC DISPATCH LEDGER SYSTEM */}
        <section id="saved-estimates-ledger" className="mt-16 bg-[#eef0eb] border border-[#d6dad0] rounded-2xl p-6 md:p-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#cbd2cd] pb-5 mb-6">
            <div>
              <h3 className="font-extrabold text-[#122119] text-base md:text-lg tracking-tight">Active Cached Dispatch Ledgers</h3>
              <p className="text-xs text-[#5e6c62] mt-0.5">Review, audit and verify dynamic estimates stored in local browser cookie-state.</p>
            </div>

            {/* Search filter input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-800" />
              <input
                id="history-search-input"
                type="text"
                placeholder="Search ledger ID, ZIP node, or personnel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-[#cbd2cd] rounded-xl text-xs bg-white text-[#122119] focus:outline-none focus:border-[#122119] transition font-mono"
              />
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <div className="py-12 border-2 border-dashed border-[#ccd0c7] rounded-xl text-center bg-white/40">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-5 h-5 shrink-0" />
              </div>
              <h4 className="font-bold text-[#122119] text-xs">No Active Ledgers Logged</h4>
              <p className="text-xs text-[#5e6c62] max-w-sm mx-auto mt-1 leading-relaxed">
                {bookings.length > 0 
                  ? "Refine parameters or clear searches to access other files."
                  : "You have yet to create relocation logs on this workstation browser session."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse font-mono">
                <thead>
                  <tr className="border-b border-[#cbd2cd] text-[#5e6c62] font-bold text-[10px] uppercase tracking-wider">
                    <th className="py-2.5 px-3">LEDGER KEY</th>
                    <th className="py-2.5 px-3">AUTHORIZED CIVILIAN</th>
                    <th className="py-2.5 px-3">COORDINATE AXIS</th>
                    <th className="py-2.5 px-3">SCHEDULED</th>
                    <th className="py-2.5 px-3">CARGO METRICS</th>
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
                        <div className="text-[10px] text-[#5e6c62] font-mono mt-0.5">{b.phone} • {b.email}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 font-bold text-[#122119]">
                          <span>ZIP {b.startZip}</span>
                          <span className="text-slate-400">➔</span>
                          <span>ZIP {b.endZip}</span>
                        </div>
                        <div className="text-[10px] text-[#5e6c62] max-w-[160px] truncate font-sans">
                          {CHICAGO_NEIGHBORHOODS[b.startZip]?.name.split(' (')[0]} to {CHICAGO_NEIGHBORHOODS[b.endZip]?.name.split(' (')[0]}
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-[#122119]">{b.movingDate}</div>
                        <div className="text-[10px] text-[#5e6c62] capitalize">{b.timeSlot}</div>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-[#122119]">
                          {SIZE_LABELS[b.sizeOfMove]?.split(' (')[0] || b.sizeOfMove}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-0.5 max-w-[180px]">
                          <span className={`px-1 py-px rounded text-[9px] font-bold leading-none ${b.laborOnly ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-emerald-100 text-emerald-900 border border-emerald-200'}`}>
                            {b.laborOnly ? 'Labor Only' : 'Crew+Truck'}
                          </span>
                          {b.heavyItems && (
                            <span className="bg-red-50 text-red-900 border border-red-200 px-1 py-px rounded text-[9px] font-bold leading-none">
                              Heavy
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-extrabold text-xs text-[#122119] font-mono">
                        ${b.estimatedCost}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          id={`delete-booking-${b.id}`}
                          onClick={(e) => handleCancelBooking(b.id, e)}
                          className="text-[#627267] hover:text-red-700 hover:bg-[#e1e4de] p-1.5 rounded transition bg-transparent"
                          title="Erase log"
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

      {/* SECTION: MODAL DETAILED QUOTE LIGHTBOX */}
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
                className="text-[#a4ccb6] hover:text-white text-xs border border-white/20 hover:border-white px-2 py-1 rounded"
              >
                ✕ CLOSE
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-4 border-b border-[#e2dfd5] pb-4">
                <div>
                  <span className="text-[#627267] text-[10px] block font-bold">AUTHORIZED CODES</span>
                  <span className="text-[#122119] font-bold text-sm leading-relaxed">{viewedBooking.fullName}</span>
                </div>
                <div>
                  <span className="text-[#627267] text-[10px] block font-bold">CONTACT INFO</span>
                  <span className="text-[#122119] font-bold block mt-0.5 font-sans">{viewedBooking.phone}</span>
                  <span className="text-[#5e6c62] block text-[10px] truncate">{viewedBooking.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b border-[#e2dfd5] pb-4">
                <div>
                  <span className="text-[#627267] text-[10px] block font-bold">DISPATCH MOVING GRID</span>
                  <span className="text-[#122119] font-bold block mt-0.5">ZIP {viewedBooking.startZip} ➔ ZIP {viewedBooking.endZip}</span>
                  <span className="text-[#5e6c62] block text-[10px] font-sans">
                    {CHICAGO_NEIGHBORHOODS[viewedBooking.startZip]?.name.split(' (')[0]} to {CHICAGO_NEIGHBORHOODS[viewedBooking.endZip]?.name.split(' (')[0]}
                  </span>
                </div>
                <div>
                  <span className="text-[#627267] text-[10px] block font-bold">SCHEDULE DATE</span>
                  <span className="text-[#122119] font-bold block mt-0.5">{viewedBooking.movingDate}</span>
                  <span className="text-[#5e6c62] block text-[10px] capitalize">{viewedBooking.timeSlot} window</span>
                </div>
              </div>

              <div>
                <span className="text-[#627267] text-[10px] block font-bold">SPECIALTY REQUIREMENTS LOGS</span>
                <span className="text-[#122119] font-medium leading-relaxed block bg-[#f2f1ec] p-3 rounded-lg border border-[#e2dfd5] mt-1.5 font-sans">
                  {viewedBooking.specialNotes || "Standard guidelines; no extra accessories mapped."}
                </span>
              </div>

              {/* CASH APP SECURITY DEPOSIT MODAL DETAILS */}
              <div className="bg-[#00D632]/5 border-2 border-[#00D632] rounded-xl p-4 space-y-3 text-xs font-mono">
                <div className="flex justify-between items-center text-[#122119]">
                  <span className="font-bold flex items-center gap-1.5 hover:underline">
                    <span className="w-2.5 h-2.5 bg-[#00D632] rounded-full animate-pulse"></span>
                    Security Deposit Required
                  </span>
                  <span className="font-extrabold text-[#15803d] font-mono text-sm">$100</span>
                </div>
                <p className="text-[10px] text-[#4d5f54] leading-relaxed font-sans">
                  The standard scheduling holding deposit of $100 must be sent to <strong className="font-mono text-[#122119] bg-[#00D632]/10 px-1 py-0.5 rounded font-bold hover:underline">$Movers312</strong> on Cash App. Include your Dispatch ID <strong className="font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-100 rounded font-bold">{viewedBooking.id}</strong> in your reference memo.
                </p>
                <a
                  href="https://cash.app/$Movers312"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#00D632] hover:bg-[#00b529] text-black font-black py-2.5 px-4 rounded-lg text-center transition-all duration-200 tracking-wider flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] border border-emerald-400/20 shadow-sm"
                  title="Open Cash App at https://cash.app/$Movers312"
                >
                  <span className="text-xs">Pay with Cash App ($Movers312)</span>
                  <span className="text-[10px] bg-black text-[#00D632] px-1.5 py-0.5 rounded font-bold">➔</span>
                </a>
              </div>

              <div className="flex justify-between items-center bg-[#122119] text-white p-4.5 rounded-xl border border-emerald-900 mt-6 pt-3">
                <div className="font-mono">
                  <span className="text-[10px] text-[#a4ccb6] block leading-none">TOTAL TARIFF RATE</span>
                  <span className="text-[9px] text-[#5e6c62] block mt-1">Guaranteed Bound Price</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#faf9f5]">${viewedBooking.estimatedCost}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: COGNIZANT TESTIMONIALS */}
      <section className="bg-[#122119] text-white py-14 px-6 md:px-12 border-t border-[#0b1410]">
        <div className="max-w-7xl mx-auto space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-400 font-bold font-mono text-[10px] tracking-widest uppercase block">
              CHICAGOLAND VERDICTS
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#faf9f5] tracking-tight">
              Community Endorsements
            </h2>
            <div className="flex justify-center gap-0.5 text-emerald-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-serif">
            
            <div className="bg-[#0f1b14] p-6 rounded-xl border border-white/5 space-y-4">
              <div className="flex text-emerald-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#a4ccb6] italic leading-relaxed">
                "Simple, elegant mapping and quote tool! Managed my moving coordinates from Wicker Park back to Lincoln Park instantly. Matt and the Movers312 team arrived right on the dot, wrapped my fragile glassware like true pros, and loaded the truck in record time. Absolute superstars!"
              </p>
              <div className="font-mono text-[11px] text-white font-bold leading-none">— Elena S. • Wicker Park</div>
            </div>

            <div className="bg-[#0f1b14] p-6 rounded-xl border border-white/5 space-y-4">
              <div className="flex text-emerald-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#a4ccb6] italic leading-relaxed">
                "We requested a labor-only set of parameters to upload heavy oak furniture into Lakeview. The 25% tariff deduction applied correctly and instantly. The entire crew was incredibly disciplined, and Matt's communication from Movers312 was five-star grade throughout!"
              </p>
              <div className="font-mono text-[11px] text-white font-bold leading-none">— David K. • Lakeview</div>
            </div>

            <div className="bg-[#0f1b14] p-6 rounded-xl border border-white/5 space-y-4">
              <div className="flex text-emerald-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#a4ccb6] italic leading-relaxed">
                "Exemplary service! We had a tricky high-altitude staircase challenge in Streeterville with a heavy antique unit. Matt from Movers312 personally supervised the technical tilt, heavy wrap, and padding layers. Fast delivery schedule and perfect transparency. Highly satisfied."
              </p>
              <div className="font-mono text-[11px] text-white font-bold leading-none">— Marcus V. • Streeterville</div>
            </div>

            <div className="bg-[#0f1b14] p-6 rounded-xl border border-white/5 space-y-4">
              <div className="flex text-emerald-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#a4ccb6] italic leading-relaxed">
                "I have to give massive credit to Matt and his Movers312 crew. They moved our entire 3-bedroom place from Hyde Park to River North in the middle of a bad storm without a single scratch on any of our belongings. Absolute lifesavers and very fair rates!"
              </p>
              <div className="font-mono text-[11px] text-white font-bold leading-none">— Sarah M. • Hyde Park</div>
            </div>

            <div className="bg-[#0f1b14] p-6 rounded-xl border border-white/5 space-y-4">
              <div className="flex text-emerald-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#a4ccb6] italic leading-relaxed">
                "Booked the newly added Option 3 (3 movers and a 26ft box truck) for a heavy downtown relocation. Best moving decision ever made. Matt of Movers312 coordinated the entire logistics dock reservation flawlessly. Will recommend them to all my friends!"
              </p>
              <div className="font-mono text-[11px] text-white font-bold leading-none">— Julian T. • South Loop</div>
            </div>

            <div className="bg-[#0f1b14] p-6 rounded-xl border border-white/5 space-y-4">
              <div className="flex text-emerald-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#a4ccb6] italic leading-relaxed">
                "Finding a trustworthy local mover is hard. Movers312 made my transition to Evanston a breeze. This online quote engine is astonishingly accurate, and Matt checked in on us multiple times during crew transit. Excellent care!"
              </p>
              <div className="font-mono text-[11px] text-white font-bold leading-none">— Clara R. • Evanston</div>
            </div>

            <div className="bg-[#0f1b14] p-6 rounded-xl border border-white/5 space-y-4">
              <div className="flex text-emerald-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#a4ccb6] italic leading-relaxed">
                "I called Movers312 Company last minute after another service bailed on us. Matt personally answered my distress call, rerouted a truck, and moved our whole household within 4 hours. No hidden fees, extremely professional, and amazing customer service."
              </p>
              <div className="font-mono text-[11px] text-white font-bold leading-none">— Thomas D. • Logan Square</div>
            </div>

            <div className="bg-[#0f1b14] p-6 rounded-xl border border-white/5 space-y-4">
              <div className="flex text-emerald-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#a4ccb6] italic leading-relaxed">
                "Absolutely outstanding experience with Movers312 Company. Matt and his crew were exceptionally polite, took amazing care with our custom glass cabinets, and worked at an incredible speed. 5 stars are not enough for this level of care."
              </p>
              <div className="font-mono text-[11px] text-white font-bold leading-none">— Melissa G. • Lincoln Park</div>
            </div>

            <div className="bg-[#0f1b14] p-6 rounded-xl border border-white/5 space-y-4">
              <div className="flex text-emerald-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#a4ccb6] italic leading-relaxed">
                "Movers312 Company is absolutely fantastic. Matt coordinated the logistics perfectly, and the team made our transition to Bucktown seamless and quick. Strongly recommend them for any Chicago move!"
              </p>
              <div className="font-mono text-[11px] text-white font-bold leading-none">— Sarah K. • Bucktown</div>
            </div>

            <div className="bg-[#0f1b14] p-6 rounded-xl border border-white/5 space-y-4">
              <div className="flex text-emerald-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#a4ccb6] italic leading-relaxed">
                "Movers312 Company is the real deal. I was super stressed about moving into a high-rise downtown with strict elevator booking slots, but Matt had his team organized so efficiently that we finished with 30 minutes to spare. Truly premium local service!"
              </p>
              <div className="font-mono text-[11px] text-white font-bold leading-none">— Robert P. • West Loop</div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: PLAIN STATIC TRUST BADGES */}
      <section className="bg-white border-t border-b border-[#cbd2cd] py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="flex items-start gap-3">
              <div className="p-2 sm:p-2.5 bg-[#122119] text-white rounded-lg">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#122119] uppercase tracking-wider font-mono">Carrier Liability Bonded</h4>
                <p className="text-xs text-[#4d5f54] leading-relaxed mt-1 font-serif">Comprehensive state cargo insurance policy guards every item during transport.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 sm:p-2.5 bg-[#122119] text-white rounded-lg">
                <Truck className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#122119] uppercase tracking-wider font-mono">16-Ft Urban Fleet</h4>
                <p className="text-xs text-[#4d5f54] leading-relaxed mt-1 font-serif">Engineered to fit narrow architectural alleyways inside cook county.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 sm:p-2.5 bg-[#122119] text-white rounded-lg">
                <Star className="w-4.5 h-4.5 text-yellow-400 fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#122119] uppercase tracking-wider font-mono">5-Star Standards</h4>
                <p className="text-xs text-[#4d5f54] leading-relaxed mt-1 font-serif">Pristine community reputation built upon meticulous handling standards.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 sm:p-2.5 bg-[#122119] text-white rounded-lg">
                <Award className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-[#122119] uppercase tracking-wider font-mono">Licensed ICC Operators</h4>
                <p className="text-xs text-[#4d5f54] leading-relaxed mt-1 font-serif">Intensive training in technical lifting mechanics and safety methods.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PLAIN MINIMAL NOTIFICATION FOOTER - TURQUOISE COLOR SCHEME */}
      <footer className="bg-black text-[#30D5C8]/75 py-12 px-6 md:px-12 border-t border-[#0b1410] text-[11px] font-mono">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <div className="md:col-span-5 space-y-4">
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
              Specialized high-fidelity cargo relocation across Chicago and surrounding Cook County neighborhoods. We ensure standard binding rates, absolute safety assurance blanket wrapping, and background-checked logistics operators.
            </p>
            <div className="text-[10px] text-[#30D5C8]/50">
              © {new Date().getFullYear()} MOVERS312 Company. All rights reserved. US DOT #4893122. Cook County Licensed Cargo Carrier.
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[#30D5C8] font-extrabold uppercase tracking-wider text-xs">COMMUNICATION CODES</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#30D5C8]/60 shrink-0" />
                <span>(312) 385-9229</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#30D5C8]/60 shrink-0" />
                <span>Movers312.Com@Gmail.Com</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[#30D5C8] font-extrabold uppercase tracking-wider text-xs">ILLINOIS STATUTE SECURITY</h4>
            <p className="leading-relaxed font-sans text-xs text-[#30D5C8]/70">
              All vehicles operate strictly under standard state weight limits and clean emission compliance guidelines. Cargo is stored inside lock-protected, weatherproof 16-foot specialized vehicles.
            </p>
            <div className="flex flex-wrap gap-1">
              <span className="bg-[#30D5C8]/10 border border-[#30D5C8]/30 text-[#30D5C8] px-2 py-0.5 rounded text-[9px] font-bold">100% BONDED</span>
              <span className="bg-[#30D5C8]/10 border border-[#30D5C8]/30 text-[#30D5C8] px-2 py-0.5 rounded text-[9px] font-bold">COOK COUNTY ICC</span>
              <span className="bg-[#30D5C8]/10 border border-[#30D5C8]/30 text-[#30D5C8] px-2 py-0.5 rounded text-[9px] font-bold">USDOT COMPLIANT</span>
            </div>
          </div>

        </div>
      </footer>
      
    </div>
  );
}
