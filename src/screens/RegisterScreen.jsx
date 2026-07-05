import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, Lock, Phone, RefreshCw, User } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'

const genDigits = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('')

function Captcha({ value, onRefresh }) {
  return (
    <div className="relative select-none glass rounded-2xl h-14 flex items-center justify-center gap-2 overflow-hidden">
      {/* noise lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30" aria-hidden="true">
        <line x1="5%" y1="20%" x2="95%" y2="75%" stroke="currentColor" strokeWidth="1" className="text-orange-500" />
        <line x1="10%" y1="85%" x2="90%" y2="15%" stroke="currentColor" strokeWidth="1" className="text-orange-500" />
        <line x1="0%" y1="50%" x2="100%" y2="55%" stroke="currentColor" strokeWidth="1" className="text-orange-500" />
      </svg>
      <span className="relative z-10 flex gap-2" dir="ltr">
        {value.split('').map((d, i) => (
          <span
            key={i}
            className="text-xl font-black tnum inline-block"
            style={{
              transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (8 + i * 3)}deg) translateY(${
                i % 2 === 0 ? -2 : 2
              }px)`,
            }}
          >
            {d}
          </span>
        ))}
      </span>
      <button
        type="button"
        onClick={onRefresh}
        className="absolute left-3 z-10 w-8 h-8 rounded-full glass-strong flex items-center justify-center"
        aria-label="کد جدید"
      >
        <RefreshCw className="w-3.5 h-3.5 text-muted" />
      </button>
    </div>
  )
}

function Field({ icon: Icon, error, children }) {
  return (
    <div>
      <div className="glass rounded-2xl flex items-center gap-2 px-4 h-14">
        <Icon className="w-4 h-4 text-muted shrink-0" />
        {children}
      </div>
      {error && <p className="mt-1.5 text-[11px] text-ember px-1">{error}</p>}
    </div>
  )
}

export default function RegisterScreen({ onBack, onRegistered }) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [captcha, setCaptcha] = useState(() => genDigits(5))
  const [captchaInput, setCaptchaInput] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const refreshCaptcha = () => {
    setCaptcha(genDigits(5))
    setCaptchaInput('')
  }

  const validate = () => {
    const e = {}
    if (!fullName.trim() || fullName.trim().length < 3) e.fullName = 'نام و نام خانوادگی رو کامل وارد کن'
    if (!/^09\d{9}$/.test(phone.trim())) e.phone = 'شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)'
    if (!password || password.length < 6) e.password = 'رمز عبور باید حداقل ۶ کاراکتر باشه'
    if (confirm !== password) e.confirm = 'تکرار رمز عبور با رمز عبور یکی نیست'
    if (captchaInput.trim() !== captcha) e.captcha = 'کد امنیتی درست وارد نشده'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (!validate()) {
      refreshCaptcha()
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      onRegistered({ fullName: fullName.trim(), phone: phone.trim() })
    }, 700)
  }

  return (
    <div className="min-h-screen flex flex-col px-6 pt-6 pb-10">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full glass flex items-center justify-center"
          aria-label="بازگشت"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <ThemeToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4"
      >
        <h1 className="text-2xl font-extrabold">ثبت‌نام در هوتی فود</h1>
        <p className="mt-1.5 text-sm text-muted leading-6">
          قبل از اسکن میز، یه حساب کاربری بساز تا بتونی سفارش بدی و امتیاز ثبت کنی.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4" noValidate>
          <Field icon={User} error={errors.fullName}>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="نام و نام خانوادگی"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted/70"
            />
          </Field>

          <Field icon={Phone} error={errors.phone}>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^\d]/g, ''))}
              inputMode="numeric"
              maxLength={11}
              dir="ltr"
              placeholder="09123456789"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted/70 tnum"
            />
          </Field>

          <Field icon={Lock} error={errors.password}>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPass ? 'text' : 'password'}
              placeholder="رمز عبور"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted/70"
            />
            <button type="button" onClick={() => setShowPass((s) => !s)} className="shrink-0 text-muted">
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </Field>

          <Field icon={Lock} error={errors.confirm}>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type={showPass ? 'text' : 'password'}
              placeholder="تکرار رمز عبور"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted/70"
            />
          </Field>

          <div>
            <p className="text-xs font-medium text-muted mb-2 px-1">کد امنیتی زیر رو وارد کن</p>
            <Captcha value={captcha} onRefresh={refreshCaptcha} />
            <div className="mt-3 glass rounded-2xl h-14 flex items-center px-4">
              <input
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value.replace(/[^\d]/g, ''))}
                inputMode="numeric"
                maxLength={5}
                dir="ltr"
                placeholder="عدد ۵ رقمی بالا"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted/70 tnum text-center tracking-[0.3em]"
              />
            </div>
            {errors.captcha && <p className="mt-1.5 text-[11px] text-ember px-1">{errors.captcha}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-3 w-full h-14 rounded-full bg-orange-500 shadow-glow text-white font-bold disabled:opacity-60 transition-opacity"
          >
            {submitting ? 'در حال ارسال کد…' : 'ثبت‌نام و دریافت کد تایید'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
