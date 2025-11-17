import { useCountryConfig } from '@/hooks/useCountryConfig';
import Link from 'next/link';

export default function TestLocale() {
  const { country, locale, ausbildungOptions, landOptions } = useCountryConfig();

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>🧪 Locale Test Page</h1>

      <h2>useCountryConfig Hook:</h2>
      <ul>
        <li><strong>Country:</strong> {country}</li>
        <li><strong>Locale:</strong> {locale}</li>
        <li><strong>Ausbildung Options:</strong> {ausbildungOptions.join(', ')}</li>
        <li><strong>Land Options:</strong> {landOptions.map(o => o.label).join(', ')}</li>
      </ul>

      <h2>Expected Results:</h2>
      <ul>
        <li><strong>DE Version:</strong> Should include &quot;E&quot; in Ausbildung options</li>
        <li><strong>AT Version:</strong> Should NOT include &quot;E&quot; (Austrian system has no E-Level)</li>
      </ul>

      <h2>Test Links:</h2>
      <ul>
        <li><Link href="/test-locale" style={{ color: 'blue' }}>German Version (DE)</Link></li>
        <li><Link href="/at/test-locale" style={{ color: 'blue' }}>Austrian Version (AT)</Link></li>
      </ul>
    </div>
  );
}
