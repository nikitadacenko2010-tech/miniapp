export default function Select({ label, options = [], ...rest }) {
  return (
    <div className="field">
      {label && <div className="label">{label}</div>}
      <select className="select" {...rest}>
        {options.map(o => (
          <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
        ))}
      </select>
    </div>
  )
}