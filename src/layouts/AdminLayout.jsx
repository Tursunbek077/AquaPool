import { useState } from 'react'
import { Outlet } from 'react-router'
import { Menu } from 'lucide-react'
import { AdminSidebar, ScrollToTop } from '../components/layout'

// Admin panel: yon menyu + yuqori panel + sahifa
// Faqat admin roli uchun himoya 6-bosqichda AuthContext bilan qo'shiladi.
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-aqua-50">
      <ScrollToTop />
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-aqua-300 bg-white/95 px-4 backdrop-blur sm:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Menyuni ochish"
            className="rounded-lg p-2 text-navy-900 hover:bg-aqua-200 lg:hidden"
          >
            <Menu className="size-6" aria-hidden="true" />
          </button>
          <p className="font-display text-base font-bold">Ma'muriyat paneli</p>
        </header>
        <main className="px-4 py-6 sm:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
