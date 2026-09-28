import { useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { mixHex, range } from '../../lib/math'
import { Fire } from './Fire'
import { Starfield } from './Starfield'

const DARKNESS = '#050b24'
const DUSK = '#12224f'

const LINES = {
  dark: 'First, there was darkness.',
  fire: 'Then man created fire.',
}

export function Hero() {
  const wrapperRef = useRef<HTMLElement>(null)
  const p = useScrollProgress(wrapperRef)
  const reducedMotion = useReducedMotion()

  const darkOut = range(p, 0.2, 0.45)
  const fireIn = range(p, 0.45, 0.7)
  const fireRise = range(p, 0.4, 0.8)
  const isFire = p >= 0.55

  // Scroll-linked movement is dropped for reduced motion; the crossfade stays.
  const shift = (px: number) => (reducedMotion ? undefined : `translateY(${px}px)`)

  return (
    <section ref={wrapperRef} id="home" aria-labelledby="home-heading" className="relative h-[250vh]">
      <div
        className="sticky top-0 flex h-screen items-start justify-center overflow-hidden px-4 pt-[24vh]"
        style={{ backgroundColor: mixHex(DARKNESS, DUSK, range(p, 0.3, 0.8)) }}
      >
        <Starfield brightness={1 - 0.4 * fireRise} />

        {/* Warm light the fire casts on the lower part of the scene */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
          style={{
            opacity: fireRise,
            background:
              'radial-gradient(ellipse 60% 70% at 50% 85%, rgba(255,120,40,0.22), rgba(255,120,40,0) 70%)',
            maskImage: 'linear-gradient(to top, transparent, black 30%)',
          }}
        />

        <h1
          id="home-heading"
          tabIndex={-1}
          data-section-heading
          className="relative grid text-center font-display text-5xl leading-tight font-medium text-ivory focus:outline-none sm:text-6xl md:text-7xl"
        >
          <span
            aria-hidden={isFire}
            className="col-start-1 row-start-1"
            style={{ opacity: 1 - darkOut, transform: shift(-24 * darkOut) }}
          >
            {LINES.dark}
          </span>
          <span
            aria-hidden={!isFire}
            className="col-start-1 row-start-1 [text-shadow:0_0_28px_rgba(255,170,80,0.45)]"
            style={{ opacity: fireIn, transform: shift(24 * (1 - fireIn)) }}
          >
            {LINES.fire}
          </span>
        </h1>

        {/* Announce the scene change to screen readers */}
        <p className="sr-only" aria-live="polite">
          {isFire ? LINES.fire : ''}
        </p>

        <Fire
          style={{
            opacity: fireRise,
            transform: reducedMotion
              ? 'translateX(-50%)'
              : `translateX(-50%) translateY(${(1 - fireRise) * 30}%) scale(${0.7 + 0.3 * fireRise})`,
            transformOrigin: 'bottom center',
          }}
        />

        <p
          aria-hidden={p > 0.15}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm tracking-[0.2em] whitespace-nowrap text-ivory/80 uppercase"
          style={{ opacity: 1 - range(p, 0, 0.15) }}
        >
          Scroll to continue
        </p>
      </div>
    </section>
  )
}
