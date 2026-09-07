import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppStore } from '../../store/useAppStore';

interface MediaBoardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accentColor?: string;
}

export function MediaBoard({ title, icon, children, accentColor = 'text-pink-500' }: MediaBoardProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const theme = useAppStore(state => state.theme);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={cn(
      "rounded-xl p-4 md:p-6 mb-6 border transition-colors",
      theme === 'dark' ? "glass-card border-white/10" : "bg-[#FDFBD4] border-[#FDFBD4] shadow-sm"
    )}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={accentColor}>{icon}</div>
          <h2 className="text-lg font-bold font-sans text-zinc-900 dark:text-white">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-1 rounded-full bg-white/50 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-400 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-1 rounded-full bg-white/50 hover:bg-white dark:bg-white/5 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-400 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-thin pb-4 snap-x snap-mandatory"
      >
        {children}
      </div>
    </div>
  );
}
