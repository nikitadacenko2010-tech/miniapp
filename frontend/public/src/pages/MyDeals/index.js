import { useEffect, useState } from 'react'
import Header from '../../layouts/Header'
import DealCard from '../../components/deal/DealCard'
import DealFilters from '../../components/deal/DealFilters'
import Empty from '../../components/ui/Empty'
import { useDealsStore } from '../../store/deals'

export default function MyDeals() {
  const { deals, load } = useDealsStore()
  const [filter, setFilter] = useState('all')

  useEffect(() => { load().catch(() => {}) }, [load])

  const shown = filter === 'all' ? deals : deals.filter(d => d.status === filter)

  return (
    <>
      <Header title="Мои сделки" subtitle={`Всего: ${deals.length}`} />
      <DealFilters value={filter} onChange={setFilter} />
      {shown.map(d => <DealCard key={d.id} deal={d} />)}
      {shown.length === 0 && <Empty>Нет сделок в этой категории</Empty>}
    </>
  )
}