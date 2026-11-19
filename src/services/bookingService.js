// Bronlar bilan ishlash: yaratish, bekor qilish, holatni o'zgartirish.
// Hozircha brauzer xotirasida (localStorage); 6-bosqichda Supabase'ga o'tkaziladi.
// Sig'im tekshiruvi har doim SAQLASH paytida qayta bajariladi (overbooking'dan himoya).

import { FREE_CANCEL_HOURS, MAX_PEOPLE_PER_BOOKING } from '../data/initialSchedule'
import { getSlotById } from './scheduleService'
import { isFilled, isValidUzPhone } from '../utils/validators'

const BOOKINGS_KEY = 'aquapool_bookings'
const SEQUENCE_KEY = 'aquapool_booking_seq'
const FIRST_BOOKING_NUMBER = 1001

export const BOOKING_STATUSES = ['pending', 'confirmed', 'cancelled', 'rejected']
export const PAYMENT_METHODS = ['onsite', 'receipt']

export class BookingError extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'BookingError'
    this.code = code
  }
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

export function loadBookings() {
  const items = readJSON(BOOKINGS_KEY, [])
  return Array.isArray(items) ? items : []
}

function saveBookings(items) {
  if (!writeJSON(BOOKINGS_KEY, items)) {
    throw new BookingError('STORAGE', "Bronni saqlab bo'lmadi. Brauzer xotirasi bloklangan bo'lishi mumkin.")
  }
}

function nextBookingNumber() {
  const current = Number(readJSON(SEQUENCE_KEY, FIRST_BOOKING_NUMBER - 1))
  const next = (Number.isFinite(current) ? current : FIRST_BOOKING_NUMBER - 1) + 1
  writeJSON(SEQUENCE_KEY, next)
  return next
}

// 6 xonali tasdiq kodi (100000-999999), mavjud bronlar orasida takrorlanmaydi
function generateCode(existingCodes) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const buffer = new Uint32Array(1)
    crypto.getRandomValues(buffer)
    const code = String(100000 + (buffer[0] % 900000))
    if (!existingCodes.has(code)) return code
  }
  throw new BookingError('CODE', "Tasdiq kodini yaratib bo'lmadi, qayta urinib ko'ring.")
}

const digitsOnly = (value) => String(value).replace(/\D/g, '')

// Toza mantiq: bronlar ro'yxati va kiruvchi ma'lumot bo'yicha yangi bronni tayyorlaydi.
// Xato bo'lsa BookingError tashlaydi. Saqlash va raqam berish tashqarida.
export function validateNewBooking(input, bookings, now = new Date()) {
  const name = String(input.name ?? '').trim()
  const people = Number(input.people)

  if (!isFilled(name, 2)) throw new BookingError('NAME', 'Ismingizni kiriting')
  if (!isValidUzPhone(input.phone ?? '')) throw new BookingError('PHONE', "Telefon raqamni to'liq kiriting")
  if (!Number.isInteger(people) || people < 1 || people > MAX_PEOPLE_PER_BOOKING) {
    throw new BookingError('PEOPLE', `Kishilar soni 1 dan ${MAX_PEOPLE_PER_BOOKING} gacha bo'lishi kerak`)
  }
  if (!PAYMENT_METHODS.includes(input.payment)) throw new BookingError('PAYMENT', "To'lov usulini tanlang")

  const slot = getSlotById(input.slotId, bookings, now)
  if (!slot) throw new BookingError('SLOT', "Bunday mashg'ulot topilmadi")
  if (slot.isPast) throw new BookingError('PAST', "Bu mashg'ulot vaqti allaqachon o'tib ketgan")
  if (slot.spotsLeft <= 0) throw new BookingError('FULL', "Bu mashg'ulotda bo'sh joy qolmadi")
  if (people > slot.spotsLeft) {
    throw new BookingError('FULL', `Faqat ${slot.spotsLeft} ta bo'sh joy qoldi. Kishilar sonini kamaytiring.`)
  }

  const phoneDigits = digitsOnly(input.phone)
  const duplicate = bookings.some(
    (booking) =>
      booking.slotId === slot.slotId &&
      digitsOnly(booking.phone) === phoneDigits &&
      (booking.status === 'pending' || booking.status === 'confirmed'),
  )
  if (duplicate) {
    throw new BookingError('DUPLICATE', "Siz bu mashg'ulotga allaqachon bron qilgansiz")
  }

  return { slot, name, people }
}

export function buildBooking({ slot, name, people }, input, number, code, now = new Date()) {
  return {
    id: number,
    number,
    code,
    slotId: slot.slotId,
    date: slot.date,
    start: slot.start,
    end: slot.end,
    startsAt: slot.startsAt,
    title: slot.title,
    serviceId: slot.service?.id ?? null,
    coachId: slot.coach?.id ?? null,
    people,
    name,
    phone: input.phone,
    comment: String(input.comment ?? '').trim(),
    payment: input.payment,
    status: 'pending',
    createdAt: now.toISOString(),
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function createBooking(input) {
  const bookings = loadBookings()
  const checked = validateNewBooking(input, bookings)
  const code = generateCode(new Set(bookings.map((booking) => booking.code)))
  const booking = buildBooking(checked, input, nextBookingNumber(), code)

  saveBookings([booking, ...bookings])
  await wait(350)
  return booking
}

// Mashg'ulot boshlanishiga FREE_CANCEL_HOURS soat qolgunga qadar bekor qilish mumkin
export function canCancel(booking, now = new Date()) {
  if (booking.status !== 'pending' && booking.status !== 'confirmed') return false
  const msLeft = new Date(booking.startsAt).getTime() - now.getTime()
  return msLeft >= FREE_CANCEL_HOURS * 3600 * 1000
}

export async function cancelBooking(id, now = new Date()) {
  const bookings = loadBookings()
  const booking = bookings.find((item) => item.id === id)
  if (!booking) throw new BookingError('NOT_FOUND', 'Bron topilmadi')
  if (!canCancel(booking, now)) {
    throw new BookingError('LATE', `Bronni mashg'ulotga ${FREE_CANCEL_HOURS} soat qolgunga qadar bekor qilish mumkin`)
  }
  saveBookings(bookings.map((item) => (item.id === id ? { ...item, status: 'cancelled' } : item)))
  await wait(200)
}

// Admin: tasdiqlash / rad etish (5-bosqich va Telegram tugmalari uchun)
export async function setBookingStatus(id, status) {
  if (!BOOKING_STATUSES.includes(status)) throw new BookingError('STATUS', "Noto'g'ri holat")
  const bookings = loadBookings()
  if (!bookings.some((item) => item.id === id)) throw new BookingError('NOT_FOUND', 'Bron topilmadi')
  saveBookings(bookings.map((item) => (item.id === id ? { ...item, status } : item)))
  await wait(150)
}
