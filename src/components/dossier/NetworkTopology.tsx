import React, { useState } from "react";
import type { TrendDossier, NetworkNode } from "../../lib/mockData";
import { cn } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";

interface NetworkTopologyProps {
  dossier: TrendDossier;
}

const ROLE_COLORS: Record<string, string> = {
  Originator: "#D47E30", // brand-accent
  "Key Amplifier": "#22d3ee", // cyan
  "Bridge Node": "#a78bfa", // violet
  "Community Hub": "#34d399", // emerald
};

export const NetworkTopology: React.FC<NetworkTopologyProps> = ({ dossier }) => {
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);

  const topology = dossier?.networkTopology;
  const nodes: NetworkNode[] = topology
    ? [topology.originator, ...(topology.amplifiers || [])].filter(Boolean)
    : ((dossier as any)?.networkNodes || []);
  
  // Calculate connections between nodes
  const connections: { source: NetworkNode; target: NetworkNode }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const connList = nodes[i].connections || [];
    for (let j = 0; j < connList.length; j++) {
      const targetId = connList[j];
      const targetNode = nodes.find((n) => n.id === targetId);
      if (targetNode) {
        connections.push({
          source: nodes[i],
          target: targetNode,
        });
      }
    }
  }

  return (
    <div className="relative w-full h-[400px] bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col">
      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-3 text-xs font-mono bg-white/70 dark:bg-black/70 p-2 rounded-lg backdrop-blur-md border border-black/5 dark:border-white/10">
        {Object.entries(ROLE_COLORS).map(([role, color]) => (
          <div key={role} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className="opacity-80">{role}</span>
          </div>
        ))}
      </div>

      {/* SVG Canvas */}
      <svg viewBox="0 0 500 400" className="w-full h-full flex-1">
        {/* Draw lines */}
        {connections.map((conn, idx) => (
          <line
            key={`conn-${idx}`}
            x1={conn.source.x}
            y1={conn.source.y}
            x2={conn.target.x}
            y2={conn.target.y}
            stroke={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"}
            strokeWidth={1.5}
            strokeDasharray={conn.source.role === "Originator" ? "none" : "4 2"}
          />
        ))}

        {/* Draw nodes */}
        {nodes.map((node) => {
          const isOriginator = node.role === "Originator";
          const radius = isOriginator ? 22 : 15;
          const color = ROLE_COLORS[node.role] || "#D47E30";

          return (
            <g
              key={node.id}
              className="cursor-pointer transition-transform duration-300"
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {isOriginator && (
                <>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius + 12}
                    fill={color}
                    className="animate-pulse-glow opacity-25"
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={radius + 6}
                    fill="none"
                    stroke={color}
                    strokeWidth={1.5}
                    className="animate-ping opacity-20"
                  />
                </>
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={radius}
                fill={color}
                stroke={isDark ? "#09090b" : "#ffffff"}
                strokeWidth={2.5}
                className={isOriginator ? "glow-active" : ""}
              />
              <text
                x={node.x}
                y={node.y + radius + 14}
                textAnchor="middle"
                className="font-mono text-[11px] font-medium fill-current opacity-90 pointer-events-none"
                fill={isDark ? "#ffffff" : "#1c1917"}
              >
                {node.handle}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Tooltip */}
      {hoveredNode && (
        <div
          className={cn(
            "absolute z-50 pointer-events-none p-3 rounded-lg border shadow-2xl backdrop-blur-xl font-mono text-xs min-w-[170px]",
            isDark
              ? "bg-zinc-950/95 border-white/20 text-white shadow-black/80"
              : "bg-white/95 border-black/20 text-zinc-900 shadow-zinc-400/40"
          )}
          style={{
            left: `${Math.min(Math.max(10, (hoveredNode.x / 500) * 100), 75)}%`,
            top: `${Math.max(10, (hoveredNode.y / 400) * 100 - 20)}%`,
          }}
        >
          <div className="font-bold text-sm text-brand-accent mb-1">{hoveredNode.handle}</div>
          <div className="text-muted-foreground flex justify-between gap-2 py-0.5">
            <span>Role:</span>
            <span className="font-semibold text-foreground">{hoveredNode.role}</span>
          </div>
          <div className="text-muted-foreground flex justify-between gap-2 py-0.5">
            <span>Influence:</span>
            <span className="font-bold text-brand-accent">{hoveredNode.influenceScore}/100</span>
          </div>
        </div>
      )}
    </div>
  );
};
