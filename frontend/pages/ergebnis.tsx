export default function Ergebnis() {
  if (typeof window === "undefined") return null;
  const ergebnis = typeof window !== "undefined" ? localStorage.getItem("bewertung") : null;

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ergebnis</h1>
      <p className="whitespace-pre-line">{ergebnis || "Kein Ergebnis gefunden."}</p>
    </main>
  );
}
