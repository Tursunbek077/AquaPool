// A'zoliklar: so'rov yuborish, joriy a'zolikni aniqlash, qolgan tashriflarni hisoblash.
// Hozircha localStorage; 6-bosqichda Supabase'ga o'tadi.
// Faollashtirish (activateMembership) admin panel qilinganda ishlatiladi.

import { YEARLY_DISCOUNT, initialMemberships } from '../data/initialServices'
import { saveReceiptData } from './receiptService'
import { addDays } from '../utils/dates'
import { isFilled, isValidUzPhone } from '../utils/validators'
import { todayISO } from './scheduleService'

const MEMBERSHIPS_KEY = 'aquapool_memberships'
const MEMBERSHIP_SEQ_KEY = 'aquapool_membership_seq'

export const BILLING_PERIODS = ['monthly', 'yearly']
export const MEMBERSHIP_PAYMENT_METHODS = ['onsite', 'receipt']

export class MembershipError extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'MembershipError'
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

const digitsOnly = (value) => String(value).replace(/\D/g, '')

export function loadMemberships() {
  const items = readJSON(MEMBERSHIPS_KEY, [])
  return Array.isArray(items) ? items : []
}

// Jami summa: oylik narx yoki yillik (12 oy, 20% chegirma bilan). TariffCard dagi hisob bilan bir xil.
export function tariffTotal(tariff, billing) {
  if (billing === 'yearly') return Math.round(tariff.monthlyPrice * (1 - YEARLY_DISCOUNT)) * 12
  return tariff.monthlyPrice
}

// 'pending' - to'lov tasdiqlanishi kutilmoqda; 'active' - faol; 'expired' - muddati tugagan; 'rejected' - rad etilgan
export function membershipState(membership, today = todayISO()) {
  if (membership.status === 'active') return membership.endDate && today > membership.endDate ? 'expired' : 'active'
  return membership.status
}

// Mijozning hozirgi (kutilayotgan yoki faol) a'zoligi. Muddati tugagan yoki rad etilgan hisoblanmaydi.
export function getCurrentMembership(memberships, phone, today = todayISO()) {
  const digits = digitsOnly(phone)
  if (!digits) return null
  const current = memberships
    .filter((item) => digitsOnly(item.phone) === digits)
    .filter((item) => ['pending', 'active'].includes(membershipState(item, today)))
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  return current[0] ?? null
}

export function validateMembershipRequest(input, memberships, today = todayISO()) {
  const tariff = initialMemberships.find((item) => item.id === input.tariffId)
  if (!tariff) throw new MembershipError('TARIFF', 'Tarif topilmadi')
  if (!BILLING_PERIODS.includes(input.billing)) throw new MembershipError('BILLING', "To'lov davrini tanlang")
  if (!MEMBERSHIP_PAYMENT_METHODS.includes(input.method)) throw new MembershipError('METHOD', "To'lov usulini tanlang")
  if (!isFilled(input.name ?? '', 2)) throw new MembershipError('NAME', 'Ismingizni kiriting')
  if (!isValidUzPhone(input.phone ?? '')) throw new MembershipError('PHONE', "Telefon raqamni to'liq kiriting")
  if (getCurrentMembership(memberships, input.phone, today)) {
    throw new MembershipError('EXISTS', "Sizda allaqachon faol yoki tasdiqlanishi kutilayotgan a'zolik bor")
  }
  return tariff
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function requestMembership(input) {
  const memberships = loadMemberships()
  const tariff = validateMembershipRequest(input, memberships)
  const seq = Number(readJSON(MEMBERSHIP_SEQ_KEY, 0)) + 1

  const membership = {
    id: seq,
    phone: input.phone,
    name: String(input.name).trim(),
    tariffId: tariff.id,
    tariffName: tariff.name,
    billing: input.billing,
    amount: tariffTotal(tariff, input.billing),
    visitsTotal: tariff.visits, // null = cheksiz
    method: input.method,
    status: 'pending',
    startDate: null,
    endDate: null,
    createdAt: new Date().toISOString(),
  }

  if (!writeJSON(MEMBERSHIPS_KEY, [membership, ...memberships])) {
    throw new MembershipError('STORAGE', "So'rovni saqlab bo'lmadi. Brauzer xotirasi bloklangan bo'lishi mumkin.")
  }
  writeJSON(MEMBERSHIP_SEQ_KEY, seq)
  if (input.receiptDataUrl) saveReceiptData(`membership:${membership.id}`, input.receiptDataUrl, input.receiptName)

  await wait(300)
  return membership
}

// Admin: to'lov tasdiqlangach a'zolikni faollashtiradi (oylik: 30 kun, yillik: 365 kun)
export async function activateMembership(id, startDate = todayISO()) {
  const memberships = loadMemberships()
  const target = memberships.find((item) => item.id === id)
  if (!target) throw new MembershipError('NOT_FOUND', "A'zolik topilmadi")
  const days = target.billing === 'yearly' ? 365 : 30
  const next = memberships.map((item) =>
    item.id === id ? { ...item, status: 'active', startDate, endDate: addDays(startDate, days) } : item,
  )
  if (!writeJSON(MEMBERSHIPS_KEY, next)) throw new MembershipError('STORAGE', "Saqlab bo'lmadi")
}

// Qolgan tashriflar: a'zolik boshlanganidan beri o'tgan TASDIQLANGAN bronlardagi kishilar soni sarflangan hisoblanadi
export function membershipVisits(membership, bookings, now = new Date()) {
  const unlimited = membership.visitsTotal === null || membership.visitsTotal === undefined
  const digits = digitsOnly(membership.phone)
  const startsFrom = membership.startDate ? new Date(`${membership.startDate}T00:00:00`) : null

  const used =
    startsFrom === null
      ? 0
      : bookings
          .filter((booking) => digitsOnly(booking.phone) === digits && booking.status === 'confirmed')
          .filter((booking) => {
            const startsAt = new Date(booking.startsAt)
            return startsAt >= startsFrom && startsAt <= now
          })
          .reduce((sum, booking) => sum + booking.people, 0)

  return {
    unlimited,
    total: unlimited ? null : membership.visitsTotal,
    used,
    left: unlimited ? null : Math.max(membership.visitsTotal - used, 0),
  }
}
