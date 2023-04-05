const boton = document.getElementById('boton');
boton.addEventListener('click', function(){
    setTimeout(redirigirA,500,'../reserva/reserva.php');
});

function agregarAnimacion(){
    boton.style.animation = 'wave 0.5s linear';
}

function redirigirA(pagina){
    window.location.href = pagina;
}

//Scroll smooth entre secciones (Arreglar)

