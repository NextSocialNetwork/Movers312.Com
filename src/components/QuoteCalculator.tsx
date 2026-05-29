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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden" id="calculator-section">
      
      {/* Top Professional Header - Executive Slate Tone */}
      <div className="bg-[#0f172a] text-white p-8 sm:p-10 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-1.5">
            <span className="bg-gradient-to-r from-blue-600 to-sky-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest inline-block shadow-sm">
              Real-Time Moving Rates
            </span>
            <h3 className="text-3xl font-extrabold uppercase tracking-tight text-white font-display">Calculate Your Moving Cost</h3>
            <p className="text-slate-400 text-xs font-mono">Instant hourly estimation engine for Chicago neighborhoods</p>
          </div>
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-700/50 text-right min-w-[200px] shadow-inner font-mono">
            <span className="text-[10px] text-slate-400 block uppercase tracking-widest font-extrabold">Standard Base Crew</span>
            <div className="flex items-baseline justify-end gap-1 mt-1">
              <span className="text-3xl font-black text-amber-400">${PRICING.baseHourlyRate}</span>
              <span className="text-xs text-slate-450 uppercase">/ hr</span>
            </div>
            <span className="text-[9px] text-[#2563eb] block uppercase tracking-wider mt-1.5 font-extrabold">3-Hour Minimum Request</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleCalculateSubmit} className="p-8 sm:p-10 space-y-8 bg-white">
        {/* Addresses Inputs - Sleek layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-600 tracking-wider uppercase block flex items-center gap-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-brand-blue" /> Starting Address in Chicago
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. 123 N Michigan Ave, Chicago, IL" 
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              className="w-full px-4 py-3.5 td-input font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-600 tracking-wider uppercase block flex items-center gap-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-500" /> Destination Address
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. 456 W Belmont Ave, Chicago, IL" 
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="w-full px-4 py-3.5 td-input font-mono"
            />
          </div>
        </div>

        {/* Date and Home Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-600 tracking-wider uppercase block flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-brand-blue" /> Target Moving Date
            </label>
            <input 
              type="date" 
              required
              min={new Date().toISOString().split('T')[0]}
              value={movingDate}
              onChange={(e) => setMovingDate(e.target.value)}
              className="w-full px-4 py-3.5 td-input font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-600 tracking-wider uppercase block font-mono">
              Home size selection
            </label>
            <select 
              value={homeSize}
              onChange={(e) => setHomeSize(e.target.value as HomeSizeKey)}
              className="w-full px-4 py-3.5 td-input font-mono relative z-10"
            >
              {(Object.keys(HOME_SIZES) as HomeSizeKey[]).map((key) => (
                <option key={key} value={key} className="bg-white text-slate-900">
                  {HOME_SIZES[key].label} (Rec. {HOME_SIZES[key].baseHours} hrs)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Space Indicator (16-Foot Box Truck) - Modernised as a glowing utility widget */}
        <div className="bg-slate-50/55 rounded-2xl p-6 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-xl border border-slate-100 text-brand-blue shadow-xs">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm text-slate-900 font-bold flex items-center gap-1.5">
                Included: 16-Foot Box Truck Asset
                <span className="text-[9px] bg-blue-50 text-[#2563eb] px-2.5 py-0.5 rounded-full font-mono uppercase font-extrabold border border-blue-105">Standard Fit</span>
              </h4>
              <p className="text-xs text-slate-500 mt-1">Sized perfectly to maneuver easily down narrow Chicago side alleys safely.</p>
            </div>
          </div>
          
          <div className="w-full sm:w-64 space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">
              <span>Truck Volume Fullness</span>
              <span className="text-[#2563eb] font-extrabold">{truckInfo.percent}% ({truckInfo.label})</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
              <div 
                className="h-full rounded-full transition-all duration-550 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xs"
                style={{ width: `${truckInfo.percent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Sliders / Hour adjustments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Hour Selector Slider (Abides by 3 hour min) */}
          <div className="space-y-4 p-6 bg-gradient-to-br from-slate-50/80 to-slate-100/50 border border-slate-150 rounded-2xl relative shadow-xs hover:border-[#2563eb]/20 transition-all duration-300">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-700 tracking-wider uppercase flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-brand-blue" /> Select Hours Needed
              </label>
              <div className="flex items-center gap-1 text-sm bg-white px-3 py-1.5 rounded-xl border border-slate-150 text-slate-900 font-mono shadow-xs">
                <span className="font-extrabold text-[#2563eb] text-base">{displayHours}</span>
                <span className="text-slate-400 font-bold">hours</span>
              </div>
            </div>
            
            <input 
              type="range" 
              min="3" 
              max="12" 
              step="1"
              value={hoursNeeded}
              onChange={(e) => setHoursNeeded(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
            />
            <div className="flex justify-between text-[10px] items-center font-bold uppercase tracking-wider text-slate-450 font-mono">
              <span className="text-amber-805 bg-amber-50 px-2.5 py-0.5 border border-amber-200/50 font-extrabold tracking-tight text-[9px] rounded-full animate-pulse">★ 3 &apos; hrs Min</span>
              <span>6 Hrs</span>
              <span>9 Hrs</span>
              <span>12 Hrs Day</span>
            </div>

            {hoursNeeded === 3 && (
              <div className="bg-amber-50/35 rounded-xl p-4 border border-amber-105 flex items-start gap-2.5 text-amber-800 text-xs shadow-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span className="font-sans leading-relaxed">We enforce a <strong>3-hour minimum</strong> to fuel transport and guarantee professional mover wage security.</span>
              </div>
            )}
          </div>

          {/* Movers Customizer (2 default, can add extra) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-700 tracking-wider uppercase flex items-center gap-1.5 font-mono">
                <Users className="w-3.5 h-3.5 text-brand-blue" /> Add Extra Movers?
              </label>
              <div className="flex items-center gap-1 text-sm bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-150 text-slate-900 font-mono">
                <span className="font-extrabold text-amber-500">{2 + extraMovers}</span>
                <span className="text-slate-450 text-[9px] uppercase font-bold">Crew Total</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setExtraMovers(num)}
                  className={`py-4 px-2 rounded-xl border text-center transition-all duration-300 cursor-pointer flex flex-col items-center justify-center gap-1 hover:scale-[1.02] active:scale-[0.98] ${
                    extraMovers === num 
                      ? 'border-brand-blue bg-[#0f172a] text-white shadow-lg' 
                      : 'border-slate-150 bg-slate-50 text-slate-605 hover:bg-slate-100 hover:text-slate-909 font-mono'
                  }`}
                >
                  <div className="font-extrabold text-xs uppercase tracking-wider">
                    {num === 0 ? 'Standard' : `+${num} Mover${num > 1 ? 's' : ''}`}
                  </div>
                  <div className={`text-[9px] font-bold uppercase tracking-wider ${extraMovers === num ? 'text-amber-400' : 'text-slate-400'}`}>
                    {num === 0 ? '2 Crew' : `+$${num * PRICING.additionalMoverRate}/hr`}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-450 text-center font-mono uppercase tracking-wider font-semibold">
              2 professional movers and truck are automatically provided.
            </p>
          </div>
        </div>        {/* Live Premium Estimate Summary Block - Upgraded to luxury ambient look */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-2xl p-8 border border-slate-800 relative max-w-full shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4 text-center md:text-left font-mono">
              <span className="inline-block text-[9px] bg-white/10 text-emerald-400 font-mono uppercase px-3 py-1 border border-white/5 rounded-full font-bold tracking-widest shadow-xs">
                Real-Time Rate Projection
              </span>
              <h4 className="text-xl font-extrabold uppercase tracking-tight text-white font-display">Calculated moving investment</h4>
              
              <div className="space-y-1.5 text-[11px] text-slate-300 uppercase font-semibold">
                <div className="flex justify-between md:justify-start gap-4">
                  <span className="text-slate-400">Hourly Rate Base:</span>
                  <span className="text-white"><strong>${totalHourlyRate}/hr</strong> for <strong>{displayHours} hrs</strong> (${hourlyTotal})</span>
                </div>
                <div className="flex justify-between md:justify-start gap-4 text-emerald-450 bg-emerald-900/10 px-3 py-1.5 rounded-lg border border-emerald-500/10 w-max">
                  <span className="text-emerald-300">Security Deposit Deducted:</span>
                  <span><strong>-${securityDeposit}</strong> <span className="text-[8px] text-white bg-emerald-600 px-1.5 py-0.5 font-bold uppercase rounded ml-1 tracking-widest">Reserved Deposit</span></span>
                </div>
              </div>

              {/* Cash App Payment Note */}
              <div className="bg-amber-955/20 p-4 border border-amber-500/15 rounded-xl text-[10px] uppercase tracking-normal">
                <div className="font-extrabold flex items-center gap-1.5 mb-1 text-amber-200">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  Securing Dispatch Slot
                </div>
                <p className="text-slate-400 leading-relaxed font-sans normal-case">
                  The security deposit of $100 is deducted from the hourly flat rate base (e.g. $450 base price), leaving the remaining balance due on the active move day.
                </p>
                <div className="mt-3 text-amber-400 font-extrabold tracking-wider text-[11px] flex flex-col sm:flex-row items-center justify-center gap-2 text-center bg-amber-950/40 p-2.5 rounded-lg border border-amber-500/10">
                  <span>⚠️ Security Deposit of $100 Must be Paid Upon Booking:</span>
                  <div className="flex items-center gap-1.5 justify-center font-sans tracking-normal font-medium normal-case">
                    <span className="text-emerald-400 font-extrabold uppercase text-[10px] font-mono">Cash App:</span>
                    <a
                      href="https://cash.app/$muahz26"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 px-3.5 py-1.5 rounded-lg font-mono font-black text-xs inline-flex items-center gap-1 tracking-widest animate-pulse normal-case transition-all duration-200 cursor-pointer shadow-md select-all"
                      title="Click to open Cash App"
                    >
                      <span>$muahz26</span>
                      <span className="text-[9px] opacity-80 font-sans font-normal">(Open Link)</span>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            <div className="md:col-span-5 text-center md:text-right font-mono border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-6">
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest font-bold">Remaining balance due on move day</div>
              <div className="text-6xl font-black text-amber-400 mt-1 tracking-tighter">
                ${totalPrice}
              </div>
              <div className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-2.5 font-semibold">
                Remaining Balance after $100 Deposit
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="w-full td-btn-gold py-5 px-10 rounded-xl flex items-center justify-center gap-2 text-xs font-mono font-bold cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
          >
            <span>Proceed to checkout dispatch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Local Chicago Badges inside the form to boost credibility */}
        <div className="border-t border-slate-100 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center font-mono text-[9px] uppercase tracking-wider text-slate-400 font-bold">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-blue" />
            <span>Fully Vetted, Insured &amp; Bonded</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-brand-blue" />
            <span>GPS Dispatch Tracking</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-brand-blue" />
            <span>Full-time W2 Crew</span>
          </div>
        </div>
      </form>
    </div>
  );
}
