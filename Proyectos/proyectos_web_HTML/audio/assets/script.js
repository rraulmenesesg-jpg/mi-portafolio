function activar(){
    setInterval(TicTac,1000);
}
function TicTac(){
    let elementoreloj = document.getElementById("relog")
    let TIEMPO = new Date;
    let hora = TIEMPO.getHours();
    let min = TIEMPO.getMinutes();
    let seg = String(TIEMPO.getSeconds()).padStart(2,"0");
    let texhora = hora + ":" + min + ":" + seg;
    elementoreloj.textContent = texhora;
}