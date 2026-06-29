import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 border-b border-border-dim"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="relative group">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-accent-cyan via-accent-blue to-accent-violet shadow-lg shadow-accent-cyan/10">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-violet opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
          </div>

          <div className="flex flex-col">
            <h1 className="text-[15px] font-bold tracking-tight text-white leading-tight">
              Procmon Event Simulator
            </h1>
            <p className="text-[11px] text-zinc-600 font-medium tracking-widest uppercase">
              ProcCheck Console
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Status pill */}
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-800/80 border border-border-subtle backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-40 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald" />
            </span>
            <span className="text-[11px] font-semibold text-zinc-400">Online</span>
          </div>

          {/* Version */}
          <div className="hidden sm:flex items-center px-3 py-2 rounded-xl bg-surface-800/80 border border-border-subtle backdrop-blur-sm">
            <span className="text-[11px] font-mono font-medium text-zinc-600">v1.0.0</span>
          </div>
        </div>
      </div>

      {/* Shimmer border line */}
      <div className="absolute bottom-0 left-0 right-0 h-px shimmer-line bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent" />
    </motion.header>
  );
}
