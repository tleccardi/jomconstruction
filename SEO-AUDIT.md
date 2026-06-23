# Auditoría SEO — JOM Construction

## Estado: COMPLETADO ✅

## Pasadas limpias consecutivas: 2

## Score actual: 98 / 100

---

## Historial de pasadas

| Pasada | Fecha | Score | Hallazgos | Corregidos |
|--------|-------|-------|-----------|------------|
| 1 | 2026-06-23 | 96 | 5 (1🔴 · 2🟡 · 2🔵) + 1 bloqueado | 3 (1🔴 · 2🟡) |
| 2 | 2026-06-23 | 98 | 2🔵 + 1 cerrado por decisión | 2 (2🔵) |
| 3 | 2026-06-23 | 98 | 0 nuevos accionables (solo 1 bloqueado) | 0 → **pasada limpia (1/2)** |
| 4 | 2026-06-23 | 98 | 0 nuevos accionables (solo 1 bloqueado) | 0 → **pasada limpia (2/2) → CONVERGE** |

### Pasada 4 — detalle

**Build:** `npm run build` ✅. Verificación final de integridad sobre `dist/` sin tocar código.

**Verificaciones (todas OK):** un solo `<h1>`/`<title>`/`canonical`, sin `noindex`, JSON-LD parseable,
`sitemap-0.xml` con `<loc>https://jomconstruction.com.ar</loc>`, `robots.txt` apuntando al
`sitemap-index.xml`, y **todas** las `<img>` con `alt` (las 3 decorativas — logo del header, logo de
Nosotros y marca del footer — llevan `alt=""`, que Astro serializa como atributo `alt` vacío, correcto:
hay texto de marca adyacente). Único `[REEMPLAZAR]` en el HTML: el `action` del formulario (bloqueado).

**Resultado:** 0 correcciones, 0 hallazgos nuevos accionables → **pasada limpia 2/2 → convergencia**.

### Pasada 3 — detalle

**Build:** `npm run build` ✅. Re-auditoría completa de `src/` + `dist/index.html`, sin tocar código.

**Verificaciones (todas OK):** `lang="es-AR"`, charset y viewport presentes, **un solo** `<title>`,
**un solo** `rel="canonical"`, **un solo** `<h1>`, sin `noindex`, `og:image:alt` + `twitter:image:alt`
presentes, skip-link con destino `#contenido` existente, y **todos** los anchors del nav resuelven
(`#inicio`, `#servicios`, `#obras`, `#proceso`, `#nosotros`, `#contacto`). El único `[REEMPLAZAR]`
en el HTML es el `action` del formulario (bloqueado por dato del cliente).

**Resultado:** 0 correcciones, 0 hallazgos nuevos accionables → contador de pasadas limpias **1/2**.
Score sin cambios: **98/100** (misma resta única: −2 por el form bloqueado).

### Pasada 2 — detalle

**Build:** `npm run build` ✅. Re-auditado `src/` + `dist/index.html`.

**Hallazgos:**

- 🔵 **`address.addressLocality` del JSON-LD era una frase** ("Buenos Aires y todo el país")
  donde schema.org espera una ciudad. → **CORREGIDO**: ahora `addressLocality: "Buenos Aires"`
  (la base real que ya figura en el kicker del hero, no es dato inventado); la cobertura
  nacional queda en `areaServed: "Argentina"`. `CONTACT.address` se sigue usando como texto de
  display en Nosotros/Footer.
- 🔵 **Faltaban `og:image:alt` y `twitter:image:alt`** (completitud de OG/Twitter). →
  **CORREGIDO**: agregados con texto descriptivo y on-keyword (sin inventar dato del cliente).
- ✅ **Cerrado por decisión (no es defecto):** la "discrepancia" canonical (`…com.ar/`) vs
  sitemap (`…com.ar`) en la raíz del dominio — Google normaliza la raíz con y sin barra como la
  misma URL canónica. No se toca para no arriesgar el comportamiento de futuras subpáginas con
  `trailingSlash: 'never'`. No penaliza.
- ✅ **Evaluado y descartado:** schema `Service`/`makesOffer` por los 5 servicios. El
  `GeneralContractor` con `knowsAbout` ya cubre la semántica; agregarlo acoplaría `Layout` a la
  data de `Servicios` sin beneficio claro de rich-results. Se mantiene el cambio mínimo.

**Desglose del score (rúbrica 0–100):**

