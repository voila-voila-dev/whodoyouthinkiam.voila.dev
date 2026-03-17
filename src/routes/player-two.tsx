import { useState, useCallback } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useAtomSet } from "@effect-atom/atom-react"
import { player2RatingsAtom, phaseAtom } from "../atoms/game"
import { axisKeys } from "../data/axes"
import { LocaleMenu } from "../components/LocaleMenu"
import { AxisCarousel } from "../components/AxisCarousel"
import { useT } from "../i18n/translations"

export const Route = createFileRoute("/player-two")({
  component: PlayerTwoScreen,
})

function PlayerTwoScreen() {
  const t = useT()
  const navigate = useNavigate()
  const setRatings = useAtomSet(player2RatingsAtom)
  const setPhase = useAtomSet(phaseAtom)
  const [showBackWarning, setShowBackWarning] = useState(false)

  const [ratings, setLocalRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries(axisKeys.map((key) => [key, 50])),
  )

  const handleRatingChange = useCallback((key: string, value: number) => {
    setLocalRatings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleSubmit = useCallback(() => {
    setRatings(ratings)
    setPhase("reveal")
    navigate({ to: "/reveal" })
  }, [ratings, setRatings, setPhase, navigate])

  // Back navigation guard
  const handleBack = useCallback(() => {
    setShowBackWarning(true)
  }, [])

  const confirmBack = useCallback(() => {
    navigate({ to: "/handoff" })
  }, [navigate])

  return (
    <div className="flex min-h-dvh flex-col bg-secondary">
      <LocaleMenu />

      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="mb-3 flex items-start justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="rounded-full border-2 border-primary bg-surface px-3 py-1 font-body text-xs font-bold"
          >
            ← {t.step(3, 4)}
          </button>
          <span className="rounded-full bg-golden px-3 py-1 font-body text-xs font-bold">
            {t.p2Label}
          </span>
        </div>

        <h1 className="mb-1 font-display text-[2rem] leading-tight font-bold">
          {t.p2Title}
        </h1>
        <p className="font-body text-base text-muted">{t.p2Subtitle}</p>
      </div>

      {/* Carousel */}
      <div className="flex flex-1 items-center px-4 py-4">
        <AxisCarousel ratings={ratings} onRatingChange={handleRatingChange} />
      </div>

      {/* Sticky bottom CTA */}
      <div className="sticky bottom-0 border-t border-primary/10 bg-surface px-6 py-4 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-2xl border-2 border-primary bg-accent px-6 py-4 font-body text-base font-bold text-surface active:scale-[0.98] transition-transform"
        >
          {t.p2Btn}
        </button>
      </div>

      {/* Back warning modal */}
      {showBackWarning && (
        <>
          <div
            className="fixed inset-0 z-50 bg-primary/40"
            onClick={() => setShowBackWarning(false)}
            onKeyDown={(e) =>
              e.key === "Escape" && setShowBackWarning(false)
            }
          />
          <div className="fixed top-1/2 left-1/2 z-50 w-[85vw] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-primary bg-surface p-6 shadow-xl animate-fade-in">
            <p className="mb-6 text-center font-body text-base">
              {t.backWarning}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowBackWarning(false)}
                className="flex-1 rounded-xl border-2 border-primary bg-surface py-3 font-body text-sm font-bold active:scale-95 transition-transform"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmBack}
                className="flex-1 rounded-xl border-2 border-accent bg-accent py-3 font-body text-sm font-bold text-surface active:scale-95 transition-transform"
              >
                Go back
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
