import { useCountryConfig } from '@/hooks/useCountryConfig';

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
        <li><strong>DE Version:</strong> Should include "E" in Ausbildung options</li>
        <li><strong>AT Version:</strong> Should NOT include "E" (Austrian system has no E-Level)</li>
      </ul>

      <h2>Test Links:</h2>
      <ul>
        <li><a href="/test-locale" style={{ color: 'blue' }}>German Version (DE)</a></li>
        <li><a href="/at/test-locale" style={{ color: 'blue' }}>Austrian Version (AT)</a></li>
      </ul>
    </div>
  );
}
