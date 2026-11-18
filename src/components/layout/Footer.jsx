import { useState } from 'react'
import { Link } from 'react-router'
import { Camera, Clock, Globe, Mail, MapPin, Phone, Play, Send } from 'lucide-react'
import { footerInfo, footerServices } from '../../data/navigation'
import { siteInfo } from '../../data/siteInfo'
import { Button, Input } from '../common'
import Logo from './Logo'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CURRENT_YEAR = new Date().getFullYear()

const SOCIALS = [
  { label: 'Telegram', icon: Send },
  { label: 'Instagram', icon: Camera },
  { label: 'Veb-sayt', icon: Globe },
  { label: 'YouTube', icon: Play },
]

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-display text-base font-bold">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="text-sm text-navy-700 transition-colors hover:text-ocean-700">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function handleSubmit(event) {
    event.preventDefault()
    if (!EMAIL_RE.test(email.trim())) {
      setError("Email manzilni to'g'ri kiriting")
      setDone(false)
      return
    }
    // Obuna ma'lumoti 6-bosqichda (Supabase) saqlanadi; hozircha faqat tasdiq ko'rsatiladi.
    setError('')
    setDone(true)
    setEmail('')
  }

  return (
    <footer className="border-t border-aqua-300 bg-aqua-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-700">{siteInfo.tagline}</p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full bg-white text-navy-700 shadow-sm transition-colors hover:bg-ocean-600 hover:text-white"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Xizmatlar" links={footerServices} />
        <FooterColumn title="Ma'lumotlar" links={footerInfo} />

        <div>
          <h3 className="font-display text-base font-bold">Aloqa va Yangiliklar</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-navy-700">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-ocean-600" aria-hidden="true" />
              {siteInfo.address}
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-ocean-600" aria-hidden="true" />
              <a href={siteInfo.phoneHref} className="hover:text-ocean-700">
                {siteInfo.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-ocean-600" aria-hidden="true" />
              <a href={`mailto:${siteInfo.email}`} className="hover:text-ocean-700">
                {siteInfo.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-ocean-600" aria-hidden="true" />
              {siteInfo.workHours}
            </li>
          </ul>

          <form onSubmit={handleSubmit} noValidate className="mt-5">
            <p className="text-xs font-bold text-navy-900">Maxsus takliflarga obuna bo'ling</p>
            <div className="mt-2 flex items-start gap-2">
              <Input
                type="email"
                aria-label="Email manzilingiz"
                placeholder="Email manzilingiz"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                className="flex-1"
              />
              <Button type="submit">Yuborish</Button>
            </div>
            {done && (
              <p role="status" className="mt-2 text-xs font-semibold text-success-600">
                Rahmat! Obunangiz qabul qilindi.
              </p>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-aqua-300">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-navy-700 sm:flex-row sm:px-8">
          <p>© {CURRENT_YEAR} AquaPool. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-5">
            <Link to="/aloqa" className="hover:text-ocean-700">
              Foydalanish shartlari
            </Link>
            <Link to="/aloqa" className="hover:text-ocean-700">
              Maxfiylik
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
