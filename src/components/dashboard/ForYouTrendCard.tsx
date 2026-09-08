import type { TrendItem } from '../../lib/mockData';
import { useAppStore } from '../../store/useAppStore';
import { cn, formatNumber, timeAgo } from '../../lib/utils';
import { Sparkles, Bookmark, Activity, ShieldAlert, Bot, UserCheck } from 'lucide-react';
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

  const threatScore = trend.threatRisk?.score ?? 45;
  const threatLevel = trend.threatRisk?.level ?? (threatScore >= 75 ? 'CRITICAL' : threatScore >= 40 ? 'MEDIUM' : 'LOW');
  
  const threatBadgeClasses = 
    threatScore >= 75 ? 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30' :
    threatScore >= 40 ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' :
    'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';

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
      {/* Top Row: Platform, Threat Score & Velocity */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold">
            {getPlatformIcon(trend.platform)}
            <span className="capitalize">{trend.platform}</span>
          </div>

          {/* Threat Risk Score Badge */}
          <div className={cn("flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border", threatBadgeClasses)}>
            <ShieldAlert className="w-3 h-3" />
            <span>THREAT {threatScore}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs shrink-0">
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
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-ai-violet/5 border border-ai-violet/10">
          <Sparkles className="w-3.5 h-3.5 text-ai-violet shrink-0 mt-0.5" />
          <p className="text-xs text-ai-violet/90 leading-relaxed">{trend.whyMatches}</p>
        </div>
      )}

      {/* CIB Authenticity Meter */}
      {trend.cibMetrics && (
        <div className="space-y-1.5 p-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="flex items-center gap-1 font-semibold text-zinc-700 dark:text-zinc-300">
              <Bot className="w-3 h-3 text-red-500" />
              Bot {trend.cibMetrics.botPercentage}%
            </span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">CIB Authenticity</span>
            <span className="flex items-center gap-1 font-semibold text-zinc-700 dark:text-zinc-300">
              <UserCheck className="w-3 h-3 text-emerald-500" />
              Human {trend.cibMetrics.humanPercentage}%
            </span>
          </div>
          {/* Dual-color progress bar */}
          <div className="h-1.5 w-full bg-emerald-500/30 rounded-full overflow-hidden flex">
            <div 
              className={cn(
                "h-full transition-all duration-500",
                trend.cibMetrics.botPercentage > 60 ? "bg-red-500" : trend.cibMetrics.botPercentage > 35 ? "bg-amber-500" : "bg-zinc-400"
              )} 
              style={{ width: `${trend.cibMetrics.botPercentage}%` }} 
            />
            <div className="h-full bg-emerald-500 flex-1" />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className={cn(
              "font-medium",
              trend.cibMetrics.isCoordinated ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
            )}>
              {trend.cibMetrics.flag}
            </span>
            {trend.cibMetrics.sybilClusterCount > 0 && (
              <span className="opacity-60 text-zinc-500">{trend.cibMetrics.sybilClusterCount} sybil clusters</span>
            )}
          </div>
        </div>
      )}

      {/* Native Platform Metrics */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 py-2.5 border-y border-black/5 dark:border-white/5">
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
            className="bg-brand-accent hover:bg-brand-accent/90 text-white text-xs h-8 px-3.5 flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            onClick={() => onReadDossier(trend)}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Deep Dive →
          </Button>
        </div>
      </div>
    </div>
  );
}
