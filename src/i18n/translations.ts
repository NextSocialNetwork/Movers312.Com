export type Language = 'en' | 'es' | 'lt' | 'ru' | 'ja' | 'ar';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇲🇽' },
  { code: 'lt', label: 'Lietuvių', flag: '🇱🇹' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

export const translations = {
  en: {
    // Top Bar & Header
    iccLicense: "ILLINOIS ICC DISPATCH #3280B",
    liveDispatch: "Live Driver's Dispatch",
    companyTitle: "MOVERS",
    tagline: "Chicago Moving Company",
    callNow: "Call (312) 385-9229",
    languageSelect: "Language",

    // Hero Section
    heroBadge: "CHICAGO'S #1 LOCAL RELOCATION EXPERTS",
    heroTitle: "Instant Guaranteed Chicago Moving Quotes",
    heroSubtitle: "No hidden stair fees, transparent rates, local Cook County movers, and 100% binding quotes configured live in English, Spanish, Lithuanian & Russian.",
    feature1: "ICC Licensed & Insured",
    feature2: "$0 Local Travel Promotion",
    feature3: "Instant Online Binding Quote",
    feature4: "Multilingual Crew (EN/ES/LT/RU)",

    // Form Steps & Estimator
    step1Title: "1. Move Specifications & Distance",
    sizeOfMoveLabel: "Size of Residence / Scope",
    sizeStudio: "Studio Unit",
    size1bed: "1-Bedroom Flat",
    size2bed: "2-Bedroom Residence",
    size3bed: "3+ Bedroom Estate",

    startZipLabel: "Origin Chicago Zip Code",
    endZipLabel: "Destination Chicago Zip Code",
    estHoursLabel: "Estimated Hours Needed",
    estHoursHelp: "Minimum 2 hours, standard 3-4 hrs for 1-2 bedrooms",

    crewTruckLabel: "Crew & Vehicle Setup",
    crew2: "2 Movers & 16-FT Box Truck ($120/hr)",
    crew3: "3 Movers & 26-FT Box Truck ($180/hr)",
    crew4: "4 Movers & 26-FT Box Truck ($230/hr)",

    stairAccessLabel: "Stairways & Access Challenge",
    stairNone: "Elevator / Ground Floor (No Stair Surcharge)",
    stairWalkup: "Multi-Flight Stairs Walkup (+ $35/hr)",
    stairCourtyard: "Long Courtyard Walkway Route (+ $40/hr)",

    packingKitLabel: "Material Packing Prep Kit (+ $45)",
    packingKitDesc: "Includes 15 heavy-duty boxes, tape, stretch wrap & wardrobe boxes",

    laborOnlyLabel: "Labor Only Service (Customer Handles Vehicle)",
    heavyItemsLabel: "Heavy Specialty Item Surcharge (Piano, Safe, Marble Table >300 lbs) (+ $150)",

    step2Title: "2. Schedule & Contact Reservation",
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "e.g., Alex Johnson",
    emailLabel: "Email Address",
    emailPlaceholder: "alex@example.com",
    phoneLabel: "Phone Number",
    phonePlaceholder: "(312) 555-0199",
    movingDateLabel: "Requested Moving Date",
    timeSlotLabel: "Preferred Arrival Window",
    morningSlot: "Morning Arrival (8:00 AM - 10:00 AM)",
    afternoonSlot: "Afternoon Arrival (1:00 PM - 3:00 PM)",
    specialNotesLabel: "Special Crew Notes / Building Instructions",
    specialNotesPlaceholder: "e.g., Building requires elevator reservation, key at front desk...",

    bookButton: "Lock In My Instant Quote & Reserve Movers",
    submitting: "Registering Reservation...",

    // Live Price Breakdown Card
    guaranteedQuoteTitle: "Guaranteed Live Moving Quote",
    baseRate: "Base Crew & Truck Rate",
    estimatedDistance: "Estimated Distance",
    heavyFee: "Heavy Specialty Item Surcharge",
    stairFee: "Stair / Walkway Surcharge",
    packingFee: "Packing Material Kit",
    laborDiscount: "Labor Only Discount",
    totalGuaranteed: "Total Guaranteed Binding Quote",
    depositNotice: "$100 Security Deposit Required on Cash App to confirm driver dispatch.",
    cancelFeeNotice: "In case you cancel your move, the $100 security deposit will be kept as a cancellation fee.",
    priceLockBadge: "Guaranteed Price Lock",

    // Map & Route Visualizer
    routeVisualizerTitle: "Interactive Route Map & Distance Visualizer",
    chicagoMapTitle: "Full City of Chicago Interactive Coverage Map",
    wholeChicagoCoverage: "We Cover 100% of the Entire City of Chicago & Cook County (All 77 Neighborhoods)",
    distanceMiles: "Distance between ZIPs",
    noTravelFeePromotion: "$0 Local Travel Promotion Applied!",

    // Confirmation Receipt Modal / Success Box
    successTitle: "Move Reservation Confirmed!",
    reservationId: "Reservation ID",
    depositHeader: "Cash App Deposit Instructions",
    depositBody: "Please send your $100 security deposit via Cash App to $Movers312 with your Reservation ID in the memo to finalize driver assignment.",
    printReceipt: "Print / Save Confirmation Receipt",
    calculateAnother: "Calculate Another Quote",

    // Interactive Checklist
    checklistTitle: "Your Chicago Moving Timeline Checklist",
    checklistSubtitle: "Stay organized step-by-step for a stress-free relocation.",
    task1: "Step 1: Declutter rooms & donate/sell unneeded items",
    task2: "Step 2: Pack fragile glassware carefully (Or select our Material Prep Kit!)",
    task3: "Step 3: Clear paths, reserve elevator access, or pre-arrange alley parking routes",
    task4: "Step 4: Lock in crew dispatch by sending the required $100 security deposit on Cash App",
    task5: "Step 5: Bundle essential records, laptop, medicines, and keys in your personal backpack",

    // FAQ Section
    faqTitle: "Frequently Asked Questions",
    q1: "Are there hidden fees for stairs or long walks?",
    a1: "No! Everything is calculated transparently in your instant quote based on your stair and walkway selections.",
    q2: "How does the $100 deposit work?",
    a2: "Your $100 deposit locks in your assigned crew and truck for your chosen date and time slot, payable via Cash App. Please note: in case of cancellation, the $100 security deposit will be kept as a cancellation fee.",
    q3: "Do you supply building Certificates of Insurance (COI)?",
    a3: "Yes! We provide complimentary COIs for high-rise elevator buildings across Chicago and Cook County.",
    q4: "What languages does your crew speak?",
    a4: "Our dispatch team and movers speak English, Spanish, Lithuanian, and Russian to ensure smooth communication.",

    // Search History / Archived Quotes
    historyTitle: "Search Archived Quotes & Reservations",
    searchPlaceholder: "Search by ID, name, email or ZIP...",
    noBookingsFound: "No archived quotes found.",
    viewReceipt: "View Receipt",

    // Footer
    footerDesc: "Chicago's premier licensed relocation experts serving Cook County with transparent binding pricing.",
    footerLanguages: "Multilingual Support: English • Español • Lietuvių • Русский",
    rightsReserved: "All rights reserved. Illinois ICC Dispatch #3280B.",
    aboutUs: "About Us",
    privacyPolicy: "Privacy Policy",
    disclaimer: "Disclaimer",
    aiChatPolicy: "AI Chat Support Policy",
    companyLegal: "Company & Legal",

    // AI Chat Component
    aiSupportTitle: "AI Chat Support!",
    aiSupportSubtitle: "Matt's Dispatch Assistant • 24/7",
    aiGreeting: "👋 Hi there! I'm Matt's AI Dispatch Assistant. Have questions about moving across Chicago, building regulations, or getting an instant binding quote? Ask me anything in English, Spanish, Lithuanian, or Russian!",
    aiInputPlaceholder: "Ask about rates, packing, stairs...",
    instantQuoteBar: "Instant Cook County Quotes",
    aiTyping: "Matt's AI is typing...",
  },

  es: {
    // Top Bar & Header
    iccLicense: "DESPACHO ICC DE ILLINOIS #3280B",
    liveDispatch: "Despacho de Conductores en Vivo",
    companyTitle: "MOVERS",
    tagline: "Compañía de Mudanzas en Chicago",
    callNow: "Llamar al (312) 385-9229",
    languageSelect: "Idioma",

    // Hero Section
    heroBadge: "EXPERTOS #1 EN MUDANZAS LOCALES DE CHICAGO",
    heroTitle: "Cotizaciones Instantáneas y Garantizadas de Mudanza en Chicago",
    heroSubtitle: "Sin tarifas ocultas por escaleras, precios transparentes, mudanceros locales de Cook County y cotizaciones 100% vinculantes configuradas en vivo en Inglés, Español, Lituano y Ruso.",
    feature1: "Licencia ICC y Seguro",
    feature2: "Promoción de $0 Costo de Viaje Local",
    feature3: "Cotización Vinculante en Línea",
    feature4: "Equipo Multilingüe (EN/ES/LT/RU)",

    // Form Steps & Estimator
    step1Title: "1. Especificaciones de Mudanza y Distancia",
    sizeOfMoveLabel: "Tamaño de la Residencia / Alcance",
    sizeStudio: "Estudio",
    size1bed: "Apartamento de 1 Habitación",
    size2bed: "Residencia de 2 Habitaciones",
    size3bed: "Casa / Propiedad de 3+ Habitaciones",

    startZipLabel: "Código Postal de Origen (Chicago)",
    endZipLabel: "Código Postal de Destino (Chicago)",
    estHoursLabel: "Horas Estimadas Necesarias",
    estHoursHelp: "Mínimo 2 horas, estándar 3-4 horas para 1-2 habitaciones",

    crewTruckLabel: "Equipo y Camión",
    crew2: "2 Mudanceros y Camión de 16 pies ($120/hora)",
    crew3: "3 Mudanceros y Camión de 26 pies ($180/hora)",
    crew4: "4 Mudanceros y Camión de 26 pies ($230/hora)",

    stairAccessLabel: "Desafío de Escaleras y Acceso",
    stairNone: "Ascensor / Planta Baja (Sin Recargo)",
    stairWalkup: "Escaleras sin Ascensor (+ $35/hora)",
    stairCourtyard: "Pasillo o Patio Largo (+ $40/hora)",

    packingKitLabel: "Kit de Materiales de Embalaje (+ $45)",
    packingKitDesc: "Incluye 15 cajas resistentes, cinta, plástico de embalaje y cajas para ropa",

    laborOnlyLabel: "Solo Mano de Obra (El cliente provee vehículo)",
    heavyItemsLabel: "Recargo por Artículos Pesados Especiales (Piano, Caja Fuerte, Mesa de Mármol >300 lbs) (+ $150)",

    step2Title: "2. Programación y Reserva de Contacto",
    fullNameLabel: "Nombre Completo",
    fullNamePlaceholder: "ej. Carlos Rodríguez",
    emailLabel: "Correo Electrónico",
    emailPlaceholder: "carlos@ejemplo.com",
    phoneLabel: "Número de Teléfono",
    phonePlaceholder: "(312) 555-0199",
    movingDateLabel: "Fecha Solicitada de Mudanza",
    timeSlotLabel: "Ventana de Llegada Preferida",
    morningSlot: "Llegada en la Mañana (8:00 AM - 10:00 AM)",
    afternoonSlot: "Llegada en la Tarde (1:00 PM - 3:00 PM)",
    specialNotesLabel: "Notas Especiales para el Equipo / Instrucciones",
    specialNotesPlaceholder: "ej. El edificio requiere reserva de ascensor, llave en recepción...",

    bookButton: "Asegurar Mi Cotización Instantánea y Reservar",
    submitting: "Registrando Reserva...",

    // Live Price Breakdown Card
    guaranteedQuoteTitle: "Cotización de Mudanza Garantizada",
    baseRate: "Tarifa Base de Equipo y Camión",
    estimatedDistance: "Distancia Estimada",
    heavyFee: "Recargo por Artículos Pesados",
    stairFee: "Recargo por Escaleras / Pasillo",
    packingFee: "Kit de Materiales de Embalaje",
    laborDiscount: "Descuento Solo Mano de Obra",
    totalGuaranteed: "Cotización Total Garantizada y Vinculante",
    depositNotice: "Se requiere un depósito de seguridad de $100 en Cash App para confirmar el despacho.",
    cancelFeeNotice: "En caso de cancelar su mudanza, el depósito de seguridad de $100 se retendrá como cargo por cancelación.",
    priceLockBadge: "Precio Bloqueado y Garantizado",

    // Map & Route Visualizer
    routeVisualizerTitle: "Mapa de Ruta Interactivo y Visualizador de Distancia",
    chicagoMapTitle: "Mapa Interactivo de Cobertura de Toda la Ciudad de Chicago",
    wholeChicagoCoverage: "Cubrimos el 100% de Toda la Ciudad de Chicago y el Condado de Cook (Los 77 Vecindarios)",
    distanceMiles: "Distancia entre Códigos Postales",
    noTravelFeePromotion: "¡Promoción de $0 Costo de Viaje Local Aplicada!",

    // Confirmation Receipt Modal / Success Box
    successTitle: "¡Reserva de Mudanza Confirmada!",
    reservationId: "ID de Reserva",
    depositHeader: "Instrucciones de Depósito en Cash App",
    depositBody: "Por favor envíe su depósito de seguridad de $100 vía Cash App a $Movers312 con su ID de Reserva en la nota para finalizar la asignación del equipo.",
    printReceipt: "Imprimir / Guardar Recibo de Confirmación",
    calculateAnother: "Calcular Otra Cotización",

    // Interactive Checklist
    checklistTitle: "Lista de Verificación para su Mudanza en Chicago",
    checklistSubtitle: "Manténgase organizado paso a paso para una mudanza sin estrés.",
    task1: "Paso 1: Depurar habitaciones y donar/vender cosas innecesarias",
    task2: "Paso 2: Empacar la cristalería frágil con cuidado (¡O elija nuestro Kit de Materiales!)",
    task3: "Paso 3: Despejar pasillos, reservar ascensor o preparar el estacionamiento",
    task4: "Paso 4: Asegurar la reserva enviando el depósito de $100 por Cash App",
    task5: "Paso 5: Agrupar documentos importantes, laptop, medicinas y llaves en su mochila personal",

    // FAQ Section
    faqTitle: "Preguntas Frecuentes",
    q1: "¿Hay cargos ocultos por escaleras o caminatas largas?",
    a1: "¡No! Todo se calcula de manera transparente en su cotización instantánea según sus selecciones.",
    q2: "¿Cómo funciona el depósito de $100?",
    a2: "Su depósito de $100 asegura el equipo y camión asignados para la fecha y hora elegidas, pagadero vía Cash App. Tenga en cuenta: en caso de cancelación, el depósito de seguridad de $100 se retendrá como cargo por cancelación.",
    q3: "¿Proporcionan Certificado de Seguro (COI) para edificios?",
    a3: "¡Sí! Proporcionamos COIs de cortesía para edificios con ascensor en todo Chicago y el condado de Cook.",
    q4: "¿Qué idiomas habla el personal?",
    a4: "Nuestro equipo de despacho y cargadores habla Inglés, Español, Lituano y Ruso para garantizar una comunicación fluida.",

    // Search History / Archived Quotes
    historyTitle: "Buscar Cotizaciones y Reservas Archivadas",
    searchPlaceholder: "Buscar por ID, nombre, correo o código postal...",
    noBookingsFound: "No se encontraron cotizaciones archivadas.",
    viewReceipt: "Ver Recibo",

    // Footer
    footerDesc: "Expertos con licencia en mudanzas en Chicago sirviendo a Cook County con precios vinculantes transparentes.",
    footerLanguages: "Soporte Multilingüe: English • Español • Lietuvių • Русский",
    rightsReserved: "Todos los derechos reservados. Licencia ICC de Illinois #3280B.",
    aboutUs: "Sobre Nosotros",
    privacyPolicy: "Política de Privacidad",
    disclaimer: "Descargo de Responsabilidad",
    aiChatPolicy: "Política del Chat de Asistencia IA",
    companyLegal: "Empresa y Legal",

    // AI Chat Component
    aiSupportTitle: "¡Soporte de Chat IA!",
    aiSupportSubtitle: "Asistente de Despacho de Matt • 24/7",
    aiGreeting: "👋 ¡Hola! Soy el asistente de despacho con IA de Matt. ¿Tienes preguntas sobre mudarte en Chicago, regulaciones de edificios o cómo obtener una cotización vinculante instantánea? ¡Pregúntame en español, inglés, lituano o ruso!",
    aiInputPlaceholder: "Pregunta sobre tarifas, embalaje, escaleras...",
    instantQuoteBar: "Cotizaciones Instantáneas en Cook County",
    aiTyping: "La IA de Matt está escribiendo...",
  },

  lt: {
    // Top Bar & Header
    iccLicense: "ILINOJAUS ICC DISPEČERINĖ #3280B",
    liveDispatch: "Tiesioginis Vairuotojų Dispečeris",
    companyTitle: "MOVERS",
    tagline: "Čikagos Perkraustymo Įmonė",
    callNow: "Skambinti (312) 385-9229",
    languageSelect: "Kalba",

    // Hero Section
    heroBadge: "#1 VIETINIAI PERKRAUSTYMO EKSPERTAI ČIKAGOJE",
    heroTitle: "Momentinės ir Garantuotos Čikagos Perkraustymo Kainos",
    heroSubtitle: "Jokių paslėptų mokesčių už laiptus, skaidrūs įkainiai, vietiniai Cook County kraustytojai ir 100% privalomos kainos anglų, ispanų, lietuvių bei rusų kalbomis.",
    feature1: "ICC Licencijuota ir Apdrausta",
    feature2: "$0 Vietinio Važiavimo Akcija",
    feature3: "Momentinė Privaloma Kaina Interne",
    feature4: "Daugiakalbė Komanda (EN/ES/LT/RU)",

    // Form Steps & Estimator
    step1Title: "1. Perkraustymo Specifikacijos ir Atstumas",
    sizeOfMoveLabel: "Būsto Dydis / Apimtis",
    sizeStudio: "Studijos Tipo Būstas",
    size1bed: "1 Miegamojo Bute",
    size2bed: "2 Miegamųjų Bute",
    size3bed: "3+ Miegamųjų Būstas / Namas",

    startZipLabel: "Pradžios Čikagos Pašto Kodas",
    endZipLabel: "Paskirties Čikagos Pašto Kodas",
    estHoursLabel: "Numatomas Valandų Skaičius",
    estHoursHelp: "Minimalus laikas 2 val., standartinis 3-4 val. 1-2 miegamiesiems",

    crewTruckLabel: "Darbuotojai ir Sunkvežimis",
    crew2: "2 Kraustytojai ir 16 Pėdų Sunkvežimis ($120/val.)",
    crew3: "3 Kraustytojai ir 26 Pėdų Sunkvežimis ($180/val.)",
    crew4: "4 Kraustytojai ir 26 Pėdų Sunkvežimis ($230/val.)",

    stairAccessLabel: "Laiptai ir Priėjimo Sąlygos",
    stairNone: "Liftas / Pirmas Aukštas (Bez Papildomo Mokesčio)",
    stairWalkup: "Laiptai Be Lifto (+ $35/val.)",
    stairCourtyard: "Ilgas Kiemas / Pasivaikščiojimo Takas (+ $40/val.)",

    packingKitLabel: "Pakavimo Medžiagų Rinkinys (+ $45)",
    packingKitDesc: "Įeina 15 tvirtų dėžių, juosta, plėvelė ir dėžės drabužiams",

    laborOnlyLabel: "Tik Kraustytojų Darbas (Klientas Parūpina Transportą)",
    heavyItemsLabel: "Sunkių Dažtų Papildomas Mokestis (Fortepijonas, Seifas, Marble Stalas >300 lbs) (+ $150)",

    step2Title: "2. Laiko ir Kontakto Rezervacija",
    fullNameLabel: "Vardas ir Pavardė",
    fullNamePlaceholder: "pvz., Mantas Petrauskas",
    emailLabel: "El. Pašto Adresas",
    emailPlaceholder: "mantas@pavyzdys.lt",
    phoneLabel: "Telefono Numeris",
    phonePlaceholder: "(312) 555-0199",
    movingDateLabel: "Pageidaujama Perkraustymo Data",
    timeSlotLabel: "Pageidaujamas Atvykimo Laikas",
    morningSlot: "Rytinis Atvykimas (8:00 - 10:00)",
    afternoonSlot: "Popietinis Atvykimas (13:00 - 15:00)",
    specialNotesLabel: "Specialios Pastabos Komandai / Pastato Taisyklės",
    specialNotesPlaceholder: "pvz., Pastate reikalinga lifto rezervacija, raktai pas budėtoją...",

    bookButton: "Užtvirtinti Kaintą ir Rezervuoti Kraustytojus",
    submitting: "Registruojama Rezervacija...",

    // Live Price Breakdown Card
    guaranteedQuoteTitle: "Garantuota Perkraustymo Kaina",
    baseRate: "Bazinė Komandos ir Sunkvežimio Kaina",
    estimatedDistance: "Numatomas Atstumas",
    heavyFee: "Sunkių Daiktų Mokestis",
    stairFee: "Laiptų / Kiemo Mokestis",
    packingFee: "Pakavimo Medžiagų Rinkinys",
    laborDiscount: "Tik Darbo Nuolaida",
    totalGuaranteed: "Galutinė Garantuota Privaloma Kaina",
    depositNotice: "Reikalingas $100 depozitas per Cash App vairuotojo priskyrimui patvirtinti.",
    cancelFeeNotice: "Jeigu atšauksite pervežimą, $100 saugumo depozitas bus pasiliekamas kaip atšaukimo mokestis.",
    priceLockBadge: "Garantuota Užfiksuota Kaina",

    // Map & Route Visualizer
    routeVisualizerTitle: "Interaktyvus Maršruto Žemėlapis ir Atstumas",
    chicagoMapTitle: "Visos Čikagos Miesto Interaktyvus Žemėlapis",
    wholeChicagoCoverage: "Aptarnaujame 100% Visą Čikagos Miestą ir Kuko Apskritį (Visus 77 Rajonus)",
    distanceMiles: "Atstumas Tarp Pašto Kodų",
    noTravelFeePromotion: "Pritaikyta $0 Vietinio Važiavimo Akcija!",

    // Confirmation Receipt Modal / Success Box
    successTitle: "Perkraustymo Rezervacija Patvirtinta!",
    reservationId: "Rezervacijos ID",
    depositHeader: "Cash App Depozito Instrukcijos",
    depositBody: "Prašome atsiųsti $100 saugumo depozitą per Cash App adresu $Movers312, nurodant savo Rezervacijos ID pastabose.",
    printReceipt: "Spausdinti / Išsaugoti Patvirtinimą",
    calculateAnother: "Skaičiuoti Kitą Kainą",

    // Interactive Checklist
    checklistTitle: "Jūsų Čikagos Perkraustymo Darbų Sąrašas",
    checklistSubtitle: "Suplanuokite perkraustymą žingsnis po žingsnio be streso.",
    task1: "1 Žingsnis: Sutvarkykite kambarius, atiduokite arba parduokite nereikalingus daiktus",
    task2: "2 Žingsnis: Kruopščiai supakuokite trapius daiktus (Arba pasirinkite mūsų pakavimo rinkinį!)",
    task3: "3 Žingsnis: Atlaisvinkite praėjimus, rezervuokite liftą ar parkavimą",
    task4: "4 Žingsnis: Užtvirtinkite laiko rezervaciją pervesdami $100 depozitą per Cash App",
    task5: "5 Žingsnis: Svarbius dokumentus, nešiojamąjį kompiuterį, vaistus ir raktus susidėkite į kuprinę",

    // FAQ Section
    faqTitle: "Dažnai Užduodami Klausimai",
    q1: "Ar yra paslėptų mokesčių už laiptus ar ilgą nešimą?",
    a1: "Ne! Viskas skaidriai apskaičiuojama momentinėje kalkuliacijoje pagal jūsų pasirinkimus.",
    q2: "Kaip veikia $100 depozitas?",
    a2: "Jūsų $100 depozitas užtvirtina jums priskirtą komandą ir sunkvežimį pasirinktai dienai bei laikui. Pastaba: atšaukimo atveju $100 saugumo depozitas lieka kaip atšaukimo mokestis.",
    q3: "Ar pateikiate pastatams draudimo sertifikatą (COI)?",
    a3: "Taip! Nemokamai išduodame COI sertifikatus daugiaaukščiams pastatams visoje Čikagoje.",
    q4: "Kokiomis kalbomis kalba kraustytojai?",
    a4: "Mūsų dispečeriai ir kraustytojai kalba angliškai, ispaniškai, lietuviškai ir rusiškai.",

    // Search History / Archived Quotes
    historyTitle: "Išsaugotų Rezervacijų Paieška",
    searchPlaceholder: "Ieškoti pagal ID, vardą, el. paštą arba pašto kodą...",
    noBookingsFound: "Išsaugotų rezervacijų nerasta.",
    viewReceipt: "Rodyti Kvitą",

    // Footer
    footerDesc: "Licencijuoti Čikagos perkraustymo ekspertai Cook County su skaidriomis garantuotomis kainomis.",
    footerLanguages: "Daugiakalbis Aptarnavimas: English • Español • Lietuvių • Русский",
    rightsReserved: "Visos teisės saugomos. Ilinojaus ICC licencija #3280B.",
    aboutUs: "Apie Mus",
    privacyPolicy: "Privatumo Politika",
    disclaimer: "Atsakomybės Ribojimas",
    aiChatPolicy: "DI Pokalbių Palaikymo Politika",
    companyLegal: "Įmonė ir Teisinė Informacija",

    // AI Chat Component
    aiSupportTitle: "DI Pokalbių Pagalba!",
    aiSupportSubtitle: "Mato Dispečerio Padėjėjas • 24/7",
    aiGreeting: "👋 Sveiki! Aš esu Mato dirbtinio intelekto dispečerio padėjėjas. Turite klausimų apie perkraustymą Čikagoje, taisykles ar kainas? Paklauskite bet ko lietuviškai, angliškai, ispaniškai ar rusiškai!",
    aiInputPlaceholder: "Klauskite apie įkainius, pakavimą, laiptus...",
    instantQuoteBar: "Momentinės Cook County Kainos",
    aiTyping: "Mato İI rašo žinutę...",
  },

  ru: {
    // Top Bar & Header
    iccLicense: "ДИСПЕТЧЕРСКАЯ ICC ИЛЛИНОЙСА #3280B",
    liveDispatch: "Прямая Диспетчерская Водителей",
    companyTitle: "MOVERS",
    tagline: "Мувинговая Компания в Чикаго",
    callNow: "Звоните (312) 385-9229",
    languageSelect: "Язык",

    // Hero Section
    heroBadge: "ЭКСПЕРТЫ #1 ПО ЛОКАЛЬНЫМ ПЕРЕЕЗДАМ В ЧИКАГО",
    heroTitle: "Мгновенный и Гарантированный Расчет Переезда в Чикаго",
    heroSubtitle: "Без скрытых платежей за этажи, прозрачные тарифы, местная команда Cook County и 100% фиксированные цены на английском, испанском, литовском и русском языках.",
    feature1: "Лицензия ICC и Страховка",
    feature2: "Акция $0 за Локальный Проезд",
    feature3: "Мгновенная Фиксированная Цена",
    feature4: "Многоязычная Команда (EN/ES/LT/RU)",

    // Form Steps & Estimator
    step1Title: "1. Параметры Переезда и Расстояние",
    sizeOfMoveLabel: "Размер Жилья / Объем",
    sizeStudio: "Студия",
    size1bed: "1-Комнатная Квартира",
    size2bed: "2-Комнатная Квартира",
    size3bed: "3+ Комнатная Квартира / Дом",

    startZipLabel: "Начальный Почтовый Индекс (Чикаго)",
    endZipLabel: "Конечный Почтовый Индекс (Чикаго)",
    estHoursLabel: "Ориентировочное Время (Часов)",
    estHoursHelp: "Минимум 2 часа, стандартно 3-4 часа для 1-2 комнат",

    crewTruckLabel: "Состав Команды и Грузовик",
    crew2: "2 Грузчика и 16-Футбовый Грузовик ($120/час)",
    crew3: "3 Грузчика и 26-Футбовый Грузовик ($180/час)",
    crew4: "4 Грузчика и 26-Футбовый Грузовик ($230/час)",

    stairAccessLabel: "Подъем по Лестнице и Доступ",
    stairNone: "Лифт / Первый Этаж (Без Доплаты)",
    stairWalkup: "Лестница Без Лифта (+ $35/час)",
    stairCourtyard: "Длинный Двор / Длинный Проход (+ $40/час)",

    packingKitLabel: "Комплект Упаковочных Материалов (+ $45)",
    packingKitDesc: "Включает 15 прочных коробок, скотч, стретч-пленку и коробки для одежды",

    laborOnlyLabel: "Только Услуги Грузчиков (Транспорт Заказчика)",
    heavyItemsLabel: "Доплата за Тяжелые Предметы (Пианино, Сейф, Мраморный Стол >300 фунтов) (+ $150)",

    step2Title: "2. Расписание и Контактные Данные",
    fullNameLabel: "Полное Имя",
    fullNamePlaceholder: "напр., Михаил Иванов",
    emailLabel: "Электронная Почта",
    emailPlaceholder: "mikhail@example.com",
    phoneLabel: "Номер Телефона",
    phonePlaceholder: "(312) 555-0199",
    movingDateLabel: "Желаемая Дата Переезда",
    timeSlotLabel: "Предпочтительное Время Прибытия",
    morningSlot: "Утренний Приезд (8:00 - 10:00)",
    afternoonSlot: "Дневной Приезд (13:00 - 15:00)",
    specialNotesLabel: "Особые Пожелания / Инструкции для Бригады",
    specialNotesPlaceholder: "напр., Требуется бронь лифта в здании, ключи у консьержа...",

    bookButton: "Зафиксировать Цену и Забронировать",
    submitting: "Регистрация Бронирования...",

    // Live Price Breakdown Card
    guaranteedQuoteTitle: "Гарантированный Расчет Переезда",
    baseRate: "Базовый Тариф Команды и Грузовика",
    estimatedDistance: "Ориентировочное Расстояние",
    heavyFee: "Доплата за Тяжелые Предметы",
    stairFee: "Доплата за Лестницу / Проход",
    packingFee: "Комплект Упаковочных Материалов",
    laborDiscount: "Скидка Без Нашего Грузовика",
    totalGuaranteed: "Итоговая Фиксированная Стоимость",
    depositNotice: "Требуется депозит $100 через Cash App для подтверждения назначения бригады.",
    cancelFeeNotice: "В случае отмены вашего переезда залог в размере $100 удерживается в качестве штрафа за отмену.",
    priceLockBadge: "Гарантированная Фиксация Цены",

    // Map & Route Visualizer
    routeVisualizerTitle: "Интерактивная Карта Маршрута и Расстояние",
    chicagoMapTitle: "Интерактивная Карта Покрытия Всего Города Чикаго",
    wholeChicagoCoverage: "Мы Покрываем 100% Территории Города Чикаго и Округа Кук (Все 77 Районов)",
    distanceMiles: "Расстояние Между Индексами",
    noTravelFeePromotion: "Применена Акция $0 за Локальный Проезд!",

    // Confirmation Receipt Modal / Success Box
    successTitle: "Бронирование Переезда Подтверждено!",
    reservationId: "ID Бронирования",
    depositHeader: "Инструкция по Депозиту в Cash App",
    depositBody: "Пожалуйста, отправьте залог $100 через Cash App на $Movers312, указав ваш ID Бронирования в примечании для финализации выезда.",
    printReceipt: "Распечатать / Сохранить Квитанцию",
    calculateAnother: "Рассчитать Другой Переезд",

    // Interactive Checklist
    checklistTitle: "Ваш Чек-лист Подготовки к Переезду",
    checklistSubtitle: "Пошаговый план для спокойного и организованного переезда.",
    task1: "Шаг 1: Разберите вещи в комнатах, отдайте или продайте ненужное",
    task2: "Шаг 2: Надежно упакуйте хрупкую посуду (Или закажите наш упаковочный набор!)",
    task3: "Шаг 3: Освободите проходы, забронируйте лифт или парковку",
    task4: "Шаг 4: Подтвердите выезд бригады, отправив депозит $100 через Cash App",
    task5: "Шаг 5: Сложите важные документы, ноутбук, лекарства и ключи в личный рюкзак",

    // FAQ Section
    faqTitle: "Часто Задаваемые Вопросы",
    q1: "Есть ли скрытые платежи за этажи или длинные проходы?",
    a1: "Нет! Все прозрачно рассчитывается в вашем онлайн-расчете на основе выбранных параметров.",
    q2: "Как работает залог $100?",
    a2: "Ваш залог $100 закрепляет за вами бригаду и грузовик на выбранную дату и время через Cash App. Обратите внимание: в случае отмены бронирования залог в размере $100 удерживается в качестве штрафа за отмену.",
    q3: "Предоставляете ли вы Сертификат Страхования (COI) для зданий?",
    a3: "Да! Мы бесплатно предоставляем COI для высотных зданий с лифтом по всему Чикаго.",
    q4: "На каких языках говорит персонал?",
    a4: "Наша диспетчерская служба и грузчики говорят на английском, испанском, литовском и русском языках.",

    // Search History / Archived Quotes
    historyTitle: "Поиск Архива Расчетов и Бронирований",
    searchPlaceholder: "Поиск по ID, имени, email или индексу...",
    noBookingsFound: "Архивных расчетов не найдено.",
    viewReceipt: "Посмотреть Квитанцию",

    // Footer
    footerDesc: "Лицензированные эксперты по переездам в Чикаго и Cook County с прозрачной фиксированной стоимостью.",
    footerLanguages: "Многоязычная Поддержка: English • Español • Lietuvių • Русский",
    rightsReserved: "Все права защищены. Лицензия ICC Иллинойса #3280B.",
    aboutUs: "О Нас",
    privacyPolicy: "Политика Конфиденциальности",
    disclaimer: "Отказ от Ответственности",
    aiChatPolicy: "Политика ИИ-Чат Поддержки",
    companyLegal: "Компания и Законодательство",

    // AI Chat Component
    aiSupportTitle: "Чат-поддержка ИИ!",
    aiSupportSubtitle: "Ассистент Диспетчера Мэтта • 24/7",
    aiGreeting: "👋 Здравствуйте! Я ИИ-ассистент диспетчера Мэтта. Есть вопросы о переезде в Чикаго, правилах зданий или расчете стоимости? Спрашивайте на русском, английском, испанском или литовском!",
    aiInputPlaceholder: "Спросите о тарифах, упаковке, этажах...",
    instantQuoteBar: "Мгновенные Расчеты в Cook County",
    aiTyping: "ИИ Мэтта печатает...",
  },

  ja: {
    // Top Bar & Header
    iccLicense: "イリノイ州 ICC ディスパッチ #3280B",
    liveDispatch: "ライブ配車センター",
    companyTitle: "MOVERS",
    tagline: "シカゴ引越し専門会社",
    callNow: "電話 (312) 385-9229",
    languageSelect: "言語",

    // Hero Section
    heroBadge: "シカゴ地域No.1 ローカル引越しエキスパート",
    heroTitle: "シカゴ引越しの即時保証お見積もり",
    heroSubtitle: "階段の隠れ追加料金なし、透明性の高い料金体系。クック郡のプロスタッフが対応し、日本語・英語・スペイン語・リトアニア語・ロシア語・アラビア語で即時確定見積もりを提供します。",
    feature1: "ICCライセンス＆保険完備",
    feature2: "$0 ローカル出張費キャンペーン",
    feature3: "オンライン即時確定見積もり",
    feature4: "多言語対応スタッフ（日・英・西・リトアニア・露・アラビア語）",

    // Form Steps & Estimator
    step1Title: "1. 引越しの詳細と移動距離",
    sizeOfMoveLabel: "お部屋のサイズ・規模",
    sizeStudio: "ワンルーム / スタジオ",
    size1bed: "1ベッドルーム",
    size2bed: "2ベッドルーム",
    size3bed: "3ベッドルーム以上",

    startZipLabel: "出発地 郵便番号（シカゴ）",
    endZipLabel: "目的地 郵便番号（シカゴ）",
    estHoursLabel: "想定作業時間",
    estHoursHelp: "最低2時間〜、1〜2部屋の標準作業時間は3〜4時間",

    crewTruckLabel: "作業員＆トラック構成",
    crew2: "作業員2名 ＆ 16フィートトラック ($120/時間)",
    crew3: "作業員3名 ＆ 26フィートトラック ($180/時間)",
    crew4: "作業員4名 ＆ 26フィートトラック ($230/時間)",

    stairAccessLabel: "階段・アクセスの条件",
    stairNone: "エレベーターあり / 1階（階段割増なし）",
    stairWalkup: "階段での荷揚げ・荷降ろし (+ $35/時間)",
    stairCourtyard: "長い中庭・通路の移動距離 (+ $40/時間)",

    packingKitLabel: "梱包資材キット (+ $45)",
    packingKitDesc: "強化ダンボール15箱、テープ、ストレッチフィルム、ハンガーボックス付き",

    laborOnlyLabel: "作業員のみ手配（トラックはお客様準備）",
    heavyItemsLabel: "重量物追加料金（ピアノ、金庫、135kg以上の大理石テーブルなど）(+ $150)",

    step2Title: "2. 日時選択とご連絡先のご予約",
    fullNameLabel: "お名前",
    fullNamePlaceholder: "例: 山田 太郎",
    emailLabel: "メールアドレス",
    emailPlaceholder: "yamada@example.com",
    phoneLabel: "電話番号",
    phonePlaceholder: "(312) 555-0199",
    movingDateLabel: "ご希望の引越し日",
    timeSlotLabel: "到着ご希望時間帯",
    morningSlot: "午前便 (8:00 AM - 10:00 AM)",
    afternoonSlot: "午後便 (1:00 PM - 3:00 PM)",
    specialNotesLabel: "特記事項・建物の連絡事項",
    specialNotesPlaceholder: "例: 建物でエレベーターの予約が必要、鍵はフロントにて受取り...",

    bookButton: "即時見積もりを確定して予約する",
    submitting: "予約を登録中...",

    // Live Price Breakdown Card
    guaranteedQuoteTitle: "保証付き即時お見積もり",
    baseRate: "基本料金（作業員＆トラック）",
    estimatedDistance: "推定移動距離",
    heavyFee: "重量物追加料金",
    stairFee: "階段・通路追加料金",
    packingFee: "梱包資材キット",
    laborDiscount: "作業員のみ割引",
    totalGuaranteed: "確定保証お見積もり合計",
    depositNotice: "配車確定のため、Cash Appにて$100の予約金（デポジット）が必要です。",
    cancelFeeNotice: "お引越しをキャンセルされる場合、この$100の予約金（デポジット）はキャンセル料として保持されます。",
    priceLockBadge: "価格保証済み",

    // Map & Route Visualizer
    routeVisualizerTitle: "インタラクティブなルートマップと距離計算",
    chicagoMapTitle: "シカゴ市全域インタラクティブ対応エリアマップ",
    wholeChicagoCoverage: "シカゴ市100%全域・全77地域＆クック郡を完全カバー",
    distanceMiles: "郵便番号間の移動距離",
    noTravelFeePromotion: "$0 ローカル出張費キャンペーン適用中！",

    // Confirmation Receipt Modal / Success Box
    successTitle: "引越しのご予約が完了しました！",
    reservationId: "予約ID",
    depositHeader: "Cash App デポジット送金手順",
    depositBody: "ドライバーの配置を確定するため、Cash Appで $100 を $Movers312 宛に送金し、メモ欄に予約IDをご記入ください。",
    printReceipt: "予約確認書を印刷 / 保存",
    calculateAnother: "新しいお見積もりを計算",

    // Interactive Checklist
    checklistTitle: "シカゴ引越しステップ別チェックリスト",
    checklistSubtitle: "ストレスのないお引越しのために、順番に準備を進めましょう。",
    task1: "ステップ 1: 部屋の整理と不要な物品の処分・寄付",
    task2: "ステップ 2: 割れ物の丁寧な梱包（資材キットのご利用もおすすめ！）",
    task3: "ステップ 3: 通路の確保、エレベーターの事前予約、駐車場所の確認",
    task4: "ステップ 4: Cash Appで$100のデポジットを送金して配車を確定",
    task5: "ステップ 5: 貴重品、PC、薬、鍵類をリュック等にまとめて持参",

    // FAQ Section
    faqTitle: "よくあるご質問 (FAQ)",
    q1: "階段や長距離歩行の隠れた追加料金はありますか？",
    a1: "いいえ！選択された条件に基づいて即時見積もりですべて透明に計算されます。",
    q2: "$100のデポジットはどのように機能しますか？",
    a2: "$100のデポジットでお客様のご希望日時に作業員とトラックが確保されます。Cash Appで支払可能です。注意：キャンセルが発生した場合、この$100の予約金（デポジット）はキャンセル料として保持されます。",
    q3: "建物の保険証明書（COI）を発行してもらえますか？",
    a3: "はい！シカゴ市内の高層マンション等の要求に応じたCOIを無料発行いたします。",
    q4: "スタッフは何語に対応していますか？",
    a4: "英語、日本語、スペイン語、リトアニア語、ロシア語、アラビア語でスムーズなご案内が可能です。",

    // Search History / Archived Quotes
    historyTitle: "保存されたお見積もり・予約の検索",
    searchPlaceholder: "予約ID、お名前、メール、郵便番号で検索...",
    noBookingsFound: "保存されたお見積もりは見つかりませんでした。",
    viewReceipt: "確認書を表示",

    // Footer
    footerDesc: "シカゴ・クック郡全域に対応するライセンス取得済みで明朗会計な引越し専門会社。",
    footerLanguages: "多言語サポート: English • Español • Lietuvių • Русский • 日本語 • العربية",
    rightsReserved: "All rights reserved. イリノイ州 ICC ディスパッチ #3280B.",
    aboutUs: "会社概要 (About Us)",
    privacyPolicy: "プライバシーポリシー",
    disclaimer: "免責事項 (Disclaimer)",
    aiChatPolicy: "AIチャットサポート利用規約",
    companyLegal: "会社情報・法的表記",

    // AI Chat Component
    aiSupportTitle: "AI チャットサポート!",
    aiSupportSubtitle: "配車アシスタント マット • 24時間受付",
    aiGreeting: "👋 こんにちは！Movers312のAIアシスタントです。シカゴでの引越し、料金、建物ルールなど、何でも日本語・英語でお気軽にご質問ください！",
    aiInputPlaceholder: "料金、梱包、階段について質問する...",
    instantQuoteBar: "クック郡即時お見積もり",
    aiTyping: "AIが回答を作成中...",
  },

  ar: {
    // Top Bar & Header
    iccLicense: "ترخيص إلينوي ICC #3280B",
    liveDispatch: "مركز التوزيع المباشر",
    companyTitle: "MOVERS",
    tagline: "شركة نقل الأثاث في شيكاغو",
    callNow: "اتصل بنا (312) 385-9229",
    languageSelect: "اللغة",

    // Hero Section
    heroBadge: "الخبراء الأول في نقل الأثاث المحلي بشيكاغو",
    heroTitle: "عروض أسعار مضمونة وفورية لنقل الأثاث بشيكاغو",
    heroSubtitle: "بدون رسوم درج مخفية، أسعار شفافة، فريق نقل محلي في مقاطعة كوك، وعروض أسعار ملزمة 100٪ باللغات العربية والإنجليزية والفيليبينية والروسية والإسبانية.",
    feature1: "مرخص من ICC ومؤمن بالكامل",
    feature2: "عرض رسوم التنقل المحلي $0",
    feature3: "عرض سعر ملزم فوري عبر الإنترنت",
    feature4: "فريق متعدد اللغات (عربي / إنجليزي / إسباني / ليتواني / روسي / ياباني)",

    // Form Steps & Estimator
    step1Title: "1. تفاصيل النقل والمسافة",
    sizeOfMoveLabel: "حجم السكن / نطاق العمل",
    sizeStudio: "استوديو",
    size1bed: "شقة غرفة نوم واحدة",
    size2bed: "شقة غرفتي نوم",
    size3bed: "منزل 3+ غرف نوم",

    startZipLabel: "الرمز البريدي لنقطة الانطلاق (شيكاغو)",
    endZipLabel: "الرمز البريدي لنقطة الوصول (شيكاغو)",
    estHoursLabel: "الساعات المقدرة المطلوبة",
    estHoursHelp: "الحد الأدنى ساعتان، والمعدل القياسي 3-4 ساعات للغرفتين",

    crewTruckLabel: "تجهيز طاقم العمل والشاحنة",
    crew2: "عاملان وشاحنة 16 قدم (120$/ساعة)",
    crew3: "3 عمال وشاحنة 26 قدم (180$/ساعة)",
    crew4: "4 عمال وشاحنة 26 قدم (230$/ساعة)",

    stairAccessLabel: "السلالم وطبيعة الوصول",
    stairNone: "مصعد / طابق أرضي (بدون رسوم درج)",
    stairWalkup: "صعود سلالم متعددة (+ 35$/ساعة)",
    stairCourtyard: "مسار ساحة/ممر طويل (+ 40$/ساعة)",

    packingKitLabel: "حزمة أدوات التغليف (+ 45$)",
    packingKitDesc: "تتضمن 15 صندوقاً مقوى، أشرطة، بلاستيك تغليف، وصناديق ملابس",

    laborOnlyLabel: "خدمة عمالة فقط (العميل يوفر الشاحنة)",
    heavyItemsLabel: "رسوم إضافية للأغراض الثقيلة جداً (بيانو، خزانة حديدية، طاولة رخام > 135 كجم) (+ 150$)",

    step2Title: "2. الموعد وبيانات الحجز",
    fullNameLabel: "الاسم الكامل",
    fullNamePlaceholder: "مثال: أحمد محمد",
    emailLabel: "البريد الإلكتروني",
    emailPlaceholder: "ahmed@example.com",
    phoneLabel: "رقم الهاتف",
    phonePlaceholder: "(312) 555-0199",
    movingDateLabel: "تاريخ النقل المطلوب",
    timeSlotLabel: "فترة الوصول المفضلة",
    morningSlot: "الفترة الصباحية (8:00 صباحاً - 10:00 صباحاً)",
    afternoonSlot: "الفترة المسائية (1:00 ظهراً - 3:00 عصراً)",
    specialNotesLabel: "ملاحظات خاصة لطاقم العمل / تعليمات المبنى",
    specialNotesPlaceholder: "مثال: المبنى يتطلب حجز المصعد، المفتاح لدى الاستقبال...",

    bookButton: "تأكيد السعر المباشر وحجز الموعد",
    submitting: "جاري تسجيل الحجز...",

    // Live Price Breakdown Card
    guaranteedQuoteTitle: "عرض سعر مباشر ومضمون",
    baseRate: "السعر الأساسي للعمال والشاحنة",
    estimatedDistance: "المسافة المقدرة",
    heavyFee: "رسوم الأغراض الثقيلة",
    stairFee: "رسوم الدرج / الممر الطويل",
    packingFee: "حزمة أدوات التغليف",
    laborDiscount: "خصم العمالة فقط",
    totalGuaranteed: "إجمالي السعر المضمن النهائي",
    depositNotice: "يلزم دفع عربون تأمين بقيمة 100$ عبر تطبيق Cash App لتأكيد إرسال الفريق.",
    cancelFeeNotice: "في حال إلغاء النقل، سيتم الاحتفاظ بعربون التأمين البالغ 100$ كرسوم إلغاء.",
    priceLockBadge: "سعر مضمون ومثبت",

    // Map & Route Visualizer
    routeVisualizerTitle: "خريطة المسار التفاعلية ومحسب المسافة",
    chicagoMapTitle: "خريطة تفاعلية لتغطية كامل مدينة شيكاغو",
    wholeChicagoCoverage: "نغطي 100٪ من كامل مدينة شيكاغو ومقاطعة كوك (جميع الأحياء الـ 77)",
    distanceMiles: "المسافة بين الرموز البريدية",
    noTravelFeePromotion: "تم تطبيق عرض $0 رسوم انتقالات محلية!",

    // Confirmation Receipt Modal / Success Box
    successTitle: "تم تأكيد حجز نقل الأثاث بنجاح!",
    reservationId: "رقم الحجز",
    depositHeader: "تعليمات دفع العربون عبر Cash App",
    depositBody: "يرجى إرسال عربون التأمين بقيمة 100$ عبر Cash App إلى $Movers312 مع كتابة رقم الحجز في الملاحظات لتأكيد السائق.",
    printReceipt: "طباعة / حفظ إيصال التأكيد",
    calculateAnother: "حساب عرض سعر آخر",

    // Interactive Checklist
    checklistTitle: "قائمة التجهيز لنقل الأثاث بشيكاغو",
    checklistSubtitle: "تنظيم خطوة بخطوة لنقل أثاث مريح وبدون توتر.",
    task1: "الخطوة 1: فرز الغرف والتبرع/البيع للأغراض غير الضرورية",
    task2: "الخطوة 2: تغليف الأواني الزجاجية بعناية (أو اختيار حزمة أدوات التغليف لدينا!)",
    task3: "الخطوة 3: إخلاء الممرات، حجز المصعد، أو ترتيب موقف الشاحنة",
    task4: "الخطوة 4: تأكيد الحجز ودفع 100$ عربون عبر Cash App",
    task5: "الخطوة 5: جمع الوثائق الهامة، اللابتوب، الأدوية والمفاتيح في حقيبة يدك",

    // FAQ Section
    faqTitle: "الأسئلة الشائعة",
    q1: "هل هناك أي رسوم مخفية للسلالم أو المسافات الطويلة؟",
    a1: "لا! يتم حساب كل شيء بشفافية في عرض السعر المباشر بناءً على اختياراتك.",
    q2: "كيف يعمل عربون الـ 100 دولار؟",
    a2: "عربون الـ 100$ يضمن حجز الفريق والشاحنة في اليوم والوقت المحددين عبر Cash App. يرجى الملاحظة: في حال إلغاء الحجز، سيتم الاحتفاظ بعربون التأمين البالغ 100$ كرسوم إلغاء.",
    q3: "هل توفرون شهادة تأمين المباني (COI)؟",
    a3: "نعم! نوفر شهادات COI مجاناً للمباني ذات المجموعات السكنية والمصاعد في شيكاغو.",
    q4: "ما هي اللغات التي يتحدث بها فريق العمل؟",
    a4: "يتحدث فريق التوزيع والعمال باللغات العربية والإنجليزية والإسبانية والروسية واليابانية وال hisانية.",

    // Search History / Archived Quotes
    historyTitle: "البحث في الأرشيف والحجوزات السابقة",
    searchPlaceholder: "البحث برقم الحجز، الاسم، البريد، أو الرمز البريدي...",
    noBookingsFound: "لم يتم العثور على حجوزات محفوظة.",
    viewReceipt: "عرض الإيصال",

    // Footer
    footerDesc: "شركة نقل الأثاث المعتمدة الأولى في شيكاغو ومقاطعة كوك بأسعار محددة وشفافة.",
    footerLanguages: "دعم متعدد اللغات: English • Español • Lietuvių • Русский • 日本語 • العربية",
    rightsReserved: "جميع الحقوق محفوظة. ترخيص إلينوي ICC #3280B.",
    aboutUs: "من نحن",
    privacyPolicy: "سياسة الخصوصية",
    disclaimer: "إخلاء المسؤولية",
    aiChatPolicy: "سياسة دعم الدعم عبر الذكاء الاصطناعي",
    companyLegal: "الشركة والقانون",

    // AI Chat Component
    aiSupportTitle: "دعم المحادثة بالذكاء الاصطناعي!",
    aiSupportSubtitle: "مساعد التوزيع للرئيس مات • 24/7",
    aiGreeting: "👋 أهلاً بك! أنا مساعد الذكاء الاصطناعي لشركة Movers312. هل لديك أسئلة حول نقل الأثاث في شيكاغو، أو القوانين، أو الأسعار؟ اسألني بالعربية أو الإنجليزية!",
    aiInputPlaceholder: "اسأل عن الأسعار، التغليف، السلالم...",
    instantQuoteBar: "أسعار فورية لمقاطعة كوك",
    aiTyping: "الذكاء الاصطناعي يكتب...",
  }
};
