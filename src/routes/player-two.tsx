import { useState, useCallback } from "react"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useAtomValue, useAtomSet } from "@effect-atom/atom-react"
import {
  player1NameAtom,
  player2NameAtom,
  player2RatingsAtom,
  round2ObserverRatingsAtom,
  roundAtom,
  phaseAtom,
} from "../atoms/game"
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
  const round = useAtomValue(roundAtom)
  const player1Name = useAtomValue(player1NameAtom)
  const player2Name = useAtomValue(player2NameAtom)
  const setP2Ratings = useAtomSet(player2RatingsAtom)
  const setR2ObserverRatings = useAtomSet(round2ObserverRatingsAtom)
  const setPhase = useAtomSet(phaseAtom)

  // Round 1: P2 rates P1. Round 2: P1 rates P2.
  const observerName = round === 1 ? player2Name : player1Name
  const subjectName = round === 1 ? player1Name : player2Name

  const [ratings, setLocalRatings] = useState<Record<string, number>>(() =>
    Object.fromEntries(axisKeys.map((key) => [key, 50])),
  )

  const handleRatingChange = useCallback((key: string, value: number) => {
    setLocalRatings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleSubmit = useCallback(() => {
    if (round === 1) {
      setP2Ratings(ratings)
    } else {
      setR2ObserverRatings(ratings)
    }
    setPhase("reveal")
    navigate({ to: "/reveal" })
  }, [ratings, round, setP2Ratings, setR2ObserverRatings, setPhase, navigate])

  return (
    <div className="flex min-h-dvh flex-col bg-secondary">
      <LocaleMenu />

      {/* Header */}
      <div className="px-6 pt-6 pb-2">
        <div className="mb-3 flex items-end justify-end">
          <span className="rounded-full bg-golden px-3 py-1 font-body text-xs font-bold">
            {observerName}
          </span>
        </div>

        <h1 className="mb-1 font-display text-[2rem] leading-tight font-bold">
          {t.observerRateTitle(observerName, subjectName)}
        </h1>
        <p className="font-body text-base text-muted">
          {t.observerRateSubtitle}
        </p>
      </div>

      {/* Carousel */}
      <div className="flex flex-1 items-center px-4 py-4">
        <AxisCarousel
          ratings={ratings}
          onRatingChange={handleRatingChange}
          onComplete={handleSubmit}
          completeLabel={t.observerRateBtn}
        />
      </div>
    </div>
  )
}
