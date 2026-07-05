import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Send, Sparkles } from 'lucide-react'
import ImageFallback from '../components/ImageFallback'
import { menuItems } from '../data/menu'
import { useApp } from '../context/AppContext'

const fmt = (n) => n.toLocaleString('fa-IR')

const QUICK_PROMPTS = [
  'یه چیز تند می‌خوام',
  'گزینه گیاهی دارید؟',
  'دسر خنک پیشنهاد بده',
  'پرفروش‌ترین‌ها چیه؟',
  'یه چیز ارزون‌قیمت',
]

function suggestFor(text) {
  const q = text.toLowerCase()
  let pool = []
  let reason = ''

  if (/تند|تیز|فلفل/.test(q)) {
    pool = menuItems.filter((i) => i.spicy > 0)
    reason = 'اینا تندترین گزینه‌های منو هستن، امیدوارم طاقتشو داشته باشی 🌶️'
  } else if (/گیاه|بدون گوشت|وگان|وجتری/.test(q)) {
    pool = menuItems.filter((i) => i.tags.includes('گیاهی'))
    reason = 'این‌ها بدون گوشت و کاملاً گیاهی هستن.'
  } else if (/دسر|شیرین/.test(q)) {
    pool = menuItems.filter((i) => i.category === 'dessert')
    reason = 'برای یه پایان شیرین، این‌ها رو پیشنهاد می‌کنم.'
  } else if (/خنک|سرد|نوشیدنی|نوشابه/.test(q)) {
    pool = menuItems.filter((i) => i.category === 'drink' || i.tags.includes('سرد'))
    reason = 'این‌ها حسابی خنکت می‌کنن.'
  } else if (/پرفروش|محبوب|معروف|بهترین/.test(q)) {
    pool = menuItems.filter((i) => i.popular)
    reason = 'این‌ها پرطرفدارترین غذاهای این رستوران هستن.'
  } else if (/ارزون|ارزان|مقرون|قیمت پایین/.test(q)) {
    pool = [...menuItems].sort((a, b) => a.price - b.price).slice(0, 4)
    reason = 'این‌ها به‌صرفه‌ترین گزینه‌های منو هستن.'
  } else if (/سبک|کم کالری|رژیم/.test(q)) {
    pool = menuItems.filter((i) => i.tags.includes('سبک'))
    reason = 'این‌ها گزینه‌های سبک‌تر منو هستن.'
  } else if (/سنتی|ایرانی|خورش/.test(q)) {
    pool = menuItems.filter((i) => i.tags.includes('سنتی'))
    reason = 'اگه دنبال طعم اصیل ایرانی هستی، این‌ها گزینه‌های خوبین.'
  } else {
    pool = menuItems.filter((i) => i.popular)
    reason = 'با توجه به سلیقه‌ی اکثر مشتری‌ها، این‌ها رو پیشنهاد می‌کنم. می‌تونی دقیق‌تر هم بگی چی دوست داری تا بهتر راهنماییت کنم.'
  }

  if (pool.length === 0) {
    pool = menuItems.filter((i) => i.popular)
    reason = 'دقیقاً موردی پیدا نکردم، ولی این‌ها همیشه محبوبن.'
  }

  return { reason, items: pool.slice(0, 4) }
}

export default function AssistantScreen() {
  const { addToCart } = useApp()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'سلام! من دستیار هوشمند هوتی‌ام 👋 بگو چه حسی داری یا دنبال چه طعمی هستی تا بهترین غذا رو برات پیدا کنم.',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text) => {
    const value = (text ?? input).trim()
    if (!value) return
    setMessages((m) => [...m, { role: 'user', text: value }])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const { reason, items } = suggestFor(value)
      setMessages((m) => [...m, { role: 'assistant', text: reason, items }])
      setTyping(false)
    }, 700 + Math.random() * 500)
  }

  return (
    <div className="min-h-screen flex flex-col pb-40">
      <div className="sticky top-0 z-30 px-5 pt-5 pb-4 glass-strong shadow-glass rounded-b-[28px] flex items-center gap-3">
        <span className="w-10 h-10 rounded-2xl bg-orange-500 shadow-glow-sm flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </span>
        <div>
          <h1 className="font-extrabold">دستیار هوشمند هوتی</h1>
          <p className="text-[11px] text-muted">پیشنهاد غذا بر اساس سلیقه‌ی تو</p>
        </div>
      </div>

      <div className="flex-1 px-5 mt-4 flex flex-col gap-4">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-glass ${
                m.role === 'user' ? 'glass' : 'glass-strong border border-orange-500/20'
              }`}
            >
              <p>{m.text}</p>

              {m.items && (
                <div className="mt-3 flex flex-col gap-2">
                  {m.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 glass rounded-xl p-2 pr-3"
                    >
                      <ImageFallback
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">{item.name}</p>
                        <p className="text-[11px] text-orange-500 font-bold tnum">
                          {fmt(item.price)} تومان
                        </p>
                      </div>
                      <button
                        onClick={() => addToCart(item.id, 1)}
                        className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0"
                        aria-label="افزودن"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {typing && (
          <div className="flex justify-end">
            <div className="glass-strong border border-orange-500/20 rounded-2xl rounded-be-md px-4 py-3 flex gap-1 items-center">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="w-1.5 h-1.5 rounded-full bg-orange-500/70 animate-pulse"
                  style={{ animationDelay: `${d * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="fixed bottom-24 inset-x-0 px-5">
        <div className="max-w-md mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="shrink-0 text-xs font-medium px-3.5 py-2 rounded-full glass-strong shadow-glass text-muted"
              >
                {p}
              </button>
            ))}
          </div>
          <div className="glass-strong shadow-glass rounded-full flex items-center gap-2 p-1.5">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="مثلاً: یه چیز تند و سنتی می‌خوام…"
              className="flex-1 bg-transparent outline-none text-sm px-3 placeholder:text-muted/70"
            />
            <button
              onClick={() => send()}
              className="w-10 h-10 rounded-full bg-orange-500 shadow-glow-sm flex items-center justify-center text-white shrink-0"
              aria-label="ارسال"
            >
              <Send className="w-4 h-4 -scale-x-100" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
