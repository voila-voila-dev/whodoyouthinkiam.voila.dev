import { Atom } from "@effect-atom/atom-react"

// Locale atom
export const localeAtom = Atom.make<"en" | "fr" | "es" | "de">("en").pipe(
  Atom.keepAlive,
)

// Player names
export const player1NameAtom = Atom.make("").pipe(Atom.keepAlive)
export const player2NameAtom = Atom.make("").pipe(Atom.keepAlive)

// Ratings: Record<axisKey, 0–100>
export const player1RatingsAtom = Atom.make<Record<string, number>>({}).pipe(
  Atom.keepAlive,
)
export const player2RatingsAtom = Atom.make<Record<string, number>>({}).pipe(
  Atom.keepAlive,
)

// Game phase
export type Phase = "welcome" | "p1rating" | "handoff" | "p2rating" | "reveal"
export const phaseAtom = Atom.make<Phase>("welcome").pipe(Atom.keepAlive)

// Derived: absolute gap per axis
export const gapAtom = Atom.make((get: Atom.Context) => {
  const r1 = get(player1RatingsAtom)
  const r2 = get(player2RatingsAtom)
  return Object.fromEntries(
    Object.keys(r1).map((key) => [
      key,
      Math.abs((r2[key] ?? 50) - (r1[key] ?? 50)),
    ]),
  )
})

// Derived: overall match score 0–100
export const matchScoreAtom = Atom.map(gapAtom, (gaps) => {
  const values = Object.values(gaps)
  if (values.length === 0) return 100
  const avgGap = values.reduce((a, b) => a + b, 0) / values.length
  return Math.round(100 - avgGap)
})

// Derived: axis key with the biggest gap
export const biggestGapAxisAtom = Atom.map(gapAtom, (gaps) =>
  Object.entries(gaps).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "expressive",
)
