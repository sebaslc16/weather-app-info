
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
    e.preventDefault();


    //Validar campos
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {

        //Mostar alerta
        mostrarError('Ambos campos son obligatorios');

        return;
    }

    //Consultar la API
    consultarAPI(ciudad, pais);

}

function mostrarError(mensaje) {

    const alertaExiste = document.querySelector('.bg-red-100');

    //Valida si la alerta existe
    if (!alertaExiste) {
        //crear alerta
        const alerta = document.createElement('DIV');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI(ciudad, pais) {

    const appId = 'ae45fc47e511c4a4e60ac6aa8e4ee737';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`; // URL API, con ciudad-pais

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada')
            }
            else {
                console.log(datos);
            }
        });

}