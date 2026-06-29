# Product

## Register

brand

## Users

Primarily design leaders and hiring managers (DS managers, design directors, heads of product) evaluating Corey for a senior design-systems role — but the audience is broad: recruiters and generalists skim fast for fit, and design-literate peers will notice the craft. The site has to reward both the 20-second skim and the deep read. Visitors arrive from a resume link, LinkedIn, or a referral, usually with a hiring decision in mind.

## Product Purpose

Corey Zaher's personal portfolio. The goal is concrete: land a senior design-systems role. Success is a hiring manager leaving convinced Corey operates at a senior level — that he thinks in systems, owns ambiguous problems end-to-end, and ships with craft. The site is itself the proof: a design-systems specialist's portfolio should demonstrate systems thinking in its own construction, not just describe it.

## Brand Personality

Warm and editorial. Reads like a considered magazine profile, not a SaaS landing page or a chronological CV. Voice is confident but unflashy — expertise that doesn't need to shout. Three words: **crafted, systematic, human.** The warmth comes from the earthy palette, the script signature, and considered typography; the rigor comes from consistent rhythm, restraint, and structure. Emotional goal: the visitor trusts Corey's taste and judgment before reading a single bullet.

## Anti-references

All four are explicit anti-references:

- **Generic SaaS template** — hero-metric blocks, identical feature-card grids, gradient accents, tracked-uppercase eyebrows above every section. The AI-slop look.
- **Dribbble over-design** — decoration for its own sake, glassmorphism, motion everywhere, style over substance.
- **Resume / CV dump** — a dry chronological wall of bullet points with no point of view or visual craft.
- **Trendy dark devtool** — terminal-native, neon-on-black, monospace-everything "engineer" aesthetic.

The tension to hold: avoid the resume-dump (too dry) AND the dribbble-overload (too loud) at once. The answer is restraint punctuated by a few earned signature moments.

## Design Principles

- **Hierarchy is the argument.** The page's structure itself makes the seniority case — the current, most senior role is the headline and gets the spotlight; supporting history is refined but quieter. Don't flatten everything into equal-weight cards.
- **Systems thinking, made visible.** The site should embody design-systems rigor — consistent tokens, rhythm, and restraint — because that rigor is the competency being sold. Practice what you preach.
- **Earn every flourish.** Motion and visual moves must do work: reveal content, establish hierarchy, guide the eye. No decoration for its own sake, and never the same effect repeated by reflex — repetition reads as a gimmick, not a system.
- **Editorial, not template.** Read like a magazine profile: considered typography, generous rhythm, a clear point of view. Never a SaaS scaffold or a CV.
- **Skim-then-deep.** A broad audience lands here. Recruiters get instant signal from headers and hierarchy; design leaders can drill into the ML pipeline and audit detail. Both paths must feel complete.

## Accessibility & Inclusion

Maintain WCAG AA: body text ≥4.5:1 and large/bold text ≥3:1 against the warm light and dark backgrounds — the muted warm-gray ramp (`--c-t50`, `--c-t30`) needs checking wherever it carries real text. Both light and dark themes ship and must pass independently. All scroll-driven and reveal motion requires a `prefers-reduced-motion: reduce` alternative (crossfade or instant, never gated visibility). Preserve keyboard navigation, the skip link, visible focus rings, and semantic landmarks already in place.
