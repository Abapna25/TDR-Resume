import { Link } from 'react-router-dom'
import { Guitar, Flag, Globe } from 'lucide-react'

const EXPERIENCE = [
  {
    title: 'DevOps Engineer',
    org: 'SAP Concur',
    location: 'Vienna, VA',
    dates: 'Oct 2019 – Present',
    bullets: [
      'Build, maintain, and scale infrastructure for production, US Gov, and dev/QA environments for multiple backend microservices handling 5M+ daily requests.',
      'Design and review Docker, Helm, Gradle, and AWS configurations and Java code implementations.',
      'Act as subject matter expert for custom exchange rate infrastructure and security.',
      'Led team as SCRUM leader for 8+ months, improving development velocity by 13%.',
      'Migrated 4 microservices from Kubernetes/on-prem to AWS cloud infrastructure.',
      'Owned 24/7 production alerts ensuring 99.95% SLA for mission-critical services.',
      'Pioneered exchange rate DynamoDB stack processing 3M+ daily requests.',
      'Mentored two software engineers.',
    ],
  },
  {
    title: 'Software Engineer',
    org: 'ATPCO',
    location: 'Dulles, VA',
    dates: 'Jun 2017 – Oct 2019',
    bullets: [
      'Designed, implemented, and maintained 10+ backend microservices through full SDLC.',
      'Built and enhanced automated testing frameworks adopted by 15+ developers.',
      'Constructed production-quality components using Angular 6, TypeScript, HTML5, and CSS3.',
      'Implemented RESTful APIs using Java and Spring.',
    ],
  },
]

const EDUCATION = [
  { degree: 'BS, Computer Science', school: 'College of William & Mary', dates: 'Aug 2012 – May 2017' },
  { degree: 'BS, Biology', school: 'College of William & Mary', dates: 'Aug 2012 – May 2017' },
]

const SKILL_GROUPS = [
  { category: 'Languages', skills: ['Java', 'TypeScript', 'Bash'] },
  { category: 'Configuration', skills: ['Docker', 'Kubernetes', 'Helm', 'Gradle'] },
  { category: 'AWS', skills: ['CloudFormation', 'EKS', 'S3', 'DynamoDB', 'SQS', 'Lambda', 'SNS', 'RDS', 'IAM', 'SAM'] },
  { category: 'Monitoring', skills: ['Sysdig', 'New Relic', 'Kibana', 'PagerDuty'] },
]

const SPOKEN_LANGUAGES = [
  { lang: 'English', level: 'Native' },
  { lang: 'German', level: 'Intermediate' },
  { lang: 'Spanish', level: 'Beginner' },
]

const INTERESTS = [
  { label: 'Classical Guitar', Icon: Guitar },
  { label: 'Golf', Icon: Flag },
]

const iconListStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.625rem',
  listStyle: 'none',
  padding: 0,
  margin: 0,
}

const iconRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.625rem',
  fontSize: '0.9375rem',
  color: 'var(--text-body)',
}

