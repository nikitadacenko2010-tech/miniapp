import { useEffect, useState } from 'react'
import Header from '../../layouts/Header'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Button from '../../components/ui/Button'
import Empty from '../../components/ui/Empty'
import { withdrawApi, requisitesApi } from '../../api'
import { useProfileStore } from '../../store/profile'
import { useToast } from '../../hooks/useToast'
import { formatMoney } from '../../lib/format'

export default function Withdraw() {
  const toast = useToast()
  const { profile, load } = useProfileStore()
  const [requisites, setRequisites] = useState([])
  const [form, setForm] = useState({ amount: '', requisite_id: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    load().catch(() => {})
    requisitesApi.list().then(rs => {
      setRequisites(rs)
      if (rs[0]) setForm(f => ({ ...f, requisite_id: rs[0].id }))
    }).catch(() => {})
  }, [load])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    if (!form.amount || Number(form.amount) <= 0) return toast('Укажите сумму')
    if (!form.requisite_id) return toast('Выберите реквизит')
    if (Number(form.amount) > (profile?.balance ?? 0)) return toast('Недостаточно средств')

    setLoading(true)
    try {
      await withdrawApi.submit(form)
      toast('Заявка на вывод создана')
      setForm({ amount: '', requisite_id: requisites[0]?.id || '' })
      load(true)
    } catch (e) {
      toast('Ошибка: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header title="Вывод средств" subtitle={`Доступно: ${formatMoney(profile?.balance ?? 0)}`} />

      {requisites.length === 0 ? (
        <Empty>Сначала добавьте реквизит</Empty>
      ) : (
        <div className="card-white">
          <Input
            label="Сумма"
            type="number"
            placeholder="0.00"
            value={form.amount}
            onChange={e => set('amount', e.target.value)}
          />
          <Select
            label="Реквизит"
            value={form.requisite_id}
            options={requisites.map(r => ({ value: r.id, label: `${r.type} · ${r.value}` }))}
            onChange={e => set('requisite_id', Number(e.target.value))}
          />
          <Button loading={loading} onClick={submit}>Отправить заявку</Button>
        </div>
      )}
    </>
  )
}