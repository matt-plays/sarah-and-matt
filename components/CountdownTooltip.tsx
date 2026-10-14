'use client'

import HoverTooltip from './HoverTooltip'

// Wedding date — midnight local time, month is 0-indexed (7 = August)
const WEDDING = new Date(2026, 7, 28)

function daysUntilWedding(): number {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const diff = WEDDING.getTime() - today.getTime()
  return Math.max(0, Math.floor(diff / 86_400_000))
}

export default function CountdownTooltip({ children }: { children: React.ReactNode }) {
  const days = daysUntilWedding()
  const label = days === 0 ? 'Today!' : `${days} days to go`

  return <HoverTooltip label={label}>{children}</HoverTooltip>
}
