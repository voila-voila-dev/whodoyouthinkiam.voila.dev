import { useState, useCallback } from "react"
import { useAtom } from "@effect-atom/atom-react"
import { localeAtom } from "../atoms/game"
import type { Locale } from "../i18n/translations"
import { useT } from "../i18n/translations"

const localeOptions: { code: Locale; flag: string; name: string }[] = [
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
]

export function LocaleMenu() {
  const [open, setOpen] = useState(false)
  const [locale, setLocale] = useAtom(localeAtom)
  const t = useT()

  const handleSelect = useCallback(
    (code: Locale) => {
      setLocale(code)
      setOpen(false)
    },
    [setLocale],
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-surface text-lg shadow-md active:scale-95 transition-transform"
        aria-label={t.languageLabel}
      >
        🌐
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-50 bg-primary/30"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          />

          {/* Bottom sheet */}
          <div className="fixed right-0 bottom-0 left-0 z-50 animate-slide-up rounded-t-2xl border-t-2 border-primary bg-surface px-6 pt-4 pb-8">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted" />
            <p className="mb-3 text-sm text-muted font-body">
              {t.languageLabel}
            </p>
            <div className="flex flex-col gap-1">
              {localeOptions.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => handleSelect(opt.code)}
                  className={`flex min-h-12 items-center justify-between rounded-xl px-4 py-3 text-left font-body text-base transition-colors ${
                    locale === opt.code
                      ? "bg-secondary text-accent font-bold"
                      : "hover:bg-secondary/50"
                  }`}
                >
                  <span>
                    {opt.flag}&nbsp;&nbsp;{opt.name}
                  </span>
                  {locale === opt.code && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
