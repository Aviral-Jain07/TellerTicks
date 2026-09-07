import { cn } from "../../lib/utils";
import { Activity } from "lucide-react";
import { ViewSwitcher } from "./ViewSwitcher";
import { ScopeSelector } from "./ScopeSelector";
import { ThemeToggle } from "./ThemeToggle";
import { UserAvatarMenu } from "./UserAvatarMenu";

export function GlobalHeader() {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-zinc-950 border-b border-zinc-800",
        "px-4 md:px-6 py-2.5"
      )}
    >
      <div className="flex items-center justify-between max-w-[1440px] mx-auto">
        {/* Left — Logo */}
        <div className="flex items-center gap-2.5 min-w-[180px]">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-accent/15">
            <Activity className="w-5 h-5 text-brand-accent" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="text-[#D47E30]">Teller</span>
            <span className="text-white">Ticks</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-ai-cyan/15 text-ai-cyan border border-ai-cyan/20">
            <span className="live-dot bg-ai-cyan" />
            AI LIVE
          </span>
        </div>

        {/* Center — View Switcher + Scope */}
        <div className="hidden md:flex items-center gap-3">
          <ViewSwitcher />
          <div className="w-px h-6 bg-zinc-700" />
          <ScopeSelector />
        </div>

        {/* Right — Theme + Avatar */}
        <div className="flex items-center gap-2 min-w-[100px] justify-end">
          <ThemeToggle />
          <UserAvatarMenu />
        </div>
      </div>

      {/* Mobile center row */}
      <div className="flex md:hidden items-center justify-center gap-3 mt-2 pt-2 border-t border-zinc-800">
        <ViewSwitcher />
        <ScopeSelector />
      </div>
    </header>
  );
}
