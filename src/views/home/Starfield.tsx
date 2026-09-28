import { useMemo, type CSSProperties } from 'react'
import { seededRandom } from '../../lib/math'

const STAR_COUNT = 260

type Props = {
  /** Overall brightness of the field, 0–1. */
  brightness: number
}

export function Starfield({ brightness }: Props) {
  const stars = useMemo(() => {
    const rand = seededRandom(42)
    return Array.from({ length: STAR_COUNT }, (_, i) => {
      const size = rand() < 0.85 ? 1 + rand() : 2 + rand() * 1.2
      return {
        id: i,
        left: rand() * 100,
        top: rand() * 100,
        size,
        opacity: 0.4 + rand() * 0.6,
        dur: 2.5 + rand() * 4.5,
        delay: -rand() * 7,
      }
    })
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
      style={{ opacity: brightness }}
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="anim-twinkle absolute rounded-full bg-white"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              boxShadow: s.size > 2 ? '0 0 4px 1px rgba(255,255,255,0.45)' : undefined,
              '--star-opacity': s.opacity,
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}
