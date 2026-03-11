import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="Barewedcrafts homepage">
              Bare<span>wed</span>crafts
            </Link>
            <p className="footer__tagline">
              Crafting heirloom woodwork and curating unforgettable events — built with care, intention, and a love for the handmade.
            </p>
          </div>

          <nav className="footer__col" aria-label="Services navigation">
            <span className="footer__col-title">Services</span>
            <Link to="/woodworking" className="footer__link">Custom Woodworking</Link>
            <Link to="/woodworking" className="footer__link">DIY Projects</Link>
            <Link to="/events" className="footer__link">Event Planning</Link>
            <Link to="/events" className="footer__link">Event Pricing</Link>
          </nav>

          <nav className="footer__col" aria-label="Company navigation">
            <span className="footer__col-title">Company</span>
            <Link to="/about" className="footer__link">About Us</Link>
            <Link to="/contact" className="footer__link">Contact</Link>
            <Link to="/resume/tyler" className="footer__link">Tyler's Resume</Link>
            <Link to="/resume/akanksha" className="footer__link">Akanksha's Resume</Link>
          </nav>
        </div>

        <div className="footer__bottom">
          <span>© {year} Barewedcrafts. All rights reserved.</span>
          <span>Crafted with intention by Tyler &amp; Akanksha</span>
        </div>
      </div>
    </footer>
  )
}