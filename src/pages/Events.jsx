import { Link } from 'react-router-dom'
import { Heart, Star, Briefcase, Leaf } from 'lucide-react'

const SERVICES = [
  {
    Icon: Heart,
    title: 'Weddings',
    desc: 'Full-service wedding planning and day-of coordination. We handle vendor logistics, timelines, florals, and every detail so you can be present.',
  },
  {
    Icon: Star,
    title: 'Private Celebrations',
    desc: 'Milestone birthdays, anniversaries, and intimate dinner parties curated with the same care as a wedding — scaled to your gathering.',
  },
  {
    Icon: Briefcase,
    title: 'Corporate Events',
    desc: 'Product launches, team retreats, and client dinners elevated beyond the ordinary. We design experiences that leave impressions.',
  },
  {
    Icon: Leaf,
    title: 'Micro Weddings & Elopements',
    desc: 'Intentional, small-scale ceremonies for couples who want meaning over magnitude. Intimate, beautiful, unforgettable.',
  },
]

const PRICING = [
  {
    tier: 'Day-Of Coordination',
    price: '$1,200',
    per: 'flat rate',
    featured: false,
    features: [
      'Up to 8-hour day-of coverage',
      'Venue walk-through (1 visit)',
      'Timeline creation & management',
      'Vendor point-of-contact on event day',
      'Emergency kit provided',
    ],
  },
  {
    tier: 'Partial Planning',
    price: '$3,500',
    per: 'starting at',
    featured: true,
    features: [
      'Everything in Day-Of',
      '4 planning consultation sessions',
      'Vendor research & recommendation',
      'Budget tracking support',
      'Design mood board',
      'RSVP & guest management support',
    ],
  },
  {
    tier: 'Full Planning',
    price: '$6,500',
    per: 'starting at',
    featured: false,
    features: [
      'Everything in Partial Planning',
      'Unlimited planning sessions',
      'Full vendor sourcing & booking',
      'Florals & decor design',
      'Rehearsal dinner coordination',
      'Post-event breakdown management',
    ],
  },
]

const GALLERY = [
  { seed: 'wedding-reception', alt: 'Elegant outdoor wedding reception setup' },
  { seed: 'floral-arrangement', alt: 'Curated floral arrangement centerpiece' },
  { seed: 'event-tablescape', alt: 'Styled wedding tablescape with candles and linens' },
  { seed: 'ceremony-arch', alt: 'Wooden ceremony arch with greenery' },
  { seed: 'reception-lighting', alt: 'String lights and draping at outdoor reception' },
  { seed: 'event-details', alt: 'Escort cards and stationery flat lay' },
]

