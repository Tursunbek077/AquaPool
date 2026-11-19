// Sana va vaqt yordamchilari. Barcha sanalar "YYYY-MM-DD" (mahalliy vaqt) ko'rinishida saqlanadi.

const WEEKDAYS = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']
const MONTHS_SHORT = ['yan', 'fev', 'mar', 'apr', 'may', 'iyn', 'iyl', 'avg', 'sen', 'okt', 'noy', 'dek']
const MONTHS_LONG = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentabr',
  'oktabr',
  'noyabr',
  'dekabr',
]

export function toISODate(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

export function parseISODate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

// "2026-02-30" kabi mavjud bo'lmagan sanalarni ham rad etadi
export function isValidISODate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  return toISODate(parseISODate(value)) === value
}

export function addDays(iso, amount) {
  const date = parseISODate(iso)
  date.setDate(date.getDate() + amount)
  return toISODate(date)
}

// a dan b gacha necha kun (b - a)
export function daysBetween(aIso, bIso) {
  const ms = parseISODate(bIso).getTime() - parseISODate(aIso).getTime()
  return Math.round(ms / 86400000)
}

export function weekdayName(iso) {
  return WEEKDAYS[parseISODate(iso).getDay()]
}

// "19-noy"
export function shortDate(iso) {
  const date = parseISODate(iso)
  return `${date.getDate()}-${MONTHS_SHORT[date.getMonth()]}`
}

// "19-noyabr"
export function longDate(iso) {
  const date = parseISODate(iso)
  return `${date.getDate()}-${MONTHS_LONG[date.getMonth()]}`
}

// "08:30" -> 510
export function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// Sana va "HH:MM" dan mahalliy vaqt bo'yicha Date
export function toDateTime(iso, time) {
  const date = parseISODate(iso)
  const minutes = timeToMinutes(time)
  date.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0)
  return date
}
