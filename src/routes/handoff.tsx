import { useState, useEffect, useCallback } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useAtomValue, useAtomSet } from "@effect-atom/atom-react"
import {
  player1NameAtom,
  player2NameAtom,
  roundAtom,
  phaseAtom,
} from "../atoms/game"
import { useT } from "../i18n/translations"

export const Route = createFileRoute("/handoff")({ component: HandoffScreen })

function HandoffScreen() {
  const t = useT()
  const navigate = useNavigate()
  const round = useAtomValue(roundAtom)
  const player1Name = useAtomValue(player1NameAtom)
  const player2Name = useAtomValue(player2NameAtom)
  const setPhase = useAtomSet(phaseAtom)
  const [countdown, setCountdown] = useState(3)

  // In round 1, self-rater is P1. In round 2, self-rater is P2.
  const selfRaterName = round === 1 ? player1Name : player2Name

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  const handleReady = useCallback(() => {
    setPhase("self-rating")
    navigate({ to: "/player-one" })
  }, [setPhase, navigate])

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-primary px-6">
      <div className="animate-pulse-glow mb-8 flex h-28 w-28 items-center justify-center rounded-full text-6xl">
        🤝
      </div>

      <h1 className="mb-3 text-center font-display text-[2.5rem] leading-tight font-bold text-surface">
        {t.handoffTitle(selfRaterName)}
      </h1>

      <p className="mb-8 max-w-xs text-center font-body text-base text-surface/60">
        {t.handoffSubtitle(selfRaterName)}
      </p>

      {countdown > 0 && (
        <p className="mb-3 text-center font-body text-sm text-surface/40">
          {t.handoffPeekWarning}
        </p>
      )}

      <button
        type="button"
        onClick={handleReady}
        disabled={countdown > 0}
        className="rounded-2xl border-2 border-surface bg-surface px-8 py-4 font-body text-lg font-bold text-primary shadow-md disabled:opacity-40 active:scale-95 transition-all"
      >
        {countdown > 0 ? countdown : t.handoffBtn}
      </button>
    </div>
  )
}
