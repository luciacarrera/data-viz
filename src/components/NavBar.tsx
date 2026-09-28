import { useEffect, useState, type MouseEvent } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { scrollToSection } from '../lib/scrollTo'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'map', label: 'Map' },
  { id: 'effects', label: 'Effects' },
] as const

type SectionId = (typeof NAV_ITEMS)[number]['id']

export function NavBar() {
  const [active, setActive] = useState<SectionId>('home')
  const reducedMotion = useReducedMotion()

  // Track which section crosses the middle of the viewport, and mirror it in the URL.
  useEffect(() => {
    const visible = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        }
        const current = NAV_ITEMS.find(({ id }) => visible.has(id))
        if (!current) return
        setActive(current.id)
        // replaceState so scrolling doesn't flood the back-button history.
        if (location.hash !== `#${current.id}`) history.replaceState(null, '', `#${current.id}`)
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    for (const { id } of NAV_ITEMS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const onClick = (e: MouseEvent<HTMLAnchorElement>, id: SectionId) => {
    e.preventDefault()
    scrollToSection(id, reducedMotion)
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-end px-4">
      <nav
        aria-label="Main"
        className="rounded-full p-1"
      >
        <ul className="flex gap-2">
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => onClick(e, id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`flex min-h-11 min-w-11 items-center justify-center rounded-full px-5 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-night focus-visible:outline-none ${
                    isActive ? 'bg-white/15 text-white' : 'text-ivory/85 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
