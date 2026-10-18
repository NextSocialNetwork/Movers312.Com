import { Language } from '../i18n/translations';

interface FallbackResponseParams {
  query: string;
  language: Language;
}

export function getLocalDispatchFallbackResponse({ query, language }: FallbackResponseParams): string {
  const q = query.toLowerCase();

  // English fallback responses
  if (language === 'en' || !language) {
    if (q.includes('rate') || q.includes('cost') || q.includes('price') || q.includes('how much') || q.includes('quote')) {
      return `Our Chicago moving rates are straightforward with zero hidden surprises:

• **2 Movers & 16-FT Box Truck:** $120/hr (Base moves start around $360)
• **3 Movers & 26-FT Box Truck:** $180/hr
• **4 Movers & 26-FT Box Truck:** $230/hr
• **Travel Fee:** $0 Local Travel & Gas Promotion is currently active!

You can configure your exact distance, bedrooms, and access details on our instant pricing calculator on this page for a 100% guaranteed binding quote, or call our 24/7 dispatch at **(312) 385-9229**!`;
    }

    if (q.includes('piano') || q.includes('safe') || q.includes('heavy') || q.includes('marble')) {
      return `Yes, we handle specialty heavy items! We have specialized lifting straps, dollies, and padding for items over 300 lbs (such as upright pianos, gun safes, and heavy marble tables) for a flat **$150 specialty item surcharge**. 

Just make sure to check the "Specialty Heavy Item" option in our quote tool or let dispatch know when booking at **(312) 385-9229**.`;
    }

    if (q.includes('area') || q.includes('neighborhood') || q.includes('where') || q.includes('cover') || q.includes('location') || q.includes('chicago') || q.includes('lincoln park') || q.includes('loop') || q.includes('wicker') || q.includes('lakeview')) {
      return `We proudly cover **all of Chicago and Cook County**! Our crews operate daily across:

• Lincoln Park, Lakeview, Loop, West Loop, River North, South Loop
• Wicker Park, Logan Square, Bucktown, Ukrainian Village
• Hyde Park, Bridgeport, Pilsen, Bronzeville
• Suburbs including Evanston, Oak Park, Skokie, and Schaumburg

Our drivers are experts with tight Chicago alley parking, vintage walkups, and downtown loading dock reservations. Call **(312) 385-9229** for any location inquiries!`;
    }

    if (q.includes('deposit') || q.includes('cash app') || q.includes('cancel') || q.includes('payment') || q.includes('pay')) {
      return `To secure your moving date and dispatch our crew, a **$100 security deposit** is required via Cash App to **$Movers312** (please include your Reservation ID in the memo). 

The remaining balance is paid on moving day upon job completion. Please note our transparent policy: if you cancel your booking, the $100 security deposit is retained as a cancellation fee. Questions? Call **(312) 385-9229**.`;
    }

    if (q.includes('license') || q.includes('insured') || q.includes('icc') || q.includes('dot') || q.includes('coi') || q.includes('insurance')) {
      return `Movers312 is **100% bonded, licensed, and insured**:

• **Illinois ICC Dispatch:** #3280B
• **US DOT:** #4893122
• **Certificates of Insurance (COI):** Provided complimentary for high-rise elevator buildings and downtown Chicago commercial docks.

Feel free to request a COI by emailing or calling our 24/7 team at **(312) 385-9229**.`;
    }

    if (q.includes('pack') || q.includes('box') || q.includes('tape') || q.includes('supplies')) {
      return `We offer comprehensive packing prep kits to keep your relocation organized:

• **Studio / 1-Bed Kit:** $110 (15 heavy-duty boxes, tape, stretch wrap & wardrobe boxes)
• **2-3 Bedroom Kit:** $190
• **4+ Bedroom Estate Kit:** $280

Our team brings dollies, moving blankets, and protective floor runners on every truck at no extra charge!`;
    }

    return `Hello! Movers312 is Chicago's premier local relocation service (Illinois ICC #3280B, US DOT #4893122). 

Our local moving packages start around **$360 for 2 movers and a fully equipped truck** with an active **$0 local travel promotion**! You can test our instant quote estimator on this page to lock in a binding price, or speak with our live dispatch team 24/7 at **(312) 385-9229**. How can we help with your upcoming Chicago move?`;
  }

  // Spanish
  if (language === 'es') {
    if (q.includes('precio') || q.includes('tarifa') || q.includes('cuanto') || q.includes('costo')) {
      return `Nuestras tarifas de mudanza en Chicago son claras y transparentes:

• **2 Mudanceros y Camión de 16 pies:** $120/hr (Mudanzas base desde aprox. $360)
• **3 Mudanceros y Camión de 26 pies:** $180/hr
• **Promoción de Viaje Local:** ¡$0 de costo de viaje en Chicago y Condado de Cook!

Calcula tu cotización garantizada 100% en esta página o llámanos 24/7 al **(312) 385-9229**.`;
    }
    return `¡Hola! En Movers312 somos expertos en mudanzas en todo Chicago y el Condado de Cook (Licencia ICC #3280B). Nuestros paquetes comienzan en **$360 para 2 mudanceros con camión**, con promoción de $0 en tarifa de viaje local. Contáctanos al **(312) 385-9229** para asistencia inmediata.`;
  }

  // Lithuanian
  if (language === 'lt') {
    return `Sveiki! „Movers312“ yra licencijuota Čikagos perkraustymo įmonė (ICC #3280B, US DOT #4893122). Mūsų bazinis tarifas prasideda nuo **$360 už 2 krovėjus ir sunkvežimį** ($120/val.), o šiuo metu taikoma **$0 vietinio kuro ir kelionės mokesčio akcija**! Teiraukitės arba skambinkite visą parą tel. **(312) 385-9229**.`;
  }

  // Russian
  if (language === 'ru') {
    return `Здравствуйте! Movers312 — лицензированная мувинговая компания Чикаго (ICC #3280B, US DOT #4893122). Наши базовые тарифы начинаются от **$360 за 2 грузчиков и грузовик** ($120/час) с действующей акцией **$0 за подачу машины**! Рассчитайте точную стоимость на сайте или звоните 24/7 по телефону **(312) 385-9229**.`;
  }

  // Japanese
  if (language === 'ja') {
    return `こんにちは！Movers312はシカゴの公認引越しサービスです（ICC #3280B、US DOT #4893122）。基本料金は作業員2名＋トラックで約**$360〜**（$120/時間）、現在シカゴ市内の出張費**$0プロモーション**を実施中です！詳細やお電話は24時間対応の **(312) 385-9229** までお気軽にどうぞ。`;
  }

  // Arabic
  if (language === 'ar') {
    return `مرحباً بك! Movers312 هي شركة نقل العفش المرخصة الرائدة في شيكاغو (ICC #3280B, US DOT #4893122). تبدأ باقاتنا المحلية من **360 دولار لشخصين وشاحنة** مع عرض ترويجي حالي **0$ رسوم تنقل محلية**. يمكنك الحصول على تسعيرة فورية عبر الموقع أو الاتصال بنا على مدار الساعة: **(312) 385-9229**.`;
  }

  return `Movers312 Chicago Moving Assistant: Call **(312) 385-9229** for instant dispatch support or use the pricing calculator on this page!`;
}
