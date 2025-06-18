import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    rasse: "",
    alter: "",
    geschlecht: "",
    abstammung: "",
    stockmass: "",
    ausbildung: "",
    aku: "",
    erfolge: "",
  });

  const [antwort, setAntwort] = useState("Noch keine Bewertung durchgeführt …");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAntwort("Bewertung wird berechnet …");
    setLoading(true);

    try {
      const res = await fetch("https://api.pferdewert.onrender.com/api/bewertung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      setAntwort(json.raw_gpt || "Keine gültige Antwort erhalten.");
    } catch (err) {
      setAntwort("Fehler – bitte später erneut versuchen.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pferdebewertung anfragen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Rasse<span className="text-red-600">*</span>
          <input name="rasse" required value={form.rasse} onChange={handleChange} className="w-full p-2 border rounded" />
        </label>
        <label className="block">
          Alter (Jahre)<span className="text-red-600">*</span>
          <input type="number" name="alter" required value={form.alter} onChange={handleChange} className="w-full p-2 border rounded" />
        </label>
        <label className="block">
          Geschlecht<span className="text-red-600">*</span>
          <select name="geschlecht" required value={form.geschlecht} onChange={handleChange} className="w-full p-2 border rounded">
            <option value="">Bitte wählen</option>
            <option>Stute</option>
            <option>Wallach</option>
            <option>Hengst</option>
          </select>
        </label>
        <label className="block">
          Abstammung<span className="text-red-600">*</span>
          <input name="abstammung" required value={form.abstammung} onChange={handleChange} className="w-full p-2 border rounded" />
        </label>
        <label className="block">
          Stockmaß (cm)<span className="text-red-600">*</span>
          <input type="number" name="stockmass" required value={form.stockmass} onChange={handleChange} className="w-full p-2 border rounded" />
        </label>
        <label className="block">
          Ausbildungsstand<span className="text-red-600">*</span>
          <input name="ausbildung" required value={form.ausbildung} onChange={handleChange} className="w-full p-2 border rounded" />
        </label>
        <label className="block">
          AKU-Bericht:
          <input name="aku" value={form.aku} onChange={handleChange} className="w-full p-2 border rounded" />
        </label>
        <label className="block">
          Erfolge:
          <input name="erfolge" value={form.erfolge} onChange={handleChange} className="w-full p-2 border rounded" />
        </label>
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Bewertung läuft..." : "Bewerten lassen"}
        </button>
      </form>

      <label className="block mt-8">
        <span className="font-semibold">Ergebnis:</span>
        <textarea readOnly value={antwort} rows={6} className="w-full p-2 mt-2 border rounded bg-gray-100" />
      </label>
    </main>
  );
}
