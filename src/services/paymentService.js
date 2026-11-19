// To'lovlar tarixi: alohida jadval yo'q, bronlar va a'zoliklardan hosil qilinadi.
// Admin to'lovni tasdiqlaganda (keyingi bosqich) booking.paid = true bo'ladi.

import { initialServices } from '../data/initialServices'
import { membershipState } from './membershipService'

// statusKey: paid (to'langan) | review (chek tekshirilmoqda) | need-receipt (chek yuklash kerak) | onsite (joyida to'lanadi)
function statusFor({ paid, method, hasReceipt }) {
  if (paid) return 'paid'
  if (method === 'receipt') return hasReceipt ? 'review' : 'need-receipt'
  return 'onsite'
}

export function buildPaymentItems(bookings, memberships, receipts, today) {
  const items = []

  bookings
    .filter((booking) => booking.status === 'pending' || booking.status === 'confirmed')
    .forEach((booking) => {
      const service = initialServices.find((item) => item.id === booking.serviceId)
      const key = `booking:${booking.id}`
      items.push({
        key,
        kind: 'booking',
        title: booking.title,
        createdAt: booking.createdAt,
        amount: service ? service.price * booking.people : null,
        amountSuffix: service?.priceNote ?? "so'm",
        method: booking.payment,
        receipt: receipts[key] ?? null,
        statusKey: statusFor({ paid: booking.paid === true, method: booking.payment, hasReceipt: Boolean(receipts[key]) }),
      })
    })

  memberships
    .filter((membership) => membership.status !== 'rejected')
    .forEach((membership) => {
      const key = `membership:${membership.id}`
      const state = membershipState(membership, today)
      items.push({
        key,
        kind: 'membership',
        title: `${membership.tariffName} a'zoligi (${membership.billing === 'yearly' ? 'yillik' : 'oylik'})`,
        createdAt: membership.createdAt,
        amount: membership.amount,
        amountSuffix: "so'm",
        method: membership.method,
        receipt: receipts[key] ?? null,
        statusKey: statusFor({
          paid: state === 'active' || state === 'expired',
          method: membership.method,
          hasReceipt: Boolean(receipts[key]),
        }),
      })
    })

  return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}
