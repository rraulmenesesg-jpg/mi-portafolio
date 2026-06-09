empleadoslist=[];

function Empleado(nombre,apellidop,apellidom,edad,puesto,estadocivil,fechanan){
    this.nombre==nombre,
    this.apellidop=apellidop,
    this.apellidom=apellidom,
    this.edad=edad,
    this.puesto=puesto,
    this.estadocivil=estadocivil,
    this.fechanan=fechanan;
}

function agregarempleado(){
    let nombre = document.getElementById("nombre").value;
    let apellidop = document.getElementById("apellidop").value;
    let apellidom = document.getElementById("apellidom").value;
    let edad = document.getElementById("edad").value;
    let puesto = document.getElementById("puesto").value;
    let estadoc = document.getElementById("estadoc").value;
    let fechanac= document.getElementById("fechanac").value;

    let empeado = new Empleado(nombre,apellidop,apellidom,edad,puesto,estadoc,fechanac);
    empleadoslist.push(empeado)
    alert("empleado cagado correctamente ");
    
    limpear();
}

function mostrarempleado(){
    let list='';
    for(empleado of empleadoslist){
        for(let atributo in empleado){
            list = list + atributo.toUpperCase() + ":" + empleado[atributo] + ",";
        };
        list = list +"\n";

    };
    alert(list);

}

function limpear(){
    document.getElementById("nombre").value="";
    document.getElementById("apellidop").value="";
    document.getElementById("apellidom").value="";
    document.getElementById("edad").value="";
    document.getElementById("puesto").value="";
    document.getElementById("estadoc").value="";
    document.getElementById("fechanac").value="";
}