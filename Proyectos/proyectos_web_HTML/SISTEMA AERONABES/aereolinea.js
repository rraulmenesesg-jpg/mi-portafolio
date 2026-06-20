function crearparafo(textolabel,valormin){
    let elementoparafo = document.createElement("p");
    let elementoetiqueta = document.createElement("label");

    elementoetiqueta.innerText = textolabel + ":";
    elementoetiqueta.setAttribute("for",textolabel);

    let elementoimput = document.createElement("input");

    elementoimput.setAttribute("type","number");
    elementoimput.setAttribute("id", textolabel);
    elementoimput.setAttribute("min",valormin);
    elementoimput.setAttribute("value", 0);

    elementoparafo.appendChild(elementoetiqueta);
    elementoparafo.appendChild(elementoimput);

    return elementoparafo;
}

function creartiendas(contenedotid,min,cantidadtienda){
    let elementocontenedor = document.getElementById(contenedotid);

    for(let conteotienda = 1; conteotienda <= cantidadtienda; conteotienda++){
        let textoetiqueta = "AVION " + conteotienda;
        let parafotienda = crearparafo(textoetiqueta,min);

        elementocontenedor.appendChild(parafotienda);
    }
}

function extraernumero(idElemento) {
    let elemento = document.getElementById(idElemento);
    return elemento ? Number(elemento.value) : 0;
}

function calcular(){
    let ventas= [];
    ventas[0] = extraernumero("AVION1");
    ventas[1] = extraernumero("AVION2");
    ventas[2] = extraernumero("AVION3");
    ventas[3] = extraernumero("AVION4");

    let diagnostico = condicion(ventas); 
    
    let mensajesalida = "Estado de flota: " + diagnostico;
    let elementosalida = document.getElementById("parafosalida");
    elementosalida.textContent = mensajesalida;
}

function condicion(ventasArray) {
    let resultados = [];

    ventasArray.forEach((valor, index) => {
        let estado = "";
        let nombreAvion = "AVION " + (index + 1);

        if (valor < 20) {
            estado = "no puede despegar (crítico)";
        } else if (valor < 50) {
            estado = "cargando...";
        } else if (valor >= 100 && valor <= 150) {
            estado = "ya salió de la base";
        } else if (valor > 150) {
            estado = "tiene problemas (sobrecarga)";
        } else {
            estado = "en espera (rango 50-99)";
        }

        resultados.push(nombreAvion + ": " + estado);
    });

    return resultados.join(" | ");
}

