function calcularMasa() {
    const peso = parseFloat(document.getElementById('peso').value);
    const g = 9.81;        
    const masa = peso / g;
    document.getElementById('resultadoMasa').innerText = "Masa = " + masa.toFixed(2) + " kg";
}

function calcularVelocidad() {
    const distancia = parseFloat(document.getElementById('distancia').value);
    const tiempo = parseFloat(document.getElementById('tiempo').value);
    const velocidad = distancia / tiempo;
    document.getElementById('resultadoVelocidad').innerText = "Velocidad = " + velocidad.toFixed(2) + " m/s";
}
function calcularArea() {
    const lado = parseFloat(document.getElementById('lado').value);
    const area = lado * lado;
    document.getElementById('resultadoArea').innerText = "Área = " + area.toFixed(2) + " m²";
}