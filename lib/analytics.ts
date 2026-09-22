/**
 * Conversion events, fired from the browser when a visitor does one of the
 * three things the site exists for. Google Ads reads them by way of GA4:
 * each name below is marked as a key event in the GA4 property and imported
 * into Google Ads as a conversion (see docs/google-ads/README.md). Renaming
 * one here breaks that import, so treat the names as an interface.
 *
 * Nothing is sent when no analytics tag is loaded (see components/Analytics),
 * and nothing personal is ever attached: no names, no emails, no messages.
 */

export type ConversionEvent =
  /** A time was booked through the calendar panel. The one that matters. */
  | 'book_call'
  /** The enquiry form was sent. */
  | 'enquiry'
  /** The checklist was requested. Lower intent, still worth counting. */
  | 'checklist_download';

type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Params }) => void;
  }
}

export function track(event: ConversionEvent, params: Params = {}): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', event, params);
    window.plausible?.(event, { props: params });
  } catch {
    // Analytics must never break the thing it is measuring.
  }
}
