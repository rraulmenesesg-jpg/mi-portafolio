function reto1() {
    let texto = "";
    for(let i = 50; i >= 1; i++) {
        texto = texto + i + "\n";
    }
    document.getElementById("en numero actual es: ").textContent = texto;
}


