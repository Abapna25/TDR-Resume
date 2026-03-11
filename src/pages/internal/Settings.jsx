import { useState, useEffect } from 'react'

export const SETTINGS_KEY = 'bwc_settings'

export const DEFAULT_SETTINGS = {
  laborRate: 65,
  wastePercent: 10,
  overheadPercent: 15,
  taxPercent: 10.25,   // WA State base sales tax
  miscPercent: 5,
}

export function loadSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY)
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : { ...DEFAULT_SETTINGS }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export default function Settings() {
  const [settings, setSettings] = useState(loadSettings)
  const [saved, setSaved] = useState(false)

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  }, [settings])

  function handleChange(e) {
    const { name, value } = e.target
    setSaved(false)
    setSettings(prev => ({
      ...prev,
      [name]: value === '' ? '' : parseFloat(value),
    }))
  }

  function handleSave(e) {
    e.preventDefault()
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function handleReset() {
    if (!window.confirm('Reset all settings to defaults?')) return
    setSettings({ ...DEFAULT_SETTINGS })
    setSaved(false)
  }

  const fields = [
    {
      name: 'laborRate',
      label: 'Labor Rate',
      unit: '$/hr',
      hint: 'Hourly labor charge applied to all projects.',
      step: '0.5',
      min: '0',
    },
    {
      name: 'wastePercent',
      label: 'Waste Allowance',
      unit: '%',
      hint: 'Added to material costs to account for offcuts, errors, and overages.',
      step: '0.5',
      min: '0',
      max: '100',
    },
    {
      name: 'overheadPercent',
      label: 'Overhead',
      unit: '%',
      hint: 'Business overhead applied after material and labor (tools, shop rent, utilities).',
      step: '0.5',
      min: '0',
      max: '100',
    },
    {
      name: 'taxPercent',
      label: 'Washington State Tax',
      unit: '%',
      hint: 'Applied last. WA state base rate is 10.25% — update for your specific city/county rate.',
      step: '0.01',
      min: '0',
      max: '30',
    },
    {
      name: 'miscPercent',
      label: 'Miscellaneous Buffer',
      unit: '%',
      hint: 'Optional catch-all buffer for unexpected costs, hardware, delivery, etc.',
      step: '0.5',
      min: '0',
      max: '50',
    },
  ]

  return (
    <div className="internal-page">
      <div className="container">
        <div className="internal-header">
          <h1 className="internal-title">Calculator Settings</h1>
          <p className="internal-subtitle">
            These values apply to every project in the cost calculator. Changes save automatically.
          </p>
        </div>

        <form onSubmit={handleSave} aria-label="Calculator settings form" noValidate>
          <div className="settings-grid">
            {fields.map(({ name, label, unit, hint, step, min, max }) => (
              <div key={name} className="settings-card">
                <div className="form-group">
                  <label htmlFor={`setting-${name}`} className="form-label">
                    {label}
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        color: 'var(--gold-text)',
                        textTransform: 'none',
                        letterSpacing: 0,
                        marginLeft: '0.375rem',
                      }}
                    >
                      ({unit})
                    </span>
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      id={`setting-${name}`}
                      name={name}
                      type="number"
                      step={step}
                      min={min}
                      max={max}
                      value={settings[name]}
                      onChange={handleChange}
                      className="form-input"
                      style={{ maxWidth: '180px' }}
                      aria-describedby={`hint-${name}`}
                    />
                    <span
                      style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 500 }}
                      aria-hidden="true"
                    >
                      {unit}
                    </span>
                  </div>
                  <p id={`hint-${name}`} className="form-hint" style={{ marginTop: '0.375rem' }}>
                    {hint}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Cost Formula Preview */}
          <div className="settings-card" style={{ marginTop: '1.5rem', background: 'var(--charcoal)', color: 'var(--white)', border: 'none' }}>
            <h2 style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: '1rem' }}>
              Cost Calculation Formula
            </h2>
            <ol style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '1.25rem' }}>
              {[
                'Material cost = Σ (board feet × rate/bf × quantity)',
                'Labor cost = hours worked × labor rate',
                'Subtotal = material cost + labor cost',
                `After waste = subtotal × (1 + ${settings.wastePercent || 0}%)`,
                `After overhead = after waste × (1 + ${settings.overheadPercent || 0}%)`,
                `After misc buffer = after overhead × (1 + ${settings.miscPercent || 0}%)`,
                `Total = after misc × (1 + ${settings.taxPercent || 0}% tax)`,
              ].map((step, i) => (
                <li key={i} style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1.75rem', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn--primary">
              Save Settings
            </button>
            <button
              type="button"
              className="btn btn--outline"
              onClick={handleReset}
            >
              Reset to Defaults
            </button>
            {saved && (
              <div className="alert alert--success" role="status" aria-live="polite" style={{ padding: '0.625rem 1rem' }}>
                Settings saved successfully.
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}