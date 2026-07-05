import { Bell, ChevronLeft, LogOut, ShieldCheck, User, Wallet } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'
import { useApp } from '../context/AppContext'

const fmt = (n) => n.toLocaleString('fa-IR')

export default function SettingsScreen({ onNavigate }) {
  const { user, walletBalance } = useApp()
  const firstName = user?.fullName?.trim().split(/\s+/)[0] || 'کاربر'

  return (
    <div className="min-h-screen px-5 pt-5 pb-32">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">پروفایل و تنظیمات</p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black">سلام {firstName}</h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="mt-5 grid lg:grid-cols-[0.85fr_1.15fr] gap-4 lg:gap-6">
          <div className="glass-strong rounded-[34px] p-5 shadow-glass text-center">
            <div className="mx-auto w-20 h-20 rounded-[28px] bg-orange-500 shadow-glow flex items-center justify-center">
              <User className="w-9 h-9 text-white" />
            </div>
            <h2 className="mt-4 font-extrabold text-lg">{user?.fullName || 'کاربر هوتی'}</h2>
            <p className="mt-1 text-sm text-muted tnum" dir="ltr">{user?.phone || '09123456789'}</p>
            <button
              onClick={() => onNavigate('wallet')}
              className="mt-5 w-full h-12 rounded-full bg-orange-500 shadow-glow-sm text-white font-bold"
            >
              کیف پول: {fmt(walletBalance)} تومان
            </button>
          </div>

          <div className="glass rounded-[34px] p-4 sm:p-5 shadow-glass flex flex-col gap-3">
            {[
              { icon: Wallet, title: 'کیف پول هوتی بات', desc: 'شارژ موجودی و پرداخت سریع', action: () => onNavigate('wallet') },
              { icon: Bell, title: 'اعلان‌ها', desc: 'پیگیری وضعیت سفارش و پیشنهادها' },
              { icon: ShieldCheck, title: 'امنیت حساب', desc: 'رمز عبور و کدهای تایید' },
              { icon: LogOut, title: 'خروج از حساب', desc: 'خروج نمایشی از اپلیکیشن' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.title}
                  onClick={item.action}
                  className="glass rounded-3xl p-4 flex items-center gap-3 text-right"
                >
                  <span className="w-11 h-11 rounded-2xl bg-orange-500/12 text-orange-500 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold text-sm">{item.title}</span>
                    <span className="mt-1 block text-xs text-muted">{item.desc}</span>
                  </span>
                  <ChevronLeft className="w-4 h-4 text-muted" />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
