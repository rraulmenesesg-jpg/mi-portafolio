function mostrarResultado(resultado){
    document.getElementById("resultado").value=resultado;
}

function Sumar(){
    let n1 = +document.getElementById("dato1").value;
    let n2 = +document.getElementById("dato2").value;
    mostrarResultado(n1+n2)
}

function Restar(){
    let n1 = +document.getElementById("dato1").value;
    let n2 = +document.getElementById("dato2").value;
    mostrarResultado(n1-n2)
}

function Multiplicar(){
    let n1 = +document.getElementById("dato1").value;
    let n2 = +document.getElementById("dato2").value;
    mostrarResultado(n1*n2)
}

function Dividir(){
    let n1 = +document.getElementById("dato1").value;
    let n2 = +document.getElementById("dato2").value;
    mostrarResultado(n1/n2)
}

function Potencia(){
    let n1 = +document.getElementById("dato1").value;
    let n2 = +document.getElementById("dato2").value;
    return mostrarResultado(Math.pow(n1,n2));
}

function Raiz(){
    let n1 = +document.getElementById("dato1").value;
    return mostrarResultado(Math.sqrt(n1));
}

function Apsolupto(){
    let n1 = +document.getElementById("dato1").value;
    let n2 = +document.getElementById("dato2").value;
    return mostrarResultado(Math.abs(n1-n2));
}

function Random(){
    return mostrarResultado(Math.random()*20);
}

function round(){
    let n1 = +document.getElementById("resultado").value;
    return mostrarResultado(Math.round(n1))
}

function floor(){
    let n1 = +document.getElementById("resultado").value;
    return mostrarResultado(Math.floor(n1))
}

function ceil(){
    let n1 = +document.getElementById("resultado").value;
    return mostrarResultado(Math.ceil(n1))
}