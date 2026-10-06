import { useClipboard } from '../../hooks/useClipboard'

export default function RequisiteRow({ item, onRemove }) {
  const copy = useClipboard()
  return (
    <div className="requisite">
      <div className="requisite-info">
        <strong>
          {item.type}
          {item.label && <span style={{ color: '#8a8f98', fontWeight: 400 }}> · {item.label}</span>}
        </strong>
        <span>{item.value}</span>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="copy-btn" onClick={() => copy(item.value)}>Копи</button>
        <button className="copy-btn" style={{ background: '#fdeaea', color: '#e5484d' }} onClick={() => onRemove(item.id)}>×</button>
      </div>
    </div>
  )
}