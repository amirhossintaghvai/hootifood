import { useState } from 'react'
import { UtensilsCrossed } from 'lucide-react'

export default function ImageFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-orange-500/10`}
      >
        <UtensilsCrossed className="w-6 h-6 text-orange-500/60" strokeWidth={1.5} />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  )
}
