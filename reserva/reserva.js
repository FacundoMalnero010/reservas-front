const fechaInput = document.getElementById('fecha');
const fechaActual = new Date();
fechaActual.setDate(fechaActual.getDate() + 1);
const fechaSiguiente = fechaActual.toISOString().split('T')[0];
fechaInput.setAttribute('min', fechaSiguiente);

let boton = document.getElementById('submit');
let fecha, comensales, email, horario;
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

window.addEventListener('onload', especificarHorarios());

document.querySelector('#form').addEventListener('submit', function(event) {
	event.preventDefault();
  
	// Obtiene los datos del formulario
	const formData = new FormData(event.target);
  
	// Envía una solicitud AJAX con los datos
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'reserva.php');
	xhr.onload = function() {
	  if (xhr.status != 200) {
		console.error('Error al enviar la solicitud');
	  }
	};
	xhr.send(formData);
	envioCompleto();
  });
  
//
function especificarHorarios() {
	let hora = 19, minutos = 0;
	select = document.getElementById('horario');

	for(let i = 0; i<20; i++){
		if(i === 0){
			let opcion = new Option(hora+':'+minutos+'0',hora+':'+minutos+'0');
			select.appendChild(opcion);
		}
		else{
			let opcion;
			if(minutos == 45){
				minutos = 0;
				hora++;
			}
			else{
				minutos += 15;
			}
			if(minutos === 0){
				opcion = new Option(hora+':'+minutos+'0',hora+':'+minutos+'0');
			}
			else{
				opcion = new Option(hora+':'+minutos,hora+':'+minutos);
			}
			select.appendChild(opcion);
		}
	}

  };

function aumentarOpacidad(){
	document.getElementById('submit').style.opacity = '1';
}

setTimeout(aumentarOpacidad,2000);

function validar(){

	fecha = document.getElementById('fecha').value;
	comensales = document.getElementById('comensales').value;
	email = document.getElementById('email').value;
	horario = document.getElementById('horario').value;

	inputs = [fecha, comensales, horario];

	if(inputs.includes('') || !regexCorreo.test(email)){
		boton.disabled = true;
		boton.id = 'noSubmit';
		
		if(fecha === ''){
			boton.innerHTML = 'Seleccione una fecha';
		}
		else if(horario === ''){
			boton.innerHTML = 'Debe seleccionar un horario';
		}
		else if(comensales < 1 || comensales === ''){
			boton.innerHTML = 'La cantidad de comensales no es válida';
		}
		else{
			boton.innerHTML = 'La dirección de correo no es válida';
		}

	}
	else{
		boton.id = 'submit';
		boton.innerHTML = 'Reservar';
		boton.disabled = false;
	}

}

//Animación de form enviado
function envioCompleto(){
	boton.classList.add('enviado');
	boton.innerHTML = '';
	document.getElementById('submit').disabled = true;
	setTimeout(redirigirAInicio,2000);
}

function redirigirAInicio(){
	window.location.replace('../index/index.html');
}
