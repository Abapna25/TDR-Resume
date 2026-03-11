import { Link } from 'react-router-dom'
import { Music2, Palette, Globe } from 'lucide-react'

const EXPERIENCE = [
  {
    title: 'Account Manager',
    org: 'Tyrula LLC',
    location: 'McLean, VA (Remote)',
    dates: 'Jan 2025 – Present',
    bullets: [
      'Promoted to Account Manager overseeing client relationships and delivery across multiple concurrent government and healthcare projects, managing a team of 10+.',
      'Serve as primary point of contact for FDA client engagement, leading Strategy & Operations as Senior Analyst requiring active public trust clearance.',
      'Drive account growth strategy by identifying expansion opportunities, managing SOW renewals, and aligning delivery roadmaps.',
      'Lead cross-functional collaboration across engineering, analytics, and design teams using Jira, Confluence, and SharePoint.',
    ],
  },
  {
    title: 'Project Manager, Business Strategy',
    org: 'Tyrula LLC',
    location: 'McLean, VA (Hybrid)',
    dates: 'Aug 2023 – Dec 2024',
    bullets: [
      'Led ACHA web application development integrating Power BI and Azure Data Factory delivering real-time data visualization to 900+ institutions, achieving 20% increase in data access efficiency.',
      'Promoted from individual contributor to PM within 3 months; scaled team from 3 to 10 members.',
      'Pioneered company-wide AI governance program — led Microsoft Copilot pilot increasing AI proficiency by 30%.',
      'Established Agile processes improving project turnaround by 25%.',
      'Mentored 3 interns, all of whom returned for winter placements.',
    ],
  },
  {
    title: 'Senior Analyst, Strategy & Operations',
    org: 'Compass / E15 Group — Washington Nationals',
    location: 'Washington, DC (Hybrid)',
    dates: 'Jan 2022 – Aug 2023',
    bullets: [
      'Led strategic discussions on F&B sales, pricing, and quality assurance driving 15% increase in profit margin.',
      'Built PowerApps mobile application for resource allocation, approved for company-wide rollout.',
      'Automated aggregation of millions of POS records reducing reporting man-hours by 80%.',
      'Built Tableau dashboards for senior leadership financial and operational decisions.',
    ],
  },
  {
    title: 'Associate Software Engineer',
    org: 'Accenture',
    location: 'Bengaluru, India',
    dates: 'Aug 2018 – Aug 2019',
    bullets: [
      'Automated AutoCAD triage workflows improving efficiency by 30%.',
      'Improved reporting efficacy by 90% using Python macros.',
      'Mentored 60+ new recruits across a year-long project.',
    ],
  },
]

const ADDITIONAL_EXPERIENCE = [
  {
    title: 'Teaching Assistant',
    org: 'Smith School of Business, UMD',
    dates: 'Aug 2020 – Jun 2021',
    bullets: [
      'Facilitated office hours for two courses, helping 20+ of 35 students understand complex concepts and improving class averages.',
    ],
  },
  {
    title: 'Consultant',
    org: 'Medhen Orphan Relief Effort',
    dates: 'Jun 2021 – Dec 2021',
    bullets: [
      'Developed social media and PR strategies including a press kit to connect with local newspapers, digital media, and TV stations.',
    ],
  },
  {
    title: 'Research Intern',
    org: 'CHIDS',
    dates: 'Jun 2021 – Dec 2021',
    bullets: [
      'Identified marketing content for 6 audience segments for HIV prevention outreach among South African adolescent girls.',
      'Conducted A/B testing via Facebook and derived principles for effective personalized messaging.',
    ],
  },
  {
    title: 'Research Student',
    org: 'TIFR',
    dates: 'Jan 2018 – Aug 2018',
    bullets: [
      'Synthesized DSTMS crystal for nonlinear optics applications, doubling crystal size to 1×1×0.5 cc by optimizing growth conditions.',
    ],
  },
  {
    title: 'Intern',
    org: 'Coromandel Fertilizer',
    dates: 'May 2016 – Jun 2016',
    bullets: [
      'Authored a paper on improving sulphuric acid manufacturing efficiency to 99%.',
    ],
  },
]

const EDUCATION = [
  {
    degree: 'MS, Marketing Analytics',
    school: 'University of Maryland, Robert H. Smith School of Business',
    dates: 'Aug 2020 – Dec 2021',
    note: 'President, Smith Masters Student Association & Smith Masters Marketing Analytics Association',
  },
  {
    degree: 'B.Tech, Chemical Engineering',
    school: 'Manipal Institute of Technology',
    dates: '2014 – 2018',
    note: null,
  },
]

const SKILL_GROUPS = [
  {
    category: 'Analytics & BI',
    skills: ['Tableau', 'Power BI', 'SQL', 'Python', 'R', 'SAS', 'Google Analytics', 'Qualtrics'],
  },
  {
    category: 'Programming',
    skills: ['HTML', 'R', 'SAS', 'SQL', 'MATLAB', 'Aspen', 'Python'],
  },
  {
    category: 'Statistical Methods',
    skills: ['Regression', 'Machine Learning', 'A/B Testing', 'Clustering', 'MDS', 'PCA', 'EFA'],
  },
  {
    category: 'Cloud & Data',
    skills: ['AWS', 'Azure Data Factory', 'IBM Applied AI'],
  },
  {
    category: 'Project & Collaboration',
    skills: ['Jira', 'Confluence', 'SharePoint', 'Smartsheets', 'Microsoft Power Automate'],
  },
  {
    category: 'Reporting & Design',
    skills: ['Tableau', 'Canva', 'PowerApps'],
  },
  {
    category: 'Methodologies',
    skills: ['Agile / Scrum', 'Sprint Planning', 'Budget Forecasting', 'Stakeholder Management', 'AI Governance'],
  },
]

