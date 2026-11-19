import { useState } from 'react'
import { Banknote, CircleAlert, ImageUp, Receipt } from 'lucide-react'
import { YEARLY_DISCOUNT } from '../../data/initialServices'
import { requestMembership, tariffTotal } from '../../services/membershipService'
import { cn } from '../../utils/cn'
import { formatPrice } from '../../utils/formatters'
import { readImageAsDataURL } from '../../utils/image'
import { Badge, Button, Card } from '../common'

const METHODS = [
  { value: 'onsite', icon: Banknote, title: "Joyida to'lash", text: "Resepsiyada naqd yoki karta orqali." },
  { value: 'receipt', icon: Receipt, title: 'Karta chekini yuklash', text: "Kartaga o'tkazib, chek rasmini yuklaysiz." },
]

// Tanlangan tarif uchun a'zolik so'rovi. Tarif Narxlar sahifasidan ?tarif=<id> orqali keladi.
export default function MembershipRequestForm({ tariff, profile, onDone, onCancel }) {
  const [billing, setBilling] = useState('monthly')
  const [method, setMethod] = useState('onsite')
  const [receipt, setReceipt] = useState(null) // { dataUrl, name }
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleFile(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setError('')
    try {
      setReceipt({ dataUrl: await readImageAsDataURL(file, { maxSize: 1000, quality: 0.72 }), name: file.name })
    } catch (err) {
      setReceipt(null)
      setError(err.message)
    } finally {
      event.target.value = ''
    }
  }

  async function handleSubmit() {
    setError('')
    setSubmitting(true)
    try {
      const created = await requestMembership({
        tariffId: tariff.id,
        billing,
        method,
        name: profile.name,
        phone: profile.phone,
        receiptDataUrl: method === 'receipt' ? receipt?.dataUrl : undefined,
        receiptName: receipt?.name,
      })
      onDone(created)
    } catch (err) {
      setError(err?.message || "So'rovni yuborib bo'lmadi, qayta urinib ko'ring.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card tone="featured" padding="lg">
      <p className="text-xs font-bold uppercase tracking-widest text-ocean-600">A'zolik so'rovi</p>
      <h2 className="mt-1 text-2xl font-extrabold">
        {tariff.name} <span className="text-base font-medium text-navy-500">— {tariff.label}</span>
      </h2>
      <p className="mt-1 text-sm text-navy-500">{tariff.description}</p>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-bold">To'lov davri</legend>
        <div className="inline-flex rounded-xl bg-aqua-200 p-1">
          {[
            { value: 'monthly', label: "Oylik to'lov" },
            { value: 'yearly', label: "Yillik to'lov" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={billing === option.value}
              onClick={() => setBilling(option.value)}
              className={cn(
                'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors',
                billing === option.value ? 'bg-white shadow-sm' : 'text-navy-700',
              )}
            >
              {option.label}
              {option.value === 'yearly' && (
                <Badge variant="ocean" size="sm">
                  -{YEARLY_DISCOUNT * 100}%
                </Badge>
              )}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-bold">To'lov usuli</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {METHODS.map(({ value, icon: Icon, title, text }) => (
            <label
              key={value}
              className={cn(
                'flex cursor-pointer gap-3 rounded-xl border-2 p-3.5 transition-colors',
                method === value ? 'border-ocean-600 bg-ocean-100/50' : 'border-aqua-300 hover:border-aqua-400',
              )}
            >
              <input
                type="radio"
                name="membership-method"
                value={value}
                checked={method === value}
                onChange={() => setMethod(value)}
                className="sr-only"
              />
              <Icon className="mt-0.5 size-5 shrink-0 text-ocean-600" aria-hidden="true" />
              <span>
                <span className="block text-sm font-bold">{title}</span>
                <span className="mt-0.5 block text-xs text-navy-500">{text}</span>
              </span>
            </label>
          ))}
        </div>

        {method === 'receipt' && (
          <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-aqua-400 bg-aqua-100 p-3 text-sm">
            <ImageUp className="size-5 shrink-0 text-ocean-600" aria-hidden="true" />
            <span className="flex-1 font-semibold">
              {receipt ? receipt.name : 'Chek rasmini hozir yuklash (keyinroq ham yuklash mumkin)'}
            </span>
            <input type="file" accept="image/*" onChange={handleFile} className="sr-only" aria-label="Chek rasmini tanlash" />
          </label>
        )}
      </fieldset>

      <div className="mt-5 flex items-center justify-between rounded-xl bg-aqua-100 p-4">
        <span className="text-sm text-navy-500">Jami to'lov ({billing === 'yearly' ? '12 oy' : '1 oy'})</span>
        <span className="font-display text-xl font-extrabold text-ocean-700">{formatPrice(tariffTotal(tariff, billing))} so'm</span>
      </div>

      {error && (
        <p role="alert" className="mt-4 flex gap-2 rounded-xl bg-danger-50 p-3 text-sm font-semibold text-danger-600">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <div className="mt-5 flex flex-wrap justify-end gap-3">
        <Button variant="soft" onClick={onCancel} disabled={submitting}>
          Bekor qilish
        </Button>
        <Button onClick={handleSubmit} loading={submitting}>
          So'rov yuborish
        </Button>
      </div>
    </Card>
  )
}
