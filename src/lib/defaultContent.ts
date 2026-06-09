// All default page content. Shared by the server-side content loader and the client canvas.

export interface NodeDef {
  id: string
  type: string
  position: { x: number; y: number }
  data: Record<string, unknown>
  style?: Record<string, unknown>
  selectable?: boolean
  draggable?: boolean
  zIndex?: number
}

export interface EdgeDef {
  id: string
  source: string
  target: string
  type?: string
  style?: Record<string, unknown>
  markerEnd?: Record<string, unknown>
  label?: string
  labelStyle?: Record<string, unknown>
  sourceHandle?: string
  targetHandle?: string
}

export interface ExperienceEntry {
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
  visualKey?: string
  extraKey?: string
}

export interface HeroData {
  heading: string
  tagline: string
  bio: string
}

export interface MLPhase {
  label: string
  sub: string
  items: string[]
  isFuture?: boolean
}

export interface MLProjectData {
  title: string
  description: string
  tags: string[]
  phases: MLPhase[]
}

export interface ContentData {
  pipeline: {
    training: { nodes: NodeDef[]; edges: EdgeDef[] }
    reinforcement: { nodes: NodeDef[]; edges: EdgeDef[] }
  }
  hero: HeroData
  experience: ExperienceEntry[]
  mlProject: MLProjectData
}

// ─── Shared edge style constants ───────────────────────────────────────────────

const eS = { stroke: 'var(--c-t30)', strokeWidth: 1.5 }
const arr = { type: 'arrowclosed', color: 'var(--c-t30)', width: 12, height: 12 }
const eLbl = { fontSize: 9, fill: 'var(--c-t50)' }
const dashedYellow = { stroke: '#F59E0B', strokeWidth: 1.5, strokeDasharray: '5 4' }
const arrYellow = { type: 'arrowclosed', color: '#F59E0B', width: 12, height: 12 }

// ─── Training pipeline ─────────────────────────────────────────────────────────

export const DEFAULT_TRAINING_NODES: NodeDef[] = [
  { id: 'lbl-t', type: 'sectionLabel', position: { x: 0, y: 18 }, data: { text: 'Initial data collection and tagging workflow' }, selectable: false, draggable: false },
  { id: 'screenshotter', type: 'pipe', position: { x: 0, y: 50 }, data: { label: 'Screenshotter.py', kind: 'script', detail: 'Ingests a collection of RMX page links, crawls each page, takes a screenshot, and adds it to a dataset.' } },
  { id: 'rmx-1', type: 'pipe', position: { x: 150, y: 50 }, data: { label: 'RMX Screens', kind: 'image', detail: 'Product screenshots gathered from Rent Manager Express. Raw input data for annotation and model training — 911 component records in the 2023 audit.' } },
  { id: 'ls-1', type: 'pipe', position: { x: 300, y: 50 }, data: { label: 'Label Studio', kind: 'tool', detail: 'Annotation platform for configuring the labeling interface, importing screenshots, and manually annotating UI component bounding boxes.' } },
  { id: 'init-tag', type: 'process', position: { x: 450, y: 25 }, data: { label: 'Initial Tagging / Data Annotation', detail: 'Human annotators draw bounding boxes around UI components, labelling each across 5 feature types (button, input, tile, etc.).' } },
  { id: 'yolov8s', type: 'pipe', position: { x: 190, y: 195 }, data: { label: 'yolov8s.pt', kind: 'modelInput', detail: 'The YOLOv8s pre-trained base model weights from Ultralytics. Starting point for fine-tuning on RMX component data.' } },
  { id: 'train-data-1', type: 'pipe', position: { x: 300, y: 195 }, data: { label: 'Training Data', kind: 'taggedImage', detail: 'Annotated screenshot dataset exported from Label Studio, formatted for YOLOv8 training.' } },
  { id: 'trainer', type: 'pipe', position: { x: 0, y: 325 }, data: { label: 'yolo_zip_trainer.py', kind: 'script', detail: 'Reads the Label Studio export zip and runs YOLOv8 model training for a configurable number of epochs.' } },
  { id: 'model-top', type: 'pipe', position: { x: 445, y: 325 }, data: { label: 'best_model.pt', kind: 'model', detail: 'Trained YOLOv8 model weights. Achieved 92% precision on a trained component subset. Used for detection and seeds the reinforcement loop.' } },
  { id: 'rmx-2', type: 'pipe', position: { x: 0, y: 505 }, data: { label: 'RMX Screens', kind: 'image', detail: 'New or updated product screenshots imported into Label Studio for model-assisted annotation.' } },
  { id: 'ls-2', type: 'pipe', position: { x: 155, y: 505 }, data: { label: 'Label Studio', kind: 'tool', detail: 'Uses the locally-hosted model to pre-annotate new screenshots. Human reviewers correct low-confidence predictions before export.' } },
  { id: 'model-assist', type: 'process', position: { x: 305, y: 480 }, data: { label: 'Model-Assisted Tagging', detail: 'The model pre-populates bounding boxes; humans correct and confirm before the data is exported for retraining.' } },
  { id: 'train-data-2', type: 'pipe', position: { x: 470, y: 505 }, data: { label: 'Training Data', kind: 'taggedImage', detail: 'Expanded dataset — original annotations plus model-assisted, human-corrected labels from each reinforcement cycle.' } },
  { id: 'local-backend', type: 'pipe', position: { x: 0, y: 670 }, data: { label: 'local_backend.py', kind: 'script', detail: "Hosts the trained model locally. Its IP is configured in Label Studio's model settings to enable pre-annotation." } },
  { id: 'model-bottom', type: 'pipe', position: { x: 185, y: 670 }, data: { label: 'best_model.pt', kind: 'model', detail: 'Model running locally via local_backend.py, providing pre-annotations to Label Studio for the reinforcement cycle.' } },
]

