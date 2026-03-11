import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const WOOD_RATES_KEY = 'bwc_wood_rates'

const today = () => new Date().toISOString().split('T')[0]

export const DEFAULT_RATES = [
  { id: 1, type: 'Pine', rate: 2.5, lastUpdated: today() },
  { id: 2, type: 'Poplar', rate: 3.0, lastUpdated: today() },
  { id: 3, type: 'Cedar', rate: 4.0, lastUpdated: today() },
  { id: 4, type: 'Hard Maple', rate: 6.5, lastUpdated: today() },
  { id: 5, type: 'White Oak', rate: 7.0, lastUpdated: today() },
  { id: 6, type: 'Red Oak', rate: 5.5, lastUpdated: today() },
  { id: 7, type: 'Cherry', rate: 8.0, lastUpdated: today() },
  { id: 8, type: 'Black Walnut', rate: 11.0, lastUpdated: today() },
  { id: 9, type: 'Teak', rate: 14.0, lastUpdated: today() },
  { id: 10, type: 'Ash', rate: 5.0, lastUpdated: today() },
]

export function loadRates() {
  try {
    const saved = localStorage.getItem(WOOD_RATES_KEY)
    return saved ? JSON.parse(saved) : DEFAULT_RATES.map(r => ({ ...r }))
  } catch {
    return DEFAULT_RATES.map(r => ({ ...r }))
  }
}

function isStale(dateString) {
  if (!dateString) return true
  const diff = (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24)
  return diff > 90
}

function formatDate(dateString) {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  })
}

