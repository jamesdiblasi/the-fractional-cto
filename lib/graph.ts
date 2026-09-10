/**
 * The two Microsoft Graph calls the booking panel needs, against one
 * mailbox: free/busy for a window, and creating an event with an attendee.
 *
 * Authentication is the App Service's managed identity, through
 * DefaultAzureCredential. Nothing here is a secret: in Azure the token is
 * minted by the platform and lives about an hour; locally the same code
 * picks up AZURE_CLIENT_ID / AZURE_TENANT_ID / AZURE_CLIENT_SECRET for an
 * app registration, or an `az login` session. The identity carries
 * Calendars.ReadWrite as an application permission, fenced to the one
 * mailbox by an Exchange application access policy (see README).
 *
 * The token never leaves this process. The browser only ever sees
 * /api/availability and /api/book.
 */

import { DefaultAzureCredential } from '@azure/identity';

const GRAPH = 'https://graph.microsoft.com/v1.0';
const SCOPE = 'https://graph.microsoft.com/.default';

let credential: DefaultAzureCredential | undefined;

async function bearer(): Promise<string> {
  credential ??= new DefaultAzureCredential();
  const token = await credential.getToken(SCOPE);
  if (!token) throw new Error('Graph: no token from DefaultAzureCredential');
  return token.token;
}

async function graph<T>(
  method: 'GET' | 'POST',
  path: string,
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${GRAPH}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${await bearer()}`,
      'Content-Type': 'application/json',
      // Every dateTime in and out is UTC, so there is exactly one clock.
      Prefer: 'outlook.timezone="UTC"',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Graph ${res.status} ${method} ${path}: ${text.slice(0, 500)}`);
  }
  return (await res.json()) as T;
}

/**
 * Graph writes dateTimes as "2026-09-14T23:00:00.0000000" with no zone
 * marker; the Prefer header above makes them UTC.
 */
function utc(value: string): Date {
  return new Date(`${value.slice(0, 23)}Z`);
}

function iso(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, '');
}

export interface BusyBlock {
  start: Date;
  end: Date;
  status: string;
}

/** Free/busy for the mailbox between two instants. Only times and status. */
export async function getBusy(
  mailbox: string,
  start: Date,
  end: Date,
): Promise<BusyBlock[]> {
  type Response = {
    value?: {
      scheduleItems?: {
        status?: string;
        start?: { dateTime?: string };
        end?: { dateTime?: string };
      }[];
    }[];
  };
  const json = await graph<Response>(
    'POST',
    `/users/${encodeURIComponent(mailbox)}/calendar/getSchedule`,
    {
      schedules: [mailbox],
      startTime: { dateTime: iso(start), timeZone: 'UTC' },
      endTime: { dateTime: iso(end), timeZone: 'UTC' },
      availabilityViewInterval: 15,
    },
  );
  const items = json.value?.[0]?.scheduleItems ?? [];
  return items
    .filter((i) => i.start?.dateTime && i.end?.dateTime)
    .map((i) => ({
      start: utc(i.start!.dateTime!),
      end: utc(i.end!.dateTime!),
      status: i.status ?? 'unknown',
    }));
}

export interface NewEvent {
  subject: string;
  /** Plain text. Graph renders it as-is, so nothing here is interpreted. */
  body: string;
  start: Date;
  end: Date;
  attendee: { name: string; email: string };
  categories: string[];
  teamsMeeting: boolean;
  /**
   * Graph de-duplicates on this: a retry with the same id returns the event
   * already created instead of a second one.
   */
  transactionId: string;
}

export interface CreatedEvent {
  id: string;
  webLink?: string;
  joinUrl?: string;
}

/** Creates the event on the mailbox's calendar; Graph sends the invite. */
export async function createEvent(
  mailbox: string,
  event: NewEvent,
): Promise<CreatedEvent> {
  type Response = {
    id: string;
    webLink?: string;
    onlineMeeting?: { joinUrl?: string } | null;
  };
  const json = await graph<Response>(
    'POST',
    `/users/${encodeURIComponent(mailbox)}/events`,
    {
      subject: event.subject,
      body: { contentType: 'text', content: event.body },
      start: { dateTime: iso(event.start), timeZone: 'UTC' },
      end: { dateTime: iso(event.end), timeZone: 'UTC' },
      attendees: [
        {
          type: 'required',
          emailAddress: {
            address: event.attendee.email,
            name: event.attendee.name,
          },
        },
      ],
      categories: event.categories,
      isOnlineMeeting: event.teamsMeeting,
      onlineMeetingProvider: event.teamsMeeting ? 'teamsForBusiness' : 'unknown',
      responseRequested: true,
      transactionId: event.transactionId,
    },
  );
  return {
    id: json.id,
    webLink: json.webLink,
    joinUrl: json.onlineMeeting?.joinUrl,
  };
}