export const DEFAULT_TRAINING_EDGES: EdgeDef[] = [
  { id: 'te1', source: 'screenshotter', target: 'rmx-1', type: 'smoothstep', style: eS, markerEnd: arr, label: 'Creates', labelStyle: eLbl },
  { id: 'te2', source: 'rmx-1', target: 'ls-1', type: 'smoothstep', style: eS, markerEnd: arr, label: 'Import to', labelStyle: eLbl },
  { id: 'te3', source: 'ls-1', target: 'init-tag', type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te4', source: 'init-tag', target: 'yolov8s', type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te5', source: 'init-tag', target: 'train-data-1', type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te6', source: 'yolov8s', target: 'trainer', targetHandle: 'top', type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te7', source: 'train-data-1', target: 'trainer', targetHandle: 'top', type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te8', source: 'trainer', sourceHandle: 'right', target: 'model-top', type: 'smoothstep', style: eS, markerEnd: arr, label: 'Model Training', labelStyle: eLbl },
  { id: 'te9', source: 'model-top', sourceHandle: 'right', target: 'model-bottom', targetHandle: 'right', type: 'dropRight', style: eS, markerEnd: arr },
  { id: 'te10', source: 'rmx-2', target: 'ls-2', type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te11', source: 'ls-2', target: 'model-assist', type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te12', source: 'model-assist', target: 'train-data-2', type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te13', source: 'train-data-2', sourceHandle: 'bottom', target: 'trainer', targetHandle: 'top', type: 'leftSide', style: eS, markerEnd: arr },
  { id: 'te14', source: 'local-backend', target: 'model-bottom', type: 'smoothstep', style: eS, markerEnd: arr, label: 'Running Locally', labelStyle: eLbl },
  { id: 'te15', source: 'model-bottom', target: 'ls-2', type: 'smoothstep', style: eS, markerEnd: arr, label: 'Pre-annotation', labelStyle: eLbl },
]

// ─── Reinforcement pipeline ────────────────────────────────────────────────────

export const DEFAULT_RL_NODES: NodeDef[] = [
  {
    id: 'rl-box', type: 'groupBox',
    position: { x: 165, y: 50 },
    style: { width: 420, height: 310 },
    data: { label: 'Active in Label Studio' },
    selectable: false, draggable: false,
    zIndex: -1,
  },
  { id: 'detector', type: 'pipe', position: { x: -195, y: 115 }, data: { label: 'ui_detection_standalone.py', kind: 'script', detail: 'Standalone script that runs the model on a screenshot or folder of screenshots. Allows selecting a confidence threshold and annotation preferences before running detection.' } },
  { id: 'rmx', type: 'pipe', position: { x: 20, y: 115 }, data: { label: 'RMX Screens', kind: 'image', detail: 'New RMX product screenshots to be imported into Label Studio for model-assisted tagging.' } },
  { id: 'ls', type: 'pipe', position: { x: 195, y: 115 }, data: { label: 'Label Studio', kind: 'tool', detail: 'Receives new screenshots and uses the locally-hosted model to pre-annotate them. Human reviewers correct predictions before export.' } },
  { id: 'model-assist', type: 'process', position: { x: 362, y: 90 }, data: { label: 'Model-Assisted Tagging', detail: 'The model pre-populates bounding boxes. Human annotators correct and confirm before exporting the refined training data.' } },
  { id: 'model-inner', type: 'pipe', position: { x: 270, y: 255 }, data: { label: 'best_model.pt', kind: 'model', detail: 'The currently trained model weights loaded inside Label Studio via local_backend.py to enable pre-annotation of new screenshots.' } },
  { id: 'train-data', type: 'pipe', position: { x: 650, y: 115 }, data: { label: 'Training Data', kind: 'taggedImage', detail: 'Expanded training dataset produced by each reinforcement cycle — model-assisted annotations corrected by human reviewers.' } },
  { id: 'local-backend', type: 'pipe', position: { x: 195, y: 470 }, data: { label: 'local_backend.py', kind: 'script', detail: "Hosts the model locally as a server. Its IP is configured in Label Studio's model settings to enable pre-annotation." } },
  { id: 'model-bottom', type: 'pipe', position: { x: 385, y: 470 }, data: { label: 'best_model.pt', kind: 'model', detail: 'The latest trained model weights, produced by yolo_zip_trainer.py. Passed to local_backend.py to start a new pre-annotation cycle.' } },
  { id: 'trainer', type: 'pipe', position: { x: 580, y: 470 }, data: { label: 'yolo_zip_trainer.py', kind: 'script', detail: 'Re-runs YOLOv8 training with the expanded, corrected dataset. Each cycle improves model precision and recall.' } },
]

export const DEFAULT_RL_EDGES: EdgeDef[] = [
  { id: 're1', source: 'rmx', target: 'ls', type: 'smoothstep', style: eS, markerEnd: arr, label: 'Import', labelStyle: eLbl },
  { id: 're2', source: 'ls', target: 'model-assist', type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 're3', source: 'model-assist', target: 'train-data', type: 'smoothstep', style: eS, markerEnd: arr, label: 'Export', labelStyle: eLbl },
  { id: 're4', source: 'model-inner', target: 'ls', type: 'smoothstep', style: eS, markerEnd: arr, label: 'Pre-annotation', labelStyle: eLbl },
  { id: 're5', source: 'local-backend', target: 'model-inner', type: 'smoothstep', style: dashedYellow, markerEnd: arrYellow, label: 'Running Locally', labelStyle: { fontSize: 9, fill: '#F59E0B' } },
  { id: 're6', source: 'train-data', target: 'trainer', type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 're7', source: 'trainer', target: 'model-bottom', type: 'smoothstep', style: eS, markerEnd: arr, label: 'Model Training', labelStyle: eLbl },
  { id: 're8', source: 'model-bottom', target: 'local-backend', type: 'smoothstep', style: eS, markerEnd: arr },
]

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const DEFAULT_HERO: HeroData = {
  heading: "Hey, I'm Corey",
  tagline: 'I like finding the system hiding inside the chaos.',
  bio: "I'm a design systems specialist who finds real satisfaction in making things neat, flexible, and built to last. Currently at London Computer Systems in Cincinnati, OH.",
}

// ─── Experience ───────────────────────────────────────────────────────────────

export const DEFAULT_EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'lcs',
    role: 'Design System Specialist',
    company: 'London Computer Systems',
    period: 'Apr. 2025 – Present',
    logo: '/LCS.svg',
    tags: ['Design Systems', 'Figma', 'ML / AI', 'Plugin Development'],
    summary: "Owning the design system for Rent Manager Express, LCS's flagship property management platform. The role spans library governance, tooling, advocacy, and recently expanded into ML-powered audit infrastructure.",
    bullets: [
      'Conducted a UI audit covering 550+ issues across 182 product features; presented findings and remediation strategy to product leadership.',
      'Architected and led a full overhaul of the RMX Pre-made Pages library, establishing a scalable component and template ecosystem.',
      'Built a "recycling center" Figma workflow so designers can submit finalized screens for systematic library reuse, reducing redundant work.',
      'Developed custom Figma plugins using Claude Code to automate design system workflows.',
      'Built an ML audit pipeline using YOLOv8 and OmniParser, reaching 92% precision on a trained component subset before the project was scoped down.',
      'Proposed a team expansion growing the DS team from 2 to 6 specialists across product-facing and engineering-facing tracks.',
    ],
    visualKey: 'auditBlock',
    extraKey: 'mlProject',
  },
  {
    role: 'UI Designer · UX Analyst',
    company: 'London Computer Systems',
    period: 'Sep. 2023 – Apr. 2025',
    logo: '/LCS.svg',
    tags: ['UI Design', 'UX Research', 'Figma', 'Rent Manager'],
    summary: 'Two back-to-back roles at LCS before moving into design systems work. First as a UX Analyst on Rent Manager: designing product experiences from customer research and business requirements, in close collaboration with Business Analysts. Then as UI Designer on qManage, a standalone product outside the core Rent Manager suite.',
    bullets: [
      'Designed product experiences for Rent Manager based on customer research, collaborating closely with Business Analysts and UI teams.',
      'Conducted exploratory and concept-validation research to surface user pain points and inform feature development.',
      'Designed UI components and screen flows for qManage, maintaining Figma libraries and contributing to component standardization ahead of a company-wide product restructure.',
    ],
  },
  {
    id: 'supplyhive',
    role: 'Product Designer',
    company: 'SupplyHive™',
    period: 'May 2022 – Mar. 2023',
    logo: '/SH.svg',
    tags: ['Product Design', 'B2B SaaS', 'Design Systems', 'Agile'],
    summary: 'End-to-end product design for a supplier performance management platform. Clients included Fortune 500 companies; stakeholders ranged from C-suite to engineering. The role covered the full stack of product design work alongside active Agile participation with the dev team.',
    bullets: [
      'Owned design from C-suite requirements gathering through high-fidelity mockups and developer handoff.',
      'Built and maintained an internal design system and component library for visual and functional consistency across the platform.',
      'Partnered with the sales team to translate client feedback and prospect needs into new features and roadmap priorities.',
      'Maintained the WordPress landing site and authored email newsletter campaigns for client audiences.',
    ],
    visualKey: 'clientContext',
  },
  {
    id: 'refract',
    role: 'Product Development Engineer',
    company: 'Refract Labs LLC',
    period: 'Sep. 2020 – Apr. 2022',
    logo: '/RL.svg',
    logoShape: 'rounded',
    tags: ['Frontend Development', 'Product Design', 'Project Management'],
    summary: 'Joined as the 4th employee at founding stage, building web applications for startup and enterprise clients. Grew through three distinct roles over two years: frontend developer, then project lead, then product engineer owning design and requirements end-to-end.',
    bullets: [
      'Built web applications for startup and enterprise clients as a founding-stage frontend developer.',
      'Grew into a project management role leading Scrum ceremonies, sprint planning, and retrospectives across multiple client projects.',
      'Transitioned into product engineering: owning requirements documentation, user stories, wireframes, and high-fidelity Figma mockups.',
      'Interfaced directly with clients in prospect calls and project reviews, managing scope alignment and stakeholder expectations.',
    ],
    visualKey: 'growthArc',
  },
  {
    id: 'uc',
    role: 'Information Technology Consultant',
    company: 'UC Lindner College of Business',
    period: 'Oct. 2019 – Dec. 2020',
    logo: '/UC.svg',
    isLast: true,
    tags: ['IT Support', 'Python', 'ServiceNow'],
    summary: "L1/L2 IT support for students and faculty at UC's business college. Beyond tickets, wrote Python automation scripts to connect disparate systems and reduce manual work for the team.",
    bullets: [
      'Provided L1/L2 support to students and faculty, managing service request queues in ServiceNow.',
      'Wrote Python automation scripts to integrate disparate technologies and improve team workflows.',
      'Managed loaner device fleets, software license inventories, and enterprise network administration.',
    ],
  },
]

