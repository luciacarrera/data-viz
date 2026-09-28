import { NavBar } from './components/NavBar'
import { EffectsSection } from './views/effects/EffectsSection'
import { Hero } from './views/home/Hero'
import { MapSection } from './views/map/MapSection'

function App() {
  return (
    <div className="font-sans">
      <a
        href="#main"
        className="sr-only z-[60] rounded-md bg-amber-300 px-4 py-2 font-medium text-night focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>

      <NavBar />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <MapSection />
        <EffectsSection />
      </main>
    </div>
  )
}

export default App
