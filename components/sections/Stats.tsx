import { stats } from '@/lib/content';

export function Stats() {
  return (
    <section className="border-y border-border bg-card/40" aria-label="Track record">
      <div className="container grid grid-cols-2 divide-border py-10 sm:grid-cols-4 sm:divide-x">
        {stats.map((s) => (
          <div key={s.label} className="px-4 py-3 text-center sm:py-0">
            <p className="font-mono text-3xl font-semibold text-foreground sm:text-4xl">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
