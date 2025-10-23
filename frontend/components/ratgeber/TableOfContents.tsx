/**
 * Table of Contents Component
 * Auto-extracts headings from HTML content and provides navigation with active state tracking
 *
 * Features:
 * - Auto-extract H2 and H3 headings from HTML
 * - Intersection Observer for active state detection
 * - Smooth scroll to anchors
 * - Optional sticky positioning
 * - =Ë emoji icon
 */

import { useState, useEffect } from 'react';
import { info } from '@/lib/log';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  html: string;
  sticky?: boolean;
}

export default function TableOfContents({ html, sticky = false }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from HTML
  useEffect(() => {
    if (typeof window === 'undefined' || !html) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const headingElements = doc.querySelectorAll('h2, h3');

    const extractedHeadings: Heading[] = Array.from(headingElements).map((heading) => {
      const text = heading.textContent || '';
      const level = parseInt(heading.tagName.substring(1), 10);

      // Generate ID from text if not present
      const id = heading.id || text.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      return { id, text, level };
    });

    setHeadings(extractedHeadings);
    info('TableOfContents: Extracted headings', extractedHeadings);
  }, [html]);

  // Intersection Observer for active state
  useEffect(() => {
    if (typeof window === 'undefined' || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  // Smooth scroll handler
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav
      className={`bg-white rounded-lg shadow-sm p-6 ${sticky ? 'lg:sticky lg:top-24' : ''}`}
      aria-label="Inhaltsverzeichnis"
    >
      <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <span className="mr-2" aria-hidden="true">=Ë</span>
        Inhaltsverzeichnis
      </h2>
      <ul className="space-y-2">
        {headings.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`block py-1 text-sm transition-colors ${
                activeId === id
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
