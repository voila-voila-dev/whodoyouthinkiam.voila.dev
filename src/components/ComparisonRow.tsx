import { useT } from "../i18n/translations"
import type { AxisKey } from "../data/axes"

interface ComparisonRowProps {
  axisKey: AxisKey
  selfValue: number
  partnerValue: number
  selfLabel: string
  partnerLabel: string
  delay: number
}

export function ComparisonRow({
  axisKey,
  selfValue,
  partnerValue,
  selfLabel,
  partnerLabel,
  delay,
}: ComparisonRowProps) {
  const t = useT()
  const axisT = t.axes[axisKey]
  const gap = Math.abs(selfValue - partnerValue)

  const gapBadge =
    gap <= 10
      ? { emoji: "\u2728", bg: "bg-mint", text: "text-primary" }
      : gap <= 20
        ? { emoji: "\uD83E\uDD14", bg: "bg-golden", text: "text-primary" }
        : { emoji: "\uD83D\uDEA8", bg: "bg-accent", text: "text-surface" }

  const rowTint = gap > 20 ? "bg-accent/5" : ""

  return (
    <div
      className={`rounded-xl p-4 ${rowTint}`}
      style={{
        animation: `stagger-in 0.4s ease-out ${delay}ms both`,
      }}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="font-display text-base font-semibold">
          {axisT.label}
        </span>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${gapBadge.bg} ${gapBadge.text}`}
        >
          {gapBadge.emoji} +{gap}
        </span>
      </div>

      {/* Self bar */}
      <div className="mb-1 flex items-center gap-2">
        <span className="w-16 truncate text-xs font-body text-muted">
          {selfLabel}
        </span>
        <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-lavender"
            style={
              {
                "--bar-width": `${selfValue}%`,
                animation: `bar-grow 0.6s ease-out ${delay + 100}ms both`,
              } as React.CSSProperties
            }
          />
        </div>
        <span className="w-8 text-right text-xs font-bold font-body">
          {selfValue}
        </span>
      </div>

      {/* Partner bar */}
      <div className="flex items-center gap-2">
        <span className="w-16 truncate text-xs font-body text-muted">
          {partnerLabel}
        </span>
        <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-golden"
            style={
              {
                "--bar-width": `${partnerValue}%`,
                animation: `bar-grow 0.6s ease-out ${delay + 200}ms both`,
              } as React.CSSProperties
            }
          />
        </div>
        <span className="w-8 text-right text-xs font-bold font-body">
          {partnerValue}
        </span>
      </div>

      {/* Boundary labels */}
      <div className="mt-1.5 flex justify-between text-[10px] font-body text-primary/50">
        <span>{axisT.left}</span>
        <span className="text-right">{axisT.right}</span>
      </div>
    </div>
  )
}
