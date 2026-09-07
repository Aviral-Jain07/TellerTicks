import { useAppStore } from "../../store/useAppStore";
import { cn } from "../../lib/utils";
import { Sparkles, Compass } from "lucide-react";

export function ViewSwitcher() {
  const { activeView, setActiveView } = useAppStore();

  return (
    <div className="flex items-center bg-zinc-800/80 rounded-lg p-0.5 gap-0.5">
      <button
        onClick={() => setActiveView("foryou")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
          activeView === "foryou"
            ? "bg-[#FDFBD4] text-zinc-900 shadow-sm glow-active"
            : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        <Sparkles className="w-3.5 h-3.5" />
        For You
      </button>
      <button
        onClick={() => setActiveView("explore")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200",
          activeView === "explore"
            ? "bg-[#FDFBD4] text-zinc-900 shadow-sm glow-active"
            : "text-zinc-400 hover:text-zinc-200"
        )}
      >
        <Compass className="w-3.5 h-3.5" />
        Explore All
      </button>
    </div>
  );
}
