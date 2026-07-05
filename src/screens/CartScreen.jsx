import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, CreditCard, Minus, Plus, ShoppingBag, Trash2, Wallet } from 'lucide-react'
import ImageFallback from '../components/ImageFallback'
import { useApp } from '../context/AppContext'
import { restaurant } from '../data/menu'

const fmt = (n) => n.toLocaleString('fa-IR')
const FEE = 15000

export default function CartScreen({ tableNumber, onGoToMenu, onGoToRating }) {
  const { cartLines, cartTotal, setQty, clearCart, setLastOrder } = useApp()
  const [stage, setStage] = useState('cart') // cart | paying | done
  const [method, setMethod] = useState('card')

  if (stage === 'done') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center pb-24">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 14 }}
          className="w-20 h-20 rounded-full bg-orange-500 shadow-glow flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="text-xl font-extrabold">سفارش شما ثبت شد!</h2>
        <p className="mt-2 text-sm text-muted leading-6 max-w-[260px]">
          سفارش برای میز {tableNumber} به آشپزخانه ارسال شد. زمان تقریبی آماده‌سازی: ۲۰ دقیقه
        </p>
        <div className="mt-6 glass rounded-2xl px-5 py-3 text-sm">
          کد پیگیری سفارش: <span className="font-bold text-orange-500 tnum">#{fmt(1000 + Math.floor(Math.random() * 900))}</span>
        </div>
        <button
          onClick={onGoToRating}
          className="mt-8 w-full max-w-xs h-12 rounded-full bg-orange-500 shadow-glow-sm text-white font-bold"
        >
          امتیاز دادن به رستوران
        </button>
        <button onClick={onGoToMenu} className="mt-3 text-sm text-muted underline underline-offset-4">
          بازگشت به منو
        </button>
      </div>
    )
  }

  if (cartLines.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center pb-24">
        <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-4">
          <ShoppingBag className="w-7 h-7 text-muted" />
        </div>
        <h2 className="font-bold">سبد خرید خالی است</h2>
        <p className="mt-1 text-sm text-muted">از منو غذای مورد علاقه‌تون رو اضافه کنید</p>
        <button
          onClick={onGoToMenu}
          className="mt-6 px-6 h-11 rounded-full bg-orange-500 shadow-glow-sm text-white font-bold"
        >
          رفتن به منو
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-5 pt-6 pb-40">
      <h1 className="text-xl font-extrabold">سبد سفارش</h1>
      <p className="text-xs text-muted mt-1">میز {tableNumber} · {fmt(cartLines.length)} قلم</p>

      <div className="mt-5 flex flex-col gap-3">
        {cartLines.map(({ item, qty }) => (
          <div key={item.id} className="glass rounded-2xl p-3 flex items-center gap-3 shadow-glass">
            <ImageFallback src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold truncate">{item.name}</h3>
              <p className="text-xs text-orange-500 font-bold mt-1 tnum">{fmt(item.price)} تومان</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center glass rounded-full">
                <button
                  onClick={() => setQty(item.id, qty - 1)}
                  className="w-8 h-8 flex items-center justify-center"
                  aria-label="کم کردن"
                >
                  {qty === 1 ? <Trash2 className="w-3.5 h-3.5 text-ember" /> : <Minus className="w-3.5 h-3.5" />}
                </button>
                <span className="w-6 text-center text-sm font-bold tnum">{fmt(qty)}</span>
                <button
                  onClick={() => setQty(item.id, qty + 1)}
                  className="w-8 h-8 flex items-center justify-center"
                  aria-label="زیاد کردن"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {stage === 'cart' && (
          <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="mt-6 glass rounded-2xl p-4 flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>جمع سفارش</span>
                <span className="tnum">{fmt(cartTotal)} تومان</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>کارمزد سرویس</span>
                <span className="tnum">{fmt(FEE)} تومان</span>
              </div>
              <div className="hr-line pt-2 flex justify-between font-extrabold">
                <span>مبلغ قابل پرداخت</span>
                <span className="text-orange-500 tnum">{fmt(cartTotal + FEE)} تومان</span>
              </div>
            </div>
          </motion.div>
        )}

        {stage === 'paying' && (
          <motion.div
            key="payment"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6"
          >
            <h3 className="text-sm font-bold mb-3">روش پرداخت</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setMethod('card')}
                className={`flex-1 glass rounded-2xl p-4 flex flex-col items-center gap-2 border ${
                  method === 'card' ? 'border-orange-500' : 'border-transparent'
                }`}
              >
                <CreditCard className={`w-5 h-5 ${method === 'card' ? 'text-orange-500' : 'text-muted'}`} />
                <span className="text-xs font-medium">کارت بانکی</span>
              </button>
              <button
                onClick={() => setMethod('wallet')}
                className={`flex-1 glass rounded-2xl p-4 flex flex-col items-center gap-2 border ${
                  method === 'wallet' ? 'border-orange-500' : 'border-transparent'
                }`}
              >
                <Wallet className={`w-5 h-5 ${method === 'wallet' ? 'text-orange-500' : 'text-muted'}`} />
                <span className="text-xs font-medium">کیف پول هوتی</span>
              </button>
            </div>
            <p className="mt-4 text-[11px] text-muted text-center">
              این یک درگاه پرداخت نمایشی است — پرداخت واقعی انجام نمی‌شود.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-24 inset-x-0 px-5">
        <div className="max-w-md mx-auto">
          {stage === 'cart' && (
            <button
              onClick={() => setStage('paying')}
              className="w-full h-14 rounded-full bg-orange-500 shadow-glow text-white font-bold"
            >
              ادامه به پرداخت · {fmt(cartTotal + FEE)} تومان
            </button>
          )}
          {stage === 'paying' && (
            <button
              onClick={() => {
                setLastOrder({ total: cartTotal + FEE, items: cartLines, restaurantName: restaurant.name, orderedAt: Date.now() })
                clearCart()
                setStage('done')
              }}
              className="w-full h-14 rounded-full bg-orange-500 shadow-glow text-white font-bold"
            >
              پرداخت {fmt(cartTotal + FEE)} تومان
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
