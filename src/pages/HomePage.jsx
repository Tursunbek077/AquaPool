import CoachesPreview from '../components/home/CoachesPreview'
import DiscountCta from '../components/home/DiscountCta'
import Features from '../components/home/Features'
import Gallery from '../components/home/Gallery'
import Hero from '../components/home/Hero'
import QuickBooking from '../components/home/QuickBooking'
import Reviews from '../components/home/Reviews'
import ServicesPreview from '../components/home/ServicesPreview'
import StatsStrip from '../components/home/StatsStrip'
import TariffsPreview from '../components/home/TariffsPreview'

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickBooking />
      <StatsStrip />
      <Features />
      <ServicesPreview />
      <TariffsPreview />
      <CoachesPreview />
      <Reviews />
      <Gallery />
      <DiscountCta />
    </>
  )
}
