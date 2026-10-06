import { useEffect } from 'react'
import { ToastProvider } from '../hooks/useToast'

export function Providers({ children }) {
  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg) return
    tg.ready()
    tg.expand()
    tg.setHeaderColor('#ffffff')
    tg.setBackgroundColor('#ffffff')
    tg.disableVerticalSwipes?.()
  }, [])

  return <ToastProvider>{children}</ToastProvider>
}