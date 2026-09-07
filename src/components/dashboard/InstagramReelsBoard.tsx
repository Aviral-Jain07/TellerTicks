import React from 'react';
import { MediaBoard } from './MediaBoard';
import { AudioLines, TrendingUp } from 'lucide-react';
import { InstagramIcon } from '../common/BrandIcons';
import { instagramReels } from '../../lib/mockData';
import { formatNumber } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

export function InstagramReelsBoard() {
  const theme = useAppStore(state => state.theme);
  
  return (
    <MediaBoard 
      title="Trending Audio & Reels" 
      icon={<InstagramIcon className="w-5 h-5" />}
      accentColor="text-pink-500"
    >
      {instagramReels.map((reel) => (
        <div 
          key={reel.id} 
          className="min-w-[200px] w-[200px] rounded-lg overflow-hidden snap-start flex-shrink-0 group cursor-pointer border border-zinc-200 dark:border-white/10 transition-transform hover:scale-[1.02]"
        >
          <div 
            className="aspect-[9/16] relative flex items-end p-3"
            style={{ background: reel.gradient }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10 w-full text-white">
              <div className="flex items-center gap-1 text-xs mb-1 bg-black/40 w-fit px-2 py-1 rounded-full backdrop-blur-md">
                <AudioLines className="w-3 h-3" />
                <span className="truncate max-w-[120px]">{reel.audioName}</span>
              </div>
              <p className="text-sm font-semibold truncate">{reel.creator}</p>
              
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs metric-mono text-zinc-300">
                  {formatNumber(reel.uses)} uses
                </span>
                <div className="flex items-center gap-1 text-[#D47E30]">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs metric-mono font-bold">{reel.velocity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </MediaBoard>
  );
}
