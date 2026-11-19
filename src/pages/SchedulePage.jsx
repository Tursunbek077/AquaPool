import { useCallback, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { CalendarCheck, Clock, FileText, Gauge, Phone, ShieldCheck, Thermometer, Waves, Wind } from 'lucide-react'
import { BookingStepper, DayTabs, ScheduleFilters, TimeSlotGrid } from '../components/booking'
import CoachCard from '../components/cards/CoachCard'
import { Badge, Button, Card, PageHeader, Section, SectionHeading } from '../components/common'
import { initialCoaches } from '../data/initialCoaches'
import { FREE_CANCEL_HOURS, GENDER_OPTIONS, TIME_BANDS } from '../data/initialSchedule'
import { useBookings } from '../hooks/useBookings'
import { getScheduleDates, getScheduleServices, getSlotsForDate, inTimeBand, isDateInSchedule, todayISO } from '../services/scheduleService'
import { weekdayName } from '../utils/dates'

const SERVICES = getScheduleServices()
const FILTER_KEYS = ['xizmat', 'murabbiy', 'vaqt', 'jins']

// URL'dan kelgan qiymatlar noto'g'ri bo'lsa (masalan, qo'lda yozilgan) e'tiborga olinmaydi.
function readFilters(params) {
  const xizmat = params.get('xizmat') ?? ''
  const murabbiy = params.get('murabbiy') ?? ''
  const vaqt = params.get('vaqt') ?? ''
  const jins = params.get('jins') ?? ''
  return {
    xizmat: SERVICES.some((service) => service.id === xizmat) ? xizmat : '',
    murabbiy: initialCoaches.some((coach) => coach.id === murabbiy) ? murabbiy : '',
    vaqt: TIME_BANDS.some((band) => band.value === vaqt) ? vaqt : '',
    jins: Object.hasOwn(GENDER_OPTIONS, jins) ? jins : '',
  }
}

function TelemetryBar() {
  const items = [
    { icon: Thermometer, text: 'Suv harorati: ', value: '27.8°C' },
    { icon: Wind, text: 'Havo harorati: ', value: '28.5°C' },
    { icon: Gauge, text: 'pH darajasi: ', value: '7.2 (Ideal)' },
  ]
  return (
    <div className="border-b border-aqua-300 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2.5 text-xs text-navy-700 sm:px-8">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <li className="flex items-center gap-1.5 font-semibold">
            <span className="size-2 rounded-full bg-success-600" aria-hidden="true" />
            Jonli hovuz telemetriyasi
          </li>
          {items.map(({ icon: Icon, text, value }) => (
            <li key={text} className="flex items-center gap-1.5">
              <Icon className="size-3.5 text-ocean-600" aria-hidden="true" />
              {text}
              <strong className="text-navy-900">{value}</strong>
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-1.5">
          <Waves className="size-3.5 text-ocean-600" aria-hidden="true" />8 ta yo'lak faol rejimda
        </p>
      </div>
    </div>
  )
}

export default function SchedulePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { bookings } = useBookings()
  const [selectedSlotId, setSelectedSlotId] = useState(null)

  const today = todayISO()
  const dates = getScheduleDates()
  const dateParam = searchParams.get('sana') ?? ''
  const date = isDateInSchedule(dateParam) ? dateParam : today
  const filters = readFilters(searchParams)
  const hasFilters = FILTER_KEYS.some((key) => filters[key] !== '')

  const allSlots = getSlotsForDate(date, bookings)
  const slots = allSlots.filter(
    (slot) =>
      (!filters.xizmat || slot.service?.id === filters.xizmat) &&
      (!filters.murabbiy || slot.coach?.id === filters.murabbiy) &&
      (!filters.vaqt || inTimeBand(slot, filters.vaqt)) &&
      (!filters.jins || slot.gender === filters.jins),
  )
  const selectedSlot = selectedSlotId ? allSlots.find((slot) => slot.slotId === selectedSlotId) : null

  const updateParams = useCallback(
    (changes) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          Object.entries(changes).forEach(([key, value]) => {
            if (value) next.set(key, value)
            else next.delete(key)
          })
          return next
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  const closeModal = useCallback(() => setSelectedSlotId(null), [])

  const dayLabel = date === today ? 'Bugun' : weekdayName(date)

  return (
    <>
      <TelemetryBar />
      <PageHeader
        eyebrow={
          <Badge variant="neutral">
            <CalendarCheck className="size-3.5" aria-hidden="true" />
            HAFTALIK INTERAKTIV JADVAL
          </Badge>
        }
        title="Mashg'ulotlar jadvali va Onlayn bron"
        description="O'zingizga qulay vaqt va murabbiy bilan mashg'ulotni bir necha soniyada bron qiling. Har bir mashg'ulot litsenziyalangan murabbiylar tomonidan nazorat qilinadi."
        aside={
          <div className="flex w-full flex-col gap-2 sm:w-72">
            <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card">
              <span className="flex size-10 items-center justify-center rounded-xl bg-aqua-200 text-ocean-600">
                <Clock className="size-5" aria-hidden="true" />
              </span>
              <p className="text-xs text-navy-500">
                Ish vaqti
                <strong className="block font-display text-lg text-navy-900">06:00 — 23:00</strong>
              </p>
              <Badge variant="ocean" size="sm" className="ml-auto">
                Har kuni
              </Badge>
            </div>
            <p className="flex items-center gap-2 rounded-xl bg-ocean-600 px-4 py-3 text-sm font-bold text-white">
              <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
              Bepul bekor qilish: {FREE_CANCEL_HOURS} soat oldin
            </p>
          </div>
        }
      >
        <div className="mt-8">
          <DayTabs dates={dates} today={today} selected={date} onSelect={(next) => updateParams({ sana: next === today ? '' : next })} />
          <ScheduleFilters
            value={filters}
            services={SERVICES}
            coaches={initialCoaches}
            onChange={updateParams}
            onReset={() => updateParams({ xizmat: '', murabbiy: '', vaqt: '', jins: '' })}
          />
        </div>
      </PageHeader>

      <Section id="slotlar" tone="aqua" className="pt-8 sm:pt-10">
        <SectionHeading
          align="left"
          title="Mavjud mashg'ulot slotlari"
          description={`${dayLabel} uchun ${allSlots.length} ta qat'iy rejalashtirilgan mashg'ulot${hasFilters ? ` (filtr bo'yicha ${slots.length} ta)` : ''}`}
          action={
            <ul className="flex items-center gap-4 rounded-full bg-white px-4 py-2 text-xs font-semibold text-navy-700">
              <li className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-ocean-600" aria-hidden="true" /> Mavjud
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-danger-600" aria-hidden="true" /> Joy to'lgan
              </li>
            </ul>
          }
        />

        {slots.length === 0 ? (
          <Card tone="soft" padding="lg" className="mx-auto max-w-lg text-center">
            <p className="font-display text-xl font-bold">Bu tanlov bo'yicha mashg'ulot topilmadi</p>
            <p className="mt-1 text-sm text-navy-500">Boshqa kunni tanlang yoki filtrlarni tozalang.</p>
            <Button
              className="mt-4"
              onClick={() => updateParams({ xizmat: '', murabbiy: '', vaqt: '', jins: '' })}
            >
              Filtrlarni tozalash
            </Button>
          </Card>
        ) : (
          <TimeSlotGrid slots={slots} onBook={(slot) => setSelectedSlotId(slot.slotId)} />
        )}
      </Section>

      <Section tone="soft">
        <SectionHeading
          align="left"
          eyebrow="Tajribali murabbiylar"
          title="Bizning ustozlar jamoasi"
          description="Har bir murabbiy xalqaro xavfsizlik sertifikatiga va professional sport tajribasiga ega."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {initialCoaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} variant="compact" />
          ))}
        </div>
      </Section>

      <Section tone="white" className="py-12 sm:py-16">
        <div className="flex flex-col gap-5 rounded-3xl bg-aqua-100 p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-ocean-600 text-white">
            <FileText className="size-7" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <h2 className="text-xl font-extrabold tracking-tight">Shaffof va kafolatlangan bron shartlari</h2>
            <p className="mt-1 text-sm leading-relaxed text-navy-700">
              <strong>Bron qilish mutlaqo bepul.</strong> To'lovni markazimiz resepsiyasiga kelganda yoki shaxsiy
              kabinetingiz orqali amalga oshirishingiz mumkin. Kutilmagan rejalaringiz chiqib qolsa, mashg'ulot
              boshlanishiga <strong>{FREE_CANCEL_HOURS} soat qolgunga qadar</strong> jarimasiz va bepul bekor qilish
              imkoniyati mavjud.
            </p>
          </div>
          <Button as={Link} to="/aloqa#faq" variant="soft" leftIcon={<Phone className="size-4" />}>
            Savollar uchun
          </Button>
        </div>
      </Section>

      {selectedSlot && <BookingStepper key={selectedSlot.slotId} slot={selectedSlot} onClose={closeModal} />}
    </>
  )
}
