'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Image as LucideImage, Tags } from 'lucide-react'
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  BackgroundVariant,
  BaseEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import type { Node, Edge, NodeProps, EdgeProps } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import {
  DEFAULT_TRAINING_NODES,
  DEFAULT_TRAINING_EDGES,
  DEFAULT_RL_NODES,
  DEFAULT_RL_EDGES,
  type NodeDef,
  type EdgeDef,
} from '@/lib/defaultContent'

// ─── Icons ────────────────────────────────────────────────────────────────────

const imgStyle: React.CSSProperties = {
  width: 34, height: 34, objectFit: 'contain', display: 'block', flexShrink: 0,
}

type Kind = 'script' | 'image' | 'taggedImage' | 'tool' | 'model' | 'modelInput'

function NodeKindIcon({ kind }: { kind: Kind }) {
  if (kind === 'image')       return <LucideImage size={30} color="#1E88E5" strokeWidth={1.5} />
  if (kind === 'taggedImage') return <Tags        size={30} color="#1E88E5" strokeWidth={1.5} />
  if (kind === 'script')      return <img src="/Python.svg"         alt="Python"       style={imgStyle} />
  if (kind === 'tool')        return <img src="/Label%20Studio.svg" alt="Label Studio" style={imgStyle} />
  if (kind === 'model')       return <img src="/Pytorch.svg"        alt="PyTorch"      style={imgStyle} />
  if (kind === 'modelInput')  return <img src="/Ultralytics.svg"    alt="Ultralytics"  style={imgStyle} />
  return null
}

// ─── Custom node types ────────────────────────────────────────────────────────

const mono = 'ui-monospace, "SF Mono", Menlo, monospace'

interface PipeData extends Record<string, unknown> {
  label: string
  kind: Kind
  detail: string
}

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
        <NodeKindIcon kind={d.kind} />
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

// ─── Custom edge types ────────────────────────────────────────────────────────

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

function LeftSideEdge({ id, sourceX, sourceY, targetX, targetY, markerEnd, style }: EdgeProps) {
  const belowY = 800
  const leftX  = -110
  const path = [
    `M ${sourceX} ${sourceY}`,
    `L ${sourceX} ${belowY}`,
    `L ${leftX}   ${belowY}`,
    `L ${leftX}   ${targetY}`,
    `L ${targetX} ${targetY}`,
  ].join(' ')
  return <BaseEdge id={id} path={path} markerEnd={markerEnd} style={style} />
}

// ─── Registries ───────────────────────────────────────────────────────────────

const nodeTypes = {
  pipe:         PipeNode,
  process:      ProcessNode,
  groupBox:     GroupBoxNode,
  sectionLabel: SectionLabelNode,
}

const edgeTypes = { loop: LoopEdge, dropRight: DropRightEdge, leftSide: LeftSideEdge }

// ─── Props & types ────────────────────────────────────────────────────────────

export interface PipelineSaveData {
  training: { nodes: Node[]; edges: Edge[] }
  reinforcement: { nodes: Node[]; edges: Edge[] }
}

interface MLPipelineCanvasProps {
  initialTrainingNodes?: NodeDef[]
  initialTrainingEdges?: EdgeDef[]
  initialRLNodes?: NodeDef[]
  initialRLEdges?: EdgeDef[]
  adminMode?: boolean
  onSave?: (data: PipelineSaveData) => Promise<void> | void
}

type Tab = 'training' | 'reinforcement'

