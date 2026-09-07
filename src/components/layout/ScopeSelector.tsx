import { useAppStore } from "../../store/useAppStore";
import { cn } from "../../lib/utils";
import { Globe, MapPin, Map } from "lucide-react";

const scopes = [
  { value: "worldwide" as const, label: "Worldwide", icon: Globe },
  { value: "national" as const, label: "National", icon: MapPin },
  { value: "statewise" as const, label: "Statewise", icon: Map },
];

export function ScopeSelector() {
  const { scope, setScope } = useAppStore();
  const current = scopes.find((s) => s.value === scope) ?? scopes[0];

  return (
    <div className="relative group">
      <button
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200",
          "bg-[#FDFBD4] text-zinc-900 hover:bg-white hover:shadow-md active:scale-95"
        )}
      >
        <current.icon className="w-3.5 h-3.5" />
        {current.label}
      </button>
      <div
        className={cn(
          "absolute top-full left-0 mt-1 w-44 rounded-lg overflow-hidden shadow-xl border z-50",
          "bg-white dark:bg-zinc-900 dark:border-zinc-700",
          "opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
        )}
      >
        {scopes.map((s) => (
          <button
            key={s.value}
            onClick={() => setScope(s.value)}
            className={cn(
              "flex items-center gap-2 w-full px-3 py-2 text-sm transition-colors",
              scope === s.value
                ? "bg-brand-accent/10 text-brand-accent font-medium"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            )}
          >
            <s.icon className="w-4 h-4" />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
