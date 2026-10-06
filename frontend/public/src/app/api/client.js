const BASE = import.meta.env.VITE_API || ''

export async function request(path, { method = 'GET', body, signal } = {}) {
  const initData = window.Telegram?.WebApp?.initData || ''
  const res = await fetch(BASE + path, {
    method,
    signal,
    headers: {
      'Content-Type': 'application/json',
      'X-Init-Data': initData,
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(text || `HTTP ${res.status}`)
  }
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}