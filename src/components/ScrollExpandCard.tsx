'use client'

import { useEffect, useRef } from 'react'

const MARGIN = 56 // resting inset from the page edges, in px
const RADIUS = 24 // resting corner radius, in px

/**
 * Signature scroll-driven spotlight. A single featured panel that begins as an
 * inset, floating card and expands to full-bleed as it locks into the viewport —
 * its shadow settling from "lifted" to "grounded" so it reads as the section's
 * own background once locked. Used once, deliberately, on the headline role;
 * repeating it per section is the uniform-reflex tell we're avoiding.
 */
export function ScrollExpandCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const bar = barRef.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0

    function apply() {
      raf = 0
      if (!el) return

      const mobile = window.innerWidth <= 720

      // Reduced-motion / mobile: skip the scroll choreography. Mobile goes
      // full-bleed (matches the section padding); desktop rests as a card.
      if (mobile || reduce) {
        el.style.borderRadius = mobile ? '0px' : `${RADIUS}px`
        el.style.marginLeft = mobile ? '0px' : `${MARGIN}px`
        el.style.marginRight = mobile ? '0px' : `${MARGIN}px`
        el.style.boxShadow = 'none'
        if (bar) bar.style.opacity = '1'
        return
      }

      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.75)))
      // ease-out-quart: quick to expand, settles gently into the lock
      const p = 1 - (1 - raw) ** 4

      el.style.borderRadius = `${RADIUS * (1 - p)}px`
      el.style.marginLeft = `${MARGIN * (1 - p)}px`
      el.style.marginRight = `${MARGIN * (1 - p)}px`

      // Shadow is strongest while floating, fades to flat once grounded.
      const lift = 1 - p
      el.style.boxShadow =
        `0 ${28 * lift}px ${72 * lift}px -24px ` +
        `color-mix(in srgb, var(--c-type) ${20 * lift}%, transparent)`

      // "Current role" accent rule fades in as the panel locks.
      if (bar) bar.style.opacity = String(p)
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(apply)
    }

    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        backgroundColor: 'var(--c-t10)',
        borderRadius: `${RADIUS}px`,
        marginLeft: `${MARGIN}px`,
        marginRight: `${MARGIN}px`,
        overflow: 'hidden',
        willChange: 'border-radius, margin, box-shadow',
      }}
    >
      <div
        ref={barRef}
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'var(--c-accent)',
          opacity: 0,
        }}
      />
      {children}
    </div>
  )
}
