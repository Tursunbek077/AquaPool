import { Link, NavLink } from 'react-router'
import { ArrowLeft, CalendarCheck, LayoutDashboard, Settings, Users, X } from 'lucide-react'
import { adminNav } from '../../data/navigation'
import { cn } from '../../utils/cn'
import Logo from './Logo'

const ICONS = {
  dashboard: LayoutDashboard,
  bookings: CalendarCheck,
  clients: Users,
  settings: Settings,
}

// Admin panelning yon menyusi. Katta ekranda doim ko'rinadi, mobilda ochiladigan panel.
export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-navy-950/60 lg:hidden" onClick={onClose} aria-hidden="true" />
      )}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-navy-900 text-white transition-transform duration-200',
          'lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo tone="dark" onClick={onClose} />
          <button
            type="button"
            onClick={onClose}
            aria-label="Menyuni yopish"
            className="rounded-lg p-1.5 text-aqua-400 hover:bg-navy-800 lg:hidden"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <p className="px-5 pb-2 pt-4 text-[11px] font-bold uppercase tracking-widest text-navy-400">
          Boshqaruv paneli
        </p>
        <nav aria-label="Admin menyu" className="flex-1 px-3">
          <ul className="flex flex-col gap-1">
            {adminNav.map((item) => {
              const Icon = ICONS[item.icon]
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors',
                        isActive ? 'bg-ocean-600 text-white' : 'text-aqua-400 hover:bg-navy-800 hover:text-white',
                      )
                    }
                  >
                    <Icon className="size-5" aria-hidden="true" />
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="border-t border-navy-800 p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-aqua-400 transition-colors hover:bg-navy-800 hover:text-white"
          >
            <ArrowLeft className="size-5" aria-hidden="true" />
            Saytga qaytish
          </Link>
        </div>
      </aside>
    </>
  )
}
