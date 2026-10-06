export default function SupportRow({ icon, title, subtitle, href, onClick }) {
  const inner = (
    <>
      <div className="support-icon">{icon}</div>
      <div className="support-info">
        <strong>{title}</strong>
        {subtitle && <span>{subtitle}</span>}
      </div>
    </>
  )
  if (href) return <a className="support-item" href={href} target="_blank" rel="noreferrer">{inner}</a>
  return <div className="support-item" onClick={onClick}>{inner}</div>
}