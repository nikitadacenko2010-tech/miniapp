import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../layouts/Header'
import BalanceCard from './BalanceCard'
import DealCard from '../../components/deal/DealCard'
import Empty from '../../components/ui/Empty'
import { useProfileStore } from '../../store/profile'
import { useDealsStore } from '../../store/deals'

export default function Home() {
  const { profile, load: loadProfile } = useProfileStore()
  const { deals, load: loadDeals } = useDealsStore()

  useEffect(() => {
    loadProfile().catch(() => {})
    loadDeals().catch(() => {})
  }, [loadProfile, loadDeals])

  const active = deals.filter(d => d.status === 'active').length
  const done = deals.filter(d => d.status === 'done').length

  return (
    <>
      <Header title="Deal Hub" subtitle="Безопасные сделки в Telegram" />
      <BalanceCard balance={profile?.balance ?? 0} />

      <div className="row">
        <div className="card-white" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{active}</div>
          <div className="label" style={{ margin: 0 }}>Активных</div>
        </div>
        <div className="card-white" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{done}</div>
          <div className="label" style={{ margin: 0 }}>Завершено</div>
        </div>
        <div className="card-white" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 700 }}>{profile?.rating?.toFixed(1) ?? '—'}</div>
          <div className="label" style={{ margin: 0 }}>Рейтинг</div>
        </div>
      </div>

      <div className="section-title">Быстрые действия</div>
      <Link to="/create" style={{ textDecoration: 'none' }}>
        <button className="btn" style={{ marginBottom: 10 }}>Создать сделку</button>
      </Link>
      <Link to="/withdraw" style={{ textDecoration: 'none' }}>
        <button className="btn btn-secondary" style={{ marginBottom: 10 }}>Вывести средства</button>
      </Link>
      <Link to="/support" style={{ textDecoration: 'none' }}>
        <button className="btn btn-secondary">Поддержка</button>
      </Link>

      <div className="section-title">Последние сделки</div>
      {deals.slice(0, 3).map(d => <DealCard key={d.id} deal={d} />)}
      {deals.length === 0 && <Empty>Сделок пока нет</Empty>}
    </>
  )
}