import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { getTrendsForPersona, type TrendItem } from '../../lib/mockData';
import { IntelligenceBanner } from './IntelligenceBanner';
import { ForYouTrendCard } from './ForYouTrendCard';
import { TrendDossierDialog } from '../dossier/TrendDossierDialog';

export function ForYouView() {
  const { persona, scope } = useAppStore();
  const trends = getTrendsForPersona(persona, scope);
  const [selectedTrend, setSelectedTrend] = useState<TrendItem | null>(null);

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <IntelligenceBanner />
      
      {trends.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground glass-card bg-[#F5F2C2] dark:bg-black/40 rounded-xl">
          <p className="text-lg">No emerging trends found for this persona and scope yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map(trend => (
            <ForYouTrendCard
              key={trend.id}
              trend={trend}
              onReadDossier={setSelectedTrend}
            />
          ))}
        </div>
      )}

      {/* Control the dialog state */}
      {selectedTrend && (
        <TrendDossierDialog
          trend={selectedTrend}
          open={!!selectedTrend}
          onOpenChange={(open: boolean) => {
            if (!open) setSelectedTrend(null);
          }}
        />
      )}
    </div>
  );
}
