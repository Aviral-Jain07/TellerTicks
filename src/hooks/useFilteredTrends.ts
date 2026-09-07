import { useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';
import { getTrendsByPlatform, getTrendsForPersona, type Platform } from '../lib/mockData';

export function useFilteredTrends() {
  const scope = useAppStore((state) => state.scope);
  const persona = useAppStore((state) => state.persona);
  const activePlatform = useAppStore((state) => state.activePlatform);
  const activeView = useAppStore((state) => state.activeView);

  const trends = useMemo(() => {
    if (activeView === 'foryou') {
      return getTrendsForPersona(persona, scope);
    } else {
      return getTrendsByPlatform((activePlatform || 'all') as Platform | 'all', scope);
    }
  }, [activeView, persona, scope, activePlatform]);

  return {
    trends,
    isForYou: activeView === 'foryou'
  };
}
