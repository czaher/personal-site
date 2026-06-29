// Server-side only: reads/writes content.json from the Railway volume.
// Do not import this file from client components.

import fs from 'fs'
import path from 'path'
import type { ContentData, HeroData } from './defaultContent'
import {
  DEFAULT_TRAINING_NODES,
  DEFAULT_TRAINING_EDGES,
  DEFAULT_RL_NODES,
  DEFAULT_RL_EDGES,
  DEFAULT_HERO,
  DEFAULT_EXPERIENCE,
  DEFAULT_ML_PROJECT,
} from './defaultContent'

const DATA_DIR = process.env.DATA_DIR || '/data'
const CONTENT_FILE = path.join(DATA_DIR, 'content.json')

const DEFAULTS: ContentData = {
  pipeline: {
    training: { nodes: DEFAULT_TRAINING_NODES, edges: DEFAULT_TRAINING_EDGES },
    reinforcement: { nodes: DEFAULT_RL_NODES, edges: DEFAULT_RL_EDGES },
  },
  hero: DEFAULT_HERO,
  experience: DEFAULT_EXPERIENCE,
  mlProject: DEFAULT_ML_PROJECT,
}

// Normalize the hero to the current two-section shape ({ greeting, intro }),
// migrating any older saved content.json that still uses { heading, tagline, bio }.
function normalizeHero(hero: unknown): HeroData {
  if (!hero || typeof hero !== 'object') return DEFAULT_HERO
  const h = hero as Record<string, unknown>
  if (typeof h.greeting === 'string' || typeof h.intro === 'string') {
    return {
      greeting: typeof h.greeting === 'string' ? h.greeting : DEFAULT_HERO.greeting,
      intro: typeof h.intro === 'string' ? h.intro : DEFAULT_HERO.intro,
    }
  }
  // Legacy shape: fold tagline + bio into a single intro.
  const intro = [h.tagline, h.bio].filter((v) => typeof v === 'string' && v).join(' ')
  return {
    greeting: typeof h.heading === 'string' ? h.heading : DEFAULT_HERO.greeting,
    intro: intro || DEFAULT_HERO.intro,
  }
}

export function loadContent(): ContentData {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8')
      const parsed = JSON.parse(raw) as Partial<ContentData>
      return {
        pipeline: parsed.pipeline ?? DEFAULTS.pipeline,
        hero: normalizeHero(parsed.hero),
        experience: parsed.experience ?? DEFAULTS.experience,
        mlProject: parsed.mlProject ?? DEFAULTS.mlProject,
      }
    }
  } catch {
    // Fall through to defaults
  }
  return DEFAULTS
}

export function saveContent(data: ContentData): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf-8')
}
