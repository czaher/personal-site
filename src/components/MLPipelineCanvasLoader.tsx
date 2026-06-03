'use client'

import dynamic from 'next/dynamic'

const MLPipelineCanvas = dynamic(
  () => import('@/components/MLPipelineCanvas'),
  { ssr: false }
)

export default function MLPipelineCanvasLoader() {
  return <MLPipelineCanvas />
}
