function calcular(){
    let dato1 = document.getElementById("r1");
    let dato2 = document.getElementById("r2");
    let dato3 = document.getElementById("r3");
    let dato4 = document.getElementById("r4");

    let datoedad = document.getElementById("edad");
    let edad =datoedad.value;

    let puedebeber = edad >= 18;
    dato1.textContent = puedebeber;

    let puedeentar = edad >= 18 && edad <=30;
    dato2.textContent = puedeentar;

    let entragratis = edad == 20 || edad == 25 || edad ==10;
    dato3.textContent = entragratis;
    
    let comegratis = edad =! 18 || edad ==19 && edad <= 21;
    dato4.textContent = comegratis;
}

function evaluar(){
    let datorespuesta = document.getElementById("decicion");
    let datoprecio = document.getElementById("textoprecio-coca-cola");
    let preciococa = datoprecio.value;

    if(preciococa <= 20){
        datorespuesta.textContent = "compra dos coca-cola de 600 Ml"
    }else{
        if(preciococa <= 30){
            datorespuesta.textContent = "compra una coca-cola de 1L"
        }else{
            datorespuesta.textContent = "no nos alcanza, no compres nada "
        }
    }
}

function consultarprecio(){
    let datorespuestafruta = document.getElementById("textopreciofruta");
    let datofruta =document.getElementById("numerofruta");
    let valorfruta = datofruta.value;
    switch(valorfruta){
        case "1" :
            datorespuestafruta.textContent= "mango kg = 33.0";
            break;
        case "2":
            datorespuestafruta.textContent=" kiwi kg = 79.99";
            break;
        case "3":
            datorespuestafruta.textContent= "durazno kg = 33.0";
            break;
        case "4":
            datorespuestafruta.textContent="fresa kg = 79.99";
            break;
        case "5":
            datorespuestafruta.textContent= "uva kg = 33.0";
            break;
        case "6":
            datorespuestafruta.textContent=" guanabana kg = 79.99";
            break;
        case "":
            datorespuestafruta.textContent="ingres un dato de la lista ";
            break;
        default:
            datorespuestafruta.textContent="por favor ingres un numero valido";
            break;
    }
}
