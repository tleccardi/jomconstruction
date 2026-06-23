# PENDIENTES.md — Datos que debe completar el cliente

Todos los textos provisorios del sitio están marcados con el formato `[REEMPLAZAR: descripción]`.
Esta lista los agrupa por prioridad. Buscar el texto exacto en el archivo indicado y reemplazarlo.

> 💡 La mayoría de los datos de contacto están centralizados en **`src/config.ts`** — con
> completar ese archivo, el WhatsApp, email, zona y redes se actualizan en todo el sitio.

---

## 🔴 Críticos (el sitio no capta leads sin esto)

| Dato | Dónde |
|------|-------|
| ~~**Número de WhatsApp**~~ ✅ cargado (`5491136364817`) | `src/config.ts` → `whatsappNumber` |
| ~~**WhatsApp para mostrar**~~ ✅ cargado (`11 3636-4817`) | `src/config.ts` → `whatsappDisplay` |
| ~~**Email de contacto**~~ ✅ cargado (`info@jomconstruction.com`) | `src/config.ts` → `email` |
| **Endpoint del formulario**: crear cuenta gratis en [Formspree](https://formspree.io) (o Web3Forms), crear un form y pegar la URL (ej. `https://formspree.io/f/abcd1234`) | `src/config.ts` → `formEndpoint` |
| **Dominio real del sitio** (afecta SEO, sitemap y Open Graph) | `astro.config.mjs` → `SITE_URL`, `src/config.ts` → `url`, y `public/robots.txt` (línea `Sitemap:`) |

## 🟠 Importantes (confianza y posicionamiento)

| Dato | Dónde |
|------|-------|
| **Fotos de obra originales en alta resolución** (≥2400px de ancho). Las actuales llegaron recomprimidas por WhatsApp a ~1110px: alcanzan, pero en pantallas grandes y retina se ven menos nítidas. Pedirlas enviadas como *documento/archivo* por WhatsApp, o por mail/Drive. Al recibirlas: reemplazar los `.jpg` de `src/assets/` y subir los `widths` del hero en `src/components/Hero.astro` a `[640, 960, 1280, 1920]` | `src/assets/obra-*.jpg` |
| ~~**Zona de cobertura**~~ ✅ cargada como "Buenos Aires y todo el país" (config.address + Nosotros). El hero conserva "Buenos Aires" como base; revisar si se quiere ampliar o sumar "exterior". | `src/config.ts` → `address`, `src/components/Hero.astro`, `src/components/Nosotros.astro` |
| **Métricas reales**: años de experiencia, obras entregadas, m² construidos, clientes | `src/config.ts` → `METRICS` (los 4 valores) |
| **Datos de las obras**: año/estado/m² de cada obra (hoy provisorios). En particular, **confirmar el año de la planta Glaciar Pesquera, Ushuaia** (cargado `2007` por coincidir en época/equipos con el Hotel Cilene; no se pudo verificar online) | `src/components/Obras.astro` → array `OBRAS` (campo `datos` de cada obra) |
| **Historia breve de la empresa** (año de inicio, fundadores, trayectoria) | `src/components/Nosotros.astro` (párrafo y lista de datos) |

## 🟡 Opcionales

| Dato | Dónde |
|------|-------|
| Teléfono fijo | `src/config.ts` → `phoneDisplay` (hoy no se muestra; agregar donde se quiera) |
| URL de Instagram | `src/config.ts` → `instagram` |
| URL de LinkedIn | `src/config.ts` → `linkedin` |
| Razón social y CUIT | `src/components/Footer.astro` |

> Si no hay Instagram/LinkedIn, eliminar la columna "Redes" del footer
> (`src/components/Footer.astro`).

---

## ⚠️ Compromisos operativos a validar con el cliente

El copy promete cosas que la operación debe poder cumplir. **Prometer y no cumplir es peor que
no prometer.** Confirmar (o ajustar el texto en los archivos indicados):

1. **"Respuesta en menos de 24 hs hábiles"** — aparece en Hero, Proceso y Contacto.
   La investigación muestra que el 78% de los clientes cierra con la primera empresa que
   responde; lo ideal es responder WhatsApp en minutos, no en horas.
2. **"Visita y presupuesto sin cargo y sin compromiso"** — Hero y Proceso.
3. **"Presupuesto detallado por escrito, ítem por ítem"** — Hero, Proceso, Diferenciadores.
4. **"Contrato con plazos y precio acordados" / "fecha de entrega por contrato"** — Proceso y Diferenciadores.
5. **"Personal asegurado con ART"** — Hero y Proceso.
6. **"Avances documentados con fotos y reportes"** — Proceso y Diferenciadores.

## 🔧 Integraciones pendientes (técnicas)

- [ ] **Formulario**: hoy apunta a un endpoint placeholder de Formspree. Crear el form real
      (gratis hasta 50 envíos/mes) y pegar el endpoint en `src/config.ts`. Alternativa:
      Web3Forms, o un backend propio. Probar un envío real al configurarlo.
- [ ] **Página de gracias** (opcional, recomendado): Formspree permite redirigir tras el envío
      (`_next`); crear `/gracias` para confirmar al usuario y medir conversiones.
- [ ] **Analytics / medición de conversión** (recomendado): agregar un script liviano
      (Plausible, Umami o GA4) y medir como conversión: envíos del formulario y clicks en los
      enlaces `wa.me`. La meta inicial razonable del sector es 3-5% de conversión.
- [ ] **Dominio + hosting**: deploy estático (ver README.md). Configurar redirects 301 a la
      versión sin barra final (`trailingSlash: 'never'`).