const CERTIFICATIONS = [
  'Public Trust Clearance (Active)',
  'IBM Applied AI Professional Certificate',
  'AWS Fundamentals Specialization',
  'SAS Programmer Specialization',
  'Machine Learning — Coursera / Stanford',
  'Tableau Data Visualization',
]

const SPOKEN_LANGUAGES = [
  { lang: 'English', level: 'Native' },
  { lang: 'Hindi', level: 'Native' },
  { lang: 'Malayalam', level: 'Intermediate' },
]

const INTERESTS = [
  { label: 'Classical Keyboard', Icon: Music2 },
  { label: 'Painting', Icon: Palette },
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

export default function AkankshaResume() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="page-hero" aria-labelledby="akanksha-page-heading">
        <div className="container" style={{ padding: '4.5rem var(--side-pad) 3.5rem' }}>
          <p className="eyebrow" style={{ color: 'var(--gold-light)', marginBottom: '1rem' }}>
            Resume
          </p>
          <span className="gold-rule gold-rule--lg" aria-hidden="true" />
          <h1
            id="akanksha-page-heading"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.1, marginBottom: '0.875rem' }}
          >
            Akanksha Bapna
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>
            Project Manager &amp; Strategy &amp; Analytics Professional
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
          <article className="resume-page" aria-label="Akanksha Bapna's resume">

            {/* ── CONTACT HEADER ── */}
            <header className="resume-header">
              <address className="resume-contact-row" style={{ fontStyle: 'normal' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <span aria-hidden="true">📍</span> Washougal, WA
                </span>
                <a href="mailto:bapna.akanksha@gmail.com">bapna.akanksha@gmail.com</a>
                <a href="https://abapna.webnode.page/" target="_blank" rel="noopener noreferrer">
                  abapna.com
                </a>
                <a
                  href="https://www.linkedin.com/in/akanksha-bapna-927972102/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Akanksha Bapna on LinkedIn"
                >
                  LinkedIn
                </a>
              </address>
            </header>

            {/* ── SUMMARY ── */}
            <section className="resume-section" aria-labelledby="a-summary">
              <h2 id="a-summary" className="resume-section-title">Professional Summary</h2>
              <p className="resume-entry-desc" style={{ fontSize: '1rem', lineHeight: 1.85 }}>
                Results-driven Project Manager and Strategy &amp; Analytics professional with 6+ years of experience spanning software engineering, data analytics, and business strategy. Proven track record managing cross-functional teams, delivering data-driven solutions, and driving AI/ML adoption across enterprise and government clients. Holds active public trust clearance. Expertise in Agile delivery, stakeholder management, and translating complex data into actionable business insights.
              </p>
            </section>

            {/* ── EXPERIENCE ── */}
            <section className="resume-section" aria-labelledby="a-experience">
              <h2 id="a-experience" className="resume-section-title">Experience</h2>
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

            {/* ── ADDITIONAL EXPERIENCE ── */}
            <section className="resume-section" aria-labelledby="a-additional">
              <h2 id="a-additional" className="resume-section-title">Internships &amp; Additional Experience</h2>
              {ADDITIONAL_EXPERIENCE.map(({ title, org, dates, bullets }) => (
                <div key={title + org} className="resume-entry">
                  <div className="resume-entry-header">
                    <span className="resume-entry-title">{title}</span>
                    <span className="resume-entry-date">{dates}</span>
                  </div>
                  <p className="resume-entry-org">{org}</p>
                  <div className="resume-entry-desc">
                    <ul>{bullets.map(b => <li key={b}>{b}</li>)}</ul>
                  </div>
                </div>
              ))}
            </section>

            {/* ── EDUCATION ── */}
            <section className="resume-section" aria-labelledby="a-edu">
              <h2 id="a-edu" className="resume-section-title">Education</h2>
              {EDUCATION.map(({ degree, school, dates, note }) => (
                <div key={degree} className="resume-entry">
                  <div className="resume-entry-header">
                    <span className="resume-entry-title">{degree}</span>
                    <span className="resume-entry-date">{dates}</span>
                  </div>
                  <p className="resume-entry-org">{school}</p>
                  {note && <p className="resume-entry-desc" style={{ marginTop: '0.25rem' }}>{note}</p>}
                </div>
              ))}
            </section>

            {/* ── SKILLS ── */}
            <section className="resume-section" aria-labelledby="a-skills">
              <h2 id="a-skills" className="resume-section-title">Skills</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {SKILL_GROUPS.map(({ category, skills }) => (
                  <div
                    key={category}
                    style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '0.75rem', alignItems: 'baseline' }}
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
            <section className="resume-section" aria-labelledby="a-extra">
              <h2 id="a-extra" className="resume-section-title">Languages &amp; Interests</h2>

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

            {/* ── CERTIFICATIONS ── */}
            <section className="resume-section" aria-labelledby="a-certs">
              <h2 id="a-certs" className="resume-section-title">Certifications</h2>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0, margin: 0 }} aria-label="Certifications">
                {CERTIFICATIONS.map(cert => (
                  <li
                    key={cert}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', color: 'var(--text-body)' }}
                  >
                    <span
                      style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, display: 'inline-block' }}
                      aria-hidden="true"
                    />
                    {cert}
                  </li>
                ))}
              </ul>
            </section>

          </article>
        </div>
      </div>
    </>
  )
}