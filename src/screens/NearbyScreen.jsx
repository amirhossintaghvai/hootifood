import { Bike, MapPin, Navigation, Star } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'
import { restaurant } from '../data/menu'

const branches = [
  { name: restaurant.name, branch: restaurant.branch, distance: '۸۵۰ متر', eta: '۷ دقیقه', active: true },
  { name: 'هوتی فود', branch: 'شعبه پارک ملت', distance: '۱٫۶ کیلومتر', eta: '۱۲ دقیقه' },
  { name: 'هوتی فود', branch: 'شعبه ولیعصر', distance: '۲٫۴ کیلومتر', eta: '۱۸ دقیقه' },
]

export default function NearbyScreen({ onOrder }) {
  return (
    <div className="min-h-screen px-5 pt-5 pb-32">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">پیدا کردن شعبه نزدیک</p>
          <h1 className="mt-1 text-2xl font-black">نزدیک‌ترین رستوران‌ها</h1>
        </div>
        <ThemeToggle />
      </div>

      <div className="mt-5 glass-strong rounded-[32px] p-5 shadow-glass">
        <div className="h-44 rounded-[26px] bg-gradient-to-br from-orange-500/25 via-amber/20 to-transparent glass relative overflow-hidden">
          <span className="absolute right-10 top-9 w-16 h-16 rounded-full border border-orange-500/30" />
          <span className="absolute left-12 bottom-8 w-24 h-24 rounded-full border border-amber/40" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 rounded-3xl bg-orange-500 shadow-glow flex items-center justify-center">
              <Navigation className="w-7 h-7 text-white" />
            </span>
          </span>
        </div>
        <p className="mt-4 text-sm leading-7 text-muted">
          این نسخه نمایشی نزدیک‌ترین شعبه‌ها رو بر اساس تجربه پیشنهادی نمایش می‌ده. در نسخه واقعی، موقعیت مکانی کاربر دریافت می‌شه.
        </p>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        {branches.map((b) => (
          <button key={b.branch} onClick={onOrder} className="glass rounded-3xl p-4 shadow-glass text-right flex items-center gap-3">
            <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${b.active ? 'bg-orange-500 text-white shadow-glow-sm' : 'bg-orange-500/12 text-orange-500'}`}>
              <MapPin className="w-5 h-5" />
            </span>
            <span className="flex-1">
              <span className="flex items-center gap-2">
                <span className="font-extrabold">{b.name}</span>
                {b.active && <span className="text-[10px] rounded-full bg-orange-500 text-white px-2 py-0.5">نزدیک‌ترین</span>}
              </span>
              <span className="mt-1 block text-xs text-muted">{b.branch} · {b.distance} · {b.eta}</span>
            </span>
            <span className="flex flex-col items-center gap-1 text-orange-500">
              <Star className="w-4 h-4 fill-orange-500" />
              <Bike className="w-4 h-4" />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
