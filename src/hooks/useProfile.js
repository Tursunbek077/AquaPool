import { useContext } from 'react'
import { ProfileContext } from '../context/profileContext'

// { profile, isSignedIn, save(changes), clear() }
export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) throw new Error('useProfile faqat ProfileProvider ichida ishlatiladi')
  return context
}
