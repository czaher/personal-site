'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X, Mail, Link, Download, type LucideIcon } from 'lucide-react'

const C = {
  type: 'var(--c-type)',
  accent: 'var(--c-accent)',
  t50: 'var(--c-t50)',
  t10: 'var(--c-t10)',
} as const

const F = "var(--font-manrope), 'Helvetica Neue', Helvetica, Arial, sans-serif"

type WorkItem = { label: string; href: string; year: string; icon: string; iconShape?: 'circle' | 'rounded' }
type ContactItem = { label: string; href: string; download?: boolean; icon: LucideIcon }

const WORK: WorkItem[] = [
  {
    label: 'London Computer Systems',
    href: '#lcs',
    year: 'now',
    icon: '/LCS.svg',
  },
  { label: 'SupplyHive', href: '#supplyhive', year: '2023', icon: '/SH.svg' },
  { label: 'Refract Labs', href: '#refract', year: '2022', icon: '/RL.svg', iconShape: 'rounded' },
  {
    label: 'University of Cincinnati',
    href: '#uc',
    year: '2020',
    icon: '/UC.svg',
  },
]

const CONTACT: ContactItem[] = [
  { label: 'Email', href: 'mailto:corey.zaher@gmail.com', icon: Mail },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/czaher', icon: Link },
  { label: 'Resume', href: '/Corey_Zaher_Resume.pdf', download: true, icon: Download },
]

function SideLabel({ children }: { children: string }) {
  return (
    <div
      style={{
        fontSize: '8pt',
        fontWeight: 600,
        color: C.t50,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        marginBottom: '10px',
      }}
    >
      {children}
    </div>
  )
}

function Icon({ src, shape = 'circle' }: { src: string; shape?: 'circle' | 'rounded' }) {
  return (
    <Image
      src={src}
      alt=''
      width={24}
      height={24}
      style={{ borderRadius: shape === 'circle' ? '50%' : '4px', flexShrink: 0, objectFit: 'contain' }}
    />
  )
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus()
    }
  }, [open])

  const close = () => {
    setOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <nav className='sidebar-nav' style={{ fontFamily: F }}>
        <a
          href='#home'
          style={{
            display: 'block',
            fontSize: '14pt',
            fontWeight: 700,
            color: C.type,
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            marginBottom: '36px',
          }}
        >
          Corey Zaher
        </a>

        <div style={{ marginBottom: '28px' }}>
          <SideLabel>Work</SideLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {WORK.map((item) => (
              <a key={item.href} href={item.href} className='sidebar-item'>
                <Icon src={item.icon} shape={item.iconShape} />
                <span style={{ flex: 1, minWidth: 0 }}>{item.label}</span>
                <span className='sidebar-year'>{item.year}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <SideLabel>Contact</SideLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {CONTACT.map((item) => (
              <a
                key={item.href}
                href={item.href}
                download={item.download}
                className='sidebar-contact-item'
              >
                <item.icon size={14} strokeWidth={1.75} />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Mobile top bar ── */}
      <div className='mobile-topbar' style={{ fontFamily: F }}>
        <a
          href='#home'
          style={{
            fontSize: '13pt',
            fontWeight: 700,
            color: C.type,
            textDecoration: 'none',
            letterSpacing: '-0.01em',
          }}
        >
          Corey Zaher
        </a>
        <button
          ref={menuButtonRef}
          onClick={() => setOpen(true)}
          aria-label='Open navigation menu'
          aria-expanded={open}
          aria-haspopup='dialog'
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: C.type,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ── Mobile overlay ── */}
      {open && (
        <div
          role='dialog'
          aria-modal='true'
          aria-label='Navigation'
          onKeyDown={(e) => { if (e.key === 'Escape') close() }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            fontFamily: F,
            backgroundColor: 'color-mix(in srgb, var(--c-bg) 97%, transparent)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 24px',
              borderBottom: `1px solid ${C.t10}`,
            }}
          >
            <span
              style={{
                fontSize: '13pt',
                fontWeight: 700,
                color: C.type,
                letterSpacing: '-0.01em',
              }}
            >
              Corey Zaher
            </span>
            <button
              ref={closeButtonRef}
              onClick={close}
              aria-label='Close navigation menu'
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: C.type,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={20} />
            </button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '32px 24px' }}>
            <div style={{ marginBottom: '28px' }}>
              <SideLabel>Work</SideLabel>
              {WORK.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 0',
                    textDecoration: 'none',
                    borderBottom: `1px solid ${C.t10}`,
                  }}
                >
                  <Image
                    src={item.icon}
                    alt=''
                    width={32}
                    height={32}
                    style={{
                      borderRadius: item.iconShape === 'rounded' ? '6px' : '50%',
                      flexShrink: 0,
                      objectFit: 'contain',
                    }}
                  />
                  <span
                    style={{
                      flex: 1,
                      fontSize: '14pt',
                      fontWeight: 600,
                      color: C.type,
                    }}
                  >
                    {item.label}
                  </span>
                  <span style={{ fontSize: '11pt', color: C.t50 }}>
                    {item.year}
                  </span>
                </a>
              ))}
            </div>
            <div>
              <SideLabel>Contact</SideLabel>
              {CONTACT.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  download={item.download}
                  onClick={close}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 0',
                    textDecoration: 'none',
                    fontSize: '14pt',
                    fontWeight: 600,
                    color: C.type,
                    borderBottom: `1px solid ${C.t10}`,
                  }}
                >
                  <item.icon size={20} strokeWidth={1.75} />
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
