import type { ReactNode } from 'react'

const C = {
  type:   '#3B2F2F',
  accent: '#C97363',
  t90:    '#4f4040',
  t70:    '#7a6060',
  t50:    '#a38a8a',
  t30:    '#cdbfbf',
  t10:    '#f2eded',
  aMuted: '#d9977f',
} as const

const F = "'Helvetica Neue', Helvetica, Arial, sans-serif"

// ── Sub-components ────────────────────────────────────────────────────────────

function SLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontSize: '7.5pt', fontWeight: 700, textTransform: 'uppercase',
      letterSpacing: '0.1em', color: C.accent, marginBottom: '8px', marginTop: '20px',
    }}>
      {children}
    </div>
  )
}

function TechGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{
        fontSize: '7.5pt', fontWeight: 700, color: C.t90,
        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px',
      }}>
        {label}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map(item => (
          <li key={item} style={{ fontSize: '8pt', color: C.t70, lineHeight: 1.6 }}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

function SectionHeader({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontSize: '13pt', fontWeight: 700, color: C.accent,
      letterSpacing: '-0.01em', marginBottom: '14px',
    }}>
      {children}
    </div>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {items.map((b, i) => (
        <li key={i} style={{
          fontSize: '8.5pt', color: C.type, paddingLeft: '10px',
          position: 'relative', lineHeight: 1.5, marginBottom: '3px',
        }}>
          <span style={{ position: 'absolute', left: 0, color: C.aMuted, fontSize: '9pt', lineHeight: 1.5 }}>•</span>
          {b}
        </li>
      ))}
    </ul>
  )
}

