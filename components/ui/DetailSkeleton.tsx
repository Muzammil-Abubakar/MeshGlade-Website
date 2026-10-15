/** Generic App Shell fallback for detail pages (shown only while URL-specific content streams in). */
export function DetailSkeleton() {
  return (
    <section aria-busy="true" aria-label="Loading" className="pt-32 pb-20 sm:pt-44">
      <div className="container-x animate-pulse">
        <div className="h-3 w-40 rounded-full bg-charcoal/10" />
        <div className="mt-8 h-[clamp(3rem,10vw,10rem)] w-4/5 rounded-3xl bg-charcoal/10" />
        <div className="mt-4 h-[clamp(3rem,10vw,10rem)] w-3/5 rounded-3xl bg-charcoal/10" />
        <div className="mt-14 aspect-[16/8] w-full rounded-card bg-charcoal/[0.07]" />
      </div>
    </section>
  );
}
