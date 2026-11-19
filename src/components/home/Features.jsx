import { Funnel, Medal, MonitorPlay, Sparkles } from 'lucide-react'
import { Card, Section, SectionHeading } from '../common'

const FEATURES = [
  {
    icon: Funnel,
    title: '5 bosqichli tozalash',
    text: "Germaniya texnologiyasi asosida ozonlash va UV orqali suv tozaligi. Xlor miqdori minimal darajada, ko'zni achitmaydi.",
    tag: 'Germaniya standarti',
  },
  {
    icon: Medal,
    title: 'Xalqaro litsenziyali murabbiylar',
    text: "FINA sertifikati va ko'p yillik sport tajribasiga ega ustozlar sizning texnikangiz va xavfsizligingiz uchun mas'ul.",
    tag: 'FINA sertifikati',
  },
  {
    icon: Sparkles,
    title: 'Shaxsiy qulaylik & Spa',
    text: "Keng individual kiyinish shkafchalari, hammom va fin saunasi mashg'ulotdan keyin tiklanish uchun.",
    tag: 'Fin saunasi mavjud',
  },
  {
    icon: MonitorPlay,
    title: 'Qulay onlayn nazorat',
    text: "Navbatsiz va qulay onlayn joy band qilish, mashg'ulotlar grafigini real vaqtda kuzatish va tezkor bildirishnomalar.",
    tag: '2 daqiqada bron',
  },
]

export default function Features() {
  return (
    <Section tone="aqua">
      <SectionHeading
        eyebrow="Nega aynan biz?"
        title="Mukammallik sari yaratilgan afzalliklarimiz"
        description="Salomatligingiz va unumdor mashg'ulotlaringiz uchun har bir detal chuqur o'ylangan va jahon standartlariga moslashtirilgan."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, text, tag }) => (
          <Card key={title} hoverable className="flex flex-col">
            <span className="flex size-12 items-center justify-center rounded-xl bg-aqua-200 text-ocean-600">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-navy-500">{text}</p>
            <p className="mt-5 text-xs font-bold text-ocean-700">{tag}</p>
          </Card>
        ))}
      </div>
    </Section>
  )
}
