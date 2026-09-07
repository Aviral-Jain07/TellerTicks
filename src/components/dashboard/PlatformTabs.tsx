import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Globe } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { Platform } from '../../lib/mockData';
import {
  XIcon,
  TelegramIcon,
  InstagramIcon,
  FacebookIcon,
  RedditIcon,
  YouTubeIcon,
} from '../common/BrandIcons';

const platforms: { id: Platform | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'All', icon: Globe },
  { id: 'x', label: 'X', icon: XIcon },
  { id: 'telegram', label: 'Telegram', icon: TelegramIcon },
  { id: 'instagram', label: 'Instagram', icon: InstagramIcon },
  { id: 'facebook', label: 'Facebook', icon: FacebookIcon },
  { id: 'reddit', label: 'Reddit', icon: RedditIcon },
  { id: 'youtube', label: 'YouTube', icon: YouTubeIcon },
];

export function PlatformTabs() {
  const { activePlatform, setActivePlatform } = useAppStore();

  return (
    <div className="flex overflow-x-auto scrollbar-thin pb-2 gap-2">
      {platforms.map((p) => (
        <button
          key={p.id}
          onClick={() => setActivePlatform(p.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200",
            activePlatform === p.id
              ? "bg-[#D47E30] text-white shadow-[0_0_15px_rgba(212,126,48,0.5)] glow-active"
              : "bg-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"
          )}
        >
          <p.icon className="w-4 h-4" />
          <span className="font-medium text-sm">{p.label}</span>
        </button>
      ))}
    </div>
  );
}