// ─── ML Project ───────────────────────────────────────────────────────────────

export const DEFAULT_ML_PROJECT: MLProjectData = {
  title: 'ML Audit Pipeline',
  description:
    "Built to replace a manual audit process that couldn't scale. A YOLOv8 model trained on annotated RMX screenshots to automatically detect and classify UI components — reaching 92% precision on a trained subset.",
  tags: ['YOLOv8', 'Label Studio', 'OmniParser', 'Python'],
  phases: [
    {
      label: 'Phase 0',
      sub: 'Problem identification',
      items: [
        '911 RMX component records, 225 preference records audited',
        'Same components built 3–5 different ways across the product',
        'Manual QA at scale was too costly — automation needed',
      ],
    },
    {
      label: 'Phase 1',
      sub: 'Aug — Opportunity exploration',
      items: [
        'Scoped a CV solution to automate component detection',
        'Documented component tokenization guidelines',
        'Gathered a comprehensive screenshot dataset',
      ],
    },
    {
      label: 'Phase 2',
      sub: 'Sept — ML Foundation',
      items: [
        'Annotated screenshots across 5 component types in Label Studio',
        'Trained YOLOv8; explored Hugging Face, Colab, local hosting',
        'Integrated OmniParser for richer UI context',
        'Built POC detection interface',
      ],
    },
    {
      label: 'Phase 3',
      sub: 'Oct — Refinement',
      items: [
        'Retrained for improved accuracy across model sizes',
        'Researched uncertainty calculation for active learning',
        'Hosted model locally to pre-annotate new screenshots',
      ],
    },
    {
      label: 'Future',
      sub: 'Active Learning',
      isFuture: true,
      items: [
        'Active learning loop for low-confidence predictions',
        'Consistency scoring vs. Figma source of truth',
        'GitLab version control + remote dev environment',
        'Pipeline UI for running on specific screens',
      ],
    },
  ],
}
