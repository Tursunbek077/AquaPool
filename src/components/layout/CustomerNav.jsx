import { NavLink } from 'react-router'
import { customerNav } from '../../data/navigation'
import { cn } from '../../utils/cn'

// Mijoz kabineti ichidagi 3 ta bo'lim (tablar). Mobil qurilmada gorizontal aylanadi.
export default function CustomerNav() {
  return (
    <nav aria-label="Shaxsiy kabinet" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex min-w-max gap-2 rounded-2xl border border-aqua-300 bg-white p-1.5 shadow-card">
        {customerNav.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'block whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors',
                  isActive ? 'bg-ocean-600 text-white' : 'text-navy-700 hover:bg-aqua-100',
                )
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
