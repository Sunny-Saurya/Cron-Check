export interface EventPayload {
  category: string;
  fields: Record<string, string | number | boolean>;
  description: string;
}

export interface EventConfig {
  id: string;
  label: string;
  icon: string;
  color: 'cyan' | 'violet' | 'emerald' | 'amber';
  payload: EventPayload;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  type: 'request' | 'response' | 'error' | 'info';
  message: string;
  data?: unknown;
}

export interface SentEvent {
  id: string;
  timestamp: string;
  eventType: string;
  status: 'success' | 'error';
  payload: EventPayload;
  response?: unknown;
  statusCode?: number;
}
