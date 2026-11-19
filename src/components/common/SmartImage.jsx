import { useState } from 'react'
import { Waves } from 'lucide-react'
import { cn } from '../../utils/cn'

// Rasm yuklanmasa (fayl hali public/images ga qo'yilmagan bo'lsa) chiroyli havorang zaxira ko'rsatadi.
export default function SmartImage({ src, alt, className, imgClassName, loading = 'lazy' }) {
  const [failedSrc, setFailedSrc] = useState(null)
  const failed = failedSrc === src

  return (
    <div className={cn('relative overflow-hidden bg-aqua-200', className)}>
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className="flex size-full items-center justify-center bg-gradient-to-br from-aqua-300 via-aqua-200 to-ocean-100"
        >
          <Waves className="size-1/4 max-h-16 min-h-8 text-ocean-600/40" aria-hidden="true" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onError={() => setFailedSrc(src)}
          className={cn('size-full object-cover', imgClassName)}
        />
      )}
    </div>
  )
}
