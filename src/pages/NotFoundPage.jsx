import { Link } from 'react-router'
import { Button, Section } from '../components/common'

export default function NotFoundPage() {
  return (
    <Section tone="aqua" className="py-24">
      <div className="mx-auto max-w-md text-center">
        <p className="font-display text-7xl font-extrabold text-ocean-600">404</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Sahifa topilmadi</h1>
        <p className="mt-2 text-sm text-navy-500">Siz izlagan sahifa mavjud emas yoki ko'chirilgan.</p>
        <Button as={Link} to="/" size="lg" className="mt-6">
          Bosh sahifaga qaytish
        </Button>
      </div>
    </Section>
  )
}
