import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { getPersonaConfig } from '../../lib/mockData';
import { Brain } from 'lucide-react';
import { cn } from '../../lib/utils';

export function IntelligenceBanner() {
  const { persona } = useAppStore();
  const config = getPersonaConfig(persona);

  return (
    <div className={cn(
      "relative overflow-hidden rounded-xl p-6 transition-all duration-300",
      "bg-gradient-to-r from-brand-accent/10 via-amber-50 to-cyan-50 border border-brand-accent/20",
      "dark:from-brand-accent/10 dark:via-ai-violet/10 dark:to-ai-cyan/10 dark:border-white/10",
      "shimmer-bg"
    )}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-brand-accent/20 text-brand-accent">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold font-sans">Proactive Intelligence</h2>
              <div className="live-dot bg-ai-emerald" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Optimized for <span className="font-semibold text-brand-accent">{config.title}</span>
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {config.interestSegments?.map((segment, i) => (
            <span
              key={i}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-semibold border",
                i % 3 === 0 ? "bg-ai-cyan/10 text-ai-cyan border-ai-cyan/20" : 
                i % 3 === 1 ? "bg-ai-violet/10 text-ai-violet border-ai-violet/20" : 
                "bg-ai-emerald/10 text-ai-emerald border-ai-emerald/20"
              )}
            >
              {segment}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
