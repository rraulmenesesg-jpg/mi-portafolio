const pantalla = document.getElementById("pantalla");
const historial = document.getElementById("historial");
const botones = document.querySelectorAll(".teclado button");

let expresion = "";
let ultimoResultado = "";


function evaluarExpresion(expresion) {
  const normalizada = expresion.replace(/mod/g, "%");
  const permitido = /^[0-9+\-*/().%√\s^×÷]*$/;
  if (!permitido.test(normalizada)) {
    throw new Error("Expresión no válida");
  }

  const expr = normalizada
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/√\(/g, "Math.sqrt(") 
    .replace(/√/g, "Math.sqrt(")  
    .replace(/\^/g, "**"); 
  if (/[+\-*/%.^]$/.test(expr.trim())) {
    throw new Error("Expresión incompleta");
  }

  const fn = new Function('"use strict"; return (' + expr + ')');
  return fn();
}

botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const valor = boton.textContent;
    if (valor === "C") {
      expresion = "";
      pantalla.value = "0";
      historial.textContent = "0";
      return;
    }
    if (valor === "%") {
      try {
        const numero = parseFloat(pantalla.value);
        const porcentaje = numero / 100;
        pantalla.value = porcentaje;
        expresion = porcentaje.toString();
      } catch {
        pantalla.value = "Error";
      }
      return;
    }
    if (valor === "=") {
      try {
        ultimoResultado = evaluarExpresion(expresion);
        pantalla.value = ultimoResultado;
        historial.textContent = expresion;
        expresion = ultimoResultado.toString();
      } catch {
        pantalla.value = "Error";
      }
      return;
    }
    if (valor === "n") {
      if (pantalla.value.startsWith("-")) {
        pantalla.value = pantalla.value.slice(1);
        expresion = expresion.slice(1);
      } else {
        pantalla.value = "-" + pantalla.value;
        expresion = "-" + expresion;
      }
      return;
    }
    if (pantalla.value === "0" && !isNaN(valor)) {
      pantalla.value = valor;
      expresion = valor;
    } else {
      if (valor === "√") {
        pantalla.value += "√(";
        expresion += "√(";
      } else {
        pantalla.value += valor;
        expresion += valor;
      }
    }
  });
});
