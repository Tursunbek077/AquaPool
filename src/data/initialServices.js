// Boshlang'ich xizmatlar va tariflar. Narxlar va matnlar Figma dizaynidan olingan.
// Keyinchalik shu ma'lumot Supabase'dan keladi (services/ orqali).

// Pullik xizmatlar (Figma: "Xizmatlar va Akademiya" sahifasi)
export const initialServices = [
  {
    id: 'erkin-suzish',
    title: 'Erkin suzish',
    category: 'adults',
    tag: 'Mustaqil tashrif',
    price: 60000,
    priceNote: "so'm",
    duration: 60,
    description:
      "Kun davomida o'zingizga qulay vaqtda 50 metrli professional yo'laklarda erkin shug'ullanish va energiyani tiklash imkoniyati.",
    suitableFor: 'Barcha kattalar va yoshlar (14+)',
    capacityNote: "Maksimal 5 kishi / yo'lak",
  },
  {
    id: 'individual-murabbiy',
    title: 'Individual murabbiy darsi',
    category: 'individual',
    tag: 'Shaxsiy murabbiy',
    price: 150000,
    priceNote: "so'm",
    duration: 60,
    description:
      "Sizning maqsadingiz va tayyorgarligingizga moslashtirilgan 1-ga-1 dars. Tezlik, erishish va suzish texnikasini xatosiz o'zlashtirish.",
    suitableFor: 'Barcha yoshdagi xohlovchilar',
    capacityNote: 'Individual (faqat siz va murabbiy)',
  },
  {
    id: 'guruh-kattalar',
    title: "Guruh mashg'ulotlari (Kattalar)",
    category: 'adults',
    tag: 'Kattalar guruhi',
    price: 80000,
    priceNote: "so'm",
    duration: 60,
    description:
      "Kattalar uchun noldan o'rganish yoki texnikani to'g'rilash. Qiziqarli jamoaviy muhit va professional murabbiy nazorati.",
    suitableFor: '18 yoshdan yuqori',
    capacityNote: '6-8 kishi',
  },
  {
    id: 'akvaaerobika',
    title: 'Akvaaerobika',
    category: 'aqua',
    tag: 'Ayollar fitnesi',
    price: 75000,
    priceNote: "so'm",
    duration: 50,
    description:
      "Bo'g'imlarga ortiqcha yuk tushirmasdan ozish, tanani mustahkamlash va salomatlikni tiklash uchun maxsus suv fitnes dasturi.",
    suitableFor: 'Ayollar (barcha yoshdagilar)',
    capacityNote: "Iliq suvli maxsus zona (+29°C)",
  },
  {
    id: 'bolalar-sport-guruhi',
    title: 'Bolalar sport guruhi',
    category: 'kids',
    tag: 'Oylik abonement (12 dars)',
    price: 650000,
    priceNote: "so'm/oy",
    duration: 60,
    description:
      "Haftasiga 3 marta muntazam mashg'ulotlar, doimiy murabbiy nazorati va bolaning jismoniy rivojlanishini to'liq sport monitoringi.",
    suitableFor: '6-16 yoshdagi bolalar',
    capacityNote: 'Dush-Chor-Jum yoki Sesh-Pay-Shan',
  },
  {
    id: 'vip-lounge-sauna',
    title: 'VIP Lounge & Fin saunasi',
    category: 'spa',
    tag: 'Spa & Relaks',
    price: 120000,
    priceNote: "so'm",
    duration: 90,
    description:
      "Mashaqqatli mashg'ulotlardan keyingi chuqur mushak relaksatsiyasi. Qaragay hidli issiq Fin saunasi, fito-bar va sokin dam olish hududi.",
    suitableFor: 'Qayta tiklanish va dam oluvchilar',
    capacityNote: 'Choy marosimi, Fin saunasi, jakuzi',
  },
]

// Xizmatlar sahifasidagi filtr tablari
export const serviceFilters = [
  { id: 'all', label: 'Barcha xizmatlar' },
  { id: 'kids', label: 'Suzish akademiyasi (Bolalar)' },
  { id: 'adults', label: "Kattalar uchun mashg'ulot" },
  { id: 'aqua', label: 'Akvaaerobika va Sauna' },
]

// Bolalar suzish akademiyasi: 3 bosqich
export const academyLevels = [
  {
    id: 'aqua-start',
    step: '1-bosqich',
    ages: '5-10 yosh',
    title: 'AquaStart',
    level: "Boshlang'ich",
    description:
      "Suv bilan tanishuv,suvda erkin harakatlanish, qo'rquvni bartaraf qilish va to'g'ri nafas olish texnikasini o'rgatuvchi dastur.",
    points: [
      'Suvda muvozanat va nafas mashqlari',
      "O'yin metodikasi orqali ko'nikma hosil qilish",
      "Chuqurligi 90cm bo'lgan xavfsiz mashg'ulot hovuzi",
    ],
    duration: 45,
  },
  {
    id: 'aqua-pro',
    step: '2-bosqich',
    ages: '8-14 yosh',
    title: 'AquaPro',
    level: "O'rta bosqich",
    description:
      "Krol, brass va chalqancha suzish usullarini chuqur shakllantirish. Delfin uslubi, taktika, taymlar bo'yicha interval mashqlar.",
    points: [
      '3 xil suzish uslubini texnik tahlil qilish',
      "Ochiq suvda start va o'girilish amaliyoti",
      'Jismoniy chidamlilikni 40% ga oshirish',
    ],
    duration: 60,
    featured: true,
  },
  {
    id: 'aqua-champion',
    step: '3-bosqich',
    ages: '10-17 yosh',
    title: 'AquaChampion',
    level: 'Professional',
    description:
      "Musobaqalar va chempionatlarga tayyorgarlik. Delfin uslubi, taktika, taymlar bo'yicha interval mashqlar va razryadli dasturlar.",
    points: [
      "Olimpiya standartidagi 50 metrli trekda darslar",
      'Xalqaro sertifikatli bosh murabbiy nazorati',
      "Shahar va respublika birinchiliklariga yo'llanma",
    ],
    duration: 90,
  },
]

