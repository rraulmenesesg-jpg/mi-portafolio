
const respuestasCorrectas = {
    q1: "paris",
    q2: "8",
    q3: "oxigeno",
    q4: "1969",
    q5: "amazonas"
};

let tiempoRestante = 60;
let intervalo;
let juegoTerminado = false;

const contadorElemento = document.getElementById("contador");
const resultadoElemento = document.getElementById("resultado");
const btnVerificar = document.getElementById("btn-verificar");
const btnReiniciar = document.getElementById("btn-reiniciar");

function iniciarTemporizador() {
    intervalo = setInterval(() => {
        tiempoRestante--;
        contadorElemento.textContent = tiempoRestante;

    if (tiempoRestante <= 0) {
        clearInterval(intervalo);
        finalizarJuego("¡Se acabó el tiempo!");
        }
    }, 1000);
}

function finalizarJuego(mensaje = "") {
    clearInterval(intervalo);
    juegoTerminado = true;
    btnVerificar.disabled = true;
    resultadoElemento.textContent = mensaje || calcularPuntaje();
}

function calcularPuntaje() {
    let puntos = 0;

    for (let i = 1; i <= 5; i++) {
        const input = document.getElementById("q" + i);
        const respuesta = input.value.trim().toLowerCase();
        if (respuesta === respuestasCorrectas["q" + i]) {
        puntos++;
        }
    }

    return `Tu puntaje: ${puntos} de 5`;
}

btnVerificar.addEventListener("click", () => {
    if (juegoTerminado) return;
    finalizarJuego();
});

btnReiniciar.addEventListener("click", () => {
    tiempoRestante = 60;
    juegoTerminado = false;
    contadorElemento.textContent = 60;
    resultadoElemento.textContent = "";
    btnVerificar.disabled = false;

    for (let i = 1; i <= 5; i++) {
    document.getElementById("q" + i).value = "";
    }

    clearInterval(intervalo);
    iniciarTemporizador();
});

iniciarTemporizador();