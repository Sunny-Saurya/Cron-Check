import { motion, AnimatePresence } from 'framer-motion';
import type { SentEvent } from '../types';
import { truncateJson } from '../lib/utils';

interface Props { events: SentEvent[] }

export default function RecentEventsPanel({ events }: Props) {
  const ok = events.filter(e => e.status === 'success').length;
  const err = events.filter(e => e.status === 'error').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card flex flex-col"
      style={{ minHeight: '340px', maxHeight: '500px' }}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-dim">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent-violet/8 border border-accent-violet/15">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-violet">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <span className="section-label">Recent Events</span>
        </div>
        <div className="flex items-center gap-2">
          {ok > 0 && <span className="text-[9px] font-bold tracking-wider text-accent-emerald bg-accent-emerald/8 px-2 py-0.5 rounded-md border border-accent-emerald/12">{ok} OK</span>}
          {err > 0 && <span className="text-[9px] font-bold tracking-wider text-accent-rose bg-accent-rose/8 px-2 py-0.5 rounded-md border border-accent-rose/12">{err} ERR</span>}
          <span className="text-[10px] font-mono text-zinc-700 bg-surface-800/80 px-2 py-0.5 rounded-md">{events.length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 terminal-scroll">
        <AnimatePresence mode="popLayout">
          {events.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center h-56 text-zinc-700">
              <div className="relative mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-surface-800/60 border border-border-dim">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-zinc-700"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                </div>
              </div>
              <p className="text-xs font-semibold text-zinc-600">No events sent yet</p>
              <p className="text-[10px] mt-1 text-zinc-800">Click an event button to fire a webhook</p>
            </motion.div>
          ) : (
            events.map((event, i) => (
              <motion.div key={event.id} layout initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                className={`group p-3.5 rounded-xl border transition-all duration-200 ${i === 0 ? 'bg-surface-800/40 border-border-medium' : 'bg-surface-900/40 border-border-dim hover:border-border-subtle'}`}>
                {i === 0 && <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 ${event.status === 'success' ? 'bg-accent-emerald/10 border border-accent-emerald/20' : 'bg-accent-rose/10 border border-accent-rose/20'}`}>
                      {event.status === 'success'
                        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent-emerald"><polyline points="20 6 9 17 4 12" /></svg>
                        : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-accent-rose"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      }
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-zinc-300 block truncate">{event.eventType}</span>
                      <span className="text-[10px] text-zinc-700 font-mono">{event.timestamp}</span>
                    </div>
                  </div>
                  {event.statusCode && (
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex-shrink-0 ${event.statusCode < 300 ? 'bg-accent-emerald/8 text-accent-emerald border border-accent-emerald/12' : 'bg-accent-rose/8 text-accent-rose border border-accent-rose/12'}`}>{event.statusCode}</span>
                  )}
                </div>
                <div className="mt-2.5 px-3 py-2 rounded-lg bg-surface-950/70 border border-border-dim">
                  <p className="text-[10px] font-mono text-zinc-600 leading-relaxed truncate">{truncateJson(event.payload)}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
