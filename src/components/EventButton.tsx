import { motion } from 'framer-motion';
import type { EventConfig } from '../types';

interface EventButtonProps {
  config: EventConfig;
  isLoading: boolean;
  onClick: () => void;
  disabled: boolean;
  index: number;
}

const colorStyles = {
  cyan: {
    border: 'border-accent-cyan/20 hover:border-accent-cyan/50',
    iconBg: 'bg-accent-cyan/8',
    iconBorder: 'border-accent-cyan/20',
    text: 'text-accent-cyan',
    glow: 'hover:shadow-[0_0_30px_rgba(34,211,238,0.08)]',
    loadingBorder: 'border-accent-cyan/40',
    sendBg: 'bg-accent-cyan/10 border-accent-cyan/25 text-accent-cyan',
    gradient: 'from-accent-cyan/5 via-transparent to-transparent',
  },
  emerald: {
    border: 'border-accent-emerald/20 hover:border-accent-emerald/50',
    iconBg: 'bg-accent-emerald/8',
    iconBorder: 'border-accent-emerald/20',
    text: 'text-accent-emerald',
    glow: 'hover:shadow-[0_0_30px_rgba(52,211,153,0.08)]',
    loadingBorder: 'border-accent-emerald/40',
    sendBg: 'bg-accent-emerald/10 border-accent-emerald/25 text-accent-emerald',
    gradient: 'from-accent-emerald/5 via-transparent to-transparent',
  },
  violet: {
    border: 'border-accent-violet/20 hover:border-accent-violet/50',
    iconBg: 'bg-accent-violet/8',
    iconBorder: 'border-accent-violet/20',
    text: 'text-accent-violet',
    glow: 'hover:shadow-[0_0_30px_rgba(167,139,250,0.08)]',
    loadingBorder: 'border-accent-violet/40',
    sendBg: 'bg-accent-violet/10 border-accent-violet/25 text-accent-violet',
    gradient: 'from-accent-violet/5 via-transparent to-transparent',
  },
  amber: {
    border: 'border-accent-amber/20 hover:border-accent-amber/50',
    iconBg: 'bg-accent-amber/8',
    iconBorder: 'border-accent-amber/20',
    text: 'text-accent-amber',
    glow: 'hover:shadow-[0_0_30px_rgba(251,191,36,0.08)]',
    loadingBorder: 'border-accent-amber/40',
    sendBg: 'bg-accent-amber/10 border-accent-amber/25 text-accent-amber',
    gradient: 'from-accent-amber/5 via-transparent to-transparent',
  },
};

export default function EventButton({ config, isLoading, onClick, disabled, index }: EventButtonProps) {
  const s = colorStyles[config.color];

  return (
    <motion.button
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: disabled ? 1 : 1.015, y: disabled ? 0 : -1 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        event-card group relative w-full text-left rounded-2xl p-4 border transition-all duration-400 cursor-pointer
        bg-surface-900/40
        ${s.border} ${s.glow}
        disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none
        overflow-hidden
      `}
    >
      {/* Gradient sweep on hover */}
      <div className={`absolute inset-0 bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-600 rounded-2xl`} />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className={`flex items-center justify-center w-11 h-11 rounded-xl ${s.iconBg} border ${s.iconBorder} transition-all duration-300 group-hover:scale-105`}>
            <span className="text-xl leading-none">{config.icon}</span>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-zinc-200 group-hover:text-white transition-colors">{config.label}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-zinc-600 font-mono">{config.payload.category}</span>
              <span className="text-zinc-800">•</span>
              <span className="text-[10px] text-zinc-600">{Object.keys(config.payload.fields).length} fields</span>
            </div>
          </div>
        </div>

        {/* Action area */}
        <div className="flex items-center">
          {isLoading ? (
            <div className="flex items-center gap-2.5 px-3 py-1.5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                className={`w-4 h-4 border-2 border-t-transparent rounded-full ${s.loadingBorder}`}
              />
              <span className="text-[11px] text-zinc-500 font-medium">Sending…</span>
            </div>
          ) : (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0 ${s.sendBg}`}>
              <span className="text-[11px] font-semibold">Send</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
          )}
        </div>
      </div>

      {/* Payload preview */}
      <div className="relative z-10 mt-3 px-3 py-2 rounded-lg bg-surface-950/60 border border-border-dim">
        <p className="text-[10px] font-mono text-zinc-600 leading-relaxed truncate">
          {JSON.stringify(config.payload.fields)}
        </p>
      </div>
    </motion.button>
  );
}
