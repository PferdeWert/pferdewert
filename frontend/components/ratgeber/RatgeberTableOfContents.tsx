interface TableOfContentsSection {
  id: string
  title: string
}

interface RatgeberTableOfContentsProps {
  sections: TableOfContentsSection[]
  onNavigate?: (sectionId: string) => void
}

const RatgeberTableOfContents: React.FC<RatgeberTableOfContentsProps> = ({ sections, onNavigate }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (onNavigate) {
      event.preventDefault()
      onNavigate(sectionId)
    }
  }

  if (sections.length === 0) {
    return null
  }

  return (
    <nav id="inhaltsverzeichnis" aria-label="Inhaltsverzeichnis" className="py-12">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <h2 className="font-serif text-xl md:text-2xl font-semibold text-brand mb-4">Inhaltsverzeichnis</h2>
        <ol className="space-y-2 text-brand/80 text-base md:text-lg list-none pl-0">
          {sections.map((section, index) => (
            <li key={section.id} className="leading-relaxed">
              <a
                href={`#${section.id}`}
                onClick={event => handleClick(event, section.id)}
                className="flex items-center gap-3 hover:text-brand-brown transition-colors"
              >
                <span className="font-semibold">{index + 1}.</span>
                <span>{section.title}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

export default RatgeberTableOfContents
