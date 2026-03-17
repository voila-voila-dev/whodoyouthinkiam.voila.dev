import { useState, useCallback, useRef } from "react"
import { AxisSlider } from "./AxisSlider"
import { axisKeys } from "../data/axes"
import { useT } from "../i18n/translations"

interface AxisCarouselProps {
  ratings: Record<string, number>
  onRatingChange: (key: string, value: number) => void
}

export function AxisCarousel({ ratings, onRatingChange }: AxisCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const t = useT()
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const goTo = useCallback(
    (index: number) => {
      if (index >= 0 && index < axisKeys.length) {
        setCurrentIndex(index)
      }
    },
    [],
  )

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50
    if (diff > threshold) {
      setCurrentIndex((prev) => Math.min(prev + 1, axisKeys.length - 1))
    } else if (diff < -threshold) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
  }, [])

  const currentKey = axisKeys[currentIndex]
  const axisT = t.axes[currentKey]

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <AxisSlider
        axisKey={currentKey}
        label={axisT.label}
        leftLabel={axisT.left}
        rightLabel={axisT.right}
        value={ratings[currentKey] ?? 50}
        onChange={onRatingChange}
        rotation={currentIndex % 2 === 0 ? "odd" : "even"}
      />

      {/* Dot indicators */}
      <div className="mt-6 flex gap-2">
        {axisKeys.map((key, i) => (
          <button
            key={key}
            type="button"
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full border border-primary transition-colors ${
              i === currentIndex ? "bg-primary" : "bg-transparent"
            }`}
            aria-label={`Go to axis ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow navigation for desktop */}
      <div className="mt-4 flex gap-4">
        <button
          type="button"
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          className="rounded-full border-2 border-primary bg-surface px-4 py-2 font-body text-sm disabled:opacity-30 active:scale-95 transition-transform"
        >
          ←
        </button>
        <span className="flex items-center font-body text-sm text-muted">
          {t.step(currentIndex + 1, axisKeys.length)}
        </span>
        <button
          type="button"
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex === axisKeys.length - 1}
          className="rounded-full border-2 border-primary bg-surface px-4 py-2 font-body text-sm disabled:opacity-30 active:scale-95 transition-transform"
        >
          →
        </button>
      </div>
    </div>
  )
}
