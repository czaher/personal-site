import Image from 'next/image'
import { Nav } from '@/components/Nav'

const C = {
  type: '#3B2F2F',
  accent: '#a05b4d',
  t70: '#7a6060',
  t50: '#7d6464',
  t30: '#cdbfbf',
  t10: '#f2eded',
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
          Supplier performance management platform serving McDonald's and Meta,
          among others.
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
      detail: 'Requirements, wireframes, high-fidelity Figma',
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
}) {
  const hasVisual = !!visual

  return (
    <div id={id} style={{ padding: '64px 48px', position: 'relative' }}>
      {!isLast && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '48px',
            right: '48px',
            height: '1px',
            backgroundColor: C.t10,
          }}
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
        <div
          style={{
            display: hasVisual ? 'grid' : 'block',
            gridTemplateColumns: hasVisual ? '1fr 320px' : undefined,
            gap: hasVisual ? '56px' : undefined,
            alignItems: 'flex-start',
          }}
        >
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
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
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
                Hey, I&apos;m Corey
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
                I like finding the system hiding inside the chaos.
              </p>
              <p
                style={{
                  fontSize: '13pt',
                  color: C.t50,
                  lineHeight: 1.65,
                  marginBottom: '44px',
                }}
              >
                I&apos;m a design systems specialist who finds real satisfaction
                in making things neat, flexible, and built to last. Currently at
                London Computer Systems in Cincinnati, OH.
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
        <section
          aria-label='Experience'
          style={{ borderTop: `1px solid ${C.t10}` }}
        >
          {/* LCS — Design System Specialist */}
          <ExperienceSection
            id='lcs'
            role='Design System Specialist'
            company='London Computer Systems'
            period='Apr. 2025 – Present'
            logo='/LCS.svg'
            tags={['Design Systems', 'Figma', 'ML / AI', 'Plugin Development']}
            summary="Owning the design system for Rent Manager Express, LCS's flagship property management platform. The role spans library governance, tooling, advocacy, and recently expanded into ML-powered audit infrastructure."
            bullets={[
              'Conducted a UI audit covering 550+ issues across 182 product features; presented findings and remediation strategy to product leadership.',
              'Architected and led a full overhaul of the RMX Pre-made Pages library, establishing a scalable component and template ecosystem.',
              'Built a "recycling center" Figma workflow so designers can submit finalized screens for systematic library reuse, reducing redundant work.',
              'Developed custom Figma plugins using Claude Code to automate design system workflows.',
              'Built an ML audit pipeline using YOLOv8 and OmniParser, reaching 92% precision on a trained component subset before the project was scoped down.',
              'Proposed a team expansion growing the DS team from 2 to 6 specialists across product-facing and engineering-facing tracks.',
            ]}
            visual={<AuditBlock />}
          />

          {/* LCS — UI Designer / UX Analyst */}
          <ExperienceSection
            role='UI Designer · UX Analyst'
            company='London Computer Systems'
            period='Sep. 2023 – Apr. 2025'
            logo='/LCS.svg'
            tags={['UI Design', 'UX Research', 'Figma', 'Rent Manager']}
            summary='Two back-to-back roles at LCS before moving into design systems work. First as a UX Analyst on Rent Manager: designing product experiences from customer research and business requirements, in close collaboration with Business Analysts. Then as UI Designer on qManage, a standalone product outside the core Rent Manager suite.'
            bullets={[
              'Designed product experiences for Rent Manager based on customer research, collaborating closely with Business Analysts and UI teams.',
              'Conducted exploratory and concept-validation research to surface user pain points and inform feature development.',
              'Designed UI components and screen flows for qManage, maintaining Figma libraries and contributing to component standardization ahead of a company-wide product restructure.',
            ]}
          />

          {/* SupplyHive */}
          <ExperienceSection
            id='supplyhive'
            role='Product Designer'
            company='SupplyHive™'
            period='May 2022 – Mar. 2023'
            logo='/SH.svg'
            tags={['Product Design', 'B2B SaaS', 'Design Systems', 'Agile']}
            summary='End-to-end product design for a supplier performance management platform. Clients included Fortune 500 companies; stakeholders ranged from C-suite to engineering. The role covered the full stack of product design work alongside active Agile participation with the dev team.'
            bullets={[
              'Owned design from C-suite requirements gathering through high-fidelity mockups and developer handoff.',
              'Built and maintained an internal design system and component library for visual and functional consistency across the platform.',
              'Partnered with the sales team to translate client feedback and prospect needs into new features and roadmap priorities.',
              'Maintained the WordPress landing site and authored email newsletter campaigns for client audiences.',
            ]}
            visual={<ClientContext />}
          />

          {/* Refract Labs */}
          <ExperienceSection
            id='refract'
            role='Product Development Engineer'
            company='Refract Labs LLC'
            period='Sep. 2020 – Apr. 2022'
            logo='/RL.svg'
            logoShape='rounded'
            tags={[
              'Frontend Development',
              'Product Design',
              'Project Management',
            ]}
            summary='Joined as the 4th employee at founding stage, building web applications for startup and enterprise clients. Grew through three distinct roles over two years: frontend developer, then project lead, then product engineer owning design and requirements end-to-end.'
            bullets={[
              'Built web applications for startup and enterprise clients as a founding-stage frontend developer.',
              'Grew into a project management role leading Scrum ceremonies, sprint planning, and retrospectives across multiple client projects.',
              'Transitioned into product engineering: owning requirements documentation, user stories, wireframes, and high-fidelity Figma mockups.',
              'Interfaced directly with clients in prospect calls and project reviews, managing scope alignment and stakeholder expectations.',
            ]}
            visual={<GrowthArc />}
          />

          {/* UC Lindner */}
          <ExperienceSection
            id='uc'
            role='Information Technology Consultant'
            company='UC Lindner College of Business'
            period='Oct. 2019 – Dec. 2020'
            logo='/UC.svg'
            isLast
            tags={['IT Support', 'Python', 'ServiceNow']}
            summary="L1/L2 IT support for students and faculty at UC's business college. Beyond tickets, wrote Python automation scripts to connect disparate systems and reduce manual work for the team."
            bullets={[
              'Provided L1/L2 support to students and faculty, managing service request queues in ServiceNow.',
              'Wrote Python automation scripts to integrate disparate technologies and improve team workflows.',
              'Managed loaner device fleets, software license inventories, and enterprise network administration.',
            ]}
          />
        </section>
      </main>
    </div>
  )
}