function Job({ title, company, meta, bullets, children, isLast }: {
  title: string; company: string; meta: string; bullets: string[];
  children?: ReactNode; isLast?: boolean;
}) {
  return (
    <div style={{
      marginBottom: isLast ? 0 : '16px',
      paddingBottom: isLast ? 0 : '16px',
      borderBottom: isLast ? 'none' : `1px solid ${C.t10}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: '12pt', fontWeight: 700, color: C.type, lineHeight: 1.2 }}>{title}</div>
        <div style={{ fontSize: '9pt', color: C.t70, whiteSpace: 'nowrap', marginLeft: '12px' }}>{company}</div>
      </div>
      <div style={{ fontSize: '7.5pt', color: C.t50, marginTop: '1px', marginBottom: '6px' }}>{meta}</div>
      <Bullets items={bullets} />
      {children}
    </div>
  )
}

function SubRole({ title, date, bullets }: { title: string; date: string; bullets: string[] }) {
  return (
    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: `1px dashed ${C.t30}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
        <div style={{ fontSize: '9pt', fontWeight: 700, color: C.t90 }}>{title}</div>
        <div style={{ fontSize: '7.5pt', color: C.t50 }}>{date}</div>
      </div>
      <Bullets items={bullets} />
    </div>
  )
}

function EduBlock({ name, credential, meta, details, isLast }: {
  name: string; credential: string; meta: string; details: string; isLast?: boolean;
}) {
  return (
    <div style={{ marginBottom: isLast ? 0 : '14px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: '12pt', fontWeight: 700, color: C.type }}>{name}</div>
        <div style={{ fontSize: '9pt', color: C.t70, whiteSpace: 'nowrap', marginLeft: '12px' }}>{credential}</div>
      </div>
      <div style={{ fontSize: '7.5pt', color: C.t50, marginTop: '1px' }}>{meta}</div>
      <div style={{ fontSize: '8.5pt', color: C.t70, marginTop: '3px' }}>{details}</div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: F, color: C.type }}>

      {/* ── Navigation ──────────────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${C.t10}`,
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto', padding: '16px 24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '15pt', fontWeight: 700, color: C.type, letterSpacing: '-0.01em' }}>
            Corey Zaher
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Resume', 'Projects', 'About', 'Contact'].map(s => (
              <a key={s} href={`#${s.toLowerCase()}`} className="nav-link">{s}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Resume ──────────────────────────────────────────── */}
      <section id="resume" style={{ padding: '48px 24px 64px' }}>
        <div style={{
          maxWidth: '820px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '185px 1fr',
        }}>

          {/* Sidebar */}
          <aside style={{ padding: '36px 22px 36px 0' }}>
            <div style={{ marginBottom: '22px' }}>
              <div style={{ fontSize: '22pt', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '8px' }}>
                Corey<br />Zaher
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <a href="https://czaher.dev" className="resume-link">czaher.dev</a>
                <a href="https://linkedin.com/in/czaher" className="resume-link">linkedin.com/in/czaher</a>
              </div>
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '8pt', color: C.t70 }}>corey.zaher@gmail.com</span>
                <span style={{ fontSize: '8pt', color: C.t70 }}>Cincinnati, OH</span>
              </div>
            </div>

            <SLabel>Skills</SLabel>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                'Leadership', 'Design Systems', 'Product Design', 'UX / UI Design',
                'Figma & Component Libraries', 'Design Tokens', 'Developer Relations',
                'Agile / Scrum', 'Project Management', 'Web Development',
              ].map(s => (
                <li key={s} style={{
                  fontSize: '8.5pt', color: C.type, padding: '3px 0',
                  borderBottom: `1px solid ${C.t10}`, lineHeight: 1.4,
                }}>
                  {s}
                </li>
              ))}
            </ul>

            <SLabel>Awards</SLabel>
            <div style={{ fontSize: '8pt', color: C.t70, lineHeight: 1.5 }}>
              <strong style={{ display: 'block', fontWeight: 700, color: C.type, marginBottom: '2px' }}>
                Ameritas Award for Senior Design Project in Workflow Optimization &amp; Automation
              </strong>
              University of Cincinnati
              <div style={{ fontSize: '7.5pt', color: C.t50, marginTop: '2px' }}>April 2022</div>
            </div>

            <SLabel>Technologies</SLabel>
            <TechGroup label="Design Tools"      items={['Adobe Creative Cloud', 'Figma', 'Balsamiq']} />
            <TechGroup label="Prototyping"        items={['Axure', 'Zeplin']} />
            <TechGroup label="Project Management" items={['JIRA', 'Linear', 'ServiceNow']} />
            <TechGroup label="Methodologies"      items={['Agile', 'Scrum', 'User-Centered Design']} />
            <TechGroup label="Development"        items={['JavaScript', 'HTML / CSS', 'Node.js', 'React', 'GraphQL', 'Python']} />
          </aside>

          {/* Main content */}
          <main style={{ padding: '36px 0 36px 32px', fontSize: '9pt', lineHeight: 1.45 }}>
            <section>
              <SectionHeader>Experience</SectionHeader>

              <Job
                title="Design System Specialist"
                company="London Computer Systems"
                meta="Landen, OH  |  Apr. 2025 – Present"
                bullets={[
                  'Own and maintain the design system and Figma component library for Rent Manager Express (RMX), a large-scale property management SaaS product.',
                  'Conducted a comprehensive UI audit spanning 550+ issues across 182 product features, presenting findings and remediation strategy to product leadership.',
                  'Architected and led a full overhaul of the RMX Pre-made Pages library, establishing a scalable component and template ecosystem.',
                  'Established design token standards and governance workflows bridging design decisions to engineering implementation.',
                  'Created a "recycling center" Figma workflow enabling designers to submit finalized screens for systematic library reuse, reducing redundant design work.',
                  'Serve as primary design-to-developer liaison, leading training sessions and advocating for design system adoption across engineering teams.',
                  'Proposed and scoped a team expansion plan growing the design org from 2 to 6 specialists with distinct product-facing and engineering-facing tracks.',
                ]}
              >
                <SubRole
                  title="UI Designer — QManage"
                  date="Aug. 2024 – Apr. 2025"
                  bullets={[
                    'Designed UI components and screen flows for QManage, a standalone LCS product outside of the core Rent Manager suite.',
                    'Maintained Figma libraries and contributed to component standardization ahead of the company-wide product restructure.',
                  ]}
                />
                <SubRole
                  title="UX Analyst"
                  date="Sep. 2023 – Aug. 2024"
                  bullets={[
                    'Designed product experiences for Rent Manager based on customer research and business requirements, collaborating with Business Analysts and Development teams.',
                    'Conducted exploratory and concept-validation research to inform feature development and surface user pain points.',
                  ]}
                />
              </Job>

              <Job
                title="Product Designer"
                company="SupplyHive™"
                meta="Chicago, IL / Remote  |  May 2022 – Mar. 2023"
                bullets={[
                  "Led product design for a supplier performance management platform serving Fortune 500 clients including McDonald's and Meta.",
                  'Owned end-to-end design from requirements gathering with C-suite stakeholders to high-fidelity mockups and developer handoff.',
                  'Built and maintained an internal design system and component library, ensuring visual and functional consistency across the platform.',
                  'Partnered with the sales team to translate client feedback and prospect needs into new feature concepts and roadmap priorities.',
                  'Contributed to marketing by maintaining the WordPress landing site and authoring email newsletter campaigns for client audiences.',
                  'Participated in all Agile ceremonies with the development team, bridging design intent and engineering execution.',
                ]}
              />

              <Job
                title="Product Development Engineer"
                company="Refract Labs LLC"
                meta="Cincinnati, OH / Hybrid  |  Sep. 2020 – Apr. 2022"
                bullets={[
                  'Joined as a founding-stage frontend developer (4th employee), building web applications for startup and enterprise clients.',
                  'Grew into a project management role, leading Scrum ceremonies, sprint planning, and retrospectives across multiple client projects.',
                  'Transitioned into product engineering, owning requirements documentation, user stories, wireframes, and high-fidelity Figma mockups.',
                  'Interfaced directly with clients in prospect calls and project reviews, managing scope alignment and stakeholder expectations.',
                  'Assisted with developer interviews and hiring, contributing to team growth from a small startup to a multi-product agency.',
                ]}
              />

              <Job
                title="Information Technology Consultant"
                company="UC Lindner College of Business"
                meta="Cincinnati, OH  |  Oct. 2019 – Dec. 2020"
                bullets={[
                  'Provided L1/L2 IT support to students and faculty, managing service request queues in ServiceNow.',
                  'Wrote and maintained Python automation scripts to integrate disparate technologies and improve team workflows.',
                  'Managed loaner device fleets, software license inventories, and enterprise network administration tasks.',
                ]}
              />

              <Job
                title="Behavior Analyst Apprentice"
                company="iQ4"
                meta="Remote  |  Mar. 2020 – Apr. 2020"
                isLast
                bullets={[
                  'Applied NICE (National Initiative for Cybersecurity Education) frameworks to a team-based case study with 8 cybersecurity apprentices.',
                  'Earned a U.S. Department of Labor–recognized cybersecurity credential through the Cybersecurity Workforce Alliance.',
                ]}
              />
            </section>

            <section style={{ marginTop: '24px' }}>
              <SectionHeader>Education</SectionHeader>
              <EduBlock
                name="University of Cincinnati"
                credential="B.S. Information Technology"
                meta="Cincinnati, OH  |  May 2022"
                details="Software Development Concentration  ·  Dean's List  ·  GPA 3.46"
              />
              <EduBlock
                name="Bio-Med Science Academy"
                credential="Graduate"
                meta="Rootstown, OH  |  May 2017"
                details="Student Council President  ·  Honors Graduate  ·  400+ Internship Hours  ·  150+ Volunteer Hours"
                isLast
              />
            </section>
          </main>
        </div>
      </section>

      {/* ── Projects ────────────────────────────────────────── */}
      <section id="projects" style={{ borderTop: `1px solid ${C.t10}`, padding: '80px 24px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <SectionHeader>Projects</SectionHeader>
          <p style={{ fontSize: '9pt', color: C.t50 }}>Coming soon.</p>
        </div>
      </section>

      {/* ── About ───────────────────────────────────────────── */}
      <section id="about" style={{ borderTop: `1px solid ${C.t10}`, padding: '80px 24px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <SectionHeader>About</SectionHeader>
          <p style={{ fontSize: '9pt', color: C.t50 }}>Coming soon.</p>
        </div>
      </section>

      {/* ── Contact ─────────────────────────────────────────── */}
      <section id="contact" style={{ borderTop: `1px solid ${C.t10}`, padding: '80px 24px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <SectionHeader>Contact</SectionHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <a href="mailto:corey.zaher@gmail.com" className="resume-link">corey.zaher@gmail.com</a>
            <a href="https://linkedin.com/in/czaher" className="resume-link">linkedin.com/in/czaher</a>
          </div>
        </div>
      </section>

    </div>
  )
}
