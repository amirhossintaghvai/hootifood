import { motion } from 'framer-motion'
import { QrCode, ArrowLeft } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'

export default function SplashScreen({ onScan }) {
  return (
    <div className="min-h-screen flex flex-col px-6 pt-6 pb-10">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-5"
        >
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-[28px] bg-orange-500/20 blur-xl" />
            <div className="relative w-24 h-24 rounded-[28px] glass-strong shadow-glass flex items-center justify-center">
              <span className="text-4xl font-black text-orange-500">ه</span>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">هوتی فود</h1>
            <p className="mt-2 text-sm text-muted max-w-[240px] mx-auto leading-6">
              کد QR روی میز رستوران رو اسکن کن، منو رو ببین، سفارش بده و همون‌جا حساب کن.
            </p>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onClick={onScan}
          className="group relative w-full max-w-xs rounded-3xl glass-strong shadow-glass px-6 py-5 flex items-center gap-4 active:scale-[0.98] transition-transform"
        >
          <span className="w-12 h-12 rounded-2xl bg-orange-500 shadow-glow-sm flex items-center justify-center shrink-0">
            <QrCode className="w-6 h-6 text-white" strokeWidth={2} />
          </span>
          <span className="flex-1 text-right">
            <span className="block font-bold">شروع کن</span>
            <span className="block text-xs text-muted mt-0.5">ثبت‌نام و اسکن کد QR رستوران</span>
          </span>
          <ArrowLeft className="w-5 h-5 text-muted group-active:-translate-x-1 transition-transform" />
        </motion.button>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-[11px] text-muted"
      >
        با ورود، شرایط استفاده هوتی فود رو می‌پذیری
      </motion.p>
    </div>
  )
}
