// Barcha menyular bitta joyda. Yo'llar (path) App.jsx dagi routerga mos.

// Ommaviy sayt menyusi (Figma navbari). "Biz haqimizda" sahifasi TZ da yo'q,
// shuning uchun uning o'rniga TZ dagi "Aloqa" sahifasi qo'yildi.
export const publicNav = [
  { label: 'Bosh sahifa', to: '/', end: true },
  { label: 'Xizmatlar', to: '/xizmatlar', end: true },
  { label: 'Suzish akademiyasi', to: '/xizmatlar#akademiya' },
  { label: "Narxlar va a'zolik", to: '/narxlar' },
  { label: 'Jadval', to: '/jadval' },
  { label: 'Murabbiylar', to: '/murabbiylar' },
  { label: 'Aloqa', to: '/aloqa' },
]

export const footerServices = [
  { label: 'Kattalar uchun suzish', to: '/xizmatlar' },
  { label: 'Bolalar maktabi', to: '/xizmatlar#akademiya' },
  { label: 'Akvaaerobika', to: '/xizmatlar' },
  { label: "Erkin suzish yo'laklari", to: '/jadval' },
  { label: 'Spa va sauna hududi', to: '/xizmatlar' },
]

export const footerInfo = [
  { label: "Mashg'ulotlar jadvali", to: '/jadval' },
  { label: "A'zolik paketlari", to: '/narxlar' },
  { label: "Ko'p beriladigan savollar", to: '/aloqa#faq' },
  { label: 'Hovuz qoidalari', to: '/aloqa#faq' },
  { label: 'Maxfiylik siyosati', to: '/aloqa' },
]

// Mijoz kabineti: 3 ta bo'lim (TZ 2.2)
export const customerNav = [
  { label: 'Mening bronlarim', to: '/kabinet/bronlar' },
  { label: "A'zolik va to'lovlar", to: '/kabinet/azolik' },
  { label: 'Mening profilim', to: '/kabinet/profil' },
]

// Admin panel: 4 ta modul (TZ 2.3)
export const adminNav = [
  { label: 'Boshqaruv markazi', to: '/admin', end: true, icon: 'dashboard' },
  { label: 'Bronlar va slotlar', to: '/admin/bronlar', icon: 'bookings' },
  { label: "Mijozlar va a'zoliklar", to: '/admin/mijozlar', icon: 'clients' },
  { label: 'Sozlamalar', to: '/admin/sozlamalar', icon: 'settings' },
]
