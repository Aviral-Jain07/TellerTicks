import { useState } from 'react';
import type { TrendItem } from '../../lib/mockData';
import { cn, formatNumber, timeAgo } from '../../lib/utils';
import { 
  TrendingUp, Bookmark, ShieldAlert, Bot, UserCheck
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface TrendCardProps {
  trend: TrendItem;
  onReadDossier: (trend: TrendItem) => void;
}

export function TrendCard({ trend, onReadDossier }: TrendCardProps) {
  const theme = useAppStore(state => state.theme);
  const [bookmarked, setBookmarked] = useState(false);

  const threatScore = trend.threatRisk?.score ?? 45;
  const threatBadgeClasses = 
    threatScore >= 75 ? 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30' :
    threatScore >= 40 ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' :
    'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';

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
      "flex flex-col p-4 rounded-xl transition-all duration-300 border h-full gap-3",
      theme === 'dark' ? "glass-card border-white/10" : "bg-[#F5F2C2] border-amber-900/10 shadow-sm"
    )}>
      {/* Top Row: Rank, Platform, Threat Score & Velocity */}
      <div className="flex justify-between items-start gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="w-6 h-6 rounded-full bg-[#D47E30] text-white flex items-center justify-center text-xs font-bold shrink-0">
            {trend.rank}
          </div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-white/10 capitalize text-zinc-600 dark:text-zinc-300">
            {trend.platform}
          </span>
          <span className={cn("flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border", threatBadgeClasses)}>
            <ShieldAlert className="w-3 h-3" />
            THREAT {threatScore}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-[#D47E30]">
            <TrendingUp className="w-4 h-4" />
            <span className="metric-mono text-sm font-bold">{trend.velocityScore}</span>
          </div>
          <button onClick={() => setBookmarked(!bookmarked)} className="text-zinc-400 hover:text-[#D47E30] transition-colors">
            <Bookmark className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white line-clamp-2">
        {trend.title}
      </h3>
      
      <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 flex-grow">
        {trend.summary}
      </p>

      {/* CIB Authenticity Meter */}
      {trend.cibMetrics && (
        <div className="space-y-1.5 p-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 text-xs">
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
              "font-medium truncate",
              trend.cibMetrics.isCoordinated ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
            )}>
              {trend.cibMetrics.flag}
            </span>
          </div>
        </div>
      )}

      {/* Platform Metrics */}
      <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 py-1 metric-mono border-t border-zinc-200 dark:border-white/10">
        {renderMetrics()}
      </div>

      {/* Footer CTA */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-zinc-200 dark:border-white/10">
        <span className="text-xs text-zinc-500">{timeAgo(trend.timestamp)}</span>
        <button
          onClick={() => onReadDossier(trend)}
          className="flex items-center gap-1.5 text-xs font-semibold text-white bg-brand-accent hover:bg-brand-accent/90 px-3 py-1.5 rounded-lg shadow-sm active:scale-95 transition-all"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          Deep Dive →
        </button>
      </div>
    </div>
  );
}
