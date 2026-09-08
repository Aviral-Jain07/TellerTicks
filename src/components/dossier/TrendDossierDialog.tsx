import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { TrendItem } from "../../lib/mockData";
import { NarrativeEssay } from "./NarrativeEssay";
import { EmotionalBreakdown } from "./EmotionalBreakdown";
import { DemographicChart } from "./DemographicChart";
import { NetworkTopology } from "./NetworkTopology";
import { IocExtractorPanel } from "./IocExtractorPanel";
import { IncidentResponseActions } from "./IncidentResponseActions";
import { cn } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import { BookOpen, BarChart3, Users, Network, ShieldAlert, Bot, Terminal } from "lucide-react";

interface TrendDossierDialogProps {
  trend: TrendItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TrendDossierDialog: React.FC<TrendDossierDialogProps> = ({
  trend,
  open,
  onOpenChange,
}) => {
  const { theme } = useAppStore();
  const isDark = theme === "dark";

  if (!trend) return null;

  const threatScore = trend.threatRisk?.score ?? 45;
  const threatLevel = trend.threatRisk?.level ?? (threatScore >= 75 ? 'CRITICAL' : threatScore >= 40 ? 'MEDIUM' : 'LOW');
  
  const threatBadgeClasses = 
    threatScore >= 75 ? 'bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/40' :
    threatScore >= 40 ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/40' :
    'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/40';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-4xl max-h-[90vh] overflow-y-auto overflow-x-hidden p-0",
          isDark
            ? "bg-black/90 backdrop-blur-xl border-white/10 text-white"
            : "bg-[#FDFBD4] border-black/10 text-black"
        )}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 p-6 border-b border-black/10 dark:border-white/10 backdrop-blur-md bg-inherit">
          <DialogHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-brand-accent/15 text-brand-accent border border-brand-accent/30 font-bold">
                    Threat Intelligence Dossier
                  </span>
                  <span
                    className={cn(
                      "px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize",
                      isDark ? "bg-white/10 text-zinc-200" : "bg-black/10 text-zinc-800"
                    )}
                  >
                    {trend.platform}
                  </span>
                  {/* Threat Risk Badge */}
                  <span className={cn("px-2.5 py-0.5 text-xs font-mono font-bold rounded-full border flex items-center gap-1", threatBadgeClasses)}>
                    <ShieldAlert className="w-3.5 h-3.5" />
                    THREAT {threatScore} ({threatLevel})
                  </span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-bold tracking-tight">
                  {trend.title}
                </DialogTitle>
                {trend.threatRisk?.category && (
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    Category: <span className="font-semibold text-zinc-700 dark:text-zinc-200">{trend.threatRisk.category}</span>
                  </p>
                )}
              </div>

              {/* Stats pill */}
              <div className="flex items-center gap-4 shrink-0 sm:text-right">
                {trend.cibMetrics && (
                  <div className="flex flex-col sm:items-end text-xs font-mono">
                    <span className="text-[10px] opacity-60 uppercase tracking-wider">CIB Authenticity</span>
                    <span className={cn(
                      "font-bold",
                      trend.cibMetrics.botPercentage > 60 ? "text-red-500" : "text-emerald-500"
                    )}>
                      {trend.cibMetrics.botPercentage}% Bot / {trend.cibMetrics.humanPercentage}% Human
                    </span>
                  </div>
                )}
                <div className="flex flex-col sm:items-end">
                  <span className="text-[10px] opacity-60 uppercase tracking-wider">Velocity Score</span>
                  <span className="metric-mono text-xl text-brand-accent glow-active font-bold">
                    {trend.velocityScore}
                  </span>
                </div>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 space-y-10">
          {/* Section 1: Patient Zero & Narrative */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold uppercase tracking-wide opacity-80">
              <BookOpen className="w-5 h-5 text-brand-accent" />
              Patient Zero & Threat Narrative
            </h3>
            <NarrativeEssay dossier={trend.dossier} />
          </section>

          <hr className={cn("border-t", isDark ? "border-white/10" : "border-black/10")} />

          {/* Section 2: Emotional Trajectory / Crypto FUD */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold uppercase tracking-wide opacity-80">
              <BarChart3 className="w-5 h-5 text-brand-accent" />
              Emotional Trajectory & FUD Tracking (24h)
            </h3>
            <EmotionalBreakdown dossier={trend.dossier} />
          </section>

          <hr className={cn("border-t", isDark ? "border-white/10" : "border-black/10")} />

          {/* Section 3: Demographic Chart */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold uppercase tracking-wide opacity-80">
              <Users className="w-5 h-5 text-brand-accent" />
              Demographic Engagement & Sybil Anomalies
            </h3>
            <DemographicChart dossier={trend.dossier} />
          </section>

          <hr className={cn("border-t", isDark ? "border-white/10" : "border-black/10")} />

          {/* Section 4: Network Topology */}
          <section className="space-y-4">
            <h3 className="flex items-center gap-2 text-lg font-semibold uppercase tracking-wide opacity-80">
              <Network className="w-5 h-5 text-brand-accent" />
              Interactive Botnet & Propagation Network
            </h3>
            <NetworkTopology dossier={trend.dossier} />
          </section>

          <hr className={cn("border-t", isDark ? "border-white/10" : "border-black/10")} />

          {/* Section 5: Extracted Payloads / IoCs & Wallets */}
          <section className="space-y-4">
            <IocExtractorPanel iocPayload={trend.dossier.iocPayload} />
          </section>

          {/* Section 6: Incident Response Controls */}
          <section className="space-y-4">
            <IncidentResponseActions 
              trendId={trend.id} 
              catalystAccount={trend.dossier.catalystAccount}
              contractAddress={trend.dossier.iocPayload?.contractAddress}
            />
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};
