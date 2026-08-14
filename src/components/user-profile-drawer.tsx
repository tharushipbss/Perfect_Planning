import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUserProfile, prototypePersonas } from "@/hooks/use-user-profile";
import {
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Shield,
  Briefcase,
  ChevronRight,
  Check,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserProfileDrawer() {
  const { currentUser, isProfileOpen, setIsProfileOpen, switchPersona } = useUserProfile();

  const navigate = useNavigate();
  const [showPersonas, setShowPersonas] = useState(false);

  const handleNavigateDashboard = () => {
    setIsProfileOpen(false);
    void navigate({ to: "/" });
  };

  const handleLogout = () => {
    localStorage.removeItem("rainco_session");
    localStorage.removeItem("rainco_session_profile");
    setIsProfileOpen(false);
    void navigate({ to: "/login" });
  };

  return (
    <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
      <SheetContent
        side="right"
        className="w-80 sm:w-96 p-0 border-l border-border bg-background flex flex-col justify-between shadow-2xl"
      >
        <div className="flex-1 flex flex-col">
          {/* Header with Centered User Name matching screenshot frame */}
          <div className="pt-10 pb-6 px-6 text-center border-b border-dashed border-border/70 relative">
            <h3 className="text-lg font-semibold text-foreground tracking-tight">
              {currentUser.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{currentUser.role}</p>
          </div>

          {/* Nav Items Section */}
          <div className="p-4 space-y-1">
            <button
              onClick={handleNavigateDashboard}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-muted transition-colors text-left group"
            >
              <div className="p-1.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <span className="flex-1 text-slate-700 font-semibold group-hover:text-foreground">
                Dashboard
              </span>
            </button>

            {/* Persona Switcher Toggle */}
            <div className="pt-2">
              <button
                onClick={() => setShowPersonas(!showPersonas)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-medium text-muted-foreground hover:bg-muted/60 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <span>Switch Persona ({currentUser.initials})</span>
                </span>
                <ChevronRight
                  className={`h-3.5 w-3.5 transition-transform ${showPersonas ? "rotate-90" : ""}`}
                />
              </button>

              {showPersonas && (
                <div className="mt-2 space-y-1 pl-3 border-l-2 border-primary/20">
                  {prototypePersonas.map((persona) => {
                    const isSelected = persona.id === currentUser.id;
                    return (
                      <button
                        key={persona.id}
                        onClick={() => {
                          switchPersona(persona.id);
                          setShowPersonas(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-md text-xs text-left transition-colors ${
                          isSelected
                            ? "bg-primary/10 font-bold text-primary"
                            : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <div className="truncate">
                          <p className="truncate font-semibold">{persona.name}</p>
                          <p className="text-[10px] text-muted-foreground truncate">
                            {persona.role}
                          </p>
                        </div>
                        {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer with Logout matching screenshot style */}
        <div className="p-6 border-t border-dashed border-border/70 flex justify-end">
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 font-bold text-sm tracking-wide transition-colors flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
