'use client'

import React, { useState, useCallback } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  BackgroundVariant,
  MarkerType,
  BaseEdge,
} from '@xyflow/react'
import type { Node, Edge, NodeProps, EdgeProps } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

// ─── Icons ────────────────────────────────────────────────────────────────────
// Real logos from /public; custom SVG for generic data nodes

const iconStyle: React.CSSProperties = {
  width: 34, height: 34, objectFit: 'contain', display: 'block', flexShrink: 0,
}

/** Image icon: photo landscape scene (no brand logo available) */
function ImageDataIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="5" width="28" height="22" rx="2.5" fill="#E3F2FD" stroke="#1E88E5" strokeWidth="1.5" />
      <circle cx="9" cy="12" r="3" fill="#FFC107" />
      <path d="M2 23 L11 13 L17 19 L21 15 L30 23 Z" fill="#1E88E5" opacity="0.75" />
    </svg>
  )
}

/** Training data icon: photo + red bookmark tag */
function TrainingDataIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
      <rect x="2" y="5" width="24" height="22" rx="2.5" fill="#E3F2FD" stroke="#1E88E5" strokeWidth="1.5" />
      <circle cx="8" cy="12" r="2.5" fill="#FFC107" />
      <path d="M2 23 L9 14 L14 19 L18 15 L26 23 Z" fill="#1E88E5" opacity="0.75" />
      <path d="M25 5 L31 5 L31 17 L28 15 L25 17 Z" fill="#FF4A4A" />
    </svg>
  )
}

// ─── Node kind → icon mapping ─────────────────────────────────────────────────

type Kind = 'script' | 'image' | 'tool' | 'model' | 'modelInput'

function NodeKindIcon({ kind, label }: { kind: Kind; label?: string }) {
  // Training data nodes get the tagged-photo icon
  if (kind === 'image' && label?.toLowerCase().includes('training')) return <TrainingDataIcon />
  if (kind === 'image')      return <ImageDataIcon />
  if (kind === 'script')     return <img src="/Python.svg"           alt="Python"        style={iconStyle} />
  if (kind === 'tool')       return <img src="/Label%20Studio.svg"   alt="Label Studio"  style={iconStyle} />
  // best_model.pt (trained output) → PyTorch; yolov8s.pt (Ultralytics base) → Ultralytics
  if (kind === 'model')      return <img src="/Pytorch.svg"          alt="PyTorch"       style={iconStyle} />
  if (kind === 'modelInput') return <img src="/Ultralytics.svg"      alt="Ultralytics"   style={iconStyle} />
  return null
}

// ─── Custom node types ────────────────────────────────────────────────────────

const mono = 'ui-monospace, "SF Mono", Menlo, monospace'

interface PipeData extends Record<string, unknown> {
  label: string
  kind: Kind
  detail: string
}

/** Standard icon + label card */
function PipeNode({ data, selected }: NodeProps) {
  const d = data as PipeData
  return (
    <>
      <Handle id="top"    type="source"  position={Position.Top}    style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle id="left"   type="target"  position={Position.Left}   style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle id="right"  type="source"  position={Position.Right}  style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle id="bottom" type="source"  position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} />
      <div
        style={{
          background: 'var(--c-bg)',
          border: selected ? '1.5px solid var(--c-accent)' : '1px solid var(--c-t10)',
          borderRadius: 7,
          padding: '9px 8px 8px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          cursor: 'pointer',
          width: 88,
          boxShadow: selected
            ? '0 0 0 3px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.1)'
            : '0 1px 4px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.15s, border-color 0.15s',
          userSelect: 'none',
        }}
      >
        <NodeKindIcon kind={d.kind} label={d.label} />
        <div
          style={{
            fontSize: 7.5,
            fontFamily: d.kind === 'script' || d.kind === 'model' || d.kind === 'modelInput' ? mono : 'inherit',
            color: 'var(--c-t70)',
            textAlign: 'center',
            lineHeight: 1.35,
            wordBreak: 'break-word',
            width: '100%',
          }}
        >
          {d.label}
        </div>
      </div>
    </>
  )
}

