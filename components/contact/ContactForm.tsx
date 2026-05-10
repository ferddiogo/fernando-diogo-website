'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { UIDict } from '@/lib/i18n/dictionary';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm({ dict }: { dict: UIDict }) {
  const [status, setStatus] = useState<Status>('idle');
  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formspreeId) {
      setStatus('error');
      return;
    }
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: fd,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-bg-elev rounded-2xl p-8 border border-line">
        <p className="font-display text-2xl">{dict.buttons.sent}</p>
        <p className="mt-2 text-ink-muted">
          {dict.form.name === 'Nome' ? 'Recebi sua mensagem. Retorno em até 24h.' : 'I got your message. Reply within 24 hours.'}
        </p>
      </div>
    );
  }

  const inputCls = 'w-full px-4 py-3 bg-bg-elev border border-line rounded-lg focus:outline-none focus:border-steel transition-colors';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} />
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">{dict.form.name}</label>
        <input name="name" required className={inputCls} />
      </div>
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">{dict.form.email}</label>
        <input name="email" type="email" required className={inputCls} />
      </div>
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">{dict.form.type}</label>
        <select name="projectType" className={inputCls} required>
          <option value="">—</option>
          {(Object.entries(dict.form.typeOptions) as [string, string][]).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">{dict.form.message}</label>
        <textarea name="message" rows={5} required className={inputCls} />
      </div>
      {status === 'error' && (
        <p className="text-sm text-accent">{dict.form.errorGeneric}</p>
      )}
      <Button type="submit" variant="primary" size="lg" disabled={status === 'submitting'}>
        {status === 'submitting' ? dict.buttons.sending : dict.buttons.send}
      </Button>
    </form>
  );
}
