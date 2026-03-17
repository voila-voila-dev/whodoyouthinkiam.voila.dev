import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useAtomValue, useAtomSet } from "@effect-atom/atom-react"
import {
  player1NameAtom,
  player2NameAtom,
  player1RatingsAtom,
  player2RatingsAtom,
  round2SelfRatingsAtom,
  round2ObserverRatingsAtom,
  roundAtom,
  matchScoreAtom,
  phaseAtom,
} from "../atoms/game"
import { axisKeys, type AxisKey } from "../data/axes"
import { LocaleMenu } from "../components/LocaleMenu"
import { ComparisonRow } from "../components/ComparisonRow"
import { SummaryCard } from "../components/SummaryCard"
import { useT } from "../i18n/translations"

export const Route = createFileRoute("/reveal")({ component: RevealScreen })

function RevealScreen() {
  const t = useT()
  const navigate = useNavigate()
  const round = useAtomValue(roundAtom)
  const player1Name = useAtomValue(player1NameAtom)
  const player2Name = useAtomValue(player2NameAtom)
  const p1Ratings = useAtomValue(player1RatingsAtom)
  const p2Ratings = useAtomValue(player2RatingsAtom)
  const r2SelfRatings = useAtomValue(round2SelfRatingsAtom)
  const r2ObserverRatings = useAtomValue(round2ObserverRatingsAtom)
  const score = useAtomValue(matchScoreAtom)
  const setPhase = useAtomSet(phaseAtom)
  const setRound = useAtomSet(roundAtom)
  const setP1Ratings = useAtomSet(player1RatingsAtom)
  const setP2Ratings = useAtomSet(player2RatingsAtom)
  const setR2SelfRatings = useAtomSet(round2SelfRatingsAtom)
  const setR2ObserverRatings = useAtomSet(round2ObserverRatingsAtom)
  const setP1Name = useAtomSet(player1NameAtom)
  const setP2Name = useAtomSet(player2NameAtom)

  // Round 1: subject=P1, observer=P2. Round 2: subject=P2, observer=P1.
  const selfName = round === 1 ? player1Name : player2Name
  const observerName = round === 1 ? player2Name : player1Name
  const selfRatings = round === 1 ? p1Ratings : r2SelfRatings
  const observerRatings = round === 1 ? p2Ratings : r2ObserverRatings

  const handleExchange = () => {
    setRound(2)
    setPhase("handoff-self")
    navigate({ to: "/handoff" })
  }

  const handlePlayAgain = () => {
    setP1Ratings({})
    setP2Ratings({})
    setR2SelfRatings({})
    setR2ObserverRatings({})
    setP1Name("")
    setP2Name("")
    setRound(1)
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
        <p className="font-body text-base text-muted">
          {t.revealSubtitle(selfName, observerName)}
        </p>
      </div>

      {/* Comparison rows */}
      <div className="space-y-2 px-4">
        {axisKeys.map((key, i) => (
          <ComparisonRow
            key={key}
            axisKey={key as AxisKey}
            selfValue={selfRatings[key] ?? 50}
            partnerValue={observerRatings[key] ?? 50}
            selfLabel={selfName}
            partnerLabel={observerName}
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
        {round === 1 ? (
          <button
            type="button"
            onClick={handleExchange}
            className="flex-1 rounded-2xl border-2 border-primary bg-primary px-4 py-4 font-body text-sm font-bold text-surface active:scale-[0.98] transition-transform"
          >
            {t.exchangeBtn}
          </button>
        ) : (
          <button
            type="button"
            onClick={handlePlayAgain}
            className="flex-1 rounded-2xl border-2 border-primary bg-primary px-4 py-4 font-body text-sm font-bold text-surface active:scale-[0.98] transition-transform"
          >
            {t.finishBtn}
          </button>
        )}
      </div>
    </div>
  )
}
