import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import { 
  AlertOctagon, 
  ShieldAlert, 
  CheckCircle2, 
  Loader2, 
  Ban, 
  Radio, 
  Cpu
} from "lucide-react";

interface IncidentResponseActionsProps {
  trendId: string;
  catalystAccount: string;
  contractAddress?: string;
}

type ActionStatus = "idle" | "dispatching" | "dispatched";

export function IncidentResponseActions({
  trendId,
  catalystAccount,
  contractAddress,
}: IncidentResponseActionsProps) {
  const { theme } = useAppStore();
  const isDark = theme === "dark";

  const [socStatus, setSocStatus] = useState<ActionStatus>("idle");
  const [freezeStatus, setFreezeStatus] = useState<ActionStatus>("idle");
  const [flagStatus, setFlagStatus] = useState<ActionStatus>("idle");
  const [notification, setNotification] = useState<string | null>(null);

  const triggerSocAlert = () => {
    setSocStatus("dispatching");
    setTimeout(() => {
      setSocStatus("dispatched");
      setNotification(`🚨 High-Priority SOC Alert dispatched to Tier-3 Incident Response team (Ticket #SOC-${Math.floor(1000 + Math.random() * 9000)})`);
    }, 900);
  };

  const triggerContractFreeze = () => {
    setFreezeStatus("dispatching");
    setTimeout(() => {
      setFreezeStatus("dispatched");
      setNotification(`🛡️ Emergency Circuit Breaker Freeze proposal queued to Multisig Guardians for target: ${contractAddress || "0x71C...b29"}`);
    }, 1100);
  };

  const triggerFlagOriginator = () => {
    setFlagStatus("dispatching");
    setTimeout(() => {
      setFlagStatus("dispatched");
      setNotification(`🛑 Originator account ${catalystAccount} added to Sybil/CIB Threat Actor Blacklist.`);
    }, 800);
  };

  return (
    <div className={cn(
      "rounded-xl border p-5 space-y-4 transition-all duration-200",
      isDark 
        ? "bg-zinc-950/80 border-zinc-800" 
        : "bg-white border-zinc-200 shadow-sm"
    )}>
      {/* Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-red-500/10 text-red-500">
            <AlertOctagon className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-mono tracking-tight uppercase text-zinc-900 dark:text-zinc-100">
              Active Incident Response Controls
            </h4>
            <p className="text-[11px] text-muted-foreground">
              Automated defense workflows and smart contract mitigation triggers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-ai-emerald/10 text-ai-emerald border border-ai-emerald/20">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>SOC BRIDGE LIVE</span>
        </div>
      </div>

      {/* Interactive Action Notification Banner */}
      {notification && (
        <div className="p-3 rounded-lg text-xs font-mono bg-brand-accent/10 border border-brand-accent/30 text-zinc-900 dark:text-zinc-100 flex items-start gap-2 animate-in fade-in slide-in-from-top-1">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold">{notification}</span>
            <span className="block text-[10px] opacity-70 mt-0.5">Dispatched at {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      )}

      {/* The 3 Incident Response Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Button 1: Alert SOC Team */}
        <button
          onClick={triggerSocAlert}
          disabled={socStatus !== "idle"}
          className={cn(
            "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold font-sans transition-all shadow-sm",
            socStatus === "dispatched"
              ? "bg-emerald-600 text-white cursor-default"
              : socStatus === "dispatching"
                ? "bg-zinc-700 text-white cursor-wait"
                : "bg-red-600 hover:bg-red-700 active:scale-95 text-white hover:shadow-red-600/30 hover:shadow-md"
          )}
        >
          {socStatus === "dispatching" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : socStatus === "dispatched" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <AlertOctagon className="w-4 h-4" />
          )}
          <span>
            {socStatus === "dispatched" 
              ? "SOC Dispatched ✓" 
              : socStatus === "dispatching" 
                ? "Alerting SOC..." 
                : "🚨 Alert SOC Team"}
          </span>
        </button>

        {/* Button 2: Request Smart Contract Freeze */}
        <button
          onClick={triggerContractFreeze}
          disabled={freezeStatus !== "idle"}
          className={cn(
            "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold font-sans transition-all shadow-sm",
            freezeStatus === "dispatched"
              ? "bg-emerald-600 text-white cursor-default"
              : freezeStatus === "dispatching"
                ? "bg-zinc-700 text-white cursor-wait"
                : "bg-amber-600 hover:bg-amber-700 active:scale-95 text-white hover:shadow-amber-600/30 hover:shadow-md"
          )}
        >
          {freezeStatus === "dispatching" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : freezeStatus === "dispatched" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Cpu className="w-4 h-4" />
          )}
          <span>
            {freezeStatus === "dispatched" 
              ? "Freeze Queued ✓" 
              : freezeStatus === "dispatching" 
                ? "Submitting to Multisig..." 
                : "🛡️ Request Contract Freeze"}
          </span>
        </button>

        {/* Button 3: Flag Originator */}
        <button
          onClick={triggerFlagOriginator}
          disabled={flagStatus !== "idle"}
          className={cn(
            "flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-semibold font-sans transition-all shadow-sm",
            flagStatus === "dispatched"
              ? "bg-emerald-600 text-white cursor-default"
              : flagStatus === "dispatching"
                ? "bg-zinc-700 text-white cursor-wait"
                : "bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-800 dark:hover:bg-zinc-700 active:scale-95 text-white border border-zinc-700"
          )}
        >
          {flagStatus === "dispatching" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : flagStatus === "dispatched" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Ban className="w-4 h-4 text-red-400" />
          )}
          <span>
            {flagStatus === "dispatched" 
              ? "Originator Flagged ✓" 
              : flagStatus === "dispatching" 
                ? "Blacklisting..." 
                : "🛑 Flag Originator"}
          </span>
        </button>
      </div>
    </div>
  );
}
