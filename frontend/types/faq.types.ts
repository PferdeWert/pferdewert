export interface FAQItem {
  question: string;
  answer: string;
  highlight?: boolean;
  id?: string; // For better tracking and testing
}

export interface FAQProps {
  faqs: FAQItem[];
  sectionTitle?: string;
  withToggle?: boolean;
  withSchema?: boolean;
  initialOpenItems?: number[]; // Allow pre-opened items
  className?: string; // Allow custom styling
}