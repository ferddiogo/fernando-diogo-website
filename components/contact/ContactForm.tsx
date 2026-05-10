'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { UIDict } from '@/lib/i18n/dictionary';

type Props = {
  dict: UIDict;
  recipientEmail: string;
};

type Status = 'idle' | 'opened';

export function ContactForm({ dict, recipientEmail }: Props) {
  const [status, setStatus] = useState<Status>('idle');

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const name = String(fd.get('name') ?? '').trim();
    const email = String(fd.get('email') ?? '').trim();
    const projectTypeKey = String(fd.get('projectType') ?? '');
    const message = String(fd.get('message') ?? '').trim();

    const typeLabel =
      projectTypeKey && projectTypeKey in dict.form.typeOptions
        ? dict.form.typeOptions[projectTypeKey as keyof typeof dict.form.typeOptions]
        : '';

    const subject = typeLabel ? `[${typeLabel}] ${name}` : `Contacto — ${name}`;
    const body = `${message}\n\n—\n${name}\n${email}`;

    const mailto = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus('opened');
  }

  if (status === 'opened') {
    const isPt = dict.form.name === 'Nome';
    return (
      <div className="bg-bg-elev rounded-2xl p-8 border border-line">
        <p className="font-display text-2xl">
          {isPt ? 'Cliente de email aberto' : 'Email client opened'}
        </p>
        <p className="mt-2 text-ink-muted">
          {isPt
            ? 'Revê a mensagem no teu cliente de email e clica em enviar para finalizar.'
            : 'Review the message in your email client and hit send to finish.'}
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm text-accent hover:text-accent-hover underline underline-offset-4"
        >
          {isPt ? 'Escrever outra mensagem' : 'Write another message'}
        </button>
      </div>
    );
  }

  const inputCls =
    'w-full px-4 py-3 bg-bg-elev border border-line rounded-lg focus:outline-none focus:border-steel transition-colors';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">
          {dict.form.name}
        </label>
        <input name="name" required className={inputCls} />
      </div>
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">
          {dict.form.email}
        </label>
        <input name="email" type="email" required className={inputCls} />
      </div>
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">
          {dict.form.type}
        </label>
        <select name="projectType" className={inputCls} required defaultValue="">
          <option value="" disabled>
            —
          </option>
          {(Object.entries(dict.form.typeOptions) as [string, string][]).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-xs tracking-[0.18em] uppercase font-display text-ink-soft mb-2">
          {dict.form.message}
        </label>
        <textarea name="message" rows={5} required className={inputCls} />
      </div>
      <Button type="submit" variant="primary" size="lg">
        {dict.buttons.send}
      </Button>
    </form>
  );
}
