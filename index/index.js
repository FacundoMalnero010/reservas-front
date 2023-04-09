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

//Falta hacer smooth

const sections = document.querySelectorAll(".seccion");
let canScroll = true;

sections.forEach((section) => {
  section.addEventListener("wheel", (e) => {
    // previene el desplazamiento predeterminado del mouse
    e.preventDefault();

    // si no se puede hacer scroll, salimos de la función
    if (!canScroll) return;

    // obtiene la dirección del desplazamiento del mouse
    const direction = e.deltaY > 0 ? 1 : -1;

    // establece un tiempo de espera antes de poder hacer scroll de nuevo
    canScroll = false;
    setTimeout(() => (canScroll = true), 1000);

    // obtiene la siguiente sección
    const currentSection = e.target.closest(".seccion");
    const nextSection = currentSection.nextElementSibling;

    // si hay una siguiente sección y la dirección es hacia abajo, desplázate a ella con un efecto suave
    if (nextSection && direction === 1) {
      nextSection.scrollIntoView({behavior: "smooth", duration: 1000});
    }

    // si hay una sección anterior y la dirección es hacia arriba, desplázate a ella con un efecto suave
    if (currentSection.previousElementSibling && direction === -1) {
      currentSection.previousElementSibling.scrollIntoView({behavior: "smooth",duration: 1000});
    }
  });
});