interface ProcessData extends Record<string, unknown> {
  label: string
  detail: string
}

/** Circle process node */
function ProcessNode({ data, selected }: NodeProps) {
  const d = data as ProcessData
  return (
    <>
      <Handle type="target" position={Position.Left}   style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle type="target" position={Position.Top}    style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle type="source" position={Position.Right}  style={{ opacity: 0, pointerEvents: 'none' }} />
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} />
      <div
        style={{
          width: 100, height: 100,
          borderRadius: '50%',
          border: selected ? '2px solid var(--c-accent)' : '1.5px solid var(--c-t30)',
          background: 'var(--c-bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: selected ? '0 0 0 3px rgba(0,0,0,0.05)' : '0 1px 3px rgba(0,0,0,0.06)',
          transition: 'box-shadow 0.15s, border-color 0.15s',
          userSelect: 'none',
        }}
      >
        <div style={{ fontSize: 8.5, color: 'var(--c-t70)', textAlign: 'center', lineHeight: 1.4, padding: '0 14px' }}>
          {d.label}
        </div>
      </div>
    </>
  )
}

/** Dashed group box (background decoration, non-interactive) */
function GroupBoxNode({ data }: NodeProps) {
  const d = data as { label?: string }
  return (
    <div
      style={{
        width: '100%', height: '100%',
        border: '2px dashed #F59E0B',
        borderRadius: 10,
        background: 'rgba(245,158,11,0.03)',
        pointerEvents: 'none',
        position: 'relative',
      }}
    >
      {d.label && (
        <div style={{
          position: 'absolute', bottom: -22, left: 0,
          fontSize: 8, color: '#F59E0B', fontWeight: 600,
          textTransform: 'uppercase', letterSpacing: '0.07em',
          whiteSpace: 'nowrap',
        }}>
          {d.label}
        </div>
      )}
    </div>
  )
}

/** Plain text section label */
function SectionLabelNode({ data }: NodeProps) {
  const d = data as { text: string }
  return (
    <div style={{
      fontSize: 8, fontWeight: 600, color: 'var(--c-t30)',
      textTransform: 'uppercase', letterSpacing: '0.07em',
      whiteSpace: 'nowrap', userSelect: 'none', pointerEvents: 'none',
    }}>
      {d.text}
    </div>
  )
}

// ─── Custom loop-back edge ────────────────────────────────────────────────────

function LoopEdge({ id, sourceX, sourceY, targetX, targetY, markerEnd, style }: EdgeProps) {
  const midY  = sourceY - 55
  const leftX = -85
  const topY  = targetY - 50
  const path = [
    `M ${sourceX} ${sourceY}`,
    `L ${sourceX} ${midY}`,
    `L ${leftX}   ${midY}`,
    `L ${leftX}   ${topY}`,
    `L ${targetX} ${topY}`,
    `L ${targetX} ${targetY}`,
  ].join(' ')
  return <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} />
}

/** Routes right → down → left to avoid crossing between diagram sections */
function DropRightEdge({ id, sourceX, sourceY, targetX, targetY, markerEnd, style }: EdgeProps) {
  const rightX = Math.max(sourceX, targetX) + 140
  const path = [
    `M ${sourceX} ${sourceY}`,
    `L ${rightX}  ${sourceY}`,
    `L ${rightX}  ${targetY}`,
    `L ${targetX} ${targetY}`,
  ].join(' ')
  return <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} />
}

// ─── Node & edge type registries ──────────────────────────────────────────────

const nodeTypes = {
  pipe:         PipeNode,
  process:      ProcessNode,
  groupBox:     GroupBoxNode,
  sectionLabel: SectionLabelNode,
}

const edgeTypes = { loop: LoopEdge, dropRight: DropRightEdge }

// ─── Shared edge styles ───────────────────────────────────────────────────────

