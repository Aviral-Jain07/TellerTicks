import { useAppStore } from "../../store/useAppStore";
import { Sun, Moon } from "lucide-react";
import { cn } from "../../lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useAppStore();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200",
        "bg-[#FDFBD4] text-zinc-900 hover:bg-white",
        "hover:shadow-md active:scale-95"
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
}
