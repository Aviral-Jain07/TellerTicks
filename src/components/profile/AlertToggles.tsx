import React from 'react';
import { TrendingUp, Flame, HeartPulse, Eye, Zap } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';
import { Switch } from '../ui/switch';

const alertConfig = [
  { id: 'trendingTopics', label: 'Trending Topics', description: 'Get notified when new topics emerge rapidly', icon: TrendingUp },
  { id: 'viralContent', label: 'Viral Content', description: 'Alerts for content going viral across platforms', icon: Flame },
  { id: 'sentimentShifts', label: 'Sentiment Shifts', description: 'Updates when public sentiment significantly changes', icon: HeartPulse },
  { id: 'competitorMentions', label: 'Competitor Mentions', description: 'Mentions of key competitors in your industry', icon: Eye },
  { id: 'breakingNews', label: 'Breaking News', description: 'Immediate alerts for major industry developments', icon: Zap },
];

export function AlertToggles() {
  const { alerts, toggleAlert, theme } = useAppStore();

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold">AI Alert Configuration</h2>
        <p className="text-sm text-muted-foreground mt-1">Control which intelligence alerts you receive</p>
      </div>

      <div className={cn(
        "rounded-xl border overflow-hidden",
        theme === 'dark' ? "glass-card border-white/10" : "bg-brand-cream-card border-black/5"
      )}>
        <div className="divide-y divide-border/50">
          {alertConfig.map((alert) => {
            const Icon = alert.icon;
            const isActive = alerts ? alerts[alert.id as keyof typeof alerts] : false;
            
            return (
              <div key={alert.id} className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "p-2 rounded-lg relative",
                    isActive ? "bg-brand-accent/20 text-brand-accent" : "bg-secondary text-muted-foreground"
                  )}>
                    <Icon size={20} />
                    {isActive && <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full live-dot" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{alert.label}</h3>
                    <p className="text-xs text-muted-foreground">{alert.description}</p>
                  </div>
                </div>
                <Switch 
                  checked={isActive} 
                  onCheckedChange={() => toggleAlert(alert.id as keyof typeof alerts)} 
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
