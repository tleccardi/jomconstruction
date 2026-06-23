# JOM Construction — Landing page

Landing page de captación de leads para JOM Construction, construida con
[Astro 6](https://astro.build) como sitio 100% estático.

- **Objetivo**: que el visitante pida presupuesto (formulario) o escriba por WhatsApp.
- **Investigación y decisiones de diseño**: ver [RESEARCH.md](RESEARCH.md).
- **Datos que faltan completar**: ver [PENDIENTES.md](PENDIENTES.md) ⚠️ — el sitio funciona,
  pero WhatsApp, email y formulario apuntan a placeholders hasta completarlos.

## Requisitos

- Node.js **22 o superior** (requisito de Astro 6)
- npm

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo en http://localhost:4321
npm run build      # build de producción → carpeta dist/
npm run preview    # servir el build de producción localmente
```

> El primer `dev`/`build` necesita internet: la Fonts API de Astro descarga y cachea las
> fuentes (Marcellus y Figtree) desde el provider de Fontsource. Después quedan cacheadas.

## Estructura

```
├── astro.config.mjs        # site URL, sitemap, imágenes, fuentes (Fonts API)
├── src/
│   ├── config.ts           # ⭐ datos de contacto, métricas y navegación (editar acá)
│   ├── layouts/Layout.astro    # <head> SEO completo + JSON-LD + script de animaciones
│   ├── pages/index.astro       # ensambla las secciones
│   ├── components/             # una sección = un componente
│   │   ├── Header.astro        # nav fija + menú mobile (<dialog>)
│   │   ├── Hero.astro          # foto drone + propuesta de valor + CTAs
│   │   ├── MetricsBar.astro    # franja de métricas (placeholders)
│   │   ├── Servicios.astro     # 5 servicios con consulta por WhatsApp contextual
│   │   ├── Obras.astro         # case study con lightbox (<dialog>)
│   │   ├── Proceso.astro       # 4 pasos + compromisos
│   │   ├── Diferenciadores.astro
│   │   ├── Nosotros.astro
│   │   ├── Contacto.astro      # formulario (Formspree) + canales
│   │   ├── Footer.astro
│   │   └── StickyContact.astro # WhatsApp flotante + barra sticky mobile
│   ├── styles/
│   │   ├── tokens.css      # ⭐ design tokens (paleta extraída del logo, tipografía, espaciado)
│   │   └── global.css      # reset, base, utilidades (.btn, .section, .reveal)
│   └── assets/             # logo y fotos de obra (optimizadas por astro:assets)
├── public/                 # favicons, og-cover.jpg, robots.txt
└── scripts/generate-icons.mjs  # regenera favicons/OG desde el logo (node scripts/generate-icons.mjs)
```

## Editar contenido

- **Contacto, WhatsApp, métricas, navegación** → `src/config.ts` (un solo lugar).
- **Textos de secciones** → el componente correspondiente en `src/components/`.
- **Colores, tipografías, espaciado** → `src/styles/tokens.css` (no hay valores sueltos).
- **Agregar una obra** → sumar fotos a `src/assets/` y extender los arrays `FOTOS` /
  `DATOS_OBRA` en `src/components/Obras.astro`.

## Deploy

El build genera HTML/CSS/imágenes estáticos en `dist/` — se puede servir desde cualquier
hosting estático:

- **Netlify / Vercel / Cloudflare Pages** (recomendado): conectar el repo, framework "Astro",
  build command `npm run build`, output `dist/`. Configurar el dominio y forzar redirects 301
  sin barra final (el sitio usa `trailingSlash: 'never'`).
- **Hosting propio**: subir el contenido de `dist/` al servidor.

Antes del deploy definitivo:

1. Completar [PENDIENTES.md](PENDIENTES.md) (en especial WhatsApp, email, endpoint del
   formulario y dominio real).
2. Actualizar `SITE_URL` en `astro.config.mjs` y la línea `Sitemap:` de `public/robots.txt`.
3. `npm run build && npm run preview` y probar: formulario, links de WhatsApp, menú mobile,
   lightbox de obras.

## Performance y accesibilidad

- Imágenes en AVIF/WebP responsive vía `astro:assets`; el hero usa `priority` (LCP).
- Fuentes auto-hospedadas con preload y fallbacks ajustados (sin layout shift).
- CSS inline en el HTML (sin requests render-blocking); JS total ≈ 2 KB (menú, lightbox,
  animaciones de entrada con `IntersectionObserver`).
- WCAG 2.2 AA: contraste verificado por par de colores, `<dialog>` nativo (focus trap + Esc),
  navegación por teclado, `prefers-reduced-motion` respetado, targets táctiles ≥44px.
