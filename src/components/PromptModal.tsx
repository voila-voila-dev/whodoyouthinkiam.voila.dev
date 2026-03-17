import { useState, useCallback } from "react"
import { useAtomValue } from "@effect-atom/atom-react"
import { biggestGapAxisAtom } from "../atoms/game"
import { axisKeys, type AxisKey } from "../data/axes"
import { useT } from "../i18n/translations"

interface PromptModalProps {
  open: boolean
  onClose: () => void
}

export function PromptModal({ open, onClose }: PromptModalProps) {
  const t = useT()
  const biggestGap = useAtomValue(biggestGapAxisAtom) as AxisKey
  const [promptIndex, setPromptIndex] = useState<number>(() =>
    axisKeys.indexOf(biggestGap),
  )

  const cyclePrompt = useCallback(() => {
    setPromptIndex((prev) => (prev + 1) % axisKeys.length)
  }, [])

  if (!open) return null

  const currentKey = axisKeys[promptIndex] ?? axisKeys[0]
  const prompt = t.prompts[currentKey]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-primary/30"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />

      {/* Bottom sheet */}
      <div className="fixed right-0 bottom-0 left-0 z-50 animate-slide-up rounded-t-2xl border-t-2 border-primary bg-surface px-6 pt-6 pb-10">
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-muted" />

        <p className="mb-8 text-center font-display text-xl leading-relaxed">
          {prompt}
        </p>

        <button
          type="button"
          onClick={cyclePrompt}
          className="mx-auto block font-body text-sm text-muted active:text-accent transition-colors"
        >
          {t.newQuestionLink}
        </button>
      </div>
    </>
  )
}
