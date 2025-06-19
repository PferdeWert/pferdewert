// frontend/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-center text-sm text-gray-500 mt-12 py-6 border-t">
      <Link href="/impressum" className="hover:underline mx-2">
        Impressum
      </Link>
      <Link href="/datenschutz" className="hover:underline mx-2">
        Datenschutz
      </Link>
    </footer>
  );
}
