import { useState } from 'react'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { REQUISITE_TYPES } from '../../lib/constants'

export default function RequisiteForm({ onSave, onCancel }) {
  const [form, setForm] = useState({ type: 'СБП', value: '', label: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = () => {
    if (!form.value.trim()) return
    onSave(form)
  }

  return (
    <div className="card-white">
      <Select label="Тип" value={form.type} options={REQUISITE_TYPES} onChange={e => set('type', e.target.value)} />
      <Input label="Значение" placeholder="+7 999 …" value={form.value} onChange={e => set('value', e.target.value)} />
      <Input label="Метка" placeholder="Основная карта" value={form.label} onChange={e => set('label', e.target.value)} />
      <div className="row">
        <Button variant="secondary" onClick={onCancel}>Отмена</Button>
        <Button onClick={submit}>Сохранить</Button>
      </div>
    </div>
  )
}