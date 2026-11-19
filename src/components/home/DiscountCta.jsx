import { Badge, Section } from '../common'
import CallbackForm from './CallbackForm'

export default function DiscountCta() {
  return (
    <Section tone="white" className="py-12 sm:py-16">
      <div className="grid gap-8 rounded-3xl bg-navy-900 p-6 text-white sm:p-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <Badge variant="ocean">Maxsus chegirma</Badge>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Bugun birinchi mashg'ulotga yoziling va 10% chegirmaga ega bo'ling!
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-aqua-400">
            Raqamingizni qoldiring, administratorimiz 10 daqiqa ichida qo'ng'iroq qilib, o'zingizga qulay vaqtni
            belgilab beradi.
          </p>
        </div>
        <div className="rounded-2xl bg-navy-800 p-5">
          <CallbackForm
            source="bosh-sahifa-chegirma"
            buttonLabel="10% chegirma bilan yozilish"
            note="Operatorimiz 10 daqiqa ichida siz bilan bog'lanadi."
          />
        </div>
      </div>
    </Section>
  )
}
