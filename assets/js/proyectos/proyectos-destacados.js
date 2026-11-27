/**
 * Renderiza proyectos sin reemplazar el contenedor estructural de la sección.
 */
const JSON_URL = new URL('./proyectos.json', import.meta.url);
const GRID_SELECTOR = '#proyectos .projects-grid';

const escapeHTML = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));

function safeURL(value, protocols = ['http:', 'https:']) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const parsed = new URL(value, window.location.href);
    return protocols.includes(parsed.protocol) || value.startsWith('#') ? value : null;
  } catch {
    return null;
  }
}

function validateProjects(items) {
  if (!Array.isArray(items)) throw new TypeError('El JSON de proyectos debe ser un arreglo.');
  const ids = new Set();

  return items.filter((item, index) => {
    if (!item || typeof item !== 'object' || typeof item.id !== 'string' || !item.id || ids.has(item.id)) {
      console.warn(`[ProyectosDebug] Elemento inválido o ID duplicado en índice ${index}.`);
      return false;
    }

    ids.add(item.id);
    if (item.tipo === 'placeholder') return typeof item.titulo === 'string';

    const valid =
      ['titulo', 'descripcion', 'imagen'].every((key) => typeof item[key] === 'string') &&
      item.badge &&
      typeof item.badge.texto === 'string' &&
      typeof item.badge.clase === 'string' &&
      item.demo &&
      typeof item.demo.url === 'string' &&
      item.repo &&
      typeof item.repo.texto === 'string' &&
      safeURL(item.demo.url) &&
      safeURL(item.imagen) &&
      (item.repo.disponible === false || safeURL(item.repo.url));

    if (!valid) console.warn(`[ProyectosDebug] Proyecto descartado por esquema o URL inválida: ${item.id}`);
    return Boolean(valid);
  });
}

function renderProject(item) {
  if (item.tipo === 'placeholder') {
    const href = safeURL(item.cta?.url || '#contacto') || '#contacto';
    return `<div class="col-md-6 col-lg-4"><article class="card h-100 shadow-lg text-center p-4 bg-light modern-card">
      <div class="card-body d-flex flex-column justify-content-center"><i class="bi bi-hourglass-split fs-1 text-muted mb-3" aria-hidden="true"></i>
      <h3 class="h5 card-title fw-bold">${escapeHTML(item.titulo)}</h3>
      <a href="${escapeHTML(href)}" class="btn btn-outline-dark mt-3">${escapeHTML(item.cta?.texto || 'Contáctame')}</a></div></article></div>`;
  }

  const repo =
    item.repo.disponible === false
      ? `<span class="btn btn-secondary btn-sm disabled" aria-disabled="true">${escapeHTML(item.repo.texto)}</span>`
      : `<a href="${escapeHTML(item.repo.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-dark btn-sm"><i class="bi bi-github" aria-hidden="true"></i> ${escapeHTML(item.repo.texto)}</a>`;

  return `<div class="col-md-6 col-lg-4" data-project-id="${escapeHTML(item.id)}"><article class="card h-100 shadow-lg border-0 overflow-hidden modern-card">
    <img src="${escapeHTML(item.imagen)}" class="card-img-top" alt="${escapeHTML(item.alt || item.titulo)}" loading="lazy" decoding="async">
    <div class="card-body d-flex flex-column"><span class="badge ${escapeHTML(item.badge.clase)} mb-2 align-self-start">${escapeHTML(item.badge.texto)}</span>
    <h3 class="h5 fw-bold mb-2">${escapeHTML(item.titulo)}</h3><p class="card-text text-muted small flex-grow-1">${escapeHTML(item.descripcion)}</p>
    <div class="d-flex flex-wrap justify-content-between gap-2 mt-3"><a href="${escapeHTML(item.demo.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="bi bi-play-circle-fill" aria-hidden="true"></i> ${escapeHTML(item.demo.texto || 'Ver demo')}</a>${repo}</div></div></article></div>`;
}

async function initProjects() {
  const grid = document.querySelector(GRID_SELECTOR);
  if (!grid) return console.error(`[ProyectosDebug] No existe ${GRID_SELECTOR}`);

  try {
    const response = await fetch(JSON_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const raw = await response.json();
    const valid = validateProjects(raw);
    grid.innerHTML = valid.map(renderProject).join('');
    console.info(`[ProyectosDebug] ${valid.length}/${raw.length} elementos renderizados.`);
  } catch (error) {
    console.error('[ProyectosDebug] No se pudieron cargar los proyectos:', error);
    grid.innerHTML = '<div class="col-12"><p class="alert alert-warning mb-0">No se pudieron cargar los proyectos.</p></div>';
  }
}

initProjects();