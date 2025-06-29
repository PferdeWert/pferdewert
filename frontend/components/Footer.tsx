// frontend/components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#FCFAF6] text-center text-sm text-[#5A4B3B] mt-12 py-6 border-t border-[#EAE4DC]">
      <div className="space-x-4">
        <Link href="/impressum" className="hover:underline">
          Impressum
        </Link>
        <Link href="/datenschutz" className="hover:underline">
          Datenschutz
        </Link>
      </div>
      <p className="mt-2 text-xs text-[#9C8E7F]">
        © {new Date().getFullYear()} PferdeWert – alle Rechte vorbehalten
      </p>
    </footer>
  );
}
