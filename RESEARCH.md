# RESEARCH.md — Investigación y decisiones de diseño

**Proyecto:** Landing page de captación de leads para JOM Construction
**Fecha:** 11 de junio de 2026
**Método:** 4 investigaciones web en paralelo: (1) patrones de sitios de constructoras de alto nivel, (2) CRO / lead-gen en servicios de alto ticket, (3) UX/UI y accesibilidad 2025-2026, (4) mejores prácticas de Astro (versión estable actual). Fuentes completas al pie.

---

## 1. Hallazgos clave

### 1.1 Patrones de constructoras de alto nivel

- **Orden de secciones consensuado** (Landingi, OpenAsset ×25 sitios, HTMLBurger ×30): hero con visual fuerte + valor + CTA → diferenciador → servicios → portfolio → confianza (métricas + testimonios) → CTA repetido → contacto. Los referentes argentinos del rubro (MRC Construcciones, ABV, M3) siguen el mismo patrón con una **franja de contadores** ("+40 años, +300.000 m² construidos, 100% entregadas en tiempo y forma").
- **Menos del 22% scrollea hasta el final** → lo crítico (servicios + un CTA) va antes del 50% del scroll; el formulario no puede vivir solo al final.
- **Las fotos reales de obra son el factor de credibilidad #1**; el stock genera desconfianza. Las fotos de drone funcionan especialmente bien como hero: comunican escala.
- **Con pocas fotos, no hacer una "galería" rala**: presentar la obra real como *case study* (ubicación, m², estado, tipo) con lightbox, y dejar la grilla preparada para crecer.
- **Oportunidad local detectada**: los referentes argentinos del rubro casi no trabajan la captación (ABV no tiene WhatsApp ni formulario visible en su home). Estética premium internacional + mecánica de captación local = posicionamiento ganador.

### 1.2 Conversión / lead-gen

- **Legibilidad gana**: copy a nivel de lectura simple convierte 11,1% vs 5,3% del copy "corporativo" (Unbounce, 57M conversiones). Frases cortas, voseo, cero jerga ("soluciones constructivas integrales" = veneno).
- **Hero**: debe responder qué servicio, por qué vos, dónde operás y qué prueba hay. Titular <10 palabras con promesa verificable. Un número concreto grande supera a todos los demás patrones (+18%). Sin video autoplay (-7% por LCP), sin sliders.
- **Formulario**: 4-5 campos single-step (multi-step solo paga con >7 campos). El teléfono se pide **con microcopy que justifique el uso** (sin eso dispara la "alarma de spam"; obligatorio sin contexto reduce envíos hasta 37%). Campos opcionales marcados "(opcional)". Nunca "Enviar" como texto del botón.
- **CTAs**: primera persona y específicos ("Quiero mi presupuesto" supera a genéricos hasta +90%); un solo objetivo de conversión repetido tras cada sección mayor; *attention ratio* cercano a 1:1 (nav mínima, sin links que dispersen).
- **WhatsApp en Argentina es canal de primera clase**, no un extra: ~90-95% de penetración, apertura 98% vs 21,5% email, conversión 5-15% vs 1-4% del flujo web. Formato correcto: `wa.me/549XXXXXXXXXX?text=` con mensaje prearmado corto y enviable tal cual; **mensajes contextuales por sección** permiten además atribuir el origen del lead.
- **Speed-to-lead**: responder en <5 min convierte hasta 21×; el 78% cierra con la primera empresa que responde. La landing debe **prometer un tiempo de respuesta** (y la operación, cumplirlo).
- **Reversión de riesgo** (+17-32%): "visita y presupuesto sin cargo", "presupuesto por escrito", "contrato con plazos", "personal asegurado con ART" — en construcción esto baja la ansiedad del alto ticket más que cualquier adjetivo.
- Benchmark de conversión del sector: 2,4-7,6% (mediana 2,6%). Meta inicial razonable: 3-5% midiendo form + clicks de wa.me.

### 1.3 UX/UI 2025-2026 y accesibilidad

