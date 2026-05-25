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
  const totalPrice = hourlyTotal + securityDeposit;

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
    <div className="bg-white rounded-none border border-slate-200 shadow-sm overflow-hidden" id="calculator-section">
      <div className="bg-brand-charcoal text-white p-8 border-b border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="space-y-1">
            <span className="bg-brand-blue text-white text-[10px] font-bold px-3 py-1 rounded-none uppercase tracking-widest inline-block">
              Estimate Calculator
            </span>
            <h3 className="text-3xl font-black uppercase tracking-tight">Calculate Your Move Cost</h3>
            <p className="text-slate-400 text-xs font-mono">Real-time hourly estimation engine for Chicago movers</p>
          </div>
          <div className="bg-slate-800 p-5 rounded-none border border-slate-700 text-right min-w-[200px]">
            <span className="text-[10px] text-slate-400 block uppercase font-mono tracking-widest">Base Rate</span>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-3xl font-black text-brand-gold">${PRICING.baseHourlyRate}</span>
              <span className="text-xs text-slate-400 uppercase font-mono">/ hour</span>
            </div>
            <span className="text-[9px] text-brand-gold block font-mono uppercase tracking-wider mt-1">3-Hour Minimum Booking</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleCalculateSubmit} className="p-8 space-y-8">
        {/* Addresses Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-800 tracking-wider uppercase block flex items-center gap-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-brand-blue" /> Starting Address in Chicago
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. 123 N Michigan Ave, Chicago, IL" 
              value={fromAddress}
              onChange={(e) => setFromAddress(e.target.value)}
              className="w-full px-4 py-3.5 rounded-none border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all text-sm bg-slate-50/50 font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-800 tracking-wider uppercase block flex items-center gap-1.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-slate-900" /> Destination Address
            </label>
            <input 
              type="text" 
              required
              placeholder="e.g. 456 W Belmont Ave, Chicago, IL" 
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              className="w-full px-4 py-3.5 rounded-none border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all text-sm bg-slate-50/50 font-mono"
            />
          </div>
        </div>

        {/* Date and Home Size */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-800 tracking-wider uppercase block flex items-center gap-1.5 font-mono">
              <Calendar className="w-3.5 h-3.5 text-brand-blue" /> Target Moving Date
            </label>
            <input 
              type="date" 
              required
              min={new Date().toISOString().split('T')[0]}
              value={movingDate}
              onChange={(e) => setMovingDate(e.target.value)}
              className="w-full px-4 py-3.5 rounded-none border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all text-sm bg-slate-50/50 font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-slate-800 tracking-wider uppercase block font-mono">
              Home size selection
            </label>
            <select 
              value={homeSize}
              onChange={(e) => setHomeSize(e.target.value as HomeSizeKey)}
              className="w-full px-4 py-3.5 rounded-none border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all text-sm bg-slate-50 font-mono relative z-10"
            >
              {(Object.keys(HOME_SIZES) as HomeSizeKey[]).map((key) => (
                <option key={key} value={key}>
                  {HOME_SIZES[key].label} (Rec. {HOME_SIZES[key].baseHours} hrs)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Space Indicator (16-Foot Box Truck) */}
        <div className="bg-slate-50 rounded-none p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-white p-3 rounded-none border border-slate-200">
              <Truck className="w-6 h-6 text-brand-blue" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                Included: 16-Foot Box Truck Asset
                <span className="text-[9px] bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-none font-mono uppercase font-semibold">Standard Fit</span>
              </h4>
              <p className="text-xs text-slate-500 mt-1">Sized perfectly to maneuver easily down historic Chicago side alleys.</p>
            </div>
          </div>
          
          <div className="w-full sm:w-64 space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-600 uppercase font-mono tracking-wider">
              <span>Truck Volume Fullness</span>
              <span className="text-brand-blue">{truckInfo.percent}% ({truckInfo.label})</span>
            </div>
            <div className="h-4 bg-slate-200 rounded-none overflow-hidden p-0.5 border border-slate-300">
              <div 
                className="h-full rounded-none transition-all duration-500 bg-brand-blue"
                style={{ width: `${truckInfo.percent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Sliders / Hour adjustments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Hour Selector Slider (Abides by 3 hour min) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-800 tracking-wider uppercase flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-brand-blue" /> Select Hours Needed
              </label>
              <div className="flex items-center gap-1 text-sm bg-slate-100 px-3 py-1 border border-slate-200 font-mono">
                <span className="font-bold text-brand-blue text-base">{displayHours}</span>
                <span className="text-slate-500">hours</span>
              </div>
            </div>
            
            <input 
              type="range" 
              min="3" 
              max="12" 
              step="1"
              value={hoursNeeded}
              onChange={(e) => setHoursNeeded(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-none appearance-none cursor-pointer accent-brand-blue"
            />
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              <span>3 Hrs Min</span>
              <span>6 Hrs</span>
              <span>9 Hrs</span>
              <span>12 Hrs Day</span>
            </div>

            {hoursNeeded === 3 && (
              <div className="bg-amber-50 rounded-none p-4 border-l-4 border-amber-500 flex items-start gap-2.5 text-amber-900 text-xs">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>We enforce a <strong>3-hour minimum</strong> to fuel transport and guarantee professional mover wage security.</span>
              </div>
            )}
          </div>

          {/* Movers Customizer (2 default, can add extra) */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold text-slate-800 tracking-wider uppercase flex items-center gap-1.5 font-mono">
                <Users className="w-3.5 h-3.5 text-brand-blue" /> Add Extra Movers?
              </label>
              <div className="flex items-center gap-1 text-sm bg-slate-100 px-3 py-1 border border-slate-200 font-mono">
                <span className="font-bold text-slate-900">{2 + extraMovers}</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold">Crew Total</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setExtraMovers(num)}
                  className={`py-4 px-2 rounded-none border text-center transition-all cursor-pointer ${
                    extraMovers === num 
                      ? 'border-brand-blue bg-blue-50 text-brand-blue font-bold shadow-sm' 
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-mono'
                  }`}
                >
                  <div className="font-bold text-xs uppercase tracking-wider">
                    {num === 0 ? 'Standard' : `+${num} Mover${num > 1 ? 's' : ''}`}
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono mt-1">
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
        <div className="bg-brand-charcoal text-white rounded-none p-8 border-l-4 border-brand-blue relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-4 text-center md:text-left font-mono">
              <span className="inline-block text-[10px] bg-slate-800 text-slate-300 font-mono uppercase px-3 py-1 border border-slate-700 font-bold tracking-widest">
                Real-Time Summary Analysis
              </span>
              <h4 className="text-xl font-black uppercase tracking-tight font-sans">Estimated moving investment</h4>
              
              <div className="space-y-1.5 text-xs text-slate-300 uppercase">
                <div className="flex justify-between md:justify-start gap-4">
                  <span className="text-slate-400">Hourly Rate Base:</span>
                  <span><strong>${totalHourlyRate}/hr</strong> for <strong>{displayHours} hrs</strong> (${hourlyTotal})</span>
                </div>
                <div className="flex justify-between md:justify-start gap-4 text-emerald-400">
                  <span className="text-slate-400">Security Deposit:</span>
                  <span><strong>+${securityDeposit}</strong> <span className="text-[9px] text-slate-400 bg-slate-800 px-1.5 py-0.5 font-bold uppercase">(Non-Refundable)</span></span>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 text-center md:text-right font-mono border-t md:border-t-0 md:border-l border-slate-700 pt-6 md:pt-0 md:pl-6">
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Grand Estimated Total</div>
              <div className="text-5xl font-black text-brand-gold mt-1">
                ${totalPrice}
              </div>
              <div className="text-[9px] text-slate-400 font-mono tracking-widest uppercase mt-2">
                Includes All Taxes, Surcharges &amp; Deposit
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-2">
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-brand-blue text-white font-bold py-5 px-10 rounded-none uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 text-xs font-mono"
          >
            <span>Proceed to checkout dispatch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Local Chicago Badges inside the form to boost credibility */}
        <div className="border-t border-slate-200 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center font-mono text-[10px] uppercase tracking-wider text-slate-500">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-blue shrink-0" />
            <span>Fully Licensed &amp; Insured</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-brand-blue shrink-0" />
            <span>GPS Dispatch Tracking</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-brand-blue shrink-0" />
            <span>Full-time W2 Crew</span>
          </div>
        </div>
      </form>
    </div>
  );
}
