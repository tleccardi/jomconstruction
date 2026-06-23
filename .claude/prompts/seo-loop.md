# Prompt de loop — Auditoría y corrección de SEO

> Uso: `/loop` (sin intervalo, auto-pautado) pegando el bloque de abajo.
> El loop se detiene solo cuando se cumple la condición de cierre.

---

Sos un ingeniero SEO senior trabajando sobre esta landing en **Astro** (`jom-construction-landing`, sitio estático servido en Cloudflare Workers). Tu trabajo es auditar **toda la app**, corregir lo que encuentres, puntuar el estado y repetir en pasadas sucesivas hasta converger.

## Estado persistente (LEER PRIMERO en cada pasada)

Todo el progreso vive en `SEO-AUDIT.md` en la raíz del repo. Es tu única fuente de verdad entre pasadas.

1. Si `SEO-AUDIT.md` **no existe**, creálo con esta estructura:
   - `# Auditoría SEO — JOM Construction`
   - `## Estado: EN PROGRESO`
   - `## Pasadas limpias consecutivas: 0`
   - `## Score actual: —`
   - `## Historial de pasadas` (tabla: Pasada | Fecha | Score | Hallazgos | Corregidos)
   - `## Backlog de hallazgos abiertos` (los que no pudiste arreglar y por qué)
2. Si **ya existe**, leelo entero antes de hacer nada. Te dice en qué pasada vas y cuántas pasadas limpias llevás.

## Qué hacer en CADA pasada (una invocación = una pasada)

1. **Build de referencia**: corré `npm run build`. Tiene que pasar. Audita tanto el `src/` (fuente) como el `dist/` generado (HTML real que ve Google).
2. **Auditá** contra el checklist de abajo. Registrá cada hallazgo con severidad: 🔴 crítico / 🟡 medio / 🔵 menor.
3. **Corregí** todos los hallazgos que puedas en esta pasada. Después de cada corrección no rompas el build: volvé a correr `npm run build` antes de cerrar.
4. **Puntuá** con la rúbrica. Anotá el score.
5. **Actualizá `SEO-AUDIT.md`**: agregá la fila de la pasada, actualizá score, mové los no resueltos al backlog con su motivo.
6. **Contador de convergencia**:
   - Si en esta pasada **corregiste 0 cosas Y no hay hallazgos nuevos accionables** → incrementá "Pasadas limpias consecutivas".
   - Si corregiste algo o apareció un hallazgo nuevo → reseteá el contador a `0`.

## Condición de cierre (terminar el loop)

Cuando **"Pasadas limpias consecutivas" llegue a 2**:
- Cambiá `## Estado:` a `COMPLETADO ✅`.
- Escribí un veredicto final en `SEO-AUDIT.md` (score final + qué quedó en backlog por depender del cliente).
- **Terminá el loop**: no agendes otra pasada, no sigas.

Mientras el contador sea `< 2`, segui en loop (otra pasada).

## Checklist SEO (alcance de esta app)

**Head / metadatos** (`src/layouts/Layout.astro`, `src/config.ts`):
- `<title>` único y ≤60 chars; `meta description` ≤155 chars, persuasiva, con keyword.
- `canonical` correcto; `lang` del `<html>` coherente (`es-AR`).
- Open Graph + Twitter completos y con imagen 1200×630 válida (`/og-cover.jpg` existe).
- `theme-color`, favicons, `apple-touch-icon`, manifest si aplica.

**Datos estructurados** (JSON-LD `GeneralContractor`):
- JSON válido (parseable), sin campos vacíos ni placeholders `[REEMPLAZAR]`.
- `telephone`, `email`, `address`, `areaServed`, `sameAs` (redes) coherentes con `config.ts`.
- Evaluá agregar schema de `Service`, `BreadcrumbList` o `Organization` si suma.

**Contenido / semántica** (componentes en `src/components/`, `src/pages/index.astro`):
- Exactamente **un `<h1>`** por página; jerarquía H2→H3 lógica sin saltos.
- Landmarks semánticos (`header`, `main`, `nav`, `section`, `footer`); el `<main id="contenido">` existe (skip-link).
- Todas las `<img>` con `alt` descriptivo (no vacío salvo decorativas); `loading`/`decoding` y dimensiones para evitar CLS.
- El `<video>` con `poster`, `preload` razonable y sin penalizar LCP.
- Densidad de keywords natural; textos sin lorem ni `[REEMPLAZAR]` visibles al usuario.

**Indexabilidad / archivos** (`public/`, `astro.config.mjs`):
- `robots.txt` correcto y apuntando al sitemap real.
- `sitemap-index.xml` se genera y lista las URLs reales.
- `trailingSlash` consistente con canonical. Sin `noindex` accidental.

**Performance como señal SEO**:
- CSS inline (ya configurado) sin regresiones; preload solo de la fuente del LCP.
- Imágenes en formato/medida adecuados (usar el pipeline de `astro:assets`).
- Sin recursos render-blocking innecesarios.

## Reglas

- **No inventes datos del cliente.** Los `[REEMPLAZAR: ...]` de `config.ts`/`PENDIENTES.md` (teléfono, endpoint de formulario, redes) NO los rellenes con datos ficticios; registralos en el backlog como "bloqueado: requiere dato del cliente". Sí podés corregir cómo se *usan* esos campos para que no rompan el SEO (ej. omitir un `sameAs` vacío del JSON-LD en vez de emitir un string vacío).
- Cambios mínimos y quirúrgicos; respetá el estilo y los comentarios en español del código existente.
- Después de tocar código, **el build tiene que pasar**. Si rompés algo, arreglalo antes de cerrar la pasada.
- No hagas commits salvo que se te pida; dejá los cambios en el working tree.
- Sé honesto en `SEO-AUDIT.md`: si no verificaste algo, decilo; no marques ✅ lo que no comprobaste.

## Rúbrica de score (0–100)

- Metadatos/head: 20
- Datos estructurados: 15
- Semántica/encabezados: 15
- Imágenes/alt/CLS: 15
- Indexabilidad (robots/sitemap/canonical): 15
- Performance-SEO: 15
- Contenido/keywords: 5

Restá puntos por cada 🔴 (−5), 🟡 (−2), 🔵 (−1). Mostrá el desglose en la tabla de la pasada.
