export type LanguageCode = 'en' | 'es' | 'ru' | 'ar' | 'lt';

export interface TranslationDict {
  // Top Bar
  iccDispatch: string;
  liveDispatch: string;
  chicagoMovingCompany: string;

  // Hero
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;

  // Config Grid
  configParams: string;
  configParamsSub: string;
  stepConfig: string;
  secAZip: string;
  pickupZip: string;
  dropoffZip: string;
  estDistance: string;

  // Sec B
  secBCargo: string;
  selectFleet: string;
  twoMovers16ft: string;
  threeMovers26ft: string;
  fourMovers26ft: string;
  tariffRate: string;
  twoHrsMin: string;
  adjustDuration: string;
  baseLaborEst: string;

  // Sec C
  secCCalendar: string;
  relocationDate: string;
  preferredWindow: string;
  mornWindow: string;
  aftWindow: string;

  // Sec D
  secDOptions: string;
  stairObstacles: string;
  stairNone: string;
  stairFloors: string;
  stairWalkway: string;
  packingKitBox: string;
  packingNone: string;
  packingStudio: string;
  packing2Bed: string;
  packing4Bed: string;
  specialtyHeavy: string;
  laborOnlyOption: string;

  // Quote Summary Card
  instantEstimate: string;
  bindingTariff: string;
  baseHourlyFee: string;
  packingKitFeeLabel: string;
  elevationFeeLabel: string;
  oversizedHandlingLabel: string;
  laborOnlyDeductionLabel: string;
  securityDepositLabel: string;
  reqToLock: string;
  guaranteedBoundEst: string;
  stateInsuredInc: string;
  illinoisTariffsLocked: string;
  tariffsExplanation: string;
  movingGuarantees: string;
  guarantee1: string;
  guarantee2: string;
  guarantee3: string;

  // Core Features
  whyTrustBadge: string;
  whyTrustTitle: string;
  whyTrustSub: string;
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;

  // Testimonials & FAQs
  reviewsBadge: string;
  reviewsTitle: string;
  faqBadge: string;
  faqTitle: string;
  faqSub: string;

  // Footer & Chat
  footerDesc: string;
  rightsReserved: string;
  aiChatToggle: string;
  aiChatTitle: string;
  aiChatSub: string;
  aiChatPlace: string;
  aiChatGreeting: string;
}

