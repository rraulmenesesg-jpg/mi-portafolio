function recomendar(genero){
    let edadusuario =document.getElementById("textoedadusuario").value;
    let recomendaciones = document.getElementById("recomendaciones");
    let imagen = document.getElementById("poster-pelicula");


    switch(genero){
        case'animaciones':
            if (edadusuario < 12){
                recomendaciones.textContent = "Zootopia 2";
                imagen.src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpP4GYvaHFUZSyjAKkt2n5bkmzGOTjvQc6jA&s";
            }else{
                if(edadusuario <=16){
                    recomendaciones.textContent = "Soul";
                    imagen.src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStygw4cB3VE8Ym_dtgXCmzuTqnXfWBu_9C9w&s";
                }else{
                    recomendaciones.textContent = "Fiesta de las Salchichas";
                    imagen.src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbwcW_1N93UHZMYNm3af8v4ObCeUdE2UYWmg&s";
                }
            }
        break;
        case'comedia':
            if (edadusuario < 12){
                recomendaciones.textContent = "Donde estan las rubias";
                imagen.src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ01gdv_WG7h3fwiVaYs6p62w6BsV-NF7AD9g&s";
            }else{
                if(edadusuario <=16){
                    recomendaciones.textContent = "MI Novia Poli";
                    imagen.src ="https://static.wikia.nocookie.net/yatoroba/images/a/a7/Minoviapollyposter.png/revision/latest?cb=20240520210849&path-prefix=es";
                }else{
                    recomendaciones.textContent = "Que Paso Ayer?";
                    imagen.src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0B6SV51o-DDSO_1JZWK55y6HrHHPlTjmeuQ&s";
                }
            }
        break;
        case'terror':
            if (edadusuario < 12){
                recomendaciones.textContent = "Chouki";
                imagen.src ="https://moviepostermexico.com/cdn/shop/products/bride_of_chucky_xxlg_1746x.jpg?v=1639762144";
            }else{
                if(edadusuario <=16){
                    recomendaciones.textContent = "Hallowen";
                    imagen.src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWy2HB-xSt7RuCD65bTawZS8zKnTgTTUiK5w&s";
                }else{
                    recomendaciones.textContent = "El Exorcista";
                    imagen.src ="https://storage.googleapis.com/pod_public/1300/262784.jpg";
                }
            }
        break;
        case'ficcion':
            if (edadusuario < 12){
                recomendaciones.textContent = "Volver al Futuro";
                imagen.src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT7oc554AKi04cGcmjhkaMQFpl3D7x8NDnWw&s";
            }else{
                if(edadusuario <=16){
                    recomendaciones.textContent = "Transformers";
                    imagen.src ="https://static.posters.cz/image/750/11054.jpg";
                }else{
                    recomendaciones.textContent = "Jurassic park";
                    imagen.src ="https://moviepostermexico.com/cdn/shop/products/jurassic_world_ver2_xxlg_1024x1024@2x.jpg?v=1572812873";
                }
            }
        break;
        default:
            recomendaciones.textContent ="no hay"
        break;
        
    }
    imagen.style.display="block"
}

