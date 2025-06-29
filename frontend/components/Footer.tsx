// frontend/components/Footer.tsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 mt-12 py-6 border-t">
      <div className="space-x-4">
        <Link href="/impressum" className="hover:underline">
          Impressum
        </Link>
        <Link href="/datenschutz" className="hover:underline">
          Datenschutz
        </Link>
      </div>
      <p className="mt-2 text-xs text-gray-400">
        © {new Date().getFullYear()} PferdeWert – alle Rechte vorbehalten
      </p>
    </footer>
  );
}
