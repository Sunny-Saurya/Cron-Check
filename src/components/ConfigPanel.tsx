import { motion } from 'framer-motion';

interface ConfigPanelProps {
  apiKey: string;
  endpointUrl: string;
  onApiKeyChange: (value: string) => void;
  onEndpointUrlChange: (value: string) => void;
}

export default function ConfigPanel({
  apiKey,
  endpointUrl,
  onApiKeyChange,
  onEndpointUrlChange,
}: ConfigPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card p-6 space-y-5"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent-cyan/8 border border-accent-cyan/15">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-cyan">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <span className="section-label">Connection</span>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider ${
          apiKey && endpointUrl
            ? 'bg-accent-emerald/8 text-accent-emerald border border-accent-emerald/15'
            : 'bg-accent-amber/8 text-accent-amber border border-accent-amber/15'
        }`}>
          {apiKey && endpointUrl ? 'READY' : 'SETUP'}
        </div>
      </div>

      {/* API Key Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="api-key" className="text-[11px] font-semibold text-zinc-500 tracking-wide">
            API Key
          </label>
          {apiKey && (
            <span className="flex items-center gap-1 text-[9px] font-bold text-accent-emerald tracking-wider">
              <span className="w-1 h-1 rounded-full bg-accent-emerald" />
              CONFIGURED
            </span>
          )}
        </div>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-cyan/10 to-accent-violet/10 rounded-2xl opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-300" />
          <input
            id="api-key"
            type="password"
            placeholder="Enter your Procmon API key…"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            className="relative input-glow w-full px-4 py-3 rounded-xl bg-surface-900/80 border border-border-subtle text-sm text-zinc-200 placeholder-zinc-700 font-mono"
          />
        </div>
      </div>

      {/* Endpoint URL Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="endpoint-url" className="text-[11px] font-semibold text-zinc-500 tracking-wide">
            Webhook Endpoint
          </label>
          {endpointUrl && (
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-accent-cyan tracking-wider bg-accent-cyan/6 px-2 py-0.5 rounded-md border border-accent-cyan/10">
              POST
            </span>
          )}
        </div>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-cyan/10 to-accent-violet/10 rounded-2xl opacity-0 group-focus-within:opacity-100 blur-sm transition-opacity duration-300" />
          <input
            id="endpoint-url"
            type="url"
            placeholder="https://your-app.com/api/v1/events"
            value={endpointUrl}
            onChange={(e) => onEndpointUrlChange(e.target.value)}
            className="relative input-glow w-full px-4 py-3 rounded-xl bg-surface-900/80 border border-border-subtle text-sm text-zinc-200 placeholder-zinc-700 font-mono"
          />
        </div>
      </div>

      {/* Connection info */}
      <div className="flex items-center gap-3 pt-1 text-[10px] text-zinc-700">
        <div className="flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-600">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          TLS Encrypted
        </div>
        <span className="text-zinc-800">•</span>
        <div className="flex items-center gap-1.5">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-zinc-600">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Auto-retry on failure
        </div>
      </div>
    </motion.div>
  );
}
