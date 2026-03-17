import { useState } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useAtomValue, useAtomSet } from "@effect-atom/atom-react"
import {
  player1RatingsAtom,
  player2RatingsAtom,
  player1NameAtom,
  player2NameAtom,
  matchScoreAtom,
  phaseAtom,
} from "../atoms/game"
import { axisKeys, type AxisKey } from "../data/axes"
import { LocaleMenu } from "../components/LocaleMenu"
import { ComparisonRow } from "../components/ComparisonRow"
import { SummaryCard } from "../components/SummaryCard"
import { PromptModal } from "../components/PromptModal"
import { useT } from "../i18n/translations"

export const Route = createFileRoute("/reveal")({ component: RevealScreen })

function RevealScreen() {
  const t = useT()
  const navigate = useNavigate()
  const p1Ratings = useAtomValue(player1RatingsAtom)
  const p2Ratings = useAtomValue(player2RatingsAtom)
  const score = useAtomValue(matchScoreAtom)
  const setPhase = useAtomSet(phaseAtom)
  const setP1Ratings = useAtomSet(player1RatingsAtom)
  const setP2Ratings = useAtomSet(player2RatingsAtom)
  const setP1Name = useAtomSet(player1NameAtom)
  const setP2Name = useAtomSet(player2NameAtom)

  const [promptOpen, setPromptOpen] = useState(false)

  const handlePlayAgain = () => {
    setP1Ratings({})
    setP2Ratings({})
    setP1Name("")
    setP2Name("")
    setPhase("welcome")
    navigate({ to: "/" })
  }

  return (
    <div className="animate-radial-reveal min-h-dvh bg-secondary">
      <LocaleMenu />

      {/* Header */}
      <div className="px-6 pt-8 pb-4 text-center">
        <h1 className="mb-2 font-display text-[2.5rem] leading-tight font-bold">
          {t.revealTitle}
        </h1>
        <p className="font-body text-base text-muted">{t.revealSubtitle}</p>
      </div>

      {/* Comparison rows */}
      <div className="space-y-2 px-4">
        {axisKeys.map((key, i) => (
          <ComparisonRow
            key={key}
            axisKey={key as AxisKey}
            selfValue={p1Ratings[key] ?? 50}
            partnerValue={p2Ratings[key] ?? 50}
            delay={i * 100}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="py-6">
        <SummaryCard score={score} />
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 flex gap-3 border-t border-primary/10 bg-surface px-6 py-4 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
        <button
          type="button"
          onClick={() => setPromptOpen(true)}
          className="flex-1 rounded-2xl border-2 border-primary bg-accent px-4 py-4 font-body text-sm font-bold text-surface active:scale-[0.98] transition-transform"
        >
          {t.talkBtn}
        </button>
        <button
          type="button"
          onClick={handlePlayAgain}
          className="flex-1 rounded-2xl border-2 border-primary bg-surface px-4 py-4 font-body text-sm font-bold active:scale-[0.98] transition-transform"
        >
          {t.playAgainBtn}
        </button>
      </div>

      <PromptModal open={promptOpen} onClose={() => setPromptOpen(false)} />
    </div>
  )
}
