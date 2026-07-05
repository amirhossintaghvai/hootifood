import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import ImageFallback from '../components/ImageFallback'
import { useApp } from '../context/AppContext'

const fmt = (n) => n.toLocaleString('fa-IR')

export default function ItemModal({ item, onClose }) {
  const { addToCart } = useApp()
  const [qty, setQty] = useState(1)

  if (!item) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/40"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 32, stiffness: 300 }}
          className="relative w-full max-w-md glass-strong shadow-glass rounded-t-[32px] overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full glass-strong flex items-center justify-center"
            aria-label="بستن"
          >
            <X className="w-4 h-4" />
          </button>

          <ImageFallback src={item.image} alt={item.name} className="w-full h-48 object-cover" />

          <div className="p-6 pb-8">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-extrabold">{item.name}</h3>
              <span className="shrink-0 font-bold text-orange-500 tnum">
                {fmt(item.price)} <span className="text-xs font-normal">تومان</span>
              </span>
            </div>
            <p className="mt-2 text-sm text-muted leading-6">{item.desc}</p>

            {item.tags?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2.5 py-1 rounded-full glass-line border text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center glass rounded-full">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center"
                  aria-label="کم کردن"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-bold tnum">{fmt(qty)}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center"
                  aria-label="زیاد کردن"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(item.id, qty)
                  onClose()
                }}
                className="flex-1 h-12 rounded-full bg-orange-500 shadow-glow-sm text-white font-bold active:scale-[0.98] transition-transform"
              >
                افزودن به سبد · {fmt(qty * item.price)} تومان
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
