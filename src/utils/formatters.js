// Narxni "60,000" ko'rinishiga keltiradi (Figma dizaynidagi format)
export function formatPrice(value) {
  return Number(value).toLocaleString('en-US')
}

// Bugungi sana: "2026-11-18" (input type="date" uchun, mahalliy vaqt bo'yicha)
export function todayISO() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

// Telefon raqamini "+998 90 123-45-67" ko'rinishiga keltiradi (yozish paytida ishlaydi)
export function formatPhoneInput(raw) {
  let digits = String(raw).replace(/\D/g, '')
  if (digits.startsWith('998')) digits = digits.slice(3)
  digits = digits.slice(0, 9)
  const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)].filter(Boolean)
  if (parts.length === 0) return ''
  const [a, b, c, d] = parts
  let result = `+998 ${a}`
  if (b) result += ` ${b}`
  if (c) result += `-${c}`
  if (d) result += `-${d}`
  return result
}
