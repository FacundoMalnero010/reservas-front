/**
 * Permite que al clickear en los refs del menú se haga una transición smooth hacia la sección
 */

export function menuSmooth(){
    document.querySelectorAll('a[href^="#"]').forEach(selector => {
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
}

/**
 * Permite el scrolleo smooth y bloquea momentáneamente el scroll para que la transición se complete
 * 
 * @param {WheelEvent} event 
 */

export function scrollPausadoSmooth(event){
  let canScroll = true;
  // previene el desplazamiento predeterminado del mouse
  event.preventDefault();
  // si no se puede hacer scroll, salimos de la función
  if (!canScroll) return;
  // obtiene la dirección del desplazamiento del mouse
  const direction = event.deltaY > 0 ? 1 : -1;
  // establece un tiempo de espera antes de poder hacer scroll de nuevo3
  canScroll = false;
  setTimeout(() => (canScroll = true), 1000);
  // obtiene la siguiente sección
  const currentSection = event.target.closest(".seccion");
  const nextSection = currentSection.nextElementSibling;
  // si hay una siguiente sección y la dirección es hacia abajo, desplázate a ella con un efecto suave
  if (nextSection && direction === 1) {
    nextSection.scrollIntoView({behavior: "smooth", duration: 1000});
  }
  // si hay una sección anterior y la dirección es hacia arriba, desplázate a ella con un efecto suave
  if (currentSection.previousElementSibling && direction === -1) {
    currentSection.previousElementSibling.scrollIntoView({behavior: "smooth",duration: 1000});
  }
}

/**
 * Hace que el scrolleo pase de una sección a otra
 */

export function scrolleoEntreSecciones(){
    let animacionCards = false, animacionMenu = false;
    const sobreNos = document.getElementById('sobreNosotros');
    const menu     = document.getElementById('menuImage');
    const cards    = document.querySelectorAll('#sobreNosotros .card');

    // verifico la posicion actual de la pantalla
    const position = window.scrollY;

    // si me encuentro en la seccion 2, le agrego animación
    if(position <= sobreNos.offsetTop-1 && !animacionCards){
        cards.forEach(card => {card.classList.add('deslizar')});
        animacionCards = true;
    }
    if(position >= sobreNos.offsetTop+1 && !animacionMenu){
        menu.classList.add('agrandar');
        animacionMenu = true;
    }
}

/**
 * Realiza una transición smooth hacia la primera sección
 */

export function subirAHome(){
    window.scrollTo({top:0,behavior:'smooth'});
}