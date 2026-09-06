import Script from 'next/script';

/**
 * Renders nothing unless an analytics ID is configured. GA4 and Plausible are
 * both supported; set one or both:
 *
 *   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN=thefractionalcto.com.au
 *
 * These are build-time values (NEXT_PUBLIC_), so set them before `next build`.
 */
export function Analytics({
  gaMeasurementId,
  plausibleDomain,
}: {
  gaMeasurementId: string | null;
  plausibleDomain: string | null;
}) {
  return (
    <>
      {gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaMeasurementId)}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaMeasurementId.replace(/'/g, '')}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {plausibleDomain && (
        <Script
          src="https://plausible.io/js/script.js"
          data-domain={plausibleDomain}
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
