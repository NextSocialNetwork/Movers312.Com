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
      <div className="bg-slate-50 border border-slate-300 rounded-none p-8 text-center space-y-4">
        <ClipboardList className="w-8 h-8 text-slate-400 mx-auto" />
        <h4 className="font-extrabold uppercase font-mono text-slate-900 text-xs tracking-wider">No Pending Moving Inquiries</h4>
        <p className="text-xs text-slate-500 max-w-sm mx-auto font-mono">
          Use the calculator above to create an estimate and lock your rate today!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4" id="my_bookings_list_container">
      <div className="flex justify-between items-center font-mono">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
          <ClipboardList className="w-4 h-4 text-brand-blue" />
          Estimates &amp; Booking Status ({bookings.length})
        </h4>
        <span className="text-[10px] font-bold text-brand-gold bg-slate-900 px-3 py-1 rounded-none uppercase tracking-wider animate-none">
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
              className="bg-white rounded-none border border-slate-300 hover:border-brand-blue transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <span className="text-[10px] bg-slate-200 text-slate-800 px-2.5 py-1 rounded-none font-bold">
                    {booking.id}
                  </span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase ml-2">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <span className="flex items-center gap-1 text-[9px] font-bold text-slate-900 bg-white border border-slate-300 px-2 py-1 uppercase rounded-none tracking-wider">
                  <Clock className="w-3 h-3 text-brand-blue" />
                  <span>Awaiting Call</span>
                </span>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-black text-slate-950 text-xs uppercase block tracking-wider">{booking.fullName}</h5>
                    <p className="text-[10px] text-slate-500 mt-1 font-mono font-bold">{booking.phone}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900 block">${booking.totalCost}</span>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">Est {booking.estimatedHours} hrs</span>
                    <span className="text-[8px] uppercase font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1 py-0.5 inline-block mt-1">Incl. $100 Deposit</span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs text-slate-600">
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
                <div className="bg-amber-50 rounded-none p-3 border border-slate-200 border-l-4 border-amber-500 flex items-start gap-2 text-[10px] text-amber-900 uppercase">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Call <strong>+1 (773) 335-5446</strong> to dispatch crew member immediately.</span>
                </div>
              </div>

              {/* Action feet */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs">
                <a 
                  href={`tel:+17733355446`} 
                  onClick={(e) => e.stopPropagation()}
                  className="font-bold text-brand-blue hover:text-brand-blue/90 uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-blue" />
                  <span>Call to Confirm</span>
                </a>

                <button
                  type="button"
                  onClick={(e) => handleClearBooking(booking.id, e)}
                  className="font-bold text-red-600 hover:text-red-800 uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 p-1 hover:bg-red-50"
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
