import { useT } from "../i18n/translations"

interface SummaryCardProps {
  score: number
}

export function SummaryCard({ score }: SummaryCardProps) {
  const t = useT()

  // Variable font weight: higher score = heavier
  const fontWeight = Math.round(300 + (score / 100) * 600)

  return (
    <div className="mx-4 rotate-1 rounded-2xl border-2 border-primary bg-surface p-6 shadow-lg">
      <p
        className="mb-2 text-center font-display text-2xl"
        style={{ fontWeight }}
      >
        {t.matchScore(score)}
      </p>
      <p className="text-center font-body text-sm italic text-primary/70">
        {t.matchComment(score)}
      </p>
    </div>
  )
}
