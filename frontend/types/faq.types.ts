export interface FAQItem {
  question: string;
  answer: string;
  highlight?: boolean;
  id?: string; // For better tracking and testing
}

export interface FAQProps {
  faqs: FAQItem[];
  sectionTitle?: string;
  sectionSubtitle?: string; // Individual subtitle for each page
  withToggle?: boolean;
  withSchema?: boolean;
  initialOpenItems?: number[]; // Allow pre-opened items
  className?: string; // Allow custom styling
}