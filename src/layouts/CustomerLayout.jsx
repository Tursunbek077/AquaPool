import { Outlet } from 'react-router'
import { CustomerNav, Footer, Navbar, ScrollToTop } from '../components/layout'

// Mijoz kabineti: Navbar + 3 bo'limli tablar + sahifa + Footer
// Kirish himoyasi (faqat tizimga kirganlar uchun) 6-bosqichda AuthContext bilan qo'shiladi.
export default function CustomerLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-8">
        <h1 className="mb-5 text-2xl font-extrabold tracking-tight sm:text-3xl">Shaxsiy kabinet</h1>
        <CustomerNav />
        <div className="mt-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
