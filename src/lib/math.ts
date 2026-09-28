export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v))

/** Maps p from [start, end] onto [0, 1], clamped. */
export const range = (p: number, start: number, end: number) => clamp((p - start) / (end - start))

type RGB = [number, number, number]

const hexToRgb = (hex: string): RGB => {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export const mixHex = (from: string, to: string, t: number) => {
  const a = hexToRgb(from)
  const b = hexToRgb(to)
  const [r, g, bl] = a.map((c, i) => Math.round(c + (b[i] - c) * t))
  return `rgb(${r}, ${g}, ${bl})`
}

/** Small deterministic PRNG so the starfield is stable between renders. */
export const seededRandom = (seed: number) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}
