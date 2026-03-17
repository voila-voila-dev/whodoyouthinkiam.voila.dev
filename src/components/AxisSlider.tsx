import { useCallback } from "react"

interface AxisSliderProps {
  axisKey: string
  label: string
  leftLabel: string
  rightLabel: string
  value: number
  onChange: (key: string, value: number) => void
  rotation?: "odd" | "even"
}

export function AxisSlider({
  axisKey,
  label,
  leftLabel,
  rightLabel,
  value,
  onChange,
}: AxisSliderProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(axisKey, Number(e.target.value))
    },
    [axisKey, onChange],
  )

  return (
    <div
      className="mx-auto w-full max-w-sm rounded-2xl border-2 border-primary bg-surface p-6 shadow-md"
    >
      <h3 className="mb-6 text-center font-display text-2xl font-semibold">
        {label}
      </h3>

      <div className="mb-2">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={handleChange}
          className="w-full"
          style={{
            background: `linear-gradient(to right, var(--color-lavender), var(--color-golden))`,
          }}
        />
      </div>

      <div className="flex justify-between text-xs font-body text-primary/70">
        <span className="max-w-[40%]">{leftLabel}</span>
        <span className="max-w-[40%] text-right">{rightLabel}</span>
      </div>
    </div>
  )
}
