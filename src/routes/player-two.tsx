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

  return (
    <div className="flex min-h-dvh flex-col bg-secondary">
      <LocaleMenu />

      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="mb-3 flex items-start justify-between">
          <span className="rounded-full border-2 border-primary bg-surface px-3 py-1 font-body text-xs font-bold">
            {t.step(3, 4)}
          </span>
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
        <AxisCarousel ratings={ratings} onRatingChange={handleRatingChange} onComplete={handleSubmit} completeLabel={t.p2Btn} />
      </div>
    </div>
  )
}
