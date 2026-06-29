import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LogEntry } from '../types';

interface Props { logs: LogEntry[] }

const typeColors: Record<LogEntry['type'], string> = {
  request: 'text-accent-cyan',
  response: 'text-accent-emerald',
  error: 'text-accent-rose',
  info: 'text-accent-amber',
};
const typeLabels: Record<LogEntry['type'], string> = {
  request: 'REQ', response: 'RES', error: 'ERR', info: 'INF',
};

export default function TerminalLog({ logs }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card overflow-hidden flex flex-col"
      style={{ minHeight: '340px', maxHeight: '500px' }}
    >
      {/* Terminal Chrome */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border-dim bg-surface-900/60">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center gap-2 ml-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-600">
              <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span className="text-[11px] font-mono text-zinc-500 font-medium">proccheck — logs</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-50 animate-ping" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-emerald" />
          </span>
          <span className="text-[9px] font-mono font-bold tracking-widest text-zinc-600 uppercase">Live</span>
        </div>
      </div>

      {/* Log Lines */}
      <div className="flex-1 overflow-y-auto p-4 space-y-0.5 terminal-scroll font-mono text-[11px]">
        <AnimatePresence mode="popLayout">
          {logs.length === 0 ? (
            <motion.div key="empty-terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-zinc-700 py-12 justify-center">
              <span className="text-zinc-600">$</span>
              <span>Waiting for events…</span>
              <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block w-1.5 h-4 bg-accent-cyan/60 rounded-sm" />
            </motion.div>
          ) : (
            logs.map((log) => (
              <motion.div key={log.id} layout initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.12 }}
                className="flex items-start gap-2 py-1 px-2 -mx-2 rounded hover:bg-white/[0.015] transition-colors group">
                <span className="text-zinc-700 flex-shrink-0 w-[72px] tabular-nums">{log.timestamp}</span>
                <span className={`flex-shrink-0 font-bold w-[32px] ${typeColors[log.type]}`}>{typeLabels[log.type]}</span>
                <span className="text-zinc-500 break-all group-hover:text-zinc-400 transition-colors">{log.message}</span>
              </motion.div>
            ))
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
}
