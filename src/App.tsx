import { useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

import Header from './components/Header';
import ConfigPanel from './components/ConfigPanel';
import EventButton from './components/EventButton';
import RecentEventsPanel from './components/RecentEventsPanel';
import TerminalLog from './components/TerminalLog';

import { EVENT_CONFIGS, sendEvent } from './lib/events';
import { generateId, formatTimestamp } from './lib/utils';
import type { LogEntry, SentEvent } from './types';

const toastStyle = { background: '#111118', color: '#d4d4d8', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '14px', fontFamily: "'Inter', sans-serif", fontSize: '13px' };

export default function App() {
  const [apiKey, setApiKey] = useState(import.meta.env.VITE_PROCMON_API_KEY || '');
  const [endpointUrl, setEndpointUrl] = useState(import.meta.env.VITE_PROCMON_ENDPOINT || '');
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [sentEvents, setSentEvents] = useState<SentEvent[]>([]);

  const addLog = useCallback((type: LogEntry['type'], message: string) => {
    setLogs((prev) => [...prev, { id: generateId(), timestamp: formatTimestamp(), type, message }]);
  }, []);

  const handleSendEvent = useCallback(async (configId: string) => {
    const config = EVENT_CONFIGS.find((c) => c.id === configId);
    if (!config) return;

    if (!apiKey.trim()) {
      toast.error('API key is required', { style: { ...toastStyle, borderColor: 'rgba(251,113,133,0.3)' }, iconTheme: { primary: '#fb7185', secondary: '#111118' } });
      addLog('error', 'Missing API key — configure it above');
      return;
    }
    if (!endpointUrl.trim()) {
      toast.error('Endpoint URL is required', { style: { ...toastStyle, borderColor: 'rgba(251,113,133,0.3)' }, iconTheme: { primary: '#fb7185', secondary: '#111118' } });
      addLog('error', 'Missing endpoint URL — configure it above');
      return;
    }

    setLoadingIds((prev) => new Set(prev).add(configId));
    addLog('info', `Preparing "${config.label}" event…`);
    addLog('request', `POST ${endpointUrl}`);
    addLog('request', `Authorization: Bearer ${apiKey.slice(0, 8)}${'•'.repeat(12)}`);
    addLog('request', `Payload: ${JSON.stringify(config.payload)}`);

    try {
      const result = await sendEvent(endpointUrl, apiKey, config.payload);

      if (result.ok) {
        addLog('response', `${result.status} — ${JSON.stringify(result.data)}`);
        toast.success(`${config.label} sent successfully`, { style: { ...toastStyle, borderColor: 'rgba(52,211,153,0.3)' }, iconTheme: { primary: '#34d399', secondary: '#111118' } });
      } else {
        addLog('error', `${result.status} — ${JSON.stringify(result.data)}`);
        toast.error(`Failed: ${(result.data as { message?: string })?.message || result.status}`, { style: { ...toastStyle, borderColor: 'rgba(251,113,133,0.3)' }, iconTheme: { primary: '#fb7185', secondary: '#111118' } });
      }

      setSentEvents((prev) => [{
        id: generateId(), timestamp: formatTimestamp(), eventType: config.label,
        status: result.ok ? 'success' : 'error', payload: config.payload,
        response: result.data, statusCode: result.status,
      }, ...prev]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error';
      addLog('error', `Request failed — ${message}`);
      toast.error(`Network error: ${message}`, { style: { ...toastStyle, borderColor: 'rgba(251,113,133,0.3)' }, iconTheme: { primary: '#fb7185', secondary: '#111118' } });
      setSentEvents((prev) => [{
        id: generateId(), timestamp: formatTimestamp(), eventType: config.label,
        status: 'error', payload: config.payload,
      }, ...prev]);
    } finally {
      setLoadingIds((prev) => { const n = new Set(prev); n.delete(configId); return n; });
    }
  }, [apiKey, endpointUrl, addLog]);

  return (
    <div className="relative min-h-screen bg-surface-950 bg-grid bg-noise">
      {/* Ambient orbs */}
      <div className="orb-1" style={{ top: '-250px', left: '-150px' }} />
      <div className="orb-2" style={{ bottom: '-200px', right: '-100px' }} />
      <div className="orb-3" style={{ top: '40%', left: '50%', transform: 'translateX(-50%)' }} />

      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      <Header />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left */}
          <div className="lg:col-span-5 space-y-6">
            <ConfigPanel apiKey={apiKey} endpointUrl={endpointUrl} onApiKeyChange={setApiKey} onEndpointUrlChange={setEndpointUrl} />

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="glass-card p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent-amber/8 border border-accent-amber/15">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-amber">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <span className="section-label">Fire Events</span>
              </div>
              <div className="space-y-3">
                {EVENT_CONFIGS.map((config, i) => (
                  <EventButton key={config.id} config={config} index={i} isLoading={loadingIds.has(config.id)} disabled={!apiKey.trim() || !endpointUrl.trim()} onClick={() => handleSendEvent(config.id)} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <div className="lg:col-span-7 space-y-6">
            <RecentEventsPanel events={sentEvents} />
            <TerminalLog logs={logs} />
          </div>
        </div>

        <motion.footer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="mt-10 pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-700">
          <p>ProcCheck — Webhook Event Simulator for <span className="text-zinc-500 font-medium">Procmon</span></p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-zinc-700">v1.0.0</span>
            <span className="text-zinc-800">•</span>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-40 animate-ping" /><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-emerald" /></span>
              All systems operational
            </span>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
