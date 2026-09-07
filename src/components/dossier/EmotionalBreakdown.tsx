import React from "react";
import type { TrendDossier } from "../../lib/mockData";
import { cn } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface EmotionalBreakdownProps {
  dossier: TrendDossier;
}

const EMOTION_CONFIG = [
  { key: "excitement", label: "Excitement", color: "#22d3ee" },
  { key: "sarcasm", label: "Sarcasm", color: "#a78bfa" },
  { key: "anxiety", label: "Anxiety", color: "#f87171" },
  { key: "supportive", label: "Supportive", color: "#34d399" },
  { key: "outrage", label: "Outrage", color: "#fb923c" },
];

export const EmotionalBreakdown: React.FC<EmotionalBreakdownProps> = ({ dossier }) => {
  const { theme } = useAppStore();
  const isDark = theme === "dark";

  const eb = dossier?.emotionalBreakdown || ({} as any);

  const breakdownItems = EMOTION_CONFIG.map((cfg) => ({
    label: cfg.label,
    percentage: (eb as any)[cfg.key] ?? 20,
    color: cfg.color,
  }));

  const chartData = eb.timeline && eb.timeline.length > 0
    ? eb.timeline
    : [
        { hour: "0h", excitement: 10, sarcasm: 5, anxiety: 5, supportive: 10, outrage: 2 },
        { hour: "4h", excitement: 15, sarcasm: 8, anxiety: 7, supportive: 12, outrage: 5 },
        { hour: "8h", excitement: 25, sarcasm: 12, anxiety: 10, supportive: 15, outrage: 10 },
        { hour: "12h", excitement: 35, sarcasm: 20, anxiety: 15, supportive: 20, outrage: 20 },
        { hour: "16h", excitement: 40, sarcasm: 25, anxiety: 18, supportive: 22, outrage: 30 },
        { hour: "20h", excitement: 30, sarcasm: 22, anxiety: 14, supportive: 18, outrage: 25 },
        { hour: "24h", excitement: 20, sarcasm: 15, anxiety: 10, supportive: 15, outrage: 15 },
      ];

  return (
    <div className="space-y-8">
      {/* 5-State Breakdown Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {breakdownItems.map((item, idx) => (
          <div key={idx} className="space-y-1.5 p-3 rounded-lg bg-black/5 dark:bg-white/5">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="metric-mono font-bold" style={{ color: item.color }}>
                {item.percentage}%
              </span>
            </div>
            <div
              className={cn(
                "h-2 rounded-full overflow-hidden",
                isDark ? "bg-white/10" : "bg-black/10"
              )}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 24-hour Timeline AreaChart */}
      <div className={cn("p-4 rounded-xl border", isDark ? "bg-white/5 border-white/10" : "bg-black/5 border-black/10")}>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold opacity-80">
            24-Hour Emotional Shift Trajectory
          </h4>
          <span className="text-xs font-mono opacity-50">Stacked % Volume</span>
        </div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
                vertical={false}
              />
              <XAxis
                dataKey="hour"
                stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke={isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"}
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#09090b" : "#FDFBD4",
                  borderColor: isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)",
                  color: isDark ? "#fff" : "#000",
                  borderRadius: "8px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
                }}
                itemStyle={{ fontSize: "12px", fontFamily: "monospace" }}
                labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
              />
              <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
              {EMOTION_CONFIG.map((cfg) => (
                <Area
                  key={cfg.key}
                  type="monotone"
                  dataKey={cfg.key}
                  name={cfg.label}
                  stackId="1"
                  stroke={cfg.color}
                  fill={cfg.color}
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
