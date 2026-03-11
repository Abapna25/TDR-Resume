import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Lock } from 'lucide-react'

const AUTH_KEY = 'bwc_internal_auth'

export default function Login() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to where the user originally tried to go, or fallback to calculator
  const from = location.state?.from ?? '/internal/calculator'

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    const expected = import.meta.env.VITE_INTERNAL_PASSWORD

    if (!expected) {
      setError('Internal password is not configured. Set VITE_INTERNAL_PASSWORD in your .env file.')
      setSubmitting(false)
      return
    }

    if (password === expected) {
      sessionStorage.setItem(AUTH_KEY, 'true')
      navigate(from, { replace: true })
    } else {
      setError('Incorrect password. Please try again.')
      setPassword('')
      setSubmitting(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100svh',
        background: 'var(--charcoal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: 'var(--white)',
          width: '100%',
          maxWidth: '400px',
          padding: '2.75rem',
        }}
        role="main"
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              background: 'var(--gold-pale)',
              border: '1.5px solid var(--gold)',
              marginBottom: '1.25rem',
            }}
            aria-hidden="true"
          >
            <Lock size={22} color="var(--gold-text)" strokeWidth={1.75} />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--gold-text)',
              marginBottom: '0.5rem',
            }}
          >
            Internal Access
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 600,
              color: 'var(--text-dark)',
            }}
          >
            BWC Tools
          </h1>
        </div>

        <span
          style={{ display: 'block', width: '3rem', height: '2px', background: 'var(--gold)', margin: '0 auto 2rem' }}
          aria-hidden="true"
        />

        {error && (
          <div
            className="alert alert--error"
            role="alert"
            aria-live="assertive"
            style={{ marginBottom: '1.25rem' }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} aria-label="Internal login form" noValidate>
          <div className="form-group">
            <label htmlFor="internal-password" className="form-label">
              Password
            </label>
            <input
              id="internal-password"
              type="password"
              className="form-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              aria-required="true"
              autoComplete="current-password"
              autoFocus
              placeholder="Enter internal password"
            />
          </div>

          <button
            type="submit"
            className="btn btn--primary"
            disabled={submitting || !password}
            aria-disabled={submitting || !password}
            style={{ width: '100%', marginTop: '1.25rem', justifyContent: 'center' }}
          >
            {submitting ? 'Verifying…' : 'Enter'}
          </button>
        </form>

        <p
          style={{
            marginTop: '1.75rem',
            fontSize: '0.8125rem',
            color: 'var(--text-muted)',
            textAlign: 'center',
            lineHeight: 1.6,
          }}
        >
          This area is for Barewedcrafts internal use only.
        </p>
      </div>
    </div>
  )
}