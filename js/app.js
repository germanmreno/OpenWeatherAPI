const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
    e.preventDefault();

    const ciudad = document.querySelector("#ciudad").value;
    const pais = document.querySelector("#pais").value;

    if (ciudad === "" || pais === "") {
        mostrarError("Ambos campos son obligatorios");
        return;
    }

    consultarAPI(ciudad, pais);
}

function mostrarError(msj) {
    const alerta = document.querySelector(".bg-red-100");

    if (!alerta) {
        const alerta = document.createElement("div");
        alerta.classList.add(
            "bg-red-100",
            "border-red-400",
            "text-red-700",
            "px-4",
            "py-3",
            "rounded",
            "max-w-md",
            "mx-auto",
            "mt-6",
            "text-center"
        );
        alerta.innerHTML = `<strong class="font-bold">Error!</strong>
    <span class="block">${msj}</span>`;
        container.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI(ciudad, pais) {
    const appId = "25d1e8965bb2dd62b5b2818323b6e858";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&units=metric&appid=${appId}`;

    Spinner();

    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            limpiarHTML();

            console.log(data);
            if (data.cod === "404") {
                mostrarError("Ciudad no encontrada");
                return;
            }

            mostrarClima(data);
        });
}

function mostrarClima(data) {
    const {
        name,
        main: { temp, temp_max, temp_min },
    } = data;

    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add("font-bold", "text-2xl");

    const actual = document.createElement(`p`);
    actual.innerHTML = `${temp} &#8451`;
    actual.classList.add("font-bold", "text-6xl");

    const max = document.createElement(`p`);
    max.innerHTML = `Temperatura máxima: ${temp_max} &#8451`;
    max.classList.add("text-xl");

    const min = document.createElement(`p`);
    min.innerHTML = `Temperatura mínima: ${temp_min} &#8451`;
    min.classList.add("text-xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(max);
    resultadoDiv.appendChild(min);

    resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner() {
    limpiarHTML();

    const divSpinner = document.createElement("div");
    divSpinner.classList.add("sk-fading-circle");

    divSpinner.innerHTML = `<div class="sk-circle1 sk-circle"></div>
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
                            <div class="sk-circle12 sk-circle"></div>`;

    resultado.appendChild(divSpinner);
}
