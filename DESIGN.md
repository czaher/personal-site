---
name: Corey Zaher
description: Warm, editorial portfolio for a design-systems specialist
colors:
  ink: "#3B2F2F"
  terracotta: "#a05b4d"
  page-white: "#ffffff"
  warm-70: "#7a6060"
  warm-50: "#7d6464"
  warm-30: "#cdbfbf"
  wash-10: "#f2eded"
  ink-dark-bg: "#1e1616"
  ink-dark-fg: "#f0e8e8"
  terracotta-dark: "#c97363"
typography:
  display:
    fontFamily: "'Momo Signature', cursive"
    fontSize: "52pt"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "var(--font-manrope), 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "26pt"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-manrope), 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "14pt"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "var(--font-manrope), 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "11pt"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "var(--font-manrope), 'Helvetica Neue', Helvetica, Arial, sans-serif"
    fontSize: "9pt"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.06em"
  mono:
    fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "9pt"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
rounded:
  sm: "3px"
  md: "8px"
  xl: "24px"
  full: "50%"
spacing:
  sm: "8px"
  md: "24px"
  lg: "48px"
  xl: "64px"
components:
  tag:
    backgroundColor: "{colors.wash-10}"
    textColor: "{colors.warm-50}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  sidebar-item:
    textColor: "{colors.warm-70}"
    typography: "{typography.label}"
    padding: "5px 0"
  spotlight-card:
    backgroundColor: "{colors.wash-10}"
    rounded: "{rounded.xl}"
    padding: "64px 48px"
  spotlight-card-locked:
    backgroundColor: "{colors.wash-10}"
    rounded: "0px"
    padding: "64px 48px"
---

# Design System: Corey Zaher

## 1. Overview

**Creative North Star: "The Warm Specimen Sheet"**

This is a design-systems specialist's portfolio that behaves like a type-foundry specimen sheet crossed with a field notebook: everything is catalogued, gridded, and consistent, but the materials are warm — earthen ink, terracotta, a single handwritten greeting. The rigor is the pitch (the site practices the systems thinking it's selling), and the warmth is what keeps that rigor from reading as clinical. It should feel like a considered magazine profile of a maker, not a SaaS landing page and not a CV.

The defining move is restraint punctuated by a few earned signatures. The body is a calm, single-column editorial read at a generous 960px measure; the drama is concentrated into one moment — the current role expanding to a full-bleed spotlight — rather than scattered across every section. Color is committed-but-rare: a warm brown ink on true white, with terracotta reserved for the things that matter (company names, the live-role marker, active nav).

This system explicitly rejects: the **generic SaaS template** (hero-metric blocks, identical feature-card grids, gradient accents, tracked-uppercase eyebrows on every section), **Dribbble over-design** (decoration for its own sake, glassmorphism, motion everywhere), the **resume / CV dump** (a dry chronological wall of bullets with no point of view), and the **trendy dark devtool** look (neon-on-black, monospace-everything).

**Key Characteristics:**
- Warm ink on true white — never neutral gray, never cream-on-cream.
- One handwritten voice, used exactly once.
- Single-column editorial measure; hierarchy carries the argument.
- One concentrated signature moment, not repeated flourishes.
- Light and dark themes, both first-class.

## 2. Colors

A warm-neutral system: every "gray" is a brown-tinted wash of the ink, and a single terracotta carries all the emphasis.

