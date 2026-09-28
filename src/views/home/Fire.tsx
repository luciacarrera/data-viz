import type { CSSProperties } from 'react'

const FLAME_PATH =
  'M50 0 C58 28 92 52 90 104 C88 138 68 160 50 160 C32 160 12 138 10 104 C8 62 42 44 50 0 Z'

type Layer = {
  color: string
  width: string
  height: string
  left: string
  bottom: string
  dur: number
  delay: number
  opacity?: number
}

// Back to front: side tongues, outer red, orange, yellow, white-hot core.
const LAYERS: Layer[] = [
  { color: '#c92a12', width: '38%', height: '62%', left: '10%', bottom: '12%', dur: 1.7, delay: -0.4, opacity: 0.9 },
  { color: '#c92a12', width: '36%', height: '56%', left: '54%', bottom: '12%', dur: 1.5, delay: -0.9, opacity: 0.9 },
  { color: '#e8421a', width: '70%', height: '88%', left: '15%', bottom: '10%', dur: 1.3, delay: 0 },
  { color: '#ff7b1c', width: '56%', height: '72%', left: '22%', bottom: '10%', dur: 1.1, delay: -0.3 },
  { color: '#ffc23a', width: '40%', height: '52%', left: '30%', bottom: '10%', dur: 0.9, delay: -0.6 },
  { color: '#fff2c4', width: '22%', height: '30%', left: '39%', bottom: '11%', dur: 0.8, delay: -0.2 },
]

const EMBERS = [
  { left: '44%', drift: '-18px', dur: 3.2, delay: 0 },
  { left: '52%', drift: '22px', dur: 2.6, delay: -1.1 },
  { left: '48%', drift: '-6px', dur: 3.8, delay: -2.2 },
  { left: '57%', drift: '30px', dur: 3.0, delay: -0.6 },
  { left: '40%', drift: '-28px', dur: 3.4, delay: -1.8 },
  { left: '50%', drift: '10px', dur: 2.9, delay: -2.7 },
]

type Props = {
  style?: CSSProperties
}

/** Decorative campfire. Its meaning is carried by the headline text. */
export function Fire({ style }: Props) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[6vh] left-1/2 h-[min(42vh,20rem)] w-[min(60vw,16rem)]"
      style={style}
    >
      {/* Wide ambient glow */}
      <div
        className="anim-glow absolute bottom-[-35%] left-1/2 h-[140%] w-[320%] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,140,40,0.5), rgba(255,90,20,0.2) 45%, rgba(255,60,20,0) 100%)',
          // Fade out before the bottom of the scene so the glow doesn't end in a hard line.
          maskImage: 'linear-gradient(to top, transparent 22%, black 48%)',
        }}
      />

      {/* Flames */}
      {LAYERS.map((l, i) => (
        <svg
          key={i}
          viewBox="0 0 100 160"
          preserveAspectRatio="none"
          className="anim-flicker absolute origin-bottom"
          style={
            {
              width: l.width,
              height: l.height,
              left: l.left,
              bottom: l.bottom,
              opacity: l.opacity ?? 1,
              filter: i === 2 ? `drop-shadow(0 0 12px ${l.color})` : undefined,
              '--dur': `${l.dur}s`,
              '--delay': `${l.delay}s`,
            } as CSSProperties
          }
        >
          <path d={FLAME_PATH} fill={l.color} />
        </svg>
      ))}

      {/* Embers */}
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="anim-ember absolute bottom-[40%] h-1 w-1 rounded-full bg-amber-200"
          style={
            {
              left: e.left,
              boxShadow: '0 0 6px 2px rgba(255,170,60,0.8)',
              '--drift': e.drift,
              '--dur': `${e.dur}s`,
              '--delay': `${e.delay}s`,
            } as CSSProperties
          }
        />
      ))}

      {/* Logs */}
      <div className="absolute bottom-[6%] left-[12%] h-[8%] w-[76%] rotate-[10deg] rounded-full bg-gradient-to-b from-[#6b3a1f] to-[#2e1709]" />
      <div className="absolute bottom-[6%] left-[12%] h-[8%] w-[76%] -rotate-[10deg] rounded-full bg-gradient-to-b from-[#7a4424] to-[#351a0b]" />
    </div>
  )
}
