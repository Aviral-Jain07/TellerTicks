import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { PlatformTabs } from './PlatformTabs';
import { AISynthesisBanner } from './AISynthesisBanner';
import { TrendCard } from './TrendCard';
import { InstagramReelsBoard } from './InstagramReelsBoard';
import { YouTubeBoard } from './YouTubeBoard';
import { FacebookBoard } from './FacebookBoard';
import { TrendDossierDialog } from '../dossier/TrendDossierDialog';
import { getTrendsByPlatform, type TrendItem, type Platform } from '../../lib/mockData';

export function ExploreAllView() {
  const { activePlatform, scope } = useAppStore();
  const [selectedTrend, setSelectedTrend] = useState<TrendItem | null>(null);

  const trends = getTrendsByPlatform(activePlatform as Platform | 'all', scope);

  return (
    <div className="flex flex-col gap-6">
      <PlatformTabs />
      
      <AISynthesisBanner platform={activePlatform} />

      {(activePlatform === 'all' || activePlatform === 'instagram') && (
        <InstagramReelsBoard />
      )}
      
      {(activePlatform === 'all' || activePlatform === 'youtube') && (
        <YouTubeBoard />
      )}
      
      {(activePlatform === 'all' || activePlatform === 'facebook') && (
        <FacebookBoard />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trends.map(trend => (
          <TrendCard 
            key={trend.id} 
            trend={trend} 
            onReadDossier={setSelectedTrend} 
          />
        ))}
      </div>

      <TrendDossierDialog 
        trend={selectedTrend} 
        open={!!selectedTrend} 
        onOpenChange={(open: boolean) => !open && setSelectedTrend(null)} 
      />
    </div>
  );
}
