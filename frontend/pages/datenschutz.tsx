// frontend/pages/datenschutz.tsx
import Head from "next/head";
import Layout from "@/components/Layout";
import { useSEO } from "@/hooks/useSEO";

export default function Datenschutz() {
  const { canonical, hreflangTags } = useSEO();

  return (
    <Layout>
      <Head>
        <title>Datenschutz | PferdeWert</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={canonical} />
        {hreflangTags.map(tag => (
          <link key={tag.hreflang} rel="alternate" hrefLang={tag.hreflang} href={tag.href} />
        ))}
      </Head>
      <main className="prose mx-auto px-4 py-12">
        <h1>Datenschutzerklärung</h1>

        <p>
          Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher
          ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
        </p>

        <h2>Zahlungsabwicklung über Stripe</h2>
        <p>
          Zur Abwicklung von Zahlungen nutzen wir den Dienstleister Stripe. Wir akzeptieren verschiedene
          Zahlungsmethoden wie Kreditkarte, Klarna, PayPal sowie für österreichische Kunden zusätzlich
          EPS (Electronic Payment Standard). Die Zahlungsabwicklung erfolgt über Stripe Payments Europe, Ltd.,
          1 Grand Canal Street Lower, Grand Canal Dock, Dublin, Irland. Dabei werden Ihre Zahlungsdaten
          direkt an Stripe übermittelt und dort verarbeitet. Die Übermittlung Ihrer Daten erfolgt auf
          Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Verarbeitung zur Vertragserfüllung) sowie auf Grundlage
          eines berechtigten Interesses an einer sicheren und effizienten Zahlungsabwicklung gemäß
          Art. 6 Abs. 1 lit. f DSGVO.
        </p>
        <p>
          Weitere Informationen finden Sie in der Datenschutzerklärung von Stripe unter:
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="underline">
            https://stripe.com/privacy
          </a>
        </p>

        <h2>Kontakt mit uns</h2>
        <p>
          Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre angegebenen
          Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen sechs Monate bei uns
          gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
        </p>

        <h2>Technisch notwendige Cookies</h2>
        <p>
          Zur ordnungsgemäßen Abwicklung von Zahlungen und zur Zuordnung von Transaktionen zu Marketing-Quellen
          (Revenue Attribution) setzen wir technisch notwendige Cookies ein, die keine separate Einwilligung
          erfordern. Diese Cookies dienen ausschließlich der Betrugserkennung und der Zuordnung von Zahlungsvorgängen.
        </p>

        <h3>DataFa.st Attribution-Cookies</h3>
        <p>
          Wir nutzen DataFa.st (DataFa.st GmbH, EU) zur Zuordnung von Zahlungen zu Marketing-Quellen.
          Dabei werden folgende technisch notwendige Cookies gesetzt:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>df_visitor_id</strong>: Eindeutige Besucher-ID zur Zuordnung von Zahlungsvorgängen
            (Laufzeit: 2 Jahre, ausschließlich EU-Speicherung)
          </li>
          <li>
            <strong>df_session_id</strong>: Session-ID zur Zuordnung von Transaktionen innerhalb einer Sitzung
            (Laufzeit: 24 Stunden, ausschließlich EU-Speicherung)
          </li>
        </ul>
        <p>
          Diese Cookies werden auf Grundlage unseres berechtigten Interesses an einer ordnungsgemäßen
          Zahlungsabwicklung und Betrugsprävention gemäß Art. 6 Abs. 1 lit. f DSGVO gesetzt. Die Cookies
          enthalten keine personenbezogenen Daten und dienen ausschließlich der technischen Zuordnung von
          Transaktionen. Über diese Cookies werden <strong>keine Nutzerverhalten oder Seitenaufrufe getrackt</strong>
          – dies erfolgt nur mit Ihrer ausdrücklichen Einwilligung (siehe Abschnitt &quot;Analyse und Tracking&quot;).
        </p>

        <h2>Analyse und Tracking</h2>
        <p>
          Zur Verbesserung unserer Website nutzen wir folgende Analyse-Tools mit Ihrer ausdrücklichen Einwilligung:
        </p>

        <h3>Google Analytics 4</h3>
        <p>
          Wir nutzen Google Analytics 4 zur Analyse der Website-Nutzung. Dieser Dienst wird nur mit Ihrer
          ausdrücklichen Einwilligung geladen. Dabei werden Daten zu Google in die USA übertragen.
          Die Datenübertragung erfolgt auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
          Weitere Informationen finden Sie in der{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Google Datenschutzerklärung
          </a>
          .
        </p>

        <h3>DataFa.st Analytics</h3>
        <p>
          Zusätzlich zu den technisch notwendigen Attribution-Cookies (siehe oben) verwenden wir DataFa.st
          für DSGVO-konforme Webanalytics zur Analyse von Seitenaufrufen und Nutzerverhalten. Diese
          Analytics-Funktionen werden ausschließlich in der EU verarbeitet und anonymisiert gespeichert.
          Die Nutzung dieser Analytics-Funktionen erfolgt nur mit Ihrer ausdrücklichen Einwilligung gemäß
          Art. 6 Abs. 1 lit. a DSGVO.
        </p>
        <p>
          <strong>Wichtig:</strong> Die technisch notwendigen Attribution-Cookies (df_visitor_id, df_session_id)
          werden unabhängig von Ihrer Analytics-Einwilligung gesetzt und dienen ausschließlich der
          Zahlungszuordnung, nicht der Verhaltensanalyse.
        </p>

        <h3>Cookies im Überblick</h3>
        <p>
          Wir setzen folgende Cookies ein:
        </p>

        <h4 className="text-base font-semibold mt-4 mb-2">Technisch notwendige Cookies (keine Einwilligung erforderlich)</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>pferdewert_cookie_consent</strong>: Speichert Ihre Cookie-Einwilligung (Laufzeit: 1 Jahr)
          </li>
          <li>
            <strong>df_visitor_id, df_session_id</strong>: DataFa.st Attribution-Cookies zur Zahlungszuordnung
            (Laufzeit: 2 Jahre bzw. 24 Stunden, nur für Revenue Attribution)
          </li>
        </ul>

        <h4 className="text-base font-semibold mt-4 mb-2">Analytics-Cookies (nur mit Ihrer Einwilligung)</h4>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Google Analytics Cookies (_ga, _gid, etc.)</strong>: Tracking-Cookies zur Website-Analyse
          </li>
          <li>
            <strong>DataFa.st Tracking</strong>: Pageview- und Event-Tracking (zusätzlich zu Attribution)
          </li>
        </ul>
      </main>
    </Layout>
  );
}
