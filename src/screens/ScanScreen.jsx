import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { motion } from 'framer-motion'
import { ArrowRight, CameraOff, QrCode } from 'lucide-react'

const REGION_ID = 'hooti-qr-region'

export default function ScanScreen({ onBack, onScanned }) {
  const scannerRef = useRef(null)
  const [status, setStatus] = useState('starting') // starting | active | error | success

  useEffect(() => {
    let cancelled = false
    const instance = new Html5Qrcode(REGION_ID, { verbose: false })
    scannerRef.current = instance

    instance
      .start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 240, height: 240 },
          aspectRatio: 1,
        },
        (decodedText) => {
          if (cancelled) return
          setStatus('success')
          instance
            .stop()
            .catch(() => {})
            .finally(() => onScanned(decodedText))
        },
        () => {
          // per-frame "not found yet" — expected while searching, ignore
        }
      )
      .then(() => {
        if (!cancelled) setStatus('active')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
      instance.stop().catch(() => {})
      instance.clear().catch(() => {})
    }
  }, [onScanned])

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
        <h2 className="font-bold">اسکن کد رستوران</h2>
        <span className="w-10" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className="relative w-72 h-72 max-w-[80vw] max-h-[80vw] rounded-[32px] overflow-hidden glass-strong shadow-glass">
          <div
            id={REGION_ID}
            className="absolute inset-0 [&_video]:w-full [&_video]:h-full [&_video]:object-cover"
          />

          {status !== 'error' && (
            <>
              {/* corner frame */}
              <div className="pointer-events-none absolute inset-6 rounded-2xl">
                {['top-0 right-0 border-t-2 border-r-2 rounded-tr-xl', 'top-0 left-0 border-t-2 border-l-2 rounded-tl-xl', 'bottom-0 right-0 border-b-2 border-r-2 rounded-br-xl', 'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-xl'].map(
                  (cls, i) => (
                    <span
                      key={i}
                      className={`absolute w-7 h-7 border-orange-500 ${cls}`}
                    />
                  )
                )}
              </div>
              {status === 'active' && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="w-40 h-40 rounded-full border-2 border-orange-500/60 animate-radar" />
                </div>
              )}
            </>
          )}

          {status === 'starting' && (
            <div className="absolute inset-0 flex items-center justify-center glass">
              <p className="text-xs text-muted">در حال باز کردن دوربین…</p>
            </div>
          )}

          {status === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center glass">
              <CameraOff className="w-8 h-8 text-orange-500" strokeWidth={1.5} />
              <p className="text-xs text-muted leading-6">
                به دوربین دسترسی نداریم. لطفاً اجازه دسترسی به دوربین رو در تنظیمات مرورگر بده.
              </p>
            </div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center glass-strong"
            >
              <span className="w-16 h-16 rounded-full bg-orange-500 shadow-glow flex items-center justify-center">
                <QrCode className="w-7 h-7 text-white" />
              </span>
            </motion.div>
          )}
        </div>

        <p className="text-sm text-muted text-center max-w-[240px]">
          {status === 'error'
            ? 'می‌تونی به‌جاش وارد منوی دمو بشی.'
            : 'دوربین رو روی کد QR روی میز نگه‌دار'}
        </p>

        <button
          onClick={() => onScanned('demo-table-12')}
          className="text-sm font-medium text-orange-500 underline underline-offset-4"
        >
          ورود به منوی دمو بدون اسکن
        </button>
      </div>
    </div>
  )
}
