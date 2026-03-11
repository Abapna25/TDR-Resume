import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

// ─────────────────────────────────────────────────────────────
// EMAILJS CONFIGURATION — fill these in before going live
// ─────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'   // e.g. 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'  // e.g. 'template_xxxxxxx'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'   // found in EmailJS Account > General
const DESTINATION_EMAIL   = 'hello@barewedcrafts.com' // replace with your actual email
// ─────────────────────────────────────────────────────────────

const INITIAL = {
  name: '',
  email: '',
  phone: '',
  serviceType: '',
  message: '',
}

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef(null)
  const statusRef = useRef(null)

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:    formData.name,
          from_email:   formData.email,
          phone:        formData.phone || 'Not provided',
          service_type: formData.serviceType,
          message:      formData.message,
          to_email:     DESTINATION_EMAIL,
        },
        EMAILJS_PUBLIC_KEY,
      )
      setStatus('success')
      setFormData(INITIAL)
      // Move focus to the success message for screen readers
      setTimeout(() => statusRef.current?.focus(), 50)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or email us directly.')
      setTimeout(() => statusRef.current?.focus(), 50)
    }
  }

  if (status === 'success') {
    return (
      <>
        <section className="page-hero" aria-labelledby="contact-heading">
          <div className="container" style={{ padding: '5rem var(--side-pad) 4rem' }}>
            <h1 id="contact-heading" className="page-title" style={{ color: 'var(--white)' }}>
              Contact Us
            </h1>
          </div>
        </section>

        <section className="section" aria-live="polite">
          <div className="container">
            <div
              ref={statusRef}
              tabIndex={-1}
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center',
                padding: '3rem',
                background: 'var(--white)',
                border: '1px solid var(--border)',
              }}
              aria-label="Form submitted successfully"
            >
              <span
                style={{ fontSize: '3rem', display: 'block', marginBottom: '1.5rem' }}
                aria-hidden="true"
              >
                ✦
              </span>
              <span className="gold-rule gold-rule--center gold-rule--lg" aria-hidden="true" />
              <h2 className="section-title" style={{ marginBottom: '1rem' }}>Message Received</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '2rem' }}>
                Thank you for reaching out. We read every inquiry personally and typically respond within 1–2 business days. We're excited to hear more about your project.
              </p>
              <button
                className="btn btn--outline-gold"
                onClick={() => setStatus('idle')}
                aria-label="Go back and send another message"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="page-hero" aria-labelledby="contact-heading">
        <div className="container" style={{ padding: '5rem var(--side-pad) 4rem' }}>
          <p className="eyebrow" style={{ color: 'var(--gold-light)', marginBottom: '1rem' }}>
            Let's Talk
          </p>
          <span className="gold-rule gold-rule--lg" aria-hidden="true" />
          <h1 id="contact-heading" className="page-title" style={{ color: 'var(--white)' }}>
            Start a Project
          </h1>
          <p className="lead" style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '480px', marginTop: '1.25rem' }}>
            Tell us about your vision. Every great piece starts with a conversation.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="form-heading">
        <div className="container">
          <div className="contact-layout">
            {/* ── FORM ── */}
            <div>
              <h2 id="form-heading" className="section-title" style={{ marginBottom: '0.5rem' }}>
                Client Inquiry Form
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9375rem' }}>
                Fill out the form below and we'll be in touch shortly.
              </p>

              {status === 'error' && (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  className="alert alert--error mb-3"
                  role="alert"
                  aria-live="assertive"
                >
                  {errorMsg}
                </div>
              )}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                aria-label="Client inquiry form"
              >
                <div className="form-grid form-grid--2col">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Full Name <span aria-label="required" style={{ color: 'var(--gold-text)' }}>*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="Jane Smith"
                      aria-required="true"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address <span aria-label="required" style={{ color: 'var(--gold-text)' }}>*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      placeholder="jane@example.com"
                      aria-required="true"
                    />
                  </div>
                </div>

                <div className="form-grid" style={{ marginTop: '1.25rem' }}>
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      autoComplete="tel"
                      placeholder="(206) 555-0100"
                    />
                  </div>
                </div>

                <fieldset style={{ border: 'none', padding: 0, marginTop: '1.25rem' }}>
                  <legend className="form-label" style={{ marginBottom: '0.75rem' }}>
                    Service Interested In <span aria-label="required" style={{ color: 'var(--gold-text)' }}>*</span>
                  </legend>
                  <div className="form-radio-group" role="radiogroup" aria-required="true">
                    {[
                      { value: 'woodworking', label: 'Custom Woodworking / DIY Project' },
                      { value: 'events', label: 'Event Planning' },
                      { value: 'both', label: 'Both Services' },
                      { value: 'unsure', label: 'Not sure yet — just exploring' },
                    ].map(({ value, label }) => (
                      <label key={value} className="form-radio-label">
                        <input
                          type="radio"
                          name="serviceType"
                          value={value}
                          checked={formData.serviceType === value}
                          onChange={handleChange}
                          required={!formData.serviceType}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="form-group" style={{ marginTop: '1.25rem' }}>
                  <label htmlFor="message" className="form-label">
                    Tell Us About Your Project <span aria-label="required" style={{ color: 'var(--gold-text)' }}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    placeholder="Describe your project, event, timeline, or any questions you have..."
                    rows={6}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={status === 'submitting'}
                  aria-disabled={status === 'submitting'}
                  style={{ marginTop: '1.5rem' }}
                >
                  {status === 'submitting' ? 'Sending…' : 'Send Inquiry'}
                </button>
              </form>
            </div>

            {/* ── CONTACT INFO SIDEBAR ── */}
            <aside aria-label="Contact information" style={{ paddingTop: '0.5rem' }}>
              <div className="card card--elevated" style={{ padding: '2rem' }}>
                <p className="eyebrow" style={{ marginBottom: '1rem' }}>Contact Details</p>
                <span className="gold-rule" aria-hidden="true" />

                <div className="contact-info">
                  <div className="contact-detail">
                    <span className="contact-detail-label">Email</span>
                    <a
                      href="mailto:hello@barewedcrafts.com"
                      className="contact-detail-value"
                      style={{ color: 'var(--gold-text)', textDecoration: 'underline' }}
                    >
                      hello@barewedcrafts.com
                    </a>
                  </div>

                  <div className="contact-detail">
                    <span className="contact-detail-label">Location</span>
                    <span className="contact-detail-value">Pacific Northwest, WA</span>
                  </div>

                  <div className="contact-detail">
                    <span className="contact-detail-label">Woodworking Inquiries</span>
                    <span className="contact-detail-value">Tyler handles all custom builds and DIY kit requests.</span>
                  </div>

                  <div className="contact-detail">
                    <span className="contact-detail-label">Event Planning Inquiries</span>
                    <span className="contact-detail-value">Akanksha manages all event consultations and bookings.</span>
                  </div>

                  <hr className="divider" />

                  <div className="contact-detail">
                    <span className="contact-detail-label">Response Time</span>
                    <span className="contact-detail-value">We aim to respond within 1–2 business days.</span>
                  </div>

                  <div className="contact-detail">
                    <span className="contact-detail-label">Availability</span>
                    <span className="contact-detail-value">Currently booking projects for Spring &amp; Summer 2026.</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}