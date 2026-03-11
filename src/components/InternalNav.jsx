import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { signOut } from './ProtectedRoute'

const INTERNAL_LINKS = [
  { to: '/internal/calculator', label: 'Calculator' },
  { to: '/internal/wood-rates', label: 'Wood Rates' },
  { to: '/internal/settings', label: 'Settings' },
]

export default function InternalNav() {
  const navigate = useNavigate()

  const linkClass = ({ isActive }) =>
    `internal-nav__link${isActive ? ' active' : ''}`

  function handleSignOut() {
    signOut()
    navigate('/internal/login', { replace: true })
  }

  return (
    <header className="internal-nav" role="banner">
      <div className="internal-nav__inner">
        <span className="internal-nav__logo" aria-label="Barewedcrafts internal tools">
          BWC Internal
        </span>

        <nav className="internal-nav__links" aria-label="Internal tools navigation">
          {INTERNAL_LINKS.map(({ to, label }) => (
            <NavLink key={to} to={to} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleSignOut}
          className="internal-nav__link"
          style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer' }}
          aria-label="Sign out of internal tools"
        >
          <LogOut size={14} strokeWidth={2} aria-hidden="true" />
          Lock
        </button>
      </div>
    </header>
  )
}