'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const C = {
  type:   '#3B2F2F',
  accent: '#C97363',
  t50:    '#a38a8a',
  t10:    '#f2eded',
} as const

const F = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const LINKS = ['Home', 'Resume', 'Projects', 'About', 'Contact']

export const SIDEBAR_W = 180

export function Nav() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <nav
        className='sidebar-nav'
        style={{ fontFamily: F }}
      >
        <div style={{ marginBottom: '40px' }}>
          <a
            href='#home'
            style={{
              fontSize: '13pt',
              fontWeight: 700,
              color: C.type,
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              display: 'block',
            }}
          >
            Corey
            <br />
            Zaher
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {LINKS.map((s) => (
            <a
              key={s}
              href={s === 'Home' ? '#home' : `#${s.toLowerCase()}`}
              className='nav-link'
            >
              {s}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '40px' }}>
          <a href='mailto:corey.zaher@gmail.com' className='nav-link' style={{ fontSize: '9pt', color: C.t50 }}>
            Email
          </a>
          <a href='https://linkedin.com/in/czaher' className='nav-link' style={{ fontSize: '9pt', color: C.t50 }}>
            LinkedIn
          </a>
        </div>
      </nav>

      {/* ── Mobile top bar ── */}
      <div className='mobile-topbar' style={{ fontFamily: F }}>
        <a
          href='#home'
          style={{ fontSize: '13pt', fontWeight: 700, color: C.type, textDecoration: 'none', letterSpacing: '-0.01em' }}
        >
          Corey Zaher
        </a>
        <button
          onClick={() => setOpen(true)}
          aria-label='Open menu'
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: C.type, display: 'flex', alignItems: 'center' }}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── Mobile overlay ── */}
      {open && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 100, fontFamily: F,
            backgroundColor: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 24px', borderBottom: `1px solid ${C.t10}` }}>
            <span style={{ fontSize: '13pt', fontWeight: 700, color: C.type, letterSpacing: '-0.01em' }}>Corey Zaher</span>
            <button onClick={close} aria-label='Close menu' style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: C.type, display: 'flex', alignItems: 'center' }}>
              <X size={20} />
            </button>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 32px', gap: '4px' }}>
            {LINKS.map((s) => (
              <a
                key={s}
                href={s === 'Home' ? '#home' : `#${s.toLowerCase()}`}
                onClick={close}
                className='mobile-nav-link'
                style={{ fontSize: '30pt', fontWeight: 700, color: C.type, textDecoration: 'none', letterSpacing: '-0.03em', lineHeight: 1.25 }}
              >
                {s}
              </a>
            ))}
          </div>
          <div style={{ padding: '24px 32px', borderTop: `1px solid ${C.t10}`, display: 'flex', gap: '20px' }}>
            <a href='mailto:corey.zaher@gmail.com' className='nav-link'>Email</a>
            <a href='https://linkedin.com/in/czaher' className='nav-link'>LinkedIn</a>
          </div>
        </div>
      )}
    </>
  )
}
