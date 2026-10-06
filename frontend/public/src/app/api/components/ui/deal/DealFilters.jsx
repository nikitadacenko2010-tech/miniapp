import Chip from '../ui/Chip'
import { DEAL_STATUSES, STATUS_LABELS } from '../../lib/constants'

export default function DealFilters({ value, onChange }) {
  const all = [{ value: 'all', label: 'Все' }, ...DEAL_STATUSES.map(s => ({ value: s, label: STATUS_LABELS[s] }))]
  return (
    <div className="chip-row">
      {all.map(f => (
        <Chip key={f.value} active={value === f.value} onClick={() => onChange(f.value)}>
          {f.label}
        </Chip>
      ))}
    </div>
  )
}