import type { TrendDossier } from "../../lib/mockData";
import { cn } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";

interface NarrativeEssayProps {
  dossier: TrendDossier;
}

export const NarrativeEssay: React.FC<NarrativeEssayProps> = ({ dossier }) => {
  const { theme } = useAppStore();
  const isDark = theme === "dark";

  return (
    <div className="space-y-6">
      <div
        className={cn(
          "p-4 rounded-lg border-l-4 border-l-brand-accent",
          isDark ? "bg-white/5 border-white/5" : "bg-black/5 border-black/5"
        )}
      >
        <h4 className="text-xs uppercase tracking-wider opacity-60 mb-2">Catalyst Event</h4>
        <div className="flex items-center gap-3">
          <span className="font-mono font-medium text-brand-accent">
            {dossier.catalystAccount || (dossier as any).catalyst?.handle || "@origin_node"}
          </span>
          <span className="font-mono text-sm opacity-60">
            {dossier.catalystTimestamp || (dossier as any).catalyst?.timestamp || "T-0h Origin Point"}
          </span>
        </div>
        <p className="mt-2 text-sm italic opacity-80">
          Identified as the origin node for current trending velocity.
        </p>
      </div>

      <div className="space-y-4 text-sm md:text-base leading-relaxed font-sans opacity-90">
        {dossier.narrativeEssay.split("\n\n").map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};
