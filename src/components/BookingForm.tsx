import React, { useState } from 'react';
import { 
  Phone, User, Mail, Calendar, MapPin, Clock, ArrowLeft, 
  CheckCircle, Shield, PhoneCall, HelpCircle, Save, Truck, Users 
} from 'lucide-react';
import { Booking, HomeSizeKey, HOME_SIZES } from '../types';

interface BookingFormProps {
  calculatedData: {
    fromAddress: string;
    toAddress: string;
    homeSize: HomeSizeKey;
    movingDate: string;
    hoursNeeded: number;
    extraMovers: number;
    totalPrice: number;
  };
  onBack: () => void;
  onBookingSuccess: (newBooking: Booking) => void;
}

export default function BookingForm({ calculatedData, onBack, onBookingSuccess }: BookingFormProps) {
  // Contact States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [movingTime, setMovingTime] = useState('08:00 AM');
  const [notes, setNotes] = useState('');
  
  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database write
    setTimeout(() => {
      const newBooking: Booking = {
        id: 'MEG-' + Math.floor(100000 + Math.random() * 900000),
        fullName,
        email,
        phone,
        movingDate: calculatedData.movingDate,
        movingTime,
        fromAddress: calculatedData.fromAddress,
        toAddress: calculatedData.toAddress,
        homeSize: calculatedData.homeSize,
        estimatedHours: calculatedData.hoursNeeded,
        totalCost: calculatedData.totalPrice,
        extraMoversCount: calculatedData.extraMovers,
        truckIncluded: true,
        status: 'Inquiry',
        notes,
        createdAt: new Date().toISOString()
      };

      // Store in localStorage
      const existingBookings = JSON.parse(localStorage.getItem('mega_moving_bookings') || '[]');
      existingBookings.unshift(newBooking);
      localStorage.setItem('mega_moving_bookings', JSON.stringify(existingBookings));

      setIsSubmitting(false);
      onBookingSuccess(newBooking);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-none border border-slate-200 shadow-sm overflow-hidden" id="booking-form-wrapper">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Contact Form Portion */}
        <div className="lg:col-span-7 p-8 space-y-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2.5 hover:bg-slate-100 rounded-none border border-slate-200 transition-colors text-slate-600 cursor-pointer"
              title="Go Back"
              type="button"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-slate-900 font-display">Complete Booking Inquiry</h3>
              <p className="text-xs text-slate-500 font-mono">Provide information to initiate route planning with Mega Moving</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Full Name */}
            <div className="space-y-1.5 font-display">
              <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block font-mono">
                Your Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-450 text-xs">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-none border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm bg-slate-50/20 font-mono"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3.5 text-slate-450 text-xs">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-none border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm bg-slate-50/20 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block font-mono">
                  Cell Phone (for Dispatch SMS)
                </label>
                <div className="relative font-mono">
                  <span className="absolute left-3.5 top-3.5 text-slate-400">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. (312) 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-none border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm bg-slate-50/20 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Preferred Moving Time Slot */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block font-mono">
                Preferred Start Window
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '08:00 AM', label: 'Morning Crew', desc: '8:00 AM - 10:00 AM' },
                  { value: '01:00 PM', label: 'Mid-Day Crew', desc: '1:00 PM - 3:00 PM' },
                  { value: '05:00 PM', label: 'Evening Crew', desc: '5:00 PM - 7:00 PM' }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setMovingTime(item.value)}
                    className={`p-4 rounded-none border text-center transition-all cursor-pointer ${
                      movingTime === item.value 
                        ? 'border-brand-blue bg-blue-50 text-brand-blue font-bold shadow-sm' 
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-mono'
                    }`}
                  >
                    <div className="font-bold text-xs uppercase tracking-wider">{item.label}</div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Instructions & Pack Guidelines */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider block font-mono">
                  Elevator, Stairwells &amp; High-Value Items Details
                </label>
                <span className="text-[10px] text-slate-400 font-mono uppercase">Optional</span>
              </div>
              <textarea 
                rows={3}
                placeholder="List elevator status, flights of stairs, or bulky equipment to perfect our dispatch logistics planning..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3.5 rounded-none border border-slate-300 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue text-sm bg-slate-50/20 font-mono"
              />
            </div>

            {/* Direct Instant Confirmation Notice */}
            <div className="bg-emerald-50 text-emerald-950 rounded-none p-5 border border-slate-200 border-l-4 border-emerald-600 flex items-start gap-4">
              <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-bold uppercase tracking-wide text-emerald-950 block font-mono">Zero Risk Scheduling Guaranteed:</span>
                <p className="text-emerald-800 leading-relaxed font-sans mt-1">
                  Upon submission, this estimate is locked down. Call us instantly at <a href="tel:+17733355446" className="font-mono font-bold text-brand-blue underline hover:text-brand-cyan cursor-block">+1 (773) 335-5446</a> to dispatch crew members ahead of schedule.
                </p>
              </div>
            </div>

            {/* Submission buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-slate-900 hover:bg-brand-blue disabled:bg-slate-300 text-white font-bold py-4 px-6 rounded-none flex items-center justify-center gap-2 cursor-pointer transition-colors uppercase tracking-wider text-xs font-mono"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white font-sans"></div>
                    <span>CALCULATING LOGISTICS TRANSIT...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>CONFIRM LIVE BOOKING REQUEST</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* Dynamic Booking Summary Sidebar Detail Panel */}
        <div className="lg:col-span-5 bg-slate-50 border-l border-slate-200 p-8 flex flex-col justify-between space-y-8 uppercase font-mono">
          <div className="space-y-6">
            <h4 className="text-xs font-bold text-slate-800 tracking-wider">Your Dispatch Estimate Details</h4>
            
            {/* Calculation Breakdown Cards */}
            <div className="space-y-3.5">
              
              {/* Core Inclusions */}
              <div className="bg-white p-5 rounded-none border border-slate-200 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                  <span className="text-[10px] font-bold text-brand-blue uppercase tracking-widest">Reserved Package</span>
                  <span className="text-[9px] font-bold text-emerald-700 uppercase bg-emerald-100 px-2 py-0.5">Assigned Asset</span>
                </div>
                
                <div className="space-y-2 text-xs text-slate-600 font-mono">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>16&apos; Heavy Box Truck Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>{calculatedData.hoursNeeded} Hours Minimum Booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-blue shrink-0" />
                    <span>{2 + calculatedData.extraMovers} Crew Members</span>
                  </div>
                </div>
              </div>

              {/* Addresses Summary */}
              <div className="bg-white p-5 rounded-none border border-slate-200 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Transit Details</span>
                  <span className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 uppercase tracking-wide">Route Verified</span>
                </div>
                
                <div className="space-y-3 relative">
                  {/* Small line connector */}
                  <div className="absolute left-[7px] top-4 bottom-4 w-0.5 bg-slate-200"></div>
                  
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-3.5 h-3.5 rounded-none bg-brand-blue border-2 border-white ring-1 ring-brand-blue flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-400 block tracking-wider">Starting Location</span>
                      <span className="text-slate-700 font-medium line-clamp-1">{calculatedData.fromAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-3.5 h-3.5 rounded-none bg-emerald-500 border-2 border-white ring-1 ring-emerald-500 flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-400 block tracking-wider">Destination Location</span>
                      <span className="text-slate-700 font-medium line-clamp-1">{calculatedData.toAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Quotation Summary */}
              <div className="bg-brand-charcoal text-white p-5 rounded-none space-y-4">
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                  <span>Price Component Breakdown</span>
                  <span>Amount</span>
                </div>
                
                <div className="space-y-2.5 text-xs border-b border-slate-700 pb-3 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Movers &amp; 16ft Truck Base ({calculatedData.hoursNeeded} hrs)</span>
                    <span className="font-semibold text-slate-200">${calculatedData.hoursNeeded * 150}</span>
                  </div>
                  {calculatedData.extraMovers > 0 && (
                    <div className="flex justify-between">
                      <span className="text-slate-300">+{calculatedData.extraMovers} Bonus Mover(s) (${PRICING_ADD_RATE(calculatedData.extraMovers)}/hr)</span>
                      <span className="font-semibold text-brand-gold">+${calculatedData.extraMovers * 50 * calculatedData.hoursNeeded}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-300">Fuel &amp; Cargo Straps Protection fee</span>
                    <span className="font-bold text-emerald-400">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Total Rate</span>
                    <span className="text-xs text-brand-gold font-bold">${150 + (calculatedData.extraMovers * 50)} / hour</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase font-mono">Grand Estimated Total</span>
                    <span className="text-2xl font-black text-white">${calculatedData.totalPrice}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Helpline Support Call block */}
          <div className="bg-slate-900 text-white p-5 rounded-none border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="bg-brand-gold text-brand-charcoal p-2 rounded-none shrink-0 border border-brand-gold">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-gold tracking-widest font-mono">Support dispatch</span>
                <p className="text-xs text-slate-300 font-mono">Fast assistance &amp; custom sizing</p>
              </div>
            </div>
            
            <a 
              href="tel:+17733355446"
              className="block w-full text-center bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-3.5 px-4 rounded-none cursor-pointer transition-colors text-xs font-mono uppercase tracking-wider"
            >
              +1 (773) 335-5446
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}

// Simple Helper
function PRICING_ADD_RATE(extraCount: number) {
  return extraCount * 50;
}
