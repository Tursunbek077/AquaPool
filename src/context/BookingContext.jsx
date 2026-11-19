import { useCallback, useEffect, useMemo, useState } from 'react'
import { cancelBooking, createBooking, loadBookings, setBookingStatus } from '../services/bookingService'
import { BookingContext } from './bookingContext'

// Bronlar holati: barcha sahifalar (Jadval, kabinet, admin) shu yerdan oladi.
// Boshqa brauzer oynasida bron qilinsa, 'storage' hodisasi orqali yangilanadi.
export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(loadBookings)

  const refresh = useCallback(() => setBookings(loadBookings()), [])

  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === null || event.key.startsWith('aquapool_booking')) refresh()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [refresh])

  const value = useMemo(
    () => ({
      bookings,
      refresh,
      // Har bir amaldan keyin (muvaffaqiyatli yoki xato) ro'yxat qayta o'qiladi
      async create(input) {
        try {
          return await createBooking(input)
        } finally {
          refresh()
        }
      },
      async cancel(id) {
        try {
          await cancelBooking(id)
        } finally {
          refresh()
        }
      },
      async setStatus(id, status) {
        try {
          await setBookingStatus(id, status)
        } finally {
          refresh()
        }
      },
    }),
    [bookings, refresh],
  )

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}
