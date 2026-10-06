export function useTelegram() {
  const tg = window.Telegram?.WebApp
  return {
    tg,
    user: tg?.initDataUnsafe?.user ?? null,
    initData: tg?.initData ?? '',
    haptic: (type = 'light') => tg?.HapticFeedback?.impactOccurred(type),
    close: () => tg?.close(),
    openLink: (url) => tg?.openLink(url),
  }
}