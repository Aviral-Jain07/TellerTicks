import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import { cn } from "../../lib/utils";
import { Settings, LogOut } from "lucide-react";

export function UserAvatarMenu() {
  const { user, logout } = useAppStore();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="relative group">
      <button
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-lg text-sm font-bold transition-all duration-200",
          "bg-[#FDFBD4] text-zinc-900 hover:bg-white hover:shadow-md active:scale-95"
        )}
      >
        {user.avatar}
      </button>
      <div
        className={cn(
          "absolute top-full right-0 mt-1 w-56 rounded-lg overflow-hidden shadow-xl border z-50",
          "bg-white dark:bg-zinc-900 dark:border-zinc-700",
          "opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
        )}
      >
        <div className="px-3 py-2.5 border-b border-zinc-200 dark:border-zinc-700">
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            {user.name}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {user.email}
          </p>
          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full bg-brand-accent/10 text-brand-accent">
            {user.tier}
          </span>
        </div>
        <div className="py-1">
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Profile Settings
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
