import type { TrendDossier } from "../../lib/mockData";
import { cn } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DemographicChartProps {
  dossier: TrendDossier;
}

export const DemographicChart: React.FC<DemographicChartProps> = ({ dossier }) => {
  const { theme } = useAppStore();
  const isDark = theme === "dark";

  return (
    <div className={cn("p-4 rounded-lg", isDark ? "bg-white/5" : "bg-black/5")}>
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dossier.demographics} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAccent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D47E30" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#D47E30" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.1)"}
              vertical={false}
            />
            <XAxis
              dataKey="ageGroup"
              stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#000" : "#FDFBD4",
                borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                color: isDark ? "#fff" : "#000",
                borderRadius: "8px",
              }}
              formatter={(value: any) => [`${value}`, "Engagement Volume"]}
              labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
            />
            <Line
              type="monotone"
              dataKey="engagement"
              stroke="#D47E30"
              strokeWidth={3}
              dot={{ r: 4, fill: "#D47E30", strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
