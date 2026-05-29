import { 
  Sofa, PackageCheck, Star, Compass, ClipboardList, PenTool 
} from 'lucide-react';

export default function TrustBadges() {
  const inclusions = [
    {
      icon: <Sofa className="w-5 h-5 text-[#2563eb]" />,
      title: "BLANKET WRAP & PADDING",
      desc: "All furniture items are wrapped in thick professional moving blankets and heavy-duty shrink wrap before leaving your home."
    },
    {
      icon: <ClipboardList className="w-5 h-5 text-[#2563eb]" />,
      title: "DISASSEMBLY & ASSEMBLY",
      desc: "Our movers carry tools to safely take apart beds, tables, and desks, and reassemble them carefully at your new destination."
    },
    {
      icon: <PenTool className="w-5 h-5 text-[#2563eb]" />,
      title: "MOVING DOLLIES & STRAPS",
      desc: "Armed with heavy-duty 3-wheel hand trucks, appliance dollies, and load straps to transport huge loads without scratching floors."
    },
    {
      icon: <PackageCheck className="w-5 h-5 text-[#2563eb]" />,
      title: "PROPER CHICAGO TOLLS & FUEL",
      desc: "Zero hidden fuel or mileage fees for moves under 20 miles. We take care of navigating tricky Chicago streets, bridges, and lanes."
    }
  ];

  const reviews = [
    {
      name: "Marc K.",
      location: "Lincoln Park, Chicago",
      stars: 5,
      date: "May 2026",
      text: "Outstanding service. The 2-man crew was punctual, polite, and handled our narrow 3rd-floor walk-up staircase like absolute champions. The 16 ft box truck fit everything from our 1-bedroom apartment flawlessly. Transparent $150/hr billing with no surprises."
    },
    {
      name: "Elena G.",
      location: "Wicker Park, Chicago",
      stars: 5,
      date: "April 2026",
      text: "Movers312.Com made our Logan Square move remarkably simple. We locked in the 3 hr minimum and they finished packing, driving, and unpacking in 3 hours flat. Highly recommend this local Chicago crew!"
    },
    {
      name: "Darnell T.",
      location: "River North, Chicago",
      stars: 5,
      date: "March 2026",
      text: "Absolute professionals. Their 16 foot truck is kept spotlessly clean and is perfect for navigating tight downtown building loading docks and back-alley clearances. Vetted movers, 5 stars!"
    }
  ];

  const neighborhoods = [
    "Lincoln Park", "Lakeview", "River North", "Logan Square", "Wicker Park", 
    "Bucktown", "Loop", "Gold Coast", "South Loop", "Hyde Park", "Andersonville", "Edgewater"
  ];

  return (
    <div className="space-y-16" id="trust-details-wrapper">
      
      {/* Complete Inclusions List Section */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-block bg-[#0f172a] text-white text-[9px] font-bold uppercase tracking-widest font-mono px-3 py-1 rounded-none border-l-4 border-brand-gold">
            No Hidden Fees
          </div>
          <h3 className="text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            What is Included with your $150/hr Rate?
          </h3>
          <p className="text-xs text-slate-500 font-mono">
            Unlike other movers who tack on charges for basic materials, Movers312.Com provides everything you need out-of-the-box.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {inclusions.map((item, index) => (
            <div 
              key={index} 
              className="td-card p-6 flex flex-col justify-between h-full bg-white border-2 border-slate-200"
            >
              <div>
                <div className="bg-slate-50 w-12 h-12 rounded-none border-2 border-slate-200 flex items-center justify-center mb-5 text-[#2563eb]">
                  {item.icon}
                </div>
                <h4 className="font-bold text-[#0f172a] text-xs tracking-wider uppercase mb-2 font-mono">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chicago Street Operations Grid */}
      <section className="bg-[#0f172a] text-white rounded-none overflow-hidden border-2 border-slate-950">
        <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          <div className="p-8 sm:p-12 lg:col-span-12 xl:col-span-7 space-y-6 flex flex-col justify-center">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest font-mono bg-[#070e1a] px-3 py-1.5 rounded-none w-max border-2 border-[#1e293b]">
              Chicago Logistics Specialists
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase text-white">
              Crafted For Chicago&apos;s Unique Streets
            </h3>
            <p className="text-slate-350 text-xs leading-relaxed font-mono">
              Chicago alleys can be notoriously narrow, and parkways are frequently crowded. Larger 26-foot semi-trucks often block transit roads, violating CTA transit lanes or getting stuck under vintage Metra overhead viaducts.
            </p>
            <p className="text-slate-350 text-xs leading-relaxed font-mono">
              Our professional <strong className="text-brand-cyan">16-foot box truck fleet</strong> is chosen specifically for Chicago operations. It provides plenty of payload space (up to 3 rooms of furniture) while maintaining a tight turning radius that easily navigates narrow historic alleys, tight building docks, and low residential branch lines safely.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
              <div className="space-y-1">
                <span className="text-brand-gold font-bold text-xl block font-mono">16 Foot</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">Cargo box depth</span>
              </div>
              <div className="space-y-1">
                <span className="text-brand-gold font-bold text-xl block font-mono">9&apos;6&quot; Height</span>
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">Low-viaduct safe</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-5 bg-slate-900/45 p-8 sm:p-12 flex flex-col justify-center border-t xl:border-t-0 xl:border-l-2 border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <Compass className="w-8 h-8 text-[#2563eb] shrink-0" />
              <div>
                <h4 className="font-bold text-xs uppercase font-mono tracking-wider text-white">Full Local Coverage</h4>
                <p className="text-[10px] text-slate-450 uppercase font-mono tracking-wider">Direct dispatch to all Chicago points</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {neighborhoods.map((hood, index) => (
                <span 
                  key={index} 
                  className="bg-slate-950 text-slate-300 hover:bg-[#2563eb] hover:text-white hover:border-[#2563eb] transition-all text-[10px] uppercase px-3 py-1.5 rounded-none cursor-default font-mono border-2 border-slate-850"
                >
                  {hood}
                </span>
              ))}
            </div>

            <p className="text-[10px] text-slate-450 font-mono leading-relaxed uppercase pt-2 border-t border-slate-800">
              *Moving outside of Typical Cook County or Chicago city limits? Contact our team directly on <a href="tel:+13123859229" className="text-brand-cyan hover:underline font-bold">+1 (312) 385-9229</a> to calculate correct mileage surcharges.
            </p>
          </div>

        </div>
      </section>

      {/* Chicago Customer Reviews / Testimonials */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-block bg-[#0f172a] text-white text-[9px] font-bold uppercase tracking-widest font-mono px-3 py-1 rounded-none border-l-4 border-brand-gold">
            Client Reviews
          </span>
          <h3 className="text-3xl font-black text-[#0f172a] tracking-tight uppercase">
            Loved By Real Chicago Neighbors
          </h3>
          <p className="text-xs text-slate-500 font-mono">
            See how the Movers312.Com professional movers and our custom 16-foot truck make the difference.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {reviews.map((rev, index) => (
            <div 
              key={index} 
              className="td-card p-6 flex flex-col justify-between space-y-6 bg-white border-2 border-slate-200"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
                  ))}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-sans block italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-slate-100 pt-4 text-[11px] font-mono">
                <div>
                  <span className="font-bold text-[#0f172a] block uppercase">{rev.name}</span>
                  <span className="text-slate-450 font-mono text-[10px] uppercase">{rev.location}</span>
                </div>
                <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-none font-bold uppercase text-[9px] tracking-wider">
                  Verified Clean
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
