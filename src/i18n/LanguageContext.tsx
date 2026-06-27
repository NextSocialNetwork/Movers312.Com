import React, { createContext, useContext, useState, useEffect } from 'react';
import { LanguageCode, TranslationDict, translations } from './translations';
import { Globe } from 'lucide-react';

interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: TranslationDict;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  dir: 'ltr'
});

export const LANGUAGES_INFO: { code: LanguageCode; label: string; flag: string }[] = [
  { code: 'en', label: 'EN (English)', flag: '🇺🇸' },
  { code: 'es', label: 'ES (Español)', flag: '🇪🇸' },
  { code: 'ru', label: 'RU (Русский)', flag: '🇷🇺' },
  { code: 'ar', label: 'AR (العربية)', flag: '🇸🇦' },
  { code: 'lt', label: 'LT (Lietuvių)', flag: '🇱🇹' },
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('movers312_lang') as LanguageCode;
    return saved && translations[saved] ? saved : 'en';
  });

  const setLang = (newLang: LanguageCode) => {
    if (translations[newLang]) {
      setLangState(newLang);
      localStorage.setItem('movers312_lang', newLang);
    }
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }, [lang, dir]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang], dir }}>
      <div dir={dir} className="w-full flex flex-col min-h-screen transition-all duration-150">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export const LanguageSwitcher: React.FC = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="relative inline-flex items-center font-mono">
      <div className="flex items-center gap-1.5 bg-[#f3f1e9] hover:bg-[#ebe8dd] border border-[#cbd2cd] rounded-lg p-1 transition shadow-2xs">
        <Globe className="w-3.5 h-3.5 text-emerald-700 ml-1.5 shrink-0" />
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as LanguageCode)}
          className="bg-transparent text-xs font-bold text-[#122119] focus:outline-none cursor-pointer pr-2 py-1 rtl:pl-2 rtl:pr-0"
          aria-label="Select Language"
        >
          {LANGUAGES_INFO.map((item) => (
            <option key={item.code} value={item.code} className="bg-white text-[#122119] font-sans text-xs py-1">
              {item.flag} {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
