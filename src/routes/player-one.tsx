import { useState, useCallback } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useAtomValue, useAtomSet } from "@effect-atom/atom-react"
import {
  player1NameAtom,
  player2NameAtom,
  player1RatingsAtom,
  round2SelfRatingsAtom,
  roundAtom,
  phaseAtom,
} from "../atoms/game"
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
  const round = useAtomValue(roundAtom)
  const player1Name = useAtomValue(player1NameAtom)
  const player2Name = useAtomValue(player2NameAtom)
  const setP1Ratings = useAtomSet(player1RatingsAtom)
  const setR2SelfRatings = useAtomSet(round2SelfRatingsAtom)
  const setPhase = useAtomSet(phaseAtom)

  // Round 1: P1 rates self. Round 2: P2 rates self.
  const selfRaterName = round === 1 ? player1Name : player2Name

  const [ratings, setLocalRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries(axisKeys.map((key) => [key, 50])),
  )

  const handleRatingChange = useCallback((key: string, value: number) => {
    setLocalRatings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleSubmit = useCallback(() => {
    if (round === 1) {
      setP1Ratings(ratings)
    } else {
      setR2SelfRatings(ratings)
    }
    setPhase("handoff-observer")
    navigate({ to: "/handoff-p2" })
  }, [ratings, round, setP1Ratings, setR2SelfRatings, setPhase, navigate])

  return (
    <div className="flex min-h-dvh flex-col bg-secondary">
      <LocaleMenu />

      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="mb-3 flex items-end justify-end">
          <span className="rounded-full bg-lavender px-3 py-1 font-body text-xs font-bold">
            {selfRaterName}
          </span>
        </div>

        <h1 className="mb-1 font-display text-[2rem] leading-tight font-bold">
          {t.selfRateTitle(selfRaterName)}
        </h1>
        <p className="font-body text-base text-muted">{t.selfRateSubtitle}</p>
      </div>

      {/* Carousel */}
      <div className="flex flex-1 items-center px-4 py-4">
        <AxisCarousel
          ratings={ratings}
          onRatingChange={handleRatingChange}
          onComplete={handleSubmit}
          completeLabel={t.selfRateBtn}
        />
      </div>
    </div>
  )
}
