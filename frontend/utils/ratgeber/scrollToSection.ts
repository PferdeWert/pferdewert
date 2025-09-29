export const scrollToSection = (sectionId: string) => {
  if (typeof window === 'undefined') return

  requestAnimationFrame(() => {
    const target = document.getElementById(sectionId)
    if (!target) return

    const header = document.querySelector('header')
    const toc = document.getElementById('inhaltsverzeichnis')
    const headerHeight = header instanceof HTMLElement ? header.offsetHeight : 0
    const tocHeight = toc instanceof HTMLElement ? toc.offsetHeight : 0
    const offset = headerHeight + tocHeight + 24

    const targetPosition = target.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: targetPosition - offset, behavior: 'smooth' })
  })
}

export default scrollToSection
