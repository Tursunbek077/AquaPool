import { Badge, Card } from '../components/common'

// VAQTINCHALIK sahifa: haqiqiy sahifalar 3-6 bosqichlarda shu yerni almashtiradi.
export default function PlaceholderPage({ title, stage }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
      <Card tone="soft" padding="lg" className="mx-auto max-w-xl text-center">
        <Badge variant="ocean" dot>
          {stage}-bosqichda tayyor bo'ladi
        </Badge>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-navy-500">Bu sahifa hozircha bo'sh. Layout va navigatsiya ishlayapti.</p>
      </Card>
    </section>
  )
}
