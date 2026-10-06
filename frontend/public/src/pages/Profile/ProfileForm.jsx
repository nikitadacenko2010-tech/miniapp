import { useState } from 'react'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import { useToast } from '../../hooks/useToast'
import { useProfileStore } from '../../store/profile'

export default function ProfileForm() {
  const toast = useToast()
  const { profile, update } = useProfileStore()
  const [form, setForm] = useState({
    first_name: profile?.first_name || '',
    email: profile?.email || '',
    contact_tg: profile?.contact_tg || '',
  })
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    setLoading(true)
    try {
      await update(form)
      toast('Сохранено')
    } catch (e) {
      toast('Ошибка: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card-white">
      <Input label="Имя" value={form.first_name} onChange={e => set('first_name', e.target.value)} />
      <Input label="Email" value={form.email} onChange={e => set('email', e.target.value)} />
      <Input label="Telegram для связи" value={form.contact_tg} onChange={e => set('contact_tg', e.target.value)} />
      <Button loading={loading} onClick={submit}>Сохранить</Button>
    </div>
  )
}