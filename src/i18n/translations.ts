import { useAtomValue } from "@effect-atom/atom-react"
import { localeAtom } from "../atoms/game"

export type Locale = "en" | "fr" | "es" | "de"

type TranslationEntry = {
  appName: string
  tagline: string
  welcomeExplain: string
  startBtn: string
  step: (n: number, total: number) => string
  p1Label: string
  p1Title: string
  p1Subtitle: string
  p1Btn: string
  handoffTitle: string
  handoffSubtitle: string
  handoffNamePlaceholder: string
  handoffBtn: string
  handoffPeekWarning: string
  p2Label: string
  p2Title: string
  p2Subtitle: string
  p2Btn: string
  revealTitle: string
  revealSubtitle: string
  youLabel: string
  themLabel: string
  matchScore: (n: number) => string
  matchComment: (n: number) => string
  talkBtn: string
  playAgainBtn: string
  newQuestionLink: string
  nextBtn: string
  backWarning: string
  settingsTitle: string
  languageLabel: string
  axes: Record<string, { left: string; right: string; label: string }>
  prompts: Record<string, string>
}

export const translations: Record<Locale, TranslationEntry> = {
  en: {
    appName: "Who Do You Think I Am?",
    tagline: "Do you see me the way I see myself?",
    welcomeExplain:
      "Rate yourself. Pass the phone. See if your partner sees what you see. The gap is the conversation.",
    startBtn: "Start the Game",
    step: (n: number, total: number) => `${n} of ${total}`,
    p1Label: "YOU",
    p1Title: "How do YOU see yourself?",
    p1Subtitle: "Be honest. No one sees this yet 👀",
    p1Btn: "Done — pass the phone 🤝",
    handoffTitle: "Now pass the phone",
    handoffSubtitle:
      "Player 2: rate your partner — don't peek at their answers!",
    handoffNamePlaceholder: "Your name (optional)",
    handoffBtn: "I'm ready",
    handoffPeekWarning: "No peeking...",
    p2Label: "THEM",
    p2Title: "How do YOU see them?",
    p2Subtitle: "Rate your partner on the same scales — no wrong answers 😌",
    p2Btn: "Reveal the mirror 🪞",
    revealTitle: "The Mirror",
    revealSubtitle: "How you see yourself vs. how they see you",
    youLabel: "You",
    themLabel: "Them",
    matchScore: (n: number) => `Your Match Score: ${n}%`,
    matchComment: (n: number) =>
      n >= 85
        ? "They really GET you. Or one of you is a good liar 👀"
        : n >= 65
          ? "Pretty good mirror — a few blind spots. Conversation incoming 🍿"
          : n >= 45
            ? "Interesting. You two have some exploring to do 🗺️"
            : "Plot twist: you're basically strangers. This is actually exciting 🎭",
    talkBtn: "Talk about it 💬",
    playAgainBtn: "Play again 🔄",
    newQuestionLink: "🎲 New question",
    nextBtn: "Next →",
    backWarning: "Player 2 hasn't finished! Go back anyway?",
    settingsTitle: "Settings",
    languageLabel: "Language",
    axes: {
      expressive: {
        left: "Reserved 🧊",
        right: "Expressive 🔥",
        label: "Expression",
      },
      ambitious: {
        left: "Laid-back 🐢",
        right: "Ambitious ⚡",
        label: "Ambition",
      },
      adventurous: {
        left: "Homebody 🏠",
        right: "Adventurous 🌍",
        label: "Adventure",
      },
      playful: {
        left: "Serious 🤔",
        right: "Playful 🤡",
        label: "Playfulness",
      },
      emotional: {
        left: "Logical 🧠",
        right: "Emotional ❤️",
        label: "Emotion",
      },
      social: {
        left: "Lone wolf 🐺",
        right: "Social 🐝",
        label: "Sociability",
      },
      spontaneous: {
        left: "Planner 📅",
        right: "Spontaneous 🎲",
        label: "Spontaneity",
      },
      openBook: {
        left: "Private 🤫",
        right: "Open book 📢",
        label: "Openness",
      },
    },
    prompts: {
      expressive: "When do you feel most understood by someone?",
      ambitious:
        "What does success actually look like to you in 5 years?",
      adventurous:
        "What's one thing you've always wanted to try but never told anyone?",
      playful: "What makes you laugh so hard you can't breathe?",
      emotional: "When was the last time you cried and what was it about?",
      social: "Do you feel lonely in crowds? When?",
      spontaneous:
        "Tell me about a time you completely surprised yourself.",
      openBook:
        "What's something you rarely share with new people — and why?",
    },
  },
  fr: {
    appName: "Who Do You Think I Am?",
    tagline: "Est-ce que tu me vois comme je me vois ?",
    welcomeExplain:
      "Note-toi toi-même. Passe le téléphone. Vois si votre vision se rejoint. L'écart, c'est la conversation.",
    startBtn: "Commencer le jeu",
    step: (n: number, total: number) => `${n} sur ${total}`,
    p1Label: "TOI",
    p1Title: "Comment tu te vois, toi ?",
    p1Subtitle: "Sois honnête. Personne ne voit ça encore 👀",
    p1Btn: "Terminé — passe le téléphone 🤝",
    handoffTitle: "Passe le téléphone",
    handoffSubtitle: "Joueur 2 : note ton partenaire — sans tricher !",
    handoffNamePlaceholder: "Ton prénom (facultatif)",
    handoffBtn: "Je suis prêt·e",
    handoffPeekWarning: "Pas de triche...",
    p2Label: "EUX",
    p2Title: "Comment tu les vois, eux ?",
    p2Subtitle: "Note ton partenaire — pas de mauvaise réponse 😌",
    p2Btn: "Révéler le miroir 🪞",
    revealTitle: "Le Miroir",
    revealSubtitle: "Comment tu te vois vs. comment ils te voient",
    youLabel: "Toi",
    themLabel: "Eux",
    matchScore: (n: number) => `Votre score : ${n}%`,
    matchComment: (n: number) =>
      n >= 85
        ? "Ils te comprennent vraiment. Ou l'un de vous ment bien 👀"
        : n >= 65
          ? "Plutôt bon miroir — quelques angles morts. Conversation à venir 🍿"
          : n >= 45
            ? "Intéressant. Vous avez du terrain à explorer 🗺️"
            : "Coup de théâtre : vous êtes presque des étrangers. C'est excitant non ? 🎭",
    talkBtn: "En parler 💬",
    playAgainBtn: "Rejouer 🔄",
    newQuestionLink: "🎲 Nouvelle question",
    nextBtn: "Suivant →",
    backWarning: "Le joueur 2 n'a pas terminé ! Revenir quand même ?",
    settingsTitle: "Paramètres",
    languageLabel: "Langue",
    axes: {
      expressive: {
        left: "Réservé·e 🧊",
        right: "Expressif·ve 🔥",
        label: "Expression",
      },
      ambitious: {
        left: "Détendu·e 🐢",
        right: "Ambitieux·se ⚡",
        label: "Ambition",
      },
      adventurous: {
        left: "Casanier·e 🏠",
        right: "Aventurier·e 🌍",
        label: "Aventure",
      },
      playful: {
        left: "Sérieux·se 🤔",
        right: "Joueur·se 🤡",
        label: "Légèreté",
      },
      emotional: {
        left: "Logique 🧠",
        right: "Émotif·ve ❤️",
        label: "Émotion",
      },
      social: {
        left: "Solitaire 🐺",
        right: "Social·e 🐝",
        label: "Sociabilité",
      },
      spontaneous: {
        left: "Organisé·e 📅",
        right: "Spontané·e 🎲",
        label: "Spontanéité",
      },
      openBook: {
        left: "Discret·e 🤫",
        right: "Livre ouvert 📢",
        label: "Ouverture",
      },
    },
    prompts: {
      expressive: "Quand te sens-tu le plus compris·e par quelqu'un ?",
      ambitious:
        "À quoi ressemble vraiment le succès pour toi dans 5 ans ?",
      adventurous:
        "Quelle chose as-tu toujours voulu faire sans l'avoir dit à personne ?",
      playful: "Qu'est-ce qui te fait rire aux larmes ?",
      emotional:
        "La dernière fois que tu as pleuré, c'était pour quoi ?",
      social:
        "Est-ce que tu te sens seul·e dans les foules ? Quand ?",
      spontaneous:
        "Raconte un moment où tu t'es toi-même surpris·e.",
      openBook:
        "Qu'est-ce que tu partages rarement avec de nouvelles personnes — et pourquoi ?",
    },
  },
  es: {
    appName: "Who Do You Think I Am?",
    tagline: "¿Me ves como me veo yo?",
    welcomeExplain:
      "Valórate. Pasa el teléfono. Descubre si tu pareja te ve igual. La diferencia es la conversación.",
    startBtn: "Empezar el juego",
    step: (n: number, total: number) => `${n} de ${total}`,
    p1Label: "TÚ",
    p1Title: "¿Cómo te ves a ti mismo/a?",
    p1Subtitle: "Sé honesto/a. Nadie verá esto todavía 👀",
    p1Btn: "Listo — pasa el teléfono 🤝",
    handoffTitle: "Pasa el teléfono",
    handoffSubtitle:
      "Jugador 2: valora a tu pareja — ¡sin mirar sus respuestas!",
    handoffNamePlaceholder: "Tu nombre (opcional)",
    handoffBtn: "Estoy listo/a",
    handoffPeekWarning: "Sin trampas...",
    p2Label: "ELLO/A",
    p2Title: "¿Cómo los/las ves a ellos/as?",
    p2Subtitle:
      "Valora a tu pareja en las mismas escalas — no hay respuestas incorrectas 😌",
    p2Btn: "Revelar el espejo 🪞",
    revealTitle: "El Espejo",
    revealSubtitle: "Cómo te ves vs. cómo te ven",
    youLabel: "Tú",
    themLabel: "Ello/a",
    matchScore: (n: number) => `Tu puntuación: ${n}%`,
    matchComment: (n: number) =>
      n >= 85
        ? "Realmente te conocen. O uno de los dos miente muy bien 👀"
        : n >= 65
          ? "Buen espejo — algunos puntos ciegos. Conversación en camino 🍿"
          : n >= 45
            ? "Interesante. Tienen terreno por explorar 🗺️"
            : "Giro inesperado: son casi desconocidos. ¡Eso es emocionante! 🎭",
    talkBtn: "Hablar sobre esto 💬",
    playAgainBtn: "Jugar de nuevo 🔄",
    newQuestionLink: "🎲 Nueva pregunta",
    nextBtn: "Siguiente →",
    backWarning: "¡El jugador 2 no ha terminado! ¿Volver de todos modos?",
    settingsTitle: "Ajustes",
    languageLabel: "Idioma",
    axes: {
      expressive: {
        left: "Reservado/a 🧊",
        right: "Expresivo/a 🔥",
        label: "Expresión",
      },
      ambitious: {
        left: "Relajado/a 🐢",
        right: "Ambicioso/a ⚡",
        label: "Ambición",
      },
      adventurous: {
        left: "Hogareño/a 🏠",
        right: "Aventurero/a 🌍",
        label: "Aventura",
      },
      playful: {
        left: "Serio/a 🤔",
        right: "Juguetón/a 🤡",
        label: "Diversión",
      },
      emotional: {
        left: "Lógico/a 🧠",
        right: "Emocional ❤️",
        label: "Emoción",
      },
      social: {
        left: "Solitario/a 🐺",
        right: "Social 🐝",
        label: "Sociabilidad",
      },
      spontaneous: {
        left: "Planificador/a 📅",
        right: "Espontáneo/a 🎲",
        label: "Espontaneidad",
      },
      openBook: {
        left: "Privado/a 🤫",
        right: "Libro abierto 📢",
        label: "Apertura",
      },
    },
    prompts: {
      expressive: "¿Cuándo te sientes más comprendido/a por alguien?",
      ambitious:
        "¿Cómo es realmente el éxito para ti en 5 años?",
      adventurous:
        "¿Qué es algo que siempre has querido hacer pero nunca has dicho?",
      playful: "¿Qué te hace reír hasta no poder respirar?",
      emotional: "¿La última vez que lloraste, por qué fue?",
      social: "¿Te sientes solo/a entre multitudes? ¿Cuándo?",
      spontaneous:
        "Cuéntame un momento en que te sorprendiste a ti mismo/a.",
      openBook:
        "¿Qué es algo que raramente compartes con personas nuevas — y por qué?",
    },
  },
  de: {
    appName: "Who Do You Think I Am?",
    tagline: "Siehst du mich so, wie ich mich selbst sehe?",
    welcomeExplain:
      "Bewerte dich selbst. Gib das Handy weiter. Schau ob dein Partner dasselbe sieht. Der Unterschied ist das Gespräch.",
    startBtn: "Spiel starten",
    step: (n: number, total: number) => `${n} von ${total}`,
    p1Label: "DU",
    p1Title: "Wie siehst du dich selbst?",
    p1Subtitle: "Sei ehrlich. Niemand sieht das noch 👀",
    p1Btn: "Fertig — Handy weitergeben 🤝",
    handoffTitle: "Gib das Handy weiter",
    handoffSubtitle: "Spieler 2: bewerte deinen Partner — nicht spicken!",
    handoffNamePlaceholder: "Dein Name (optional)",
    handoffBtn: "Ich bin bereit",
    handoffPeekWarning: "Nicht spicken...",
    p2Label: "SIE/ER",
    p2Title: "Wie siehst du sie/ihn?",
    p2Subtitle:
      "Bewerte deinen Partner auf denselben Skalen — keine falschen Antworten 😌",
    p2Btn: "Den Spiegel enthüllen 🪞",
    revealTitle: "Der Spiegel",
    revealSubtitle: "Wie du dich siehst vs. wie sie/er dich sieht",
    youLabel: "Du",
    themLabel: "Sie/Er",
    matchScore: (n: number) => `Euer Ergebnis: ${n}%`,
    matchComment: (n: number) =>
      n >= 85
        ? "Sie kennen dich wirklich. Oder einer von euch lügt gut 👀"
        : n >= 65
          ? "Ziemlich guter Spiegel — ein paar blinde Flecken. Gespräch kommt 🍿"
          : n >= 45
            ? "Interessant. Ihr habt noch einiges zu entdecken 🗺️"
            : "Überraschung: ihr seid fast Fremde. Das ist eigentlich aufregend 🎭",
    talkBtn: "Darüber reden 💬",
    playAgainBtn: "Nochmal spielen 🔄",
    newQuestionLink: "🎲 Neue Frage",
    nextBtn: "Weiter →",
    backWarning: "Spieler 2 ist noch nicht fertig! Trotzdem zurück?",
    settingsTitle: "Einstellungen",
    languageLabel: "Sprache",
    axes: {
      expressive: {
        left: "Zurückhaltend 🧊",
        right: "Ausdrucksstark 🔥",
        label: "Ausdruck",
      },
      ambitious: {
        left: "Entspannt 🐢",
        right: "Ehrgeizig ⚡",
        label: "Ehrgeiz",
      },
      adventurous: {
        left: "Häuslich 🏠",
        right: "Abenteuerlustig 🌍",
        label: "Abenteuer",
      },
      playful: {
        left: "Ernst 🤔",
        right: "Verspielt 🤡",
        label: "Verspieltheit",
      },
      emotional: {
        left: "Logisch 🧠",
        right: "Emotional ❤️",
        label: "Emotion",
      },
      social: {
        left: "Einzelgänger 🐺",
        right: "Gesellig 🐝",
        label: "Geselligkeit",
      },
      spontaneous: {
        left: "Planer 📅",
        right: "Spontan 🎲",
        label: "Spontanität",
      },
      openBook: {
        left: "Privat 🤫",
        right: "Offenes Buch 📢",
        label: "Offenheit",
      },
    },
    prompts: {
      expressive:
        "Wann fühlst du dich von jemandem am meisten verstanden?",
      ambitious:
        "Wie sieht Erfolg für dich in 5 Jahren wirklich aus?",
      adventurous:
        "Was wolltest du schon immer tun, hast es aber niemandem gesagt?",
      playful:
        "Was lässt dich so lachen, dass du nicht mehr atmen kannst?",
      emotional: "Wann hast du zuletzt geweint und warum?",
      social: "Fühlst du dich in Menschenmengen einsam? Wann?",
      spontaneous:
        "Erzähl mir von einem Moment, in dem du dich selbst überrascht hast.",
      openBook:
        "Was teilst du selten mit neuen Menschen — und warum?",
    },
  },
}

export const useT = () => {
  const locale = useAtomValue(localeAtom)
  return translations[locale] ?? translations.en
}
