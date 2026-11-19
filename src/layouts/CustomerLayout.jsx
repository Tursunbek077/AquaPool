import { Outlet } from 'react-router'
import { CustomerNav, Footer, Navbar, ScrollToTop } from '../components/layout'
import ProfileGate from '../components/customer/ProfileGate'
import { useProfile } from '../hooks/useProfile'

// Mijoz kabineti: Navbar + 3 bo'limli tablar + sahifa + Footer.
// Profil (ism va telefon) kiritilmagan bo'lsa, avval kirish formasi ko'rsatiladi.
// To'liq login/parol himoyasi 6-bosqichda AuthContext bilan qo'shiladi.
export default function CustomerLayout() {
  const { isSignedIn, profile } = useProfile()

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-8">
        <h1 className="mb-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Shaxsiy kabinet</h1>
        {isSignedIn && <p className="mb-5 text-sm text-navy-500">{profile.name}, {profile.phone}</p>}
        {isSignedIn ? (
          <>
            <CustomerNav />
            <div className="mt-6">
              <Outlet />
            </div>
          </>
        ) : (
          <div className="mt-6">
            <ProfileGate />
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
