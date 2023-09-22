import { dispararError, hashURL } from '../../funcionesGenericas.js';

const url = 'http://localhost:8080/api/administradores/login';

/**
 * Envia por api los datos del form para validar si las credenciales
 * del usuario son correctas
 * 
 * @param {HTMLElement} form
 * @uses dispararError() 
 */

export async function loguear(form) {
    const formData = new FormData(form);

    await fetch(url, {
        method:'POST',
        body: formData
    })
    .then(response => {
        if(!response.ok) {
            throw new Error('Error al conectarse a la API');
        }
        else {
            return response.json();
        }
    })
    .then(data => {
        data.code === 200 ? window.location.href = '../index/index.html' : 0; 
    })
    .catch((error) => {dispararError('Sus credenciales son incorrectas')});
}