import { Star } from 'lucide-react'
import { initialReviews } from '../../data/initialReviews'
import { Card, Section, SectionHeading } from '../common'

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
}

export default function Reviews() {
  return (
    <Section tone="white">
      <SectionHeading eyebrow="Mijozlarimiz e'tirofi" title="Haqiqiy tajribalar va iliq fikrlar" />
      <div className="grid gap-5 md:grid-cols-3">
        {initialReviews.map((review) => (
          <Card key={review.id} tone="soft" className="flex flex-col">
            <div className="flex gap-0.5" role="img" aria-label={`${review.rating} yulduz`}>
              {Array.from({ length: review.rating }, (_, i) => (
                <Star key={i} className="size-4 fill-warning-600 text-warning-600" aria-hidden="true" />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-navy-700">"{review.text}"</blockquote>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-ocean-600 text-sm font-bold text-white">
                {initials(review.name)}
              </span>
              <div>
                <p className="text-sm font-bold">{review.name}</p>
                <p className="text-xs text-navy-500">{review.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
