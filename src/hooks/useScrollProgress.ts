import { useEffect, useState, type RefObject } from 'react'
import { clamp } from '../lib/math'

/** How far (0–1) the user has scrolled through the given element. */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      setProgress(scrollable > 0 ? clamp(-rect.top / scrollable) : 0)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ref])

  return progress
}
