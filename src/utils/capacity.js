// Basseyn sig'imi hisobi (TZ 3.1). Bu fayl faqat sof funksiyalardan iborat, shuning uchun oson tekshiriladi.

// Shuncha yoki kamroq joy qolsa "Shoshiling" holati ko'rsatiladi
export const LOW_SPOTS_THRESHOLD = 2

// Sig'imga hisoblanadigan bron holatlari: TZ bo'yicha faqat 'confirmed' va 'pending'
export const ACTIVE_STATUSES = ['confirmed', 'pending']

// Bo'sh_Joylar = Jami_Sig'im - Band_Qilinganlar
export function calcCapacity(total, booked) {
  const spotsLeft = Math.max(total - booked, 0)
  const percent = total > 0 ? Math.min(Math.round((booked / total) * 100), 100) : 100

  let state = 'available'
  if (spotsLeft <= 0) state = 'full'
  else if (spotsLeft <= LOW_SPOTS_THRESHOLD) state = 'low'

  return { total, booked, spotsLeft, percent, state }
}

// Bitta slot va sana bo'yicha faol bronlardagi jami kishilar soni
export function countActivePeople(bookings, slotId) {
  return bookings
    .filter((booking) => booking.slotId === slotId && ACTIVE_STATUSES.includes(booking.status))
    .reduce((sum, booking) => sum + booking.people, 0)
}
