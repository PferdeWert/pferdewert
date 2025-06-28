// /frontend/pages/_app.tsx
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const initCookie = () => {
      if (typeof window !== 'undefined' && window.cookieconsent) {
        window.cookieconsent.initialise({
          type: 'opt-in',
          palette: {
            popup: { background: '#ffffff', text: '#000000' },
            button: { background: '#0a74da', text: '#ffffff' }
          },
          theme: 'classic',
          content: {
            message: 'Wir verwenden Cookies für eine bessere Nutzererfahrung.',
            allow: 'Zustimmen',
            deny: 'Ablehnen',
            link: 'Mehr erfahren',
            href: '/datenschutz'
          },
          onPopupOpen: () => {
            const popup = document.querySelector('.cc-window') as HTMLElement
            if (popup) {
              popup.style.setProperty('display', 'flex', 'important')
              popup.style.setProperty('pointer-events', 'auto', 'important')
              popup.style.setProperty('z-index', '9999', 'important')
              popup.setAttribute('role', 'dialog')
              popup.setAttribute('aria-live', 'assertive')
              popup.setAttribute('aria-modal', 'true')
              popup.setAttribute('tabindex', '-1')
              popup.focus()
            }
          },
onStatusChange: function () {
            const consentGiven = this.hasConsented()
            if (consentGiven && typeof window.gtag === 'function') {
              window.gtag('consent', 'update', {
                ad_storage: 'granted',
                analytics_storage: 'granted'
              })
            }
          }
        })
      } else {
        setTimeout(initCookie, 100) // Wiederholen bis Script geladen
      }
    }

    initCookie()
  }, [])

  return (
    <>
      <Script src="/js/cookieconsent.min.js" strategy="beforeInteractive" />
      <Component {...pageProps} />
    </>
  )
}
