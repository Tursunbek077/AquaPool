import { Link } from 'react-router'
import CoachCard from '../components/cards/CoachCard'
import { Badge, Button, PageHeader, Section } from '../components/common'
import { initialCoaches } from '../data/initialCoaches'

export default function CoachesPage() {
  return (
    <>
      <PageHeader
        eyebrow={
          <Badge variant="ocean" dot>
            TAJRIBALI MURABBIYLAR
          </Badge>
        }
        title="Bizning ustozlar jamoasi"
        description="Har bir murabbiy xalqaro xavfsizlik sertifikatiga va professional sport tajribasiga ega. O'zingizga mos ustozni tanlab, darsga yoziling."
      />

      <Section tone="aqua" className="pt-6 sm:pt-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {initialCoaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </Section>

      <Section tone="white" className="py-12 sm:py-16">
        <div className="flex flex-col items-center gap-4 rounded-3xl bg-aqua-100 p-8 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Qaysi murabbiy sizga mos?</h2>
          <p className="max-w-xl text-sm text-navy-500">
            Bepul diagnostika darsida katta murabbiy darajangizni aniqlab, sizga eng mos ustozni tavsiya qiladi.
          </p>
          <Button as={Link} to="/jadval?xizmat=diagnostika" size="lg">
            Bepul diagnostikaga yozilish
          </Button>
        </div>
      </Section>
    </>
  )
}
