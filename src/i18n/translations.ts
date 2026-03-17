import { useAtomValue } from "@effect-atom/atom-react"
import { localeAtom } from "../atoms/game"

export type Locale = "en" | "fr" | "es" | "de"

type TranslationEntry = {
  appName: string
  tagline: string
  welcomeExplain: string
  startBtn: string
  step: (n: number, total: number) => string
  nextBtn: string
  continueBtn: string
  setupP1Title: string
  setupP1Placeholder: string
  setupP2Title: string
  setupP2Placeholder: string
  handoffTitle: (name: string) => string
  handoffSubtitle: (name: string) => string
  handoffPeekWarning: string
  handoffBtn: string
  selfRateTitle: (name: string) => string
  selfRateSubtitle: string
  selfRateBtn: string
  observerRateTitle: (observer: string, subject: string) => string
  observerRateSubtitle: string
  observerRateBtn: string
  revealTitle: string
  revealSubtitle: (selfName: string, observerName: string) => string
  matchScore: (n: number) => string
  matchComment: (n: number) => string
  exchangeBtn: string
  playAgainBtn: string
  settingsTitle: string
  languageLabel: string
  axes: Record<string, { left: string; right: string; label: string }>
}

export const translations: Record<Locale, TranslationEntry> = {
  en: {
    appName: "Who Do You Think I Am?",
    tagline: "Do you see me the way I see myself?",
    welcomeExplain:
      "Rate yourself. Pass the phone. See if your partner sees what you see. The gap is the conversation.",
    startBtn: "Start the Game",
    step: (n: number, total: number) => `${n} of ${total}`,
    nextBtn: "Next \u2192",
    continueBtn: "Continue",
    setupP1Title: "What\u2019s your name?",
    setupP1Placeholder: "Your first name",
    setupP2Title: "And your partner\u2019s name?",
    setupP2Placeholder: "Their first name",
    handoffTitle: (name: string) => `Pass the phone to ${name}`,
    handoffSubtitle: (name: string) =>
      `${name}, get ready \u2014 don\u2019t peek at their answers!`,
    handoffPeekWarning: "No peeking...",
    handoffBtn: "I\u2019m ready",
    selfRateTitle: (name: string) => `${name}, how do you see yourself?`,
    selfRateSubtitle: "Be honest. No one sees this yet \uD83D\uDC40",
    selfRateBtn: "Done \u2014 pass the phone \uD83E\uDD1D",
    observerRateTitle: (observer: string, subject: string) =>
      `${observer}, how do you see ${subject}?`,
    observerRateSubtitle: "Rate them \u2014 no wrong answers \uD83D\uDE0C",
    observerRateBtn: "Reveal the mirror \uD83E\uDE9E",
    revealTitle: "The Mirror",
    revealSubtitle: (selfName: string, observerName: string) =>
      `How ${selfName} sees themselves vs. how ${observerName} sees them`,
    matchScore: (n: number) => `Match Score: ${n}%`,
    matchComment: (n: number) =>
      n >= 85
        ? "They really GET you. Or one of you is a good liar \uD83D\uDC40"
        : n >= 65
          ? "Pretty good mirror \u2014 a few blind spots. Conversation incoming \uD83C\uDF7F"
          : n >= 45
            ? "Interesting. You two have some exploring to do \uD83D\uDDFA\uFE0F"
            : "Plot twist: you\u2019re basically strangers. This is actually exciting \uD83C\uDFAD",
    exchangeBtn: "Exchange \uD83D\uDD04",
    playAgainBtn: "Play again \uD83D\uDD04",
    settingsTitle: "Settings",
    languageLabel: "Language",
    axes: {
      expressive: {
        left: "Reserved \uD83E\uDDCA",
        right: "Expressive \uD83D\uDD25",
        label: "Expression",
      },
      ambitious: {
        left: "Laid-back \uD83D\uDC22",
        right: "Ambitious \u26A1",
        label: "Ambition",
      },
      adventurous: {
        left: "Homebody \uD83C\uDFE0",
        right: "Adventurous \uD83C\uDF0D",
        label: "Adventure",
      },
      playful: {
        left: "Serious \uD83E\uDD14",
        right: "Playful \uD83E\uDD21",
        label: "Playfulness",
      },
      emotional: {
        left: "Logical \uD83E\uDDE0",
        right: "Emotional \u2764\uFE0F",
        label: "Emotion",
      },
      social: {
        left: "Lone wolf \uD83D\uDC3A",
        right: "Social \uD83D\uDC1D",
        label: "Sociability",
      },
      spontaneous: {
        left: "Planner \uD83D\uDCC5",
        right: "Spontaneous \uD83C\uDFB2",
        label: "Spontaneity",
      },
      openBook: {
        left: "Private \uD83E\uDD2B",
        right: "Open book \uD83D\uDCE2",
        label: "Openness",
      },
    },
  },
  fr: {
    appName: "Who Do You Think I Am?",
    tagline: "Est-ce que tu me vois comme je me vois ?",
    welcomeExplain:
      "Note-toi toi-m\u00EAme. Passe le t\u00E9l\u00E9phone. Vois si votre vision se rejoint. L\u2019\u00E9cart, c\u2019est la conversation.",
    startBtn: "Commencer le jeu",
    step: (n: number, total: number) => `${n} sur ${total}`,
    nextBtn: "Suivant \u2192",
    continueBtn: "Continuer",
    setupP1Title: "Comment tu t\u2019appelles ?",
    setupP1Placeholder: "Ton pr\u00E9nom",
    setupP2Title: "Et ton/ta partenaire ?",
    setupP2Placeholder: "Son pr\u00E9nom",
    handoffTitle: (name: string) => `Passe le t\u00E9l\u00E9phone \u00E0 ${name}`,
    handoffSubtitle: (name: string) =>
      `${name}, pr\u00E9pare-toi \u2014 pas de triche !`,
    handoffPeekWarning: "Pas de triche...",
    handoffBtn: "Je suis pr\u00EAt\u00B7e",
    selfRateTitle: (name: string) => `${name}, comment tu te vois ?`,
    selfRateSubtitle: "Sois honn\u00EAte. Personne ne voit \u00E7a encore \uD83D\uDC40",
    selfRateBtn: "Termin\u00E9 \u2014 passe le t\u00E9l\u00E9phone \uD83E\uDD1D",
    observerRateTitle: (observer: string, subject: string) =>
      `${observer}, comment tu vois ${subject} ?`,
    observerRateSubtitle: "Note-le/la \u2014 pas de mauvaise r\u00E9ponse \uD83D\uDE0C",
    observerRateBtn: "R\u00E9v\u00E9ler le miroir \uD83E\uDE9E",
    revealTitle: "Le Miroir",
    revealSubtitle: (selfName: string, observerName: string) =>
      `Comment ${selfName} se voit vs. comment ${observerName} le/la voit`,
    matchScore: (n: number) => `Score : ${n}%`,
    matchComment: (n: number) =>
      n >= 85
        ? "Il/elle te comprend vraiment. Ou l\u2019un de vous ment bien \uD83D\uDC40"
        : n >= 65
          ? "Plut\u00F4t bon miroir \u2014 quelques angles morts \uD83C\uDF7F"
          : n >= 45
            ? "Int\u00E9ressant. Vous avez du terrain \u00E0 explorer \uD83D\uDDFA\uFE0F"
            : "Coup de th\u00E9\u00E2tre : vous \u00EAtes presque des \u00E9trangers \uD83C\uDFAD",
    exchangeBtn: "\u00C9change \uD83D\uDD04",
    playAgainBtn: "Rejouer \uD83D\uDD04",
    settingsTitle: "Param\u00E8tres",
    languageLabel: "Langue",
    axes: {
      expressive: {
        left: "R\u00E9serv\u00E9\u00B7e \uD83E\uDDCA",
        right: "Expressif\u00B7ve \uD83D\uDD25",
        label: "Expression",
      },
      ambitious: {
        left: "D\u00E9tendu\u00B7e \uD83D\uDC22",
        right: "Ambitieux\u00B7se \u26A1",
        label: "Ambition",
      },
      adventurous: {
        left: "Casanier\u00B7e \uD83C\uDFE0",
        right: "Aventurier\u00B7e \uD83C\uDF0D",
        label: "Aventure",
      },
      playful: {
        left: "S\u00E9rieux\u00B7se \uD83E\uDD14",
        right: "Joueur\u00B7se \uD83E\uDD21",
        label: "L\u00E9g\u00E8ret\u00E9",
      },
      emotional: {
        left: "Logique \uD83E\uDDE0",
        right: "\u00C9motif\u00B7ve \u2764\uFE0F",
        label: "\u00C9motion",
      },
      social: {
        left: "Solitaire \uD83D\uDC3A",
        right: "Social\u00B7e \uD83D\uDC1D",
        label: "Sociabilit\u00E9",
      },
      spontaneous: {
        left: "Organis\u00E9\u00B7e \uD83D\uDCC5",
        right: "Spontan\u00E9\u00B7e \uD83C\uDFB2",
        label: "Spontan\u00E9it\u00E9",
      },
      openBook: {
        left: "Discret\u00B7e \uD83E\uDD2B",
        right: "Livre ouvert \uD83D\uDCE2",
        label: "Ouverture",
      },
    },
  },
  es: {
    appName: "Who Do You Think I Am?",
    tagline: "\u00BFMe ves como me veo yo?",
    welcomeExplain:
      "Val\u00F3rate. Pasa el tel\u00E9fono. Descubre si tu pareja te ve igual. La diferencia es la conversaci\u00F3n.",
    startBtn: "Empezar el juego",
    step: (n: number, total: number) => `${n} de ${total}`,
    nextBtn: "Siguiente \u2192",
    continueBtn: "Continuar",
    setupP1Title: "\u00BFC\u00F3mo te llamas?",
    setupP1Placeholder: "Tu nombre",
    setupP2Title: "\u00BFY tu pareja?",
    setupP2Placeholder: "Su nombre",
    handoffTitle: (name: string) => `Pasa el tel\u00E9fono a ${name}`,
    handoffSubtitle: (name: string) =>
      `${name}, prep\u00E1rate \u2014 \u00A1sin mirar sus respuestas!`,
    handoffPeekWarning: "Sin trampas...",
    handoffBtn: "Estoy listo/a",
    selfRateTitle: (name: string) => `${name}, \u00BFc\u00F3mo te ves a ti mismo/a?`,
    selfRateSubtitle: "S\u00E9 honesto/a. Nadie ver\u00E1 esto todav\u00EDa \uD83D\uDC40",
    selfRateBtn: "Listo \u2014 pasa el tel\u00E9fono \uD83E\uDD1D",
    observerRateTitle: (observer: string, subject: string) =>
      `${observer}, \u00BFc\u00F3mo ves a ${subject}?`,
    observerRateSubtitle:
      "Val\u00F3ralo/a \u2014 no hay respuestas incorrectas \uD83D\uDE0C",
    observerRateBtn: "Revelar el espejo \uD83E\uDE9E",
    revealTitle: "El Espejo",
    revealSubtitle: (selfName: string, observerName: string) =>
      `C\u00F3mo se ve ${selfName} vs. c\u00F3mo lo/la ve ${observerName}`,
    matchScore: (n: number) => `Puntuaci\u00F3n: ${n}%`,
    matchComment: (n: number) =>
      n >= 85
        ? "Realmente te conocen. O uno de los dos miente muy bien \uD83D\uDC40"
        : n >= 65
          ? "Buen espejo \u2014 algunos puntos ciegos \uD83C\uDF7F"
          : n >= 45
            ? "Interesante. Tienen terreno por explorar \uD83D\uDDFA\uFE0F"
            : "Giro inesperado: son casi desconocidos. \u00A1Eso es emocionante! \uD83C\uDFAD",
    exchangeBtn: "Intercambio \uD83D\uDD04",
    playAgainBtn: "Jugar de nuevo \uD83D\uDD04",
    settingsTitle: "Ajustes",
    languageLabel: "Idioma",
    axes: {
      expressive: {
        left: "Reservado/a \uD83E\uDDCA",
        right: "Expresivo/a \uD83D\uDD25",
        label: "Expresi\u00F3n",
      },
      ambitious: {
        left: "Relajado/a \uD83D\uDC22",
        right: "Ambicioso/a \u26A1",
        label: "Ambici\u00F3n",
      },
      adventurous: {
        left: "Hogare\u00F1o/a \uD83C\uDFE0",
        right: "Aventurero/a \uD83C\uDF0D",
        label: "Aventura",
      },
      playful: {
        left: "Serio/a \uD83E\uDD14",
        right: "Juguet\u00F3n/a \uD83E\uDD21",
        label: "Diversi\u00F3n",
      },
      emotional: {
        left: "L\u00F3gico/a \uD83E\uDDE0",
        right: "Emocional \u2764\uFE0F",
        label: "Emoci\u00F3n",
      },
      social: {
        left: "Solitario/a \uD83D\uDC3A",
        right: "Social \uD83D\uDC1D",
        label: "Sociabilidad",
      },
      spontaneous: {
        left: "Planificador/a \uD83D\uDCC5",
        right: "Espont\u00E1neo/a \uD83C\uDFB2",
        label: "Espontaneidad",
      },
      openBook: {
        left: "Privado/a \uD83E\uDD2B",
        right: "Libro abierto \uD83D\uDCE2",
        label: "Apertura",
      },
    },
  },
  de: {
    appName: "Who Do You Think I Am?",
    tagline: "Siehst du mich so, wie ich mich selbst sehe?",
    welcomeExplain:
      "Bewerte dich selbst. Gib das Handy weiter. Schau ob dein Partner dasselbe sieht. Der Unterschied ist das Gespr\u00E4ch.",
    startBtn: "Spiel starten",
    step: (n: number, total: number) => `${n} von ${total}`,
    nextBtn: "Weiter \u2192",
    continueBtn: "Weiter",
    setupP1Title: "Wie hei\u00DFt du?",
    setupP1Placeholder: "Dein Vorname",
    setupP2Title: "Und dein/e Partner/in?",
    setupP2Placeholder: "Sein/ihr Vorname",
    handoffTitle: (name: string) => `Gib das Handy an ${name}`,
    handoffSubtitle: (name: string) =>
      `${name}, mach dich bereit \u2014 nicht spicken!`,
    handoffPeekWarning: "Nicht spicken...",
    handoffBtn: "Ich bin bereit",
    selfRateTitle: (name: string) => `${name}, wie siehst du dich selbst?`,
    selfRateSubtitle: "Sei ehrlich. Niemand sieht das noch \uD83D\uDC40",
    selfRateBtn: "Fertig \u2014 Handy weitergeben \uD83E\uDD1D",
    observerRateTitle: (observer: string, subject: string) =>
      `${observer}, wie siehst du ${subject}?`,
    observerRateSubtitle:
      "Bewerte sie/ihn \u2014 keine falschen Antworten \uD83D\uDE0C",
    observerRateBtn: "Den Spiegel enth\u00FCllen \uD83E\uDE9E",
    revealTitle: "Der Spiegel",
    revealSubtitle: (selfName: string, observerName: string) =>
      `Wie ${selfName} sich sieht vs. wie ${observerName} sie/ihn sieht`,
    matchScore: (n: number) => `Ergebnis: ${n}%`,
    matchComment: (n: number) =>
      n >= 85
        ? "Sie kennen dich wirklich. Oder einer von euch l\u00FCgt gut \uD83D\uDC40"
        : n >= 65
          ? "Ziemlich guter Spiegel \u2014 ein paar blinde Flecken \uD83C\uDF7F"
          : n >= 45
            ? "Interessant. Ihr habt noch einiges zu entdecken \uD83D\uDDFA\uFE0F"
            : "\u00DCberraschung: ihr seid fast Fremde. Das ist eigentlich aufregend \uD83C\uDFAD",
    exchangeBtn: "Tauschen \uD83D\uDD04",
    playAgainBtn: "Nochmal spielen \uD83D\uDD04",
    settingsTitle: "Einstellungen",
    languageLabel: "Sprache",
    axes: {
      expressive: {
        left: "Zur\u00FCckhaltend \uD83E\uDDCA",
        right: "Ausdrucksstark \uD83D\uDD25",
        label: "Ausdruck",
      },
      ambitious: {
        left: "Entspannt \uD83D\uDC22",
        right: "Ehrgeizig \u26A1",
        label: "Ehrgeiz",
      },
      adventurous: {
        left: "H\u00E4uslich \uD83C\uDFE0",
        right: "Abenteuerlustig \uD83C\uDF0D",
        label: "Abenteuer",
      },
      playful: {
        left: "Ernst \uD83E\uDD14",
        right: "Verspielt \uD83E\uDD21",
        label: "Verspieltheit",
      },
      emotional: {
        left: "Logisch \uD83E\uDDE0",
        right: "Emotional \u2764\uFE0F",
        label: "Emotion",
      },
      social: {
        left: "Einzelg\u00E4nger \uD83D\uDC3A",
        right: "Gesellig \uD83D\uDC1D",
        label: "Geselligkeit",
      },
      spontaneous: {
        left: "Planer \uD83D\uDCC5",
        right: "Spontan \uD83C\uDFB2",
        label: "Spontanit\u00E4t",
      },
      openBook: {
        left: "Privat \uD83E\uDD2B",
        right: "Offenes Buch \uD83D\uDCE2",
        label: "Offenheit",
      },
    },
  },
}

export const useT = () => {
  const locale = useAtomValue(localeAtom)
  return translations[locale] ?? translations.en
}
