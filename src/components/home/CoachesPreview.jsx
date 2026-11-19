import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { initialCoaches } from '../../data/initialCoaches'
import CoachCard from '../cards/CoachCard'
import { Section, SectionHeading } from '../common'

export default function CoachesPreview() {
  return (
    <Section tone="soft">
      <SectionHeading
        align="left"
        eyebrow="Bizning jamoa"
        title="Xalqaro toifadagi yetakchi murabbiylar"
        description="Professional sport ustalari va sertifikatlangan instruktorlar bilan natijaga erishing."
        action={
          <Link to="/murabbiylar" className="inline-flex items-center gap-1.5 text-sm font-bold text-ocean-700 hover:text-ocean-900">
            Barcha murabbiylarni ko'rish <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        }
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {initialCoaches.slice(0, 3).map((coach) => (
          <CoachCard key={coach.id} coach={coach} variant="compact" />
        ))}
      </div>
    </Section>
  )
}
