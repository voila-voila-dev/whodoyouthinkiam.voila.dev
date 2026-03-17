import { Atom } from "@effect-atom/atom-react"

// Locale atom
export const localeAtom = Atom.make<"en" | "fr" | "es" | "de">("en").pipe(
  Atom.keepAlive,
)

// Player names
export const player1NameAtom = Atom.make("").pipe(Atom.keepAlive)
export const player2NameAtom = Atom.make("").pipe(Atom.keepAlive)

// Round tracking (1 = P1 is subject, 2 = P2 is subject after exchange)
export type Round = 1 | 2
export const roundAtom = Atom.make<Round>(1).pipe(Atom.keepAlive)

// Round 1 ratings: P1 rates self, P2 rates P1
export const player1RatingsAtom = Atom.make<Record<string, number>>({}).pipe(
  Atom.keepAlive,
)
export const player2RatingsAtom = Atom.make<Record<string, number>>({}).pipe(
  Atom.keepAlive,
)

// Round 2 ratings: P2 rates self, P1 rates P2
export const round2SelfRatingsAtom = Atom.make<Record<string, number>>(
  {},
).pipe(Atom.keepAlive)
export const round2ObserverRatingsAtom = Atom.make<Record<string, number>>(
  {},
).pipe(Atom.keepAlive)

// Game phase
export type Phase =
  | "welcome"
  | "setup"
  | "handoff-self"
  | "self-rating"
  | "handoff-observer"
  | "observer-rating"
  | "reveal"
export const phaseAtom = Atom.make<Phase>("welcome").pipe(Atom.keepAlive)

// Derived: absolute gap per axis (round-aware)
export const gapAtom = Atom.make((get: Atom.Context) => {
  const round = get(roundAtom)
  const selfRatings =
    round === 1 ? get(player1RatingsAtom) : get(round2SelfRatingsAtom)
  const observerRatings =
    round === 1 ? get(player2RatingsAtom) : get(round2ObserverRatingsAtom)
  return Object.fromEntries(
    Object.keys(selfRatings).map((key) => [
      key,
      Math.abs((observerRatings[key] ?? 50) - (selfRatings[key] ?? 50)),
    ]),
  )
})

// Derived: overall match score 0-100
export const matchScoreAtom = Atom.map(gapAtom, (gaps) => {
  const values = Object.values(gaps)
  if (values.length === 0) return 100
  const avgGap = values.reduce((a, b) => a + b, 0) / values.length
  return Math.round(100 - avgGap)
})
