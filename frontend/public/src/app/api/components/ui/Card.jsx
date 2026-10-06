export default function Card({ variant = 'surface', children, ...rest }) {
  return (
    <div className={variant === 'white' ? 'card-white' : 'card'} {...rest}>
      {children}
    </div>
  )
}