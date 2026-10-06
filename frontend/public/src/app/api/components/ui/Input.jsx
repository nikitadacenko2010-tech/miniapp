export default function Input({ label, ...rest }) {
  return (
    <div className="field">
      {label && <div className="label">{label}</div>}
      <input className="input" {...rest} />
    </div>
  )
}