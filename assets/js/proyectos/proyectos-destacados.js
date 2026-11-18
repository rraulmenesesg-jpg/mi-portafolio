/**
 * Renderizado dinámico y depuración de proyectos desde proyectos.json
 * Complejidad: O(n) tiempo / O(n) espacio sobre la lista de proyectos.
 */
const PROYECTOS_JSON_URL = 'assets/js/proyectos/proyectos.json';
const CONTENEDOR_SELECTOR = '#proyectos';

// Depuración estructurada de esquema y detección de rutas/typos heredados
function depurarProyectos(proyectos) {
    if (!Array.isArray(proyectos)) {
        console.error('[ProyectosDebug] El JSON raíz debe ser un arreglo.');
        return [];
    }

    const idsVistos = new Set();

    return proyectos.filter((item, index) => {
        if (!item || typeof item !== 'object') {
            console.warn(`[ProyectosDebug] Índice ${index} inválido.`);
            return false;
        }

        if (!item.id || idsVistos.has(item.id)) {
            console.warn(`[ProyectosDebug] ID duplicado o faltante en índice ${index}:`, item.id);
        } else {
            idsVistos.add(item.id);
        }

        if (item.tipo === 'placeholder') return true;

        // Validación de campos obligatorios
        const requeridos = ['titulo', 'descripcion', 'imagen', 'badge', 'demo', 'repo'];
        const faltantes = requeridos.filter((campo) => !item[campo]);
        if (faltantes.length > 0) {
            console.error(`[ProyectosDebug] Proyecto "${item.id}" incompleto. Faltan: ${faltantes.join(', ')}`);
            return false;
        }

        // Advertencias de rutas locales con typos o espacios detectados en el HTML original
        if (item.demo.url.startsWith('hatml/')) {
            console.warn(`[ProyectosDebug] Posible typo en ruta local (${item.id}): "${item.demo.url}" (¿quisiste decir "html/"?)`);
        }
        if (/\s/.test(item.imagen)) {
            console.warn(`[ProyectosDebug] Ruta de imagen con espacios (${item.id}): "${item.imagen}"`);
        }

        return true;
    });
}

// Sanitización básica contra inyección HTML al interpolar strings
function escaparHTML(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function crearTarjetaProyecto(proyecto) {
    if (proyecto.tipo === 'placeholder') {
        return `
            <div class="col-md-6 col-lg-4">
                <div class="card h-100 shadow-lg border-dashed border-2 text-center p-4 bg-light bg-opacity-75 modern-card">
                    <div class="card-body d-flex flex-column justify-content-center">
                        <i class="bi bi-hourglass-split fs-1 text-muted mb-3"></i>
                        <h5 class="card-title fw-bold">${escaparHTML(proyecto.titulo)}</h5>
                        <a href="${escaparHTML(proyecto.cta?.url || '#contacto')}" class="btn btn-outline-dark mt-3">
                            ${escaparHTML(proyecto.cta?.texto || 'Contáctame')}
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    const repoAtributos = proyecto.repo.disponible === false
        ? 'class="btn btn-secondary btn-sm disabled" aria-disabled="true" tabindex="-1"'
        : `href="${escaparHTML(proyecto.repo.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-dark btn-sm"`;

    return `
        <div class="col-md-6 col-lg-4" data-project-id="${escaparHTML(proyecto.id)}">
            <div class="card h-100 shadow-lg border-0 overflow-hidden modern-card">
                <img src="${escaparHTML(proyecto.imagen)}" class="card-img-top" alt="${escaparHTML(proyecto.alt || proyecto.titulo)}"
                     onerror="console.error('[ProyectosDebug] Falló carga de imagen:', this.src)">
                <div class="card-body d-flex flex-column">
                    <span class="badge ${escaparHTML(proyecto.badge.clase)} mb-2 align-self-start">
                        ${escaparHTML(proyecto.badge.texto)}
                    </span>
                    <h5 class="fw-bold mb-2">${escaparHTML(proyecto.titulo)}</h5>
                    <p class="card-text text-muted small flex-grow-1">
                        ${escaparHTML(proyecto.descripcion)}
                    </p>
                    <div class="d-flex justify-content-between mt-3">
                        <a href="${escaparHTML(proyecto.demo.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">
                            <i class="bi bi-play-circle-fill"></i> ${escaparHTML(proyecto.demo.texto)}
                        </a>
                        <a ${repoAtributos}>
                            <i class="bi bi-github"></i> ${escaparHTML(proyecto.repo.texto)}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

async function inicializarProyectos() {
    const contenedor = document.querySelector(CONTENEDOR_SELECTOR);
    if (!contenedor) {
        console.error(`[ProyectosDebug] No se encontró el contenedor "${CONTENEDOR_SELECTOR}" en el DOM.`);
        return;
    }

    try {
        const respuesta = await fetch(PROYECTOS_JSON_URL);
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status} al cargar ${PROYECTOS_JSON_URL}`);
        }

        const datos = await respuesta.json();
        const proyectosValidos = depurarProyectos(datos);

        console.info(`[ProyectosDebug] ${proyectosValidos.length}/${datos.length} elementos renderizados correctamente.`);
        contenedor.innerHTML = proyectosValidos.map(crearTarjetaProyecto).join('');
    } catch (error) {
        console.error('[ProyectosDebug] Error crítico:', error);
        contenedor.innerHTML = `
            <div class="col-12 text-center text-danger">
                No se pudieron cargar los proyectos. Revisa la consola para detalles de depuración.
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', inicializarProyectos);