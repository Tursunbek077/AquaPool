import { useState } from 'react'
import { Link } from 'react-router'
import { Banknote, CalendarDays, Check, CircleAlert, Clock, Copy, Minus, Plus, Receipt, User } from 'lucide-react'
import { GENDER_OPTIONS, MAX_PEOPLE_PER_BOOKING } from '../../data/initialSchedule'
import { useBookings } from '../../hooks/useBookings'
import { cn } from '../../utils/cn'
import { longDate, weekdayName } from '../../utils/dates'
import { formatPhoneInput, formatPrice } from '../../utils/formatters'
import { isFilled, isValidUzPhone } from '../../utils/validators'
import { Button, Input, Modal, Textarea } from '../common'

const STEPS = ["Mashg'ulot", "Ma'lumotlar", 'Tasdiq']

const PAYMENT_OPTIONS = [
  {
    value: 'onsite',
    icon: Banknote,
    title: "Joyida to'lash",
    text: "Markaz resepsiyasida naqd yoki karta orqali to'laysiz.",
  },
  {
    value: 'receipt',
    icon: Receipt,
    title: 'Karta chekini yuklash',
    text: "Kartaga o'tkazib, chek rasmini shaxsiy kabinetdagi \"A'zolik va to'lovlar\" bo'limiga yuklaysiz.",
  },
]

function StepIndicator({ step }) {
  return (
    <ol className="mb-6 flex items-center gap-2" aria-label="Bron bosqichlari">
      {STEPS.map((label, index) => {
        const number = index + 1
        const done = step > number
        const current = step === number
        return (
          <li key={label} className="flex flex-1 items-center gap-2" aria-current={current ? 'step' : undefined}>
            <span
              className={cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                done || current ? 'bg-ocean-600 text-white' : 'bg-aqua-300 text-navy-500',
              )}
            >
              {done ? <Check className="size-4" aria-hidden="true" /> : number}
            </span>
            <span className={cn('hidden text-xs font-semibold sm:block', current ? 'text-navy-900' : 'text-navy-500')}>
              {label}
            </span>
            {number < STEPS.length && <span className="h-px flex-1 bg-aqua-400" aria-hidden="true" />}
          </li>
        )
      })}
    </ol>
  )
}

function SummaryRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <Icon className="mt-0.5 size-4 shrink-0 text-ocean-600" aria-hidden="true" />
      <div>
        <p className="text-xs text-navy-500">{label}</p>
        <p className="font-semibold">{children}</p>
      </div>
    </div>
  )
}

function SlotSummary({ slot, people }) {
  return (
    <div className="grid gap-3 rounded-xl bg-aqua-100 p-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <p className="font-display text-lg font-bold leading-snug">{slot.title}</p>
        <p className="text-xs font-semibold text-ocean-700">
          {slot.lane} · {GENDER_OPTIONS[slot.gender].label}
        </p>
      </div>
      <SummaryRow icon={CalendarDays} label="Sana">
        {weekdayName(slot.date)}, {longDate(slot.date)}
      </SummaryRow>
      <SummaryRow icon={Clock} label="Vaqt">
        {slot.start} - {slot.end}
      </SummaryRow>
      {slot.coach && (
        <SummaryRow icon={User} label="Murabbiy">
          {slot.coach.name}
        </SummaryRow>
      )}
      <SummaryRow icon={User} label="Kishilar soni">
        {people} kishi
      </SummaryRow>
    </div>
  )
}

function SuccessView({ booking, slot, onCopy, copied }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-success-50 text-success-600">
        <Check className="size-8" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-2xl font-extrabold">Bron qabul qilindi!</h3>
      <p className="mt-1 text-sm text-navy-500">
        Bron #{booking.number} · holati: <strong className="text-warning-600">Kutilmoqda</strong>
      </p>

      <div className="mt-5 w-full rounded-2xl border-2 border-dashed border-ocean-300 bg-aqua-100 p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-navy-500">Tasdiq kodingiz</p>
        <p className="mt-2 font-mono text-4xl font-extrabold tracking-[0.25em] text-ocean-700" aria-label={`Kod: ${booking.code.split('').join(' ')}`}>
          {booking.code}
        </p>
        <button
          type="button"
          onClick={onCopy}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-ocean-700 hover:text-ocean-900"
        >
          <Copy className="size-3.5" aria-hidden="true" />
          {copied ? 'Nusxalandi' : 'Kodni nusxalash'}
        </button>
      </div>

      <div className="mt-4 w-full text-left">
        <SlotSummary slot={slot} people={booking.people} />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-navy-500">
        Mashg'ulotga kelganda shu kodni resepsiyada ko'rsating. Administrator tasdiqlagach, holat "Tasdiqlandi" bo'ladi.
        Bepul bekor qilish: mashg'ulotga 2 soat qolgunga qadar.
      </p>
    </div>
  )
}

