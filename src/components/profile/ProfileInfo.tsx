import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';

export function ProfileInfo() {
  const { user, alerts, savedDossierIds, theme } = useAppStore();
  const activeAlertsCount = Object.values(alerts || {}).filter(Boolean).length;

  return (
    <div className={cn(
      "p-6 rounded-xl border transition-colors",
      theme === 'dark' ? "glass-card border-white/10" : "bg-brand-cream-card border-black/5"
    )}>
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-brand-accent rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
          {user?.avatar || "AI"}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">{user?.name || "User"}</h2>
            <span className="bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-xs font-medium">
              {user?.tier || "Pro"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{user?.email || "user@example.com"}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/50">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold font-mono text-foreground">147</span>
          <span className="text-xs text-muted-foreground mt-1">Trends Tracked</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold font-mono text-foreground">{activeAlertsCount}</span>
          <span className="text-xs text-muted-foreground mt-1">Alerts Active</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold font-mono text-foreground">{savedDossierIds?.length || 0}</span>
          <span className="text-xs text-muted-foreground mt-1">Dossiers Saved</span>
        </div>
      </div>
    </div>
  );
}
