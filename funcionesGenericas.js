/**
 * Utiliza Swal para mostrar un cartel de error
 */

export function dispararError(){
    Swal.fire({
        icon:  'error',
        title: 'Oops...',
        text:  'Hubo un problema! Vuelva a intentarlo en un rato',
    });
}

/**
 * Utiliza Swal para mostrar un cartel de exito
 * 
 * @param {string} mensaje
 */

export function dispararExito(mensaje){
    Swal.fire({
		icon: 'success',
		title: 'Éxito',
		text: mensaje
	});
}