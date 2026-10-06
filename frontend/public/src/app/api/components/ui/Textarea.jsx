export default function Textarea({ label, ...rest }) {
  return (
    <div className="field">
      {label && <div className="label">{label}</div>}
      <textarea className="textarea" {...rest} />
    </div>
  )
}