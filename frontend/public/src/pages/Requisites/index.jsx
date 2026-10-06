import { useEffect, useState } from 'react'
import Header from '../../layouts/Header'
import Button from '../../components/ui/Button'
import Empty from '../../components/ui/Empty'
import RequisiteRow from '../../components/requisite/RequisiteRow'
import RequisiteForm from '../../components/requisite/RequisiteForm'
import { requisitesApi } from '../../api'
import { useToast } from '../../hooks/useToast'

export default function Requisites() {
  const toast = useToast()
  const [list, setList] = useState([])
  const [showForm, setShowForm] = useState(false)

  const load = () => requisitesApi.list().then(setList).catch(() => {})

  useEffect(() => { load() }, [])

  const add = async (data) => {
    try {
      await requisitesApi.create(data)
      setShowForm(false)
      toast('Реквизит добавлен')
      load()
    } catch (e) {
      toast('Ошибка: ' + e.message)
    }
  }

  const remove = async (id) => {
    await requisitesApi.remove(id)
    load()
  }

  return (
    <>
      <Header title="Реквизиты" subtitle="Для получения средств" />

      {list.map(r => (
        <div className="card-white" key={r.id}>
          <RequisiteRow item={r} onRemove={remove} />
        </div>
      ))}
      {list.length === 0 && <Empty>Реквизитов нет</Empty>}

      {!showForm && (
        <Button style={{ marginTop: 12 }} onClick={() => setShowForm(true)}>
          + Добавить реквизит
        </Button>
      )}

      {showForm && (
        <div style={{ marginTop: 12 }}>
          <RequisiteForm onSave={add} onCancel={() => setShowForm(false)} />
        </div>
      )}
    </>
  )
}