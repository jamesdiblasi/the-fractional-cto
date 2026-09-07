'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input, Label, Textarea, Select } from '@/components/ui/input';
import { enquiry } from '@/lib/content';

type State =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'done' }
  | { status: 'error'; message: string };

/**
 * The enquiry form, for people who would rather write than pick a time. The
 * booking section above owns the calendar and the email address, so there is
 * exactly one place on the page to book a slot.
 */
export function Contact({ formEnabled }: { formEnabled: boolean }) {
  const [state, setState] = useState<State>({ status: 'idle' });

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
    <section id="contact" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display text-balance text-display-lg font-bold">
            {enquiry.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {enquiry.body}
          </p>
        </div>

        {formEnabled && (
          <div
            id="enquire"
            className="mx-auto mt-12 max-w-2xl scroll-mt-24 rounded-2xl border border-border p-6 sm:p-10"
          >
            {state.status === 'done' ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
                <p className="mt-4 text-xl font-bold">Thanks, got it.</p>
                <p className="mt-2 text-muted-foreground">
                  I will reply within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="c-name">Name</Label>
                    <Input id="c-name" name="name" required autoComplete="name" maxLength={120} />
                  </div>
                  <div>
                    <Label htmlFor="c-company">Company</Label>
                    <Input id="c-company" name="company" autoComplete="organization" maxLength={120} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="c-email">Email</Label>
                  <Input id="c-email" name="email" type="email" required autoComplete="email" />
                </div>
                <div>
                  <Label htmlFor="c-interest">What are you looking for?</Label>
                  <Select id="c-interest" name="interest" defaultValue="Not sure yet">
                    <option>Not sure yet</option>
                    <option>Fractional CTO subscription</option>
                    <option>Technical audit or due diligence</option>
                    <option>MVP or product build</option>
                    <option>AI and automation</option>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="c-message">Where things are at</Label>
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
                <Button type="submit" size="lg" className="w-full" disabled={state.status === 'sending'}>
                  {state.status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" />}
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
