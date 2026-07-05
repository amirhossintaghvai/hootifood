import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { findItem } from '../data/menu'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('hooti-theme') || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('hooti-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // auth: filled in after successful registration + OTP verification
  const [user, setUser] = useState(null) // { fullName, phone }

  // session: becomes truthy after a successful QR scan
  const [session, setSession] = useState(null) // { tableNumber, scannedAt }

  // cart: { [itemId]: qty }
  const [cart, setCart] = useState({})

  const addToCart = (id, qty = 1) => {
    setCart((c) => ({ ...c, [id]: Math.max(0, (c[id] || 0) + qty) }))
  }
  const setQty = (id, qty) => {
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }
  const removeFromCart = (id) => setQty(id, 0)
  const clearCart = () => setCart({})

  const cartLines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, qty]) => ({ item: findItem(id), qty }))
        .filter((l) => l.item),
    [cart]
  )

  const cartCount = cartLines.reduce((s, l) => s + l.qty, 0)
  const cartTotal = cartLines.reduce((s, l) => s + l.qty * l.item.price, 0)

  const [lastOrder, setLastOrder] = useState(null)

  const value = {
    theme,
    toggleTheme,
    user,
    setUser,
    session,
    setSession,
    cart,
    cartLines,
    cartCount,
    cartTotal,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    lastOrder,
    setLastOrder,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => useContext(AppContext)
