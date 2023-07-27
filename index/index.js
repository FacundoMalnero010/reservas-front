const boton = document.getElementById('boton');
boton.addEventListener('click', function(){
    setTimeout(redirigirA,500,'../reserva/reserva.html');
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

let animacionCards = false, animacionMenu = false;

/* Función para transición suave entre secciones al scrollear */
window.addEventListener('scroll',function(){
  const sobreNos = document.getElementById('sobreNosotros');
  const menu = document.getElementById('menuImage');
  const cards = document.querySelectorAll('#sobreNosotros .card');
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
});

main.addEventListener("wheel", (e) => {
  // previene el desplazamiento predeterminado del mouse
  e.preventDefault();
  // si no se puede hacer scroll, salimos de la función
  if (!canScroll) return;
  // obtiene la dirección del desplazamiento del mouse
  const direction = e.deltaY > 0 ? 1 : -1;
  // establece un tiempo de espera antes de poder hacer scroll de nuevo3
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

/* Previene que la imagen del menú se pueda arrastrar */
document.getElementById('menuImage').addEventListener('dragstart',(evento)=>{evento.preventDefault()});

const form = document.getElementById('form');

/* Maneja el submit del form de contacto */
form.addEventListener('submit', function(event){
  event.preventDefault();

  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const correo = document.getElementById('correo');
  const consulta = document.getElementById('consulta');
  
  if(!validarNombreOApellido(nombre.value)){
    nombre.classList.add('is-invalid');
    return false;
  }
  else{
    verifico(nombre);
  }

  if(!validarNombreOApellido(apellido.value)){
    apellido.classList.add('is-invalid');
    return false;
  }
  else{
    verifico(apellido);
  }

  if(!validarCorreo(correo.value)){
    correo.classList.add('is-invalid');
    return false;
  }
  else{
    verifico(correo);
  }

  if(!validarConsulta(consulta.value)){
    consulta.classList.add('is-invalid');
    return false;
  }
  else{
    verifico(consulta);
  }

  form.submit()

});

/* Funciones auxiliares para validación del form de contacto */
function validarNombreOApellido(nombre){
  const regex = /^[\wáéíóúÁÉÍÓÚñÑ]{3,}$/;
  return regex.test(nombre);
}

function validarCorreo(correo){
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(correo);
}

function validarConsulta(consulta){
  const regex = /^[a-zA-Z0-9ñÑ\s]{3,255}$/;
  return regex.test(consulta);
}

function verifico(input){
  if(input.classList.contains('is-invalid')){
    input.classList.remove('is-invalid');
  }
  input.classList.add('is-valid');
}

document.querySelector('#form').addEventListener('submit', function(event) {
	event.preventDefault();
  
	// Obtiene los datos del formulario
	const formData = new FormData(event.target);
  
	// Envía una solicitud AJAX con los datos
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'consultas.php');
	xhr.onload = function() {
	  if (xhr.status != 200) {
		console.error('Error al enviar la solicitud');
	  }
	};
	xhr.send(formData);
	envioCompleto();
});

function envioCompleto(){
	boton.classList.add('enviado');
	boton.innerHTML = '';
	document.getElementById('submit').disabled = true;
	setTimeout(redirigirAInicio,2000);
}

function redirigirAInicio(){
  window.scrollTo({top:0,behavior:'smooth'});
}