import { useState, useCallback } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useAtomSet } from "@effect-atom/atom-react"
import { player1RatingsAtom, phaseAtom } from "../atoms/game"
import { axisKeys } from "../data/axes"
import { LocaleMenu } from "../components/LocaleMenu"
import { AxisCarousel } from "../components/AxisCarousel"
import { useT } from "../i18n/translations"

export const Route = createFileRoute("/player-one")({
  component: PlayerOneScreen,
})

function PlayerOneScreen() {
  const t = useT()
  const navigate = useNavigate()
  const setRatings = useAtomSet(player1RatingsAtom)
  const setPhase = useAtomSet(phaseAtom)

  // Local ratings state — committed to atom on submit
  const [ratings, setLocalRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries(axisKeys.map((key) => [key, 50])),
  )

  const handleRatingChange = useCallback((key: string, value: number) => {
    setLocalRatings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleSubmit = useCallback(() => {
    setRatings(ratings)
    setPhase("handoff")
    navigate({ to: "/handoff" })
  }, [ratings, setRatings, setPhase, navigate])

  return (
    <div className="flex min-h-dvh flex-col bg-secondary">
      <LocaleMenu />

      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="mb-3 flex items-start justify-between">
          <span className="rounded-full border-2 border-primary bg-surface px-3 py-1 font-body text-xs font-bold">
            {t.step(1, 4)}
          </span>
          <span className="rounded-full bg-lavender px-3 py-1 font-body text-xs font-bold">
            {t.p1Label}
          </span>
        </div>

        <h1 className="mb-1 font-display text-[2rem] leading-tight font-bold">
          {t.p1Title}
        </h1>
        <p className="font-body text-base text-muted">{t.p1Subtitle}</p>
      </div>

      {/* Carousel */}
      <div className="flex flex-1 items-center px-4 py-4">
        <AxisCarousel ratings={ratings} onRatingChange={handleRatingChange} onComplete={handleSubmit} completeLabel={t.p1Btn} />
      </div>
    </div>
  )
}
