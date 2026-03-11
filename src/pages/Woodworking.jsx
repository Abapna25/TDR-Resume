import { Link } from 'react-router-dom'
import { Armchair, Hammer, Frame, LayoutPanelLeft } from 'lucide-react'

const PROJECTS = [
  {
    seed: 'walnut-dining-table',
    title: 'Walnut Dining Table',
    material: 'Black Walnut',
    desc: 'A 96" live-edge slab dining table with hand-turned legs and oil finish.',
  },
  {
    seed: 'floating-shelves',
    title: 'Floating Display Shelves',
    material: 'White Oak',
    desc: 'Custom-length wall shelves with brass bracket hardware and staggered depth.',
  },
  {
    seed: 'entry-bench',
    title: 'Entry Bench',
    material: 'Hard Maple',
    desc: 'A jointed entry bench with hidden storage and hand-applied Danish oil.',
  },
  {
    seed: 'coffee-table',
    title: 'Hairpin Coffee Table',
    material: 'Cherry',
    desc: 'Mid-century inspired coffee table with cherry top and steel hairpin legs.',
  },
  {
    seed: 'bookcase-build',
    title: 'Built-in Bookcase',
    material: 'Poplar + Paint',
    desc: 'Floor-to-ceiling built-in with adjustable shelves, painted crisp white.',
  },
  {
    seed: 'cutting-board',
    title: 'End-Grain Cutting Board Set',
    material: 'Mixed Hardwood',
    desc: 'Heirloom-quality end-grain boards in walnut, maple, and cherry mosaic.',
  },
]

const SERVICES = [
  {
    Icon: Armchair,
    title: 'Custom Furniture',
    desc: 'Commission one-of-a-kind pieces designed around your space, style, and story. Tables, benches, beds, cabinets — built to last generations.',
  },
  {
    Icon: Hammer,
    title: 'DIY Project Kits',
    desc: 'Pre-cut, pre-measured kits for popular woodworking projects — designed so you can assemble with confidence and own the result.',
  },
  {
    Icon: Frame,
    title: 'Home Accents',
    desc: 'Smaller commissions with outsized impact: cutting boards, floating shelves, frames, decorative boxes, and seasonal pieces.',
  },
  {
    Icon: LayoutPanelLeft,
    title: 'Built-ins & Millwork',
    desc: 'Integrated cabinetry, shelving systems, and architectural millwork that make a house feel intentionally designed.',
  },
]

export default function Woodworking() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section
        className="page-hero page-hero--image"
        aria-labelledby="woodworking-heading"
        style={{
          backgroundImage:
            'url(https://picsum.photos/seed/wood-shop-hero/1920/900)',
        }}
      >
        <div className="container page-hero__content" style={{ padding: '5rem var(--side-pad) 4rem' }}>
          <p className="eyebrow" style={{ color: 'var(--gold-light)', marginBottom: '1rem' }}>
            The Craft
          </p>
          <span className="gold-rule gold-rule--lg" aria-hidden="true" />
          <h1 id="woodworking-heading" className="page-title" style={{ color: 'var(--white)', maxWidth: '600px' }}>
            Custom Woodworking &amp; DIY Projects
          </h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', marginTop: '1.25rem' }}>
            Heirloom-quality pieces built from sustainably sourced hardwoods, designed to fit your space and outlive trends.
          </p>
        </div>
      </section>

      {/* ── SERVICES OFFERED ── */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <div className="section-intro--center text-center mb-4">
            <p className="eyebrow">What We Do</p>
            <span className="gold-rule gold-rule--center" aria-hidden="true" />
            <h2 id="services-heading" className="section-title">What We Can Build For You</h2>
            <p className="lead mt-2">
              Every project starts with a conversation. We listen first, then design around your vision.
            </p>
          </div>

          <ul
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              alignItems: 'stretch',
              marginTop: '2.5rem',
            }}
            role="list"
            aria-label="Woodworking services"
          >
            {SERVICES.map(({ Icon, title, desc }) => (
              <li
                key={title}
                className="service-card"
                role="listitem"
                style={{ alignItems: 'flex-start' }}
              >
                <Icon
                  size={28}
                  color="var(--gold)"
                  strokeWidth={1.5}
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                />
                <div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                    {title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '0.9375rem' }}>{desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PROJECT GALLERY ── */}
      <section className="section section--cream" aria-labelledby="portfolio-heading">
        <div className="container">
          <div className="section-intro mb-4">
            <p className="eyebrow">Portfolio</p>
            <span className="gold-rule" aria-hidden="true" />
            <h2 id="portfolio-heading" className="section-title">Recent Projects</h2>
            <p className="lead mt-2">
              A selection of pieces delivered to clients across the Pacific Northwest.
            </p>
          </div>

          <ul
            className="gallery-grid"
            role="list"
            aria-label="Woodworking project portfolio"
            style={{ marginTop: '2rem' }}
          >
            {PROJECTS.map(({ seed, title, material, desc }) => (
              <li key={seed} role="listitem">
                <article>
                  <div className="gallery-item">
                    <img
                      src={`https://picsum.photos/seed/${seed}/800/600`}
                      alt={`${title} — ${material}`}
                      width={800}
                      height={600}
                      loading="lazy"
                    />
                    <div className="gallery-item__caption" aria-hidden="true">{material}</div>
                  </div>
                  <div style={{ padding: '1rem 0.25rem 0.5rem' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
                      {title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.7' }}>{desc}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PROCESS SECTION ── */}
      <section className="section" aria-labelledby="process-heading">
        <div className="container">
          <div className="two-col" style={{ gap: '5rem', alignItems: 'start' }}>
            <div>
              <p className="eyebrow">How It Works</p>
              <span className="gold-rule" aria-hidden="true" />
              <h2 id="process-heading" className="section-title">The Commission Process</h2>
              <ol style={{ marginTop: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  ['Consultation', 'We talk through your vision, space measurements, material preferences, and budget. No pressure, just planning.'],
                  ['Design & Quote', 'Tyler sketches the piece and provides a detailed cost breakdown with material specs and a timeline.'],
                  ['Build', 'Construction begins once the quote is approved. We keep you updated with photos throughout the build.'],
                  ['Delivery & Install', 'We deliver locally and can assist with installation for built-ins and heavy pieces.'],
                ].map(([step, detail], i) => (
                  <li key={step} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2rem',
                        fontWeight: 700,
                        color: 'var(--gold)',
                        lineHeight: 1,
                        minWidth: '2rem',
                        opacity: 0.7,
                      }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', marginBottom: '0.375rem' }}>{step}</h3>
                      <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '0.9375rem' }}>{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <img
                src="https://picsum.photos/seed/woodworking-process/700/875"
                alt="Tyler working in the woodworking studio"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="section section--dark" aria-labelledby="wood-cta-heading">
        <div className="container text-center">
          <h2 id="wood-cta-heading" className="section-title" style={{ color: 'var(--white)', marginBottom: '1rem' }}>
            Ready to Commission a Piece?
          </h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>
            Let's talk through your vision. No obligation — just a conversation.
          </p>
          <Link to="/contact" className="btn btn--primary">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  )
}