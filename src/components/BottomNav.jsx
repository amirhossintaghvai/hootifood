import { Home, Sparkles, ShoppingBag, Star, UtensilsCrossed, Wallet } from 'lucide-react'
import { useApp } from '../context/AppContext'

const TABS = [
  { id: 'home', label: 'خانه', icon: Home },
  { id: 'menu', label: 'منو', icon: UtensilsCrossed },
  { id: 'assistant', label: 'دستیار', icon: Sparkles },
  { id: 'wallet', label: 'کیف پول', icon: Wallet },
  { id: 'cart', label: 'سبد', icon: ShoppingBag },
  { id: 'rating', label: 'امتیاز', icon: Star },
]

export default function BottomNav({ active, onChange }) {
  const { cartCount } = useApp()

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-2">
      <div className="max-w-md mx-auto glass-strong rounded-3xl shadow-glass flex items-stretch justify-between px-2 py-2">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = active === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="relative flex-1 flex flex-col items-center gap-1 py-1.5 rounded-2xl transition-colors"
            >
              {isActive && (
                <span className="absolute inset-0 rounded-2xl bg-orange-500/12 border border-orange-500/25" />
              )}
              <span className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-orange-500' : 'text-muted'
                  }`}
                  strokeWidth={isActive ? 2.4 : 1.8}
                />
                {tab.id === 'cart' && cartCount > 0 && (
                  <span className="absolute -top-1.5 -left-2 min-w-[16px] h-4 px-1 rounded-full bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center tnum">
                    {cartCount}
                  </span>
                )}
              </span>
              <span
                className={`relative text-[11px] font-medium transition-colors ${
                  isActive ? 'text-orange-500' : 'text-muted'
                }`}
              >
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
