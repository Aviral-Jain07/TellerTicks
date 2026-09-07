import { useAppStore } from "../store/useAppStore";
import { ForYouView } from "../components/dashboard/ForYouView";
import { ExploreAllView } from "../components/dashboard/ExploreAllView";
import { cn } from "../lib/utils";

export function DashboardPage() {
  const activeView = useAppStore((s) => s.activeView);
  const theme = useAppStore((s) => s.theme);

  return (
    <main
      className={cn(
        "min-h-[calc(100vh-60px)] transition-colors duration-300",
        theme === "dark" ? "bg-black" : "bg-[#FDFBD4]"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6">
        {activeView === "foryou" ? <ForYouView /> : <ExploreAllView />}
      </div>
    </main>
  );
}
