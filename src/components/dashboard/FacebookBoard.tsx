import React from 'react';
import { MediaBoard } from './MediaBoard';
import { Play, ThumbsUp } from 'lucide-react';
import { FacebookIcon } from '../common/BrandIcons';
import { facebookVideos } from '../../lib/mockData';
import { formatNumber } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

export function FacebookBoard() {
  const theme = useAppStore(state => state.theme);
  
  return (
    <MediaBoard 
      title="Trending on Facebook" 
      icon={<FacebookIcon className="w-5 h-5" />}
      accentColor="text-blue-500"
    >
      {facebookVideos.map((video) => (
        <div 
          key={video.id} 
          className="min-w-[280px] w-[280px] rounded-lg overflow-hidden snap-start flex-shrink-0 group cursor-pointer border border-zinc-200 dark:border-white/10 flex flex-col transition-transform hover:scale-[1.02]"
        >
          <div 
            className="aspect-video relative"
            style={{ background: video.gradient }}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" fill="white" />
            </div>
          </div>
          <div className={`p-3 flex-grow flex flex-col ${theme === 'dark' ? 'bg-zinc-900/50' : 'bg-white'}`}>
            <h3 className="text-sm font-semibold line-clamp-2 mb-1 text-zinc-900 dark:text-white">
              {video.title}
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">{video.page}</p>
            <div className="mt-auto flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 metric-mono">
              <span>{formatNumber(video.views)} views</span>
              <div className="flex items-center gap-1 text-blue-500">
                <ThumbsUp className="w-3 h-3" />
                <span>{formatNumber(video.reactions)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </MediaBoard>
  );
}
