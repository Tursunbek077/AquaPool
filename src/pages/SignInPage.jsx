import { Navigate } from 'react-router'
import ProfileGate from '../components/customer/ProfileGate'
import { Section } from '../components/common'
import { useProfile } from '../hooks/useProfile'

// "Kirish" sahifasi: hozircha kabinetdagi ism va telefon formasi.
// Kirgan mijoz to'g'ridan-to'g'ri kabinetga o'tadi.
// 6-bosqichda shu yerga haqiqiy login va parol (AuthContext) keladi.
export default function SignInPage() {
  const { isSignedIn } = useProfile()

  if (isSignedIn) return <Navigate to="/kabinet/bronlar" replace />

  return (
    <Section tone="aqua" className="py-12 sm:py-20">
      <ProfileGate />
    </Section>
  )
}