- **Serif display + sans moderna sigue plenamente vigente** para marcas premium ("simplicity = luxury", mucho aire, foto editorial full-bleed). Secciones oscuras como *momentos* de foco (1-2 por página), no como tema completo.
- **Clichés a evitar**: scroll-hijacking, parallax pesado, video de fondo, y el "AI slop look" (Inter + gradiente + cards genéricas). El antídoto: fotografía real protagónica, números grandes en serif, líneas doradas finas.
- **Contraste — riesgo #1 de esta paleta**: dorado sobre blanco ≈ 1,9:1, falla AA lejos. Regla dura: dorado como texto solo sobre fondos oscuros o en versión oscurecida; sobre claro, solo decorativo.
- **WCAG 2.2 AA**: targets ≥24px (usamos ≥44-48px), `scroll-padding` para que header/barra sticky no tapen el foco (SC 2.4.11), focus visible ≥3:1 (variante clara sobre fondos oscuros).
- **Menú mobile y lightbox con `<dialog>` nativo** (`showModal()`): focus trap + Esc gratis, sin librerías.
- **LCP**: preload de la imagen hero con `fetchpriority="high"` (2,6s→1,9s solo con eso), AVIF/WebP con srcset, dimensiones explícitas (CLS=0), overlay con gradiente CSS (no horneado ni background-image).
- **Fuentes**: self-host, WOFF2 subset latin, preload solo de la serif del H1, fallbacks con métricas ajustadas (`size-adjust`) para swap sin layout shift. Inputs ≥16px (evita zoom forzado de iOS justo en el momento de conversión).
- **Sticky CTA bar inferior en mobile** (WhatsApp + presupuesto) es EL patrón para constructoras (~92% de las búsquedas de contratistas empiezan en mobile); aparece tras ~1 viewport para no canibalizar el hero.

### 1.4 Astro (corrección importante: Astro 6, no 5.x)

- **Versión estable actual: Astro 6.4.x** (Node ≥22). Cambios relevantes: Fonts API **estable** (ya no `experimental.fonts`), `<ViewTransitions />` removido, scripts en orden de declaración.
- **Imágenes**: prop `priority` en `<Image>` = `loading="eager"` + `fetchpriority="high"` de una; `layout="full-width"` para heros, `constrained` general; `image.responsiveStyles: true` global. Fotos en `src/assets/` (no `public/`).
- **Fuentes**: Fonts API nativa con `fontProviders.fontsource()` — auto-hospeda, genera preload y fallbacks metric-matched. Superior a @fontsource manual.
- **JSON-LD**: `<script type="application/ld+json" set:html={JSON.stringify(schema)} />` es el patrón oficial.
- **Cero JS innecesario**: scroll suave por CSS (`scroll-behavior` + `scroll-padding`), lightbox y menú con `<dialog>`, WhatsApp como `<a>` puro. Sin `<ClientRouter />` ni prefetch (no aportan en una one-page).
- **Config**: `inlineStylesheets: 'always'` (elimina el request de CSS render-blocking en una landing chica), `trailingSlash: 'never'`, sitemap linkeado en head y robots.txt.

---

## 2. Decisiones aplicadas

### 2.1 Arquitectura de la página (ajustes al orden propuesto, justificados)

| # | Sección | Justificación del ajuste |
|---|---------|--------------------------|
| 1 | Header fijo con anclas + CTA "Pedí tu presupuesto" | Nav mínima (attention ratio ≈1:1) |
| 2 | Hero: foto drone panorámica + titular <10 palabras + doble CTA + micro-prueba | Patrón validado; foto real > todo |
| 3 | **Franja de métricas (oscura) pegada al hero** | Patrón de los referentes argentinos (MRC/ABV); "un número concreto +18%"; forma un solo momento oscuro con el hero |
| 4 | Servicios (5 cards con consulta contextual por WhatsApp) | Antes del 50% del scroll; mensajes wa.me por servicio = atribución del lead |
| 5 | **Obras como case study** (no galería suelta) + lightbox `<dialog>` | Con 3 fotos de una misma obra, el case study con datos (ubicación, m², estado) es más creíble que una galería rala; grilla preparada para crecer |
| 6 | Proceso en 4 pasos + franja de reversión de riesgo | Movido detrás de Obras: primero prueba visual, después reducción de ansiedad; risk reversal +17-32% |
| 7 | Por qué elegirnos (diferenciadores verificables) | Sin adjetivos vacíos; cada ítem es un compromiso comprobable |
| 8 | Testimonios (placeholders con nombre + tipo de obra + localidad) | La prueba social específica es la palanca más alta (+22%); genérica = nada |
| 9 | Nosotros (breve) + logo oficial sobre panel cobalto | Refuerzo de confianza; el logo se usa tal cual (el panel usa el azul exacto del fondo del logo) |
| 10 | CTA final + formulario corto (5 campos) + WhatsApp + email — sección oscura | Segundo momento oscuro = foco total en conversión; promesa de tiempo de respuesta visible |
| 11 | Footer mínimo | Attention ratio |
| 12 | WhatsApp flotante (desktop) + **barra sticky inferior en mobile** (WhatsApp + presupuesto), aparece tras ~1 viewport | Patrón #1 para constructoras en mobile; no canibaliza el hero |

### 2.2 Sistema de diseño