// A'zolik paketlari (Figma: "Narxlar va A'zolik" sahifasi, 4 ta tarif)
export const initialMemberships = [
  {
    id: 'basic',
    name: 'Basic',
    label: 'Start bosqich',
    description: "Kunduzgi erkin rejimda sog'lomlashtiruvchi suzish uchun.",
    monthlyPrice: 650000,
    visits: 12,
    features: [
      { text: 'Oyiga 12 ta tashrif (haftasiga 3 marta)', included: true },
      { text: 'Olimpiya basseynidan foydalanish (60 min)', included: true },
      { text: 'Dush va shaxsiy elektron shkafcha', included: true },
      { text: 'Kirish vaqti: 09:00 dan 16:00 gacha', included: true },
      { text: 'Sauna va hammom kirmaydi', included: false },
    ],
  },
  {
    id: 'standard-pro',
    name: 'Standard Pro',
    label: 'Ommabop tanlov',
    description: "Ishdan keyin yoki ertalab to'liq quvvat bilan suzuvchilar uchun.",
    monthlyPrice: 900000,
    visits: 16,
    features: [
      { text: 'Oyiga 16 ta tashrif (haftasiga 4 marta)', included: true },
      { text: 'Cheklanmagan vaqtda kirish: 06:00 - 23:00', included: true },
      { text: "Fin saunasi va turk bug' xonasi", included: true },
      { text: "1 marta bepul murabbiy maslahati va tahlil", included: true },
      { text: 'Kardio trenajyor zonasi bepul', included: true },
    ],
  },
  {
    id: 'premium-vip',
    name: 'Premium VIP',
    label: "To'liq erkinlik",
    description: "Maksimal qulaylik, shaxsiy yondashuv va to'liq infratuzilma.",
    monthlyPrice: 1300000,
    visits: null, // cheksiz
    popular: true,
    features: [
      { text: 'Cheksiz oylik tashriflar', included: true },
      { text: 'Har kuni istalgan vaqtda kirish (06:00 - 23:00)', included: true },
      { text: "Sauna, fin hammomi va maxsus dam olish hududi", included: true },
      { text: "Premium sochiq va xalat to'plami (har safar)", included: true },
      { text: '4 ta individual mashg\'ulot', included: true },
      { text: "1 ta do'stingizni bepul taklif qilish imkoni", included: true },
    ],
  },
  {
    id: 'family',
    name: 'Family Oila',
    label: 'Butun oila uchun',
    description: "Farzandlar va ota-onalar birgalikda sog'lom dam olishi uchun.",
    monthlyPrice: 1950000,
    visits: 20,
    features: [
      { text: '2 ta ota-ona + 2 ta bola (14 yoshgacha)', included: true },
      { text: 'Oyiga 20 tadan umumiy oilaviy tashrif', included: true },
      { text: 'Bolalar Akademiyasi guruhlariga 15% chegirma', included: true },
      { text: 'Dam olish kunlaridagi maxsus oilaviy soatlar', included: true },
      { text: 'Bolalar hovuzi va jakuzidan birgalikda foydalanish', included: true },
    ],
  },
]

// Yillik to'lovda chegirma (Figma: "TEJANG 20%")
export const YEARLY_DISCOUNT = 0.2

// A'zoliksiz tashrif narxlari (Figma: "Bir martalik tashriflar narxlari")
export const initialSingleVisits = [
  {
    id: 'erta-seans',
    label: 'Ertalabki seans',
    title: 'Erkin suzish',
    note: 'Soat 06:00 dan 11:00 gacha (60 daqiqa)',
    price: 50000,
  },
  {
    id: 'standart-seans',
    label: 'Standart seans',
    title: 'Erkin suzish',
    note: 'Kunduzgi va kechki soatlar (60 daqiqa)',
    price: 70000,
  },
  {
    id: 'bolalar-chipta',
    label: 'Kichik mehmonlar',
    title: 'Bolalar chiptasi',
    note: "4 yoshdan 14 yoshgacha bo'lgan bolalar uchun",
    price: 40000,
  },
  {
    id: 'sauna-basseyn',
    label: 'Dam olish va tiklanish',
    title: 'Sauna + Basseyn',
    note: "To'liq kompleks (90 daqiqa cheklovsiz)",
    price: 110000,
  },
]
