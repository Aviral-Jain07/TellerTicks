import type { TrendItem } from '../../lib/mockData';
import { useAppStore } from '../../store/useAppStore';
import { cn, formatNumber, timeAgo } from '../../lib/utils';
import { Sparkles, Bookmark, Activity } from 'lucide-react';
import {
  XIcon,
  TelegramIcon,
  InstagramIcon,
  FacebookIcon,
  RedditIcon,
  YouTubeIcon,
} from '../common/BrandIcons';
import { Button } from '../ui/button';

interface ForYouTrendCardProps {
  trend: TrendItem;
  onReadDossier: (trend: TrendItem) => void;
}

export function ForYouTrendCard({ trend, onReadDossier }: ForYouTrendCardProps) {
  const { savedDossierIds, toggleBookmark } = useAppStore();
  const isSaved = savedDossierIds.includes(trend.id);

  const getPlatformIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p === 'x' || p === 'twitter') return <XIcon className="w-3 h-3" />;
    if (p === 'telegram') return <TelegramIcon className="w-3 h-3" />;
    if (p === 'instagram') return <InstagramIcon className="w-3 h-3" />;
    if (p === 'reddit') return <RedditIcon className="w-3 h-3" />;
    if (p === 'youtube') return <YouTubeIcon className="w-3 h-3" />;
    if (p === 'facebook') return <FacebookIcon className="w-3 h-3" />;
    return <Activity className="w-3 h-3" />;
  };

  const velocityColor = 
    trend.velocityScore > 80 ? 'text-ai-cyan' : 
    trend.velocityScore > 50 ? 'text-ai-emerald' : 'text-amber-500';

  const getMetricsDisplay = () => {
    const m = trend.platformMetrics as any;
    switch (trend.platform) {
      case 'x': return [{label: 'Views', val: m.views}, {label: 'Likes', val: m.likes}, {label: 'Reposts', val: m.reposts}, {label: 'Quotes', val: m.quotes}];
      case 'telegram': return [{label: 'Views', val: m.views}, {label: 'Forwards', val: m.forwards}, {label: 'Replies', val: m.replies}];
      case 'instagram': return [{label: 'Views', val: m.views}, {label: 'Likes', val: m.likes}, {label: 'Saves', val: m.saves}, {label: 'Shares', val: m.shares}];
      case 'reddit': return [{label: 'Upvotes', val: m.upvotes}, {label: 'Comments', val: m.comments}, {label: 'Crossposts', val: m.crossposts}];
      case 'youtube': return [{label: 'Views', val: m.views}, {label: 'Likes', val: m.likes}, {label: 'Comments', val: m.comments}];
      case 'facebook': return [{label: 'Views', val: m.views}, {label: 'Reactions', val: m.reactions}, {label: 'Shares', val: m.shares}, {label: 'Comments', val: m.comments}];
      default: return [];
    }
  };

  const metrics = getMetricsDisplay();

  return (
    <div className={cn(
      "flex flex-col gap-4 p-5 rounded-xl transition-all duration-300",
      "bg-[#F5F2C2] dark:bg-black/60 dark:glass-card hover:glow-active border border-amber-900/10 dark:border-white/5 shadow-sm"
    )}>
      {/* Top Row: Platform & Velocity */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold">
          {getPlatformIcon(trend.platform)}
          <span>{trend.platform}</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <span className="text-muted-foreground uppercase tracking-wider text-[10px]">Velocity</span>
          <span className={cn("metric-mono font-bold text-sm", velocityColor)}>
            {trend.velocityScore}
          </span>
        </div>
      </div>

      {/* Main Info */}
      <div className="space-y-1.5">
        <h3 className="font-semibold text-lg leading-tight line-clamp-2">{trend.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{trend.summary}</p>
      </div>

      {/* Why this matches */}
      {trend.whyMatches && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-ai-violet/5 border border-ai-violet/10">
          <Sparkles className="w-4 h-4 text-ai-violet shrink-0 mt-0.5" />
          <p className="text-xs text-ai-violet/90 leading-relaxed">{trend.whyMatches}</p>
        </div>
      )}

      {/* Native Platform Metrics */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 py-3 border-y border-black/5 dark:border-white/5">
        {metrics.map((m, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase">{m.label}</span>
            <span className="metric-mono text-sm">{formatNumber(m.val)}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="text-xs text-muted-foreground metric-mono">
          {timeAgo(trend.timestamp || new Date().toISOString())}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-brand-accent"
            onClick={() => toggleBookmark(trend.id)}
          >
            <Bookmark className={cn("w-4 h-4", isSaved && "fill-brand-accent text-brand-accent")} />
          </Button>
          <Button 
            size="sm" 
            className="bg-brand-accent hover:bg-brand-accent/90 text-white text-xs h-8 px-3"
            onClick={() => onReadDossier(trend)}
          >
            Read Dossier
          </Button>
        </div>
      </div>
    </div>
  );
}
