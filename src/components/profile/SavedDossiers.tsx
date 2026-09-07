import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { cn } from '../../lib/utils';
import { Bookmark, X } from 'lucide-react';
// Assuming 'trends' is an exported array of mock trend objects from mockData
import { trends } from '../../lib/mockData';

export function SavedDossiers() {
  const { savedDossierIds, toggleBookmark, theme } = useAppStore();
  
  // Try to find the saved dossiers from a mock trends array
  const savedTrends = trends ? trends.filter((t: any) => savedDossierIds?.includes(t.id)) : [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold">Saved Dossiers</h2>
        <span className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs font-mono">
          {savedDossierIds?.length || 0}
        </span>
      </div>

      {(!savedDossierIds || savedDossierIds.length === 0) ? (
        <div className={cn(
          "p-8 rounded-xl border flex flex-col items-center justify-center text-center",
          theme === 'dark' ? "glass-card border-white/10" : "bg-brand-cream-card border-black/5"
        )}>
          <div className="p-3 bg-secondary rounded-full mb-3 text-muted-foreground">
            <Bookmark size={24} />
          </div>
          <h3 className="font-medium">No dossiers saved yet</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Save intelligence reports and trend dossiers to access them quickly later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedDossierIds.map((id) => {
            const trend = savedTrends.find((t: any) => t.id === id);
            // Fallback content if trend is not found in mock data
            const title = trend?.title || `Saved Item #${id}`;
            const platform = trend?.platform || "Multi-Platform";
            const velocity = trend?.velocityScore || 45;
            const summary = trend?.summary || "Intelligence dossier containing key metrics, insights, and predictive models for this trend.";
            
            return (
              <div key={id} className={cn(
                "p-4 rounded-xl border flex flex-col gap-3 relative group transition-all",
                theme === 'dark' ? "glass-card border-white/10 hover:border-white/20" : "bg-brand-cream-card border-black/5 hover:border-black/10"
              )}>
                <button 
                  onClick={() => toggleBookmark(id)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-background/80 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
                  title="Remove"
                >
                  <X size={14} />
                </button>
                
                <div className="flex items-center gap-2 pr-6">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-accent/20 text-brand-accent font-medium">
                    {platform}
                  </span>
                  <span className="text-xs font-medium metric-mono text-green-500 ml-auto">
                    {velocity}
                  </span>
                </div>
                
                <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-auto">
                  {summary}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
