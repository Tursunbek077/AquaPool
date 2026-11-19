import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { CircleCheck, Crown } from 'lucide-react'
import { Button, Card } from '../components/common'
import MembershipCard from '../components/customer/MembershipCard'
import MembershipRequestForm from '../components/customer/MembershipRequestForm'
import PaymentsList from '../components/customer/PaymentsList'
import ReceiptUploadModal from '../components/customer/ReceiptUploadModal'
import { initialMemberships } from '../data/initialServices'
import { useBookings } from '../hooks/useBookings'
import { useProfile } from '../hooks/useProfile'
import { bookingsOfPhone } from '../services/bookingService'
import { getCurrentMembership, loadMemberships, membershipState, membershipVisits } from '../services/membershipService'
import { buildPaymentItems } from '../services/paymentService'
import { loadReceipts } from '../services/receiptService'
import { todayISO } from '../services/scheduleService'

// A'zolik va to'lovlar: joriy a'zolik, tashriflar limiti, yangi a'zolik so'rovi, to'lovlar tarixi, chek yuklash.
export default function MembershipPage() {
  const { bookings } = useBookings()
  const { profile } = useProfile()
  const [searchParams, setSearchParams] = useSearchParams()
  const [memberships, setMemberships] = useState(loadMemberships)
  const [receipts, setReceipts] = useState(loadReceipts)
  const [uploadItem, setUploadItem] = useState(null)
  const [justRequested, setJustRequested] = useState(false)

  const today = todayISO()
  const myBookings = bookingsOfPhone(bookings, profile.phone)
  const current = getCurrentMembership(memberships, profile.phone, today)
  const state = current ? membershipState(current, today) : null
  const visits = current ? membershipVisits(current, bookings) : null

  const myMemberships = memberships.filter((item) => item.phone.replace(/\D/g, '') === profile.phone.replace(/\D/g, ''))
  const payments = buildPaymentItems(myBookings, myMemberships, receipts, today)

  const requestedTariff = initialMemberships.find((tariff) => tariff.id === searchParams.get('tarif'))
  const showRequestForm = Boolean(requestedTariff) && !current

  function clearTariffParam() {
    setSearchParams({}, { replace: true })
  }

  function handleRequested() {
    setMemberships(loadMemberships())
    setReceipts(loadReceipts())
    setJustRequested(true)
    clearTariffParam()
  }

  // uploadItem ro'yxatdagi elementning eskirgan nusxasi bo'lmasligi uchun kalit bo'yicha qayta topiladi
  const activeUploadItem = uploadItem ? (payments.find((item) => item.key === uploadItem.key) ?? uploadItem) : null

  return (
    <div className="flex flex-col gap-10">
      <section aria-labelledby="membership-title" className="flex flex-col gap-5">
        <h2 id="membership-title" className="text-2xl font-extrabold tracking-tight">
          A'zolik
        </h2>

        {justRequested && current && (
          <p role="status" className="flex gap-2 rounded-xl bg-success-50 p-3 text-sm font-semibold text-success-600">
            <CircleCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            So'rovingiz yuborildi. Administrator to'lovni tasdiqlagach a'zolik faollashadi.
          </p>
        )}

        {showRequestForm && (
          <MembershipRequestForm
            key={requestedTariff.id}
            tariff={requestedTariff}
            profile={profile}
            onDone={handleRequested}
            onCancel={clearTariffParam}
          />
        )}

        {requestedTariff && current && !justRequested && (
          <p className="rounded-xl bg-aqua-100 p-3 text-sm text-navy-700">
            Sizda allaqachon {state === 'active' ? 'faol' : "tasdiqlanishi kutilayotgan"} a'zolik bor, shuning uchun yangi
            so'rov yuborib bo'lmaydi.
          </p>
        )}

        {current ? (
          <MembershipCard membership={current} state={state} visits={visits} />
        ) : (
          !showRequestForm && (
            <Card tone="soft" padding="lg" className="flex flex-col items-center text-center">
              <Crown className="size-10 text-ocean-600/60" aria-hidden="true" />
              <p className="mt-3 font-display text-xl font-bold">Faol a'zolik yo'q</p>
              <p className="mt-1 max-w-md text-sm text-navy-500">
                A'zolik bilan har bir tashrif arzonroq. Tariflarni solishtirib, o'zingizga mosini tanlang.
              </p>
              <Button as={Link} to="/narxlar" className="mt-4">
                Tariflarni ko'rish
              </Button>
            </Card>
          )
        )}
      </section>

      <section aria-labelledby="payments-title" className="flex flex-col gap-5">
        <h2 id="payments-title" className="text-2xl font-extrabold tracking-tight">
          To'lovlar tarixi
        </h2>
        <PaymentsList items={payments} onUpload={setUploadItem} />
      </section>

      {activeUploadItem && (
        <ReceiptUploadModal
          key={activeUploadItem.key}
          item={activeUploadItem}
          onClose={() => setUploadItem(null)}
          onSaved={() => setReceipts(loadReceipts())}
        />
      )}
    </div>
  )
}
