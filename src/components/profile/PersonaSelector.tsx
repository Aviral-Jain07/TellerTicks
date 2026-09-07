import React, { useState } from 'react';
import { Shield, Zap, TrendingUp, Globe, CheckCircle2, Cpu, Sparkles, LineChart } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { personas } from '../../lib/mockData';
import { cn } from '../../lib/utils';

const iconMap: Record<string, React.ElementType> = {
  shield: Shield,
  zap: Zap,
  'trending-up': TrendingUp,
  globe: Globe,
  cpu: Cpu,
  sparkles: Sparkles,
  'line-chart': LineChart,
};

export function PersonaSelector() {
  const { persona, setPersona, theme } = useAppStore();
  const [showToast, setShowToast] = useState(false);

  const handleSelect = (id: string) => {
    setPersona(id as any);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-semibold">Intelligence Persona</h2>
        <p className="text-sm text-muted-foreground mt-1">Select your focus area to personalize your For You feed</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
        {personas.map((p) => {
          const Icon = iconMap[p.icon] || Globe;
          const isActive = persona === p.id;
          
          return (
            <div
              key={p.id}
              onClick={() => handleSelect(p.id)}
              className={cn(
                "p-4 rounded-xl border cursor-pointer transition-all duration-300 flex flex-col h-full",
                theme === 'dark' ? "glass-card hover:bg-white/5" : "bg-brand-cream-card hover:bg-brand-cream",
                isActive 
                  ? "border-brand-accent glow-active shadow-lg" 
                  : (theme === 'dark' ? "border-white/10" : "border-black/5")
              )}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={cn(
                  "p-2 rounded-lg",
                  isActive ? "bg-brand-accent text-white" : "bg-secondary text-secondary-foreground"
                )}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold">{p.title}</h3>
              </div>
              <p className="text-xs text-muted-foreground flex-grow mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {p.interestSegments.slice(0, 3).map((interest, i) => (
                  <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-foreground text-background px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-4 z-50">
          <CheckCircle2 size={18} className="text-green-500" />
          <span className="text-sm font-medium">Persona updated! Your For You feed has been refreshed.</span>
        </div>
      )}
    </div>
  );
}
