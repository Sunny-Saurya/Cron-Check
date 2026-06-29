import type { EventConfig } from '../types';

export const EVENT_CONFIGS: EventConfig[] = [
  {
    id: 'user-signup',
    label: 'User Signed Up',
    icon: '👤',
    color: 'cyan',
    payload: {
      category: 'sign-up',
      fields: {
        plan: 'PRO',
        email: 'alex.johnson@company.io',
        country: 'US',
      },
      description: 'A new user has registered on the platform',
    },
  },
  {
    id: 'payment-received',
    label: 'Payment Received',
    icon: '💳',
    color: 'emerald',
    payload: {
      category: 'payment',
      fields: {
        amount: 49.99,
        currency: 'USD',
        method: 'stripe',
        recurring: true,
      },
      description: 'Payment successfully processed for subscription',
    },
  },
  {
    id: 'order-created',
    label: 'Order Created',
    icon: '📦',
    color: 'violet',
    payload: {
      category: 'order',
      fields: {
        orderId: 'ORD-2026-8847',
        items: 3,
        total: 127.5,
        priority: 'high',
      },
      description: 'New order has been created and is awaiting fulfillment',
    },
  },
];

export async function sendEvent(
  endpointUrl: string,
  apiKey: string,
  payload: EventConfig['payload']
): Promise<{ ok: boolean; status: number; data: unknown }> {
  const res = await fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({ message: 'No JSON body' }));

  return { ok: res.ok, status: res.status, data };
}
