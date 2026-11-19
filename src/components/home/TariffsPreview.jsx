import { initialMemberships } from '../../data/initialServices'
import TariffCard from '../cards/TariffCard'
import { Section, SectionHeading } from '../common'

// Bosh sahifada 3 ta tarif: Basic, Premium VIP (ajratilgan), Family
const PREVIEW = ['basic', 'premium-vip', 'family']
  .map((id) => initialMemberships.find((tariff) => tariff.id === id))
  .filter(Boolean)

export default function TariffsPreview() {
  return (
    <Section tone="white">
      <SectionHeading
        eyebrow="Foydali a'zolik"
        title="O'zingizga mos tarif rejasini tanlang"
        description="Barcha paketlarimiz tarkibida zamonaviy trenajyor zali va dush xonalari xizmati mavjud."
      />
      <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
        {PREVIEW.map((tariff) => (
          <TariffCard key={tariff.id} tariff={tariff} tone={tariff.popular ? 'featured' : 'light'} />
        ))}
      </div>
    </Section>
  )
}
