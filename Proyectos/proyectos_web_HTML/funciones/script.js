    function sumar(n1,n2){
        resultado = +n1 + +n2;
        return resultado; 
    }
    function mostrarResultado(){
        let elemento1 = document.getElementById("num1");
        let elemento2 = document.getElementById("num2");
        let elementoresultado = document.getElementById("textoresultado");
        let elementosuma = sumar(elemento1.value,elemento2.value);
        elementoresultado.textContent = elementosuma;
    }

    function potenciar(g1,g2){
        return Math.pow(g1,g2)
    }

    function mostrarPotencia(){
        let base1 = document.getElementById("potencia");
        let base2 = document.getElementById("exponente");
        let elementobaspot = document.getElementById("textPotencia");
        let elementopotencia = potenciar(base1.value,base2.value);
        elementobaspot.textContent = elementopotencia;
    }
     function diametro(diametro){
        return Math.PI*diametro;
     }

     function mostrarcircun(){
        let di1 = document.getElementById("di");
        let elementocircun = document.getElementById("textcircun");
        let elementototal = diametro(di1.value);
        
        elementocircun.textContent = elementototal;
     }
     function elementoAlatorio(maximo){
        let velementoaleatorio = document.getElementById("textalatorio");
        maximo++1;
        velementoaleatorio.textContent= Math.floor(Math.random())*maximo;
     }