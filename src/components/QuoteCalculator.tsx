import React, { useState, useEffect } from 'react';
import { 
  Truck, Users, Clock, ArrowRight, ShieldCheck, 
  MapPin, Calendar, Info, Sparkles, AlertCircle
} from 'lucide-react';
import { HOME_SIZES, PRICING, HomeSizeKey } from '../types';

interface QuoteCalculatorProps {
  onCalculate: (data: {
    fromAddress: string;
    toAddress: string;
    homeSize: HomeSizeKey;
    movingDate: string;
    hoursNeeded: number;
    extraMovers: number;
    totalPrice: number;
  }) => void;
  initialData?: any;
}

export default function QuoteCalculator({ onCalculate, initialData }: QuoteCalculatorProps) {
  // Calculator States
  const [fromAddress, setFromAddress] = useState(initialData?.fromAddress || '');
  const [toAddress, setToAddress ] = useState(initialData?.toAddress || '');
  const [homeSize, setHomeSize] = useState<HomeSizeKey>(initialData?.homeSize || '1bed');
  const [movingDate, setMovingDate] = useState(initialData?.movingDate || '');
  const [hoursNeeded, setHoursNeeded] = useState<number>(initialData?.hoursNeeded || 4);
  const [extraMovers, setExtraMovers] = useState<number>(initialData?.extraMovers || 0);

  // Auto-adjust hours based on selected home size
  useEffect(() => {
    if (HOME_SIZES[homeSize]) {
      setHoursNeeded(Math.max(PRICING.minHours, HOME_SIZES[homeSize].baseHours));
    }
  }, [homeSize]);

  // Calculations
  const baseHourlyRate = PRICING.baseHourlyRate;
  const extraMoversRate = extraMovers * PRICING.additionalMoverRate;
  const totalHourlyRate = baseHourlyRate + extraMoversRate;
  
  // Ensure we abide by 3 hours minimum
  const displayHours = Math.max(PRICING.minHours, hoursNeeded);
  const hourlyTotal = totalHourlyRate * displayHours;
  const securityDeposit = PRICING.securityDeposit;
  const totalPrice = hourlyTotal - securityDeposit;

  const handleCalculateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      fromAddress,
      toAddress,
      homeSize,
      movingDate,
      hoursNeeded: displayHours,
      extraMovers,
      totalPrice
    });
  };

  // Helper to determine simulated truck fullness
  const getTruckFullness = (size: HomeSizeKey) => {
    switch(size) {
      case 'studio': return { percent: 40, label: 'Plenty of extra space left' };
      case '1bed': return { percent: 65, label: 'Perfect comfort fit' };
      case '2bed': return { percent: 85, label: 'Snug fit, highly efficient' };
      case '3bed': return { percent: 100, label: 'Max capacity (consider extra hours)' };
      case 'office': return { percent: 70, label: 'Standard office layout' };
      case 'custom': return { percent: 25, label: 'Light courier load' };
      default: return { percent: 50, label: 'Calculated load' };
    }
  };

  const truckInfo = getTruckFullness(homeSize);

  return (
    <div className="bg-white rounded-none border-2 border-slate-900 overflow-hidden" id="calculator-section">
      <div className="bg-slate-50 text-slate-900 p-8 border-b-2 border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-1">
            <span className="bg-[#2563eb] text-white text-[10px] font-bold px-3 py-1 rounded-none uppercase tracking-widest inline-block">
              Estimate Calculator
            </span>
            <h3 className="text-3xl font-extrabold uppercase tracking-tight text-slate-900 font-display">Calculate Your Move Cost</h3>
            <p className="text-slate-500 text-xs font-mono">Real-time hourly estimation engine for Chicago movers</p>
          </div>
          <div className="bg-white p-5 rounded-none border-2 border-slate-200 text-right min-w-[200px]">
            <span className="text-[10px] text-slate-500 block uppercase font-mono tracking-widest font-bold">Base Rate</span>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-3xl font-black text-[#2563eb]">${PRICING.baseHourlyRate}</span>
              <span className="text-xs text-slate-500 uppercase font-mono">/ hour</span>
            </div>
            <span className="text-[9px] text-[#f59e0b] block font-mono uppercase tracking-wider mt-1 font-extrabold">3-Hour Minimum Booking</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleCalculateSubmit} className="p-8 space-y-8 bg-white">
        {/* Addresses Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700 tracking-wider uppercase block flex items-center gap-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#2563eb]" /> Starting Address in Chicago
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. 123 N Michigan Ave, Chicago, IL" 
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              className="w-full px-4 py-3.5 rounded-none td-input font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700 tracking-wider uppercase block flex items-center gap-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" /> Destination Address
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. 456 W Belmont Ave, Chicago, IL" 
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="w-full px-4 py-3.5 rounded-none td-input font-mono"
            />
          </div>
        </div>

        {/* Date and Home Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700 tracking-wider uppercase block flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#2563eb]" /> Target Moving Date
            </label>
            <input 
              type="date" 
              required
              min={new Date().toISOString().split('T')[0]}
              value={movingDate}
              onChange={(e) => setMovingDate(e.target.value)}
              className="w-full px-4 py-3.5 rounded-none td-input font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-700 tracking-wider uppercase block font-mono">
              Home size selection
            </label>
            <select 
              value={homeSize}
              onChange={(e) => setHomeSize(e.target.value as HomeSizeKey)}
              className="w-full px-4 py-3.5 rounded-none td-input font-mono relative z-10"
            >
              {(Object.keys(HOME_SIZES) as HomeSizeKey[]).map((key) => (
                <option key={key} value={key} className="bg-white text-slate-900">
                  {HOME_SIZES[key].label} (Rec. {HOME_SIZES[key].baseHours} hrs)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Space Indicator (16-Foot Box Truck) */}
        <div className="bg-slate-50 rounded-none p-5 border-2 border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-none border-2 border-slate-200 text-[#2563eb]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-[#0f172a] font-bold flex items-center gap-1.5">
                Included: 16-Foot Box Truck Asset
                <span className="text-[9px] bg-blue-50 text-[#2563eb] px-2.5 py-0.5 rounded-none font-mono uppercase font-semibold border border-blue-150">Standard Fit</span>
              </h4>
              <p className="text-xs text-slate-600 mt-1">Sized perfectly to maneuver easily down historic Chicago side alleys.</p>
            </div>
          </div>
          
          <div className="w-full sm:w-64 space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase font-mono tracking-wider">
              <span>Truck Volume Fullness</span>
              <span className="text-[#2563eb] font-bold">{truckInfo.percent}% ({truckInfo.label})</span>
            </div>
            <div className="h-4 bg-slate-100 rounded-none overflow-hidden p-0.5 border border-slate-200">
              <div 
                className="h-full rounded-none transition-all duration-500 bg-[#2563eb]"
                style={{ width: `${truckInfo.percent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Sliders / Hour adjustments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Hour Selector Slider (Abides by 3 hour min) */}
          <div className="space-y-4 p-5 bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-dashed border-slate-300 rounded-none relative shadow-sm hover:border-[#2563eb]/40 transition-colors">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-700 tracking-wider uppercase flex items-center gap-1.5 font-mono font-bold">
                <Clock className="w-3.5 h-3.5 text-[#2563eb]" /> Select Hours Needed
              </label>
              <div className="flex items-center gap-1 text-sm bg-white px-3 py-1.5 border-2 border-slate-200 text-slate-900 font-mono shadow-sm">
                <span className="font-bold text-[#2563eb] text-base">{displayHours}</span>
                <span className="text-slate-550">hours</span>
              </div>
            </div>
            
            <input 
              type="range" 
              min="3" 
              max="12" 
              step="1"
              value={hoursNeeded}
              onChange={(e) => setHoursNeeded(parseInt(e.target.value))}
              className="w-full h-2.5 bg-slate-100 rounded-none appearance-none cursor-pointer accent-[#f59e0b] border border-slate-200"
            />
            <div className="flex justify-between text-[10px] items-center font-bold uppercase tracking-wider text-slate-500 font-mono">
              <span className="text-amber-700 bg-amber-50 px-2.5 py-0.5 border border-amber-200 font-extrabold animate-pulse tracking-tight text-[9px] rounded-none select-none">★ 3 Hrs Min</span>
              <span>6 Hrs</span>
              <span>9 Hrs</span>
              <span>12 Hrs Day</span>
            </div>

            {hoursNeeded === 3 && (
              <div className="bg-amber-50 rounded-none p-4 border-l-4 border-amber-500 flex items-start gap-2.5 text-amber-800 text-xs border border-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>We enforce a <strong>3-hour minimum</strong> to fuel transport and guarantee professional mover wage security.</span>
              </div>
            )}
          </div>

          {/* Movers Customizer (2 default, can add extra) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-700 tracking-wider uppercase flex items-center gap-1.5 font-mono">
                <Users className="w-3.5 h-3.5 text-[#2563eb]" /> Add Extra Movers?
              </label>
              <div className="flex items-center gap-1 text-sm bg-slate-50 px-3 py-1.5 border-2 border-slate-200 text-slate-900 font-mono">
                <span className="font-bold text-[#f59e0b]">{2 + extraMovers}</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold">Crew Total</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setExtraMovers(num)}
                  className={`py-4 px-2 rounded-none border-2 text-center transition-all cursor-pointer ${
                    extraMovers === num 
                      ? 'border-slate-900 bg-[#0f172a] text-white font-bold' 
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 text-xs font-mono'
                  }`}
                >
                  <div className="font-bold text-xs uppercase tracking-wider">
                    {num === 0 ? 'Standard' : `+${num} Mover${num > 1 ? 's' : ''}`}
                  </div>
                  <div className="text-[9px] text-slate-500 font-mono mt-1">
                    {num === 0 ? '2 Movers incl.' : `+$${num * PRICING.additionalMoverRate}/hr`}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 text-center font-mono uppercase tracking-wider">
              2 professional movers and truck are automatically provided.
            </p>
          </div>
        </div>

        {/* Live Premium Estimate Summary Block */}
        <div className="bg-[#0f172a] text-white rounded-none p-8 border-l-4 border-[#2563eb] border-2 border-slate-950 relative max-w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4 text-center md:text-left font-mono">
              <span className="inline-block text-[10px] bg-slate-800 text-emerald-400 font-mono uppercase px-3 py-1 border border-slate-700 font-bold tracking-widest">
                Real-Time Summary Analysis
              </span>
              <h4 className="text-xl font-black uppercase tracking-tight text-white font-sans">Estimated moving investment</h4>
              
              <div className="space-y-1.5 text-xs text-slate-300 uppercase">
                <div className="flex justify-between md:justify-start gap-4">
                  <span className="text-slate-400">Hourly Rate Base:</span>
                  <span className="text-white"><strong>${totalHourlyRate}/hr</strong> for <strong>{displayHours} hrs</strong> (${hourlyTotal})</span>
                </div>
                <div className="flex justify-between md:justify-start gap-4 text-[#ef4444]">
                  <span className="text-slate-400">Security Deposit:</span>
                  <span><strong>-${securityDeposit}</strong> <span className="text-[9px] text-[#fca5a5] bg-[#ef4444]/15 border border-[#ef4444]/30 px-1.5 py-0.5 font-bold uppercase">(Deducted from Total)</span></span>
                </div>
              </div>

              {/* Cash App Payment Note */}
              <div className="bg-amber-950/40 p-4 border border-amber-500/30 border-l-4 border-amber-500 text-amber-300 rounded-none text-[10px] uppercase tracking-normal">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-amber-200">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                  Booking Security Deposit
                </div>
                <p className="text-slate-350 leading-relaxed font-sans normal-case">
                  Security Deposit is deducted from the 3-hour minimum <strong className="text-white">$450 total</strong> (which includes the $100 security deposit).
                </p>
                <div className="mt-2 text-amber-400 font-black tracking-wider text-[11px] bg-amber-950/60 p-2.5 border border-amber-500/10 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                  <span>⚠️ Security Deposit of $100 Must be Paid Upon Booking:</span>
                  <div className="flex items-center gap-1.5 justify-center font-sans tracking-normal font-medium normal-case">
                    <span className="text-emerald-400 font-extrabold uppercase text-[10px]">Cash App:</span>
                    <a
                      href="https://cash.app/$muahz26"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-3 py-1 rounded font-mono font-black text-xs inline-flex items-center gap-1 tracking-widest animate-pulse normal-case transition-all duration-200 cursor-pointer shadow-md select-all"
                      title="Click to open Cash App"
                    >
                      <span>$muahz26</span>
                      <span className="text-[10px] opacity-80 font-sans font-normal">(Open Link)</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            <div className="md:col-span-5 text-center md:text-right font-mono border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-6">
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Grand Estimated Total</div>
              <div className="text-5xl font-black text-[#f59e0b] mt-1">
                ${totalPrice}
              </div>
              <div className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-2">
                Remaining Balance Due after Deposit
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="w-full td-btn-gold py-5 px-10 rounded-none flex items-center justify-center gap-2 text-xs font-mono font-bold cursor-pointer"
          >
            <span>Proceed to checkout dispatch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Local Chicago Badges inside the form to boost credibility */}
        <div className="border-t border-slate-200 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center font-mono text-[10px] uppercase tracking-wider text-slate-500">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2563eb] shrink-0" />
            <span>Fully Insured &amp; Bonded</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-[#2563eb] shrink-0" />
            <span>GPS Dispatch Tracking</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-[#2563eb] shrink-0" />
            <span>Full-time W2 Crew</span>
          </div>
        </div>
      </form>
    </div>
  );
}
