export const axisKeys = [
  "expressive",
  "ambitious",
  "adventurous",
  "playful",
  "emotional",
  "social",
  "spontaneous",
  "openBook",
] as const

export type AxisKey = (typeof axisKeys)[number]
