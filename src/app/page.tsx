import Image from 'next/image'
import { Nav } from '@/components/Nav'
import MLPipelineCanvas from '@/components/MLPipelineCanvasLoader'
import { ScrollExpandCard } from '@/components/ScrollExpandCard'
import { loadContent } from '@/lib/content'
import type { MLProjectData, MLPhase, ExperienceEntry } from '@/lib/defaultContent'

const C = {
  type: 'var(--c-type)',
  accent: 'var(--c-accent)',
  t70: 'var(--c-t70)',
  t50: 'var(--c-t50)',
  t30: 'var(--c-t30)',
  t10: 'var(--c-t10)',
} as const

const F = "var(--font-manrope), 'Helvetica Neue', Helvetica, Arial, sans-serif"

// ── Shared primitives ──────────────────────────────────────────────────────────

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '9pt',
        fontWeight: 500,
        color: C.t50,
        backgroundColor: C.t10,
        borderRadius: '3px',
        padding: '2px 8px',
      }}
    >
      {children}
    </span>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        margin: 0,
        padding: 0,
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'flex-start',
            fontSize: '11pt',
            color: C.t70,
            lineHeight: 1.6,
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: C.accent,
              flexShrink: 0,
              marginTop: '7px',
            }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

// ── Role-specific visuals ──────────────────────────────────────────────────────

/** LCS Design System Specialist: editorial pull-stats, not metric cards */
function AuditBlock() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
        paddingTop: '4px',
      }}
    >
      <div>
        <div
          style={{
            fontSize: '9pt',
            color: C.t30,
            marginBottom: '4px',
            fontWeight: 500,
          }}
        >
          UI audit scope
        </div>
        <div
          style={{
            fontSize: '32pt',
            fontWeight: 800,
            color: C.type,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
          }}
        >
          550+ issues
        </div>
        <div style={{ fontSize: '11pt', color: C.t70, marginTop: '4px' }}>
          across 182 product features in Rent Manager Express
        </div>
      </div>
      <div>
        <div
          style={{
            fontSize: '9pt',
            color: C.t30,
            marginBottom: '4px',
            fontWeight: 500,
          }}
        >
          ML-powered audit pipeline
        </div>
        <div
          style={{
            fontSize: '32pt',
            fontWeight: 800,
            color: C.type,
            letterSpacing: '-0.025em',
            lineHeight: 1.05,
          }}
        >
          92% precision
        </div>
        <div style={{ fontSize: '11pt', color: C.t70, marginTop: '4px' }}>
          component identification on a trained subset, via YOLOv8 and
          OmniParser
        </div>
      </div>
      <div style={{ paddingTop: '4px', borderTop: `1px solid ${C.t10}` }}>
        <div
          style={{
            fontSize: '9pt',
            color: C.t50,
            lineHeight: 1.7,
            fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
          }}
        >
          YOLOv8 · OmniParser · Claude Code · Figma API · Figma Plugins
        </div>
      </div>
    </div>
  )
}

