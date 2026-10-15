"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/*
  "The Untangle" — Meshglade's signature visual.
  A field of ribbed glass flutes (Brand cover) refracting a warm mesh gradient
  (Brand screen 7). It begins tangled — a warped mesh — and settles into
  ordered vertical flutes: complex needs → simple solutions.
  Moving the cursor re-tangles the glass locally, then it settles again.
*/

const vertex = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform float uProgress;
uniform vec2 uMouse;
uniform float uHover;
uniform float uFlutes;
uniform float uWarm;
varying vec2 vUv;

const vec3 CHAR  = vec3(0.153, 0.153, 0.153);
const vec3 EMBER = vec3(0.875, 0.275, 0.169);
const vec3 PEACH = vec3(0.988, 0.784, 0.710);
const vec3 IVORY = vec3(1.0, 0.976, 0.918);

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

vec3 field(vec2 p, float aspect, float t) {
  float portrait = step(aspect, 1.0);
  // glow lives upper-right (gl y=1 is the top), clear of the bottom-left headline
  vec2 c1 = vec2(aspect * mix(0.86, 0.78, portrait) + 0.05 * sin(t * 0.21), mix(0.95, 0.92, portrait) + 0.03 * cos(t * 0.17));
  vec2 c2 = vec2(aspect * 1.02 + 0.06 * cos(t * 0.13), mix(0.2, 0.62, portrait) + 0.05 * sin(t * 0.19));
  vec2 c3 = vec2(aspect * 0.35 + 0.1 * sin(t * 0.11), -0.25);
  vec2 s1 = mix(vec2(1.0, 2.9), vec2(1.6, 2.4), portrait);
  float g1 = exp(-dot((p - c1) * s1, (p - c1) * s1) * 3.0);
  float g2 = exp(-dot(p - c2, p - c2) * mix(5.0, 14.0, portrait));
  float g3 = exp(-dot(p - c3, p - c3) * 4.0) * uWarm;
  float g = clamp(g1 * 1.05 + g2 * 0.75 + g3, 0.0, 1.0);
  g = clamp(g + uWarm * 0.25, 0.0, 1.0);
  vec3 col = mix(CHAR, EMBER, smoothstep(0.06, 0.62, g));
  col = mix(col, PEACH, smoothstep(0.58, 0.96, g));
  col = mix(col, IVORY, smoothstep(0.93, 1.0, g) * 0.45);
  return col;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime;

  vec2 m = vec2(uMouse.x * aspect, uMouse.y);
  float md = length(p - m);
  float local = exp(-md * md * 10.0) * uHover;
  float tangle = (1.0 - uProgress) + local * 0.6;

  float n1 = fbm(vec2(p.x * 1.6, p.y * 2.4) + vec2(0.0, t * 0.08));
  float n2 = fbm(vec2(p.x * 3.1 + 7.0, p.y * 1.3) - vec2(t * 0.05, 0.0));
  float warp = (n1 - 0.5) * 0.9 + (n2 - 0.5) * 0.5 + sin(p.y * 9.0 + t * 0.6 + n1 * 6.0) * 0.08;
  float x = uv.x + warp * tangle * 0.42 + sin(uv.y * 3.1416 + t * 0.3) * 0.0015;

  float fc = x * uFlutes;
  float u = fract(fc);

  // lens refraction inside each flute
  float lens = u - 0.5;
  vec2 sp = p + vec2(lens * 0.075, lens * lens * 0.02);
  vec3 col = field(sp, aspect, t);
  float lum = dot(col, vec3(0.333));

  // glass shading
  float body = sin(u * 3.14159);
  col *= mix(0.7, 1.1, pow(body, 0.8));
  float edge = smoothstep(0.0, 0.035, u) * smoothstep(1.0, 0.965, u);
  col *= mix(0.5, 1.0, edge);
  float spec = smoothstep(0.1, 0.17, u) * smoothstep(0.3, 0.17, u);
  col += spec * 0.11 * (0.35 + lum);
  // ember rim on the mesh strands while tangled
  float rim = (1.0 - smoothstep(0.0, 0.025, u)) * clamp(tangle, 0.0, 1.0);
  col += EMBER * rim * 0.35;

  // keep the headline area (left / bottom-left) calm and readable
  float read = smoothstep(0.2, 1.0, uv.x * 0.45 + uv.y * 1.0);
  col = mix(col * 0.4, col, clamp(read + uWarm, 0.0, 1.0));

  col += (hash(frag + fract(t * 7.0) * 100.0) - 0.5) * 0.05;
  gl_FragColor = vec4(col, 1.0);
}
`;

export function UntangleField({
  className,
  variant = "hero",
}: {
  className?: string;
  /** hero: dark, untangles on load · warm: ember-heavy, already ordered */
  variant?: "hero" | "warm";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;

    let disposed = false;
    let cleanup = () => {};

    import("ogl").then(({ Renderer, Program, Mesh, Triangle }) => {
      if (disposed) return;
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      const lowPower = (navigator.hardwareConcurrency ?? 8) <= 4;
      let renderer: InstanceType<typeof Renderer>;
      try {
        renderer = new Renderer({
          dpr: Math.min(window.devicePixelRatio, mobile || lowPower ? 1 : 1.5),
          alpha: false,
          antialias: false,
          powerPreference: "high-performance",
        });
      } catch {
        return; // WebGL unavailable → static CSS fallback stays visible
      }
      const gl = renderer.gl;
      if (!gl) return;
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 1.2s ease";
      el.appendChild(canvas);

      const program = new Program(gl, {
        vertex,
        fragment,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: [1, 1] },
          uProgress: { value: variant === "hero" && !reduce ? 0 : 1 },
          uMouse: { value: [0.5, 0.5] },
          uHover: { value: 0 },
          uFlutes: { value: mobile ? 13 : 30 },
          uWarm: { value: variant === "warm" ? 0.55 : 0 },
        },
      });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

      const resize = () => {
        const { width, height } = el.getBoundingClientRect();
        renderer.setSize(Math.max(1, width), Math.max(1, height));
        program.uniforms.uRes.value = [gl.drawingBufferWidth, gl.drawingBufferHeight];
        if (!running) renderer.render({ scene: mesh });
      };

      const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, h: 0, th: 0 };
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const r = el.getBoundingClientRect();
        const inside = e.clientY >= r.top && e.clientY <= r.bottom;
        mouse.tx = (e.clientX - r.left) / r.width;
        mouse.ty = 1 - (e.clientY - r.top) / r.height;
        mouse.th = inside ? 1 : 0;
      };

      let running = false;
      let visible = true;
      let raf = 0;
      const start = performance.now();
      let last = start;

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        const t = (now - start) / 1000;
        if (variant === "hero") {
          const k = Math.min(1, Math.max(0, (t - 0.25) / 2.4));
          program.uniforms.uProgress.value = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        }
        const ease = 1 - Math.pow(0.0008, dt);
        mouse.x += (mouse.tx - mouse.x) * ease;
        mouse.y += (mouse.ty - mouse.y) * ease;
        mouse.h += (mouse.th - mouse.h) * (1 - Math.pow(0.02, dt));
        program.uniforms.uTime.value = t;
        program.uniforms.uMouse.value = [mouse.x, mouse.y];
        program.uniforms.uHover.value = mouse.h;
        renderer.render({ scene: mesh });
        if (canvas.style.opacity === "0") canvas.style.opacity = "1";
      };

      const play = () => {
        if (running || !visible || document.hidden || reduce) return;
        running = true;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      };
      const pause = () => {
        running = false;
        cancelAnimationFrame(raf);
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
        else pause();
      });
      io.observe(el);
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      const onVis = () => (document.hidden ? pause() : play());
      document.addEventListener("visibilitychange", onVis);
      window.addEventListener("pointermove", onMove, { passive: true });

      resize();
      if (reduce) {
        renderer.render({ scene: mesh });
        canvas.style.opacity = "1";
      } else play();

      cleanup = () => {
        pause();
        io.disconnect();
        ro.disconnect();
        document.removeEventListener("visibilitychange", onVis);
        window.removeEventListener("pointermove", onMove);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        canvas.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [variant]);

  return (
    <div ref={ref} aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Static fallback — visible before WebGL loads, or when it's unavailable */}
      <div
        className={cn(
          "absolute inset-0",
          variant === "hero"
            ? "bg-charcoal [background-image:radial-gradient(50%_55%_at_80%_22%,rgb(223_70_43/0.9),transparent_70%),radial-gradient(30%_30%_at_98%_70%,rgb(252_200_181/0.5),transparent_70%)]"
            : "mesh-ember",
        )}
      >
        <div className="flutes absolute inset-0" />
      </div>
    </div>
  );
}
