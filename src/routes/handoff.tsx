import { useState, useEffect, useCallback } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useAtomSet } from "@effect-atom/atom-react"
import { player2NameAtom, phaseAtom } from "../atoms/game"
import { useT } from "../i18n/translations"

export const Route = createFileRoute("/handoff")({ component: HandoffScreen })

function HandoffScreen() {
  const t = useT()
  const navigate = useNavigate()
  const setPlayer2Name = useAtomSet(player2NameAtom)
  const setPhase = useAtomSet(phaseAtom)
  const [name, setName] = useState("")
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  const handleReady = useCallback(() => {
    setPlayer2Name(name)
    setPhase("p2rating")
    navigate({ to: "/player-two" })
  }, [name, setPlayer2Name, setPhase, navigate])

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-primary px-6">
      {/* No locale menu on handoff */}

      <div className="animate-pulse-glow mb-8 flex h-28 w-28 items-center justify-center rounded-full text-6xl">
        🤝
      </div>

      <h1 className="mb-3 text-center font-display text-[2.5rem] leading-tight font-bold text-surface">
        {t.handoffTitle}
      </h1>

      <p className="mb-8 max-w-xs text-center font-body text-base text-surface/60">
        {t.handoffSubtitle}
      </p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={t.handoffNamePlaceholder}
        className="mb-8 w-full max-w-xs rounded-xl border-2 border-surface/20 bg-transparent px-4 py-3 text-center font-body text-lg text-surface placeholder:text-surface/40 outline-none focus:border-accent transition-colors"
      />

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
