import { createContext, useContext, useState, useCallback } from 'react'

const Ctx = createContext(null)

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('')

  const toast = useCallback((text, ms = 2000) => {
    setMsg(text)
    setTimeout(() => setMsg(''), ms)
  }, [])

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      {msg && <div className="toast">{msg}</div>}
    </Ctx.Provider>
  )
}

export function useToast() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useToast outside ToastProvider')
  return v.toast
}