export default function Chip({ active, children, onClick }) {
  return (
    <div className={'chip' + (active ? ' active' : '')} onClick={onClick}>
      {children}
    </div>
  )
}