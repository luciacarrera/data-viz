import { WorldMap } from './WorldMap'

// Extra height beyond one screen is scroll distance where the map stays pinned in place.
export function MapSection() {
  return (
    <section id="map" aria-labelledby="map-heading" className="relative h-[200vh] w-full bg-night">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <WorldMap />
        </div>
        <h2
          id="map-heading"
          tabIndex={-1}
          data-section-heading
          className="pointer-events-none absolute top-6 left-6 z-10 font-display text-4xl font-medium text-ivory focus:outline-none sm:text-5xl"
        >
          Map
        </h2>
      </div>
    </section>
  )
}
