const PORQUE_WEB_JSON_URL = '../assets/js/porque-web/porque-web.json';
const CONTENEDOR_PORQUE_WEB = '#porqueunaweb';

function depurarSeccionWeb(data) {
    if (!data || typeof data !== 'object') {
        console.error('[PorqueWebDebug] El JSON raíz debe ser un objeto.');
        return null;
    }
    const bloques = ['encabezado', 'razones', 'beneficios', 'objetivos', 'cta'];
    const faltantes = bloques.filter(b => !data[b]);
    if (faltantes.length > 0) {
        console.error(`[PorqueWebDebug] Faltan bloques obligatorios: ${faltantes.join(', ')}`);
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

async function inicializarPorqueUnaWeb() {
    const contenedor = document.querySelector(CONTENEDOR_PORQUE_WEB);
    if (!contenedor) {
        console.error(`[PorqueWebDebug] No se encontró "${CONTENEDOR_PORQUE_WEB}" en el DOM.`);
        return;
    }

    try {
        const respuesta = await fetch(PORQUE_WEB_JSON_URL);
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status} al cargar ${PORQUE_WEB_JSON_URL}`);
        }

        const datos = depurarSeccionWeb(await respuesta.json());
        if (!datos) return;

        const { encabezado, razones, beneficios, objetivos, cta } = datos;

        contenedor.innerHTML = `
            <!-- Título principal -->
            <div class="text-center mb-5" data-aos="fade-down">
                <span class="badge bg-primary px-4 py-2 mb-3">${escaparHTML(encabezado.badge)}</span>
                <h2 class="display-5 fw-bold text-dark mb-3">
                    ${escaparHTML(encabezado.titulo)} <span class="text-primary">${escaparHTML(encabezado.tituloResaltado)}</span>
                </h2>
            </div>

            <!-- RAZONES -->
            <div class="mb-5">
                <h4 class="fw-bold text-primary mb-4 d-flex align-items-center" data-aos="fade-up">
                    <i class="bi ${escaparHTML(razones.icono)} me-3"></i> ${escaparHTML(razones.titulo)}
                </h4>
                <div class="row g-4">
                    ${razones.items.map(item => `
                        <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
                            <div class="card h-100 shadow-lg border-0 rounded-4 modern-card">
                                <div class="card-body p-5 d-flex flex-column align-items-center">
                                    <div class="icon-circle mb-3">
                                        <img src="${escaparHTML(item.imagen)}" alt="${escaparHTML(item.alt)}" class="ico-imagen"
                                             onerror="console.error('[PorqueWebDebug] Error cargando imagen:', this.src)">
                                    </div>
                                    <h5 class="fw-bold text-center mb-3">${escaparHTML(item.titulo)}</h5>
                                    <p class="text-muted text-center mb-0">${item.descripcion}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- BENEFICIOS -->
            <div class="mb-5">
                <h4 class="fw-bold text-primary mb-4 d-flex align-items-center" data-aos="fade-up">
                    <i class="bi ${escaparHTML(beneficios.icono)} me-3"></i> ${escaparHTML(beneficios.titulo)}
                </h4>
                <div class="row g-4">
                    ${beneficios.items.map(item => `
                        <div class="col-md-6 col-lg-3" data-aos="fade-up" data-aos-delay="${escaparHTML(item.delay)}">
                            <div class="card h-100 shadow-lg border-0 rounded-4 modern-card text-center">
                                <div class="card-body p-4">
                                    <i class="bi ${escaparHTML(item.icono)} display-5 text-info mb-3"></i>
                                    <h5 class="fw-bold">${escaparHTML(item.titulo)}</h5>
                                    <p class="text-muted small">${escaparHTML(item.descripcion)}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- OBJETIVOS -->
            <div class="mb-5">
                <h4 class="fw-bold text-primary mb-4 d-flex align-items-center" data-aos="fade-up">
                    <i class="bi ${escaparHTML(objetivos.icono)} me-3"></i> ${escaparHTML(objetivos.titulo)}
                </h4>
                <div class="row g-4">
                    ${objetivos.items.map(item => `
                        <div class="col-md-3 col-sm-6" data-aos="zoom-in" data-aos-delay="${escaparHTML(item.delay)}">
                            <div class="card h-100 shadow-lg border-0 rounded-4 modern-card text-center py-4">
                                <span class="badge bg-primary fs-5 mb-3">${escaparHTML(item.numero)}</span>
                                <h5 class="fw-bold">${escaparHTML(item.titulo)}</h5>
                                <p class="text-muted small">${escaparHTML(item.descripcion)}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- CTA Final -->
            <div class="text-center mt-5 pt-4" data-aos="fade-up" data-aos-delay="500">
                <a href="${escaparHTML(cta.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg px-5 py-3 rounded-4 shadow-lg fs-5">
                    <i class="bi ${escaparHTML(cta.icono)} me-2"></i> ${escaparHTML(cta.texto)}
                </a>
                <p class="text-muted mt-3">${escaparHTML(cta.subtexto)}</p>
            </div>
        `;

        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        console.info('[PorqueWebDebug] Sección #porqueunaweb renderizada correctamente.');
    } catch (error) {
        console.error('[PorqueWebDebug] Error crítico:', error);
    }
}

document.addEventListener('DOMContentLoaded', inicializarPorqueUnaWeb);