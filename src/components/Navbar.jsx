import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}
      role="banner"
    >
      <div className="navbar__inner">
        <span
          className="navbar__logo"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '1.125rem', letterSpacing: '0.01em', color: 'var(--text-dark)', cursor: 'default' }}
        >
          Tyler Reid
        </span>
      </div>
    </header>
  )
}