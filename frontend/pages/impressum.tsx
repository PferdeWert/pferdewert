// pages/impressum.tsx
export default function Impressum() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Impressum</h1>

      <p className="mb-2 font-semibold">Angaben gemäß § 5 TMG:</p>
      <p className="mb-4">
        PferdeWert GbR<br />
        Sabine und Benjamin Reder<br />
        Feigenweg&nbsp;17B<br />
        70619&nbsp;Stuttgart
      </p>

      <p className="mb-2 font-semibold">Kontakt:</p>
      <p className="mb-4">
        E‑Mail:&nbsp;
        <a
          href="mailto:info@pferdewert.de"
          className="text-blue-600 underline hover:text-blue-800"
        >
          info@pferdewert.de
        </a>
      </p>

      <p className="mb-2 font-semibold">Verantwortlich nach § 55 Abs. 2 RStV:</p>
      <p>
        Sabine und Benjamin Reder<br />
        Feigenweg&nbsp;17B<br />
        70619&nbsp;Stuttgart
      </p>
    </main>
  );
}