- **Paleta extraída por muestreo de píxeles del logo real** (no asumida): cobalto `#0328B9`, dorado `#C3B88A→#E4DCB0` (medio `#D9CFA3`), rojo `#FF4635`, blanco. Derivados: navy profundo `#051341` (secciones oscuras), crema `#FAF8F2` (fondos claros cálidos), tinta `#10142B` (texto).
- **Reglas de contraste codificadas en tokens**: dorado jamás como texto sobre claro (existe `--color-sand-text #6F6238` ≥4.5:1 si hiciera falta); rojo solo decorativo (kickers, líneas); CTAs = dorado sobre oscuro con texto navy, o cobalto con texto blanco.
- **Tipografía: Marcellus + Figtree.** Marcellus es la alternativa Google Fonts a Trajan: romana inscripcional → connotación literal de arquitectura/piedra/permanencia, coherente con el wordmark serif del logo; un solo peso = 1 archivo WOFF2. Figtree aporta los pesos fuertes (600/700) para UI y cifras, evitando el par quemado Playfair+Inter y el "AI slop look" de Inter. Descartadas: Cormorant Garamond (frágil en pantallas chicas, off-brand), Playfair+Inter (template-look), Libre Caslon (poco impacto display).
- **Design tokens centralizados** en `src/styles/tokens.css` (colores, tipos, escala fluida con clamp, espaciado, radios, sombras, easing). Cero valores sueltos.

### 2.3 Copy

- es-AR con voseo, nivel de lectura simple, promesas verificables, cero jerga.
- CTA primario único en toda la página: **"Pedí tu presupuesto sin cargo"** (variante form: "Quiero mi presupuesto").
- Datos no confirmados (métricas, testimonios, contacto, zona) como `[REEMPLAZAR: …]` → listados en PENDIENTES.md. Los compromisos operativos (respuesta en 24 hs, visita sin cargo, ART) también se marcan para validación del cliente: **prometer y no cumplir es peor que no prometer**.

### 2.4 Técnica

- Astro 6.4 estático puro, cero islands, ~30 líneas de JS total (menú `<dialog>`, lightbox `<dialog>`, reveal con IntersectionObserver + `prefers-reduced-motion`, barra sticky).
- Fonts API nativa (fontsource provider), preload solo Marcellus.
- `<Image priority layout="full-width" />` para el hero; resto lazy AVIF/WebP `constrained`.
- Formulario: POST a Formspree (endpoint placeholder) con honeypot anti-spam; los canales reales de cierre son WhatsApp/teléfono.
- SEO: head completo, OG 1200×630 desde foto de obra, JSON-LD `GeneralContractor`, sitemap, robots.txt, `lang="es-AR"`.

---

## 3. Fuentes principales

**Constructoras / patrones**
- OpenAsset — 25 Best construction websites — https://openasset.com/resources/construction-website-examples/
- Landingi — Construction Company Landing Page Best Practices — https://landingi.com/landing-page/construction-company/
- HTMLBurger — 30 Construction Websites — https://htmlburger.com/blog/construction-websites/
- Webrunner — 7 Elements of a High-Converting Contractor Landing Page — https://webrunnermedia.com/insights/7-elements-of-a-high-converting-contractor-landing-page/
- Referentes argentinos: https://www.mrcconstrucciones.com.ar/ · https://abv.com.ar/ · https://m3construcciones.com.ar/
- SkilledReach / TrustMedia / Digital Harvest — errores que cuestan leads
- Awwwards — inspiración real estate (Nesma & Partners, TANDEM, Somerstone)

**Conversión**
- Unbounce — Conversion Benchmark Report (57M conversiones) — https://unbounce.com/conversion-benchmark-report/
- Digital Applied — 2.000 landing pages testeadas 2026 — https://www.digitalapplied.com/blog/landing-page-conversion-study-2000-pages-tested-2026
- Venture Harbour / Numinam — multi-step vs single-step
- Zuko / Vital Design / CXL — campo teléfono y fricción de formularios
- Unbounce — Attention Ratio — https://unbounce.com/conversion-glossary/definition/attention-ratio/
- Aurora Inbox / Mazkara / Blip — WhatsApp en Argentina/LatAm
- Casey Response / Scorpion — speed-to-lead (<5 min = 21×)
- SPOTIO — risk reversal +32% win rate

**UX/UI y accesibilidad**
- Figma / Designmodo / Northwoods — tendencias 2026
- W3C — WCAG 2.2 (SC 2.5.8, 2.4.11, 1.4.3, 1.4.11) — https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- WebAIM — Contrast — https://webaim.org/articles/contrast/
- MDN — fix image LCP / prefers-reduced-motion
- DebugBear / TuneTheWeb — performance de fuentes self-hosted
- A11Y Collective / Level Access — modales y navs accesibles

**Astro**
- Docs oficiales v6: upgrade-to/v6, guides/images, reference/modules/astro-assets, guides/fonts, integrations-guide/sitemap, reference/directives-reference, guides/client-side-scripts, reference/configuration-reference — https://docs.astro.build/
- Astro 6 Beta announcement — https://astro.build/blog/astro-6-beta/
