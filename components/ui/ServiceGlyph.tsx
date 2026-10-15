import type { ServiceSlug } from "@/content/services";
import { cn } from "@/lib/utils";
import { rand, r2 } from "@/lib/random";

// Small looping illustrations, one per service (pure SVG/SMIL — no JS).
export function ServiceGlyph({ slug, className }: { slug: ServiceSlug; className?: string }) {
  return (
    <svg viewBox="0 0 200 140" fill="none" aria-hidden className={cn("h-auto w-full", className)}>
      {slug === "ai-automation" && <Automation />}
      {slug === "software-development" && <Software />}
      {slug === "data-ai" && <Data />}
      {slug === "growth" && <Growth />}
    </svg>
  );
}

function Automation() {
  const a = "M30 70 L100 32 L170 70";
  const b = "M30 70 L100 108 L170 70";
  return (
    <g stroke="currentColor" strokeWidth="1.5">
      <path d={a} strokeDasharray="3 5" opacity="0.5" />
      <path d={b} strokeDasharray="3 5" opacity="0.5" />
      <path d="M100 32 V108" strokeDasharray="3 5" opacity="0.3" />
      {[
        [30, 70],
        [100, 32],
        [100, 108],
        [170, 70],
      ].map(([x, y], i) => (
        <rect key={i} x={x - 12} y={y - 12} width="24" height="24" rx="7" fill="currentColor" fillOpacity={i === 3 ? 1 : 0.08} />
      ))}
      <circle r="4.5" fill="#DF462B" stroke="none">
        <animateMotion dur="2.6s" repeatCount="indefinite" path={a} />
      </circle>
      <circle r="4.5" fill="#DF462B" stroke="none">
        <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite" path={b} />
      </circle>
    </g>
  );
}

function Software() {
  return (
    <g stroke="currentColor" strokeWidth="1.5">
      <rect x="20" y="16" width="160" height="108" rx="10" />
      <path d="M20 34 H180" opacity="0.5" />
      <circle cx="31" cy="25" r="2.5" fill="currentColor" stroke="none" opacity="0.6" />
      <circle cx="40" cy="25" r="2.5" fill="currentColor" stroke="none" opacity="0.6" />
      <rect x="32" y="46" width="64" height="40" rx="5" strokeDasharray="4 4">
        <animate attributeName="fill-opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite" />
        <animate attributeName="stroke-dasharray" values="4 4;4 4;0 0;0 0;4 4" dur="4s" repeatCount="indefinite" />
      </rect>
      <rect x="32" y="46" width="64" height="40" rx="5" fill="#DF462B" stroke="none">
        <animate attributeName="opacity" values="0;0;1;1;0" dur="4s" repeatCount="indefinite" />
      </rect>
      <rect x="106" y="46" width="62" height="10" rx="3" opacity="0.6" />
      <rect x="106" y="62" width="44" height="8" rx="3" opacity="0.4" />
      <rect x="106" y="76" width="54" height="8" rx="3" opacity="0.4" />
      <rect x="32" y="96" width="136" height="16" rx="5" strokeDasharray="4 4">
        <animate attributeName="stroke-dasharray" values="4 4;4 4;4 4;0 0;4 4" dur="4s" repeatCount="indefinite" />
      </rect>
    </g>
  );
}

// deterministic scatter → clusters
const pts = Array.from({ length: 18 }, (_, i) => {
  const r = (n: number) => rand(i, n);
  const cluster = i % 3;
  const centers = [
    [55, 45],
    [140, 40],
    [100, 105],
  ];
  return {
    x0: r2(20 + r(1) * 160),
    y0: r2(15 + r(2) * 110),
    x1: r2(centers[cluster][0] + (r(3) - 0.5) * 28),
    y1: r2(centers[cluster][1] + (r(4) - 0.5) * 22),
    c: cluster,
  };
});

function Data() {
  return (
    <g>
      <path d="M16 128 H186 M16 128 V12" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
      {pts.map((p, i) => (
        <circle key={i} r="4.5" fill={p.c === 0 ? "#DF462B" : "currentColor"} fillOpacity={p.c === 2 ? 0.45 : 1}>
          <animate attributeName="cx" values={`${p.x0};${p.x1};${p.x1};${p.x0}`} dur="5s" repeatCount="indefinite" keyTimes="0;0.4;0.8;1" />
          <animate attributeName="cy" values={`${p.y0};${p.y1};${p.y1};${p.y0}`} dur="5s" repeatCount="indefinite" keyTimes="0;0.4;0.8;1" />
        </circle>
      ))}
    </g>
  );
}

function Growth() {
  const d = "M16 118 L50 104 L80 110 L110 78 L138 84 L170 34";
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M16 ${30 + i * 30} H186`} stroke="currentColor" strokeWidth="1" opacity="0.15" />
      ))}
      <path d={d} stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray="1" strokeDashoffset="1">
        <animate attributeName="stroke-dashoffset" values="1;0;0;1" keyTimes="0;0.5;0.85;1" dur="4s" repeatCount="indefinite" />
      </path>
      <circle cx="170" cy="34" r="6" fill="#DF462B">
        <animate attributeName="r" values="0;0;6;6;0" keyTimes="0;0.45;0.55;0.85;1" dur="4s" repeatCount="indefinite" />
      </circle>
      <circle cx="170" cy="34" r="6" stroke="#DF462B" strokeWidth="1.5" fill="none">
        <animate attributeName="r" values="6;18" dur="1.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.8;0" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </g>
  );
}
