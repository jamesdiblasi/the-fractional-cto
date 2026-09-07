import { techLogos } from '@/lib/tech-logos';
import { logoRow } from '@/lib/content';

/**
 * A slow marquee of the stacks the work is built on. Monochrome so it reads
 * as texture, not a sales pitch. The list is doubled so the loop is seamless.
 */
export function TechLogos() {
  const items = [...techLogos, { name: 'Microsoft Azure', path: '' }];
  const loop = [...items, ...items];
  return (
    <section
      aria-label={logoRow.label}
      className="border-y border-border/70 py-10"
    >
      <p className="mb-7 text-center text-sm font-semibold text-muted-foreground">
        {logoRow.label}
      </p>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-14 pr-14 text-foreground/55 motion-reduce:animate-none">
          {loop.map((logo, i) => (
            <li
              key={`${logo.name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 transition-colors hover:text-foreground"
              title={logo.name}
            >
              {logo.path ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 fill-current"
                  aria-hidden="true"
                >
                  <path d={logo.path} />
                </svg>
              ) : null}
              <span className="text-[15px] font-semibold">{logo.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
