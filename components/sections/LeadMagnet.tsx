'use client';

import { useState, type FormEvent } from 'react';
import { FileDown, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
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
    <section id="checklist" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container">
        <div className="grid items-center gap-10 rounded-2xl bg-secondary p-8 text-secondary-foreground sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:p-16">
          <div>
            <Eyebrow>{leadMagnet.eyebrow}</Eyebrow>
            <h2 className="display text-balance text-display-lg font-bold">
              {leadMagnet.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/65">
              {leadMagnet.body}
            </p>
          </div>

          {state.status === 'done' ? (
            <div className="rounded-2xl bg-white/10 p-7">
              <p className="inline-flex items-center gap-2 text-lg font-bold">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                It is on its way to your inbox.
              </p>
              <p className="mt-2 text-sm text-white/65">
                You can also grab it right now.
              </p>
              <a
                href={state.url}
                className="mt-5 inline-flex items-center gap-2 font-semibold underline underline-offset-4"
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
                <Label htmlFor="lm-name" className="text-white/80">
                  First name
                </Label>
                <Input
                  id="lm-name"
                  name="name"
                  autoComplete="given-name"
                  placeholder="Sam"
                  maxLength={80}
                  className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
                />
              </div>
              <div>
                <Label htmlFor="lm-email" className="text-white/80">
                  Work email
                </Label>
                <Input
                  id="lm-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="sam@company.com.au"
                  className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
                />
              </div>
              {/* Honeypot: hidden from people, filled by bots. */}
              <div className="hidden" aria-hidden>
                <label htmlFor="lm-website">Website</label>
                <input id="lm-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <Button
                type="submit"
                variant="blue"
                size="lg"
                className="w-full"
                disabled={state.status === 'sending'}
              >
                {state.status === 'sending' ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                {leadMagnet.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
              {state.status === 'error' && (
                <p className="text-sm text-red-300" role="alert">
                  {state.message}
                </p>
              )}
              <p className="text-xs text-white/50">
                One email with the PDF. No drip sequence, no spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
