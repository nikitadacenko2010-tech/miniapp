import { useToast } from './useToast'

export function useClipboard() {
  const toast = useToast()
  return async (text, label = 'Скопировано') => {
    try {
      await navigator.clipboard.writeText(text)
      toast(label)
    } catch {
      toast('Не удалось скопировать')
    }
  }
}