interface NodeWithDetail extends Node {
  data: { label?: string; detail?: string; kind?: Kind } & Record<string, unknown>
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function MLPipelineCanvas({
  initialTrainingNodes,
  initialTrainingEdges,
  initialRLNodes,
  initialRLEdges,
  adminMode = false,
  onSave,
}: MLPipelineCanvasProps) {
  const [tab, setTab]               = useState<Tab>('training')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const [trainingNodes, setTrainingNodes, onTrainingNodesChange] = useNodesState(
    (initialTrainingNodes ?? DEFAULT_TRAINING_NODES) as unknown as Node[]
  )
  const [trainingEdges, , onTrainingEdgesChange] = useEdgesState(
    (initialTrainingEdges ?? DEFAULT_TRAINING_EDGES) as unknown as Edge[]
  )
  const [rlNodes, setRlNodes, onRlNodesChange] = useNodesState(
    (initialRLNodes ?? DEFAULT_RL_NODES) as unknown as Node[]
  )
  const [rlEdges, , onRlEdgesChange] = useEdgesState(
    (initialRLEdges ?? DEFAULT_RL_EDGES) as unknown as Edge[]
  )

  // Sync when API data arrives asynchronously
  useEffect(() => {
    if (initialTrainingNodes) setTrainingNodes(initialTrainingNodes as unknown as Node[])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTrainingNodes])

  useEffect(() => {
    if (initialRLNodes) setRlNodes(initialRLNodes as unknown as Node[])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRLNodes])

  const activeNodes         = tab === 'training' ? trainingNodes : rlNodes
  const activeEdges         = tab === 'training' ? trainingEdges : rlEdges
  const onActiveNodesChange = tab === 'training' ? onTrainingNodesChange : onRlNodesChange
  const onActiveEdgesChange = tab === 'training' ? onTrainingEdgesChange : onRlEdgesChange

  const allNodes    = [...trainingNodes, ...rlNodes] as NodeWithDetail[]
  const selected    = selectedId ? allNodes.find((n) => n.id === selectedId) : null

  function updateSelectedField(field: 'label' | 'detail', value: string) {
    const setter = tab === 'training' ? setTrainingNodes : setRlNodes
    setter((ns) => ns.map((n) =>
      n.id === selectedId ? { ...n, data: { ...n.data, [field]: value } } : n
    ))
  }

  function updateSelectedPosition(axis: 'x' | 'y', value: number) {
    const setter = tab === 'training' ? setTrainingNodes : setRlNodes
    setter((ns) => ns.map((n) =>
      n.id === selectedId ? { ...n, position: { ...n.position, [axis]: value } } : n
    ))
  }

  async function handleSave() {
    setSaveStatus('saving')
    try {
      await onSave?.({
        training: { nodes: trainingNodes, edges: trainingEdges },
        reinforcement: { nodes: rlNodes, edges: rlEdges },
      })
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    if (node.type === 'pipe' || node.type === 'process') {
      setSelectedId((prev) => (prev === node.id ? null : node.id))
    }
  }, [])

  const onPaneClick = useCallback(() => setSelectedId(null), [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--c-t10)',
        }}
      >
        <div style={{ display: 'flex', gap: 4 }}>
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

