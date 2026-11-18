import { Outlet } from 'react-router'
import { Footer, Navbar, ScrollToTop } from '../components/layout'

// Ommaviy sayt: Navbar + sahifa + Footer
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
