/**
 * Renderizado dinámico y depuración de habilidades desde assets/js/habilidades/habilidades.json
 * Complejidad: O(n) tiempo / O(n) espacio.
 */
const HABILIDADES_JSON_URL = 'assets/js/habilidades/habildades.json';
const CONTENEDOR_HABILIDADES = '#habilidades';

function depurarHabilidades(lista) {
    if (!Array.isArray(lista)) {
        console.error('[HabilidadesDebug] El JSON raíz debe ser un arreglo.');
        return [];
    }

    const idsVistos = new Set();

    return lista.filter((item, index) => {
        if (!item || typeof item !== 'object') {
            console.warn(`[HabilidadesDebug] Índice ${index} inválido.`);
            return false;
        }

        if (!item.id || idsVistos.has(item.id)) {
            console.warn(`[HabilidadesDebug] ID duplicado o faltante en índice ${index}:`, item.id);
        } else {
            idsVistos.add(item.id);
        }

        const requeridos = ['titulo', 'icono', 'colorClase', 'tecnologias'];
        const faltantes = requeridos.filter((campo) => !item[campo]);
        if (faltantes.length > 0) {
            console.error(`[HabilidadesDebug] Bloque "${item.id}" incompleto. Faltan: ${faltantes.join(', ')}`);
            return false;
        }

        if (!Array.isArray(item.tecnologias) || item.tecnologias.length === 0) {
            console.warn(`[HabilidadesDebug] "${item.id}" no tiene tecnologías listadas.`);
        }

        return true;
    });
}

function escaparHTML(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function crearTarjetaHabilidad(habilidad) {
    const listaTecnologias = Array.isArray(habilidad.tecnologias)
        ? habilidad.tecnologias.map(escaparHTML).join(', ')
        : escaparHTML(habilidad.tecnologias);

    return `
        <div class="col-md-4" data-skill-id="${escaparHTML(habilidad.id)}">
            <div class="card h-100 border-0 shadow p-3 modern-card">
                <div class="card-body text-center">
                    <div class="mb-3 ${escaparHTML(habilidad.colorClase)}">
                        <i class="bi ${escaparHTML(habilidad.icono)} fs-1"></i>
                    </div>
                    <h5 class="fw-bold">${escaparHTML(habilidad.titulo)}</h5>
                    <hr class="w-25 mx-auto">
                    <p class="text-muted small">${listaTecnologias}</p>
                </div>
            </div>
        </div>
    `;
}

async function inicializarHabilidades() {
    const contenedor = document.querySelector(CONTENEDOR_HABILIDADES);
    if (!contenedor) {
        console.error(`[HabilidadesDebug] No se encontró el contenedor "${CONTENEDOR_HABILIDADES}" en el DOM.`);
        return;
    }

    try {
        const respuesta = await fetch(HABILIDADES_JSON_URL);
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status} al cargar ${HABILIDADES_JSON_URL}`);
        }

        const datos = await respuesta.json();
        const validas = depurarHabilidades(datos);

        console.info(`[HabilidadesDebug] ${validas.length}/${datos.length} categorías renderizadas correctamente.`);
        contenedor.innerHTML = validas.map(crearTarjetaHabilidad).join('');
    } catch (error) {
        console.error('[HabilidadesDebug] Error crítico:', error);
        contenedor.innerHTML = `
            <div class="col-12 text-center text-danger">
                No se pudieron cargar las habilidades. Revisa la consola para detalles de depuración.
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', inicializarHabilidades);