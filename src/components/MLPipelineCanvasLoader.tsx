'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import type { NodeDef, EdgeDef } from '@/lib/defaultContent'

const MLPipelineCanvas = dynamic(
  () => import('@/components/MLPipelineCanvas'),
  { ssr: false }
)

export default function MLPipelineCanvasLoader() {
  const [nodes, setNodes] = useState<{
    training: { nodes: NodeDef[]; edges: EdgeDef[] }
    reinforcement: { nodes: NodeDef[]; edges: EdgeDef[] }
  } | null>(null)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => r.json())
      .then((data) => {
        if (data?.pipeline) setNodes(data.pipeline)
      })
      .catch(() => {/* silently use canvas defaults */})
  }, [])

  return (
    <MLPipelineCanvas
      initialTrainingNodes={nodes?.training.nodes}
      initialTrainingEdges={nodes?.training.edges}
      initialRLNodes={nodes?.reinforcement.nodes}
      initialRLEdges={nodes?.reinforcement.edges}
    />
  )
}
