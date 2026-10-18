import React from 'react';
import { X, Building2, ShieldCheck, AlertTriangle, Bot, CheckCircle2, Phone, MapPin, Truck, FileText } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

export type PolicyTab = 'about' | 'privacy' | 'disclaimer' | 'ai-policy';

interface InfoPagesModalProps {
  activeTab: PolicyTab | null;
  onClose: () => void;
  onSelectTab: (tab: PolicyTab) => void;
  currentLang: Language;
}

export const InfoPagesModal: React.FC<InfoPagesModalProps> = ({
  activeTab,
  onClose,
  onSelectTab,
  currentLang = 'en',
}) => {
  if (!activeTab) return null;

  const t = translations[currentLang] || translations.en;

  const tabs: { id: PolicyTab; label: string; icon: React.ReactNode }[] = [
    { id: 'about', label: t.aboutUs, icon: <Building2 className="w-4 h-4" /> },
    { id: 'privacy', label: t.privacyPolicy, icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'disclaimer', label: t.disclaimer, icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'ai-policy', label: t.aiChatPolicy, icon: <Bot className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0a120e] text-[#a4ccb6] border border-emerald-800/40 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-emerald-900/40 bg-[#0d1813]">
          <div className="flex items-center gap-3">
            <div className="bg-[#30D5C8]/10 text-[#30D5C8] p-2.5 rounded-xl border border-[#30D5C8]/30">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-extrabold text-base tracking-wide">
                  MOVERS<span className="text-[#30D5C8]">312</span>
                </h3>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded font-mono">
                  ICC #3280B
                </span>
              </div>
              <p className="text-xs text-[#a4ccb6]/70 font-sans">
                {t.companyLegal} & Policy Documentation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#a4ccb6]/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="flex border-b border-emerald-900/30 bg-[#080e0a] overflow-x-auto p-1.5 gap-1 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#30D5C8] text-black shadow-lg font-bold'
                  : 'text-[#a4ccb6]/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm font-sans leading-relaxed text-[#c2dfd1]">
          
          {/* ABOUT US TAB */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-r from-emerald-950/80 to-black p-5 rounded-xl border border-emerald-800/30">
                <span className="text-[10px] text-[#30D5C8] font-mono tracking-widest uppercase block mb-1 font-bold">
                  Chicago's Premier Relocation Specialist
                </span>
                <h2 className="text-xl font-bold text-white mb-2">About Movers312</h2>
                <p className="text-xs leading-relaxed text-[#a4ccb6]/90">
                  Movers312 is a premier licensed and bonded local relocation carrier headquartered in Chicago, Illinois. Operating under <strong>Illinois Commerce Commission (ICC) Dispatch License #3280B</strong> and <strong>USDOT #4893122</strong>, we specialize in residential apartment moves, high-rise elevator logistics, commercial office relocations, and heavy specialty item transport across all 77 Chicago neighborhoods and Cook County.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0f1d16] p-4 rounded-xl border border-emerald-900/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#30D5C8] font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Guaranteed Binding Pricing</span>
                  </div>
                  <p className="text-xs text-[#a4ccb6]/80">
                    We eliminate industry guesswork. Every quote generated through our instant estimator provides a locked, binding quote based on your move parameters with zero hidden fees on moving day.
                  </p>
                </div>

                <div className="bg-[#0f1d16] p-4 rounded-xl border border-emerald-900/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#30D5C8] font-bold text-xs uppercase tracking-wider">
                    <FileText className="w-4 h-4" />
                    <span>Complimentary Building COIs</span>
                  </div>
                  <p className="text-xs text-[#a4ccb6]/80">
                    High-rise elevator buildings and luxury condos in downtown Chicago require strict Certificates of Insurance (COI). We issue custom COIs for building management at zero extra charge.
                  </p>
                </div>

                <div className="bg-[#0f1d16] p-4 rounded-xl border border-emerald-900/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#30D5C8] font-bold text-xs uppercase tracking-wider">
                    <Truck className="w-4 h-4" />
                    <span>Multilingual Local Crews</span>
                  </div>
                  <p className="text-xs text-[#a4ccb6]/80">
                    Our professional moving crews and dispatchers communicate fluently in English, Spanish, Lithuanian, Russian, Japanese, and Arabic, ensuring clear direction at every step.
                  </p>
                </div>

                <div className="bg-[#0f1d16] p-4 rounded-xl border border-emerald-900/30 space-y-2">
                  <div className="flex items-center gap-2 text-[#30D5C8] font-bold text-xs uppercase tracking-wider">
                    <MapPin className="w-4 h-4" />
                    <span>100% Cook County Coverage</span>
                  </div>
                  <p className="text-xs text-[#a4ccb6]/80">
                    From the Loop, River North, and Lincoln Park to Evanston, Oak Park, and Schaumburg, our dedicated fleet is equipped with 16ft and 26ft box trucks to handle any relocation scale.
                  </p>
                </div>
              </div>

              <div className="bg-[#122119] p-4 rounded-xl border border-emerald-800/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="text-white font-bold text-xs">Need Direct Phone Assistance?</h4>
                  <p className="text-[11px] text-[#a4ccb6]/70">Our live dispatch desk is available 24/7 for booking confirmations and questions.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <a href="tel:3123859229" className="bg-[#30D5C8] text-black px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-[#30D5C8]/90 transition-all">
                    <Phone className="w-3.5 h-3.5" />
                    <span>(312) 385-9229</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* PRIVACY POLICY TAB */}
          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <span className="text-[10px] text-[#30D5C8] font-mono tracking-widest uppercase block mb-1">
                  Effective Date: January 1, 2026
                </span>
                <h2 className="text-xl font-bold text-white mb-2">Privacy Policy</h2>
                <p className="text-xs text-[#a4ccb6]/80 leading-relaxed">
                  Movers312 ("we", "us", or "our") respects your personal privacy and is committed to protecting all information collected during the instant quote calculation, reservation, and dispatch process.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="border-l-2 border-[#30D5C8] pl-3 space-y-1">
                  <h3 className="font-bold text-white">1. Information We Collect</h3>
                  <p className="text-[#a4ccb6]/80">
                    When you calculate a quote or reserve a move, we collect necessary contact and operational details, including your full name, email address, phone number, pickup/destination ZIP codes, move date, preferred time slot, stair walkup requirements, and specialty item details.
                  </p>
                </div>

                <div className="border-l-2 border-[#30D5C8] pl-3 space-y-1">
                  <h3 className="font-bold text-white">2. How We Use Your Information</h3>
                  <p className="text-[#a4ccb6]/80">
                    Your information is utilized strictly to formulate binding move quotes, assign driver and helper crews, issue building Certificates of Insurance (COI), process $100 security deposit verifications via Cash App, and communicate dispatch updates regarding your scheduled move.
                  </p>
                </div>

                <div className="border-l-2 border-[#30D5C8] pl-3 space-y-1">
                  <h3 className="font-bold text-white">3. Third-Party Sharing & Data Sales</h3>
                  <p className="text-[#a4ccb6]/80">
                    <strong>We do NOT sell, rent, or trade customer personal data to third-party marketers or lead brokers.</strong> Your details remain strictly confidential within Movers312 dispatch systems.
                  </p>
                </div>

                <div className="border-l-2 border-[#30D5C8] pl-3 space-y-1">
                  <h3 className="font-bold text-white">4. Cookies & Browser Storage</h3>
                  <p className="text-[#a4ccb6]/80">
                    We use standard local storage session variables to preserve your calculated move quotes, moving timeline checklist progress, and language preferences directly in your browser for convenience.
                  </p>
                </div>

                <div className="border-l-2 border-[#30D5C8] pl-3 space-y-1">
                  <h3 className="font-bold text-white">5. Contact & Privacy Requests</h3>
                  <p className="text-[#a4ccb6]/80">
                    If you wish to review, update, or request deletion of your saved reservation details from our dispatch log, please email us at <strong>Movers312.Com@Gmail.Com</strong> or contact our dispatch team at <strong>(312) 385-9229</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* DISCLAIMER TAB */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase block mb-1">
                  Legal Terms & Service Conditions
                </span>
                <h2 className="text-xl font-bold text-white mb-2">Disclaimer & Operating Terms</h2>
                <p className="text-xs text-[#a4ccb6]/80 leading-relaxed">
                  Please review the following operating terms regarding binding price guarantees, security deposits, building access rules, and carrier liability regulations.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-amber-950/20 border border-amber-800/40 p-3.5 rounded-xl space-y-1.5">
                  <h3 className="font-bold text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>$100 Security Deposit & Cancellation Fee Policy</span>
                  </h3>
                  <p className="text-amber-200/80 leading-relaxed">
                    To lock in your driver dispatch, truck reservation, and crew assignment on your selected date, a <strong>$100 security deposit via Cash App to $Movers312</strong> is required. <strong>In case you cancel your move, the $100 security deposit will be kept as a cancellation fee</strong> to cover crew scheduling and truck holding reservations.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-3 space-y-1">
                  <h3 className="font-bold text-white">Binding Quote Accuracy</h3>
                  <p className="text-[#a4ccb6]/80">
                    All instant quotes generated online are binding based on the accurate disclosure of move parameters (ZIP codes, room size, stair/walkway conditions, heavy items, and estimated hours). Unannounced extreme items (such as pianos, gun safes over 300 lbs, or unlisted flight walkups) may require inventory adjustment on moving day.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-3 space-y-1">
                  <h3 className="font-bold text-white">Building Elevator & Parking Permits</h3>
                  <p className="text-[#a4ccb6]/80">
                    Customers are responsible for reserving building freight elevators and securing loading dock access times with building management. Movers312 provides complimentary Certificates of Insurance (COI) upon request prior to move day.
                  </p>
                </div>

                <div className="border-l-2 border-emerald-500 pl-3 space-y-1">
                  <h3 className="font-bold text-white">Valuation Coverage</h3>
                  <p className="text-[#a4ccb6]/80">
                    All shipments automatically include standard Illinois Commerce Commission (ICC) carrier valuation coverage ($0.30 per pound per article). Additional third-party full replacement insurance options are available upon written request before dispatch.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* AI CHAT SUPPORT POLICY TAB */}
          {activeTab === 'ai-policy' && (
            <div className="space-y-5 animate-fade-in">
              <div>
                <span className="text-[10px] text-[#30D5C8] font-mono tracking-widest uppercase block mb-1">
                  Automated Assistant Transparency Notice
                </span>
                <h2 className="text-xl font-bold text-white mb-2">AI Chat Support Policy</h2>
                <p className="text-xs text-[#a4ccb6]/80 leading-relaxed">
                  This policy outlines how Matt's AI Dispatch Assistant operates, its intended purpose, data safeguards, and escalation options for live customer support.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-[#0f1d16] p-4 rounded-xl border border-emerald-800/30 space-y-1.5">
                  <h3 className="font-bold text-white flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-[#30D5C8]" />
                    <span>Purpose of the AI Assistant</span>
                  </h3>
                  <p className="text-[#a4ccb6]/80 leading-relaxed">
                    Matt's AI Dispatch Assistant is designed to provide 24/7 instant answers regarding Movers312 rates, service areas, packing kit details, stair surcharges, building COI requirements, and Chicago relocation guidelines in multiple languages.
                  </p>
                </div>

                <div className="border-l-2 border-[#30D5C8] pl-3 space-y-1">
                  <h3 className="font-bold text-white">Informational Scope & Verification</h3>
                  <p className="text-[#a4ccb6]/80">
                    Responses provided by the AI Chat Support tool are generated for quick guidance based on company dispatch guidelines. Official binding reservations are confirmed upon submitter verification and matching of the $100 Cash App security deposit.
                  </p>
                </div>

                <div className="border-l-2 border-[#30D5C8] pl-3 space-y-1">
                  <h3 className="font-bold text-white">Chat Data Handling & Security</h3>
                  <p className="text-[#a4ccb6]/80">
                    Chat interactions are processed in real-time to answer your inquiries. <strong>Do not enter sensitive financial account credentials or full credit card numbers directly into the chat window.</strong> All security deposits are handled independently via Cash App ($Movers312).
                  </p>
                </div>

                <div className="bg-[#122119] p-3.5 rounded-xl border border-emerald-800/40 space-y-1">
                  <h3 className="font-bold text-white">24/7 Human Dispatch Escalation</h3>
                  <p className="text-[#a4ccb6]/80">
                    If you require custom dispatch adjustments, emergency schedule changes, or wish to speak directly with human dispatch staff, call our 24/7 hotline at <strong>(312) 385-9229</strong> or email <strong>Movers312.Com@Gmail.Com</strong>.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-emerald-900/40 bg-[#0d1813] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#a4ccb6]/70">
          <div className="flex items-center gap-2 font-mono text-[10px]">
            <ShieldCheck className="w-4 h-4 text-[#30D5C8]" />
            <span>Movers312 Legal & Operational Compliance • Illinois ICC #3280B</span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
