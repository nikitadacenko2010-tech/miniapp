import { formatMoney } from '../../lib/format'

export default function BalanceCard({ balance = 0 }) {
  return (
    <div className="balance-card">
      <div className="balance-label">Баланс</div>
      <div className="balance-amount">{formatMoney(balance, 'RUB')}</div>
      <div className="balance-sub">Доступно для вывода</div>
    </div>
  )
}