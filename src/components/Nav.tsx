'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const C = {
  type: '#3B2F2F',
  t10:  '#f2eded',
} as const

const F = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const LINKS = ['Resume', 'Projects', 'About', 'Contact']

export function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50, fontFamily: F,
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${C.t10}`,
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto', padding: '14px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <a href="#" style={{
            fontSize: '13pt', fontWeight: 700, color: C.type,
            textDecoration: 'none', letterSpacing: '-0.01em',
          }}>
            Corey Zaher
          </a>

          {/* Desktop links */}
          <div className="nav-desktop">
            {LINKS.map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="nav-link">{s}</a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: C.type, display: 'flex', alignItems: 'center' }}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, fontFamily: F,
          backgroundColor: 'rgba(255,255,255,0.93)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* Top bar mirrors nav */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 24px', borderBottom: `1px solid ${C.t10}`,
          }}>
            <span style={{ fontSize: '13pt', fontWeight: 700, color: C.type, letterSpacing: '-0.01em' }}>
              Corey Zaher
            </span>
            <button
              onClick={close}
              aria-label="Close menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: C.type, display: 'flex', alignItems: 'center' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Large nav links */}
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', padding: '0 32px', gap: '4px',
          }}>
            {LINKS.map(s => (
              <a
                key={s}
                href={`#${s.toLowerCase()}`}
                onClick={close}
                className="mobile-nav-link"
                style={{
                  fontSize: '30pt', fontWeight: 700, color: C.type,
                  textDecoration: 'none', letterSpacing: '-0.03em', lineHeight: 1.25,
                }}
              >
                {s}
              </a>
            ))}
          </div>

          {/* Footer contact links */}
          <div style={{ padding: '24px 32px', borderTop: `1px solid ${C.t10}`, display: 'flex', gap: '20px' }}>
            <a href="mailto:corey.zaher@gmail.com" className="nav-link">Email</a>
            <a href="https://linkedin.com/in/czaher" className="nav-link">LinkedIn</a>
          </div>
        </div>
      )}
    </>
  )
}
