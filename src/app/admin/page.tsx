'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import type {
  ContentData,
  HeroData,
  ExperienceEntry,
  MLProjectData,
  MLPhase,
} from '@/lib/defaultContent'
import type { PipelineSaveData } from '@/components/MLPipelineCanvas'

const MLPipelineCanvas = dynamic(
  () => import('@/components/MLPipelineCanvas'),
  { ssr: false }
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const F = "var(--font-manrope), 'Helvetica Neue', Helvetica, Arial, sans-serif"

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  fontSize: 11,
  padding: '7px 10px',
  border: '1px solid var(--c-t10)',
  borderRadius: 6,
  background: 'var(--c-bg)',
  color: 'var(--c-type)',
  fontFamily: 'inherit',
  outline: 'none',
}

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: 'vertical',
  lineHeight: 1.55,
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 8,
  fontWeight: 600,
  color: 'var(--c-t50)',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 4,
}

const sectionHeadStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: 'var(--c-type)',
  letterSpacing: '-0.01em',
  margin: '0 0 20px 0',
}

// ─── Field helpers ────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  )
}

function SaveBtn({ status, onClick }: { status: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={status === 'saving'}
      style={{
        padding: '7px 18px',
        fontSize: 10,
        fontWeight: 600,
        border: 'none',
        borderRadius: 7,
        cursor: status === 'saving' ? 'wait' : 'pointer',
        background:
          status === 'saved' ? '#22c55e'
          : status === 'error' ? '#ef4444'
          : 'var(--c-accent)',
        color: '#fff',
        transition: 'background 0.2s',
        fontFamily: 'inherit',
      }}
    >
      {status === 'saving' ? 'Saving…' : status === 'saved' ? 'Saved ✓' : status === 'error' ? 'Error — retry' : 'Save'}
    </button>
  )
}

// ─── Auth gate ────────────────────────────────────────────────────────────────

