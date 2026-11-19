import { useEffect } from 'react'
import { useLocation } from 'react-router'

// Sahifa almashganda tepaga qaytaradi; #anchor bo'lsa shu bo'limga olib boradi.
export default function ScrollToTop() {
  const { pathname, hash, search } = useLocation()
  // Filtr o'zgarganda (?murabbiy=...) sahifa tepaga sakramasligi uchun query faqat #anchor bo'lganda hisobga olinadi
  const anchorSearch = hash ? search : ''

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0 })
  }, [pathname, hash, anchorSearch])

  return null
}
