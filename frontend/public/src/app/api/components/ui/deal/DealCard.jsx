import StatusBadge from '../ui/StatusBadge'
import { formatMoney, formatDate } from '../../lib/format'

export default function DealCard({ deal }) {
  return (
    <div className="deal-card">
      <div className="deal-head">
        <div className="deal-amount">{formatMoney(deal.amount, deal.currency)}</div>
        <StatusBadge status={deal.status} />
      </div>
      <div style={{ fontSize: 14, color: '#555', marginTop: 4 }}>
        {deal.role === 'seller' ? 'Продажа' : 'Покупка'} · {deal.method}
      </div>
      <div className="deal-meta">
        <span>#{deal.id}</span>
        <span>{deal.counterparty || '—'}</span>
        <span>{formatDate(deal.created_at)}</span>
      </div>
      {deal.comment && (
        <div style={{ fontSize: 13, marginTop: 6, color: '#666' }}>{deal.comment}</div>
      )}
    </div>
  )
}