function AuthGate({ onAuth }: { onAuth: (token: string) => void }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)

  async function submit() {
    setErr(false)
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${pw}`,
      },
      body: JSON.stringify({ __ping: true }),
    })
    // 500 means parse/save error but auth passed; 401 means wrong token
    if (res.status === 401) {
      setErr(true)
    } else {
      onAuth(pw)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--c-bg)',
        fontFamily: F,
      }}
    >
      <div
        style={{
          width: 320,
          padding: '36px 32px',
          border: '1px solid var(--c-t10)',
          borderRadius: 14,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          background: 'var(--c-bg)',
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--c-type)', marginBottom: 6 }}>Admin</div>
        <div style={{ fontSize: 11, color: 'var(--c-t50)', marginBottom: 24 }}>Enter your admin token to continue.</div>
        <Field label="Token">
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            style={{ ...inputStyle, marginBottom: err ? 8 : 0 }}
            autoFocus
          />
        </Field>
        {err && (
          <div style={{ fontSize: 10, color: '#ef4444', marginBottom: 12 }}>Invalid token. Check your ADMIN_TOKEN env var.</div>
        )}
        <button
          onClick={submit}
          style={{
            width: '100%',
            padding: '9px 0',
            fontSize: 11,
            fontWeight: 600,
            border: 'none',
            borderRadius: 7,
            background: 'var(--c-accent)',
            color: '#fff',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Log in
        </button>
      </div>
    </div>
  )
}

// ─── Hero editor ──────────────────────────────────────────────────────────────

function HeroEditor({
  data,
  onSave,
}: {
  data: HeroData
  onSave: (d: HeroData) => Promise<void>
}) {
  const [local, setLocal] = useState(data)
  const [status, setStatus] = useState('idle')

  useEffect(() => setLocal(data), [data])

  async function save() {
    setStatus('saving')
    try {
      await onSave(local)
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div>
      <h2 style={sectionHeadStyle}>Hero</h2>
      <Field label="Heading">
        <input style={inputStyle} value={local.heading} onChange={(e) => setLocal({ ...local, heading: e.target.value })} />
      </Field>
      <Field label="Tagline">
        <input style={inputStyle} value={local.tagline} onChange={(e) => setLocal({ ...local, tagline: e.target.value })} />
      </Field>
      <Field label="Bio">
        <textarea style={textareaStyle} rows={4} value={local.bio} onChange={(e) => setLocal({ ...local, bio: e.target.value })} />
      </Field>
      <SaveBtn status={status} onClick={save} />
    </div>
  )
}

// ─── Experience editor ────────────────────────────────────────────────────────

const VISUAL_OPTIONS = ['', 'auditBlock', 'clientContext', 'growthArc']
const EXTRA_OPTIONS  = ['', 'mlProject']

function ExperienceEntryEditor({
  entry,
  index,
  total,
  onChange,
  onDelete,
  onMove,
}: {
  entry: ExperienceEntry
  index: number
  total: number
  onChange: (e: ExperienceEntry) => void
  onDelete: () => void
  onMove: (dir: -1 | 1) => void
}) {
  const [open, setOpen] = useState(false)
  const set = (patch: Partial<ExperienceEntry>) => onChange({ ...entry, ...patch })

  return (
    <div
      style={{
        border: '1px solid var(--c-t10)',
        borderRadius: 8,
        marginBottom: 8,
        overflow: 'hidden',
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 14px',
          gap: 10,
          cursor: 'pointer',
          background: open ? 'var(--c-t10)' : 'transparent',
        }}
        onClick={() => setOpen((o) => !o)}
      >
        <span style={{ fontSize: 10, color: 'var(--c-t30)', width: 16, flexShrink: 0 }}>{open ? '▾' : '▸'}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-type)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {entry.role || '(no role)'}
          </div>
          <div style={{ fontSize: 9.5, color: 'var(--c-t50)' }}>{entry.company} · {entry.period}</div>
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
          <button onClick={() => onMove(-1)} disabled={index === 0} style={{ background: 'none', border: '1px solid var(--c-t10)', borderRadius: 4, padding: '2px 6px', cursor: index === 0 ? 'default' : 'pointer', fontSize: 11, color: 'var(--c-t50)' }}>↑</button>
          <button onClick={() => onMove(1)} disabled={index === total - 1} style={{ background: 'none', border: '1px solid var(--c-t10)', borderRadius: 4, padding: '2px 6px', cursor: index === total - 1 ? 'default' : 'pointer', fontSize: 11, color: 'var(--c-t50)' }}>↓</button>
          <button onClick={onDelete} style={{ background: 'none', border: '1px solid #ef4444', borderRadius: 4, padding: '2px 6px', cursor: 'pointer', fontSize: 11, color: '#ef4444' }}>✕</button>
        </div>
      </div>

      {/* Edit fields */}
      {open && (
        <div style={{ padding: '16px 14px', borderTop: '1px solid var(--c-t10)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field label="Role">
              <input style={inputStyle} value={entry.role} onChange={(e) => set({ role: e.target.value })} />
            </Field>
            <Field label="Company">
              <input style={inputStyle} value={entry.company} onChange={(e) => set({ company: e.target.value })} />
            </Field>
            <Field label="Period">
              <input style={inputStyle} value={entry.period} onChange={(e) => set({ period: e.target.value })} />
            </Field>
            <Field label="Logo (path)">
              <input style={inputStyle} value={entry.logo} onChange={(e) => set({ logo: e.target.value })} />
            </Field>
            <Field label="Logo shape">
              <select style={{ ...inputStyle, appearance: 'none' }} value={entry.logoShape ?? 'circle'} onChange={(e) => set({ logoShape: e.target.value as 'circle' | 'rounded' })}>
                <option value="circle">circle</option>
                <option value="rounded">rounded</option>
              </select>
            </Field>
            <Field label="Section ID (optional)">
              <input style={inputStyle} value={entry.id ?? ''} onChange={(e) => set({ id: e.target.value || undefined })} />
            </Field>
          </div>

          <Field label="Tags (comma-separated)">
            <input style={inputStyle} value={(entry.tags ?? []).join(', ')} onChange={(e) => set({ tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} />
          </Field>

          <Field label="Summary">
            <textarea style={textareaStyle} rows={3} value={entry.summary ?? ''} onChange={(e) => set({ summary: e.target.value })} />
          </Field>

          <Field label="Bullets (one per line)">
            <textarea
              style={textareaStyle}
              rows={5}
              value={(entry.bullets ?? []).join('\n')}
              onChange={(e) => set({ bullets: e.target.value.split('\n').filter(Boolean) })}
            />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
            <Field label="Visual component">
              <select style={{ ...inputStyle, appearance: 'none' }} value={entry.visualKey ?? ''} onChange={(e) => set({ visualKey: e.target.value || undefined })}>
                {VISUAL_OPTIONS.map((v) => <option key={v} value={v}>{v || '(none)'}</option>)}
              </select>
            </Field>
            <Field label="Extra component">
              <select style={{ ...inputStyle, appearance: 'none' }} value={entry.extraKey ?? ''} onChange={(e) => set({ extraKey: e.target.value || undefined })}>
                {EXTRA_OPTIONS.map((v) => <option key={v} value={v}>{v || '(none)'}</option>)}
              </select>
            </Field>
          </div>
        </div>
      )}
    </div>
  )
}

function ExperienceEditor({
  data,
  onSave,
}: {
  data: ExperienceEntry[]
  onSave: (d: ExperienceEntry[]) => Promise<void>
}) {
  const [entries, setEntries] = useState<ExperienceEntry[]>(data)
  const [status, setStatus] = useState('idle')

  useEffect(() => setEntries(data), [data])

  function addEntry() {
    setEntries((prev) => [
      ...prev,
      { role: 'New Role', company: 'Company', period: '20XX – Present', logo: '/logo.svg' },
    ])
  }

  function updateEntry(i: number, e: ExperienceEntry) {
    setEntries((prev) => prev.map((x, idx) => (idx === i ? e : x)))
  }

  function deleteEntry(i: number) {
    setEntries((prev) => prev.filter((_, idx) => idx !== i))
  }

  function moveEntry(i: number, dir: -1 | 1) {
    setEntries((prev) => {
      const next = [...prev]
      const j = i + dir
      if (j < 0 || j >= next.length) return prev
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
  }

  async function save() {
    setStatus('saving')
    try {
      // Mark last entry
      const stamped = entries.map((e, i) => ({ ...e, isLast: i === entries.length - 1 }))
      await onSave(stamped)
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div>
      <h2 style={sectionHeadStyle}>Experience</h2>
      {entries.map((e, i) => (
        <ExperienceEntryEditor
          key={i}
          entry={e}
          index={i}
          total={entries.length}
          onChange={(upd) => updateEntry(i, upd)}
          onDelete={() => deleteEntry(i)}
          onMove={(dir) => moveEntry(i, dir)}
        />
      ))}
      <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
        <button
          onClick={addEntry}
          style={{
            padding: '7px 14px',
            fontSize: 10,
            fontWeight: 600,
            border: '1px solid var(--c-t10)',
            borderRadius: 7,
            background: 'none',
            cursor: 'pointer',
            color: 'var(--c-type)',
            fontFamily: 'inherit',
          }}
        >
          + Add Entry
        </button>
        <SaveBtn status={status} onClick={save} />
      </div>
    </div>
  )
}

// ─── ML Project editor ────────────────────────────────────────────────────────

function PhaseEditor({
  phase,
  onChange,
  onDelete,
}: {
  phase: MLPhase
  onChange: (p: MLPhase) => void
  onDelete: () => void
}) {
  const set = (patch: Partial<MLPhase>) => onChange({ ...phase, ...patch })
  return (
    <div
      style={{
        border: '1px solid var(--c-t10)',
        borderRadius: 8,
        padding: '14px',
        marginBottom: 10,
      }}
    >
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <div style={{ flex: 1 }}>
          <Field label="Label">
            <input style={inputStyle} value={phase.label} onChange={(e) => set({ label: e.target.value })} />
          </Field>
        </div>
        <div style={{ flex: 2 }}>
          <Field label="Sub-label">
            <input style={inputStyle} value={phase.sub} onChange={(e) => set({ sub: e.target.value })} />
          </Field>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 0, gap: 8 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--c-t50)', cursor: 'pointer', marginBottom: 4 }}>
            <input type="checkbox" checked={!!phase.isFuture} onChange={(e) => set({ isFuture: e.target.checked })} />
            Future
          </label>
          <button onClick={onDelete} style={{ background: 'none', border: '1px solid #ef4444', borderRadius: 4, padding: '3px 8px', cursor: 'pointer', fontSize: 10, color: '#ef4444', marginBottom: 4 }}>✕</button>
        </div>
      </div>
      <Field label="Items (one per line)">
        <textarea
          style={textareaStyle}
          rows={3}
          value={phase.items.join('\n')}
          onChange={(e) => set({ items: e.target.value.split('\n').filter(Boolean) })}
        />
      </Field>
    </div>
  )
}

function MLProjectEditor({
  data,
  onSave,
}: {
  data: MLProjectData
  onSave: (d: MLProjectData) => Promise<void>
}) {
  const [local, setLocal] = useState(data)
  const [status, setStatus] = useState('idle')

  useEffect(() => setLocal(data), [data])

  const set = (patch: Partial<MLProjectData>) => setLocal((prev) => ({ ...prev, ...patch }))

  function updatePhase(i: number, p: MLPhase) {
    set({ phases: local.phases.map((x, idx) => (idx === i ? p : x)) })
  }

  function deletePhase(i: number) {
    set({ phases: local.phases.filter((_, idx) => idx !== i) })
  }

  function addPhase() {
    set({ phases: [...local.phases, { label: 'Phase X', sub: 'Description', items: [] }] })
  }

  async function save() {
    setStatus('saving')
    try {
      await onSave(local)
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div>
      <h2 style={sectionHeadStyle}>ML Project</h2>
      <Field label="Title">
        <input style={inputStyle} value={local.title} onChange={(e) => set({ title: e.target.value })} />
      </Field>
      <Field label="Description">
        <textarea style={textareaStyle} rows={3} value={local.description} onChange={(e) => set({ description: e.target.value })} />
      </Field>
      <Field label="Tags (comma-separated)">
        <input style={inputStyle} value={local.tags.join(', ')} onChange={(e) => set({ tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} />
      </Field>

      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--c-t50)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>Phases</div>
        {local.phases.map((p, i) => (
          <PhaseEditor key={i} phase={p} onChange={(upd) => updatePhase(i, upd)} onDelete={() => deletePhase(i)} />
        ))}
        <button
          onClick={addPhase}
          style={{
            padding: '6px 12px',
            fontSize: 10,
            fontWeight: 600,
            border: '1px solid var(--c-t10)',
            borderRadius: 7,
            background: 'none',
            cursor: 'pointer',
            color: 'var(--c-type)',
            fontFamily: 'inherit',
            marginBottom: 16,
          }}
        >
          + Add Phase
        </button>
      </div>
      <SaveBtn status={status} onClick={save} />
    </div>
  )
}

// ─── Pipeline editor ──────────────────────────────────────────────────────────

function PipelineEditor({
  data,
  onSave,
}: {
  data: ContentData['pipeline']
  onSave: (d: ContentData['pipeline']) => Promise<void>
}) {
  const [status, setStatus] = useState('idle')

  const handleSave = useCallback(
    async (saveData: PipelineSaveData) => {
      setStatus('saving')
      try {
        await onSave({
          training: saveData.training as ContentData['pipeline']['training'],
          reinforcement: saveData.reinforcement as ContentData['pipeline']['reinforcement'],
        })
        setStatus('saved')
        setTimeout(() => setStatus('idle'), 2000)
      } catch {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3000)
      }
    },
    [onSave]
  )

  return (
    <div>
      <h2 style={sectionHeadStyle}>ML Pipeline Canvas</h2>
      <p style={{ fontSize: 10.5, color: 'var(--c-t50)', marginBottom: 16, lineHeight: 1.6 }}>
        Drag nodes to reposition them. Click a node to edit its label and detail text. Switch tabs to edit each diagram. Hit <strong>Save Layout</strong> when done.
      </p>
      {status === 'saved' && (
        <div style={{ fontSize: 10, color: '#22c55e', marginBottom: 10 }}>Layout saved successfully.</div>
      )}
      {status === 'error' && (
        <div style={{ fontSize: 10, color: '#ef4444', marginBottom: 10 }}>Save failed. Check your token and try again.</div>
      )}
      <MLPipelineCanvas
        initialTrainingNodes={data.training.nodes}
        initialTrainingEdges={data.training.edges}
        initialRLNodes={data.reinforcement.nodes}
        initialRLEdges={data.reinforcement.edges}
        adminMode
        onSave={handleSave}
      />
    </div>
  )
}

// ─── Main admin page ──────────────────────────────────────────────────────────

type Section = 'pipeline' | 'hero' | 'experience' | 'mlProject'

export default function AdminPage() {
  const [token, setToken]       = useState<string | null>(null)
  const [content, setContent]   = useState<ContentData | null>(null)
  const [section, setSection]   = useState<Section>('pipeline')
  const [loading, setLoading]   = useState(false)

  // Restore token from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('adminToken')
    if (saved) setToken(saved)
  }, [])

  // Fetch content when authenticated
  useEffect(() => {
    if (!token) return
    setLoading(true)
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => { setContent(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [token])

  function handleAuth(tok: string) {
    sessionStorage.setItem('adminToken', tok)
    setToken(tok)
  }

  function logout() {
    sessionStorage.removeItem('adminToken')
    setToken(null)
    setContent(null)
  }

  async function saveSection<K extends keyof ContentData>(key: K, value: ContentData[K]) {
    if (!content || !token) throw new Error('Not ready')
    const updated = { ...content, [key]: value }
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updated),
    })
    if (!res.ok) {
      if (res.status === 401) {
        logout()
        throw new Error('Unauthorized')
      }
      throw new Error('Save failed')
    }
    setContent(updated)
  }

  if (!token) return <AuthGate onAuth={handleAuth} />

  const NAV: { id: Section; label: string }[] = [
    { id: 'pipeline',   label: 'ML Pipeline' },
    { id: 'hero',       label: 'Hero' },
    { id: 'experience', label: 'Experience' },
    { id: 'mlProject',  label: 'ML Project' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)', fontFamily: F }}>
      {/* Top bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: 52,
          borderBottom: '1px solid var(--c-t10)',
          background: 'var(--c-bg)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/" style={{ fontSize: 11, color: 'var(--c-t50)', textDecoration: 'none' }}>← Site</Link>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--c-type)', letterSpacing: '-0.01em' }}>Admin Panel</span>
          <span style={{ fontSize: 8, fontWeight: 600, color: '#F59E0B', textTransform: 'uppercase', letterSpacing: '0.07em', background: 'rgba(245,158,11,0.1)', padding: '2px 7px', borderRadius: 4 }}>
            Admin Mode
          </span>
        </div>
        <button
          onClick={logout}
          style={{ fontSize: 10, color: 'var(--c-t50)', background: 'none', border: '1px solid var(--c-t10)', borderRadius: 6, padding: '4px 12px', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Log out
        </button>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 52px)' }}>
        {/* Sidebar */}
        <nav
          style={{
            width: 180,
            flexShrink: 0,
            borderRight: '1px solid var(--c-t10)',
            padding: '20px 0',
          }}
        >
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '9px 20px',
                fontSize: 11,
                fontWeight: section === item.id ? 600 : 400,
                color: section === item.id ? 'var(--c-type)' : 'var(--c-t50)',
                background: section === item.id ? 'var(--c-t10)' : 'none',
                border: 'none',
                borderLeft: section === item.id ? '2px solid var(--c-accent)' : '2px solid transparent',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'background 0.1s',
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <main style={{ flex: 1, padding: '32px 40px', maxWidth: 860, overflowY: 'auto' }}>
          {loading || !content ? (
            <div style={{ fontSize: 11, color: 'var(--c-t50)' }}>Loading content…</div>
          ) : (
            <>
              {section === 'pipeline' && (
                <PipelineEditor
                  data={content.pipeline}
                  onSave={(d) => saveSection('pipeline', d)}
                />
              )}
              {section === 'hero' && (
                <HeroEditor
                  data={content.hero}
                  onSave={(d) => saveSection('hero', d)}
                />
              )}
              {section === 'experience' && (
                <ExperienceEditor
                  data={content.experience}
                  onSave={(d) => saveSection('experience', d)}
                />
              )}
              {section === 'mlProject' && (
                <MLProjectEditor
                  data={content.mlProject}
                  onSave={(d) => saveSection('mlProject', d)}
                />
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
