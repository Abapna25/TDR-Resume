import { Link } from 'react-router-dom'

const GALLERY_ITEMS = [
  { seed: 'wood-table', caption: 'Custom Dining Table' },
  { seed: 'wood-shelf', caption: 'Floating Wall Shelves' },
  { seed: 'event-decor', caption: 'Garden Wedding Setup' },
  { seed: 'wood-cabinet', caption: 'Handcrafted Cabinet' },
  { seed: 'event-floral', caption: 'Reception Florals' },
  { seed: 'wood-bench', caption: 'Entry Bench' },
]

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="hero"
        aria-labelledby="hero-heading"
        style={{
          backgroundImage:
            'url(https://picsum.photos/seed/barewedcrafts-hero/1920/1080)',
        }}
      >
        <div className="hero__overlay" aria-hidden="true" />
        <div className="hero__content container">
          <p className="hero__eyebrow">Custom Woodworking &amp; Event Planning</p>
          <h1 id="hero-heading" className="hero__title">
            Made by Hand.<br />
            <em>Remembered Forever.</em>
          </h1>
          <p className="hero__subtitle">
            Barewedcrafts brings together two disciplines — artisan woodworking and curated event experiences — under one roof. Every piece, every moment, crafted with intention.
          </p>
          <div className="btn-group">
            <Link to="/woodworking" className="btn btn--primary">
              Explore Woodworking
            </Link>
            <Link to="/events" className="btn btn--ghost">
              View Events
            </Link>
          </div>
        </div>
      </section>

      {/* ── PROJECT GALLERY ── */}
      <section className="section section--cream" aria-labelledby="gallery-heading">
        <div className="container">
          <div className="section-intro--center text-center mb-4">
            <p className="eyebrow">Our Work</p>
            <span className="gold-rule gold-rule--center" aria-hidden="true" />
            <h2 id="gallery-heading" className="section-title">
              A Glimpse Into the Studio
            </h2>
            <p className="lead mt-2">
              From heirloom furniture to celebration tablescapes — here's a sample of what we create.
            </p>
          </div>

          <ul
            className="gallery-grid"
            aria-label="Project photo gallery"
            role="list"
            style={{ marginTop: '2.5rem' }}
          >
            {GALLERY_ITEMS.map(({ seed, caption }) => (
              <li key={seed} className="gallery-item" role="listitem">
                <img
                  src={`https://picsum.photos/seed/${seed}/800/600`}
                  alt={caption}
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="gallery-item__caption" aria-hidden="true">
                  {caption}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="section" aria-labelledby="who-heading">
        <div className="container">
          <div className="who-grid">
            <div>
              <p className="eyebrow">Who We Are</p>
              <span className="gold-rule" aria-hidden="true" />
              <h2 id="who-heading" className="section-title">
                A Studio Built on Craft &amp; Connection
              </h2>
              <p style={{ marginTop: '1.25rem', lineHeight: '1.85', color: 'var(--text-body)', fontSize: '1.0125rem' }}>
                Barewedcrafts is the creative partnership of Tyler and Akanksha — two people who share an obsession with things made well. Tyler brings years of woodworking craftsmanship to every timber joint and finish. Akanksha translates that same precision into the art of event planning, where every detail tells a story.
              </p>
              <p style={{ marginTop: '1rem', lineHeight: '1.85', color: 'var(--text-body)', fontSize: '1.0125rem' }}>
                Together, we serve clients who value quality over convenience, permanence over trend, and meaning over the mundane.
              </p>
              <div className="btn-group" style={{ marginTop: '2rem' }}>
                <Link to="/about" className="btn btn--outline">
                  Meet the Team
                </Link>
                <Link to="/contact" className="btn btn--outline-gold">
                  Start a Project
                </Link>
              </div>
            </div>
            <div aria-hidden="true">
              <img
                src="https://picsum.photos/seed/studio-workshop/700/840"
                alt="Barewedcrafts studio workshop"
                className="who-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── TWO SERVICE CTAs ── */}
      <section className="section--sm" aria-labelledby="services-heading">
        <div className="container">
          <h2
            id="services-heading"
            className="section-title text-center mb-4"
            style={{ marginBottom: '2rem' }}
          >
            Two Services, One Vision
          </h2>
          <div className="cta-cards">
            {/* Woodworking CTA */}
            <Link
              to="/woodworking"
              className="cta-card"
              aria-label="Explore Custom Woodworking — view projects and commission options"
            >
              <img
                src="https://picsum.photos/seed/woodcraft-cta/900/675"
                alt=""
                aria-hidden="true"
              />
              <div className="cta-card__overlay">
                <p className="eyebrow" style={{ color: 'var(--gold-light)' }}>
                  Custom Woodworking
                </p>
                <h3 className="cta-card__title">Furniture &amp; DIY Projects</h3>
                <span className="btn btn--ghost btn--sm" aria-hidden="true">
                  Explore →
                </span>
              </div>
            </Link>

            {/* Events CTA */}
            <Link
              to="/events"
              className="cta-card"
              aria-label="Explore Event Planning — view services and pricing"
            >
              <img
                src="https://picsum.photos/seed/event-planning-cta/900/675"
                alt=""
                aria-hidden="true"
              />
              <div className="cta-card__overlay">
                <p className="eyebrow" style={{ color: 'var(--gold-light)' }}>
                  Event Planning
                </p>
                <h3 className="cta-card__title">Curated Experiences</h3>
                <span className="btn btn--ghost btn--sm" aria-hidden="true">
                  Explore →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / BRAND QUOTE ── */}
      <section className="section section--dark" aria-labelledby="quote-heading">
        <div className="container text-center">
          <span className="gold-rule gold-rule--center gold-rule--lg" aria-hidden="true" />
          <blockquote>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                color: 'var(--white)',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: '1.5',
              }}
              id="quote-heading"
            >
              "The best things in life are made with patience, love, and really good wood."
            </p>
            <footer style={{ marginTop: '1.5rem', color: 'var(--gold-light)', fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
              — Tyler &amp; Akanksha, Barewedcrafts
            </footer>
          </blockquote>
          <div style={{ marginTop: '2.5rem' }}>
            <Link to="/contact" className="btn btn--primary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}