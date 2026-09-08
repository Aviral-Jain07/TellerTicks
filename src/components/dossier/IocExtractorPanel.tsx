import React, { useState } from "react";
import type { IoCPayload } from "../../lib/mockData";
import { cn } from "../../lib/utils";
import { useAppStore } from "../../store/useAppStore";
import { 
  ShieldAlert, 
  ExternalLink, 
  Copy, 
  Check, 
  Wallet, 
  Globe, 
  FileCode, 
  AlertTriangle 
} from "lucide-react";

interface IocExtractorPanelProps {
  iocPayload?: IoCPayload;
}

export function IocExtractorPanel({ iocPayload }: IocExtractorPanelProps) {
  const { theme } = useAppStore();
  const isDark = theme === "dark";
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!iocPayload) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const hasUrls = (iocPayload.urls && iocPayload.urls.length > 0);
  const hasWallets = (iocPayload.wallets && iocPayload.wallets.length > 0);
  const hasHashes = (iocPayload.hashes && iocPayload.hashes.length > 0) || Boolean(iocPayload.contractAddress);

  return (
    <div className={cn(
      "rounded-xl border p-5 space-y-6 transition-all duration-200",
      isDark 
        ? "bg-black/40 border-red-500/20 backdrop-blur-md" 
        : "bg-amber-50/80 border-amber-900/15 shadow-sm"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-red-500/15 text-red-500">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold font-mono tracking-tight flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
              Extracted Payloads & IoCs
              <span className="text-[10px] uppercase font-sans font-semibold px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30">
                OSINT Verified
              </span>
            </h4>
            <p className="text-xs text-muted-foreground">
              Automated threat-hunting extraction of domains, signatures, and addresses.
            </p>
          </div>
        </div>
      </div>

      {/* Sub-section 1: Phishing & Malicious URLs */}
      {hasUrls && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span>Phishing & Malicious Domains ({iocPayload.urls.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {iocPayload.urls.map((item, idx) => {
              const copyId = `url-${idx}`;
              const isCopied = copiedKey === copyId;
              const isMalicious = item.risk === 'malicious';
              const isSuspicious = item.risk === 'suspicious';

              return (
                <div 
                  key={idx}
                  className={cn(
                    "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-lg border text-xs font-mono transition-all",
                    isDark ? "bg-white/[0.03] border-white/5" : "bg-white/80 border-amber-900/10 shadow-xs"
                  )}
                >
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      isMalicious 
                        ? "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30" 
                        : isSuspicious 
                          ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    )}>
                      {item.risk}
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200 truncate">
                      {item.defanged}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-sans">
                      ({item.type})
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(item.url, copyId)}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-sans font-medium transition-all shrink-0",
                      isCopied 
                        ? "bg-emerald-500 text-white" 
                        : "bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20 text-zinc-800 dark:text-zinc-200"
                    )}
                    title="Copy original URL"
                  >
                    {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {isCopied ? "Copied" : "Copy IoC"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-section 2: Flagged Crypto Wallets */}
      {hasWallets && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            <Wallet className="w-3.5 h-3.5 text-amber-500" />
            <span>Flagged Crypto Wallets & Exfiltration Contracts ({iocPayload.wallets.length})</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {iocPayload.wallets.map((wallet, idx) => {
              const copyId = `wallet-${idx}`;
              const isCopied = copiedKey === copyId;
              const isBlacklisted = wallet.risk === 'blacklisted';

              const chainBadgeColor = 
                wallet.chain === 'Solana' ? "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/30" :
                wallet.chain === 'Ethereum' ? "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30" :
                "bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30";

              return (
                <div 
                  key={idx}
                  className={cn(
                    "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-lg border text-xs font-mono transition-all",
                    isDark ? "bg-white/[0.03] border-white/5" : "bg-white/80 border-amber-900/10 shadow-xs"
                  )}
                >
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold border", chainBadgeColor)}>
                      {wallet.chain}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      isBlacklisted 
                        ? "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30" 
                        : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                    )}>
                      {wallet.risk}
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200 truncate select-all">
                      {wallet.address}
                    </span>
                    <span className="text-[11px] text-zinc-500 font-sans">
                      — {wallet.tag}
                    </span>
                  </div>

                  <button
                    onClick={() => handleCopy(wallet.address, copyId)}
                    className={cn(
                      "flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-sans font-medium transition-all shrink-0",
                      isCopied 
                        ? "bg-emerald-500 text-white" 
                        : "bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 dark:hover:bg-white/20 text-zinc-800 dark:text-zinc-200"
                    )}
                    title="Copy wallet address"
                  >
                    {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {isCopied ? "Copied" : "Copy Wallet"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Sub-section 3: Contract Address & Payload Hashes */}
      {hasHashes && (
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            <FileCode className="w-3.5 h-3.5 text-ai-cyan" />
            <span>Extracted Signatures & Contract Hashes</span>
          </div>

          <div className="space-y-2">
            {iocPayload.contractAddress && (
              <div className={cn(
                "flex items-center justify-between gap-2 p-2 rounded-lg border text-xs font-mono",
                isDark ? "bg-white/[0.02] border-white/5" : "bg-white/70 border-amber-900/10"
              )}>
                <div className="flex items-center gap-2 truncate">
                  <span className="text-zinc-500">Contract:</span>
                  <span className="font-semibold text-brand-accent truncate select-all">
                    {iocPayload.contractAddress}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(iocPayload.contractAddress!, "contract")}
                  className="px-2 py-0.5 rounded text-[10px] font-sans bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 shrink-0"
                >
                  {copiedKey === "contract" ? "Copied" : "Copy"}
                </button>
              </div>
            )}

            {iocPayload.hashes?.map((hash, idx) => (
              <div 
                key={idx}
                className={cn(
                  "flex items-center justify-between gap-2 p-2 rounded-lg border text-xs font-mono",
                  isDark ? "bg-white/[0.02] border-white/5" : "bg-white/70 border-amber-900/10"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-zinc-500">SHA256:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 truncate select-all">
                    {hash}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(hash, `hash-${idx}`)}
                  className="px-2 py-0.5 rounded text-[10px] font-sans bg-zinc-200 dark:bg-white/10 hover:bg-zinc-300 shrink-0"
                >
                  {copiedKey === `hash-${idx}` ? "Copied" : "Copy"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
