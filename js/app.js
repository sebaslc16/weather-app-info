
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

    spinner();

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHTML(); //Limpiar HTML previo
            if (datos.cod === "404") {
                mostrarError('Ciudad no encontrada');
                return;
            }

            //Mostar informacion en el HTML
            mostrarClima(datos);
        });
}

function mostrarClima(datos) {
    const { name, main: { temp, temp_max, temp_min, humidity, pressure }, coord: { lat, lon }, sys: { country } } = datos;

    //Temperaturas
    const centrigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    //Coordenadas
    const latenciaLongitud = crearElementoHTML(`Latencia: ${lat}  |  Longitud: ${lon}`, ['text-lg']);

    //Info adicional: humedad y presión
    const humedadPresion = crearElementoHTML(`Humedad: ${humidity}  |  Presión: ${pressure}`, ['text-sm']);

    // Nombre y pais
    const nombreCiudad = crearElementoHTML(`Clima en ${name} - ${country}`, ['font-bold', 'text-3xl']);

    //Temperatura actual
    const actual = crearElementoHTML(`${centrigrados} &#8451`, ['font-bold', 'text-6xl']);

    //Temperatura maxima
    const tempMax = crearElementoHTML(`Max: ${max} &#8451`, 'text-xl');

    //Temperatura actual
    const tempMin = crearElementoHTML(`Min: ${min} &#8451`, ['text-xl']);

    const datosDiv = document.createElement('DIV');
    datosDiv.classList.add('text-center', 'text-white');
    datosDiv.appendChild(nombreCiudad);
    datosDiv.appendChild(latenciaLongitud);
    datosDiv.appendChild(humedadPresion);
    datosDiv.appendChild(actual);
    datosDiv.appendChild(tempMax);
    datosDiv.appendChild(tempMin);

    resultado.appendChild(datosDiv);
}
//convertir kelvin a centrigrados en entero
const kelvinACentigrados = grados => parseInt(grados - 273.15);

//Crear elemento htmlm resive el textcontent y las clases a agregar
function crearElementoHTML(texto, classes) {
    const element = document.createElement('P');
    element.innerHTML = texto;

    //recorre las clases y las agrega
    for (let i = 0; i < classes.length; i++) {
        const clase = classes[i];
        element.classList.add(clase);
    }

    return element;
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {

    limpiarHTML();

    const divSpinner = document.createElement('DIV');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);

}
