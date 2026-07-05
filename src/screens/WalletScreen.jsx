import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, Plus, Wallet } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'
import { useApp } from '../context/AppContext'

const fmt = (n) => n.toLocaleString('fa-IR')
const chargeOptions = [100000, 250000, 500000]

export default function WalletScreen() {
  const { walletBalance, chargeWallet } = useApp()
  const [selected, setSelected] = useState(chargeOptions[1])
  const [charged, setCharged] = useState(false)

  const handleCharge = () => {
    chargeWallet(selected)
    setCharged(true)
    setTimeout(() => setCharged(false), 1800)
  }

  return (
    <div className="min-h-screen px-5 pt-5 pb-32">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">کیف پول هوتی بات</p>
            <h1 className="mt-1 text-2xl sm:text-3xl font-black">شارژ و مدیریت موجودی</h1>
          </div>
          <ThemeToggle />
        </div>

        <div className="mt-5 grid lg:grid-cols-[1fr_0.85fr] gap-4 lg:gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden glass-strong rounded-[34px] p-6 shadow-glass min-h-[220px]"
          >
            <div className="absolute -left-12 -top-12 w-44 h-44 rounded-full bg-orange-500/25 blur-2xl" />
            <div className="relative flex items-center justify-between gap-4">
              <span className="w-14 h-14 rounded-3xl bg-orange-500 shadow-glow flex items-center justify-center">
                <Wallet className="w-7 h-7 text-white" />
              </span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full glass">Hooti Bot Wallet</span>
            </div>
            <p className="relative mt-8 text-sm text-muted">موجودی قابل استفاده</p>
            <p className="relative mt-2 text-3xl sm:text-4xl font-black text-orange-500 tnum">
              {fmt(walletBalance)} <span className="text-sm text-muted font-medium">تومان</span>
            </p>
            <p className="relative mt-4 text-xs leading-6 text-muted">
              می‌تونی کیف پول رو شارژ کنی و موقع پرداخت سفارش، گزینه کیف پول هوتی بات رو انتخاب کنی.
            </p>
          </motion.div>

          <div className="glass rounded-[34px] p-5 shadow-glass">
            <h2 className="font-extrabold">افزایش موجودی</h2>
            <p className="mt-1 text-xs leading-6 text-muted">یک مبلغ پیشنهادی انتخاب کن یا بعداً مبلغ دلخواه اضافه می‌شه.</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {chargeOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSelected(amount)}
                  className={`h-12 rounded-2xl border text-sm font-bold tnum ${
                    selected === amount ? 'bg-orange-500 text-white border-orange-500 shadow-glow-sm' : 'glass border-transparent text-muted'
                  }`}
                >
                  {fmt(amount)} تومان
                </button>
              ))}
            </div>
            <button
              onClick={handleCharge}
              className="mt-4 w-full h-14 rounded-full bg-orange-500 shadow-glow text-white font-bold flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              شارژ کیف پول
            </button>
            {charged && (
              <div className="mt-3 glass rounded-2xl px-3 py-2 text-xs text-orange-500 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                کیف پول با موفقیت شارژ شد.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
