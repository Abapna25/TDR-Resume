import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { loadSettings } from './Settings'
import { loadRates } from './WoodRates'

const PROJECTS_KEY = 'bwc_projects'

const today = () => new Date().toISOString().split('T')[0]

function isStale(dateString) {
  if (!dateString) return true
  return (Date.now() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24) > 90
}

function newLineItem() {
  return { id: Date.now() + Math.random(), woodType: '', length: '', width: '', thickness: '', quantity: 1 }
}

function calcBoardFeet(item) {
  const l = parseFloat(item.length)
  const w = parseFloat(item.width)
  const t = parseFloat(item.thickness)
  const q = parseFloat(item.quantity)
  if (!l || !w || !t || !q) return 0
  return (l * w * t) / 144 * q
}

function calcCost(items, hours, settings, rates) {
  const { laborRate, wastePercent, overheadPercent, taxPercent, miscPercent } = settings

  const materialCost = items.reduce((sum, item) => {
    const bf = calcBoardFeet(item)
    const rateEntry = rates.find(r => r.type === item.woodType)
    const rate = rateEntry?.rate ?? 0
    return sum + bf * rate
  }, 0)

  const laborCost = (parseFloat(hours) || 0) * (parseFloat(laborRate) || 0)
  const subtotal = materialCost + laborCost
  const afterWaste = subtotal * (1 + (parseFloat(wastePercent) || 0) / 100)
  const afterOverhead = afterWaste * (1 + (parseFloat(overheadPercent) || 0) / 100)
  const afterMisc = afterOverhead * (1 + (parseFloat(miscPercent) || 0) / 100)
  const total = afterMisc * (1 + (parseFloat(taxPercent) || 0) / 100)

  return { materialCost, laborCost, subtotal, afterWaste, afterOverhead, afterMisc, total }
}

