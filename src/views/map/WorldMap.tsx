import { useEffect, useRef } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'

// MapLibre locates its worker relative to its own file, which breaks once Vite bundles it.
// Let Vite bundle the worker and hand MapLibre the resulting URL instead.
maplibregl.setWorkerUrl(workerUrl)

// Free CARTO dark basemap (vector tiles, no API key). Attribution is required.
const BASEMAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'

export function WorldMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: BASEMAP_STYLE,
      center: [0, 20],
      zoom: 1.5,
      minZoom: 1,
      renderWorldCopies: false,
      // Let the page scroll past the map; zoom with Ctrl/Cmd + scroll or two fingers.
      cooperativeGestures: true,
      attributionControl: { compact: true },
    })
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right')
    mapRef.current = map

    // Data layers (e.g. fire points) can be added here once the style has loaded.
    // map.on('load', () => { ... })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  return <div ref={containerRef} className="h-full w-full" />
}
