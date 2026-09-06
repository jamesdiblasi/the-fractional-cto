'use client';

import { useState, type FormEvent } from 'react';
import { FileDown, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Label } from '@/components/ui/input';
import { Eyebrow } from '@/components/Section';
import { leadMagnet } from '@/lib/content';

type State =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'done'; url: string }
  | { status: 'error'; message: string };

export function LeadMagnet() {
  const [state, setState] = useState<State>({ status: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState({ status: 'sending' });
    try {
      const res = await fetch('/api/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          name: data.get('name'),
          website: data.get('website'),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(json.error ?? 'Something went wrong. Please try again.');
      }
      setState({ status: 'done', url: json.url ?? leadMagnet.file });
      form.reset();
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong.',
      });
    }
  }

  return (
    <section id="checklist" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-8 sm:p-12">
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <Eyebrow>{leadMagnet.eyebrow}</Eyebrow>
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                {leadMagnet.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {leadMagnet.body}
              </p>
            </div>

            {state.status === 'done' ? (
              <div className="rounded-xl border border-success/40 bg-success/10 p-6">
                <p className="inline-flex items-center gap-2 font-medium">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  It is on its way to your inbox.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  You can also grab it right now.
                </p>
                <a
                  href={state.url}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileDown className="h-4 w-4" />
                  Download the checklist
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <div>
                  <Label htmlFor="lm-name">First name</Label>
                  <Input
                    id="lm-name"
                    name="name"
                    autoComplete="given-name"
                    placeholder="Sam"
                    maxLength={80}
                  />
                </div>
                <div>
                  <Label htmlFor="lm-email">Work email</Label>
                  <Input
                    id="lm-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="sam@company.com.au"
                  />
                </div>
                {/* Honeypot: hidden from people, filled by bots. */}
                <div className="hidden" aria-hidden>
                  <label htmlFor="lm-website">Website</label>
                  <input id="lm-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={state.status === 'sending'}
                >
                  {state.status === 'sending' ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FileDown className="h-4 w-4" />
                  )}
                  {leadMagnet.cta}
                </Button>
                {state.status === 'error' && (
                  <p className="text-sm text-destructive" role="alert">
                    {state.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  One email with the PDF. No drip sequence, no spam.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
