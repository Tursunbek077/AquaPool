import { useState } from 'react'
import { useNavigate } from 'react-router'
import { CircleCheck, KeyRound, LogOut, Trash2, Upload } from 'lucide-react'
import { Button, Card, Input } from '../components/common'
import { useProfile } from '../hooks/useProfile'
import { formatPhoneInput, initialsOf } from '../utils/formatters'
import { readImageAsDataURL } from '../utils/image'
import { isFilled, isValidUzPhone } from '../utils/validators'

const MIN_PASSWORD_LENGTH = 8

function PersonalCard() {
  const { profile, save } = useProfile()
  const [values, setValues] = useState({ name: profile.name, phone: profile.phone })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState({ type: '', text: '' })

  async function handleAvatar(event) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const avatar = await readImageAsDataURL(file, { maxSize: 256, quality: 0.8 })
      save({ avatar })
      setMessage({ type: 'ok', text: 'Rasm yangilandi' })
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      event.target.value = ''
    }
  }

  function removeAvatar() {
    try {
      save({ avatar: '' })
      setMessage({ type: 'ok', text: "Rasm o'chirildi" })
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    if (!isFilled(values.name, 2)) next.name = 'Ismingizni kiriting'
    if (!isValidUzPhone(values.phone)) next.phone = "Telefon raqamni to'liq kiriting: +998 90 123-45-67"
    setErrors(next)
    if (Object.keys(next).length > 0) return
    try {
      save({ name: values.name.trim(), phone: values.phone })
      setMessage({ type: 'ok', text: "Ma'lumotlar saqlandi" })
    } catch (error) {
      setMessage({ type: 'error', text: error.message })
    }
  }

  return (
    <Card padding="lg">
      <h2 className="text-xl font-extrabold tracking-tight">Shaxsiy ma'lumotlar</h2>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        {profile.avatar ? (
          <img src={profile.avatar} alt="Profil rasmi" className="size-20 rounded-full border border-aqua-300 object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-20 items-center justify-center rounded-full bg-ocean-600 font-display text-2xl font-extrabold text-white"
          >
            {initialsOf(profile.name)}
          </span>
        )}
        <div className="flex flex-wrap gap-2">
          <label className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg bg-aqua-300 px-3 text-sm font-semibold transition-colors hover:bg-aqua-400">
            <Upload className="size-4" aria-hidden="true" />
            Rasm tanlash
            <input type="file" accept="image/*" onChange={handleAvatar} className="sr-only" aria-label="Profil rasmini tanlash" />
          </label>
          {profile.avatar && (
            <Button variant="ghost" size="sm" onClick={removeAvatar} leftIcon={<Trash2 className="size-4" />}>
              O'chirish
            </Button>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
        <Input
          label="Ism va familiyangiz (F.I.Sh.)"
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
          value={values.phone}
          onChange={(e) => setValues((prev) => ({ ...prev, phone: formatPhoneInput(e.target.value) }))}
          error={errors.phone}
          hint="Bronlaringiz shu raqam bo'yicha topiladi. O'zgartirsangiz, eski raqamdagi bronlar ko'rinmay qoladi."
        />
        {message.text && (
          <p
            role={message.type === 'error' ? 'alert' : 'status'}
            className={`flex items-center gap-2 text-sm font-semibold ${message.type === 'error' ? 'text-danger-600' : 'text-success-600'}`}
          >
            {message.type === 'ok' && <CircleCheck className="size-4" aria-hidden="true" />}
            {message.text}
          </p>
        )}
        <Button type="submit" className="self-start">
          Saqlash
        </Button>
      </form>
    </Card>
  )
}

function SecurityCard() {
  const [values, setValues] = useState({ current: '', next: '', repeat: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    if (!values.current) next.current = 'Joriy parolni kiriting'
    if (values.next.length < MIN_PASSWORD_LENGTH) next.next = `Yangi parol kamida ${MIN_PASSWORD_LENGTH} ta belgidan iborat bo'lsin`
    else if (values.next === values.current) next.next = 'Yangi parol joriy paroldan farq qilishi kerak'
    if (values.repeat !== values.next) next.repeat = 'Parollar bir xil emas'
    setErrors(next)
    setSent(false)
    if (Object.keys(next).length > 0) return
    // Parol hech qayerga saqlanmaydi: haqiqiy akkaunt (Supabase Auth) 6-bosqichda ulanadi.
    setValues({ current: '', next: '', repeat: '' })
    setSent(true)
  }

  return (
    <Card padding="lg">
      <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
        <KeyRound className="size-5 text-ocean-600" aria-hidden="true" />
        Xavfsizlik
      </h2>
      <p className="mt-1 text-sm text-navy-500">Parolni o'zgartirish.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
        <Input
          label="Joriy parol"
          type="password"
          autoComplete="current-password"
          value={values.current}
          onChange={(e) => setValues((prev) => ({ ...prev, current: e.target.value }))}
          error={errors.current}
        />
        <Input
          label="Yangi parol"
          type="password"
          autoComplete="new-password"
          value={values.next}
          onChange={(e) => setValues((prev) => ({ ...prev, next: e.target.value }))}
          error={errors.next}
        />
        <Input
          label="Yangi parolni takrorlang"
          type="password"
          autoComplete="new-password"
          value={values.repeat}
          onChange={(e) => setValues((prev) => ({ ...prev, repeat: e.target.value }))}
          error={errors.repeat}
        />
        {sent && (
          <p role="status" className="rounded-xl bg-warning-50 p-3 text-sm text-warning-600">
            Parol shakli to'g'ri, lekin hozircha o'zgartirilmadi: parol tizimi (login) hali ulanmagan. U keyingi bosqichda
            ishga tushadi.
          </p>
        )}
        <Button type="submit" variant="dark" className="self-start">
          Parolni o'zgartirish
        </Button>
      </form>
    </Card>
  )
}

export default function ProfilePage() {
  const { clear } = useProfile()
  const navigate = useNavigate()

  function handleSignOut() {
    clear()
    navigate('/')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <PersonalCard />
      <div className="flex flex-col gap-6">
        <SecurityCard />
        <Card tone="soft" padding="lg">
          <h2 className="text-xl font-extrabold tracking-tight">Profildan chiqish</h2>
          <p className="mb-4 mt-1 text-sm text-navy-500">
            Bu qurilmadan ism va telefoningiz o'chiriladi. Bronlaringiz saqlanib qoladi: qayta kirganingizda ko'rasiz.
          </p>
          <Button variant="soft" onClick={handleSignOut} leftIcon={<LogOut className="size-4" />}>
            Chiqish
          </Button>
        </Card>
      </div>
    </div>
  )
}
