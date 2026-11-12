
alert("¡Bienvenido a la web del taller!");

"use strict";

console.log("El portal ha cargado");

const body = document.body;
const selectorTexto = document.getElementById("sel-text");
const botonTema = document.getElementById("btn-tema");

// Recuperar las preferencias guardadas.
const temaGuardado = localStorage.getItem("tema");
const textoGuardado = localStorage.getItem("tamanoTexto");

// Aplicar el tema guardado.
if (temaGuardado === "oscuro") {
    body.classList.add("tema-fosc");
}

actualizarBotonTema();

// Aplicar el tamaño de texto guardado.
if (selectorTexto) {
    const opcionesTexto = ["normal", "gran", "molt-gran"];

    if (opcionesTexto.includes(textoGuardado)) {
        selectorTexto.value = textoGuardado;
    }

    aplicarTamanoTexto(selectorTexto.value);

    selectorTexto.addEventListener("change", () => {
        aplicarTamanoTexto(selectorTexto.value);

        localStorage.setItem(
            "tamanoTexto",
            selectorTexto.value
        );
    });
}

// Cambiar entre modo claro y oscuro.
if (botonTema) {
    botonTema.addEventListener("click", () => {
        const fosc = body.classList.toggle("tema-fosc");

        actualizarBotonTema();

        localStorage.setItem(
            "tema",
            fosc ? "oscuro" : "claro"
        );
    });
}

function actualizarBotonTema() {
    if (!botonTema) {
        return;
    }

    const fosc = body.classList.contains("tema-fosc");

    botonTema.textContent = fosc ? "Modo claro" : "Modo oscuro";
    botonTema.setAttribute("aria-pressed", String(fosc));
}

function aplicarTamanoTexto(valor) {
    document.documentElement.classList.remove(
        "text-gran",
        "text-molt-gran"
    );

    if (valor === "gran") {
        document.documentElement.classList.add("text-gran");
    } else if (valor === "molt-gran") {
        document.documentElement.classList.add("text-molt-gran");
    }
}
