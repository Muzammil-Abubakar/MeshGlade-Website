import Image from "next/image";
import type { CoverKind, CoverTone, Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { CoverVideo } from "./CoverVideo";

const tones: Record<CoverTone, string> = {
  ember: "mesh-ember",
  charcoal: "bg-charcoal [background-image:radial-gradient(70%_80%_at_85%_100%,rgb(223_70_43/0.85),transparent_70%),radial-gradient(50%_50%_at_10%_0%,rgb(252_200_181/0.18),transparent_70%)]",
  peach: "bg-peach [background-image:radial-gradient(70%_70%_at_90%_10%,rgb(223_70_43/0.55),transparent_70%),radial-gradient(60%_60%_at_0%_100%,rgb(255_249_234/0.8),transparent_70%)]",
  ivory: "bg-ivory-deep [background-image:radial-gradient(70%_70%_at_100%_100%,rgb(252_200_181/0.95),transparent_70%),radial-gradient(40%_40%_at_10%_10%,rgb(223_70_43/0.25),transparent_70%)]",
};

/**
 * Branded placeholder cover: a UI mockup on a brand gradient, behind fluted glass
 * that clears when the card scrolls into view. Set `cover.image` to use a real screenshot.
 */
export function ProjectCover({
  project,
  className,
  clear = true,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  priority,
}: {
  project: Project;
  className?: string;
  clear?: boolean;
  sizes?: string;
  priority?: boolean;
}) {
  const { kind, tone, image, video, poster } = project.cover;
  const media = Boolean(image || video);
  return (
    <div
      data-reveal={clear ? "clear" : undefined}
      data-media={media || undefined}
      className={cn("relative isolate overflow-hidden", !media && "grain", tones[tone], className)}
    >
      {video ? (
        <CoverVideo src={video} poster={poster ?? image} label={`${project.title} — ${project.tagline}`} />
      ) : image ? (
        <Image src={image} alt={`${project.title} — ${project.tagline}`} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div aria-hidden className="absolute inset-0 grid place-items-center p-[7%]">
          <Mockup kind={kind} dark={tone === "charcoal" || tone === "ember"} />
        </div>
      )}
      {clear && <div aria-hidden className="clear-glass flutes absolute inset-0 z-[2] backdrop-blur-[3px]" />}
    </div>
  );
}

function Mockup({ kind, dark }: { kind: CoverKind; dark: boolean }) {
  const panel = "rounded-[clamp(10px,2vw,18px)] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.55)]";
  switch (kind) {
    case "chat":
      return (
        <div className={cn(panel, "flex aspect-[9/16] h-full max-h-[100%] flex-col gap-[6%] overflow-hidden bg-ivory p-[5%]")}>
          <div className="flex items-center gap-2 border-b border-charcoal/10 pb-[5%]">
            <span className="size-[14%] max-w-6 rounded-full bg-charcoal" style={{ aspectRatio: 1 }} />
            <span className="h-2 w-1/2 rounded bg-charcoal/70" />
          </div>
          <Bubble side="l" w="78%" />
          <Bubble side="r" w="52%" />
          <Bubble side="l" w="86%" lines={2} />
          <Bubble side="r" w="40%" />
          <div className="mt-auto flex items-center gap-1.5 rounded-full bg-ember/10 px-2 py-1.5">
            <span className="size-1.5 rounded-full bg-ember" />
            <span className="h-1.5 w-2/3 rounded bg-ember/50" />
          </div>
        </div>
      );
    case "dashboard":
      return (
        <div className={cn(panel, "grid aspect-[16/10] w-full grid-cols-[18%_1fr] overflow-hidden", dark ? "bg-ivory" : "bg-charcoal")}>
          <div className={cn("space-y-2 p-[8%]", dark ? "bg-charcoal" : "bg-ivory")}>
            {[70, 50, 60, 45].map((w, i) => (
              <span key={i} className={cn("block h-1.5 rounded", dark ? "bg-ivory/40" : "bg-charcoal/30")} style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="flex flex-col gap-[5%] p-[5%]">
            <div className="grid grid-cols-3 gap-[4%]">
              {[0, 1, 2].map((i) => (
                <div key={i} className={cn("rounded-md p-[10%]", i === 0 ? "bg-ember" : dark ? "bg-charcoal/8" : "bg-ivory/10")}>
                  <span className={cn("block h-1 w-1/2 rounded", i === 0 ? "bg-ivory/70" : dark ? "bg-charcoal/30" : "bg-ivory/40")} />
                  <span className={cn("mt-2 block h-2.5 w-3/4 rounded", i === 0 ? "bg-ivory" : dark ? "bg-charcoal/70" : "bg-ivory/80")} />
                </div>
              ))}
            </div>
            <div className="flex flex-1 items-end gap-[3%]">
              {[40, 62, 48, 75, 58, 88, 70, 95].map((h, i) => (
                <span key={i} className={cn("flex-1 rounded-t-sm", i === 7 ? "bg-ember" : dark ? "bg-charcoal/20" : "bg-ivory/25")} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      );
    case "map":
      return (
        <div className={cn(panel, "relative aspect-[16/10] w-full overflow-hidden bg-charcoal")}>
          <svg viewBox="0 0 320 200" className="absolute inset-0 size-full">
            {Array.from({ length: 9 }).map((_, i) => (
              <path key={i} d={`M0 ${i * 25} H320 M${i * 40} 0 V200`} stroke="#FFF9EA" strokeOpacity="0.06" />
            ))}
            <path d="M30 160 C 90 150, 80 80, 150 90 S 230 40, 290 40" stroke="#FCC8B5" strokeWidth="3" fill="none" strokeDasharray="6 6" />
            <path d="M40 40 C 100 60, 160 140, 280 150" stroke="#DF462B" strokeWidth="3" fill="none" />
            {[
              [30, 160],
              [290, 40],
              [40, 40],
              [280, 150],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="10" fill="#DF462B" fillOpacity="0.25" />
                <circle cx={x} cy={y} r="4.5" fill={i % 2 ? "#FCC8B5" : "#DF462B"} />
              </g>
            ))}
          </svg>
          <div className="absolute top-[8%] right-[5%] w-[34%] rounded-lg bg-ivory p-[3%]">
            <span className="block h-1.5 w-1/2 rounded bg-charcoal/40" />
            <span className="mt-2 block h-2.5 w-4/5 rounded bg-charcoal" />
            <span className="mt-2 block h-1.5 w-2/3 rounded bg-ember" />
          </div>
        </div>
      );
    case "search":
      return (
        <div className={cn(panel, "flex aspect-[16/10] w-full flex-col gap-[5%] overflow-hidden bg-ivory p-[5%]")}>
          <div className="flex items-center gap-2 rounded-full border border-charcoal/15 px-[3%] py-[2.5%]">
            <span className="size-2 rounded-full border-2 border-charcoal/50" />
            <span className="h-1.5 w-2/3 rounded bg-charcoal/50" />
          </div>
          <div className="flex-1 rounded-xl bg-charcoal p-[4%]">
            {[92, 80, 86, 60].map((w, i) => (
              <span key={i} className="mb-2 block h-1.5 rounded bg-ivory/60" style={{ width: `${w}%` }} />
            ))}
            <div className="mt-3 flex gap-1.5">
              {["§4.2", "p.17", "Exh. B"].map((c) => (
                <span key={c} className="rounded-full bg-ember px-2 py-0.5 text-[clamp(6px,0.8vw,10px)] font-semibold text-ivory">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-[3%]">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-md border border-charcoal/10 p-[8%]">
                <span className="block h-1 w-2/3 rounded bg-charcoal/40" />
                <span className="mt-1.5 block h-1 w-1/2 rounded bg-charcoal/20" />
              </div>
            ))}
          </div>
        </div>
      );
    case "vision":
      return (
        <div className={cn(panel, "relative grid aspect-[16/10] w-full grid-rows-3 gap-[3%] overflow-hidden bg-ivory-deep p-[4%]")}>
          {[0, 1, 2].map((row) => (
            <div key={row} className="flex items-end gap-[2%] border-b-4 border-charcoal/70 pb-[1%]">
              {Array.from({ length: 8 }).map((_, i) => {
                const empty = (row === 1 && (i === 3 || i === 4)) || (row === 2 && i === 6);
                return (
                  <span
                    key={i}
                    className={cn("relative flex-1 rounded-t-sm", empty ? "bg-transparent" : i % 3 === 0 ? "bg-ember/80" : i % 3 === 1 ? "bg-charcoal/70" : "bg-peach")}
                    style={{ height: `${60 + ((i * 17 + row * 11) % 35)}%` }}
                  />
                );
              })}
            </div>
          ))}
          <div className="absolute top-[38%] left-[40%] h-[24%] w-[22%] rounded-sm border-2 border-ember">
            <span className="absolute -top-[42%] left-0 rounded-sm bg-ember px-1 text-[clamp(6px,0.8vw,10px)] font-semibold whitespace-nowrap text-ivory">
              OUT OF STOCK · 0.97
            </span>
          </div>
          <div className="absolute top-[6%] left-[8%] h-[24%] w-[16%] rounded-sm border-2 border-charcoal" />
        </div>
      );
    case "social":
      return (
        <div className="grid w-[86%] grid-cols-3 gap-[3%]">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "aspect-square rounded-[10%] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]",
                ["bg-ivory", "bg-charcoal", "bg-peach", "bg-charcoal", "bg-ivory", "bg-ember-80", "bg-peach-60", "bg-ivory", "bg-charcoal"][i],
              )}
            >
              {i === 4 && (
                <div className="grid size-full place-items-center">
                  <span className="font-display text-[clamp(12px,2.6vw,30px)] tracking-tight text-ember">+210%</span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    case "pipeline":
      return (
        <div className={cn(panel, "grid aspect-[16/10] w-full grid-cols-4 gap-[2.5%] overflow-hidden bg-charcoal p-[4%]")}>
          {["Leads", "Replied", "Booked", "Won"].map((col, c) => (
            <div key={col} className="flex flex-col gap-[6%] rounded-md bg-ivory/5 p-[6%]">
              <span className="text-[clamp(6px,0.8vw,10px)] font-semibold tracking-wide text-ivory/60 uppercase">{col}</span>
              {Array.from({ length: 4 - c }).map((_, i) => (
                <span key={i} className={cn("block rounded p-[10%]", c === 3 ? "bg-ember" : "bg-ivory/90")}>
                  <span className={cn("block h-1 w-3/4 rounded", c === 3 ? "bg-ivory/80" : "bg-charcoal/50")} />
                  <span className={cn("mt-1 block h-1 w-1/2 rounded", c === 3 ? "bg-ivory/50" : "bg-charcoal/25")} />
                </span>
              ))}
            </div>
          ))}
        </div>
      );
  }
}

function Bubble({ side, w, lines = 1 }: { side: "l" | "r"; w: string; lines?: number }) {
  return (
    <div
      className={cn("rounded-[10px] px-[5%] py-[4%]", side === "l" ? "self-start bg-charcoal/8" : "self-end bg-ember")}
      style={{ width: w }}
    >
      {Array.from({ length: lines }).map((_, i) => (
        <span key={i} className={cn("block h-1.5 rounded", i > 0 && "mt-1.5 w-2/3", side === "l" ? "bg-charcoal/45" : "bg-ivory/80")} />
      ))}
    </div>
  );
}
