import { useState, useCallback } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useAtomSet } from "@effect-atom/atom-react"
import { player1NameAtom, phaseAtom } from "../atoms/game"
import { LocaleMenu } from "../components/LocaleMenu"
import { useT } from "../i18n/translations"

export const Route = createFileRoute("/setup-player-one")({
  component: SetupPlayerOneScreen,
})

function SetupPlayerOneScreen() {
  const t = useT()
  const navigate = useNavigate()
  const setPlayer1Name = useAtomSet(player1NameAtom)
  const setPhase = useAtomSet(phaseAtom)
  const [name, setName] = useState("")

  const handleContinue = useCallback(() => {
    setPlayer1Name(name.trim())
    setPhase("setup")
    navigate({ to: "/setup-player-two" })
  }, [name, setPlayer1Name, setPhase, navigate])

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-secondary px-6">
      <LocaleMenu />

      <h1 className="mb-8 text-center font-display text-[2rem] leading-tight font-bold">
        {t.setupP1Title}
      </h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && name.trim() && handleContinue()}
        placeholder={t.setupP1Placeholder}
        autoFocus
        className="mb-8 w-full max-w-xs rounded-xl border-2 border-primary bg-surface px-4 py-3 text-center font-body text-lg outline-none focus:border-accent transition-colors"
      />

      <button
        type="button"
        onClick={handleContinue}
        disabled={!name.trim()}
        className="rounded-2xl border-2 border-primary bg-accent px-8 py-4 font-body text-lg font-bold text-surface shadow-md disabled:opacity-40 active:scale-95 transition-all"
      >
        {t.continueBtn}
      </button>
    </div>
  )
}
