import { useState } from 'react'
import { sendCallbackRequest } from '../../services/contactService'
import { formatPhoneInput } from '../../utils/formatters'
import { isValidUzPhone } from '../../utils/validators'
import { Button, Input } from '../common'

// Telefon qoldirish formasi (bosh sahifa va Narxlar sahifasidagi to'q bannerlar uchun).
// layout="stacked": ustma-ust (bosh sahifa), "inline": yonma-yon (Narxlar).
export default function CallbackForm({ source, buttonLabel, layout = 'stacked', note }) {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done

  async function handleSubmit(event) {
    event.preventDefault()
    if (!isValidUzPhone(phone)) {
      setError("Telefon raqamni to'liq kiriting: +998 90 123-45-67")
      return
    }
    setError('')
    setStatus('sending')
    await sendCallbackRequest({ phone, source })
    setStatus('done')
    setPhone('')
  }

  if (status === 'done') {
    return (
      <p role="status" className="rounded-xl bg-white/10 p-4 text-sm font-semibold text-white">
        Rahmat! Operatorimiz 10 daqiqa ichida siz bilan bog'lanadi.
      </p>
    )
  }

  const inline = layout === 'inline'

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <div className={inline ? 'flex flex-col gap-3 sm:flex-row sm:items-start' : 'flex flex-col gap-3'}>
        <Input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          aria-label="Telefon raqamingiz"
          label={inline ? undefined : 'Telefon raqamingiz'}
          placeholder="+998 (__) ___-__-__"
          value={phone}
          onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
          error={error}
          className="flex-1 [&_label]:text-white"
        />
        <Button type="submit" variant={inline ? 'dark' : 'primary'} loading={status === 'sending'} size="md">
          {buttonLabel}
        </Button>
      </div>
      {note && <p className="text-xs text-aqua-400">{note}</p>}
    </form>
  )
}