export default function WoodRates() {
  const [rates, setRates] = useState(loadRates)
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({})
  const [newRow, setNewRow] = useState({ type: '', rate: '' })
  const [showAddRow, setShowAddRow] = useState(false)
  const [saved, setSaved] = useState(false)

  const staleRates = rates.filter(r => isStale(r.lastUpdated))
  const hasStale = staleRates.length > 0

  useEffect(() => {
    localStorage.setItem(WOOD_RATES_KEY, JSON.stringify(rates))
  }, [rates])

  function startEdit(rate) {
    setEditingId(rate.id)
    setEditValues({ type: rate.type, rate: rate.rate })
  }

  function cancelEdit() {
    setEditingId(null)
    setEditValues({})
  }

  function saveEdit(id) {
    if (!editValues.type.trim() || editValues.rate === '') return
    setRates(prev =>
      prev.map(r =>
        r.id === id
          ? { ...r, type: editValues.type.trim(), rate: parseFloat(editValues.rate), lastUpdated: today() }
          : r
      )
    )
    setEditingId(null)
    setEditValues({})
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function deleteRate(id) {
    const rate = rates.find(r => r.id === id)
    if (!window.confirm(`Delete "${rate?.type}"? This will affect any saved projects using this wood type.`)) return
    setRates(prev => prev.filter(r => r.id !== id))
  }

  function handleAddRow(e) {
    e.preventDefault()
    if (!newRow.type.trim() || newRow.rate === '') return
    const exists = rates.some(r => r.type.toLowerCase() === newRow.type.trim().toLowerCase())
    if (exists) {
      alert('A wood type with that name already exists. Edit the existing entry instead.')
      return
    }
    const newEntry = {
      id: Date.now(),
      type: newRow.type.trim(),
      rate: parseFloat(newRow.rate),
      lastUpdated: today(),
    }
    setRates(prev => [...prev, newEntry])
    setNewRow({ type: '', rate: '' })
    setShowAddRow(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  function markReviewed(id) {
    setRates(prev =>
      prev.map(r => r.id === id ? { ...r, lastUpdated: today() } : r)
    )
  }

  function markAllReviewed() {
    setRates(prev => prev.map(r => ({ ...r, lastUpdated: today() })))
  }

  return (
    <div className="internal-page">
      <div className="container">
        <div className="internal-header">
          <h1 className="internal-title">Wood Rates Manager</h1>
          <p className="internal-subtitle">
            Manage your lumber pricing. Rates are used by the{' '}
            <Link to="/internal/calculator" style={{ color: 'var(--gold-text)', textDecoration: 'underline' }}>
              Project Calculator
            </Link>{' '}
            to estimate material costs.
          </p>
        </div>

        {/* ── STALE WARNING ── */}
        {hasStale && (
          <div
            className="alert alert--warning"
            role="alert"
            aria-live="polite"
            style={{ marginBottom: '1.5rem' }}
          >
            <span aria-hidden="true" style={{ fontSize: '1.25rem', lineHeight: 1 }}>⚠</span>
            <div>
              <strong>Rates need review:</strong>{' '}
              {staleRates.length} wood type{staleRates.length > 1 ? 's have' : ' has'} not been reviewed in over 90 days
              ({staleRates.map(r => r.type).join(', ')}).{' '}
              <button
                onClick={markAllReviewed}
                style={{ color: 'var(--warning-text)', fontWeight: 700, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit', fontSize: '0.9375rem' }}
                aria-label="Mark all rates as reviewed today"
              >
                Mark all reviewed
              </button>
            </div>
          </div>
        )}

        {/* ── TOOLBAR ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            {rates.length} wood type{rates.length !== 1 ? 's' : ''} in the database
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {saved && (
              <span
                className="alert alert--success"
                role="status"
                aria-live="polite"
                style={{ padding: '0.4rem 0.875rem', fontSize: '0.875rem' }}
              >
                Saved
              </span>
            )}
            <button
              className="btn btn--primary btn--sm"
              onClick={() => setShowAddRow(v => !v)}
              aria-expanded={showAddRow}
              aria-controls="add-wood-row"
            >
              {showAddRow ? 'Cancel' : '+ Add Wood Type'}
            </button>
          </div>
        </div>

        {/* ── ADD ROW FORM ── */}
        {showAddRow && (
          <form
            id="add-wood-row"
            onSubmit={handleAddRow}
            aria-label="Add new wood type"
            style={{
              background: 'var(--gold-pale)',
              border: '1.5px solid var(--gold)',
              padding: '1.25rem',
              marginBottom: '1rem',
              display: 'grid',
              gridTemplateColumns: '1fr 180px auto',
              gap: '0.875rem',
              alignItems: 'end',
            }}
          >
            <div className="form-group">
              <label htmlFor="new-wood-type" className="form-label">Wood Type Name</label>
              <input
                id="new-wood-type"
                type="text"
                className="form-input"
                value={newRow.type}
                onChange={e => setNewRow(p => ({ ...p, type: e.target.value }))}
                placeholder="e.g. Hickory"
                required
                aria-required="true"
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-wood-rate" className="form-label">Rate ($/BF)</label>
              <input
                id="new-wood-rate"
                type="number"
                step="0.01"
                min="0"
                className="form-input"
                value={newRow.rate}
                onChange={e => setNewRow(p => ({ ...p, rate: e.target.value }))}
                placeholder="0.00"
                required
                aria-required="true"
              />
            </div>
            <button type="submit" className="btn btn--primary btn--sm" style={{ marginBottom: '1px' }}>
              Add
            </button>
          </form>
        )}

        {/* ── RATES TABLE ── */}
        <div className="rates-table-wrap">
          <table className="rates-table" aria-label="Wood rates table">
            <thead>
              <tr>
                <th scope="col">Wood Type</th>
                <th scope="col">Rate per Board Foot</th>
                <th scope="col">Last Reviewed</th>
                <th scope="col">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rates.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                    No wood types yet. Add one above.
                  </td>
                </tr>
              )}
              {rates.map(rate => (
                <tr key={rate.id}>
                  {editingId === rate.id ? (
                    <>
                      <td>
                        <input
                          type="text"
                          className="inline-input"
                          value={editValues.type}
                          onChange={e => setEditValues(p => ({ ...p, type: e.target.value }))}
                          aria-label={`Edit wood type name for ${rate.type}`}
                          autoFocus
                        />
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                          <span aria-hidden="true">$</span>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            className="inline-input"
                            value={editValues.rate}
                            onChange={e => setEditValues(p => ({ ...p, rate: e.target.value }))}
                            aria-label={`Edit rate per board foot for ${rate.type}`}
                            style={{ maxWidth: '100px' }}
                          />
                          <span aria-hidden="true" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>/bf</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Will update to today</td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            className="btn btn--primary btn--sm"
                            onClick={() => saveEdit(rate.id)}
                            aria-label={`Save changes to ${rate.type}`}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn--outline btn--sm"
                            onClick={cancelEdit}
                            aria-label="Cancel edit"
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ fontWeight: 500, color: 'var(--text-dark)' }}>{rate.type}</td>
                      <td>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                          ${rate.rate.toFixed(2)}
                        </span>
                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>/bf</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.875rem', color: isStale(rate.lastUpdated) ? 'var(--warning-text)' : 'var(--text-muted)' }}>
                            {formatDate(rate.lastUpdated)}
                          </span>
                          {isStale(rate.lastUpdated) && (
                            <>
                              <span className="stale-badge" aria-label={`${rate.type} rate not reviewed in over 90 days`}>
                                Stale
                              </span>
                              <button
                                onClick={() => markReviewed(rate.id)}
                                style={{ fontSize: '0.75rem', color: 'var(--gold-text)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
                                aria-label={`Mark ${rate.type} rate as reviewed today`}
                              >
                                Mark reviewed
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            className="btn btn--outline btn--sm"
                            onClick={() => startEdit(rate)}
                            aria-label={`Edit ${rate.type}`}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn--danger btn--sm"
                            onClick={() => deleteRate(rate.id)}
                            aria-label={`Delete ${rate.type}`}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: 'var(--white)', border: '1px solid var(--border)', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--text-body)' }}>Board foot (BF)</strong> = (Length × Width × Thickness) ÷ 144, where dimensions are in inches.
          Rates older than 90 days are flagged as stale and trigger a warning in the calculator.
        </div>
      </div>
    </div>
  )
}