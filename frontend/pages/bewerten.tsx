import { useState } from "react";
import { useRouter } from "next/router";

export default function Bewerten() {
  const router = useRouter();
  const [form, setForm] = useState({
    rasse: "",
    alter: "",
    geschlecht: "",
    abstammung: "",
    stockmass: "",
    ausbildung: "",
    aku: "",
    erfolge: "",
    farbe: "",
    zuechter: "",
    standort: "",
    verwendungszweck: "",
  });

  const [loading, setLoading] = useState(false);
  const [fehler, setFehler] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFehler("");

    try {
      const res = await fetch("https://api.pferdewert.onrender.com/api/bewertung", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (json.raw_gpt) {
        router.push(`/ergebnis?text=${encodeURIComponent(json.raw_gpt)}`);
      } else {
        setFehler("Die Bewertung war nicht erfolgreich. Bitte überprüfe deine Eingaben.");
      }
    } catch (err) {
      console.error(err);
      setFehler("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
    }

    setLoading(false);
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pferdebewertung anfragen</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="grid gap-4">
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
            Gesundheitsstatus / AKU-Bericht:
            <input name="aku" value={form.aku} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>
          <label className="block">
            Erfolge:
            <input name="erfolge" value={form.erfolge} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>
          <label className="block">
            Farbe:
            <input name="farbe" value={form.farbe} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>
          <label className="block">
            Züchter / Ausbildungsstall:
            <input name="zuechter" value={form.zuechter} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>
          <label className="block">
            Standort (PLZ):
            <input name="standort" value={form.standort} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>
          <label className="block">
            Verwendungszweck / Zielsetzung:
            <input name="verwendungszweck" value={form.verwendungszweck} onChange={handleChange} className="w-full p-2 border rounded" />
          </label>
        </fieldset>

        {fehler && <p className="text-red-600 font-medium">{fehler}</p>}

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "🔄 Bewertung läuft..." : "Bewerten lassen"}
        </button>
      </form>
    </main>
  );
}
