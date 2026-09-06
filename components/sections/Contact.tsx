'use client';

import { useState, type FormEvent } from 'react';
import { ArrowRight, Loader2, CheckCircle2, CalendarDays, Mail } from 'lucide-react';
import { Button, LinkButton } from '@/components/ui/button';
import { Input, Label, Textarea } from '@/components/ui/input';
import { Eyebrow } from '@/components/Section';
import { finalCta } from '@/lib/content';

type State =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'done' }
  | { status: 'error'; message: string };

export function Contact({
  bookingUrl,
  contactEmail,
  formEnabled,
}: {
  bookingUrl: string;
  contactEmail: string;
  formEnabled: boolean;
}) {
  const [state, setState] = useState<State>({ status: 'idle' });
  const hasBooking = bookingUrl.startsWith('http');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState({ status: 'sending' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(json.error ?? 'Something went wrong. Please try again.');
      }
      setState({ status: 'done' });
      form.reset();
    } catch (err) {
      setState({
        status: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong.',
      });
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container grid gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            {finalCta.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {finalCta.body}
          </p>

          <div className="mt-8 space-y-4">
            {hasBooking && (
              <LinkButton
                href={bookingUrl}
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <CalendarDays className="h-4 w-4" />
                Book a discovery call
                <ArrowRight className="h-4 w-4" />
              </LinkButton>
            )}
            <p className="text-sm text-muted-foreground">
              <Mail className="mr-2 inline h-4 w-4 text-primary" />
              Prefer email?{' '}
              <a
                href={`mailto:${contactEmail}`}
                className="text-foreground underline-offset-4 hover:underline"
              >
                {contactEmail}
              </a>
            </p>
          </div>
        </div>

        {formEnabled && (
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            {state.status === 'done' ? (
              <div className="flex h-full flex-col justify-center py-10 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
                <p className="mt-4 text-lg font-medium">Thanks, got it.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  I will reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-name">Name</Label>
                    <Input
                      id="c-name"
                      name="name"
                      required
                      autoComplete="name"
                      maxLength={120}
                    />
                  </div>
                  <div>
                    <Label htmlFor="c-company">Company</Label>
                    <Input
                      id="c-company"
                      name="company"
                      autoComplete="organization"
                      maxLength={120}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="c-email">Email</Label>
                  <Input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
                <div>
                  <Label htmlFor="c-interest">What are you looking for?</Label>
                  <select
                    id="c-interest"
                    name="interest"
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue="Not sure yet"
                  >
                    <option>Not sure yet</option>
                    <option>Fractional CTO retainer</option>
                    <option>Technical audit or due diligence</option>
                    <option>MVP or product build</option>
                    <option>AI and automation</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="c-message">A few lines about your situation</Label>
                  <Textarea
                    id="c-message"
                    name="message"
                    required
                    maxLength={4000}
                    placeholder="Where the business is, what is getting in the way, and what a good outcome looks like."
                  />
                </div>
                <div className="hidden" aria-hidden>
                  <label htmlFor="c-website">Website</label>
                  <input id="c-website" name="website" tabIndex={-1} autoComplete="off" />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={state.status === 'sending'}
                >
                  {state.status === 'sending' && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  Send message
                </Button>
                {state.status === 'error' && (
                  <p className="text-sm text-destructive" role="alert">
                    {state.message}
                  </p>
                )}
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
