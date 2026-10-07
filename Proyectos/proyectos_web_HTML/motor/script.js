function Automovil(marca,modelo,color,anio,titular){
    this.marca=marca;
    this.modelo=modelo;
    this.color=color;
    this.anio=anio;
    this.titular=titular;
}

let automovil01 = new Automovil("Honda","Civic","Azul",1999,"Sebas Daza");
let automovil02 = new Automovil("Nissan","Tsuru","Gris",2025,"Raul Meneses");
let automovil03 = new Automovil("BMW","Minicupper","Negro",2003,"Noe Padilla");
let automovil04 = new Automovil("Kia","Toreto","Rojo",2025,"Julieta soto");
let automovil05 = new Automovil("ferrari","Victen","Morado",2020,"Erick Arcos");

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
    lista.innerHTML="";
    for(let automovil of automiviles){
        let item = document.createElement("li");
        item.innerText = automovil.VerAutomovil();
        lista.appendChild(item);
    }

}

function venderAuto() {
    let secventa = document.getElementById("vender");
    const campos = [
        { id: "v_marca", label: "Marca del vehículo:" },
        { id: "v_modelo", label: "Modelo:" },
        { id: "v_anio", label: "Año:" },
        { id: "oldtitular", label: "Nombre del actual tutular:" },
        { id: "newtitular", label: "Nombre del nuevo tutular:" }
    ];
    for (let i = 0; i < campos.length; i++) {        
        let salto = document.createElement("br");
        let etiqueta = document.createElement("label");
        etiqueta.innerText = campos[i].label;
        let input = document.createElement("input");
        input.setAttribute("id", campos[i].id);

        secventa.appendChild(etiqueta);
        secventa.appendChild(input);  
        secventa.appendChild(salto);      
    }

    let botonConfirmar = document.createElement("button");
    botonConfirmar.innerText = "Ejecutar Venta";
    botonConfirmar.onclick = ejecutarVenta;
    secventa.appendChild(botonConfirmar);
}

function ejecutarVenta() {
    let titularFiltro = document.getElementById("oldtitular").value;
    let marcaFiltro = document.getElementById("v_marca").value;
    let modeloFiltro = document.getElementById("v_modelo").value;
    let anioFiltro = Number(document.getElementById("v_anio").value);
    let nuevoDueño = document.getElementById("newtitular").value;

    let autoEncontrado = null;
    for (let i = 0; i < automiviles.length; i++) {
        let auto = automiviles[i];
        if (auto.titular == titularFiltro && 
            auto.marca == marcaFiltro && 
            auto.modelo == modeloFiltro && 
            auto.anio == anioFiltro) {
            autoEncontrado = auto;
            break; 
        }
    }

    if (autoEncontrado !== null) {
        autoEncontrado.VenderAutomovil(nuevoDueño);
        alert("El " + autoEncontrado.marca + " ahora pertenece a " + nuevoDueño);
        let lista = document.getElementById("listaAutomoviles");
        lista.innerHTML = ""; 
        for(let automovil of automiviles){
            let item = document.createElement("li");
            item.innerText = automovil.VerAutomovil();
            lista.appendChild(item);
        }
    } else {
        alert("Los datos del vehículo o del titular son incorrectos o no existen");
    }
}