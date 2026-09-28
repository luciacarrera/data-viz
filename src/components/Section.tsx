import type { ReactNode } from 'react'

type Props = {
  id: string
  title: string
  children: ReactNode
}

export function Section({ id, title, children }: Props) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="flex min-h-screen flex-col items-center justify-center bg-dusk px-4 pt-28 pb-16 text-center"
    >
      <h2
        id={headingId}
        tabIndex={-1}
        data-section-heading
        className="font-display text-4xl font-medium text-ivory focus:outline-none sm:text-5xl"
      >
        {title}
      </h2>
      <div className="mt-6 max-w-prose text-lg leading-relaxed text-ivory/85">{children}</div>
    </section>
  )
}
