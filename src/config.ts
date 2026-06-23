/**
 * CONFIGURACIÓN CENTRAL DEL SITIO
 * Todos los datos de contacto y métricas del cliente viven acá.
 * Los valores [REEMPLAZAR: ...] están listados en PENDIENTES.md.
 */

export const SITE = {
  name: 'JOM Construction',
  tagline: 'Construcción de obra nueva, desarrollos y refacciones',
  description:
    'Empresa constructora en Argentina. Obra nueva, desarrollos residenciales, refacciones y obra para empresas. Pedí tu presupuesto sin cargo.',
  // [REEMPLAZAR: dominio real] — también en astro.config.mjs
  url: 'https://jomconstruction.com.ar',
  locale: 'es_AR',
} as const;

export const CONTACT = {
  /**
   * Número de WhatsApp en formato internacional SIN "+" ni espacios.
   * Ej.: 5491122334455
   */
  whatsappNumber: '5491136364817',
  whatsappDisplay: '11 3636-4817',
  email: 'info@jomconstruction.com.ar',
  phoneDisplay: '[REEMPLAZAR: teléfono fijo (opcional)]',
  address: 'Buenos Aires y todo el país',
  instagram: '[REEMPLAZAR: URL de Instagram (opcional)]',
  linkedin: '[REEMPLAZAR: URL de LinkedIn (opcional)]',
  /** Endpoint del formulario (Formspree/Web3Forms). Ver PENDIENTES.md. */
  formEndpoint: '[REEMPLAZAR: endpoint de Formspree, ej. https://formspree.io/f/XXXXXXXX]',
} as const;

/**
 * Enlace de WhatsApp con mensaje prearmado.
 * Mensajes distintos por sección → permiten atribuir el origen del lead.
 */
export const waLink = (text: string): string =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(text)}`;

export const WHATSAPP_URL = waLink(
  'Hola JOM Construction, quiero pedir un presupuesto para mi proyecto.'
);

/**
 * Cifras PROVISORIAS y ficticias (verosímiles) — las ajusta el cliente.
 * `value` ya viene formateado con separador de miles es-AR y se muestra tal cual.
 */
export const METRICS = [
  { value: '18', suffix: '+', label: 'años construyendo' },
  { value: '145', suffix: '+', label: 'obras entregadas' },
  { value: '185.000', suffix: '', label: 'm² construidos' },
  { value: '210', suffix: '+', label: 'clientes que confiaron' },
] as const;

// El orden sigue el de las secciones en la página (index.astro) para que el
// scrollspy resalte de izquierda a derecha a medida que se baja: Servicios →
// Obras → Cómo trabajamos (Proceso) → Nosotros → Contacto.
export const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#obras', label: 'Obras' },
  { href: '#proceso', label: 'Cómo trabajamos' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' },
] as const;
