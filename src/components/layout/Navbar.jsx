import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, Phone, X } from 'lucide-react'
import { publicNav } from '../../data/navigation'
import { siteInfo } from '../../data/siteInfo'
import { cn } from '../../utils/cn'
import { Button } from '../common'
import Logo from './Logo'

function splitTo(to) {
  const [path, hash = ''] = to.split('#')
  return { path, hash: hash ? `#${hash}` : '' }
}

// "Xizmatlar" va "Suzish akademiyasi" bitta sahifada (#akademiya), shuning uchun
// faqat bittasi faol ko'rinishi uchun hash ham hisobga olinadi.
function isItemActive(item, location) {
  const { path, hash } = splitTo(item.to)
  const pathMatches = item.end ? location.pathname === path : location.pathname.startsWith(path)
  if (!pathMatches) return false
  if (hash) return location.hash === hash
  const siblingHashes = publicNav.map((n) => splitTo(n.to)).filter((n) => n.path === path && n.hash)
  return !siblingHashes.some((n) => n.hash === location.hash)
}

export default function Navbar() {
  const location = useLocation()
  // Menyu qaysi manzilda ochilgani saqlanadi: sahifa almashsa u o'zi yopilib qoladi
  const locationKey = location.pathname + location.hash
  const [openAt, setOpenAt] = useState(null)
  const menuOpen = openAt === locationKey
  const closeMenu = () => setOpenAt(null)

  return (
    <header className="sticky top-0 z-40 border-b border-aqua-300 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 xl:h-[72px]">
        <Logo />

        <nav aria-label="Asosiy menyu" className="hidden items-center gap-1 xl:flex">
          {publicNav.map((item) => {
            const active = isItemActive(item, location)
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-aqua-200 font-semibold text-ocean-700'
                    : 'text-navy-700 hover:bg-aqua-100 hover:text-ocean-700',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <a
            href={siteInfo.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-navy-900 2xl:flex"
          >
            <Phone className="size-4 text-ocean-600" aria-hidden="true" />
            {siteInfo.phone}
          </a>
          <Button as={Link} to="/kirish" variant="ghost" size="sm">
            Kirish
          </Button>
          <Button as={Link} to="/jadval" size="sm">
            Bron qilish
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpenAt(menuOpen ? null : locationKey)}
          aria-expanded={menuOpen}
          aria-controls="mobil-menyu"
          aria-label={menuOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
          className="rounded-lg p-2 text-navy-900 transition-colors hover:bg-aqua-200 xl:hidden"
        >
          {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobil menyu */}
      {menuOpen && (
        <div id="mobil-menyu" className="border-t border-aqua-300 bg-white xl:hidden">
          <nav aria-label="Mobil menyu" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-8">
            {publicNav.map((item) => {
              const active = isItemActive(item, location)
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-lg px-3 py-3 text-base font-medium transition-colors',
                    active ? 'bg-aqua-200 font-semibold text-ocean-700' : 'text-navy-700 hover:bg-aqua-100',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <a
              href={siteInfo.phoneHref}
              className="mt-2 flex items-center gap-2 rounded-lg px-3 py-3 text-base font-semibold text-navy-900"
            >
              <Phone className="size-4 text-ocean-600" aria-hidden="true" />
              {siteInfo.phone}
            </a>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <Button as={Link} to="/kirish" variant="soft" fullWidth>
                Kirish
              </Button>
              <Button as={Link} to="/jadval" fullWidth>
                Bron qilish
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
