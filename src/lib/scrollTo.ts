/**
 * Scrolls to a section and moves keyboard/screen-reader focus to its heading,
 * so assistive tech users land where sighted users see the page go.
 */
export function scrollToSection(id: string, reducedMotion: boolean) {
  const section = document.getElementById(id)
  if (!section) return

  section.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  section.querySelector<HTMLElement>('[data-section-heading]')?.focus({ preventScroll: true })
  history.replaceState(null, '', `#${id}`)
}
