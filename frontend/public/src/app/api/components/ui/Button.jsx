export default function Button({ variant = 'primary', loading, children, ...rest }) {
  const cls = variant === 'primary' ? 'btn'
    : variant === 'secondary' ? 'btn btn-secondary'
    : variant === 'danger' ? 'btn btn-danger'
    : 'btn btn-ghost'
  return (
    <button className={cls} disabled={loading || rest.disabled} {...rest}>
      {loading ? '...' : children}
    </button>
  )
}