import { useMemo, useState } from 'react'
import { Flame, Plus, Star } from 'lucide-react'
import ImageFallback from '../components/ImageFallback'
import ThemeToggle from '../components/ThemeToggle'
import ItemModal from './ItemModal'
import { categories, menuItems, restaurant } from '../data/menu'
import { useApp } from '../context/AppContext'

const fmt = (n) => n.toLocaleString('fa-IR')

export default function MenuScreen({ tableNumber }) {
  const { addToCart, cart, user } = useApp()
  const firstName = user?.fullName?.trim().split(/\s+/)[0]
  const [activeCat, setActiveCat] = useState('main')
  const [openItem, setOpenItem] = useState(null)

  const items = useMemo(() => menuItems.filter((i) => i.category === activeCat), [activeCat])

  return (
    <div className="min-h-screen pb-32">
      {/* header */}
      <div className="sticky top-0 z-30 px-5 pt-5 pb-3 glass-strong shadow-glass rounded-b-[28px]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center">
                <span className="text-orange-500 font-black">ه</span>
              </span>
              <div>
                <h1 className="font-extrabold leading-tight">{restaurant.name}</h1>
                <p className="text-[11px] text-muted">
                  {firstName ? `خوش اومدی ${firstName} 👋 · ` : ''}
                  {restaurant.branch}
                </p>
              </div>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber fill-amber" />
              <span className="tnum">{restaurant.rating}</span>
              <span className="tnum">({fmt(restaurant.ratingCount)})</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-muted/50" />
            <span>{restaurant.deliveryNote}</span>
          </div>
          {tableNumber && (
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-orange-500/12 text-orange-500 tnum">
              میز {tableNumber}
            </span>
          )}
        </div>

        {/* category chips */}
        <div className="mt-4 flex items-center gap-2 overflow-x-auto -mx-5 px-5">
          {categories.map((c) => {
            const active = activeCat === c.id
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active
                    ? 'bg-orange-500 text-white shadow-glow-sm'
                    : 'glass text-muted'
                }`}
              >
                {c.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* items */}
      <div className="px-5 mt-5 grid grid-cols-2 gap-4">
        {items.map((item, idx) => {
          const inCart = cart[item.id] || 0
          return (
            <button
              key={item.id}
              onClick={() => setOpenItem(item)}
              style={{ animationDelay: `${idx * 40}ms` }}
              className="animate-rise-in text-right rounded-3xl glass shadow-glass overflow-hidden flex flex-col"
            >
              <div className="relative">
                <ImageFallback src={item.image} alt={item.name} className="w-full h-28 object-cover" />
                {item.popular && (
                  <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-orange-500 text-white">
                    <Flame className="w-3 h-3" /> پرفروش
                  </span>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    addToCart(item.id, 1)
                  }}
                  className="absolute bottom-2 left-2 w-8 h-8 rounded-full bg-orange-500 shadow-glow-sm flex items-center justify-center text-white active:scale-90 transition-transform"
                  aria-label="افزودن سریع"
                >
                  {inCart > 0 ? (
                    <span className="text-xs font-bold tnum">{fmt(inCart)}</span>
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </button>
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="text-sm font-bold leading-snug">{item.name}</h3>
                <p className="mt-1 text-[11px] text-muted leading-5 line-clamp-2 flex-1">
                  {item.desc}
                </p>
                <p className="mt-2 text-sm font-extrabold text-orange-500 tnum">
                  {fmt(item.price)} <span className="text-[10px] font-normal text-muted">تومان</span>
                </p>
              </div>
            </button>
          )
        })}
      </div>

      <ItemModal item={openItem} onClose={() => setOpenItem(null)} />
    </div>
  )
}
