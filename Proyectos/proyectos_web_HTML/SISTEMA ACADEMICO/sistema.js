const calificaciones =[ 6,1,6,10,8,10,10,10];

function mostarlista(){
    const contenedor=document.getElementById("resultado");
    let listahtml = "<ul>";
    for(let calif of calificaciones){
        listahtml += `<li>calificacion: ${calif}</li>`
    }
    listahtml += "</ul>";
    contenedor.innerHTML= listahtml;
}

function calclularpromedio() {
    const contenedor = document.getElementById("resultado");
    let listahtml = "<ul>";
    let acc = 0;
    let promedio = 0;
    for (let calif of calificaciones) {
        acc = acc + calif;
    }
    promedio = acc / calificaciones.length;
    let promedioRedondeado = Math.round(promedio);;
    listahtml += `<li>promedio: ${promedioRedondeado}</li>`;
    listahtml += "</ul>";
    contenedor.innerHTML = listahtml;
}

function calificacionbaja() {
    const contenedor = document.getElementById("resultado");
    let listahtml = "<ul>";
    let baja = calificaciones[0];
    for (let calif of calificaciones) {
        if (calif < baja) {
            baja = calif;
        }
    }
    for (let calif of calificaciones) {
        if (calif < 7) {
            listahtml += `<li>Menor a siete: ${calif}</li>`;
        }
    }

    listahtml += "</ul>";
    contenedor.innerHTML = listahtml;
}

function calificacionalta() {
    const contenedor = document.getElementById("resultado");
    let listahtml = "<ul>";
    let alta = calificaciones[0];
    let contador = 0;
    for (let calif of calificaciones) {
        if (calif > alta) {
            alta = calif;
        }
    }
    for (let calif of calificaciones) {
        if (calif == alta) {
            listahtml += `<li>calificacion mas alta es: ${alta}</li>`;
            listahtml += "</ul>";
            contenedor.innerHTML = listahtml;
        }
    }

}