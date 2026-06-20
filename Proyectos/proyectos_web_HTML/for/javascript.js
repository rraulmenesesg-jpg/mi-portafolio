function multiplicar(){
    let elementotextoTabla = document.getElementById("textoTabla");
    let textoNumeroTabla = elementotextoTabla.value;
    let numeroTabla = Number(textoNumeroTabla);

    let elementoTablaMultiplicar = document.getElementById("listaTabla");
    let elementoTablaMultiplicar2 = document.getElementById("listaTabla2");
     
    for(x=1; x<=10; x++){
        let numeroResultado = numeroTabla * x;
        let textoResultado = numeroTabla + " X "+x+" = " + numeroResultado;

        let itemLista = document.createElement("li")
        itemLista.innerText = textoResultado;
        elementoTablaMultiplicar.appendChild(itemLista);
    }

    for(x=10; x>=1; x--){
        let numeroResultado = numeroTabla * x;
        let textoResultado = numeroTabla + " X "+x+" = " + numeroResultado;

        let itemLista = document.createElement("li")
        itemLista.innerText = textoResultado;
        elementoTablaMultiplicar2.appendChild(itemLista);
    }
}