const eS = { stroke: 'var(--c-t30)', strokeWidth: 1.5 }
const arr = { type: MarkerType.ArrowClosed, color: 'var(--c-t30)', width: 12, height: 12 }
const eLbl = { fontSize: 9, fill: 'var(--c-t50)' }

// ─── TRAINING diagram ─────────────────────────────────────────────────────────
//
// Row 1 (y=35): Screenshotter → RMX Screens → Label Studio → ( Initial Tagging )
//                                                                     ↓
// Row 2 (y=200): [yolov8s.pt] [Training Data]  (both feed trainer)
//                                                  ↓
// Row 3 (y=300): yolo_zip_trainer.py  ← Model Training ←  best_model.pt
//       ↑ (train-data-2)                                         ↓ (DropRight edge)
// Row 4 (y=490): RMX Screens → Label Studio → ( Model-Assisted ) → Training Data
//                                  ↑ Pre-annotation
// Row 5 (y=650): local_backend.py → Running Locally → best_model.pt

const TRAINING_NODES: Node[] = [
  // Labels
  { id: 'lbl-t', type: 'sectionLabel', position: { x: 0, y: 0 }, data: { text: 'Initial data collection and tagging workflow' }, selectable: false, draggable: false },

  // Row 1
  { id: 'screenshotter', type: 'pipe',    position: { x: 0,   y: 35  }, data: { label: 'Screenshotter.py',  kind: 'script', detail: 'Ingests a collection of RMX page links, crawls each page, takes a screenshot, and adds it to a dataset. The entry point for all data collection.' } },
  { id: 'rmx-1',        type: 'pipe',    position: { x: 150, y: 35  }, data: { label: 'RMX Screens',       kind: 'image',  detail: 'Product screenshots gathered from Rent Manager Express. The raw input data for annotation and model training — 911 component records in the 2023 audit.' } },
  { id: 'ls-1',         type: 'pipe',    position: { x: 300, y: 35  }, data: { label: 'Label Studio',      kind: 'tool',   detail: 'Annotation platform for configuring the labeling interface, importing screenshots, and manually annotating UI component bounding boxes.' } },
  { id: 'init-tag',     type: 'process', position: { x: 452, y: 12  }, data: { label: 'Initial Tagging / Data Annotation', detail: 'Human annotators draw bounding boxes around UI components in Label Studio, labelling each across 5 feature types (button, input, tile, etc.).' } },

  // Row 2 – grouped inputs to trainer
  { id: 'yolov8s',      type: 'pipe',    position: { x: 215, y: 190 }, data: { label: 'yolov8s.pt',        kind: 'modelInput', detail: 'The YOLOv8 small pre-trained base model weights. Used as the starting point for fine-tuning on RMX component data.' } },
  { id: 'train-data-1', type: 'pipe',    position: { x: 325, y: 190 }, data: { label: 'Training Data',    kind: 'image', detail: 'Annotated screenshot dataset exported from Label Studio, formatted for YOLOv8 training.' } },

  // Row 3 – trainer + model
  { id: 'trainer',      type: 'pipe',    position: { x: 0,   y: 300 }, data: { label: 'yolo_zip_trainer.py', kind: 'script', detail: 'Reads the Label Studio export zip and runs YOLOv8 model training for a configurable number of epochs. Hard-coded zip filepath — a config UI is planned.' } },
  { id: 'model-top',    type: 'pipe',    position: { x: 460, y: 300 }, data: { label: 'best_model.pt',    kind: 'model',  detail: 'The trained YOLOv8 model weights. Achieved 92% precision on a trained component subset. Serves as output of training and seed for the reinforcement loop.' } },

  // Row 4 – reinforcement section
  { id: 'rmx-2',        type: 'pipe',    position: { x: 0,   y: 490 }, data: { label: 'RMX Screens',       kind: 'image',  detail: 'New or updated product screenshots to be annotated in the reinforcement loop.' } },
  { id: 'ls-2',         type: 'pipe',    position: { x: 155, y: 490 }, data: { label: 'Label Studio',      kind: 'tool',   detail: 'In the reinforcement loop, Label Studio uses the locally-hosted model to pre-annotate screenshots. Human reviewers correct low-confidence predictions.' } },
  { id: 'model-assist', type: 'process', position: { x: 307, y: 462 }, data: { label: 'Model-Assisted Tagging', detail: 'The model pre-annotates bounding boxes in Label Studio. Human reviewers correct and confirm predictions before export.' } },
  { id: 'train-data-2', type: 'pipe',    position: { x: 475, y: 490 }, data: { label: 'Training Data',    kind: 'image', detail: 'Expanded training dataset — original annotations plus model-assisted and human-corrected labels from the reinforcement cycle.' } },

  // Row 5 – local backend
  { id: 'local-backend', type: 'pipe',   position: { x: 0,   y: 660 }, data: { label: 'local_backend.py', kind: 'script', detail: 'Hosts the trained model locally. Its IP address is configured in Label Studio\'s model settings to enable pre-annotation of new screenshots.' } },
  { id: 'model-bottom',  type: 'pipe',   position: { x: 195, y: 660 }, data: { label: 'best_model.pt',    kind: 'model',  detail: 'The trained model running locally via local_backend.py, providing pre-annotations to Label Studio for the reinforcement cycle.' } },
]