| Categoría | Máx | Estado | Puntos |
|-----------|-----|--------|--------|
| Metadatos / head | 20 | `<title>` 57 ✓, description 137 ✓, canonical ✓, `lang="es-AR"` ✓, OG completo (+ `og:image:alt`) con `og-cover.jpg` 1200×630 ✓, Twitter card (+ `twitter:image:alt`) ✓, theme-color ✓, favicons completos ✓ | 20 |
| Datos estructurados | 15 | JSON-LD `GeneralContractor` parseable, `telephone` E.164, `addressLocality` real, sin campos vacíos ni `sameAs` placeholder | 15 |
| Semántica / encabezados | 15 | Un solo `<h1>`, H2→H3 sin saltos, landmarks completos, skip-link a `#contenido` ✓ | 15 |
| Imágenes / alt / CLS | 15 | `astro:assets` (dimensiones → sin CLS), `alt` descriptivos, decorativas con `alt=""`, video con `poster` webp | 15 |
| Indexabilidad | 15 | `robots.txt` → sitemap real, `sitemap-*.xml` con URL real, `trailingSlash: 'never'`, sin `noindex` | 15 |
| Performance-SEO | 15 | CSS inline, preload solo de la fuente del LCP, webp responsive (`astro:assets`), sin render-blocking | 15 |
| Contenido / keywords | 5 | Sin lorem ni `[REEMPLAZAR]` visibles, keywords naturales | 5 |
| **Total** | **100** | Resta: −2 (🟡 form bloqueado por dato del cliente) | **98** |

### Pasada 1 — detalle

**Build:** `npm run build` ✅ (1 página, sitemap generado). Auditado `src/` y el `dist/index.html` real.

**Hallazgos:**

- 🔴 **Placeholder visible `[REEMPLAZAR: breve historia real…]`** renderizado en el `<p>` de la
  sección Nosotros — texto roto indexable y a la vista del usuario en una sección de contenido.
  → **CORREGIDO**: se quitó el placeholder visible y se dejó un comentario Astro `{/* … */}`
  (no se renderiza). La historia real sigue pendiente del cliente (ver backlog).
- 🟡 **Placeholder visible `[REEMPLAZAR: razón social y CUIT]`** en el `footer-bottom`.
  → **CORREGIDO**: reemplazado por comentario Astro; no se publica texto roto.
- 🟡 **`telephone` del JSON-LD en formato local** (`11 3636-4817`, sin código de país).
  → **CORREGIDO**: ahora se deriva del WhatsApp en E.164 → `+5491136364817`
  (`Layout.astro`).
- 🔵 **`address.addressLocality` del JSON-LD es una frase de marketing** ("Buenos Aires y todo
  el país") en lugar de una localidad. No es dañino; queda en backlog (depende de definir
  domicilio real / criterio).
- 🔵 **Canonical del home con barra final** (`…com.ar/`) vs **sitemap sin barra** (`…com.ar`).
  Para la raíz del dominio ambas URLs son equivalentes para Google → inocuo. Backlog.
- ⛔ **Bloqueado (dato del cliente):** el `action` del formulario sigue con el placeholder de
  Formspree. Es un atributo (no texto indexable), no afecta el crawl, pero el form no envía
  hasta cargar el endpoint real. No se rellena con dato ficticio.

**Desglose del score (rúbrica 0–100):**

| Categoría | Máx | Estado | Puntos |
|-----------|-----|--------|--------|
| Metadatos / head | 20 | `<title>` 57 chars ✓, description 137 chars ✓, canonical ✓, `lang="es-AR"` ✓, OG completo + `og-cover.jpg` 1200×630 ✓, Twitter card ✓, theme-color ✓, favicon/apple-touch/icon-192/512 ✓ | 20 |
| Datos estructurados | 15 | JSON-LD `GeneralContractor` parseable, sin placeholders, `telephone` E.164, sin `sameAs` vacío (se omite cuando las redes son placeholder). `addressLocality` mejorable (🔵) | 14 |
| Semántica / encabezados | 15 | Un solo `<h1>`, jerarquía H2→H3 sin saltos, landmarks (`header`/`main`/`nav`/`section`/`footer`), skip-link a `#contenido` ✓ | 15 |
| Imágenes / alt / CLS | 15 | `astro:assets` (dimensiones → sin CLS), `alt` descriptivos en todas las fotos de obra, `alt=""` correcto en logos decorativos, `loading`/`decoding` por defecto, video con `poster` webp | 15 |
| Indexabilidad | 15 | `robots.txt` → sitemap real, `sitemap-index.xml` + `sitemap-0.xml` con la URL real, `trailingSlash: 'never'`, sin `noindex`. Discrepancia barra raíz canonical/sitemap (🔵, inocua) | 14 |
| Performance-SEO | 15 | CSS inline (`inlineStylesheets: 'always'`), preload solo de la fuente del LCP (Marcellus), imágenes webp responsive vía pipeline, sin render-blocking | 15 |
| Contenido / keywords | 5 | Sin lorem ni `[REEMPLAZAR]` visibles tras la corrección, keywords naturales (constructora, obra nueva, refacciones, desarrollos) | 3 |
| **Total** | **100** | Restas: −2 (🟡 form bloqueado) −2 (🔵×2) | **96** |

