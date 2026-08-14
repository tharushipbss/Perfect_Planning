import { useState, useEffect, createContext, useContext } from "react";

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export const prototypePersonas: UserProfile[] = [
  {
    id: "user-1",
    name: "Test",
    role: "Production Planner",
    initials: "T",
  },
  {
    id: "user-2",
    name: "Nethmini Kaluwitharana",
    role: "Senior Planner",
    initials: "NK",
  },
  {
    id: "user-3",
    name: "Kasun Perera",
    role: "Operations Manager",
    initials: "KP",
  },
];

interface UserProfileContextType {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  switchPersona: (personaId: string) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(prototypePersonas[0]!);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Restore saved profile after hydration to ensure server and client initial render match
  useEffect(() => {
    const saved = localStorage.getItem("rainco_session_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as UserProfile;
        if (parsed.id === "user-1" && parsed.name === "Anton") {
          parsed.name = "Test";
          parsed.initials = "T";
        }
        setCurrentUser(parsed);
      } catch {
        // ignore malformed JSON
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("rainco_session_profile", JSON.stringify(currentUser));
  }, [currentUser]);

  const switchPersona = (personaId: string) => {
    const found = prototypePersonas.find((p) => p.id === personaId);
    if (found) {
      setCurrentUser(found);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchPersona,
        isProfileOpen,
        setIsProfileOpen,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
