import { useAppStore } from "../store/useAppStore";
import { cn } from "../lib/utils";
import { ProfileInfo } from "../components/profile/ProfileInfo";
import { PersonaSelector } from "../components/profile/PersonaSelector";
import { SavedDossiers } from "../components/profile/SavedDossiers";
import { AlertToggles } from "../components/profile/AlertToggles";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProfilePage() {
  const theme = useAppStore((s) => s.theme);
  const navigate = useNavigate();

  return (
    <main
      className={cn(
        "min-h-[calc(100vh-60px)] transition-colors duration-300",
        theme === "dark" ? "bg-black" : "bg-[#FDFBD4]"
      )}
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className={cn(
              "p-2 rounded-lg transition-all",
              theme === "dark"
                ? "hover:bg-white/5 text-zinc-400"
                : "hover:bg-black/5 text-zinc-600"
            )}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1
            className={cn(
              "text-2xl font-bold",
              theme === "dark" ? "text-white" : "text-zinc-900"
            )}
          >
            Profile Settings
          </h1>
        </div>

        <ProfileInfo />
        <PersonaSelector />
        <AlertToggles />
        <SavedDossiers />
      </div>
    </main>
  );
}
