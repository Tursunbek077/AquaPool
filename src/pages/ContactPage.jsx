import { useState } from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Accordion, Badge, Button, Card, Input, PageHeader, Section, SectionHeading, Textarea } from '../components/common'
import { initialFaq } from '../data/initialFaq'
import { siteInfo } from '../data/siteInfo'
import { sendContactMessage } from '../services/contactService'
import { formatPhoneInput } from '../utils/formatters'
import { isFilled, isValidUzPhone } from '../utils/validators'

const CONTACTS = [
  { icon: MapPin, label: 'Manzil', value: siteInfo.address },
  { icon: Phone, label: 'Telefon', value: siteInfo.phone, href: siteInfo.phoneHref },
  { icon: Mail, label: 'Email', value: siteInfo.email, href: `mailto:${siteInfo.email}` },
  { icon: Clock, label: 'Ish vaqti', value: siteInfo.workHours.replace('Har kuni: ', 'Har kuni, ') },
]

const MAP_SRC = `https://maps.google.com/maps?q=${encodeURIComponent('Amir Temur shoh ko\'chasi 45, Yunusobod, Toshkent')}&z=15&output=embed`

const EMPTY = { name: '', phone: '', message: '' }

function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done

  function setField(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const next = {}
    if (!isFilled(values.name, 2)) next.name = 'Ismingizni kiriting'
    if (!isValidUzPhone(values.phone)) next.phone = "Telefon raqamni to'liq kiriting: +998 90 123-45-67"
    if (!isFilled(values.message, 10)) next.message = 'Xabaringizni kamida 10 ta belgi bilan yozing'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setStatus('sending')
    await sendContactMessage(values)
    setStatus('done')
    setValues(EMPTY)
  }

  if (status === 'done') {
    return (
      <div role="status" className="rounded-2xl bg-success-50 p-6 text-success-600">
        <p className="font-display text-lg font-bold">Rahmat! Xabaringiz qabul qilindi.</p>
        <p className="mt-1 text-sm">Administratorimiz tez orada siz bilan bog'lanadi.</p>
        <Button variant="soft" size="sm" className="mt-4" onClick={() => setStatus('idle')}>
          Yana xabar yozish
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <Input
        label="Ismingiz"
        autoComplete="name"
        value={values.name}
        onChange={(e) => setField('name', e.target.value)}
        error={errors.name}
      />
      <Input
        label="Telefon raqamingiz"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="+998 90 123-45-67"
        value={values.phone}
        onChange={(e) => setField('phone', formatPhoneInput(e.target.value))}
        error={errors.phone}
      />
      <Textarea
        label="Xabar"
        value={values.message}
        onChange={(e) => setField('message', e.target.value)}
        error={errors.message}
      />
      <Button type="submit" loading={status === 'sending'} size="lg">
        Xabarni yuborish
      </Button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow={
          <Badge variant="ocean" dot>
            BIZ BILAN BOG'LANING
          </Badge>
        }
        title="Aloqa va ko'p beriladigan savollar"
        description="Savolingiz bormi? Telefon qiling, xabar yozing yoki to'g'ridan-to'g'ri markazimizga tashrif buyuring."
      />

      <Section tone="aqua" className="pt-6 sm:pt-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CONTACTS.map(({ icon: Icon, label, value, href }) => (
            <Card key={label} className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-aqua-200 text-ocean-600">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-navy-500">{label}</p>
                {href ? (
                  <a href={href} className="mt-0.5 block text-sm font-semibold hover:text-ocean-700">
                    {value}
                  </a>
                ) : (
                  <p className="mt-0.5 text-sm font-semibold">{value}</p>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="overflow-hidden rounded-2xl border border-aqua-300 shadow-card">
            <iframe
              title="AquaPool markazi xaritada"
              src={MAP_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full border-0 lg:h-full lg:min-h-[26rem]"
            />
          </div>
          <Card padding="lg">
            <h2 className="text-2xl font-extrabold tracking-tight">Fikr-mulohaza qoldiring</h2>
            <p className="mb-5 mt-1 text-sm text-navy-500">Xabaringizga tez orada javob beramiz.</p>
            <ContactForm />
          </Card>
        </div>
      </Section>

      <Section id="faq" tone="white">
        <SectionHeading
          eyebrow="Savollaringiz bormi?"
          title="Ko'p beriladigan savollar"
          description="Eng muhim 10 ta savolga aniq javoblar."
        />
        <div className="mx-auto max-w-3xl">
          <Accordion items={initialFaq} defaultOpenId={initialFaq[0].id} />
        </div>
      </Section>
    </>
  )
}
