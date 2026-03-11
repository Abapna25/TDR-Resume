import { useState, useEffect, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/woodworking', label: 'Woodworking' },
  { to: '/events', label: 'Events' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
          hamburgerRef.current && !hamburgerRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [menuOpen])

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [menuOpen])

  const linkClass = ({ isActive }) =>
    `navbar__link${isActive ? ' active' : ''}`

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Barewedcrafts — Go to homepage">
          Bare<span>wed</span>crafts
        </Link>

        <nav className="navbar__links" aria-label="Primary navigation">
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} className={linkClass}>
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          ref={hamburgerRef}
          className="navbar__hamburger"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(v => !v)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        id="mobile-nav"
        ref={menuRef}
        className={`navbar__mobile${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {NAV_LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={linkClass}
            tabIndex={menuOpen ? 0 : -1}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}