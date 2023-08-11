import { loguear } from "./consultasBBDD";

const form = document.getElementById('loginForm');

// Agregamos una validación al formulario
window.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
            const invalidFields = form.querySelectorAll(':invalid');
            invalidFields.forEach((field) => {
                field.title = field.validationMessage;
            });
            const validFields = form.querySelectorAll(':valid');
            validFields.forEach((field) => {
                field.title = '';
            });
        }
        else {
            loguear(form);
        }
    });
});