export const translations: Record<LanguageCode, TranslationDict> = {
  en: {
    iccDispatch: "ILLINOIS ICC DISPATCH #3280B",
    liveDispatch: "Live Driver's Dispatch",
    chicagoMovingCompany: "Chicago Moving Company",
    heroBadge: "Chicagoland's Top-Rated Moving Crew",
    heroTitle: "Movers312 Professional Moving Services & Price Estimator",
    heroSubtitle: "Configure your moving parameters, crew requirements, and access variables below for a guaranteed, 100% binding quote instantly!",
    configParams: "Configuration Parameters",
    configParamsSub: "Specify layout dimensions and cargo conditions.",
    stepConfig: "Step Config",
    secAZip: "Chicagoland ZIP Coordinates",
    pickupZip: "Pick-up ZIP (Origin Location)",
    dropoffZip: "Drop-off ZIP (Destination Location)",
    estDistance: "Est. Route Distance",
    secBCargo: "Move Size & Fleet Configuration",
    selectFleet: "Select 16-FT or 26-FT Urban Fleet Configuration",
    twoMovers16ft: "2 Movers & 16-FT Urban Fleet",
    threeMovers26ft: "3 Movers & 26-FT Urban Fleet",
    fourMovers26ft: "4 Movers & 26-FT Urban Fleet",
    tariffRate: "Tariff Rate",
    twoHrsMin: "2 Hrs Min",
    adjustDuration: "Adjust Estimated Duration",
    baseLaborEst: "Base Labor Rate Estimate",
    secCCalendar: "Dispatch Calendar & Timings",
    relocationDate: "Relocation Date Check-In",
    preferredWindow: "Preferred Service Window",
    mornWindow: "8:00 AM Prompt",
    aftWindow: "1:00 PM Window",
    secDOptions: "Stairways & Material Kit Options",
    stairObstacles: "Stairway / Elevation Obstacles",
    stairNone: "Elevator / Ground",
    stairFloors: "3rd Floor & Up Stairs",
    stairWalkway: "Long Walkway / Courtyard",
    packingKitBox: "Packing Materials Box Kit",
    packingNone: "No Packing Needed",
    packingStudio: "Studio / 1-Bed Kit",
    packing2Bed: "2-3 Bed Full Home Kit",
    packing4Bed: "4+ Bed Master Kit",
    specialtyHeavy: "Heavy Item Handling (>300 lbs safe/piano)",
    laborOnlyOption: "Labor-Only Rate (Customer provides truck -25%)",
    instantEstimate: "INSTANT ESTIMATE",
    bindingTariff: "BINDING TARIFF BREAKDOWN",
    baseHourlyFee: "Base Hourly Labor Fee",
    packingKitFeeLabel: "Packing Materials Box Kit",
    elevationFeeLabel: "Elevation / Stairs / Walkway Fee",
    oversizedHandlingLabel: "Oversized Specialty Handling",
    laborOnlyDeductionLabel: "Labor-Only Rate Deduction (-25%)",
    securityDepositLabel: "Security Deposit Required",
    reqToLock: "Required to lock dispatch moving window",
    guaranteedBoundEst: "Guaranteed Bound Estimate",
    stateInsuredInc: "BIP / State Insured Included",
    illinoisTariffsLocked: "Illinois Tariffs Locked",
    tariffsExplanation: "Estimates are generated from actual coordinates matrices in our Cook County system. No secondary surprise charges will apply.",
    movingGuarantees: "Moving Guarantees",
    guarantee1: "Free 12 heavy duty moving blankets per crew",
    guarantee2: "Dual layered security straps on specialized wall systems",
    guarantee3: "Wardrobe boxes accessible for wardrobe transfer",
    whyTrustBadge: "PROFESSIONAL CHICAGO RELOCATION CORE",
    whyTrustTitle: "Why Chicago Trusts Movers312 Team",
    whyTrustSub: "Serving our community since 2018 with absolute safety assurance, high-capacity vehicles, and a carefully trained local workforce.",
    feature1Title: "1. Pure Bound Estimates",
    feature1Desc: "The quote simulated here is matching what you sign. Zero hidden gas, mileage, or seasonal up-charges ever.",
    feature2Title: "2. Premium Wraps & Pads",
    feature2Desc: "All crew assets include up to 12 heavy duty moving blankets and premium stretch wrap layers free-of-charge.",
    feature3Title: "3. Professional Dispatch 24/7",
    feature3Desc: "Led by local supervisor Matt, our professional movers know typical Chicago tight corridors and stairs challenges.",
    feature4Title: "4. Full COI Insurance",
    feature4Desc: "We provide instant Certificate of Insurance (COI) for downtown luxury high-rises and loading dock reservations.",
    reviewsBadge: "VERIFIED CHICAGO VERDICTS",
    reviewsTitle: "Customer Testimonials",
    faqBadge: "DISPATCH LOGISTICS HELP DESK",
    faqTitle: "Frequently Asked Questions",
    faqSub: "Click any prompt to expand instant guidance from our central Cook County dispatch center:",
    footerDesc: "Specialized high-fidelity cargo relocation across Chicago and surrounding Cook County neighborhoods. We ensure standard binding rates, absolute safety assurance blanket wrapping, and background-checked operators.",
    rightsReserved: "© 2026 Movers312 Company. All rights reserved. Licensed Illinois Movers.",
    aiChatToggle: "AI Support Chat",
    aiChatTitle: "Movers312 AI Support",
    aiChatSub: "Matt's Dispatch Assistant • 24/7",
    aiChatPlace: "Ask about rates, packing, stairs...",
    aiChatGreeting: "👋 Hi there! I'm Matt's AI Dispatch Assistant. Have questions about moving across Chicago, building regulations, or getting an instant binding quote? Ask me anything!"
  },
  es: {
    iccDispatch: "DESPACHO ILLINOIS ICC #3280B",
    liveDispatch: "Despacho en Vivo de Conductores",
    chicagoMovingCompany: "Empresa de Mudanzas de Chicago",
    heroBadge: "El Mejor Equipo de Mudanzas de Chicago",
    heroTitle: "Movers312 Servicios Profesionales de Mudanza y Calculadora de Precios",
    heroSubtitle: "¡Configure sus parámetros de mudanza, requisitos de personal y variables de acceso a continuación para obtener una cotización vinculante garantizada al 100% al instante!",
    configParams: "Parámetros de Configuración",
    configParamsSub: "Especifique las dimensiones y condiciones de la carga.",
    stepConfig: "Configuración",
    secAZip: "Coordenadas Postales de Chicago",
    pickupZip: "Código Postal de Recogida (Origen)",
    dropoffZip: "Código Postal de Entrega (Destino)",
    estDistance: "Distancia Estimada de la Ruta",
    secBCargo: "Tamaño de Mudanza y Flota",
    selectFleet: "Seleccione Flota Urbana de 16-FT o 26-FT",
    twoMovers16ft: "2 Mudanceros y Camión 16-FT",
    threeMovers26ft: "3 Mudanceros y Camión 26-FT",
    fourMovers26ft: "4 Mudanceros y Camión 26-FT",
    tariffRate: "Tarifa",
    twoHrsMin: "2 Hrs Mín",
    adjustDuration: "Ajustar Duración Estimada",
    baseLaborEst: "Estimación Base de Mano de Obra",
    secCCalendar: "Calendario y Horarios",
    relocationDate: "Fecha de la Mudanza",
    preferredWindow: "Horario Preferido",
    mornWindow: "8:00 AM Puntual",
    aftWindow: "1:00 PM Tarde",
    secDOptions: "Opciones de Escaleras y Embalaje",
    stairObstacles: "Obstáculos de Escaleras / Elevación",
    stairNone: "Ascensor / Planta Baja",
    stairFloors: "3er Piso o Superior",
    stairWalkway: "Pasillo Largo / Patio",
    packingKitBox: "Kit de Materiales de Embalaje",
    packingNone: "Sin Embalaje Necesario",
    packingStudio: "Kit Estudio / 1 Hab",
    packing2Bed: "Kit Casa 2-3 Hab",
    packing4Bed: "Kit Completo 4+ Hab",
    specialtyHeavy: "Carga Pesada (>300 lbs piano/caja fuerte)",
    laborOnlyOption: "Solo Mano de Obra (Cliente pone camión -25%)",
    instantEstimate: "COTIZACIÓN INSTANTÁNEA",
    bindingTariff: "DESGLOSE DE TARIFA VINCULANTE",
    baseHourlyFee: "Mano de Obra por Hora Base",
    packingKitFeeLabel: "Kit de Materiales de Embalaje",
    elevationFeeLabel: "Tarifa por Escaleras / Pasillos",
    oversizedHandlingLabel: "Manejo Especial de Carga Pesada",
    laborOnlyDeductionLabel: "Descuento por Solo Mano de Obra (-25%)",
    securityDepositLabel: "Depósito de Seguridad Requerido",
    reqToLock: "Requerido para asegurar horario de mudanza",
    guaranteedBoundEst: "Cotización Vinculante Garantizada",
    stateInsuredInc: "BIP / Seguro Estatal Incluido",
    illinoisTariffsLocked: "Tarifas de Illinois Protegidas",
    tariffsExplanation: "Las cotizaciones se generan a partir de matrices reales en nuestro sistema del condado de Cook. Nunca se aplicarán cargos sorpresa secundarios.",
    movingGuarantees: "Garantías de Mudanza",
    guarantee1: "12 mantas de protección pesadas gratis por equipo",
    guarantee2: "Correas de seguridad de doble capa en sistemas de pared",
    guarantee3: "Cajas armario disponibles para traslado de ropa",
    whyTrustBadge: "NÚCLEO PROFESIONAL DE MUDANZAS EN CHICAGO",
    whyTrustTitle: "Por Qué Chicago Confía en Movers312",
    whyTrustSub: "Sirviendo a nuestra comunidad desde 2018 con máxima seguridad, vehículos de gran capacidad y personal local altamente capacitado.",
    feature1Title: "1. Cotizaciones Exactas",
    feature1Desc: "El precio calculado aquí es exactamente lo que usted firma. Cero cargos ocultos por combustible o kilometraje.",
    feature2Title: "2. Protección Premium",
    feature2Desc: "Todos los camiones incluyen hasta 12 mantas acolchadas de protección y plástico estirable totalmente gratis.",
    feature3Title: "3. Despacho 24/7",
    feature3Desc: "Dirigidos por Matt, nuestros transportistas conocen a la perfección los pasillos estrechos y escaleras de Chicago.",
    feature4Title: "4. Seguro COI Completo",
    feature4Desc: "Emitimos Certificados de Seguro (COI) al instante para edificios de lujo en el centro y muelles de carga.",
    reviewsBadge: "TESTIMONIOS VERIFICADOS EN CHICAGO",
    reviewsTitle: "Reseñas de Clientes",
    faqBadge: "CENTRO DE AYUDA LOGÍSTICA",
    faqTitle: "Preguntas Frecuentes",
    faqSub: "Haga clic en cualquier pregunta para ver la respuesta de nuestro centro de despacho:",
    footerDesc: "Mudanzas especializadas de alta calidad en Chicago y vecindarios del condado de Cook. Garantizamos tarifas fijas, mantas de protección total y operadores verificados.",
    rightsReserved: "© 2026 Movers312 Company. Todos los derechos reservados. Transportistas autorizados en Illinois.",
    aiChatToggle: "Chat de Soporte IA",
    aiChatTitle: "Soporte IA Movers312",
    aiChatSub: "Asistente de Despacho de Matt • 24/7",
    aiChatPlace: "Pregunte sobre tarifas, embalaje, escaleras...",
    aiChatGreeting: "👋 ¡Hola! Soy el asistente de IA de Matt. ¿Tiene preguntas sobre mudanzas en Chicago, regulaciones de edificios o cotizaciones instantáneas? ¡Pregúnteme lo que sea!"
  },
  ru: {
    iccDispatch: "ДИСПЕТЧЕРСКАЯ ИЛЛИНОЙС ICC #3280B",
    liveDispatch: "Онлайн диспетчерская водителей",
    chicagoMovingCompany: "Мувинговая компания Чикаго",
    heroBadge: "Лучшая команда грузчиков в Чикаго",
    heroTitle: "Movers312 Профессиональные мувинговые услуги и калькулятор цен",
    heroSubtitle: "Настройте параметры переезда, требования к бригаде и условия доступа ниже для мгновенного получения гарантированной на 100% точной фиксированной цены!",
    configParams: "Параметры конфигурации",
    configParamsSub: "Укажите размеры помещения и условия перевозки груза.",
    stepConfig: "Конфигурация",
    secAZip: "Почтовые индексы Чикаго",
    pickupZip: "Индекс погрузки (Откуда)",
    dropoffZip: "Индекс выгрузки (Куда)",
    estDistance: "Расчетное расстояние маршрута",
    secBCargo: "Объем переезда и автопарк",
    selectFleet: "Выберите фургон 16-FT или 26-FT",
    twoMovers16ft: "2 грузчика и фургон 16-FT",
    threeMovers26ft: "3 грузчика и фургон 26-FT",
    fourMovers26ft: "4 грузчика и фургон 26-FT",
    tariffRate: "Тариф",
    twoHrsMin: "Мин. 2 часа",
    adjustDuration: "Изменить расчетное время",
    baseLaborEst: "Базовая стоимость работ",
    secCCalendar: "Календарь и время подачи",
    relocationDate: "Дата переезда",
    preferredWindow: "Желаемое время",
    mornWindow: "8:00 Утра точно",
    aftWindow: "1:00 Дня окно",
    secDOptions: "Этажи и упаковочные материалы",
    stairObstacles: "Лестницы / Препятствия подъема",
    stairNone: "Лифт / 1-й этаж",
    stairFloors: "3-й этаж и выше (без лифта)",
    stairWalkway: "Длинный проход / Двор",
    packingKitBox: "Комплект упаковочных материалов",
    packingNone: "Упаковка не требуется",
    packingStudio: "Набор Студия / 1-комн",
    packing2Bed: "Набор 2-3 комнатный дом",
    packing4Bed: "Макси-набор 4+ комнат",
    specialtyHeavy: "Тяжелые предметы (>300 фунтов сейф/пианино)",
    laborOnlyOption: "Только грузчики (Грузовик клиента -25%)",
    instantEstimate: "МГНОВЕННЫЙ РАСЧЕТ",
    bindingTariff: "ДЕТАЛИЗАЦИЯ ФИКСИРОВАННОЙ ЦЕНЫ",
    baseHourlyFee: "Почасовая работа бригады",
    packingKitFeeLabel: "Упаковочные материалы",
    elevationFeeLabel: "Доплата за этажи / пронос",
    oversizedHandlingLabel: "Крупногабаритные тяжелые предметы",
    laborOnlyDeductionLabel: "Скидка «Только грузчики» (-25%)",
    securityDepositLabel: "Требуется депозит бронирования",
    reqToLock: "Необходим для закрепления бригады",
    guaranteedBoundEst: "Гарантированная точная цена",
    stateInsuredInc: "Госстрахование включено",
    illinoisTariffsLocked: "Тарифы штата Иллинойс зафиксированы",
    tariffsExplanation: "Расчеты основаны на точных матрицах координат округа Кук. Никаких скрытых или дополнительных платежей не будет.",
    movingGuarantees: "Наши гарантии",
    guarantee1: "Бесплатно 12 плотных защитных одеял на бригаду",
    guarantee2: "Двойные крепежные ремни в кузове фургона",
    guarantee3: "Гардеробные коробки для перевозки одежды",
    whyTrustBadge: "ПРОФЕССИОНАЛЬНЫЙ ПЕРЕЕЗД В ЧИКАГО",
    whyTrustTitle: "Почему Чикаго доверяет команде Movers312",
    whyTrustSub: "Работаем с 2018 года с полной гарантией сохранности вещей, вместительными грузовиками и обученным персоналом.",
    feature1Title: "1. Честная фиксированная цена",
    feature1Desc: "Рассчитанная здесь цена в точности совпадает с договором. Никаких доплат за бензин или километраж.",
    feature2Title: "2. Премиум защита мебели",
    feature2Desc: "В каждый фургон входят до 12 плотных защитных одеял и стрейч-пленка совершенно бесплатно.",
    feature3Title: "3. Поддержка 24/7",
    feature3Desc: "Под руководством Мэтта наши специалисты легко справляются со узкими коридорами и лестницами Чикаго.",
    feature4Title: "4. Страховые сертификаты COI",
    feature4Desc: "Мы мгновенно предоставляем сертификат COI для бронирования грузовых лифтов в небоскребах.",
    reviewsBadge: "ОТЗЫВЫ КЛИЕНТОВ В ЧИКАГО",
    reviewsTitle: "Отзывы клиентов",
    faqBadge: "СПРАВОЧНАЯ СЛУЖБА ЛОГИСТИКИ",
    faqTitle: "Часто задаваемые вопросы",
    faqSub: "Нажмите на любой вопрос для получения подробного ответа:",
    footerDesc: "Специализированные качественные переезды по Чикаго и округу Кук. Мы гарантируем фиксированные ставки, полную защиту мебели защитными одеялами и проверенный персонал.",
    rightsReserved: "© 2026 Movers312 Company. Все права защищены. Лицензированные муверы Иллинойса.",
    aiChatToggle: "ИИ Чат поддержки",
    aiChatTitle: "ИИ Поддержка Movers312",
    aiChatSub: "Диспетчер-ассистент Мэтта • 24/7",
    aiChatPlace: "Спросите о ценах, упаковке, этажах...",
    aiChatGreeting: "👋 Здравствуйте! Я ИИ ассистент диспетчера Мэтта. Есть вопросы о переезде по Чикаго, правилах зданий или мгновенном расчете цены? Задавайте любые вопросы!"
  },
  ar: {
    iccDispatch: "تصريح شيكاغو إلينوي ICC #3280B",
    liveDispatch: "إرسال السائقين المباشر",
    chicagoMovingCompany: "شركة نقل أثاث شيكاغو",
    heroBadge: "أفضل فريق نقل أثاث تقييمًا في شيكاغو",
    heroTitle: "Movers312 خدمات النقل الاحترافية وحاسبة التكلفة",
    heroSubtitle: "قم بتهيئة معايير النقل ومتطلبات الطاقم ومتغيرات الوصول أدناه للحصول على تسعيرة نهائية ومضمونة 100% على الفور!",
    configParams: "معايير التهيئة",
    configParamsSub: "حدد أبعاد المكان وظروف نقل الأثاث.",
    stepConfig: "خطوة الإعداد",
    secAZip: "إحداثيات الرمز البريدي لشيكاغو",
    pickupZip: "الرمز البريدي للاستلام (المغادرة)",
    dropoffZip: "الرمز البريدي للتسليم (الوصول)",
    estDistance: "مسافة المسار المقدرة",
    secBCargo: "حجم النقل وأسطول الشاحنات",
    selectFleet: "اختر شاحنة أسطول المدينة 16 أو 26 قدم",
    twoMovers16ft: "عاملان وشاحنة 16 قدم",
    threeMovers26ft: "3 عمال وشاحنة 26 قدم",
    fourMovers26ft: "4 عمال وشاحنة 26 قدم",
    tariffRate: "التعرفة",
    twoHrsMin: "حد أدنى 2 ساعات",
    adjustDuration: "تعديل المدة المقدرة",
    baseLaborEst: "تقدير تكلفة العمالة الأساسية",
    secCCalendar: "جدول الإرسال والمواعيد",
    relocationDate: "تاريخ النقل",
    preferredWindow: "فترة النقل المفضلة",
    mornWindow: "8:00 صباحًا بالضبط",
    aftWindow: "1:00 ظهراً (فترة مسائية)",
    secDOptions: "السلالم ومعدات التغليف",
    stairObstacles: "عقبات السلالم / الارتفاع",
    stairNone: "مصعد / الطابق الأرضي",
    stairFloors: "الطابق الثالث فما فوق (بدون مصعد)",
    stairWalkway: "ممر طويل / فناء داخلي",
    packingKitBox: "حزمة مواد التغليف والحزم",
    packingNone: "لا حاجة للتغليف",
    packingStudio: "حزمة استوديو / غرفة واحدة",
    packing2Bed: "حزمة منزل 2-3 غرف",
    packing4Bed: "حزمة شاملة 4+ غرف",
    specialtyHeavy: "نقل عناصر ثقيلة (>300 رطل بيانو/خزنة)",
    laborOnlyOption: "عمال فقط (العميل يوفر الشاحنة -25%)",
    instantEstimate: "التسعيرة الفورية",
    bindingTariff: "تفصيل السعر النهائي المضمون",
    baseHourlyFee: "أجرة العمالة بالساعة",
    packingKitFeeLabel: "حزمة مواد التغليف",
    elevationFeeLabel: "رسوم السلالم / الممرات الطويلة",
    oversizedHandlingLabel: "نقل العناصر الثقيلة والخاصة",
    laborOnlyDeductionLabel: "خصم عمال فقط (-25%)",
    securityDepositLabel: "عربون الحجز المطلوب",
    reqToLock: "مطلوب لتثبيت موعد طاقم النقل",
    guaranteedBoundEst: "إجمالي السعر النهائي المضمون",
    stateInsuredInc: "التأمين الحكومي شامل",
    illinoisTariffsLocked: "تعرفات ولاية إلينوي مثبتة",
    tariffsExplanation: "يتم إنشاء التقديرات من مصفوفات الإحداثيات الفعلية في نظام مقاطعة كوك. لن يتم تطبيق أي رسوم مفاجئة إضافية.",
    movingGuarantees: "ضمانات النقل",
    guarantee1: "12 بطانية نقل مبطنة مجانية لكل فريق",
    guarantee2: "أشرطة تثبيت مزدوجة داخل الشاحنة",
    guarantee3: "صناديق مخصصة لنقل الملابس المعلقة",
    whyTrustBadge: "جوهر النقل الاحترافي في شيكاغو",
    whyTrustTitle: "لماذا يثق سكان شيكاغو في فريق Movers312",
    whyTrustSub: "نخدم مجتمعنا منذ عام 2018 بضمان السلامة المطلقة وشاحنات ذات سعة عالية وعمال محليين مدربين بعناية.",
    feature1Title: "1. أسعار ثابتة وحقيقية",
    feature1Desc: "السعر المحسوب هنا هو ما توقع عليه بالضبط. لا توجد أي رسوم خفية للبنزين أو المسافات.",
    feature2Title: "2. تغليف وحماية فاخرة",
    feature2Desc: "تشمل جميع الشاحنات ما يصل إلى 12 بطانية حماية ثقيلة وأغلفة بلاستيكية مجانًا تمامًا.",
    feature3Title: "3. خدمة إرسال 24/7",
    feature3Desc: "بإشراف المشرف مات، يعرف عمالنا كيفية التعامل مع الممرات الضيقة والسلالم في شيكاغو.",
    feature4Title: "4. شهادات تأمين COI",
    feature4Desc: "نوفر شهادات التأمين (COI) الفورية للمباني الفاخرة وحجوزات أرصفة التحميل.",
    reviewsBadge: "آراء موثقة في شيكاغو",
    reviewsTitle: "تجارب العملاء",
    faqBadge: "مكتب مساعدة اللوجستيات",
    faqTitle: "الأسئلة الشائعة",
    faqSub: "انقر على أي سؤال لعرض الإرشاد الفوري من مركز إرسال مقاطعة كوك:",
    footerDesc: "خدمات نقل أثاث عالية الجودة في شيكاغو والأحياء المجاورة في مقاطعة كوك. نضمن أسعارًا ثابتة وتغليفًا آمنًا بالبطانيات ومشغلين معتمدين.",
    rightsReserved: "© 2026 شركة Movers312. جميع الحقوق محفوظة. مرخصون في ولاية إلينوي.",
    aiChatToggle: "دردشة الدعم الفوري",
    aiChatTitle: "دعم الذكاء الاصطناعي Movers312",
    aiChatSub: "مساعد مات للإرسال • 24/7",
    aiChatPlace: "اسأل عن الأسعار، التغليف، السلالم...",
    aiChatGreeting: "👋 مرحبًا بك! أنا مساعد الإرسال الذكي الخاص بمات. هل لديك أسئلة حول النقل في شيكاغو، أو لوائح المباني، أو الحصول على عرض سعر فوري؟ اسألني عن أي شيء!"
  },
  lt: {
    iccDispatch: "ILINOJAUS ICC DISPEČERIS #3280B",
    liveDispatch: "Tiesioginis vairuotojų dispečeris",
    chicagoMovingCompany: "Čikagos perkraustymo kompanija",
    heroBadge: "Geriausiai įvertinta perkraustymo komanda Čikagoje",
    heroTitle: "Movers312 Profesionalios perkraustymo paslaugos ir kainų skaičiuoklė",
    heroSubtitle: "Žemiau sukonfigūruokite savo perkraustymo parametrus, komandos poreikius ir privažiavimo sąlygas, kad iškart gautumėte 100% garantuotą tikslią kainą!",
    configParams: "Konfigūracijos parametrai",
    configParamsSub: "Nurodykite patalpų matmenis ir krovinių sąlygas.",
    stepConfig: "Konfigūracija",
    secAZip: "Čikagos pašto kodų koordinatės",
    pickupZip: "Paėmimo pašto kodas (Pradinė vieta)",
    dropoffZip: "Pristatymo pašto kodas (Paskirties vieta)",
    estDistance: "Apskaičiuotas maršruto atstumas",
    secBCargo: "Perkraustymo apimtis ir sunkvežimiai",
    selectFleet: "Pasirinkite 16-FT arba 26-FT sunkvežimio konfigūraciją",
    twoMovers16ft: "2 krovikai ir 16-FT sunkvežimis",
    threeMovers26ft: "3 krovikai ir 26-FT sunkvežimis",
    fourMovers26ft: "4 krovikai ir 26-FT sunkvežimis",
    tariffRate: "Tarifas",
    twoHrsMin: "Min. 2 val",
    adjustDuration: "Koreguoti numatomą trukmę",
    baseLaborEst: "Bazinė darbo kaina",
    secCCalendar: "Dispečerio kalendorius ir laikas",
    relocationDate: "Perkraustymo data",
    preferredWindow: "Pageidaujamas laiko langas",
    mornWindow: "8:00 Rytas (tiksliai)",
    aftWindow: "1:00 Popietė",
    secDOptions: "Laiptai ir pakavimo medžiagų rinkiniai",
    stairObstacles: "Laiptai / Pakėlimo kliūtys",
    stairNone: "Liftas / 1-as aukštas",
    stairFloors: "3-ias aukštas ir aukščiau (be lifto)",
    stairWalkway: "Ilgas takas / Vidinis kiemas",
    packingKitBox: "Pakavimo medžiagų rinkinys",
    packingNone: "Pakavimas nereikalingas",
    packingStudio: "Rinkinys studijai / 1 kamb.",
    packing2Bed: "Rinkinys 2-3 kamb. namui",
    packing4Bed: "Didysis rinkinys 4+ kamb.",
    specialtyHeavy: "Sunkūs daiktai (>300 svarų seifas/pianinas)",
    laborOnlyOption: "Tik krovikai (Klientas suteikia sunkvežimį -25%)",
    instantEstimate: "GREITASIS APSKAIČIAVIMAS",
    bindingTariff: "FIKSUOTOS KAINOS IŠSKAIDYMAS",
    baseHourlyFee: "Bazinė valandinė darbo kaina",
    packingKitFeeLabel: "Pakavimo medžiagų rinkinys",
    elevationFeeLabel: "Papildomas mokestis už laiptus / taką",
    oversizedHandlingLabel: "Negabaričių sunkių daiktų nešimas",
    laborOnlyDeductionLabel: "Nuolaida „Tik krovikai“ (-25%)",
    securityDepositLabel: "Reikalingas užsakymo užstatas",
    reqToLock: "Būtina perkraustymo laikui rezervuoti",
    guaranteedBoundEst: "Garantuota fiksuota kaina",
    stateInsuredInc: "Valstybinis draudimas įtrauktas",
    illinoisTariffsLocked: "Ilinojaus tarifai užfiksuoti",
    tariffsExplanation: "Kainos skaičiuojamos pagal Kuko apygardos koordinačių matricas. Jokių nenumatytų papildomų mokesčių nebus.",
    movingGuarantees: "Perkraustymo garantijos",
    guarantee1: "Nemokamos 12 krovinių apsaugos antklodžių komandai",
    guarantee2: "Dvigubi saugos diržai vidinėse sunkvežimio sienose",
    guarantee3: "Rūbų dėžės pakabinamiems drabužiams pervežti",
    whyTrustBadge: "PROFESIONALAUS PERKRAUSTYMO PAGRINDAS",
    whyTrustTitle: "Kodėl Čikaga pasitiki Movers312 komanda",
    whyTrustSub: "Dirbame Čikagos bendruomenei nuo 2018 m. užtikrindami saugumą, talpius sunkvežimus ir kvalifikuotus darbuotojus.",
    feature1Title: "1. Tiksli fiksuota kaina",
    feature1Desc: "Čia apskaičiuota kaina lygiai atitinka sutartį. Jokių papildomų mokesčių už kurą ar kilometrus.",
    feature2Title: "2. Aukščiausios klasės apsauga",
    feature2Desc: "Į kiekvieną sunkvežimį nemokamai įeina iki 12 storų apsauginių antklodžių ir tampri plėvelė.",
    feature3Title: "3. Dispečerio pagalba 24/7",
    feature3Desc: "Vadovaujami Mato, mūsų krovikai puikiai pažįsta siaurus Čikagos koridorius bei laiptines.",
    feature4Title: "4. COI draudimo sertifikatai",
    feature4Desc: "Iškart parengiame draudimo sertifikatą (COI) dangoraižių krovinių liftams rezervuoti.",
    reviewsBadge: "PATIKRINTI ČIKAGOS ATSILIEPIMAI",
    reviewsTitle: "Klientų atsiliepimai",
    faqBadge: "LOGISTIKOS PAGALBOS CENTRAS",
    faqTitle: "Dažniausiai užduodami klausimai",
    faqSub: "Spauskite ant bet kurio klausimo, kad pamatytumėte išsamų dispečerio atsakymą:",
    footerDesc: "Specializuotos aukštos kokybės krovinių gabenimo paslaugos Čikagoje ir aplinkiniuose Kuko apygardos rajonuose. Užtikriname standartines fiksuotas kainas ir patikrintus darbuotojus.",
    rightsReserved: "© 2026 Movers312 Company. Visos teisės saugomos. Licencijuoti Ilinojaus perkraustytojai.",
    aiChatToggle: "DI Pagalbos Pokalbis",
    aiChatTitle: "Movers312 DI Pagalba",
    aiChatSub: "Mato dispečerio asistentas • 24/7",
    aiChatPlace: "Klauskite apie kainas, pakavimą, laiptus...",
    aiChatGreeting: "👋 Sveiki! Aš esu Mato DI dispečerio asistentas. Turite klausimų apie perkraustymą Čikagoje, pastatų taisykles ar norite gauti tikslią kainą? Klauskite manęs bet ko!"
  }
};
