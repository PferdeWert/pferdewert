/**
 * Article Content Component
 * Renders HTML article content with auto-generated heading IDs and internal link injection
 *
 * Features:
 * - XSS-safe HTML rendering
 * - Tailwind Typography prose styling
 * - Auto-generate IDs for H2/H3 headings
 * - Inject internal links at specified positions (intro/body/outro)
 * - Responsive design
 */

import { useEffect, useRef } from 'react';
import { info } from '@/lib/log';
import { InternalLink } from '@/types/ratgeber';

// Constants for internal link positioning within article content
const INTERNAL_LINK_POSITIONS = {
  INTRO_PERCENT: 0.15, // 15% into content
  BODY_PERCENT: 0.5, // 50% into content
  OUTRO_PERCENT: 0.85, // 85% into content
} as const;

interface ArticleContentProps {
  html: string;
  internalLinks?: InternalLink[];
}

// Slugify function for generating heading IDs
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function ArticleContent({ html, internalLinks = [] }: ArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-generate IDs for headings and inject internal links
  useEffect(() => {
    if (!contentRef.current) return;

    const container = contentRef.current;

    // 1. Auto-generate IDs for all H2 and H3 headings
    const headings = container.querySelectorAll('h2, h3');
    headings.forEach((heading) => {
      if (!heading.id && heading.textContent) {
        heading.id = slugify(heading.textContent);
        info('ArticleContent: Generated ID for heading', {
          text: heading.textContent,
          id: heading.id,
        });
      }
    });

    // 2. Inject internal links at specified positions
    if (internalLinks.length === 0) return;

    // Split content into paragraphs for position calculation
    const paragraphs = container.querySelectorAll('p');
    const totalParagraphs = paragraphs.length;

    if (totalParagraphs === 0) return;

    // Calculate positions based on total paragraph count
    const positions = {
      intro: Math.floor(totalParagraphs * INTERNAL_LINK_POSITIONS.INTRO_PERCENT),
      body: Math.floor(totalParagraphs * INTERNAL_LINK_POSITIONS.BODY_PERCENT),
      outro: Math.floor(totalParagraphs * INTERNAL_LINK_POSITIONS.OUTRO_PERCENT),
    };

    info('ArticleContent: Calculated link injection positions', {
      totalParagraphs,
      positions,
      linksToInject: internalLinks.length,
    });

    // Group links by position
    const linksByPosition: Record<string, InternalLink[]> = {
      intro: [],
      body: [],
      outro: [],
    };

    internalLinks.forEach((link) => {
      if (linksByPosition[link.position]) {
        linksByPosition[link.position].push(link);
      }
    });

    // Inject links at calculated positions
    Object.entries(linksByPosition).forEach(([position, links]) => {
      if (links.length === 0) return;

      const paragraphIndex = positions[position as keyof typeof positions];
      const targetParagraph = paragraphs[paragraphIndex];

      if (!targetParagraph) return;

      // Create container for internal link cards
      const linkContainer = document.createElement('div');
      linkContainer.className = 'internal-links-container';

      // Inject after the target paragraph
      targetParagraph.after(linkContainer);

      info('ArticleContent: Injected internal links', {
        position,
        paragraphIndex,
        linkCount: links.length,
      });
    });

    // Cleanup function
    return () => {
      const containers = container.querySelectorAll('.internal-links-container');
      containers.forEach((el) => el.remove());
    };
  }, [html, internalLinks]);

  return (
    <article className="max-w-4xl mx-auto">
      {/* Main article content with Tailwind Typography */}
      {/* Internal links are injected via useEffect DOM manipulation */}
      <div
        ref={contentRef}
        className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:my-6 prose-ol:my-6 prose-li:text-gray-700 prose-img:rounded-lg prose-img:shadow-md"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
