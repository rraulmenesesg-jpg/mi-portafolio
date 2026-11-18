/**
 * Renderizado dinámico y depuración de la sección de contacto desde contacto.json
 */
const CONTACTO_JSON_URL = 'assets/js/contacto/contacto.json' ||'../assets/js/contacto/contacto.json';

function depurarContacto(data) {
    if (!data || typeof data !== 'object') {
        console.error('[ContactoDebug] El JSON raíz debe ser un objeto.');
        return null;
    }
    if (!Array.isArray(data.contacto) || !Array.isArray(data.redes)) {
        console.error('[ContactoDebug] Faltan los arreglos "contacto" o "redes".');
        return null;
    }
    return data;
}

function escaparHTML(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

async function inicializarContacto() {
    const cardBody = document.querySelector('#contacto .card-body');
    if (!cardBody) {
        console.error('[ContactoDebug] No se encontró el contenedor de contacto en el DOM.');
        return;
    }

    try {
        const respuesta = await fetch(CONTACTO_JSON_URL);
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status} al cargar ${CONTACTO_JSON_URL}`);
        }

        const datosCrudos = await respuesta.json();
        const datos = depurarContacto(datosCrudos);
        if (!datos) return;

        const [itemCorreo, itemWp] = datos.contacto;

        cardBody.innerHTML = `
            <div class="row mb-4">
                <div class="col-md-6 text-center border-end">
                    <h5 class="fw-semibold text-muted mb-3">${escaparHTML(itemCorreo.titulo)}</h5>
                    <a href="${escaparHTML(itemCorreo.enlace)}" target="_blank" rel="noopener noreferrer" class="lead text-decoration-none text-primary">
                        ${escaparHTML(itemCorreo.valor)}
                    </a>
                    <div class="mt-3">
                        <a href="${escaparHTML(itemCorreo.enlace)}" target="_blank" rel="noopener noreferrer" class="${escaparHTML(itemCorreo.btnClase)}">
                            ${escaparHTML(itemCorreo.btnTexto)}
                        </a>
                    </div>
                </div>
                <div class="col-md-6 text-center">
                    <h5 class="fw-semibold text-muted mb-3">${escaparHTML(itemWp.titulo)}</h5>
                    <a href="${escaparHTML(itemWp.enlace)}" target="_blank" rel="noopener noreferrer" class="lead text-decoration-none text-success">
                        ${escaparHTML(itemWp.valor)}
                    </a>
                    <div class="mt-3">
                        <a href="${escaparHTML(itemWp.enlace)}" target="_blank" rel="noopener noreferrer" class="${escaparHTML(itemWp.btnClase)}">
                            ${itemWp.iconoSvg}
                            Enviar mensaje
                        </a>
                    </div>
                </div>
            </div> 
            <hr class="my-4">
            <div class="row">
                <div class="col-12 text-center">
                    <h5 class="fw-semibold text-muted mb-3">Perfiles Profesionales</h5>
                    ${datos.redes.map(red => `
                        <a href="${escaparHTML(red.url)}" target="_blank" rel="noopener noreferrer" class="${escaparHTML(red.clase)}">
                            <i class="bi ${escaparHTML(red.icono)}"></i> ${escaparHTML(red.nombre)}
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
        console.info('[ContactoDebug] Sección de contacto renderizada correctamente.');
    } catch (error) {
        console.error('[ContactoDebug] Error crítico:', error);
    }
}

document.addEventListener('DOMContentLoaded', inicializarContacto);