// 3 qadamli bron: 1) mashg'ulot va kishilar soni, 2) ma'lumotlar, 3) to'lov usuli va tasdiq.
export default function BookingStepper({ slot, onClose }) {
  const { create } = useBookings()
  const [step, setStep] = useState(1)
  const [people, setPeople] = useState(1)
  const [form, setForm] = useState({ name: '', phone: '', comment: '' })
  const [payment, setPayment] = useState('onsite')
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [booking, setBooking] = useState(null)
  const [copied, setCopied] = useState(false)

  const maxPeople = Math.max(Math.min(MAX_PEOPLE_PER_BOOKING, slot.spotsLeft), 1)
  const effectivePeople = Math.min(people, maxPeople)
  const service = slot.service

  function setField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function goNext() {
    if (step === 2) {
      const next = {}
      if (!isFilled(form.name, 2)) next.name = 'Ismingizni kiriting'
      if (!isValidUzPhone(form.phone)) next.phone = "Telefon raqamni to'liq kiriting: +998 90 123-45-67"
      setErrors(next)
      if (Object.keys(next).length > 0) return
    }
    setStep((current) => current + 1)
  }

  async function handleSubmit() {
    setSubmitError('')
    setSubmitting(true)
    try {
      const created = await create({
        slotId: slot.slotId,
        people: effectivePeople,
        name: form.name,
        phone: form.phone,
        comment: form.comment,
        payment,
      })
      setBooking(created)
    } catch (error) {
      setSubmitError(error?.message || "Bron qilib bo'lmadi, qayta urinib ko'ring.")
    } finally {
      setSubmitting(false)
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(booking.code)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  let footer
  if (booking) {
    footer = (
      <>
        <Button variant="soft" onClick={onClose}>
          Yopish
        </Button>
        <Button as={Link} to="/kabinet/bronlar" onClick={onClose}>
          Mening bronlarim
        </Button>
      </>
    )
  } else {
    footer = (
      <>
        <Button variant="soft" onClick={step === 1 ? onClose : () => setStep(step - 1)} disabled={submitting}>
          {step === 1 ? 'Bekor qilish' : 'Orqaga'}
        </Button>
        {step < 3 ? (
          <Button onClick={goNext}>Davom etish</Button>
        ) : (
          <Button onClick={handleSubmit} loading={submitting}>
            Bronni tasdiqlash
          </Button>
        )}
      </>
    )
  }

  return (
    <Modal open onClose={onClose} title={booking ? 'Bron natijasi' : "Mashg'ulotga bron qilish"} footer={footer}>
      {booking ? (
        <SuccessView booking={booking} slot={slot} onCopy={copyCode} copied={copied} />
      ) : (
        <>
          <StepIndicator step={step} />

          {step === 1 && (
            <div className="flex flex-col gap-5">
              <SlotSummary slot={slot} people={effectivePeople} />
              <div className="flex items-center justify-between gap-4 rounded-xl border border-aqua-300 p-4">
                <div>
                  <p className="text-sm font-bold">Kishilar soni</p>
                  <p className="text-xs text-navy-500">
                    Bo'sh joy: {slot.spotsLeft} ta. Bir bronda ko'pi bilan {MAX_PEOPLE_PER_BOOKING} kishi.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Kamaytirish"
                    onClick={() => setPeople(Math.max(effectivePeople - 1, 1))}
                    disabled={effectivePeople <= 1}
                    className="flex size-9 items-center justify-center rounded-lg bg-aqua-300 transition-colors hover:bg-aqua-400 disabled:opacity-40"
                  >
                    <Minus className="size-4" aria-hidden="true" />
                  </button>
                  <output aria-live="polite" className="w-6 text-center font-display text-xl font-extrabold">
                    {effectivePeople}
                  </output>
                  <button
                    type="button"
                    aria-label="Ko'paytirish"
                    onClick={() => setPeople(Math.min(effectivePeople + 1, maxPeople))}
                    disabled={effectivePeople >= maxPeople}
                    className="flex size-9 items-center justify-center rounded-lg bg-aqua-300 transition-colors hover:bg-aqua-400 disabled:opacity-40"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <Input
                label="Ism va familiyangiz"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                error={errors.name}
              />
              <Input
                label="Telefon raqamingiz"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+998 90 123-45-67"
                value={form.phone}
                onChange={(e) => setField('phone', formatPhoneInput(e.target.value))}
                error={errors.phone}
                hint="Administrator shu raqam orqali bron holatini bildiradi"
              />
              <Textarea
                label="Izoh (ixtiyoriy)"
                rows={3}
                value={form.comment}
                onChange={(e) => setField('comment', e.target.value)}
                placeholder="Masalan: bola 7 yoshda, suzishni bilmaydi"
              />
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-5">
              <SlotSummary slot={slot} people={effectivePeople} />

              <fieldset>
                <legend className="mb-2 text-sm font-bold">To'lov usuli</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PAYMENT_OPTIONS.map(({ value, icon: Icon, title, text }) => (
                    <label
                      key={value}
                      className={cn(
                        'flex cursor-pointer gap-3 rounded-xl border-2 p-3.5 transition-colors',
                        payment === value ? 'border-ocean-600 bg-ocean-100/50' : 'border-aqua-300 hover:border-aqua-400',
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={value}
                        checked={payment === value}
                        onChange={() => setPayment(value)}
                        className="sr-only"
                      />
                      <Icon className="mt-0.5 size-5 shrink-0 text-ocean-600" aria-hidden="true" />
                      <span>
                        <span className="block text-sm font-bold">{title}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-navy-500">{text}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <dl className="flex flex-col gap-1.5 rounded-xl bg-aqua-100 p-4 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-navy-500">Mijoz</dt>
                  <dd className="text-right font-semibold">
                    {form.name.trim()}, {form.phone}
                  </dd>
                </div>
                {service && (
                  <div className="flex justify-between gap-3">
                    <dt className="text-navy-500">Narxi ({effectivePeople} kishi)</dt>
                    <dd className="font-bold text-ocean-700">
                      {formatPrice(service.price * effectivePeople)} {service.priceNote}
                    </dd>
                  </div>
                )}
                <p className="pt-1 text-xs text-navy-500">Bron qilish bepul. Narx mashg'ulot uchun to'lovni bildiradi.</p>
              </dl>

              {submitError && (
                <p role="alert" className="flex gap-2 rounded-xl bg-danger-50 p-3 text-sm font-semibold text-danger-600">
                  <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {submitError}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </Modal>
  )
}
