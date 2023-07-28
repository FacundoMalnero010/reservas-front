export const urlReservas = 'http://localhost:8000/api/reservas'

export async function obtenerFechasOcupadas(fecha){
    return fetch(urlReservas+'/horariosReservados/'+fecha)
        .then(response => {
            if(!response.ok){
                throw new Error('No se pudo acceder a la API');
            }
            return response.json();
        })
        .then(data => {
            let arrayReservas = data.result;            
            return arrayReservas;
        })
        .catch(error => {
            throw new Error('Ocurrió algún problema en la consulta');
        });
}