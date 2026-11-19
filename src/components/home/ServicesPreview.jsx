import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { initialServices } from '../../data/initialServices'
import ServiceCard from '../cards/ServiceCard'
import { Section, SectionHeading } from '../common'

const FEATURED_IDS = ['erkin-suzish', 'bolalar-sport-guruhi', 'individual-murabbiy', 'akvaaerobika']
const FEATURED = FEATURED_IDS.map((id) => initialServices.find((service) => service.id === id)).filter(Boolean)

export default function ServicesPreview() {
  return (
    <Section tone="soft">
      <SectionHeading
        align="left"
        eyebrow="Bizning xizmatlar"
        title="Barcha darajalar uchun suzish imkoniyatlari"
        action={
          <Link to="/xizmatlar" className="inline-flex items-center gap-1.5 text-sm font-bold text-ocean-700 hover:text-ocean-900">
            Barcha xizmatlarni ko'rish <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED.map((service) => (
          <ServiceCard key={service.id} service={service} variant="compact" />
        ))}
      </div>
    </Section>
  )
}
