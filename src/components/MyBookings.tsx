import React from 'react';
import { 
  ClipboardList, Clock, Phone, AlertCircle, 
  Trash2, Calendar, Truck 
} from 'lucide-react';
import { Booking, HOME_SIZES } from '../types';

interface MyBookingsProps {
  bookings: Booking[];
  onRefresh: () => void;
  onSelectBooking?: (booking: Booking) => void;
}

export default function MyBookings({ bookings, onRefresh, onSelectBooking }: MyBookingsProps) {
  const handleClearBooking = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to cancel and remove this moving inquiry?")) {
      const existing = JSON.parse(localStorage.getItem('mega_moving_bookings') || '[]');
      const filtered = existing.filter((b: Booking) => b.id !== id);
      localStorage.setItem('mega_moving_bookings', JSON.stringify(filtered));
      onRefresh();
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="bg-white border border-slate-100 rounded-3xl p-8 text-center space-y-4 shadow-xs">
        <ClipboardList className="w-8 h-8 text-slate-300 mx-auto animate-pulse" />
        <h4 className="font-extrabold uppercase font-mono text-[#0f172a] text-xs tracking-wider">No Pending Moving Inquiries</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto font-mono">
          Use the calculator above to create an estimate and lock your rate today!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" id="my_bookings_list_container">
      <div className="flex justify-between items-center font-mono">
        <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-widest flex items-center gap-2 font-display">
          <ClipboardList className="w-4 h-4 text-brand-blue" />
          Estimates &amp; Booking Status ({bookings.length})
        </h4>
        <span className="text-[10px] font-bold text-slate-800 bg-slate-50 border border-slate-150 px-3 py-1 rounded-full uppercase tracking-wider animate-none">
          Click Booking to Confirm
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono">
        {bookings.map((booking) => {
          const homeLabel = HOME_SIZES[booking.homeSize]?.label || booking.homeSize;
          
          return (
            <div 
              key={booking.id}
              onClick={() => onSelectBooking && onSelectBooking(booking)}
              className="td-card cursor-pointer group flex flex-col justify-between bg-white border border-slate-100 rounded-2xl hover:border-slate-200 transition-all shadow-sm hover:shadow-md duration-300 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <span className="text-[10px] bg-slate-200 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-full font-bold">
                    {booking.id}
                  </span>
                  <span className="text-[9px] text-brand-blue font-bold uppercase ml-2">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <span className="flex items-center gap-1 text-[9px] font-bold text-slate-700 bg-slate-150 border border-slate-200 px-2 py-1 uppercase rounded-full tracking-wider">
                  <Clock className="w-3 h-3 text-[#2563eb]" />
                  <span>Awaiting Call</span>
                </span>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 text-left">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-xs uppercase block tracking-wider">{booking.fullName}</h5>
                    <p className="text-[10px] text-slate-450 mt-1 font-mono font-bold">{booking.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-brand-blue block">${booking.totalCost}</span>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block font-mono">Est {booking.estimatedHours} Hours {booking.estimatedHours === 3 && '(Min Required)'}</span>
                    <span className="text-[8px] uppercase font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 inline-block mt-1 rounded-full">Deposit Deducted</span>
                  </div>
                </div>

                <div className="border-t border-slate-50 pt-3 space-y-1.5 text-xs text-slate-605">
                  <div className="flex items-center gap-1.5 line-clamp-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                    <span><strong>{booking.movingDate}</strong> at {booking.movingTime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 line-clamp-1">
                    <Truck className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                    <span>{homeLabel} • {2 + (booking.extraMoversCount || 0)} Crew Members</span>
                  </div>
                </div>

                {/* Direct Confirm Dial Box */}
                <div className="bg-amber-50/50 rounded-xl p-3 border border-amber-100 flex items-start gap-2 text-[10px] text-amber-900 uppercase">
                  <AlertCircle className="w-4 h-4 text-amber-550 shrink-0 mt-0.5" />
                  <span>Call <strong className="text-brand-blue">+1 (312) 385-9229</strong> to verify immediately.</span>
                </div>
              </div>

              {/* Action feet */}
              <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center text-xs">
                <a 
                  href={`tel:+13123859229`} 
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold text-[#2563eb] hover:text-[#0f172a] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#2563eb]" />
                  <span>Call to Confirm</span>
                </a>

                <button
                  type="button"
                  onClick={(e) => handleClearBooking(booking.id, e)}
                  className="font-bold text-red-500 hover:text-red-700 uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 p-1"
                  title="Remove inquiry"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
