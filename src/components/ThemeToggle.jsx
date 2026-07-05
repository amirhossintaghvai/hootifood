import { Moon, Sun } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useApp()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label="تغییر تم"
      className="glass rounded-full flex items-center gap-1 p-1 shrink-0"
    >
      <span
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
          isDark ? 'bg-orange-500 shadow-glow-sm' : ''
        }`}
      >
        <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-white' : 'text-muted'}`} strokeWidth={2} />
      </span>
      <span
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
          !isDark ? 'bg-orange-500 shadow-glow-sm' : ''
        }`}
      >
        <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-white' : 'text-muted'}`} strokeWidth={2} />
      </span>
    </button>
  )
}