### Primary
- **Earthen Ink** (#3B2F2F): The primary type color and the anchor of the whole palette. All headings, role titles, and high-emphasis text. In dark mode the relationship inverts to a warm off-white (#f0e8e8).
- **Terracotta** (#a05b4d): The one accent. Reserved for company names, the "current role" marker bar on the spotlight panel, active/hover nav states, and list bullets. Dark mode lifts it to a clay tone (#c97363) for contrast.

### Neutral
- **Page White** (#ffffff): The true-white background. Deliberately not cream — warmth lives in the ink and accent, not the paper. Dark mode uses a deep warm brown-black (#1e1616).
- **Warm 70 / 50** (#7a6060 / #7d6464): Body and secondary text — warm grays, never neutral slate. Carry real reading text, so they hold contrast against white.
- **Warm 30** (#cdbfbf): Hairline dividers, timeline rails, low-emphasis labels.
- **Wash 10** (#f2eded): The signature panel surface and chip/tag backgrounds — the lightest warm tint, one step off the page. Dark mode: #2a1f1f.

### Named Rules
**The Warm Ink Rule.** There are no neutral grays in this system. Every tint, divider, and muted text value is a brown-warmed step derived from the ink. A cool `#888` gray anywhere is a bug.

**The Single Voice Rule.** Terracotta appears on a small fraction of any screen — company names, the live-role bar, active states, bullets. Its rarity is what makes it read as meaning rather than decoration. Never use it for body text, large fills, or gradients.

## 3. Typography

**Display Font:** Momo Signature (cursive script), with a `cursive` fallback
**Body Font:** Manrope (`--font-manrope`), with Helvetica Neue / Arial fallback
**Label/Mono Font:** SF Mono / ui-monospace, for technical credit and data lines only

**Character:** A single warm handwritten greeting against an otherwise disciplined geometric-humanist sans. The contrast is the personality — the script signs the page like a maker's hand; Manrope does all the systematic work with weight and size, never a second display face.

### Hierarchy
- **Display** (Momo Signature, 52pt, line-height 1.1): The hero greeting only — "Hey, I'm Corey." Appears exactly once on the site.
- **Headline** (Manrope 700, 26pt, line-height 1.1, -0.02em): Role titles in each experience section.
- **Title** (Manrope 700/500, 14–15pt): Company names (in terracotta), project titles, sidebar wordmark.
- **Body** (Manrope 400, 11pt, line-height 1.65): Summaries and bullet copy. Hero intro steps up to 13–17pt. Keep measure at the 960px column; cap prose near 65–75ch.
- **Label** (Manrope 500, 9–10pt, letter-spacing 0.06em, uppercase): Periods, section eyebrows like "Timeline" / "Pipeline", sidebar group headers.
- **Mono** (SF Mono, 9pt, line-height 1.7): Technical credit lines only (e.g. the tool stack under the audit block).

### Named Rules
**The One Script Rule.** Momo Signature is used exactly once — the hero greeting. The moment it appears twice it becomes decoration and the maker's-hand effect dies. Everything else is Manrope.

## 4. Elevation

The system is flat by default and conveys depth through warm tonal layering, not shadow — the Wash 10 surface sitting one step off the page is the entire resting-state elevation vocabulary. There is exactly one shadow in the system, and it is motion-bound.

### Shadow Vocabulary
- **Spotlight Lift** (`box-shadow: 0 28px 72px -24px color-mix(in srgb, var(--c-type) 20%, transparent)`, scaled by scroll progress): Applied only to the signature spotlight panel, and only while it floats as an inset card. As the panel expands to full-bleed the shadow scales to zero, so it reads as the section's own grounded background once locked.

### Named Rules
**The Grounded Spotlight Rule.** Shadow is never ambient or decorative. It exists on one element (the spotlight panel) and only as a function of scroll — full while floating, gone once the panel becomes the section. No other surface casts a shadow.

## 5. Components

### Chips / Tags
- **Style:** Warm-wash background (#f2eded), Warm 50 text, no border. Small, quiet metadata.
- **Shape:** 3px radius (`rounded.sm`).
- **Padding:** 2px 8px. Used for skill/stack tags under role headers.

### Cards / Containers
- **Corner Style:** The signature spotlight rests at 24px radius; the ML phase cards use 8px (`rounded.md`).
- **Background:** Wash 10 (#f2eded). The spotlight panel IS the only card affordance on the page; the supporting roles are *not* carded — they are open editorial sections divided by hairlines.
- **Shadow Strategy:** See Elevation → Spotlight Lift. Resting cards (ML phases) are flat.
- **Border:** None on cards; Warm 30 hairlines (1px) separate open sections.
- **Internal Padding:** 64px 48px on the spotlight section; 24px tightening on mobile.

### Navigation
- **Style:** Fixed 220px left sidebar (desktop), collapsing to a sticky top bar + blurred full-screen dialog on mobile (≤720px). Manrope label-scale type, icon + label + year rows.
- **States:** Default Warm 70; hover/active shifts to terracotta. Visible terracotta focus ring (2px, offset 2px) on every interactive element. Skip link is preserved.

### Signature Component — The Spotlight Panel
The one custom pattern worth documenting. The current/headline role begins as an inset, floating Wash-10 card (24px radius, 56px side margins, lifted shadow) and, driven by scroll progress (ease-out-quart), expands to full-bleed — radius → 0, margins → 0, shadow → flat — so it takes over its section as the reader arrives. A 3px terracotta "current role" rule fades in across the top as it locks. Used **once**, deliberately. Fully disabled under `prefers-reduced-motion` and on mobile (it rests as a static panel). See Do's and Don'ts: repeating this per section is the failure mode.

## 6. Do's and Don'ts

### Do:
- **Do** keep warmth in the ink and accent — warm browns and terracotta — on a **true-white** page. All grays are brown-warmed washes of the ink.
- **Do** reserve terracotta for meaning (company names, the live-role bar, active states, bullets); keep it under ~10% of any screen — the Single Voice Rule.
- **Do** use Momo Signature exactly once (the hero greeting) and let Manrope carry everything else through weight and size.
- **Do** concentrate motion into one earned signature moment (the spotlight expand) and let hierarchy — not repetition — make the seniority argument.
- **Do** ship every effect with a `prefers-reduced-motion` fallback and verify both light and dark themes at WCAG AA.

### Don't:
- **Don't** drift toward the **generic SaaS template**: no hero-metric blocks, no identical feature-card grids, no gradient accents, no tracked-uppercase eyebrow above every section.
- **Don't** repeat the spotlight expand (or any single entrance) on every section — the uniform-reflex / identical-card-grid tell is exactly what this system rejects. One signature, then calm.
- **Don't** slide into **Dribbble over-design**: no glassmorphism as default, no decorative motion everywhere, no style-over-substance flourishes.
- **Don't** let the supporting history collapse into a **resume / CV dump** — a dry chronological wall of bullets with no point of view or craft.
- **Don't** reach for the **trendy dark devtool** look (neon-on-black, monospace-everything); mono is for technical credit lines only, never as costume.
- **Don't** introduce cool/neutral grays, a second display typeface, or ambient decorative shadows.
