import { useState } from 'react';
import type { TrendItem } from '../../lib/mockData';
import { cn, formatNumber, timeAgo } from '../../lib/utils';
import { 
  MessageSquare, Heart, Share2, Eye, TrendingUp, Bookmark
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface TrendCardProps {
  trend: TrendItem;
  onReadDossier: (trend: TrendItem) => void;
}

export function TrendCard({ trend, onReadDossier }: TrendCardProps) {
  const theme = useAppStore(state => state.theme);
  const [bookmarked, setBookmarked] = useState(false);

  const renderMetrics = () => {
    const m = trend.platformMetrics as any;
    let items: {label: string; val: number}[] = [];
    switch (trend.platform) {
      case 'x': items = [{label: 'Views', val: m.views}, {label: 'Likes', val: m.likes}, {label: 'Reposts', val: m.reposts}, {label: 'Quotes', val: m.quotes}]; break;
      case 'telegram': items = [{label: 'Views', val: m.views}, {label: 'Forwards', val: m.forwards}, {label: 'Replies', val: m.replies}]; break;
      case 'instagram': items = [{label: 'Views', val: m.views}, {label: 'Likes', val: m.likes}, {label: 'Saves', val: m.saves}, {label: 'Shares', val: m.shares}]; break;
      case 'reddit': items = [{label: 'Upvotes', val: m.upvotes}, {label: 'Comments', val: m.comments}, {label: 'Crossposts', val: m.crossposts}]; break;
      case 'youtube': items = [{label: 'Views', val: m.views}, {label: 'Likes', val: m.likes}, {label: 'Comments', val: m.comments}]; break;
      case 'facebook': items = [{label: 'Views', val: m.views}, {label: 'Reactions', val: m.reactions}, {label: 'Shares', val: m.shares}, {label: 'Comments', val: m.comments}]; break;
    }
    return items.map((item, i) => (
      <div key={i} className="flex flex-col">
        <span className="text-[10px] text-muted-foreground uppercase">{item.label}</span>
        <span className="metric-mono text-sm">{formatNumber(item.val)}</span>
      </div>
    ));
  };

  return (
    <div className={cn(
      "flex flex-col p-4 rounded-xl transition-all duration-300 border h-full",
      theme === 'dark' ? "glass-card border-white/10" : "bg-[#FDFBD4] border-[#FDFBD4] shadow-sm"
    )}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#D47E30] text-white flex items-center justify-center text-xs font-bold">
            {trend.rank}
          </div>
          <span className="text-xs font-semibold px-2 py-1 rounded-md bg-zinc-100 dark:bg-white/10 capitalize text-zinc-600 dark:text-zinc-300">
            {trend.platform}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[#D47E30]">
            <TrendingUp className="w-4 h-4" />
            <span className="metric-mono text-sm font-bold">{trend.velocityScore}</span>
          </div>
          <button onClick={() => setBookmarked(!bookmarked)} className="text-zinc-400 hover:text-[#D47E30] transition-colors">
            <Bookmark className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <h3 className="font-sans font-bold text-lg mb-2 text-zinc-900 dark:text-white line-clamp-2">
        {trend.title}
      </h3>
      
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3 flex-grow">
        {trend.summary}
      </p>

      <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 mb-4 metric-mono">
        {renderMetrics()}
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-200 dark:border-white/10">
        <span className="text-xs text-zinc-500">{timeAgo(trend.timestamp)}</span>
        <button
          onClick={() => onReadDossier(trend)}
          className="text-sm font-medium text-[#D47E30] hover:text-[#B36820] transition-colors"
        >
          Read Trend Dossier →
        </button>
      </div>
    </div>
  );
}
