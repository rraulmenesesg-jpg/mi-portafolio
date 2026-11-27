const JSON_URL = new URL('./porque-web.json', import.meta.url);
const TARGET = '#trabajo .website-content';

const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));

const safeDescription = (v) =>
  esc(v)
    .replace(/&lt;strong&gt;/gi, '<strong>')
    .replace(/&lt;\/strong&gt;/gi, '</strong>');

function safeURL(v) {
  if (typeof v !== 'string' || !v.trim()) return null;
  try {
    const u = new URL(v, location.href);
    return ['http:', 'https:'].includes(u.protocol) ? v : null;
  } catch {
    return null;
  }
}

async function init() {
  const target = document.querySelector(TARGET);
  if (!target) return console.error('[PorqueWebDebug] Contenedor no encontrado:', TARGET);

  try {
    const response = await fetch(JSON_URL);
    if (!response.ok) throw new Error('HTTP ' + response.status);

    const d = await response.json();

    if (
      !d ||
      !d.encabezado ||
      !d.razones ||
      !d.beneficios ||
      !d.objetivos ||
      !d.cta ||
      !['razones', 'beneficios', 'objetivos'].every((k) => Array.isArray(d[k].items)) ||
      !safeURL(d.cta.url)
    ) {
      throw new TypeError('Estructura de porque-web.json inválida.');
    }

    const { encabezado: h, razones: r, beneficios: b, objetivos: o, cta: c } = d;

    const reasons = r.items
      .map(
        (x) =>
          `<div class="col-md-6 col-lg-4"><article class="card h-100 shadow-lg border-0 rounded-4 modern-card"><div class="card-body p-4 d-flex flex-column align-items-center"><div class="icon-circle mb-3"><img src="${esc(x.imagen)}" alt="${esc(x.alt || '')}" class="ico-imagen" loading="lazy" decoding="async"></div><h3 class="h5 fw-bold text-center mb-3">${esc(x.titulo)}</h3><p class="text-muted text-center mb-0">${safeDescription(x.descripcion)}</p></div></article></div>`
      )
      .join('');

    const benefits = b.items
      .map(
        (x) =>
          `<div class="col-md-6 col-lg-3"><article class="card h-100 shadow-lg border-0 rounded-4 modern-card text-center"><div class="card-body p-4"><i class="bi ${esc(x.icono)} display-5 text-info mb-3" aria-hidden="true"></i><h3 class="h5 fw-bold">${esc(x.titulo)}</h3><p class="text-muted small mb-0">${esc(x.descripcion)}</p></div></article></div>`
      )
      .join('');

    const goals = o.items
      .map(
        (x) =>
          `<div class="col-md-6 col-lg-3"><article class="card h-100 shadow-lg border-0 rounded-4 modern-card text-center py-4"><div class="card-body"><span class="badge bg-primary fs-5 mb-3">${esc(x.numero)}</span><h3 class="h5 fw-bold">${esc(x.titulo)}</h3><p class="text-muted small mb-0">${esc(x.descripcion)}</p></div></article></div>`
      )
      .join('');

    target.innerHTML =
      `<div class="text-center mb-5"><span class="badge bg-primary px-4 py-2 mb-3">${esc(h.badge)}</span><h2 class="display-5 fw-bold text-dark mb-3">${esc(h.titulo)} <span class="text-primary">${esc(h.tituloResaltado)}</span></h2></div><div class="mb-5"><h3 class="h4 fw-bold text-primary mb-4"><i class="bi ${esc(r.icono)} me-2" aria-hidden="true"></i>${esc(r.titulo)}</h3><div class="row g-4">${reasons}</div></div><div class="mb-5"><h3 class="h4 fw-bold text-primary mb-4"><i class="bi ${esc(b.icono)} me-2" aria-hidden="true"></i>${esc(b.titulo)}</h3><div class="row g-4">${benefits}</div></div><div class="mb-5"><h3 class="h4 fw-bold text-primary mb-4"><i class="bi ${esc(o.icono)} me-2" aria-hidden="true"></i>${esc(o.titulo)}</h3><div class="row g-4">${goals}</div></div><div class="text-center mt-5 pt-4"><a href="${esc(c.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg px-5 py-3 rounded-4 shadow-lg fs-5"><i class="bi ${esc(c.icono)} me-2" aria-hidden="true"></i>${esc(c.texto)}</a><p class="text-muted mt-3">${esc(c.subtexto)}</p></div>`;

    console.info('[PorqueWebDebug] Sección renderizada.');
  } catch (e) {
    console.error('[PorqueWebDebug] Error:', e);
    target.innerHTML = '<p class="alert alert-warning">No se pudo cargar esta sección.</p>';
  }
}

init();