        {adminMode && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 8 }}>
            <span style={{
              fontSize: 8, fontWeight: 600, color: '#F59E0B',
              textTransform: 'uppercase', letterSpacing: '0.07em',
              background: 'rgba(245,158,11,0.1)', padding: '2px 6px', borderRadius: 4,
            }}>
              Admin
            </span>
            <button
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              style={{
                padding: '5px 12px',
                fontSize: 9,
                fontWeight: 600,
                border: 'none',
                borderRadius: 6,
                cursor: saveStatus === 'saving' ? 'wait' : 'pointer',
                background: saveStatus === 'saved' ? '#22c55e'
                  : saveStatus === 'error' ? '#ef4444'
                  : 'var(--c-accent)',
                color: '#fff',
                transition: 'background 0.2s',
              }}
            >
              {saveStatus === 'saving' ? 'Saving…'
                : saveStatus === 'saved' ? 'Saved ✓'
                : saveStatus === 'error' ? 'Error'
                : 'Save Layout'}
            </button>
          </div>
        )}
      </div>

      {/* Canvas */}
      <div
        style={{
          position: 'relative',
          height: adminMode ? 520 : 480,
          border: '1px solid var(--c-t10)',
          borderTop: 'none',
          borderRadius: '0 0 12px 12px',
          overflow: 'hidden',
        }}
      >
        <ReactFlow
          key={tab}
          nodes={activeNodes}
          edges={activeEdges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onNodesChange={onActiveNodesChange}
          onEdgesChange={onActiveEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.18 }}
          proOptions={{ hideAttribution: true }}
          nodesDraggable={adminMode}
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

        {/* Hint (view mode only) */}
        {!selectedId && !adminMode && (
          <div style={{
            position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
            fontSize: 8.5, color: 'var(--c-t30)', fontWeight: 500,
            pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
          }}>
            Drag to pan · zoom buttons to zoom · click a node for details
          </div>
        )}

        {/* Hint (admin mode, nothing selected) */}
        {!selectedId && adminMode && (
          <div style={{
            position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
            fontSize: 8.5, color: '#F59E0B', fontWeight: 500,
            pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
          }}>
            Drag nodes to reposition · click a node to edit its label and detail
          </div>
        )}

        {/* View mode: detail panel */}
        {!adminMode && selected?.data?.detail && (
          <div style={{
            position: 'absolute', bottom: 16, left: 16, width: 264,
            background: 'var(--c-bg)',
            border: '1px solid var(--c-t10)',
            borderRadius: 10, padding: '14px 16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
            zIndex: 10,
          }}>
            <div style={{ fontSize: 8, color: 'var(--c-t30)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 5 }}>
              {String(selected.data.kind ?? 'process')}
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

        {/* Admin mode: edit panel */}
        {adminMode && selected && (
          <div style={{
            position: 'absolute', bottom: 16, left: 16, width: 280,
            background: 'var(--c-bg)',
            border: '1px solid #F59E0B',
            borderRadius: 10, padding: '14px 16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            zIndex: 10,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 8, color: '#F59E0B', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Editing: {selectedId}
              </div>
              <button onClick={() => setSelectedId(null)} style={{ fontSize: 9, color: 'var(--c-t50)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                ×
              </button>
            </div>

            <label style={{ display: 'block', fontSize: 8, color: 'var(--c-t50)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              Label
            </label>
            <input
              value={String(selected.data.label ?? selected.data.text ?? '')}
              onChange={(e) => updateSelectedField('label', e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                fontSize: 10, padding: '6px 8px',
                border: '1px solid var(--c-t10)', borderRadius: 5,
                background: 'var(--c-bg)', color: 'var(--c-type)',
                fontFamily: 'inherit', marginBottom: 10, outline: 'none',
              }}
            />

            <label style={{ display: 'block', fontSize: 8, color: 'var(--c-t50)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              Detail
            </label>
            <textarea
              value={String(selected.data.detail ?? '')}
              onChange={(e) => updateSelectedField('detail', e.target.value)}
              rows={4}
              style={{
                width: '100%', boxSizing: 'border-box',
                fontSize: 9.5, padding: '6px 8px',
                border: '1px solid var(--c-t10)', borderRadius: 5,
                background: 'var(--c-bg)', color: 'var(--c-type)',
                fontFamily: 'inherit', resize: 'vertical', marginBottom: 10,
                outline: 'none', lineHeight: 1.5,
              }}
            />

            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 8, color: 'var(--c-t50)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                  X
                </label>
                <input
                  type="number"
                  value={Math.round(selected.position.x)}
                  onChange={(e) => updateSelectedPosition('x', Number(e.target.value))}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    fontSize: 10, padding: '5px 7px',
                    border: '1px solid var(--c-t10)', borderRadius: 5,
                    background: 'var(--c-bg)', color: 'var(--c-type)',
                    fontFamily: 'inherit', outline: 'none',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 8, color: 'var(--c-t50)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                  Y
                </label>
                <input
                  type="number"
                  value={Math.round(selected.position.y)}
                  onChange={(e) => updateSelectedPosition('y', Number(e.target.value))}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    fontSize: 10, padding: '5px 7px',
                    border: '1px solid var(--c-t10)', borderRadius: 5,
                    background: 'var(--c-bg)', color: 'var(--c-type)',
                    fontFamily: 'inherit', outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