export default function TylerResume() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="page-hero" aria-labelledby="tyler-page-heading">
        <div className="container" style={{ padding: '4.5rem var(--side-pad) 3.5rem' }}>
          <p className="eyebrow" style={{ color: 'var(--gold-light)', marginBottom: '1rem' }}>
            Resume
          </p>
          <span className="gold-rule gold-rule--lg" aria-hidden="true" />
          <h1
            id="tyler-page-heading"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, marginBottom: '0.875rem' }}
          >
            Tyler Reid
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
            DevOps &amp; Backend Software Engineer
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link to="/about" className="btn btn--ghost btn--sm">
              ← Back to About
            </Link>
          </div>
        </div>
      </section>

      {/* ── RESUME BODY ── */}
      <div style={{ background: 'var(--light-cream)', padding: '3rem 0 5rem' }}>
        <div className="container">
          <article className="resume-page" aria-label="Tyler Reid's resume">

            {/* ── CONTACT HEADER ── */}
            <header className="resume-header">
              <address className="resume-contact-row" style={{ fontStyle: 'normal' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span aria-hidden="true">📍</span> McLean, VA
                </span>
                <a href="mailto:reidt602@gmail.com">reidt602@gmail.com</a>
                <a href="https://tylerdavisreid.com" target="_blank" rel="noopener noreferrer">
                  tylerdavisreid.com
                </a>
                <a
                  href="https://linkedin.com/in/tyler-reid-d"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tyler Reid on LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/tdreid92"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Tyler Reid on GitHub"
                >
                  GitHub
                </a>
              </address>
            </header>

            {/* ── SUMMARY ── */}
            <section className="resume-section" aria-labelledby="t-summary">
              <h2 id="t-summary" className="resume-section-title">Professional Summary</h2>
              <p className="resume-entry-desc" style={{ fontSize: '1rem', lineHeight: 1.85 }}>
                DevOps and Backend Software Engineer with 4+ years of experience building robust code and supporting CI/CD systems. Passionate about exploring cutting-edge, innovative solutions and technologies.
              </p>
            </section>

            {/* ── EXPERIENCE ── */}
            <section className="resume-section" aria-labelledby="t-experience">
              <h2 id="t-experience" className="resume-section-title">Experience</h2>
              {EXPERIENCE.map(({ title, org, location, dates, bullets }) => (
                <div key={title + org} className="resume-entry">
                  <div className="resume-entry-header">
                    <span className="resume-entry-title">{title}</span>
                    <span className="resume-entry-date">{dates}</span>
                  </div>
                  <p className="resume-entry-org">
                    {org}
                    <span style={{ color: 'var(--text-muted)', fontWeight: 400, marginLeft: '0.5rem' }}>
                      — {location}
                    </span>
                  </p>
                  <div className="resume-entry-desc">
                    <ul>{bullets.map(b => <li key={b}>{b}</li>)}</ul>
                  </div>
                </div>
              ))}
            </section>

            {/* ── EDUCATION ── */}
            <section className="resume-section" aria-labelledby="t-edu">
              <h2 id="t-edu" className="resume-section-title">Education</h2>
              {EDUCATION.map(({ degree, school, dates }) => (
                <div key={degree} className="resume-entry">
                  <div className="resume-entry-header">
                    <span className="resume-entry-title">{degree}</span>
                    <span className="resume-entry-date">{dates}</span>
                  </div>
                  <p className="resume-entry-org">{school}</p>
                </div>
              ))}
            </section>

            {/* ── SKILLS ── */}
            <section className="resume-section" aria-labelledby="t-skills">
              <h2 id="t-skills" className="resume-section-title">Technical Skills</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {SKILL_GROUPS.map(({ category, skills }) => (
                  <div
                    key={category}
                    style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '0.75rem', alignItems: 'baseline' }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--gold-text)',
                    }}>
                      {category}
                    </span>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-body)', lineHeight: 1.7 }} aria-label={`${category}: ${skills.join(', ')}`}>
                      {skills.join(' | ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ── LANGUAGES & INTERESTS ── */}
            <section className="resume-section" aria-labelledby="t-extra">
              <h2 id="t-extra" className="resume-section-title">Languages &amp; Interests</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Languages */}
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-text)', marginBottom: '0.875rem' }}>
                    Languages
                  </p>
                  <ul style={iconListStyle} aria-label="Spoken languages">
                    {SPOKEN_LANGUAGES.map(({ lang, level }) => (
                      <li key={lang} style={iconRowStyle}>
                        <Globe size={15} color="var(--gold)" strokeWidth={1.5} aria-hidden="true" style={{ flexShrink: 0 }} />
                        <span>
                          {lang}
                          <span style={{ color: 'var(--text-muted)', marginLeft: '0.375rem' }}>— {level}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interests */}
                <div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-text)', marginBottom: '0.875rem' }}>
                    Interests
                  </p>
                  <ul style={iconListStyle} aria-label="Personal interests">
                    {INTERESTS.map(({ label, Icon }) => (
                      <li key={label} style={iconRowStyle}>
                        <Icon size={15} color="var(--gold)" strokeWidth={1.5} aria-hidden="true" style={{ flexShrink: 0 }} />
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

          </article>
        </div>
      </div>
    </>
  )
}