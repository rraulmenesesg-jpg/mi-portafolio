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
        let textoetiqueta = "Tienda" + conteotienda;
        let parafotienda = crearparafo(textoetiqueta,min);

        elementocontenedor.appendChild(parafotienda);
    }
}

function extraernumero(elemento){
    let mielemento = document.getElementById(elemento);
    let mitexto = mielemento.value;
    let minumero = Number(mitexto);
    return minumero;
}

function calcular(){
    let ventas= [];
    ventas[0] = extraernumero("ventastienda");
    ventas[1] = extraernumero("ventastienda2");
    ventas[2] = extraernumero("ventastienda3");
    ventas[3] = extraernumero("ventastienda4");
    ventas[4] = extraernumero("ventastienda5");
    ventas[5] = extraernumero("ventastienda6");

    let totalventas = sumartotal(ventas);
    let ventamayor = calcularmayor(ventas);
    let ventamenor = clacularmenor(ventas);
    let mensajesalida = "TOTAL DE VENTAS: " + totalventas +
    " / Ventas Mayor: " + ventamayor+
    " / Ventas Menor: " + ventamenor;
    let elementosalida = document.getElementById("parafosalida");
    elementosalida.textContent = mensajesalida;
}

function sumartotal(array){
    let total = 0;
    for(let venta of array){
        total = total + venta;
    }
    return total;
}

function calcularmayor(array){
    let maximo = array[0];
    for(let venta of array){
        if(venta > maximo){
            maximo = venta;
        }
    }
    return maximo;
}

function clacularmenor(array){
    let menor = array[0];
    for(let venta of array){
        if(venta > menor){
            menor = venta;
        }
    }
    return menor;
}

