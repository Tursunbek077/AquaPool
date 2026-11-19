// Haftalik mashg'ulotlar jadvali shabloni: har kuni takrorlanadi (markaz har kuni 06:00-23:00 ochiq).
// Slotlar Figma dizaynidan; "Faqat erkaklar" va "Oila" soatlari TZ 3.3 talabi bo'yicha qo'shilgan.
// Keyin admin panel (5-bosqich) va Supabase orqali o'zgartiriladigan bo'ladi.

export const GENDER_OPTIONS = {
  mixed: { label: 'Umumiy / Oila', filterLabel: 'Umumiy / Oila' },
  men: { label: 'Faqat Erkaklar', filterLabel: 'Erkaklar' },
  women: { label: 'Faqat Ayollar', filterLabel: 'Ayollar' },
}

// Bir bron uchun maksimal kishilar soni
export const MAX_PEOPLE_PER_BOOKING = 5

// Bron boshlanishiga necha soat qolgunga qadar bepul bekor qilish mumkin
export const FREE_CANCEL_HOURS = 2

// Jadval necha kun oldinga ochiq (bugun bilan birga)
export const SCHEDULE_DAYS = 7

// Vaqt oraliqlari (filtr va bosh sahifadagi tezkor bron uchun). from/to daqiqalarda.
export const TIME_BANDS = [
  { value: 'ertalab', label: 'Ertalab (06:00 - 11:00)', from: 360, to: 660 },
  { value: 'kunduz', label: 'Kunduzi (11:00 - 17:00)', from: 660, to: 1020 },
  { value: 'kechqurun', label: 'Kechqurun (17:00 - 21:00)', from: 1020, to: 1260 },
  { value: 'kech', label: 'Kech (21:00 - 23:00)', from: 1260, to: 1380 },
]

// baseBooked: boshqa mijozlar tomonidan allaqachon band qilingan joylar (demo ma'lumot).
// alwaysFull: har kuni to'lib turadigan mashhur slot.
export const scheduleTemplates = [
  {
    id: 'tong-erkaklar',
    start: '06:30',
    end: '08:00',
    title: 'Erta tong suzish (erkaklar)',
    description: "Faqat erkaklar uchun erta tongdagi sokin mashg'ulot, erkin suzish va chidamlilik.",
    lane: "Yo'lak 5-8",
    gender: 'men',
    coachId: 'farrux-rahimov',
    serviceId: 'erkin-suzish',
    capacity: 16,
    baseBooked: 5,
  },
  {
    id: 'krol-boshlangich',
    start: '08:00',
    end: '09:30',
    title: "Krol texnikasi - Boshlang'ich",
    description: "Bolalar uchun suzish poydevori, to'g'ri nafas olish va tana muvozanati.",
    lane: "Yo'lak 1-3",
    gender: 'mixed',
    coachId: 'farrux-rahimov',
    serviceId: 'guruh-kattalar',
    capacity: 12,
    baseBooked: 8,
  },
  {
    id: 'erkin-kardio',
    start: '10:00',
    end: '11:30',
    title: 'Erkin suzish & Kardio',
    description: "Mustaqil mashg'ulot, qutqaruvchi va instruktor doimiy nazoratida.",
    lane: "Yo'lak 4-8",
    gender: 'mixed',
    coachId: 'malika-alimova',
    serviceId: 'erkin-suzish',
    capacity: 20,
    baseBooked: 12,
  },
  {
    id: 'oilaviy-suzish',
    start: '12:30',
    end: '14:00',
    title: 'Oilaviy suzish',
    description: "Ota-onalar va bolalar birgalikda: bolalar hovuzi, jakuzi va erkin suzish.",
    lane: 'Oilaviy zona',
    gender: 'mixed',
    coachId: 'sardor-yoldoshev',
    serviceId: 'erkin-suzish',
    capacity: 24,
    baseBooked: 9,
  },
  {
    id: 'aqua-fitness',
    start: '15:00',
    end: '16:30',
    title: 'Aqua Fitness & Toning',
    description: "Bo'g'imlarga yuksiz vazn tashlash, ritmik musiqiy mashqlar va salomatlik.",
    lane: 'Iliq suvli zona',
    gender: 'women',
    coachId: 'dilnoza-karimova',
    serviceId: 'akvaaerobika',
    capacity: 14,
    baseBooked: 12,
  },
  {
    id: 'kattalar-batterflyay',
    start: '18:00',
    end: '19:30',
    title: 'Kattalar: Batterflyay & Brass',
    description: "Murakkab suzish uslublarini to'g'rilash, chidamlilik oshirish.",
    lane: "Yo'lak 2-4",
    gender: 'mixed',
    coachId: 'farrux-rahimov',
    serviceId: 'guruh-kattalar',
    capacity: 10,
    baseBooked: 4,
  },
  {
    id: 'junior-pro',
    start: '19:30',
    end: '21:00',
    title: 'Junior Pro: Musobaqa tayyorgarligi',
    description: "Tezkor startlar, burilishlar (flip-turn) va tezkor masofa hisobi.",
    lane: "Yo'lak 1-3",
    gender: 'mixed',
    coachId: 'sardor-yoldoshev',
    serviceId: 'bolalar-sport-guruhi',
    capacity: 12,
    baseBooked: 12,
    alwaysFull: true,
  },
  {
    id: 'tungi-relax',
    start: '21:00',
    end: '22:30',
    title: 'Tungi Relax & Erkin relaks',
    description: "Xira yoritish ostidagi tinchlantiruvchi tungi suzish, sauna va gidromassaj bilan.",
    lane: "Barcha yo'laklar",
    gender: 'mixed',
    coachId: 'farrux-rahimov',
    serviceId: 'erkin-suzish',
    capacity: 24,
    baseBooked: 12,
  },
]
