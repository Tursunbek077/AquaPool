// Jadvalni sana bo'yicha slotlarga aylantiradi va har bir slot uchun bo'sh joylarni hisoblaydi.
// 6-bosqichda shu fayl Supabase so'roviga o'tadi; sahifalar faqat shu funksiyalarni chaqiradi.

import { initialCoaches } from '../data/initialCoaches'
import { SCHEDULE_DAYS, TIME_BANDS, scheduleTemplates } from '../data/initialSchedule'
import { initialServices } from '../data/initialServices'
import { calcCapacity, countActivePeople } from '../utils/capacity'
import { addDays, daysBetween, isValidISODate, timeToMinutes, toDateTime, toISODate } from '../utils/dates'

const SLOT_SEPARATOR = '@'

export function makeSlotId(templateId, date) {
  return `${templateId}${SLOT_SEPARATOR}${date}`
}

export function parseSlotId(slotId) {
  const [templateId, date] = String(slotId).split(SLOT_SEPARATOR)
  return { templateId, date }
}

export function todayISO() {
  return toISODate(new Date())
}

// Bugundan boshlab ochiq kunlar ro'yxati
export function getScheduleDates() {
  const today = todayISO()
  return Array.from({ length: SCHEDULE_DAYS }, (_, index) => addDays(today, index))
}

export function isDateInSchedule(date) {
  if (!isValidISODate(date)) return false
  const diff = daysBetween(todayISO(), date)
  return diff >= 0 && diff < SCHEDULE_DAYS
}

function hashString(text) {
  return [...text].reduce((sum, char) => sum + char.charCodeAt(0), 0)
}

// Boshqa mijozlar band qilgan joylar. Bugun Figma'dagi qiymatlar, boshqa kunlarda biroz o'zgaradi.
function baseBookedFor(template, date) {
  if (template.alwaysFull) return template.capacity
  const offset = daysBetween(todayISO(), date)
  if (offset === 0) return template.baseBooked
  const adjust = ((offset * 3 + hashString(template.id)) % 5) - 2
  return Math.min(Math.max(template.baseBooked + adjust, 0), template.capacity - 1)
}

function buildSlot(template, date, bookings, now) {
  const slotId = makeSlotId(template.id, date)
  const booked = baseBookedFor(template, date) + countActivePeople(bookings, slotId)
  const startsAt = toDateTime(date, template.start)

  return {
    slotId,
    templateId: template.id,
    date,
    start: template.start,
    end: template.end,
    startMinutes: timeToMinutes(template.start),
    startsAt: startsAt.toISOString(),
    title: template.title,
    description: template.description,
    lane: template.lane,
    gender: template.gender,
    coach: initialCoaches.find((coach) => coach.id === template.coachId) ?? null,
    service: initialServices.find((service) => service.id === template.serviceId) ?? null,
    isPast: startsAt.getTime() <= now.getTime(),
    ...calcCapacity(template.capacity, booked),
  }
}

export function getSlotsForDate(date, bookings, now = new Date()) {
  return scheduleTemplates
    .map((template) => buildSlot(template, date, bookings, now))
    .sort((a, b) => a.startMinutes - b.startMinutes)
}

// slotId bo'yicha bitta slot. Jadvalda yo'q yoki sanasi noto'g'ri bo'lsa null.
export function getSlotById(slotId, bookings, now = new Date()) {
  const { templateId, date } = parseSlotId(slotId)
  const template = scheduleTemplates.find((item) => item.id === templateId)
  if (!template || !isDateInSchedule(date)) return null
  return buildSlot(template, date, bookings, now)
}

export function inTimeBand(slot, bandValue) {
  const band = TIME_BANDS.find((item) => item.value === bandValue)
  if (!band) return true
  return slot.startMinutes >= band.from && slot.startMinutes < band.to
}

// Jadvaldagi xizmat turlari (filtr uchun)
export function getScheduleServices() {
  const ids = new Set(scheduleTemplates.map((template) => template.serviceId))
  return initialServices.filter((service) => ids.has(service.id))
}
