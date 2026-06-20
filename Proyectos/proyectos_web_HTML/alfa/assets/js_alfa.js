// === FUNCIONES AUXILIARES ===
function crearTabla(noItems, noPersonas) {
  const tabla = document.getElementById("tabla-encuesta");
  tabla.innerHTML = "";

  // Cabecera
  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const emptyTh = document.createElement("th");
  headerRow.appendChild(emptyTh);

  for (let j = 1; j <= noItems; j++) {
    const th = document.createElement("th");
    th.textContent = `Item ${j}`;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  tabla.appendChild(thead);

  // Cuerpo
  const tbody = document.createElement("tbody");
  for (let i = 1; i <= noPersonas; i++) {
    const tr = document.createElement("tr");
    const labelTd = document.createElement("td");
    labelTd.textContent = `Persona ${i}`;
    tr.appendChild(labelTd);

    for (let j = 1; j <= noItems; j++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.className = "form-control form-control-sm text-center";
      input.min = "1";
      input.max = "5";
      input.placeholder = "0";
      td.appendChild(input);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  tabla.appendChild(tbody);

  // Limpieza visual y reinicio de resultados
  limpiarResultados();
}

// Calcula la varianza de un arreglo numérico
function varianza(arr) {
  const n = arr.length;
  const media = arr.reduce((a, b) => a + b, 0) / n;
  const suma = arr.reduce((a, b) => a + Math.pow(b - media, 2), 0);
  return n > 1 ? suma / (n - 1) : 0;
}

// === LIMPIAR RESULTADOS ===
function limpiarResultados() {
  document.getElementById("tabla-var-items").querySelector("tbody").innerHTML = "";
  document.getElementById("tabla-var-personas").querySelector("tbody").innerHTML = "";
  document.getElementById("suma-var-items").textContent = "—";
  document.getElementById("suma-var-personas").textContent = "—";
  document.getElementById("lblAlfa").textContent = "—";
  document.getElementById("valoralfa").textContent = "—";
  document.getElementById("reco").value = "";
}

// === CALCULAR VARIANZAS ===
function calcularVarianzas() {
  const tabla = document.getElementById("tabla-encuesta");
  const filas = tabla.querySelectorAll("tbody tr");
  if (filas.length === 0) {
    alert("Primero crea la tabla.");
    return;
  }

  // Leer datos y validar
  const datos = [];
  for (const fila of filas) {
    const celdas = fila.querySelectorAll("td input");
    const valores = [];
    for (const celda of celdas) {
      const val = parseFloat(celda.value);
      if (isNaN(val) || val < 1 || val > 5) {
        alert("Por favor ingresa solo números entre 1 y 5.");
        return;
      }
      valores.push(val);
    }
    datos.push(valores);
  }

  const nItems = datos[0].length;
  const nPersonas = datos.length;
  const df4 = (num) => Number(num.toFixed(4));

  // Varianzas por ítem
  const varianzasItems = [];
  const tablaItems = document.getElementById("tabla-var-items").querySelector("tbody");
  tablaItems.innerHTML = "";

  for (let j = 0; j < nItems; j++) {
    const columna = datos.map(fila => fila[j]);
    const varItem = varianza(columna);
    const sumaItem = columna.reduce((a, b) => a + b, 0);
    varianzasItems.push(varItem);

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>Item ${j + 1}</td><td>${df4(varItem)}</td><td>${df4(sumaItem)}</td>`;
    tablaItems.appendChild(tr);
  }

  // Varianzas por persona
  const varianzasPersonas = [];
  const tablaPersonas = document.getElementById("tabla-var-personas").querySelector("tbody");
  tablaPersonas.innerHTML = "";

  for (let i = 0; i < nPersonas; i++) {
    const fila = datos[i];
    const varPersona = varianza(fila);
    const sumaPersona = fila.reduce((a, b) => a + b, 0);
    varianzasPersonas.push(varPersona);

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>Persona ${i + 1}</td><td>${df4(varPersona)}</td><td>${df4(sumaPersona)}</td>`;
    tablaPersonas.appendChild(tr);
  }

  // Mostrar sumatorias
  const sumaVarItems = varianzasItems.reduce((a, b) => a + b, 0);
  const sumaVarPersonas = varianzasPersonas.reduce((a, b) => a + b, 0);
  document.getElementById("suma-var-items").textContent = df4(sumaVarItems);
  document.getElementById("suma-var-personas").textContent = df4(sumaVarPersonas);

  // Guardar en variable global temporal para usar en cálculo de alfa
  window._datosEncuesta = datos;
  window._varianzasItems = varianzasItems;
  alert("Varianzas calculadas correctamente.");
}

// === CALCULAR ALFA DE CRONBACH ===
function calcularAlfa() {
  const datos = window._datosEncuesta;
  if (!datos) {
    alert("Primero calcula las varianzas.");
    return;
  }

  const varianzasItems = window._varianzasItems;
  const nItems = datos[0].length;
  const df4 = (num) => Number(num.toFixed(4));

  // Cálculo de varianza total
  const totalScores = datos.map(row => row.reduce((a, b) => a + b, 0));
  const varianzaTotal = varianza(totalScores);

  if (varianzaTotal === 0) {
    alert("No se puede calcular el alfa porque la varianza total es cero.");
    return;
  }

  const sumaVarItems = varianzasItems.reduce((a, b) => a + b, 0);
  const alfa = (nItems / (nItems - 1)) * (1 - (sumaVarItems / varianzaTotal));

  document.getElementById("lblAlfa").textContent = df4(alfa);

  // Interpretación
  let interpretacion, recomendacion;
  if (alfa < 0.5) {
    interpretacion = "Muy baja";
    recomendacion = "La consistencia es inaceptable. Revisa los ítems y su relación con el resto.";
  } else if (alfa < 0.6) {
    interpretacion = "Baja";
    recomendacion = "La consistencia es débil. Considera revisar ítems inconsistentes.";
  } else if (alfa < 0.7) {
    interpretacion = "Moderada";
    recomendacion = "Consistencia aceptable. Revisa si hay ítems poco relacionados con el resto.";
  } else if (alfa < 0.9) {
    interpretacion = "Alta";
    recomendacion = "Buena consistencia interna. El instrumento es confiable.";
  } else {
    interpretacion = "Excelente";
    recomendacion = "Consistencia perfecta. El instrumento es altamente confiable.";
  }

  document.getElementById("valoralfa").textContent = `El valor es ${interpretacion.toLowerCase()}`;
  document.getElementById("reco").value = recomendacion;
}

// === EVENTOS ===
document.getElementById("btn-crear-tabla").addEventListener("click", () => {
  const noi = parseInt(document.getElementById("noi").value);
  const nop = parseInt(document.getElementById("nop").value);

  if (isNaN(noi) || isNaN(nop) || noi <= 0 || nop <= 0) {
    alert("Por favor ingresa valores válidos para ítems y personas.");
    return;
  }
  crearTabla(noi, nop);
});

document.getElementById("btn-sacar-varianza").addEventListener("click", calcularVarianzas);
document.getElementById("btn-calcular-alfa").addEventListener("click", calcularAlfa);
