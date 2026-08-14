import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// import logoAsset from "@/assets/pbss-logo.png.asset.json";
// import logoAsset from "@/assets/logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Rainco Perfect Planning" },
      {
        name: "description",
        content:
          "Sign in to the Rainco Perfect Planning console to manage production scheduling, masters and planning boards.",
      },
      { property: "og:title", content: "Sign in — Rainco Perfect Planning" },
      {
        property: "og:description",
        content: "Access the Rainco production planning console.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

export const AUTH_KEY = "rainco.auth";
const DEMO_EMAIL = "test@pbss.com";
const DEMO_PASSWORD = "admin123";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem(AUTH_KEY)) navigate({ to: "/", replace: true });
  }, [navigate]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem(AUTH_KEY, email.trim().toLowerCase());
      navigate({ to: "/", replace: true });
    } else {
      setError("Incorrect email or password.");
    }
  };

  return (
    <div className="grid min-h-screen bg-background md:grid-cols-[minmax(0,34%)_1fr]">
      <aside className="hidden flex-col justify-center gap-6 bg-secondary/60 px-12 md:flex">
        <div className="flex items-center gap-4">
          <img
            src={"src/assets/logo.png"}
            alt="Perfect Planning logo"
            className="h-40 w-40 object-contain"
          />
          <div className="leading-tight">
            <p className="text-2xl font-semibold tracking-wide text-foreground">PERFECT</p>
            <p className="text-4xl font-bold tracking-wide text-primary">PLANNING</p>
          </div>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          More effectively with optimized workflows.
        </p>
      </aside>

      <main className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center gap-3 md:hidden">
            <img src={"src/assets/logo.png"} alt="Perfect Planning logo" className="h-12 w-12" />
            <span className="text-lg font-semibold">Perfect Planning</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">Sign in to your account</h1>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div className="relative">
              <label
                htmlFor="email"
                className="absolute -top-2 left-3 bg-background px-1 text-xs font-medium text-muted-foreground"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="absolute -top-2 left-3 bg-background px-1 text-xs font-medium text-muted-foreground"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-3 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-lg bg-foreground py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
            >
              Sign in
            </button>
          </form>

          <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            <p>2026 © Perfect Business Solution Services (Pvt) Ltd.</p>
            <p>All rights reserved.</p>
            <p>Version 1.0.0</p>
          </div>
        </div>
      </main>
    </div>
  );
}