/** SupplyHive: client context as editorial note, not cards */
function ClientContext() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        paddingTop: '4px',
      }}
    >
      <div>
        <div
          style={{
            fontSize: '9pt',
            color: C.t30,
            marginBottom: '6px',
            fontWeight: 500,
          }}
        >
          Client context
        </div>
        <div
          style={{
            fontSize: '13pt',
            fontWeight: 700,
            color: C.type,
            lineHeight: 1.3,
            marginBottom: '6px',
          }}
        >
          Fortune 500
        </div>
        <div style={{ fontSize: '11pt', color: C.t70, lineHeight: 1.6 }}>
          Supplier performance management platform serving McDonald&apos;s and
          Meta, among others.
        </div>
      </div>
      <div style={{ paddingTop: '20px', borderTop: `1px solid ${C.t10}` }}>
        <div
          style={{
            fontSize: '9pt',
            color: C.t30,
            marginBottom: '10px',
            fontWeight: 500,
          }}
        >
          What I owned
        </div>
        {[
          'Requirements from C-suite stakeholders',
          'High-fidelity UI and component library',
          'Developer handoff and Agile ceremonies',
          'Marketing site and client email campaigns',
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: '8px 0',
              borderBottom: i < 3 ? `1px solid ${C.t10}` : 'none',
              fontSize: '10.5pt',
              color: C.t70,
              lineHeight: 1.5,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

/** Refract Labs: role evolution arc */
function GrowthArc() {
  const stages = [
    {
      title: 'Frontend Dev',
      detail: 'Web apps for startup and enterprise clients',
    },
    { title: 'Project Lead', detail: 'Scrum, sprint planning, retrospectives' },
    {
      title: 'Product Engineer',
      detail: 'Requirements, wireframes, high-fidelity mockups',
    },
  ]
  return (
    <div style={{ paddingTop: '4px' }}>
      <div
        style={{
          fontSize: '9pt',
          color: C.t30,
          marginBottom: '20px',
          fontWeight: 500,
        }}
      >
        Role evolution as 4th hire
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {stages.map((stage, i) => (
          <div
            key={stage.title}
            style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
          >
            {/* Timeline line */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
                width: '20px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: i === stages.length - 1 ? C.accent : C.t30,
                  flexShrink: 0,
                  marginTop: '4px',
                }}
              />
              {i < stages.length - 1 && (
                <div
                  style={{
                    width: '1px',
                    background: C.t10,
                    flex: 1,
                    minHeight: '28px',
                    marginTop: '4px',
                  }}
                />
              )}
            </div>
            {/* Content */}
            <div
              style={{ paddingBottom: i < stages.length - 1 ? '20px' : '0' }}
            >
              <div
                style={{
                  fontSize: '11pt',
                  fontWeight: 700,
                  color: C.type,
                  marginBottom: '2px',
                }}
              >
                {stage.title}
              </div>
              <div style={{ fontSize: '10pt', color: C.t50, lineHeight: 1.5 }}>
                {stage.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ML Project Section (inside DS Specialist) ─────────────────────────────────

function MLPhaseTimeline({ phases }: { phases: MLPhase[] }) {
  return (
    <div style={{ marginBottom: '40px' }}>
      <p
        style={{
          fontSize: '9pt',
          color: C.t30,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          margin: '0 0 14px 0',
        }}
      >
        Timeline
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        {phases.map((phase) => (
          <div
            key={phase.label}
            style={{
              flex: 1,
              backgroundColor: C.t10,
              borderRadius: '8px',
              padding: '0 0 14px 0',
              overflow: 'hidden',
              minWidth: 0,
            }}
          >
            <div
              style={{
                height: '3px',
                backgroundColor: phase.isFuture ? C.accent : C.t30,
                marginBottom: '12px',
                borderRadius: '8px 8px 0 0',
              }}
            />
            <div style={{ padding: '0 12px' }}>
              <div
                style={{
                  fontSize: '10pt',
                  fontWeight: 700,
                  color: C.type,
                  marginBottom: '2px',
                }}
              >
                {phase.label}
              </div>
              <div
                style={{
                  fontSize: '8.5pt',
                  color: phase.isFuture ? C.accent : C.t50,
                  fontWeight: phase.isFuture ? 500 : 400,
                  marginBottom: '10px',
                  lineHeight: 1.3,
                }}
              >
                {phase.sub}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {phase.items.map((item, j) => (
                  <div
                    key={j}
                    style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}
                  >
                    <span
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: phase.isFuture ? C.accent : C.t30,
                        flexShrink: 0,
                        marginTop: '5px',
                      }}
                    />
                    <span style={{ fontSize: '8.5pt', color: C.t70, lineHeight: 1.45 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function MLProjectSection({ mlProject }: { mlProject: MLProjectData }) {
  return (
    <div
      style={{
        paddingTop: '36px',
        borderTop: `1px solid ${C.t10}`,
        marginTop: '8px',
      }}
    >
      <div style={{ marginBottom: '28px' }}>
        <span
          style={{
            fontSize: '9pt',
            color: C.t30,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Project
        </span>
        <h3
          style={{
            fontSize: '15pt',
            fontWeight: 700,
            color: C.type,
            letterSpacing: '-0.015em',
            margin: '4px 0 8px 0',
          }}
        >
          {mlProject.title}
        </h3>
        <p
          style={{
            fontSize: '11pt',
            color: C.t70,
            lineHeight: 1.6,
            margin: '0 0 14px 0',
            maxWidth: '600px',
          }}
        >
          {mlProject.description}
        </p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {mlProject.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
      <MLPhaseTimeline phases={mlProject.phases} />
      <div style={{ marginBottom: '8px' }}>
        <p
          style={{
            fontSize: '9pt',
            color: C.t30,
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            margin: '0 0 12px 0',
          }}
        >
          Pipeline
        </p>
        <MLPipelineCanvas />
      </div>
    </div>
  )
}

// ── ExperienceSection ──────────────────────────────────────────────────────────

function ExperienceSection({
  id,
  role,
  company,
  period,
  logo,
  logoShape = 'circle',
  isLast,
  tags,
  summary,
  bullets,
  visual,
  extra,
}: {
  id?: string
  role: string
  company: string
  period: string
  logo: string
  logoShape?: 'circle' | 'rounded'
  isLast?: boolean
  tags?: string[]
  summary?: string
  bullets?: string[]
  visual?: React.ReactNode
  extra?: React.ReactNode
}) {
  const hasVisual = !!visual

  return (
    <div id={id} className='experience-section'>
      {!isLast && (
        <div
          className='experience-divider'
          style={{ backgroundColor: C.t10 }}
        />
      )}
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <p
            style={{
              fontSize: '10pt',
              color: C.t50,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              margin: '0 0 8px 0',
            }}
          >
            {period}
          </p>
          <h2
            style={{
              fontSize: '26pt',
              fontWeight: 700,
              color: C.type,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 10px 0',
            }}
          >
            {role}
          </h2>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: tags?.length ? '14px' : '0',
            }}
          >
            <Image
              src={logo}
              alt={company}
              width={28}
              height={28}
              style={{
                borderRadius: logoShape === 'circle' ? '50%' : '5px',
                objectFit: 'contain',
                flexShrink: 0,
              }}
            />
            <div style={{ fontSize: '14pt', color: C.accent, fontWeight: 500 }}>
              {company}
            </div>
          </div>
          {tags && tags.length > 0 && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div className={hasVisual ? 'experience-body--has-visual' : undefined}>
          <div>
            {summary && (
              <p
                style={{
                  fontSize: '11pt',
                  color: C.t70,
                  lineHeight: 1.65,
                  margin: '0 0 20px 0',
                }}
              >
                {summary}
              </p>
            )}
            {bullets && <BulletList items={bullets} />}
          </div>
          {visual && <div>{visual}</div>}
        </div>
        {extra && <div style={{ marginTop: '48px' }}>{extra}</div>}
      </div>
    </div>
  )
}

// ── Visual/extra component registry ───────────────────────────────────────────

function getVisual(key: string | undefined): React.ReactNode {
  if (key === 'auditBlock')    return <AuditBlock />
  if (key === 'clientContext') return <ClientContext />
  if (key === 'growthArc')     return <GrowthArc />
  return undefined
}

function getExtra(key: string | undefined, mlProject: MLProjectData): React.ReactNode {
  if (key === 'mlProject') return <MLProjectSection mlProject={mlProject} />
  return undefined
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  const content = loadContent()
  const { hero, experience, mlProject } = content

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--c-bg)',
        fontFamily: F,
        color: C.type,
      }}
    >
      <a href='#main-content' className='skip-link'>
        Skip to main content
      </a>
      <Nav />

      <main id='main-content' className='page-content'>
        {/* ── Hero ───────────────────────────────────────────────── */}
        <section
          id='home'
          aria-labelledby='page-heading'
          style={{ padding: '120px 48px 100px' }}
        >
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '80px',
            }}
          >
            <div style={{ flex: 1 }}>
              <h1
                id='page-heading'
                style={{
                  fontFamily: "'Momo Signature', cursive",
                  fontSize: '52pt',
                  fontWeight: 'normal',
                  color: C.type,
                  lineHeight: 1.1,
                  margin: '0 0 28px 0',
                }}
              >
                {hero.heading}
              </h1>
              <p
                style={{
                  fontSize: '17pt',
                  color: C.t70,
                  lineHeight: 1.45,
                  fontWeight: 400,
                  margin: '0 0 20px 0',
                }}
              >
                {hero.tagline}
              </p>
              <p
                style={{
                  fontSize: '13pt',
                  color: C.t50,
                  lineHeight: 1.65,
                  marginBottom: '44px',
                }}
              >
                {hero.bio}
              </p>
            </div>

            <div className='hero-frame'>
              <svg
                role='img'
                aria-label='Photo of Corey Zaher'
                viewBox='0 0 605 563'
                xmlns='http://www.w3.org/2000/svg'
                style={{ width: '100%', height: '100%', display: 'block' }}
              >
                <defs>
                  <clipPath id='paper-clip'>
                    <path d='M123.993 218.268C110.395 190.128 96.3504 163.392 85.744 135.065C79.8003 119.191 75.4065 102.845 70.5898 86.5403C77.3824 80.891 83.6529 75.4026 90.2034 70.2938C109.958 54.8922 130.11 40.0401 151.567 27.0639C154.959 25.0071 158.753 23.4157 162.549 22.2376C198.999 10.9956 236.545 5.63689 274.376 1.95467C281.81 1.22656 289.291 0.83725 296.725 0.223351C305.741 -0.51379 314.51 0.569691 323.103 3.53351C341.543 23.8666 355.011 47.6901 369.385 70.8744C374.998 79.922 380.758 88.8905 385.973 98.1713C390.581 106.354 394.528 114.921 399.127 124.041C402.122 122.46 405.945 121.046 409.052 118.694C416.229 113.221 423.832 109.259 432.971 108.181C436.866 107.724 440.594 105.875 444.375 104.579C446.761 103.764 449.104 102.825 451.479 101.936C452.824 101.43 454.397 101.219 455.479 100.38C462.803 94.7709 471.7 93.3935 480.186 90.8081C485.619 89.1499 490.853 86.8893 496.65 84.7194C500.244 87.3942 503.81 89.7635 507.048 92.4963C527.711 109.94 544.289 130.857 558.555 153.659C572.337 175.678 583.592 198.991 593.464 222.972C597.285 232.249 600.428 241.807 604.09 251.816C588.98 265.999 572.698 278.224 556.327 290.342C539.94 302.471 523.446 314.446 506.458 326.888C515.966 332.959 526.326 336.456 536.141 340.991C546.328 345.699 556.636 350.137 566.934 354.559C576.947 358.856 587.024 363.012 596.955 367.176C596.791 395.894 565.874 480.557 544.549 510.321C518.646 502.61 494.46 489.997 469.045 479.085C468.495 481.403 467.805 483.233 467.66 485.106C466.77 497.138 466.682 509.275 465.021 521.196C463.518 531.972 460.441 542.546 457.827 553.144C457.084 556.157 455.505 558.971 454.402 561.642C408.046 567.232 259.267 545.18 217.511 525.736C217.581 509.836 217.657 493.611 217.722 476.713C210.278 478.207 203.517 479.28 196.901 480.943C177.262 485.894 157.288 488.117 137.091 488.337C124.087 488.484 111.308 490.08 98.5418 492.405C90.6265 493.844 82.6068 494.704 74.6155 495.684C72.6662 495.919 70.66 495.614 68.4789 495.566C59.3881 481.736 51.3006 467.517 44.1341 452.777C24.3612 412.139 11.0413 369.445 3.22364 324.98C2.86713 323.002 2.64791 320.986 2.11048 319.05C1.58014 317.145 0.714911 315.331 0.000449672 313.482C4.74295 296.37 36.987 224.237 43.76 215.85C70.1648 216.646 96.8519 217.453 124.006 218.271L123.993 218.268Z' />
                  </clipPath>
                </defs>
                <image
                  href='/me-cropped.jpg'
                  x='0'
                  y='0'
                  width='605'
                  height='563'
                  clipPath='url(#paper-clip)'
                  preserveAspectRatio='xMidYMin slice'
                />
              </svg>
            </div>
          </div>
        </section>

        {/* ── Experience ─────────────────────────────────────────── */}
        <section aria-label='Experience'>
          {/* Signature spotlight: the current, headline role expands to
              full-bleed and takes over its section as you scroll in. */}
          {experience.length > 0 && (
            <div style={{ padding: '40px 0' }}>
              <ScrollExpandCard>
                <ExperienceSection
                  {...experience[0]}
                  isLast
                  visual={getVisual(experience[0].visualKey)}
                  extra={getExtra(experience[0].extraKey, mlProject)}
                />
              </ScrollExpandCard>
            </div>
          )}

          {/* Supporting history: a calm editorial stack — no repeated card. */}
          {experience.length > 1 && (
            <div style={{ borderTop: `1px solid ${C.t10}` }}>
              {experience.slice(1).map((exp: ExperienceEntry, i: number, arr) => (
                <ExperienceSection
                  key={exp.id ?? i + 1}
                  {...exp}
                  isLast={i === arr.length - 1}
                  visual={getVisual(exp.visualKey)}
                  extra={getExtra(exp.extraKey, mlProject)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
