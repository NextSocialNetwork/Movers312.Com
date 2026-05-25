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

    // Send dispatch email securely via FormSubmit AJAX service
    fetch('https://formsubmit.co/ajax/megamovingchicago@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `📦 NEW MEGA MOVING INQUIRY: ${newBooking.id} - ${fullName}`,
        _cc: email, // CC the customer to guarantee copy receipt
        "Inquiry ID": newBooking.id,
        "Customer Name": fullName,
        "Customer Email": email,
        "Customer Phone": phone,
        "Moving Date": newBooking.movingDate,
        "Moving Time Slot": movingTime,
        "Starting Point (From)": newBooking.fromAddress,
        "Destination Point (To)": newBooking.toAddress,
        "Load Configuration": HOME_SIZES[newBooking.homeSize]?.label || newBooking.homeSize,
        "Crew Size Assigned": `${2 + newBooking.extraMoversCount} Movers`,
        "Estimated Duration": `${newBooking.estimatedHours} Hours Required`,
        "Grand Total (Remaining Due on Move Day)": `$${newBooking.totalCost}`,
        "Deducted Security Deposit (Cash App: $Muahz26)": "$100",
        "Total Base Cost": `$${newBooking.totalCost + 100}`,
        "Special Notes": notes || 'None provided',
        _replyto: email
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Dispatch lead successfully routed to mailbox:', data);
    })
    .catch(err => {
      console.error('Failed to route dispatch email:', err);
    })
    .finally(() => {
      setIsSubmitting(false);
      onBookingSuccess(newBooking);
    });
  };

  return (
    <div className="bg-white rounded-none border-2 border-slate-900 overflow-hidden" id="booking-form-wrapper">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Contact Form Portion */}
        <div className="lg:col-span-7 p-8 space-y-8 bg-white">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-3 hover:bg-slate-100 rounded-none border-2 border-slate-900 transition-colors text-slate-800 font-bold cursor-pointer"
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
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
                Your Full Name
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400 text-xs">
                  <User className="w-4 h-4" />
                </span>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3.5 rounded-none td-input font-mono"
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3.5 text-slate-400 text-xs">
                    <Mail className="w-4 h-4" />
                  </span>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 rounded-none td-input font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
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
                    className="w-full pl-10 pr-4 py-3.5 rounded-none td-input font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Preferred Moving Time Slot */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
                Preferred Start Window
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: '08:00 AM', label: 'Morning Crew', desc: '8:00 AM - 10:00 AM' },
                  { value: '01:00 PM', label: 'Mid-Day Crew', desc: '1:00 PM - 3:00 PM' },
                  { value: '05:00 PM', label: 'Evening Crew', desc: '5:00 PM - 7:00 PM' }
                ].map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setMovingTime(item.value)}
                    className={`p-4 rounded-none border-2 text-center transition-all cursor-pointer ${
                      movingTime === item.value 
                        ? 'border-slate-900 bg-[#0f172a] text-white font-bold' 
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 text-xs font-mono'
                    }`}
                  >
                    <div className="font-bold text-xs uppercase tracking-wider">{item.label}</div>
                    <div className="text-[10px] text-slate-550 mt-1 font-mono">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Special Instructions & Pack Guidelines */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
                  Elevator, Stairwells &amp; High-Value Items Details
                </label>
                <span className="text-[10px] text-slate-500 font-mono uppercase">Optional</span>
              </div>
              <textarea 
                rows={3}
                placeholder="List elevator status, flights of stairs, or bulky equipment to perfect our dispatch logistics planning..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3.5 rounded-none td-input font-mono"
              />
            </div>

            {/* Cash App Payment Note inside Booking Form */}
            <div className="bg-amber-50 text-amber-950 rounded-none p-5 border-2 border-amber-200 border-l-4 border-amber-500 space-y-2">
              <div className="font-bold text-xs uppercase tracking-wide font-mono flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping shrink-0"></span>
                <span>Security Deposit Instruction</span>
              </div>
              <p className="text-xs leading-relaxed font-sans font-medium normal-case">
                Our 3-hour minimum is <strong className="text-amber-950 font-bold">$450 total</strong> which includes the <strong className="text-amber-950 font-bold">$100 security deposit</strong>. The security deposit is deducted from your moving total, leaving a remaining balance of <strong className="text-amber-100 bg-[#0f172a] px-1.5 py-0.5">${calculatedData.totalPrice}</strong> on completion.
              </p>
              <div className="bg-amber-100 p-3 border border-amber-300 font-mono text-[10px] font-black uppercase text-amber-950 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
                <span>⚠️ Security Deposit of $100 Must be Paid Upon Booking:</span>
                <div className="flex items-center gap-1.5 justify-center font-sans tracking-normal font-medium normal-case">
                  <span className="text-emerald-700 font-extrabold uppercase text-[10px]">Cash App:</span>
                  <span className="bg-emerald-600 text-white px-3 py-1 text-xs inline-block tracking-widest select-all font-black font-mono rounded animate-pulse normal-case">$Muahz26</span>
                </div>
              </div>
            </div>

            {/* Direct Instant Confirmation Notice */}
            <div className="bg-emerald-50 text-slate-800 rounded-none p-5 border-2 border-emerald-200 border-l-4 border-emerald-500 flex items-start gap-4">
              <Shield className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-bold uppercase tracking-wide text-emerald-800 block font-mono">Zero Risk Scheduling Guaranteed:</span>
                <p className="text-slate-600 leading-relaxed font-sans mt-1">
                  Upon submission, this estimate is locked down. Call us instantly at <a href="tel:+17733355446" className="font-mono font-bold text-[#2563eb] underline hover:text-[#f59e0b] cursor-pointer">+1 (773) 335-5446</a> to dispatch crew members ahead of schedule.
                </p>
              </div>
            </div>

            {/* Submission buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full td-btn-gold py-4 px-6 rounded-none flex items-center justify-center gap-2 cursor-pointer transition-colors uppercase tracking-wider text-xs font-mono font-bold"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 font-sans"></div>
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
        <div className="lg:col-span-5 bg-slate-50 border-t lg:border-t-0 lg:border-l-2 border-slate-200 p-8 flex flex-col justify-between space-y-8 uppercase font-mono">
          <div className="space-y-6">
            <h4 className="text-xs font-black text-slate-900 tracking-wider">Your Dispatch Estimate Details</h4>
            
            {/* Calculation Breakdown Cards */}
            <div className="space-y-3.5">
              
              {/* Core Inclusions */}
              <div className="bg-white p-5 rounded-none border-2 border-slate-200 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                  <span className="text-[10px] font-bold text-[#2563eb] uppercase tracking-widest">Reserved Package</span>
                  <span className="text-[9px] font-bold text-emerald-700 uppercase bg-emerald-50 border border-emerald-200 px-2 py-0.5">Assigned Asset</span>
                </div>
                
                <div className="space-y-2 text-xs text-slate-700 font-mono">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span>16&apos; Heavy Box Truck Included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span>{calculatedData.hoursNeeded} Hours Minimum Booking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#2563eb] shrink-0" />
                    <span>{2 + calculatedData.extraMovers} Crew Members</span>
                  </div>
                </div>
              </div>

              {/* Addresses Summary */}
              <div className="bg-white p-5 rounded-none border-2 border-slate-200 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Transit Details</span>
                  <span className="text-[9px] font-bold text-slate-650 bg-slate-100 px-2 py-0.5 uppercase tracking-wide">Route Verified</span>
                </div>
                
                <div className="space-y-3 relative">
                  {/* Small line connector */}
                  <div className="absolute left-[7px] top-4 bottom-4 w-0.5 bg-slate-200"></div>
                  
                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-3.5 h-3.5 rounded-none bg-[#2563eb] border-2 border-white flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-500 block tracking-wider">Starting Location</span>
                      <span className="text-slate-900 font-bold line-clamp-1">{calculatedData.fromAddress}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 text-xs">
                    <div className="w-3.5 h-3.5 rounded-none bg-emerald-500 border-2 border-white flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="text-[8px] uppercase font-bold text-slate-500 block tracking-wider">Destination Location</span>
                      <span className="text-slate-900 font-bold line-clamp-1">{calculatedData.toAddress}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Quotation Summary */}
              <div className="bg-[#0f172a] text-white p-5 rounded-none border-2 border-slate-950 space-y-4">
                <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                  <span>Price Component Breakdown</span>
                  <span>Amount</span>
                </div>
                
                <div className="space-y-2.5 text-xs border-b border-slate-800 pb-3 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Movers &amp; 16ft Truck Base ({calculatedData.hoursNeeded} hrs)</span>
                    <span className="font-semibold text-white">${calculatedData.hoursNeeded * 150}</span>
                  </div>
                  {calculatedData.extraMovers > 0 && (
                     <div className="flex justify-between">
                       <span className="text-slate-300">+{calculatedData.extraMovers} Bonus Mover(s) (${PRICING_ADD_RATE(calculatedData.extraMovers)}/hr)</span>
                       <span className="font-semibold text-[#f59e0b]">+${calculatedData.extraMovers * 50 * calculatedData.hoursNeeded}</span>
                     </div>
                  )}
                  <div className="flex justify-between text-[#ef4444]">
                    <span className="text-slate-300">Deducted Security Deposit (Paid via Cash App)</span>
                    <span className="font-semibold">-$100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-300">Fuel &amp; Cargo Straps Protection fee</span>
                    <span className="font-bold text-emerald-400">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-center font-mono">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Total Rate</span>
                    <span className="text-xs text-[#f59e0b] font-bold">${150 + (calculatedData.extraMovers * 50)} / hour</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase font-mono">Grand Estimated Total</span>
                    <span className="text-2xl font-black text-white">${calculatedData.totalPrice}</span>
                    <span className="text-[8px] text-emerald-400 block tracking-wider font-extrabold select-none mt-1">(Payable Day of Move)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Quick Helpline Support Call block */}
          <div className="bg-white text-slate-850 p-5 rounded-none border-2 border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#f59e0b] text-[#0f172a] p-2 rounded-none shrink-0 border-2 border-[#f59e0b] font-bold">
                <PhoneCall className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-[#2563eb] tracking-widest font-mono">Support dispatch</span>
                <p className="text-xs text-slate-600 font-mono">Fast assistance &amp; custom sizing</p>
              </div>
            </div>
            
            <a 
              href="tel:+17733355446"
              className="block w-full text-center td-btn-blue py-3.5 px-4 rounded-none cursor-pointer text-xs font-mono font-bold"
            >
              +1 (773) 335-5446
            </a>

            <div className="text-center pt-2 border-t border-slate-100">
              <span className="text-[9px] uppercase font-bold text-slate-500 block tracking-wider mb-1 font-mono">Or Send Us An Email</span>
              <a 
                href="mailto:MegaMovingChicago@gmail.com" 
                className="text-slate-800 hover:text-[#2563eb] font-bold font-mono text-[11px] transition-colors break-all block"
              >
                MegaMovingChicago@Gmail.com
              </a>
            </div>
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