function fmt(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

function loadProjects() {
  try {
    const saved = localStorage.getItem(PROJECTS_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

const BLANK_FORM = {
  name: '',
  lineItems: [newLineItem()],
  hours: '',
}

export default function Calculator() {
  const [settings, setSettings] = useState(loadSettings)
  const [rates, setRates] = useState(loadRates)
  const [projects, setProjects] = useState(loadProjects)
  const [form, setForm] = useState(BLANK_FORM)
  const [editingId, setEditingId] = useState(null)
  const [saved, setSaved] = useState(false)

  const staleRates = rates.filter(r => isStale(r.lastUpdated))
  const hasStaleRates = staleRates.length > 0

  // Re-read settings/rates from localStorage when page mounts (in case Settings or WoodRates were updated)
  useEffect(() => {
    setSettings(loadSettings())
    setRates(loadRates())
  }, [])

  // Persist projects
  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
  }, [projects])

  const costs = calcCost(form.lineItems, form.hours, settings, rates)

  // ── LINE ITEM HANDLERS ──
  function addLineItem() {
    setForm(prev => ({ ...prev, lineItems: [...prev.lineItems, newLineItem()] }))
  }

  function removeLineItem(id) {
    setForm(prev => ({
      ...prev,
      lineItems: prev.lineItems.length > 1
        ? prev.lineItems.filter(li => li.id !== id)
        : prev.lineItems,
    }))
  }

  function updateLineItem(id, field, value) {
    setForm(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(li =>
        li.id === id ? { ...li, [field]: value } : li
      ),
    }))
  }

  // ── FORM HANDLERS ──
  function handleFormChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSave(e) {
    e.preventDefault()
    if (!form.name.trim()) { alert('Please enter a project name.'); return }

    if (editingId) {
      setProjects(prev =>
        prev.map(p =>
          p.id === editingId
            ? { ...p, name: form.name, lineItems: form.lineItems, hours: form.hours, costs, savedAt: today() }
            : p
        )
      )
      setEditingId(null)
    } else {
      const newProject = {
        id: Date.now(),
        name: form.name,
        lineItems: form.lineItems,
        hours: form.hours,
        costs,
        savedAt: today(),
      }
      setProjects(prev => [newProject, ...prev])
    }

    setForm(BLANK_FORM)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  function handleEdit(project) {
    setForm({
      name: project.name,
      lineItems: project.lineItems,
      hours: project.hours,
    })
    setEditingId(project.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleDelete(id) {
    const project = projects.find(p => p.id === id)
    if (!window.confirm(`Delete project "${project?.name}"? This cannot be undone.`)) return
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  function handleCancel() {
    setForm(BLANK_FORM)
    setEditingId(null)
  }

  const woodOptions = rates.map(r => r.type)

  return (
    <div className="internal-page">
      <div className="container">
        <div className="internal-header">
          <h1 className="internal-title">Project Cost Calculator</h1>
          <p className="internal-subtitle">
            Build a cost estimate for a woodworking project. Rates and settings are managed in{' '}
            <Link to="/internal/wood-rates" style={{ color: 'var(--gold-text)', textDecoration: 'underline' }}>
              Wood Rates
            </Link>{' '}
            and{' '}
            <Link to="/internal/settings" style={{ color: 'var(--gold-text)', textDecoration: 'underline' }}>
              Settings
            </Link>.
          </p>
        </div>

        {/* ── STALE RATES WARNING ── */}
        {hasStaleRates && (
          <div
            className="alert alert--warning"
            role="alert"
            aria-live="polite"
            style={{ marginBottom: '1.5rem' }}
          >
            <span aria-hidden="true" style={{ fontSize: '1.25rem', lineHeight: 1 }}>⚠</span>
            <div>
              <strong>Wood rates may be outdated:</strong>{' '}
              {staleRates.length} rate{staleRates.length > 1 ? 's' : ''} ({staleRates.map(r => r.type).join(', ')})
              {' '}haven't been reviewed in 90+ days. Cost estimates may be inaccurate.{' '}
              <Link
                to="/internal/wood-rates"
                style={{ color: 'var(--warning-text)', fontWeight: 700, textDecoration: 'underline' }}
              >
                Update rates →
              </Link>
            </div>
          </div>
        )}

        <div className="calc-layout">
          {/* ── LEFT: FORM ── */}
          <div>
            <form onSubmit={handleSave} aria-label={editingId ? 'Edit project form' : 'New project form'} noValidate>

              {/* Project Name */}
              <div className="calc-form-card" style={{ marginBottom: '1rem' }}>
                <h2 className="calc-section-title">{editingId ? 'Edit Project' : 'New Project'}</h2>
                <div className="form-group">
                  <label htmlFor="project-name" className="form-label">
                    Project Name <span aria-label="required" style={{ color: 'var(--gold-text)' }}>*</span>
                  </label>
                  <input
                    id="project-name"
                    name="name"
                    type="text"
                    className="form-input"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="e.g. Johnson Dining Table"
                    required
                    aria-required="true"
                    style={{ maxWidth: '400px' }}
                  />
                </div>
              </div>

              {/* Wood Line Items */}
              <div className="calc-form-card" style={{ marginBottom: '1rem' }}>
                <h2 className="calc-section-title">Wood Line Items</h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  Board feet = (Length × Width × Thickness) ÷ 144 × Quantity
                </p>

                <div
                  role="region"
                  aria-label="Wood line items"
                  aria-live="polite"
                >
                  {/* Column headers */}
                  <div
                    className="line-item-row"
                    style={{ background: 'var(--charcoal)', marginBottom: '0.5rem' }}
                    aria-hidden="true"
                  >
                    {['Wood Type', 'Length (in)', 'Width (in)', 'Thickness (in)', 'Qty', 'BF', ''].map((h, i) => (
                      <span key={i} style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
                        {h}
                      </span>
                    ))}
                  </div>

                  {form.lineItems.map((item, idx) => {
                    const bf = calcBoardFeet(item)
                    const rateEntry = rates.find(r => r.type === item.woodType)
                    const itemCost = bf * (rateEntry?.rate ?? 0)

                    return (
                      <div key={item.id} className="line-item-row" role="group" aria-label={`Wood line item ${idx + 1}`}>
                        {/* Wood Type */}
                        <div className="form-group" style={{ margin: 0 }}>
                          <label htmlFor={`wood-${item.id}`} className="sr-only">
                            Wood type for line item {idx + 1}
                          </label>
                          <select
                            id={`wood-${item.id}`}
                            className="form-select"
                            value={item.woodType}
                            onChange={e => updateLineItem(item.id, 'woodType', e.target.value)}
                            style={{ fontSize: '0.875rem', padding: '0.6rem 2rem 0.6rem 0.625rem' }}
                          >
                            <option value="">Select wood…</option>
                            {woodOptions.map(w => (
                              <option key={w} value={w}>{w}</option>
                            ))}
                          </select>
                        </div>

                        {/* Dimensions */}
                        {[
                          { field: 'length', placeholder: 'L', label: `Length for line item ${idx + 1}` },
                          { field: 'width', placeholder: 'W', label: `Width for line item ${idx + 1}` },
                          { field: 'thickness', placeholder: 'T', label: `Thickness for line item ${idx + 1}` },
                        ].map(({ field, placeholder, label }) => (
                          <div key={field} className="form-group" style={{ margin: 0 }}>
                            <label htmlFor={`${field}-${item.id}`} className="sr-only">{label}</label>
                            <input
                              id={`${field}-${item.id}`}
                              type="number"
                              step="0.125"
                              min="0"
                              className="form-input"
                              value={item[field]}
                              onChange={e => updateLineItem(item.id, field, e.target.value)}
                              placeholder={placeholder}
                              style={{ fontSize: '0.875rem', padding: '0.6rem 0.5rem' }}
                            />
                          </div>
                        ))}

                        {/* Quantity */}
                        <div className="form-group" style={{ margin: 0 }}>
                          <label htmlFor={`qty-${item.id}`} className="sr-only">Quantity for line item {idx + 1}</label>
                          <input
                            id={`qty-${item.id}`}
                            type="number"
                            step="1"
                            min="1"
                            className="form-input"
                            value={item.quantity}
                            onChange={e => updateLineItem(item.id, 'quantity', e.target.value)}
                            style={{ fontSize: '0.875rem', padding: '0.6rem 0.5rem' }}
                          />
                        </div>

                        {/* BF + cost */}
                        <div className="line-item-bf">
                          <span style={{ display: 'block', fontWeight: 600, color: 'var(--text-dark)' }}>
                            {bf.toFixed(2)} bf
                          </span>
                          {itemCost > 0 && (
                            <span style={{ fontSize: '0.75rem', color: 'var(--gold-text)' }}>
                              {fmt(itemCost)}
                            </span>
                          )}
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removeLineItem(item.id)}
                          style={{ color: '#C0392B', fontSize: '1.25rem', lineHeight: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', alignSelf: 'center' }}
                          aria-label={`Remove line item ${idx + 1}`}
                          disabled={form.lineItems.length === 1}
                        >
                          ×
                        </button>
                      </div>
                    )
                  })}
                </div>

                <button
                  type="button"
                  className="btn btn--outline-gold btn--sm"
                  onClick={addLineItem}
                  style={{ marginTop: '0.875rem' }}
                  aria-label="Add another wood line item"
                >
                  + Add Line Item
                </button>
              </div>

              {/* Labor */}
              <div className="calc-form-card" style={{ marginBottom: '1rem' }}>
                <h2 className="calc-section-title">Labor</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label htmlFor="hours-worked" className="form-label">Hours Worked</label>
                    <input
                      id="hours-worked"
                      name="hours"
                      type="number"
                      step="0.5"
                      min="0"
                      className="form-input"
                      value={form.hours}
                      onChange={handleFormChange}
                      placeholder="0"
                      style={{ maxWidth: '140px' }}
                    />
                  </div>
                  <div style={{ paddingTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    × ${settings.laborRate}/hr ={' '}
                    <strong style={{ color: 'var(--text-dark)' }}>
                      {fmt((parseFloat(form.hours) || 0) * (parseFloat(settings.laborRate) || 0))}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <button type="submit" className="btn btn--primary">
                  {editingId ? 'Update Project' : 'Save Project'}
                </button>
                {editingId && (
                  <button type="button" className="btn btn--outline" onClick={handleCancel}>
                    Cancel Edit
                  </button>
                )}
                {saved && (
                  <div className="alert alert--success" role="status" aria-live="polite" style={{ padding: '0.6rem 1rem', fontSize: '0.875rem' }}>
                    Project saved!
                  </div>
                )}
              </div>
            </form>

            {/* ── SAVED PROJECTS LIST ── */}
            {projects.length > 0 && (
              <section style={{ marginTop: '3rem' }} aria-labelledby="saved-projects-heading">
                <h2 id="saved-projects-heading" className="calc-section-title" style={{ marginBottom: '1rem' }}>
                  Saved Projects ({projects.length})
                </h2>
                <div className="projects-list" role="list" aria-label="Saved projects">
                  {projects.map(project => (
                    <article key={project.id} className="project-item" role="listitem" aria-label={`Project: ${project.name}`}>
                      <div>
                        <p className="project-item__name">{project.name}</p>
                        <p className="project-item__meta">
                          {project.lineItems.length} wood type{project.lineItems.length !== 1 ? 's' : ''}
                          {' · '}{project.hours || 0} hrs
                          {' · '}Saved {project.savedAt}
                        </p>
                        <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--gold-text)', marginTop: '0.25rem' }}>
                          {fmt(project.costs?.total ?? 0)}
                        </p>
                      </div>
                      <div className="project-item__actions">
                        <button
                          className="btn btn--outline btn--sm"
                          onClick={() => handleEdit(project)}
                          aria-label={`Edit project "${project.name}"`}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn--danger btn--sm"
                          onClick={() => handleDelete(project.id)}
                          aria-label={`Delete project "${project.name}"`}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT: COST BREAKDOWN ── */}
          <aside className="cost-breakdown" aria-label="Cost breakdown" aria-live="polite">
            <h2 className="calc-section-title" style={{ marginBottom: '1.25rem' }}>Cost Breakdown</h2>

            <div className="breakdown-row">
              <span className="breakdown-label">Materials</span>
              <span className="breakdown-value">{fmt(costs.materialCost)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Labor ({form.hours || 0} hrs × ${settings.laborRate}/hr)</span>
              <span className="breakdown-value">{fmt(costs.laborCost)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">Subtotal</span>
              <span className="breakdown-value">{fmt(costs.subtotal)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">+ Waste ({settings.wastePercent}%)</span>
              <span className="breakdown-value">{fmt(costs.afterWaste - costs.subtotal)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">+ Overhead ({settings.overheadPercent}%)</span>
              <span className="breakdown-value">{fmt(costs.afterOverhead - costs.afterWaste)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">+ Misc Buffer ({settings.miscPercent}%)</span>
              <span className="breakdown-value">{fmt(costs.afterMisc - costs.afterOverhead)}</span>
            </div>
            <div className="breakdown-row">
              <span className="breakdown-label">+ WA Tax ({settings.taxPercent}%)</span>
              <span className="breakdown-value">{fmt(costs.total - costs.afterMisc)}</span>
            </div>
            <div className="breakdown-row breakdown-row--total">
              <span>Total Estimate</span>
              <span>{fmt(costs.total)}</span>
            </div>

            {/* Material detail per line item */}
            {form.lineItems.some(li => li.woodType) && (
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.625rem' }}>
                  Material Detail
                </p>
                {form.lineItems.map((item, idx) => {
                  const bf = calcBoardFeet(item)
                  const rateEntry = rates.find(r => r.type === item.woodType)
                  const cost = bf * (rateEntry?.rate ?? 0)
                  if (!item.woodType || !bf) return null
                  return (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8125rem', padding: '0.3rem 0', color: 'var(--text-muted)' }}>
                      <span>{item.woodType} ({bf.toFixed(2)} bf × {item.quantity})</span>
                      <span style={{ color: 'var(--text-body)', fontWeight: 500 }}>{fmt(cost)}</span>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Settings quick-view */}
            <div style={{ marginTop: '1.25rem', padding: '0.875rem', background: 'var(--off-white)', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
              <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--text-body)' }}>
                Active Settings
              </strong>
              Labor: ${settings.laborRate}/hr &bull; Waste: {settings.wastePercent}% &bull; Overhead: {settings.overheadPercent}% &bull; Misc: {settings.miscPercent}% &bull; Tax: {settings.taxPercent}%
            </div>

            <div style={{ marginTop: '1rem' }}>
              <Link to="/internal/settings" className="btn btn--outline btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                Edit Settings
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}