import React from 'react';
import { getSynthesis } from '../../lib/mockData';
import { Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AISynthesisBanner({ platform }: { platform: string }) {
  const synthesis = getSynthesis(platform as any);
  
  if (!synthesis) return null;

  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg overflow-hidden relative",
      "bg-[#F5F2C2] dark:bg-black/60 dark:glass-card border border-brand-accent/20 dark:border-white/10",
      "shimmer-bg"
    )}>
      <div className="flex items-center justify-center shrink-0 w-8 h-8 rounded-full bg-ai-emerald/10 text-ai-emerald">
        <Sparkles className="w-4 h-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {platform} Synthesis
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-ai-emerald animate-pulse" />
        </div>
        <p className="text-sm font-medium truncate">
          {synthesis}
        </p>
      </div>
    </div>
  );
}
