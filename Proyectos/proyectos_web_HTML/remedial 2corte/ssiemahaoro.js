function calcularAhorro() {
    const meta = Number(document.getElementById("meta").value);
    const ahorroMensual = Number(document.getElementById("ahorroMensual").value);
    if (!meta || !ahorroMensual || meta <= 0 || ahorroMensual <= 0) {
        mostrarError("Por favor ingresa valores válidos en meta y ahorro mensual.");
        return;
    }
    if (ahorroMensual >= meta) {
        mostrarResultadoSimple(meta, ahorroMensual);
        return;
    }
    tasaPorc = 5;
    const tasa = tasaPorc / 100; 
    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = "";
    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    const filaHeader = document.createElement("tr");
    ["Mes", "Ahorro X mes", "Intereses", "fondos acumilados",].forEach(texto => {
        const th = document.createElement("th");
        th.textContent = texto;
        filaHeader.appendChild(th);
    });
    thead.appendChild(filaHeader);
    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");

    let saldo = 0;
    let mes = 1;

    while (saldo < meta && mes < 120) {
        // Interés del mes anterior
        const interes = saldo * tasa;
        
        // Añadir ahorro del mes
        const saldoNuevo = saldo + interes + ahorroMensual;

        // Crear fila
        const fila = document.createElement("tr");
        const celMes = document.createElement("td"); celMes.textContent = mes;
        const celAhorro = document.createElement("td"); celAhorro.textContent = "$" + ahorroMensual.toFixed(2);
        const celInteres = document.createElement("td"); celInteres.textContent = "$" + interes.toFixed(2);
        const celSaldo = document.createElement("td"); celSaldo.textContent = "$" + saldoNuevo.toFixed(2);
        celAhorro.style.textAlign = "right";
        celInteres.style.textAlign = "right";
        celSaldo.style.textAlign = "right";

        fila.appendChild(celMes);
        fila.appendChild(celAhorro);
        fila.appendChild(celInteres);
        fila.appendChild(celSaldo);
        tbody.appendChild(fila);

        saldo = saldoNuevo;
        mes++;
    }

    if (saldo >= meta) {
        const filaTotal = document.createElement("tr");
        filaTotal.className = "total";
        
        const tdTotal = document.createElement("td");
        tdTotal.colSpan = 3;
        tdTotal.textContent = "Meta alcanzada en mes " + (mes-1);
        tdTotal.style.textAlign = "left";
        
        const tdSaldoFinal = document.createElement("td");
        tdSaldoFinal.textContent = "$" + saldo.toFixed(2);
        
        filaTotal.appendChild(tdTotal);
        filaTotal.appendChild(tdSaldoFinal);
        tbody.appendChild(filaTotal);
    } else {
        mostrarError("No se alcanca la meta en 10 años. Revisa los valores.");
    }

    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
}

function mostrarError(mensaje) {
    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = `<div class="error">${mensaje}</div>`;
}

function mostrarResultadoSimple(meta, ahorro) {
    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = `
        <div style="padding:20px; background:#d4edda; border-radius:8px; color:#155724;">
            <strong>Meta alcanzada en el primer mes </strong><br>
            Ahorras $${ahorro.toFixed(2)} y tu meta es $${meta.toFixed(2)}
        </div>
    `;
}


