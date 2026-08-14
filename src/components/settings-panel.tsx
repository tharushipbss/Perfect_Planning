import { Moon, Contrast, ArrowLeftRight, PanelLeft, RotateCcw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  useAppSettings,
  type AppSettings,
  type ThemePreset,
  type FontChoice,
} from "@/hooks/use-app-settings";

const toggles: { key: keyof AppSettings; label: string; icon: typeof Moon }[] = [
  { key: "darkMode", label: "Dark mode", icon: Moon },
  { key: "highContrast", label: "Contrast", icon: Contrast },
  { key: "rtl", label: "Right to left", icon: ArrowLeftRight },
  { key: "compact", label: "Compact", icon: PanelLeft },
];

const layouts: { value: AppSettings["navLayout"]; label: string }[] = [
  { value: "expanded", label: "Expanded" },
  { value: "condensed", label: "Condensed" },
  { value: "icons", label: "Icons" },
];

const presets: { value: ThemePreset; swatch: string; tint: string }[] = [
  { value: "green", swatch: "oklch(0.6 0.14 155)", tint: "oklch(0.93 0.06 150)" },
  { value: "blue", swatch: "oklch(0.58 0.17 255)", tint: "oklch(0.93 0.05 250)" },
  { value: "purple", swatch: "oklch(0.55 0.2 300)", tint: "oklch(0.93 0.05 300)" },
  { value: "indigo", swatch: "oklch(0.5 0.19 270)", tint: "oklch(0.93 0.05 272)" },
  { value: "amber", swatch: "oklch(0.75 0.16 75)", tint: "oklch(0.94 0.06 85)" },
  { value: "red", swatch: "oklch(0.6 0.21 20)", tint: "oklch(0.94 0.05 20)" },
];

const fonts: { value: FontChoice; label: string; stack: string }[] = [
  { value: "public-sans", label: "Public Sans", stack: "'Public Sans', sans-serif" },
  { value: "inter", label: "Inter", stack: "'Inter', sans-serif" },
  { value: "dm-sans", label: "DM Sans", stack: "'DM Sans', sans-serif" },
  { value: "nunito-sans", label: "Nunito Sans", stack: "'Nunito Sans', sans-serif" },
];

export function SettingsPanel({ children }: { children: React.ReactNode }) {
  const { settings, setSetting, reset } = useAppSettings();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-md">
        <div className="flex items-center justify-between px-5 py-4 pr-14">
          <SheetTitle className="text-xl font-semibold">Settings</SheetTitle>
          <button
            onClick={reset}
            aria-label="Reset settings"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 px-5">
          {toggles.map(({ key, label, icon: Icon }) => {
            const checked = settings[key] as boolean;
            return (
              <div
                key={key}
                onClick={() => setSetting(key, !checked as never)}
                className={`cursor-pointer rounded-xl border p-4 text-left transition-colors ${
                  checked
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:bg-secondary"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <Icon className="h-5 w-5 shrink-0 text-foreground" />
                  <Switch
                    checked={checked}
                    onCheckedChange={(v) => setSetting(key, v as never)}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={label}
                  />
                </div>
                <span className="mt-6 block text-sm font-medium">{label}</span>
              </div>
            );
          })}
        </div>

        <div className="mx-5 my-5 rounded-xl border border-border bg-card p-4">
          <span className="inline-flex rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
            Nav
          </span>

          <p className="mt-4 text-xs text-muted-foreground">Layout</p>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {layouts.map((l) => (
              <button
                key={l.value}
                onClick={() => setSetting("navLayout", l.value)}
                className={`rounded-lg border p-3 text-xs transition-colors ${
                  settings.navLayout === l.value
                    ? "border-primary bg-primary/5 font-medium text-foreground"
                    : "border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <p className="mt-5 text-xs text-muted-foreground">Color</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {(["integrate", "apparent"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setSetting("navColor", c)}
                className={`rounded-lg border p-3 text-sm capitalize transition-colors ${
                  settings.navColor === c
                    ? "border-primary bg-primary/5 font-medium text-foreground"
                    : "border-border text-muted-foreground hover:bg-secondary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-5 mb-5 rounded-xl border border-border bg-card p-4">
          <span className="inline-flex rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
            Presets
          </span>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {presets.map((p) => (
              <button
                key={p.value}
                onClick={() => setSetting("preset", p.value)}
                aria-label={`${p.value} theme`}
                aria-pressed={settings.preset === p.value}
                className={`flex h-16 items-center justify-center rounded-xl border transition-colors ${
                  settings.preset === p.value
                    ? "border-primary bg-primary/5"
                    : "border-transparent hover:bg-secondary"
                }`}
              >
                <span
                  className="flex h-8 w-9 items-center gap-1 rounded-md p-1"
                  style={{ backgroundColor: p.tint }}
                >
                  <span className="h-full w-1.5 rounded-sm" style={{ backgroundColor: p.swatch }} />
                  <span className="flex flex-1 flex-col gap-1">
                    <span
                      className="h-1 w-full rounded-full"
                      style={{ backgroundColor: p.swatch }}
                    />
                    <span
                      className="h-1 w-3/5 rounded-full opacity-60"
                      style={{ backgroundColor: p.swatch }}
                    />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mx-5 mb-8 rounded-xl border border-border bg-card p-4">
          <span className="inline-flex rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
            Font
          </span>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {fonts.map((f) => (
              <button
                key={f.value}
                onClick={() => setSetting("font", f.value)}
                aria-pressed={settings.font === f.value}
                style={{ fontFamily: f.stack }}
                className={`rounded-xl border p-4 transition-colors ${
                  settings.font === f.value
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-transparent text-muted-foreground hover:bg-secondary"
                }`}
              >
                <span className="block text-xl font-semibold">
                  A<span className="text-sm">a</span>
                </span>
                <span className="mt-2 block text-xs font-medium">{f.label}</span>
              </button>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
