import { useState } from 'react'
import { UserRound } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { formatPhoneInput } from '../../utils/formatters'
import { isFilled, isValidUzPhone } from '../../utils/validators'
import { Button, Card, Input } from '../common'

// Kabinetga kirish: hozircha faqat ism va telefon (bronlar telefon bo'yicha topiladi).
// Haqiqiy akkaunt (login/parol) 6-bosqichda qo'shiladi.
export default function ProfileGate() {
  const { save } = useProfile()
  const [values, setValues] = useState({ name: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [saveError, setSaveError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    if (!isFilled(values.name, 2)) next.name = 'Ismingizni kiriting'
    if (!isValidUzPhone(values.phone)) next.phone = "Telefon raqamni to'liq kiriting: +998 90 123-45-67"
    setErrors(next)
    if (Object.keys(next).length > 0) return
    try {
      save({ name: values.name.trim(), phone: values.phone })
    } catch (error) {
      setSaveError(error.message)
    }
  }

  return (
    <Card padding="lg" className="mx-auto max-w-md">
      <span className="flex size-12 items-center justify-center rounded-xl bg-aqua-200 text-ocean-600">
        <UserRound className="size-6" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-2xl font-extrabold tracking-tight">Kabinetga kirish</h2>
      <p className="mb-5 mt-1 text-sm text-navy-500">
        Bronlaringizni ko'rish uchun bron qilgan ism va telefon raqamingizni kiriting. Bronlar telefon raqami bo'yicha
        topiladi. Login va parol tizimi keyinroq qo'shiladi.
      </p>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <Input
          label="Ism va familiyangiz"
          autoComplete="name"
          value={values.name}
          onChange={(e) => setValues((prev) => ({ ...prev, name: e.target.value }))}
          error={errors.name}
        />
        <Input
          label="Telefon raqamingiz"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+998 90 123-45-67"
          value={values.phone}
          onChange={(e) => setValues((prev) => ({ ...prev, phone: formatPhoneInput(e.target.value) }))}
          error={errors.phone}
        />
        {saveError && (
          <p role="alert" className="text-sm font-semibold text-danger-600">
            {saveError}
          </p>
        )}
        <Button type="submit" size="lg">
          Kabinetga kirish
        </Button>
      </form>
    </Card>
  )
}