> Nota de honestidad: el form bloqueado se cuenta como −2 porque deja el sitio sin captar
> leads por formulario hasta que el cliente cargue el endpoint; no es un problema de
> indexabilidad sino de conversión. Los dos 🔵 son mejoras finas, no defectos que penalice Google.

---

## Backlog de hallazgos abiertos

### Bloqueados — requieren dato del cliente (no se inventan)
- **Endpoint del formulario** (`src/config.ts` → `formEndpoint`): hoy placeholder de Formspree.
  El form no envía hasta cargar la URL real. *Bloqueado: requiere dato del cliente.*
- **Historia real de la empresa** (Nosotros): año de inicio, fundadores, trayectoria.
  El placeholder visible ya se quitó; falta el texto real. *Bloqueado: requiere dato del cliente.*
- **Razón social y CUIT** (Footer, opcional). *Bloqueado: requiere dato del cliente.*
- **Métricas reales** (`METRICS` en config) y **datos de obras** (año/estado) hoy provisorios.
  No afectan SEO técnico, pero conviene reales para E-E-A-T. *Bloqueado: requiere dato del cliente.*
- **Dominio real**: si cambia, actualizar `astro.config.mjs`, `config.ts` y `robots.txt`.
  *Bloqueado: requiere dato del cliente.*
- **Instagram / LinkedIn**: al cargarlos en config se agregan solos al footer y se podría
  sumar `sameAs` al JSON-LD. *Bloqueado: requiere dato del cliente.*

### Cerrado por decisión (no acción — no son defectos)
- ✅ `addressLocality` del JSON-LD — **resuelto en pasada 2** (ahora "Buenos Aires").
- ✅ `og:image:alt` / `twitter:image:alt` — **agregados en pasada 2**.
- ✅ Barra final canonical (`/`) vs sitemap (sin `/`) en la raíz — equivalente para Google; no se
  corrige para no arriesgar el `trailingSlash: 'never'` de futuras subpáginas.
- ✅ Schema `Service`/`makesOffer` — evaluado y descartado (cobertura ya dada por `knowsAbout`;
  evita acoplar `Layout` a `Servicios`).

---

## Veredicto final (convergencia alcanzada — 2 pasadas limpias)

**Score final: 98 / 100.** El SEO técnico de la landing está **sólido y completo** dentro del
alcance de la app. Tras 4 pasadas (2 con correcciones, 2 limpias consecutivas) no quedan hallazgos
accionables: todo lo pendiente depende de datos que sólo puede aportar el cliente.

**Qué quedó resuelto (pasadas 1–2):**
- Se eliminaron los 2 placeholders `[REEMPLAZAR]` que se renderizaban como texto visible/indexable
  (historia de empresa en Nosotros; razón social/CUIT en el footer) → reemplazados por comentarios
  Astro que no se publican.
- `telephone` del JSON-LD pasado a formato internacional E.164 (`+5491136364817`).
- `addressLocality` del JSON-LD corregido a una localidad real (`Buenos Aires`); cobertura nacional
  en `areaServed`.
- Agregados `og:image:alt` y `twitter:image:alt` (completitud de tarjetas sociales).

**Estado por categoría (todas verificadas contra el `dist/index.html` real):**
metadatos/head 20/20 · datos estructurados 15/15 · semántica/encabezados 15/15 ·
imágenes/alt/CLS 15/15 · indexabilidad 15/15 · performance-SEO 15/15 · contenido/keywords 5/5.
La única resta (−2) es el formulario, **bloqueado por dato del cliente**.

**Lo que queda en backlog — depende del cliente (no se inventa):**
1. **Endpoint del formulario** (`config.ts` → `formEndpoint`): es el único punto que hoy resta −2.
   Sin la URL real de Formspree/Web3Forms el form no envía leads. *Acción del cliente.*
2. **Historia real de la empresa**, **razón social y CUIT**, **métricas reales** y **datos de obras**
   (hoy provisorios): no afectan el SEO técnico pero suman E-E-A-T y confianza. *Acción del cliente.*
3. **Dominio real**: al confirmarse, actualizar `astro.config.mjs`, `config.ts` y `robots.txt`.
4. **Instagram / LinkedIn**: al cargarlos, el footer los muestra solo y se podría sumar `sameAs`
   al JSON-LD. *Acción del cliente.*

> Honestidad: el score 98 refleja el estado técnico controlable por desarrollo. El −2 del form no
> es un problema de indexabilidad (el `action` es un atributo, no texto indexable) sino de
> conversión; se mantiene la resta porque, tal cual está, el sitio no capta leads por formulario
> hasta que el cliente cargue el endpoint. Loop cerrado.
