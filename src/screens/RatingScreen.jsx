import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ThumbsUp } from 'lucide-react'
import { restaurant } from '../data/menu'

const TAGS = ['غذای خوشمزه', 'سرویس سریع', 'محیط تمیز', 'قیمت مناسب', 'کارکنان مهربان']

const LABELS = {
  1: 'خیلی ضعیف',
  2: 'ضعیف',
  3: 'معمولی',
  4: 'خوب',
  5: 'عالی',
}

export default function RatingScreen() {
  const [score, setScore] = useState(0)
  const [hover, setHover] = useState(0)
  const [selectedTags, setSelectedTags] = useState([])
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const toggleTag = (tag) =>
    setSelectedTags((t) => (t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]))

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center pb-24">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 14 }}
          className="w-20 h-20 rounded-full bg-orange-500 shadow-glow flex items-center justify-center mb-6"
        >
          <ThumbsUp className="w-9 h-9 text-white" />
        </motion.div>
        <h2 className="text-xl font-extrabold">ممنون از نظرت!</h2>
        <p className="mt-2 text-sm text-muted leading-6 max-w-[260px]">
          امتیاز و نظر تو به {restaurant.name} کمک می‌کنه تجربه‌ی بهتری برای همه بسازه.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-6 pt-8 pb-40">
      <div className="text-center">
        <h1 className="text-xl font-extrabold">تجربه‌ت چطور بود؟</h1>
        <p className="text-sm text-muted mt-1">به {restaurant.name} امتیاز بده</p>
      </div>

      <div className="mt-8 flex justify-center gap-2" dir="ltr">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setScore(n)}
            className="p-1 active:scale-90 transition-transform"
            aria-label={`${n} ستاره`}
          >
            <Star
              className={`w-9 h-9 transition-colors ${
                (hover || score) >= n ? 'text-amber fill-amber' : 'text-muted'
              }`}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      <p className="text-center mt-2 text-sm font-medium text-orange-500 h-5">
        {LABELS[hover || score] || ''}
      </p>

      <div className="mt-6">
        <p className="text-sm font-bold mb-3">چی بیشتر خوب بود؟</p>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => {
            const active = selectedTags.includes(tag)
            return (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-xs font-medium px-3.5 py-2 rounded-full transition-colors ${
                  active ? 'bg-orange-500 text-white shadow-glow-sm' : 'glass text-muted'
                }`}
              >
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm font-bold mb-3">نظر تو (اختیاری)</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="تجربه‌ت رو با ما در میون بذار…"
          className="w-full glass rounded-2xl p-4 text-sm outline-none resize-none placeholder:text-muted/70"
        />
      </div>

      <div className="fixed bottom-24 inset-x-0 px-6">
        <div className="max-w-md mx-auto">
          <button
            disabled={score === 0}
            onClick={() => setSubmitted(true)}
            className="w-full h-14 rounded-full bg-orange-500 shadow-glow text-white font-bold disabled:opacity-40 disabled:shadow-none transition-opacity"
          >
            ثبت نظر
          </button>
        </div>
      </div>
    </div>
  )
}
