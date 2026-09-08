import type { TrendDossier } from "../../lib/mockData";
import { cn } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import { Crosshair, ShieldAlert, Radio, Clock, MapPin } from "lucide-react";

interface NarrativeEssayProps {
  dossier: TrendDossier;
}

export const NarrativeEssay: React.FC<NarrativeEssayProps> = ({ dossier }) => {
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const pz = dossier.patientZero;

  return (
    <div className="space-y-6">
      {/* Patient Zero Threat Identification Card */}
      <div
        className={cn(
          "p-4 rounded-xl border-l-4 border-l-red-500 space-y-3 transition-all",
          isDark ? "bg-red-500/10 border border-red-500/20" : "bg-red-50/80 border border-red-200 shadow-xs"
        )}
      >
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h4 className="text-xs uppercase tracking-wider font-bold font-mono text-red-600 dark:text-red-400 flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5 animate-spin" />
            Patient Zero Identification (Origin Node)
          </h4>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 font-bold">
            CONFIRMED CATALYST
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">Origin Handle:</span>
            <span className="font-bold text-red-600 dark:text-red-400">
              {pz?.handle || dossier.catalystAccount || "@origin_node"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-zinc-700 dark:text-zinc-300">
              {pz?.timestamp || dossier.catalystTimestamp || "T-0h Inception"}
            </span>
          </div>
          {pz?.ipOrigin && (
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-zinc-700 dark:text-zinc-300 truncate">
                {pz.ipOrigin}
              </span>
            </div>
          )}
          {pz?.chainOrNode && (
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-zinc-700 dark:text-zinc-300 truncate">
                {pz.chainOrNode}
              </span>
            </div>
          )}
        </div>

        {pz?.threatVectors && pz.threatVectors.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-red-500/20">
            <span className="text-[10px] text-zinc-500 font-mono">Threat Vectors:</span>
            {pz.threatVectors.map((tv, idx) => (
              <span 
                key={idx}
                className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-white/10 text-zinc-800 dark:text-zinc-200 border border-black/5 dark:border-white/5"
              >
                {tv}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Narrative Essay Paragraphs */}
      <div className="space-y-4 text-sm md:text-base leading-relaxed font-sans opacity-90">
        {dossier.narrativeEssay.split("\n\n").map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};
