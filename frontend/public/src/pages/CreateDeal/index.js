import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../../layouts/Header'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import Textarea from '../../components/ui/Textarea'
import Button from '../../components/ui/Button'
import Chip from '../../components/ui/Chip'
import { useToast } from '../../hooks/useToast'
import { useDealsStore } from '../../store/deals'
import { CURRENCIES, PAY_METHODS } from '../../lib/constants'

export default function CreateDeal() {
  const nav = useNavigate()
  const toast = useToast()
  const createDeal = useDealsStore(s => s.create)

  const [form, setForm] = useState({
    role: 'seller',
    amount: '',
    currency: 'RUB',
    method: 'СБП',
    counterparty: '',
    comment: '',
  })
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    if (!form.amount || Number(form.amount) <= 0) {
      toast('Укажите сумму')
      return
    }
    setLoading(true)
    try {
      const deal = await createDeal(form)
      toast(`Сделка #${deal.id} создана`)
      nav('/deals')
    } catch (e) {
      toast('Ошибка: ' + e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header title="Создать сделку" subtitle="Параметры и условия" />

      <div className="field">
        <div className="label">Роль</div>
        <div className="chip-row">
          <Chip active={form.role === 'seller'} onClick={() => set('role', 'seller')}>Продавец</Chip>
          <Chip active={form.role === 'buyer'} onClick={() => set('role', 'buyer')}>Покупатель</Chip>
        </div>
      </div>

      <div className="field">
        <div className="label">Сумма</div>
        <div className="row">
          <input
            className="input"
            type="number"
            placeholder="0.00"
            value={form.amount}
            onChange={e => set('amount', e.target.value)}
          />
          <select
            className="select"
            style={{ maxWidth: 110 }}
            value={form.currency}
            onChange={e => set('currency', e.target.value)}
          >
            {CURRENCIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div className="field">
        <div className="label">Способ оплаты</div>
        <div className="chip-row">
          {PAY_METHODS.map(m => (
            <Chip key={m} active={form.method === m} onClick={() => set('method', m)}>{m}</Chip>
          ))}
        </div>
      </div>

      <Input
        label="Контрагент (username)"
        placeholder="@username"
        value={form.counterparty}
        onChange={e => set('counterparty', e.target.value)}
      />

      <Textarea
        label="Комментарий"
        placeholder="Условия сделки, сроки, детали..."
        value={form.comment}
        onChange={e => set('comment', e.target.value)}
      />

      <Button loading={loading} onClick={submit}>Создать сделку</Button>
    </>
  )
}