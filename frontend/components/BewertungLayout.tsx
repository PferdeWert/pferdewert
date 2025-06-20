// components/BewertungLayout.tsx

import { ReactNode } from "react";

export type BewertungLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function BewertungLayout({ title, children }: BewertungLayoutProps) {
  return (
    <main className="bg-brand-light min-h-screen py-20 px-4">
      <div className="mx-auto max-w-2xl bg-white rounded-2xl shadow-soft p-8 border border-brand/10">
        <h1 className="mb-6 text-h2 font-serif font-bold text-brand text-center">
          {title}
        </h1>
        {children}
      </div>
    </main>
  );
}
