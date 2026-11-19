// Bron holatlarining ko'rinishi (kabinet va keyinchalik admin panel uchun umumiy)
export const BOOKING_STATUS_UI = {
  pending: { label: 'Kutilmoqda', variant: 'warning' },
  confirmed: { label: 'Tasdiqlandi', variant: 'success' },
  cancelled: { label: 'Bekor qilindi', variant: 'danger' },
  rejected: { label: 'Rad etildi', variant: 'danger' },
}

export const PAYMENT_STATUS_UI = {
  paid: { label: "To'langan", variant: 'success' },
  review: { label: 'Chek tekshirilmoqda', variant: 'warning' },
  'need-receipt': { label: 'Chek yuklang', variant: 'danger' },
  onsite: { label: "Joyida to'lanadi", variant: 'neutral' },
}

export const PAYMENT_METHOD_LABELS = {
  onsite: "Joyida to'lash",
  receipt: 'Karta cheki',
}
