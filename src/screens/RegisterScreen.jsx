import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, KeyRound, Lock, Phone, RefreshCw, User } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle'

const genDigits = (n) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join('')

function Captcha({ value, onRefresh }) {
  return (
    <div className="relative select-none glass rounded-2xl h-14 flex items-center justify-center gap-2 overflow-hidden">
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
  const [mode, setMode] = useState('signup')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [captcha, setCaptcha] = useState(() => genDigits(5))
  const [captchaInput, setCaptchaInput] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const isSignup = mode === 'signup'
  const isForgot = mode === 'forgot'

  const refreshCaptcha = () => {
    setCaptcha(genDigits(5))
    setCaptchaInput('')
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setErrors({})
    refreshCaptcha()
  }

  const validate = () => {
    const e = {}
    if (isSignup && (!fullName.trim() || fullName.trim().length < 3)) e.fullName = 'نام و نام خانوادگی رو کامل وارد کن'
    if (!/^09\d{9}$/.test(phone.trim())) e.phone = 'شماره موبایل معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹)'
    if (!isForgot && (!password || password.length < 6)) e.password = 'رمز عبور باید حداقل ۶ کاراکتر باشه'
    if (isSignup && confirm !== password) e.confirm = 'تکرار رمز عبور با رمز عبور یکی نیست'
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
      const fallbackName = phone.trim() ? `کاربر ${phone.trim().slice(-4)}` : 'کاربر هوتی'
      onRegistered({ fullName: isSignup ? fullName.trim() : fallbackName, phone: phone.trim(), authMode: mode })
    }, 700)
  }

  const title = isSignup ? 'ثبت‌نام در هوتی فود' : isForgot ? 'بازیابی رمز عبور' : 'ورود به هوتی فود'
  const subtitle = isSignup
    ? 'حساب بساز تا سفارش، کیف پول و تاریخچه‌ات همیشه همراهت باشه.'
    : isForgot
      ? 'شماره موبایل حسابت رو وارد کن تا کد بازیابی برات آماده بشه.'
      : 'با شماره موبایل و رمز عبورت وارد شو؛ اگر رمزت یادت نیست از بازیابی استفاده کن.'
  const submitLabel = isSignup ? 'ثبت‌نام و دریافت کد تایید' : isForgot ? 'ارسال کد بازیابی' : 'ورود و دریافت کد تایید'

  return (
    <div className="min-h-screen flex flex-col px-5 sm:px-6 pt-6 pb-10">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full glass flex items-center justify-center"
          aria-label="بازگشت"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-5xl mx-auto flex-1 grid lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 lg:mt-0"
        >
          <div className="glass-strong rounded-[32px] p-5 sm:p-6 shadow-glass">
            <div className="inline-flex rounded-full glass p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => switchMode('login')}
                className={`px-4 py-2 rounded-full ${mode === 'login' ? 'bg-orange-500 text-white shadow-glow-sm' : 'text-muted'}`}
              >
                ورود
              </button>
              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`px-4 py-2 rounded-full ${mode === 'signup' ? 'bg-orange-500 text-white shadow-glow-sm' : 'text-muted'}`}
              >
                ثبت‌نام
              </button>
            </div>
            <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold">{title}</h1>
            <p className="mt-2 text-sm text-muted leading-7">{subtitle}</p>
            <div className="mt-5 hidden lg:block rounded-[28px] bg-orange-500/12 p-5">
              <KeyRound className="w-8 h-8 text-orange-500" />
              <p className="mt-3 text-sm leading-7 text-muted">
                تجربه ورود و ثبت‌نام برای موبایل یک ستونه و برای لپ‌تاپ دو ستونه چیده شده تا فرم کوتاه‌تر و قابل‌خواندن‌تر باشه.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="glass-strong rounded-[32px] shadow-glass p-4 sm:p-6 flex flex-col gap-4"
          noValidate
        >
          {isSignup && (
            <Field icon={User} error={errors.fullName}>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="نام و نام خانوادگی"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted/70"
              />
            </Field>
          )}

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

          {!isForgot && (
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
          )}

          {isSignup && (
            <Field icon={Lock} error={errors.confirm}>
              <input
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                type={showPass ? 'text' : 'password'}
                placeholder="تکرار رمز عبور"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted/70"
              />
            </Field>
          )}

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
            className="mt-1 w-full h-14 rounded-full bg-orange-500 shadow-glow text-white font-bold disabled:opacity-60 transition-opacity"
          >
            {submitting ? 'در حال پردازش…' : submitLabel}
          </button>

          <button
            type="button"
            onClick={() => switchMode(isForgot ? 'login' : 'forgot')}
            className="text-xs font-bold text-orange-500 underline underline-offset-4"
          >
            {isForgot ? 'بازگشت به ورود' : 'رمز عبورم را فراموش کرده‌ام'}
          </button>
        </motion.form>
      </div>
    </div>
  )
}
