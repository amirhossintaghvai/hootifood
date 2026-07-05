import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AppProvider, useApp } from './context/AppContext'
import AmbientBackground from './components/AmbientBackground'
import BottomNav from './components/BottomNav'
import SplashScreen from './screens/SplashScreen'
import RegisterScreen from './screens/RegisterScreen'
import OtpScreen from './screens/OtpScreen'
import ScanScreen from './screens/ScanScreen'
import HomeScreen from './screens/HomeScreen'
import NearbyScreen from './screens/NearbyScreen'
import SettingsScreen from './screens/SettingsScreen'
import WalletScreen from './screens/WalletScreen'
import MenuScreen from './screens/MenuScreen'
import CartScreen from './screens/CartScreen'
import AssistantScreen from './screens/AssistantScreen'
import RatingScreen from './screens/RatingScreen'

function Shell() {
  const { session, setSession, setUser } = useApp()
  const [stage, setStage] = useState('splash') // splash | register | otp | app
  const [tab, setTab] = useState('home')
  const [pendingUser, setPendingUser] = useState(null) // { fullName, phone } awaiting OTP

  const handleScanned = (decodedText) => {
    const tableMatch = decodedText.match(/(\d+)/)
    setSession({
      tableNumber: tableMatch ? tableMatch[1] : String(Math.ceil(Math.random() * 20)),
      scannedAt: Date.now(),
      raw: decodedText,
    })
    setStage('app')
    setTab('menu')
  }

  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {stage === 'splash' && (
            <motion.div key="splash" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <SplashScreen onScan={() => setStage('register')} />
            </motion.div>
          )}

          {stage === 'register' && (
            <motion.div key="register" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <RegisterScreen
                onBack={() => setStage('splash')}
                onRegistered={(data) => {
                  setPendingUser(data)
                  setStage('otp')
                }}
              />
            </motion.div>
          )}

          {stage === 'otp' && (
            <motion.div key="otp" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <OtpScreen
                phone={pendingUser?.phone}
                onBack={() => setStage('register')}
                onVerified={() => {
                  setUser(pendingUser)
                  setStage('app')
                  setTab('home')
                }}
              />
            </motion.div>
          )}

          {stage === 'app' && (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {tab === 'home' && <HomeScreen onNavigate={setTab} />}
              {tab === 'scan' && <ScanScreen onBack={() => setTab('home')} onScanned={handleScanned} />}
              {tab === 'nearby' && <NearbyScreen onOrder={() => setTab('menu')} />}
              {tab === 'settings' && <SettingsScreen onNavigate={setTab} />}
              {tab === 'wallet' && <WalletScreen />}
              {tab === 'history' && <HomeScreen onNavigate={setTab} />}
              {tab === 'menu' && <MenuScreen tableNumber={session?.tableNumber} />}
              {tab === 'cart' && (
                <CartScreen
                  tableNumber={session?.tableNumber}
                  onGoToMenu={() => setTab('menu')}
                  onGoToRating={() => setTab('rating')}
                />
              )}
              {tab === 'assistant' && <AssistantScreen />}
              {tab === 'rating' && <RatingScreen />}

              <BottomNav active={tab} onChange={setTab} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