export default function Events() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section
        className="page-hero page-hero--image"
        aria-labelledby="events-heading"
        style={{
          backgroundImage:
            'url(https://picsum.photos/seed/elegant-event-hero/1920/900)',
        }}
      >
        <div className="container page-hero__content" style={{ padding: '5rem var(--side-pad) 4rem' }}>
          <p className="eyebrow" style={{ color: 'var(--gold-light)', marginBottom: '1rem' }}>
            The Experience
          </p>
          <span className="gold-rule gold-rule--lg" aria-hidden="true" />
          <h1 id="events-heading" className="page-title" style={{ color: 'var(--white)', maxWidth: '620px' }}>
            Event Planning &amp; Curated Experiences
          </h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '520px', marginTop: '1.25rem' }}>
            From intimate micro-weddings to elegant corporate gatherings — we design moments that feel effortless from the inside.
          </p>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section" aria-labelledby="event-services-heading">
        <div className="container">
          <div className="section-intro--center text-center">
            <p className="eyebrow">What We Offer</p>
            <span className="gold-rule gold-rule--center" aria-hidden="true" />
            <h2 id="event-services-heading" className="section-title">Events We Plan</h2>
            <p className="lead mt-2">
              Every event is a collaboration. We bring the vision, the logistics, and the calm.
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
            aria-label="Event planning services"
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

      {/* ── GALLERY ── */}
      <section className="section section--cream" aria-labelledby="events-gallery-heading">
        <div className="container">
          <div className="section-intro mb-4">
            <p className="eyebrow">Portfolio</p>
            <span className="gold-rule" aria-hidden="true" />
            <h2 id="events-gallery-heading" className="section-title">Events We've Loved</h2>
          </div>
          <ul
            className="gallery-grid"
            role="list"
            aria-label="Event portfolio gallery"
            style={{ marginTop: '1.5rem' }}
          >
            {GALLERY.map(({ seed, alt }) => (
              <li key={seed} className="gallery-item" role="listitem">
                <img
                  src={`https://picsum.photos/seed/${seed}/800/600`}
                  alt={alt}
                  width={800}
                  height={600}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="section" aria-labelledby="pricing-heading">
        <div className="container">
          <div className="section-intro--center text-center mb-4">
            <p className="eyebrow">Investment</p>
            <span className="gold-rule gold-rule--center" aria-hidden="true" />
            <h2 id="pricing-heading" className="section-title">Service Pricing</h2>
            <p className="lead mt-2">
              Transparent pricing. Custom scopes always available — reach out and we'll build a package around your event.
            </p>
          </div>

          <div className="pricing-cards" style={{ marginTop: '2.5rem' }} role="list" aria-label="Pricing tiers">
            {PRICING.map(({ tier, price, per, featured, features }) => (
              <article
                key={tier}
                className={`pricing-card${featured ? ' pricing-card--featured' : ''}`}
                role="listitem"
                aria-label={`${tier} package`}
              >
                {featured && (
                  <div className="pricing-card__badge" aria-label="Most popular package">
                    Most Popular
                  </div>
                )}
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-text)', marginBottom: '0.5rem' }}>
                    {tier}
                  </p>
                  <div className="pricing-card__price">
                    {price}
                    <span> / {per}</span>
                  </div>
                </div>
                <hr className="divider" />
                <ul className="pricing-card__features" aria-label={`Features included in ${tier}`}>
                  {features.map(f => (
                    <li key={f} className="pricing-card__feature">{f}</li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`btn${featured ? ' btn--primary' : ' btn--outline-gold'}`}
                  aria-label={`Inquire about ${tier} package`}
                  style={{ marginTop: 'auto' }}
                >
                  Inquire Now
                </Link>
              </article>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Prices listed are starting rates. Final pricing depends on event scope, guest count, and vendor coordination needs.{' '}
            <Link to="/contact" style={{ color: 'var(--gold-text)', textDecoration: 'underline' }}>
              Contact us
            </Link>{' '}
            for a custom quote.
          </p>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="section section--dark" aria-labelledby="approach-heading">
        <div className="container">
          <div className="two-col" style={{ gap: '5rem' }}>
            <div>
              <p className="eyebrow" style={{ color: 'var(--gold-light)' }}>Our Approach</p>
              <span className="gold-rule" aria-hidden="true" />
              <h2 id="approach-heading" className="section-title" style={{ color: 'var(--white)' }}>
                Planning Shouldn't Feel Like a Second Job
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.85', marginTop: '1.25rem', fontSize: '1rem' }}>
                We take on a limited number of events per season so that each client gets our full attention. When you work with us, you get Akanksha — not a junior coordinator handed your file.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: '1.85', marginTop: '1rem', fontSize: '1rem' }}>
                We're organized, communicative, and genuinely excited about your event. We handle the logistics so you can handle the joy.
              </p>
              <div style={{ marginTop: '2rem' }}>
                <Link to="/contact" className="btn btn--primary">
                  Let's Plan Something
                </Link>
              </div>
            </div>
            <div aria-hidden="true">
              <img
                src="https://picsum.photos/seed/event-planner-at-work/700/840"
                alt="Akanksha planning event details"
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}