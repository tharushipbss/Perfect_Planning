import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemePreset = "green" | "blue" | "purple" | "indigo" | "amber" | "red";
export type FontChoice = "public-sans" | "inter" | "dm-sans" | "nunito-sans";

export type AppSettings = {
  darkMode: boolean;
  highContrast: boolean;
  rtl: boolean;
  compact: boolean;
  navLayout: "expanded" | "condensed" | "icons";
  navColor: "integrate" | "apparent";
  preset: ThemePreset;
  font: FontChoice;
};

export const defaultSettings: AppSettings = {
  darkMode: false,
  highContrast: false,
  rtl: false,
  compact: false,
  navLayout: "expanded",
  navColor: "integrate",
  preset: "green",
  font: "public-sans",
};

const STORAGE_KEY = "rainco.settings";

type Ctx = {
  settings: AppSettings;
  setSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  reset: () => void;
};

const SettingsContext = createContext<Ctx | null>(null);

function applySettings(s: AppSettings) {
  const root = document.documentElement;
  root.classList.toggle("dark", s.darkMode);
  root.classList.toggle("high-contrast", s.highContrast);
  root.classList.toggle("compact", s.compact);
  root.dir = s.rtl ? "rtl" : "ltr";
  root.dataset["preset"] = s.preset;
  root.dataset["font"] = s.font;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  // Restore after hydration so SSR markup and first client render match.
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = { ...defaultSettings, ...JSON.parse(raw) } as AppSettings;
        setSettings(parsed);
        applySettings(parsed);
        return;
      } catch {
        /* ignore malformed value */
      }
    }
    applySettings(defaultSettings);
  }, []);

  const setSetting = useCallback<Ctx["setSetting"]>((key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      applySettings(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSettings(defaultSettings);
    applySettings(defaultSettings);
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, setSetting, reset }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useAppSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useAppSettings must be used within SettingsProvider");
  return ctx;
}

export const AppSettingsProvider = SettingsProvider;
