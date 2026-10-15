/**
 * Deterministic pseudo-random number in [0, 1) from two integer seeds.
 *
 * Uses integer-only math (Math.imul + bit shifts), so the result is identical
 * in Node (server render) and every browser — unlike `fract(sin(x) * 43758.5453)`,
 * whose `Math.sin` precision differs between engines and causes hydration mismatches.
 */
export function rand(i: number, n: number) {
  let h = Math.imul(i + 1, 0x9e3779b1) ^ Math.imul(n + 1, 0x85ebca77);
  h = Math.imul(h ^ (h >>> 16), 0x7feb352d);
  h = Math.imul(h ^ (h >>> 15), 0x846ca68b);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

/** Round to 2 decimals so SVG/CSS values serialize identically on server and client. */
export const r2 = (v: number) => Math.round(v * 100) / 100;
