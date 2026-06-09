function Automovil(marca,modelo,color,anio,titular){
    this.marca=marca;
    this.modelo=modelo;
    this.color=color;
    this.anio=anio;
    this.titular=titular;
}

let automovil01 = new Automovil("Honda","Civic","Azul",1999,"Sebas Daza");
let automovil02 = new Automovil("Nissan","Tsuru","Gris",2025,"Raul Meneses");
let automovil03 = new Automovil("BMW","Minicupper","Negro",2003,"Noe Pineda");
let automovil04 = new Automovil("Kia","Toreto","Rojo",2025,"Julieta betzabe");
let automovil05 = new Automovil("ferrari","Victen","Morado",2020,"Erick leonar");

let automiviles = [automovil01,automovil02,automovil03,automovil04,automovil05];

Automovil.prototype.VenderAutomovil = function(newtitular){
    this.titular = newtitular;
}

Automovil.prototype.Encender = function(){
    alert(this.marca + "esta encendido");
}

Automovil.prototype.VerAutomovil = function(){
    return`${this.marca} - ${this.modelo} - ${this.anio} - ${this.titular}`   
}

function MostrarAuto(){
    let lista = document.getElementById("listaAutomoviles");
    for(let automovil of automiviles){
        let item = document.createElement("li");
        item.innerText = automovil.VerAutomovil();
        lista.appendChild(item);
    }
}

function venderAuto() {
    let secventa = document.getElementById("vender");
    let saltodelinea = document.createElement("br");

    let etiquetaold = document.createElement("label");
    etiquetaold.innerText = "Nombre del viejo titular: ";

    let inputTitularold = document.createElement("input");
    inputTitularold.setAttribute("type", "text");
    inputTitularold.setAttribute("id", "oldtitular");

    let etiquetanew = document.createElement("label");
    etiquetanew.innerText = "Nombre del nuevo titular: ";

    let inputTitularnew = document.createElement("input");
    inputTitularnew.setAttribute("type", "text");
    inputTitularnew.setAttribute("id", "newtitular");

    let botonConfirmar = document.createElement("button");
    botonConfirmar.innerText = "Confirmar Venta";
    
    secventa.appendChild(etiquetaold);
    secventa.appendChild(inputTitularold);
    secventa.appendChild(saltodelinea);
    secventa.appendChild(saltodelinea)
    secventa.appendChild(etiquetanew);
    secventa.appendChild(inputTitularnew);

    secventa.appendChild(botonConfirmar);

    botonConfirmar.onclick = ejecutarVenta();

}

function ejecutarVenta() {
    let old = document.getElementById("oldtitular");
    let tnew = document.getElementById("newtitular");

    for(let titular of automiviles){
        if(titular == old){
            tnew.innerText = automovil.VenderAutomovil();
        };
    }
}