import { useContext } from 'react'
import { BookingContext } from '../context/bookingContext'

// { bookings, refresh, create, cancel, setStatus }
export function useBookings() {
  const context = useContext(BookingContext)
  if (!context) throw new Error('useBookings faqat BookingProvider ichida ishlatiladi')
  return context
}
