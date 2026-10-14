/** Deterministic, reversible shot choreography. Coordinates are scene percentages. */
export const CONTACT = 0.48;
export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t);
export function shotAt(progress: number) {
  const p = clamp(progress);
  const incoming = clamp(p / CONTACT);
  const outgoing = clamp((p - CONTACT) / (1 - CONTACT));
  const swing = smooth(clamp((p - 0.28) / 0.4));
  const x = p <= CONTACT ? lerp(112, 91, incoming) : lerp(91, 9, outgoing);
  const y =
    p <= CONTACT
      ? lerp(5, 28, incoming * incoming)
      : 28 + 66 * outgoing - 16 * Math.sin(outgoing * Math.PI);
  return {
    x,
    y,
    ballScale: p <= CONTACT ? lerp(0.65, 1, incoming) : lerp(1, 2.8, outgoing),
    ballRotate: p * 630,
    ballOpacity: p < 0.04 ? p / 0.04 : p > 0.94 ? (1 - p) / 0.06 : 1,
    playerX: lerp(-2, 1.5, swing),
    playerRotate: lerp(-4, 4, swing),
    impact: Math.max(0, 1 - Math.abs(p - CONTACT) / 0.065),
    impactScale: 0.7 + Math.abs(p - CONTACT) * 12,
    phase: p < CONTACT ? "approach" : p < 0.62 ? "strike" : "follow-through",
  };
}
