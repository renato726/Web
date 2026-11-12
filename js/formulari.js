
"use strict";

const form = document.getElementById("form-sollicitud");
const resultat = document.getElementById("resultat");

function mostraError(id, missatge) {
    const error = document.getElementById("error-" + id);
    const camp = document.getElementById(id);

    if (error) {
        error.textContent = missatge;
    }

    if (camp) {
        camp.classList.toggle("camp-error", missatge !== "");
    }
}

function valida() {
    let correcte = true;

    // 1. Validar nombre.
    const nom = form.elements["nom"].value.trim();

    if (nom.length < 3) {
        mostraError(
            "nom",
            "Escribe un nombre de al menos 3 caracteres."
        );
        correcte = false;
    } else {
        mostraError("nom", "");
    }

    // 2. Validar correo electrónico.
    const email = form.elements["email"].value.trim();
    const patróEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!patróEmail.test(email)) {
        mostraError(
            "email",
            "Introduce un correo válido, por ejemplo nombre@dominio.com."
        );
        correcte = false;
    } else {
        mostraError("email", "");
    }

    // 3. Validar teléfono: opcional, pero 9 cifras si se rellena.
    const telefon = form.elements["telefon"].value.trim();

    if (telefon !== "" && !/^[0-9]{9}$/.test(telefon)) {
        mostraError(
            "telefon",
            "El teléfono debe tener exactamente 9 cifras."
        );
        correcte = false;
    } else {
        mostraError("telefon", "");
    }

    // 4. Validar que se haya seleccionado un equipo.
    const equipSeleccionat = form.querySelector(
        'input[name="equipo"]:checked'
    );

    if (!equipSeleccionat) {
        mostraError(
            "equipo",
            "Selecciona un tipo de equipo."
        );
        correcte = false;
    } else {
        mostraError("equipo", "");
    }

    // 5. Validar descripción.
    const descripcion = form.elements["descripcion"].value.trim();

    if (descripcion.length < 20) {
        mostraError(
            "descripcion",
            "Describe la incidencia con al menos 20 caracteres."
        );
        correcte = false;
    } else {
        mostraError("descripcion", "");
    }

    // 6. Validar aceptación de privacidad.
    const privacitat = form.elements["privacitat"].checked;

    if (!privacitat) {
        mostraError(
            "privacitat",
            "Debes aceptar el tratamiento de datos para continuar."
        );
        correcte = false;
    } else {
        mostraError("privacitat", "");
    }

    return correcte;
}

// Validar el formulario cuando se pulsa Enviar.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    resultat.textContent = "";
    resultat.classList.remove("exito", "fallo");

    if (valida()) {
        const nom = form.elements["nom"].value.trim();

        resultat.textContent =
            "Solicitud validada correctamente. Gracias, " +
            nom +
            ". Recuerda que esta demostración no envía los datos a un servidor.";

        resultat.classList.add("exito");

        form.reset();

        // Eliminar las marcas de error al limpiar el formulario.
        document.querySelectorAll(".camp-error").forEach((camp) => {
            camp.classList.remove("camp-error");
        });

        document.querySelectorAll(".error").forEach((error) => {
            error.textContent = "";
        });
    } else {
        resultat.textContent =
            "Revisa los campos indicados antes de enviar el formulario.";

        resultat.classList.add("fallo");
    }
});

// Limpiar los mensajes al pulsar el botón de limpiar.
form.addEventListener("reset", () => {
    setTimeout(() => {
        document.querySelectorAll(".error").forEach((error) => {
            error.textContent = "";
        });

        document.querySelectorAll(".camp-error").forEach((camp) => {
            camp.classList.remove("camp-error");
        });

        resultat.textContent = "";
        resultat.classList.remove("exito", "fallo");
    }, 0);
});
