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

//Scroll smooth

const main = document.querySelector("main");
let canScroll = true;

let animacionCards = false;

window.addEventListener('scroll',function(){
  const sobreNos = document.getElementById('sobreNosotros');
  const cards = document.querySelectorAll('.card');
  // verifico la posicion actual de la pantalla
  const position = window.scrollY;
  // si me encuentro en la seccion 2, le agrego animación
  if(position >= sobreNos.offsetTop && !animacionCards){
    cards.forEach(card => {card.classList.add('deslizar'});
    animacionCards = true;
  }
});

main.addEventListener("wheel", (e) => {
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

document.querySelectorAll('a[href^="#"').forEach(selector => {
  //Href smooth
  selector.addEventListener('click',function(e){  
    e.preventDefault();
  
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
  });
  //Anulo drags
  selector.addEventListener('dragstart',(evento)=>{
    evento.preventDefault();
  });
});

