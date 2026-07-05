import { motion } from 'framer-motion'
import {
  Bike,
  Bot,
  User,
  ChevronLeft,
  History,
  MapPin,
  QrCode,
  Sparkles,
  Trash2,
  UtensilsCrossed,
} from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'
import { useApp } from '../context/AppContext'
import { restaurant } from '../data/menu'

const fmt = (n) => n.toLocaleString('fa-IR')

const ActionCard = ({ icon: Icon, title, desc, badge, accent = 'orange', onClick, className = '' }) => {
  const accentClass = accent === 'amber' ? 'bg-amber/18 text-amber' : 'bg-orange-500/15 text-orange-500'

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[28px] glass shadow-glass p-4 text-right flex items-start gap-3 min-h-[132px] ${className}`}
    >
      <span className={`w-12 h-12 rounded-2xl ${accentClass} flex items-center justify-center shrink-0`}>
        <Icon className="w-6 h-6" strokeWidth={1.9} />
      </span>
      <span className="flex-1 min-w-0">
        {badge && (
          <span className="inline-flex mb-2 text-[10px] font-bold px-2 py-1 rounded-full bg-orange-500 text-white">
            {badge}
          </span>
        )}
        <span className="block font-extrabold leading-7">{title}</span>
        <span className="mt-1 block text-xs leading-6 text-muted">{desc}</span>
      </span>
      <ChevronLeft className="absolute left-4 bottom-4 w-4 h-4 text-muted group-active:text-orange-500" />
    </motion.button>
  )
}

export default function HomeScreen({ onNavigate }) {
  const { user, lastOrder, setLastOrder } = useApp()
  const firstName = user?.fullName?.trim().split(/\s+/)[0]
  const lastItems = lastOrder?.items?.map(({ item, qty }) => `${fmt(qty)}× ${item.name}`).join('، ')

  return (
    <div className="min-h-screen px-5 pt-5 pb-32">
      <div className="max-w-6xl mx-auto">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{firstName ? `${firstName} عزیز، خوش اومدی 👋` : 'به هوتی فود خوش اومدی'}</p>
          <h1 className="mt-1 text-2xl font-black leading-9">امروز چطور می‌خوای غذا بگیری؟</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('settings')}
            className="w-11 h-11 rounded-2xl bg-orange-500 shadow-glow-sm flex items-center justify-center"
            aria-label="پروفایل و تنظیمات"
          >
            <User className="w-5 h-5 text-white" />
          </button>
          <ThemeToggle />
        </div>
      </div>

      <div className="mt-5 rounded-[32px] glass-strong shadow-glass p-5 overflow-hidden relative">
        <div className="absolute -left-10 -top-10 w-32 h-32 rounded-full bg-orange-500/20 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <span className="w-12 h-12 rounded-2xl bg-orange-500 shadow-glow-sm flex items-center justify-center">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </span>
          <div>
            <h2 className="font-extrabold">{restaurant.name}</h2>
            <p className="text-xs text-muted mt-1">{restaurant.branch} · امتیاز {restaurant.rating}</p>
          </div>
        </div>
        <p className="relative mt-4 text-sm text-muted leading-7">
          بهترین مسیر رو بر اساس نیازت انتخاب کن؛ اسکن میز برای سفارش داخل رستوران، ارسال با پیک برای خانه، یا پیشنهاد هوشمند غذا.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-3 lg:gap-4">
        <ActionCard
          icon={QrCode}
          title="اسکن QR میز"
          desc="روی میز نشستی؟ کد رستوران رو اسکن کن و مستقیم وارد منوی همون میز شو."
          badge="سریع‌ترین شروع"
          onClick={() => onNavigate('scan')}
        />

        <div className="grid grid-cols-2 gap-3">
          <ActionCard
            icon={MapPin}
            title="نزدیک‌ترین رستوران"
            desc="شعبه‌های نزدیک اطرافت رو پیدا کن."
            accent="amber"
            onClick={() => onNavigate('nearby')}
          />
          <ActionCard
            icon={Bike}
            title="سفارش با پیک"
            desc="غذا رو انتخاب کن تا در محل تحویل بگیری."
            onClick={() => onNavigate('menu')}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <ActionCard
            icon={History}
            title="آخرین تجربه"
            desc="آخرین رستوران و غذایی که خوردی رو ببین."
            accent="amber"
            onClick={() => onNavigate('history')}
          />
          <ActionCard
            icon={Bot}
            title="پیشنهاد هوشمند غذا"
            desc="با دستیار هوش مصنوعی چت کن."
            badge="AI"
            onClick={() => onNavigate('assistant')}
          />
        </div>
      </div>

      <div className="mt-5 glass rounded-[28px] p-4 shadow-glass">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <h3 className="font-bold text-sm">آخرین رستوران و غذا</h3>
          </div>
          {lastOrder && (
            <button
              onClick={() => setLastOrder(null)}
              className="w-9 h-9 rounded-full bg-ember/10 text-ember flex items-center justify-center"
              aria-label="حذف تاریخچه"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {lastOrder ? (
          <div className="mt-3 text-sm leading-7">
            <p className="font-extrabold">{lastOrder.restaurantName || restaurant.name}</p>
            <p className="text-muted">{lastItems}</p>
            <p className="mt-1 text-xs text-orange-500 tnum">مبلغ سفارش: {fmt(lastOrder.total)} تومان</p>
          </div>
        ) : (
          <p className="mt-3 text-sm leading-7 text-muted">
            هنوز تاریخچه‌ای ثبت نشده. بعد از اولین سفارش، آخرین رستوران و غذا اینجا نمایش داده می‌شه.
          </p>
        )}
      </div>
      </div>
    </div>
  )
}
