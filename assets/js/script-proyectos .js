
const proyectos = [
    { url: "proyectos_web_HTML/alfa/alfa.html",                  nombre: "Alfa de Cronbach",          herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/audio/audio.html",                nombre: "Audio Alarma",              herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/cal complet/calculadora_completa.html", nombre: "Calculadora Completa", herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/cartelera cine/index.html",       nombre: "Cartelera Cine",            herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/contructores/contructores.html",  nombre: "Constructores",             herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/for/index.html",                  nombre: "Los For",                   herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/funciones/index.html",            nombre: "Funciones",                 herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/motor/index.html",                nombre: "Prototipos ej. Motores",    herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/operadores/intex.html",           nombre: "Operadores",                herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/PARCTUCA/index.html",             nombre: "Desafío de Preguntas",      herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/procero 2/index.html",            nombre: "Carrito de Compras",        herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/REMEDIAL/index.html",             nombre: "Calculadora Física",        herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/remedial 2corte/",                nombre: "Ahorros Inteligentes",      herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/SISTEMA ABAROTES/index2for.html", nombre: "Sistema Abarrotes",         herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/SISTEMA ACADEMICO/sistema.html",  nombre: "Sistema Académico",         herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/SISTEMA AERONABES/",              nombre: "Sistema de Aerolíneas",     herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/tareas/inde.html",                nombre: "Retos",                     herramientas: ["HTML", "CSS", "JavaScript"] },
    { url: "proyectos_web_HTML/trivia/index.html",               nombre: "Trivia",                    herramientas: ["HTML", "CSS", "JavaScript"] },
];


document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector("#proyectos .row");
    if (!contenedor) {
        console.error("No se encontró el contenedor #proyectos .row");
        return;
    }
    
    
contenedor.innerHTML = "";
    
proyectos.forEach((proyecto) => {
    const badgeTexto = proyecto.herramientas.length > 0
    ? proyecto.herramientas.join(" | ")
    : "Por definir";

    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    col.innerHTML = `
    <div class="card h-100 shadow-lg border-dashed border-2 text-center p-4 bg-light bg-opacity-75">
        <div class="card-body d-flex flex-column justify-content-center">
        <i class="bi bi-hourglass-split fs-1 text-muted mb-3"></i>
        <span class="badge bg-primary mb-2">${badgeTexto}</span>
        <h5 class="card-title fw-bold">${proyecto.nombre}</h5>
        <p class="card-text text-muted small"></p>
        <a href="${proyecto.url}" class="btn btn-outline-dark mt-3">Ver demo</a>
        </div>
    </div>
    `;

    contenedor.appendChild(col);
});

console.log(`${proyectos.length} proyectos cargados correctamente.`);
});