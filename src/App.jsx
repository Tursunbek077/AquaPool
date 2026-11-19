import { Route, Routes } from 'react-router'
import AdminLayout from './layouts/AdminLayout'
import CustomerLayout from './layouts/CustomerLayout'
import MainLayout from './layouts/MainLayout'
import ContactPage from './pages/ContactPage'
import CoachesPage from './pages/CoachesPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PlaceholderPage from './pages/PlaceholderPage'
import PricingPage from './pages/PricingPage'
import ServicesPage from './pages/ServicesPage'

// Yo'llar (TZ sitemap). Sahifalar 3-6 bosqichlarda PlaceholderPage o'rniga yoziladi.
export default function App() {
  return (
    <Routes>
      {/* Ommaviy sayt (3-bosqich; Bron sahifasi 4-bosqich) */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="xizmatlar" element={<ServicesPage />} />
        <Route path="narxlar" element={<PricingPage />} />
        <Route path="jadval" element={<PlaceholderPage title="Jadval va Onlayn bron" stage={4} />} />
        <Route path="murabbiylar" element={<CoachesPage />} />
        <Route path="aloqa" element={<ContactPage />} />
        <Route path="kirish" element={<PlaceholderPage title="Kirish" stage={6} />} />
        <Route path="royxatdan-otish" element={<PlaceholderPage title="Ro'yxatdan o'tish" stage={6} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Mijoz kabineti (5-bosqich) */}
      <Route path="kabinet" element={<CustomerLayout />}>
        <Route index element={<PlaceholderPage title="Mening bronlarim" stage={5} />} />
        <Route path="bronlar" element={<PlaceholderPage title="Mening bronlarim" stage={5} />} />
        <Route path="azolik" element={<PlaceholderPage title="A'zolik va to'lovlar" stage={5} />} />
        <Route path="profil" element={<PlaceholderPage title="Mening profilim" stage={5} />} />
      </Route>

      {/* Admin panel (5-bosqich) */}
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<PlaceholderPage title="Boshqaruv markazi" stage={5} />} />
        <Route path="bronlar" element={<PlaceholderPage title="Bronlar va slotlar" stage={5} />} />
        <Route path="mijozlar" element={<PlaceholderPage title="Mijozlar va a'zoliklar" stage={5} />} />
        <Route path="sozlamalar" element={<PlaceholderPage title="Sozlamalar" stage={5} />} />
      </Route>
    </Routes>
  )
}
