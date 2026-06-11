// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// [REEMPLAZAR: dominio real del sitio cuando esté definido]
const SITE_URL = 'https://jomconstruction.com.ar';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  integrations: [sitemap()],

  build: {
    // El CSS de una landing es chico: inline total elimina el request render-blocking
    inlineStylesheets: 'always',
  },

  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },

  fonts: [
    {
      // Serif romana inscripcional, coherente con el wordmark del logo
      provider: fontProviders.fontsource(),
      name: 'Marcellus',
      cssVariable: '--font-marcellus',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
      fallbacks: ['Georgia', 'serif'],
    },
    {
      // Sans geométrica contemporánea para cuerpo y UI
      provider: fontProviders.fontsource(),
      name: 'Figtree',
      cssVariable: '--font-figtree',
      weights: [400, 600, 700],
      styles: ['normal'],
      subsets: ['latin'],
      formats: ['woff2'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],

  adapter: cloudflare(),
});