import { useState, useCallback } from "react"
import { AxisSlider } from "./AxisSlider"
import { axisKeys } from "../data/axes"
import { useT } from "../i18n/translations"

interface AxisCarouselProps {
  ratings: Record<string, number>
  onRatingChange: (key: string, value: number) => void
  onComplete: () => void
  completeLabel: string
}

export function AxisCarousel({ ratings, onRatingChange, onComplete, completeLabel }: AxisCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const t = useT()

  const isLast = currentIndex === axisKeys.length - 1

  const handleNext = useCallback(() => {
    if (isLast) {
      onComplete()
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [isLast, onComplete])

  const currentKey = axisKeys[currentIndex]
  const axisT = t.axes[currentKey]

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
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
          <div
            key={key}
            className={`h-2.5 w-2.5 rounded-full border border-primary transition-colors ${
              i === currentIndex ? "bg-primary" : "bg-transparent"
            }`}
          />
        ))}
      </div>

      {/* Step counter */}
      <span className="mt-3 font-body text-sm text-muted">
        {t.step(currentIndex + 1, axisKeys.length)}
      </span>

      {/* Next / Complete button */}
      <button
        type="button"
        onClick={handleNext}
        className="mt-4 w-full max-w-sm rounded-2xl border-2 border-primary bg-accent px-6 py-4 font-body text-base font-bold text-surface active:scale-[0.98] transition-transform"
      >
        {isLast ? completeLabel : t.nextBtn}
      </button>
    </div>
  )
}
