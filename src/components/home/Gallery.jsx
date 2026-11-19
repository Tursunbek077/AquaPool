import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Section, SmartImage } from '../common'

const PHOTOS = [
  { src: '/images/facilities/gallery-1.webp', alt: 'Olimpiya basseyni' },
  { src: '/images/facilities/gallery-2.webp', alt: 'Fin saunasi' },
  { src: '/images/facilities/gallery-3.webp', alt: 'Trenajyor zali' },
  { src: '/images/facilities/gallery-4.webp', alt: 'Fito-bar va dam olish hududi' },
]

// Fotogalereya karuseli: gorizontal aylanadi (scroll-snap), strelkalar bilan boshqariladi.
export default function Gallery() {
  const trackRef = useRef(null)

  function scrollBy(direction) {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.6, behavior: 'smooth' })
  }

  return (
    <Section tone="aqua">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-extrabold tracking-tight">Majmuamiz fotogalereyasi</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Oldingi rasmlar"
            className="flex size-10 items-center justify-center rounded-full bg-white text-navy-700 shadow-sm transition-colors hover:bg-ocean-600 hover:text-white"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Keyingi rasmlar"
            className="flex size-10 items-center justify-center rounded-full bg-white text-navy-700 shadow-sm transition-colors hover:bg-ocean-600 hover:text-white"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PHOTOS.map((photo) => (
          <li key={photo.src} className="w-[78%] shrink-0 snap-start sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
            <SmartImage src={photo.src} alt={photo.alt} className="aspect-[3/4] rounded-2xl shadow-card" />
          </li>
        ))}
      </ul>
    </Section>
  )
}
