import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { LocaleMenu } from "../components/LocaleMenu"
import { useT } from "../i18n/translations"

export const Route = createFileRoute("/")({ component: WelcomeScreen })

function WelcomeScreen() {
  const t = useT()
  const navigate = useNavigate()

  return (
    <div className="bg-dot-grid flex min-h-dvh flex-col items-center justify-center bg-secondary px-6">
      <LocaleMenu />

      <div className="animate-float mb-8 text-6xl">🪞</div>

      <h1 className="mb-3 text-center font-display text-[2.5rem] leading-tight font-bold">
        {t.appName}
      </h1>

      <p className="mb-4 text-center font-display text-lg italic text-primary/70">
        {t.tagline}
      </p>

      <p className="mb-10 max-w-xs text-center font-body text-base text-muted">
        {t.welcomeExplain}
      </p>

      <button
        type="button"
        onClick={() => navigate({ to: "/player-one" })}
        className="rounded-2xl border-2 border-primary bg-accent px-8 py-4 font-body text-lg font-bold text-surface shadow-md active:scale-95 transition-transform"
      >
        {t.startBtn}
      </button>
    </div>
  )
}
