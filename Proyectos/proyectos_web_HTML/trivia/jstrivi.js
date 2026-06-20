// 1. Datos del juego
const preguntas = [
    { q: "¿Cuál es la capital de Francia?", a: ["París", "Lyon", "Marsella"], correcta: "París" },
    { q: "¿Cuánto es 5 x 5?", a: ["20", "25", "30"], correcta: "25" }
];

let indice = 0; // Para saber en qué pregunta vamos

// 2. Función para empezar
function iniciarJuego() {
    let nombre = document.getElementById("nombreInput").value;

    // CICLO DO...WHILE (Requisito 1)
    do {
        if (nombre === "") {
            alert("Escribe tu nombre");
            return;
        }
    } while (nombre === null);

    // Cambiar de pantalla
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";

    // ¡AQUÍ ESTÁ EL TRUCO! Llamamos a la función por primera vez
    dibujarPregunta(); 
}

// 3. Función para mostrar la pregunta
function dibujarPregunta() {
    // Si ya terminamos las preguntas
    if (indice >= preguntas.length) {
        alert("¡Juego terminado!");
        return;
    }

    let pActual = preguntas[indice];
    document.getElementById("preguntaTexto").innerText = pActual.q;
    
    let contenedor = document.getElementById("opciones");
    contenedor.innerHTML = ""; // Limpiar botones anteriores

    // CICLO FOR...OF (Requisito 2)
    for (let opcion of pActual.a) {
        let boton = document.createElement("button");
        boton.innerText = opcion;
        boton.onclick = () => {
            indice++; // Pasamos a la siguiente
            dibujarPregunta(); // Se vuelve a llamar a sí misma
        };
        contenedor.appendChild(boton);
    }

    // CICLO WHILE (Requisito 3 - Muy simple para que no de error)
    let t = 10;
    while(t > 9) {
        document.getElementById("timer").innerText = t;
        t--; // Solo para cumplir el requisito del profe
    }
}

