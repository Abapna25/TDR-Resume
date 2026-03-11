import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="page-hero" aria-labelledby="about-heading">
        <div className="container" style={{ padding: '5rem var(--side-pad) 4rem' }}>
          <p className="eyebrow" style={{ color: 'var(--gold-light)', marginBottom: '1rem' }}>
            The People
          </p>
          <span className="gold-rule gold-rule--lg" aria-hidden="true" />
          <h1 id="about-heading" className="page-title" style={{ color: 'var(--white)' }}>
            About the Creators
          </h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '520px', marginTop: '1.25rem' }}>
            Two creators. One studio. An unwavering commitment to making things that matter.
          </p>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="section" aria-labelledby="story-heading">
        <div className="container">
          <div className="section-intro--center text-center" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p className="eyebrow">Our Story</p>
            <span className="gold-rule gold-rule--center" aria-hidden="true" />
            <h2 id="story-heading" className="section-title">How Barewedcrafts Began</h2>
            <p style={{ marginTop: '1.25rem', lineHeight: '1.9', color: 'var(--text-body)', fontSize: '1.0125rem' }}>
              Barewedcrafts started as a kitchen table conversation about doing work that was actually meaningful. Tyler had been woodworking nights and weekends, and Akanksha had been managing events professionally for years. One day they looked at each other and asked: why not build something of our own?
            </p>
            <p style={{ marginTop: '1rem', lineHeight: '1.9', color: 'var(--text-body)', fontSize: '1.0125rem' }}>
              The name means two things at once. On the surface, it's about stripping away the excess — bare materials, bare intention, the kind of work that doesn't need ornamentation to feel worthwhile. But BARE is also us: <strong>BA</strong>pna + <strong>Re</strong>id. It felt right that the name held both meanings at the same time.
            </p>
            <p style={{ marginTop: '1rem', lineHeight: '1.9', color: 'var(--text-body)', fontSize: '1.0125rem' }}>
              We believe the best craft is honest, functional, and made to endure.
            </p>
          </div>
        </div>
      </section>

      {/* ── TEAM PROFILES ── */}
      <section className="section section--cream" aria-labelledby="team-heading">
        <div className="container">
          <h2 id="team-heading" className="section-title text-center mb-4" style={{ marginBottom: '2.5rem' }}>
            Meet the Team
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Tyler */}
            <article className="person-card" aria-labelledby="tyler-name">
              <img
                src="https://picsum.photos/seed/tyler-portrait/440/580"
                alt="Tyler, co-founder and lead woodworker at Barewedcrafts"
                className="person-card__img"
              />
              <div className="person-card__body">
                <p className="person-card__role">Co-Founder &amp; Lead Woodworker</p>
                <h3 id="tyler-name" className="person-card__name">Tyler</h3>
                <span className="gold-rule" style={{ marginTop: '0.25rem', marginBottom: '0.875rem' }} aria-hidden="true" />
                <p className="person-card__bio">
                  When Tyler decided to remodel his condo, he didn't hire anyone. He watched videos, read forums, bought tools he didn't fully know how to use yet, and figured it out room by room.
                </p>
                <p className="person-card__bio" style={{ marginTop: '0.75rem' }}>
                  Somewhere in the middle of all that — between the tile work and the trim and the late nights sanding things nobody would ever see — he realized he didn't want to stop. Especially the wood. There was something about working with it that felt different from everything else: honest, tactile, permanent.
                </p>
                <p className="person-card__bio" style={{ marginTop: '0.75rem' }}>
                  He jokes that his last name historically meant someone who laid tiles, so maybe the condo was always just the beginning.
                </p>
                <p className="person-card__bio" style={{ marginTop: '0.75rem' }}>
                  Since then, he's gone deep — hardwood furniture, live-edge slabs, custom built-ins. His latest project was a 10–12 seat dining table designed and built in under six weeks to host family for Thanksgiving 2025, just months after moving cross-country. When he's not in the shop, he's hunting estate sales for vintage hand tools and fueling long build sessions with an unreasonable amount of sour candy.
                </p>
                <div className="btn-group" style={{ marginTop: '1.25rem' }}>
                  <Link to="/resume/tyler" className="btn btn--outline btn--sm">
                    View Tyler's Resume
                  </Link>
                  <Link to="/contact" className="btn btn--outline-gold btn--sm">
                    Commission a Piece
                  </Link>
                </div>
              </div>
            </article>

            {/* Akanksha */}
            <article className="person-card" aria-labelledby="akanksha-name">
              <img
                src="https://picsum.photos/seed/akanksha-portrait/440/580"
                alt="Akanksha, co-founder and event planning director at Barewedcrafts"
                className="person-card__img"
              />
              <div className="person-card__body">
                <p className="person-card__role">Co-Founder &amp; Event Planning Director</p>
                <h3 id="akanksha-name" className="person-card__name">Akanksha</h3>
                <span className="gold-rule" style={{ marginTop: '0.25rem', marginBottom: '0.875rem' }} aria-hidden="true" />
                <p className="person-card__bio">
                  Akanksha didn't set out to plan events — she just kept being the person everyone called when something important needed to go perfectly. Over time, a pattern in hospitality, design, and project management turned into a real craft: the ability to take what a client can barely articulate and turn it into something they'll describe to people for years.
                </p>
                <p className="person-card__bio" style={{ marginTop: '0.75rem' }}>
                  She's organized down to the minute but never makes it feel that way. The logistics are invisible. The experience is everything.
                </p>
                <p className="person-card__bio" style={{ marginTop: '0.75rem' }}>
                  On the woodworking side, she's the creative half of Barewedcrafts. Customization requests — artwork, names, hand-lettered designs worked into a piece — are hers. She approaches them the same way she approaches events: with intention, an eye for detail, and genuine care for the person on the other end.
                </p>
                <p className="person-card__bio" style={{ marginTop: '0.75rem' }}>
                  Outside of work, she's an avid reader who will happily derail any conversation to talk books — her all-time favorite is <em>Throne of Glass</em> by Sarah J. Maas, and she will absolutely recommend your next read.
                </p>
                <div className="btn-group" style={{ marginTop: '1.25rem' }}>
                  <Link to="/resume/akanksha" className="btn btn--outline btn--sm">
                    View Akanksha's Resume
                  </Link>
                  <Link to="/contact" className="btn btn--outline-gold btn--sm">
                    Plan an Event
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section" aria-labelledby="values-heading">
        <div className="container">
          <div className="section-intro--center text-center mb-4">
            <p className="eyebrow">What We Believe</p>
            <span className="gold-rule gold-rule--center" aria-hidden="true" />
            <h2 id="values-heading" className="section-title">Our Values</h2>
          </div>
          <ul
            role="list"
            aria-label="Company values"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.5rem',
              marginTop: '2rem',
            }}
          >
            {[
              ['Craft Over Speed', 'We don\'t rush. Every project gets the time it needs to be done right.'],
              ['Transparency', 'Honest pricing, honest timelines, honest communication — always.'],
              ['Sustainability', 'We source responsibly and design for longevity, not obsolescence.'],
              ['Client-First', 'Your vision drives the project. We\'re here to execute it beautifully.'],
            ].map(([title, desc]) => (
              <li key={title} role="listitem" style={{ background: 'var(--light-cream)', padding: '2rem' }}>
                <span className="gold-rule" style={{ marginBottom: '1rem' }} aria-hidden="true" />
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', marginBottom: '0.625rem' }}>{title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '0.9375rem' }}>{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section--dark" aria-labelledby="about-cta-heading">
        <div className="container text-center">
          <h2 id="about-cta-heading" className="section-title" style={{ color: 'var(--white)', marginBottom: '1rem' }}>
            Ready to Work Together?
          </h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>
            Whether you have a clear vision or just a feeling — we're great at translating both.
          </p>
          <Link to="/contact" className="btn btn--primary">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  )
}