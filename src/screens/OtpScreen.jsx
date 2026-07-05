import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircleMore, ShieldCheck } from 'lucide-react'

const genDigits = (n) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('')
const RESEND_SECONDS = 60

export default function OtpScreen({ phone, onBack, onVerified }) {
  const [code, setCode] = useState(() => genDigits(5))
  const [digits, setDigits] = useState(['', '', '', '', ''])
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)
  const [seconds, setSeconds] = useState(RESEND_SECONDS)
  const inputsRef = useRef([])

  useEffect(() => {
    if (seconds <= 0) return
    const t = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [seconds])

  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  const setDigitAt = (i, val) => {
    if (!/^\d?$/.test(val)) return
    setDigits((d) => {
      const next = [...d]
      next[i] = val
      return next
    })
    setError(false)
    if (val && i < 4) inputsRef.current[i + 1]?.focus()
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5)
    if (!text) return
    e.preventDefault()
    setDigits(text.split('').concat(Array(5 - text.length).fill('')))
    inputsRef.current[Math.min(text.length, 4)]?.focus()
  }

  const resend = () => {
    setCode(genDigits(5))
    setDigits(['', '', '', '', ''])
    setSeconds(RESEND_SECONDS)
    inputsRef.current[0]?.focus()
  }

  const verify = () => {
    const value = digits.join('')
    if (value.length < 5) return
    if (value === code) {
      onVerified()
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  useEffect(() => {
    if (digits.every((d) => d !== '')) verify()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits])

  return (
    <div className="min-h-screen flex flex-col px-6 pt-6 pb-10">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-full glass flex items-center justify-center"
        aria-label="بازگشت"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl glass-strong shadow-glass flex items-center justify-center">
            <MessageCircleMore className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">کد تایید رو وارد کن</h1>
            <p className="mt-2 text-sm text-muted leading-6">
              یک کد ۵ رقمی به شماره{' '}
              <span className="font-bold text-ink tnum" dir="ltr">
                {phone}
              </span>{' '}
              پیامک شد
            </p>
          </div>
        </motion.div>

        <motion.div
          animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          dir="ltr"
          className="flex gap-2.5"
        >
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputsRef.current[i] = el)}
              value={d}
              onChange={(e) => setDigitAt(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              inputMode="numeric"
              maxLength={1}
              className={`w-12 h-14 rounded-2xl glass text-center text-xl font-black outline-none tnum border ${
                error ? 'border-ember text-ember' : 'border-transparent focus:border-orange-500'
              }`}
            />
          ))}
        </motion.div>

        {error && <p className="text-xs text-ember">کد وارد شده درست نیست، دوباره امتحان کن</p>}

        {/* demo-only hint: a real backend would text this instead of showing it here */}
        <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2 text-xs text-muted max-w-[280px]">
          <ShieldCheck className="w-4 h-4 text-orange-500 shrink-0" />
          <span>
            حالت دمو، بدون پیامک واقعی: کد شما{' '}
            <span className="font-bold text-orange-500 tnum" dir="ltr">
              {code}
            </span>{' '}
            است
          </span>
        </div>

        <button
          onClick={verify}
          className="w-full max-w-xs h-14 rounded-full bg-orange-500 shadow-glow text-white font-bold"
        >
          تایید کد
        </button>

        {seconds > 0 ? (
          <p className="text-xs text-muted">
            ارسال دوباره کد تا{' '}
            <span className="tnum font-medium">{seconds}</span> ثانیه دیگر
          </p>
        ) : (
          <button onClick={resend} className="text-xs font-medium text-orange-500 underline underline-offset-4">
            ارسال دوباره کد
          </button>
        )}
      </div>
    </div>
  )
}
