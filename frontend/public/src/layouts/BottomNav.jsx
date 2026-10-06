import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', icon: '🏠', label: 'Главная', end: true },
  { to: '/deals', icon: '📋', label: 'Сделки' },
  { to: '/create', icon: '➕', label: 'Создать' },
  { to: '/requisites', icon: '💳', label: 'Реквизиты' },
  { to: '/profile', icon: '👤', label: 'Профиль' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {items.map(i => (
        <NavLink
          key={i.to}
          to={i.to}
          end={i.end}
          className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
        >
          <span className="nav-icon">{i.icon}</span>
          <span>{i.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}