const TRAINING_EDGES: Edge[] = [
  { id: 'te1',  source: 'screenshotter', target: 'rmx-1',        type: 'smoothstep', style: eS, markerEnd: arr, label: 'Creates',      labelStyle: eLbl },
  { id: 'te2',  source: 'rmx-1',        target: 'ls-1',          type: 'smoothstep', style: eS, markerEnd: arr, label: 'Import to',    labelStyle: eLbl },
  { id: 'te3',  source: 'ls-1',         target: 'init-tag',      type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te4',  source: 'init-tag',     target: 'yolov8s',       type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te5',  source: 'init-tag',     target: 'train-data-1',  type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te6',  source: 'yolov8s',      target: 'trainer',       type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te7',  source: 'train-data-1', target: 'trainer',       type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te8',  source: 'trainer',      target: 'model-top',     type: 'smoothstep', style: eS, markerEnd: arr, label: 'Model Training', labelStyle: eLbl },
  // Long right-drop from model-top (row 3) to model-bottom (row 5)
  {
    id: 'te9',
    source: 'model-top', sourceHandle: 'right',
    target: 'model-bottom',
    type: 'dropRight',
    style: eS, markerEnd: arr,
  },
  { id: 'te10', source: 'rmx-2',        target: 'ls-2',          type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te11', source: 'ls-2',         target: 'model-assist',  type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te12', source: 'model-assist', target: 'train-data-2',  type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te13', source: 'train-data-2', target: 'trainer',       type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 'te14', source: 'local-backend',target: 'model-bottom',  type: 'smoothstep', style: eS, markerEnd: arr, label: 'Running Locally', labelStyle: eLbl },
  { id: 'te15', source: 'model-bottom', target: 'ls-2',          type: 'smoothstep', style: eS, markerEnd: arr, label: 'Pre-annotation',  labelStyle: eLbl },
]

// ─── REINFORCEMENT diagram ────────────────────────────────────────────────────
//
//  [ui_detection] (separate, left)
//
//  [RMX Screens] → Import → ┌─ dashed box ─────────────────────────┐ → [Training Data]
//                            │ [Label Studio] → (Model-Assisted) Export│
//                            │        ↑ Pre-annotation               │
//                            │  [best_model.pt]                      │
//                            └──────────────────────────────────────┘
//                                          ↑ Running Locally (dashed)
//                  [local_backend.py]  ←  [best_model.pt]  ← Model Training  [yolo_zip_trainer.py]
//                                                                                      ↑
//                                                               [Training Data] ───────┘

const RL_NODES: Node[] = [
  // Dashed group box
  {
    id: 'rl-box', type: 'groupBox',
    position: { x: 165, y: 50 },
    style: { width: 420, height: 310 },
    data: { label: 'Active in Label Studio' },
    selectable: false, draggable: false,
    zIndex: -1,
  },

  // Separate detection script (left)
  { id: 'detector', type: 'pipe', position: { x: -195, y: 115 }, data: { label: 'ui_detection_standalone.py', kind: 'script', detail: 'Standalone script that runs the model on a screenshot or folder of screenshots. Allows selecting a confidence threshold and annotation preferences before running detection.' } },

  // Outside left
  { id: 'rmx', type: 'pipe', position: { x: 20, y: 115 }, data: { label: 'RMX Screens', kind: 'image', detail: 'New RMX product screenshots to be imported into Label Studio for model-assisted tagging.' } },

  // Inside dashed box
  { id: 'ls',           type: 'pipe',    position: { x: 195, y: 115 }, data: { label: 'Label Studio',          kind: 'tool',   detail: 'Receives new screenshots and uses the locally-hosted model to pre-annotate them. Human reviewers correct predictions before export.' } },
  { id: 'model-assist', type: 'process', position: { x: 362, y: 90  }, data: { label: 'Model-Assisted Tagging', detail: 'The model pre-populates bounding boxes. Human annotators correct and confirm before exporting the refined training data.' } },
  { id: 'model-inner',  type: 'pipe',    position: { x: 270, y: 255 }, data: { label: 'best_model.pt',          kind: 'model',  detail: 'The currently trained model weights loaded inside Label Studio via local_backend.py to enable pre-annotation of new screenshots.' } },

  // Outside right
  { id: 'train-data', type: 'pipe', position: { x: 650, y: 115 }, data: { label: 'Training Data', kind: 'image', detail: 'Expanded training dataset produced by each reinforcement cycle — model-assisted annotations corrected by human reviewers.' } },

  // Bottom row
  { id: 'local-backend', type: 'pipe', position: { x: 195, y: 470 }, data: { label: 'local_backend.py', kind: 'script', detail: 'Hosts the model locally as a server. Its IP is configured in Label Studio\'s model settings to enable pre-annotation.' } },
  { id: 'model-bottom',  type: 'pipe', position: { x: 385, y: 470 }, data: { label: 'best_model.pt',    kind: 'model',  detail: 'The latest trained model weights, produced by yolo_zip_trainer.py. Passed to local_backend.py to start a new pre-annotation cycle.' } },
  { id: 'trainer',       type: 'pipe', position: { x: 580, y: 470 }, data: { label: 'yolo_zip_trainer.py', kind: 'script', detail: 'Re-runs YOLOv8 training with the expanded, corrected dataset. Each cycle improves model precision and recall.' } },
]

const dashedYellow = { stroke: '#F59E0B', strokeWidth: 1.5, strokeDasharray: '5 4' }
const arrYellow = { type: MarkerType.ArrowClosed, color: '#F59E0B', width: 12, height: 12 }

const RL_EDGES: Edge[] = [
  { id: 're1',  source: 'rmx',          target: 'ls',            type: 'smoothstep', style: eS, markerEnd: arr, label: 'Import',           labelStyle: eLbl },
  { id: 're2',  source: 'ls',           target: 'model-assist',  type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 're3',  source: 'model-assist', target: 'train-data',    type: 'smoothstep', style: eS, markerEnd: arr, label: 'Export',            labelStyle: eLbl },
  { id: 're4',  source: 'model-inner',  target: 'ls',            type: 'smoothstep', style: eS, markerEnd: arr, label: 'Pre-annotation',    labelStyle: eLbl },
  // Running Locally: dashed yellow, local-backend up to model-inner
  { id: 're5',  source: 'local-backend', target: 'model-inner',  type: 'smoothstep', style: dashedYellow, markerEnd: arrYellow, label: 'Running Locally', labelStyle: { fontSize: 9, fill: '#F59E0B' } },
  { id: 're6',  source: 'train-data',   target: 'trainer',       type: 'smoothstep', style: eS, markerEnd: arr },
  { id: 're7',  source: 'trainer',      target: 'model-bottom',  type: 'smoothstep', style: eS, markerEnd: arr, label: 'Model Training',    labelStyle: eLbl },
  { id: 're8',  source: 'model-bottom', target: 'local-backend', type: 'smoothstep', style: eS, markerEnd: arr },
]

// ─── Main component ───────────────────────────────────────────────────────────

type Tab = 'training' | 'reinforcement'

interface NodeWithDetail extends Node {
  data: { label?: string; detail?: string; kind?: Kind } & Record<string, unknown>
}

export default function MLPipelineCanvas() {
  const [tab, setTab]           = useState<Tab>('training')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'pipe' || node.type === 'process') {
      setSelectedId((prev) => (prev === node.id ? null : node.id))
    }
  }, [])

  const onPaneClick = useCallback(() => setSelectedId(null), [])

  const nodes = tab === 'training' ? TRAINING_NODES : RL_NODES
  const edges = tab === 'training' ? TRAINING_EDGES : RL_EDGES

  const allNodes: NodeWithDetail[] = [...TRAINING_NODES, ...RL_NODES] as NodeWithDetail[]
  const selected = selectedId ? allNodes.find((n) => n.id === selectedId) : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Tab bar */}
      <div
        style={{
          display: 'flex', gap: 4,
          borderBottom: '1px solid var(--c-t10)',
          paddingBottom: 0,
          marginBottom: 0,
        }}
      >
        {(['training', 'reinforcement'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); setSelectedId(null) }}
            style={{
              padding: '7px 14px',
              fontSize: 9,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: tab === t ? 'var(--c-type)' : 'var(--c-t30)',
              borderBottom: tab === t ? '2px solid var(--c-accent)' : '2px solid transparent',
              marginBottom: -1,
              transition: 'color 0.15s',
              fontFamily: 'inherit',
            }}
          >
            {t === 'training' ? 'Training' : 'Reinforcement'}
          </button>
        ))}
      </div>

      {/* Canvas */}
      <div
        style={{
          position: 'relative',
          height: 480,
          border: '1px solid var(--c-t10)',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          overflow: 'hidden',
        }}
      >
        <ReactFlow
          key={tab}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={false}
          nodesConnectable={false}
          zoomOnScroll={false}
          zoomOnPinch
          panOnDrag
          minZoom={0.15}
          maxZoom={3}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20} size={1}
            color="var(--c-t10)"
            style={{ background: 'var(--c-bg)' }}
          />
          <Controls
            showInteractive={false}
            style={{ boxShadow: 'none', border: '1px solid var(--c-t10)', borderRadius: 8, overflow: 'hidden', gap: 0 }}
          />
        </ReactFlow>

        {/* Hint */}
        {!selectedId && (
          <div style={{
            position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
            fontSize: 8.5, color: 'var(--c-t30)', fontWeight: 500,
            pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
          }}>
            Drag to pan · zoom buttons to zoom · click a node for details
          </div>
        )}

        {/* Detail panel */}
        {selected?.data?.detail && (
          <div style={{
            position: 'absolute', bottom: 16, left: 16, width: 264,
            background: 'var(--c-bg)',
            border: '1px solid var(--c-t10)',
            borderRadius: 10, padding: '14px 16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
            zIndex: 10,
          }}>
            <div style={{ fontSize: 8, color: 'var(--c-t30)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
              {selected.data.kind ?? 'process'}
            </div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--c-type)', marginBottom: 8, lineHeight: 1.3, fontFamily: (selected.data.kind === 'script' || selected.data.kind === 'model' || selected.data.kind === 'modelInput') ? mono : 'inherit' }}>
              {String(selected.data.label ?? '')}
            </div>
            <div style={{ fontSize: 9.5, color: 'var(--c-t70)', lineHeight: 1.65 }}>
              {String(selected.data.detail)}
            </div>
            <button onClick={() => setSelectedId(null)} style={{ marginTop: 10, fontSize: 9, color: 'var(--c-t50)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'block' }}>
              Dismiss ×
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
