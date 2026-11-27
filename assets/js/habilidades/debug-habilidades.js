const JSON_URL = new URL('./habilidades.json', import.meta.url);
const GRID = '#habilidades .skills-grid';

const esc = (v) =>
  String(v ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));

async function init() {
  const grid = document.querySelector(GRID);
  if (!grid) return console.error('[HabilidadesDebug] Grid no encontrado:', GRID);

  try {
    const response = await fetch(JSON_URL);
    if (!response.ok) throw new Error('HTTP ' + response.status);

    const data = await response.json();
    if (!Array.isArray(data)) throw new TypeError('El JSON debe ser un arreglo.');

    const ids = new Set();
    const valid = data.filter((x, i) => {
      const ok =
        x &&
        typeof x.id === 'string' &&
        !ids.has(x.id) &&
        typeof x.titulo === 'string' &&
        typeof x.icono === 'string' &&
        typeof x.colorClase === 'string' &&
        Array.isArray(x.tecnologias) &&
        x.tecnologias.every((t) => typeof t === 'string');

      if (ok) ids.add(x.id);
      else console.warn('[HabilidadesDebug] Registro inválido:', i);

      return ok;
    });

    grid.innerHTML = valid
      .map(
        (x) =>
          `<div class="col-md-6 col-lg-4" data-skill-id="${esc(x.id)}"><article class="card h-100 border-0 shadow p-3 modern-card"><div class="card-body text-center"><div class="mb-3 ${esc(x.colorClase)}"><i class="bi ${esc(x.icono)} fs-1" aria-hidden="true"></i></div><h3 class="h5 fw-bold">${esc(x.titulo)}</h3><hr class="w-25 mx-auto"><p class="text-muted small mb-0">${x.tecnologias.map(esc).join(', ')}</p></div></article></div>`
      )
      .join('');

    console.info(`[HabilidadesDebug] ${valid.length}/${data.length} categorías renderizadas.`);
  } catch (e) {
    console.error('[HabilidadesDebug] Error:', e);
    grid.innerHTML =
      '<div class="col-12"><p class="alert alert-warning">No se pudieron cargar las habilidades.</p></div>';
  }
}
init();