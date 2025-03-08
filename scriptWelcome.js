document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("fullscreenModal");
    const enterButton = document.querySelector(".welcome-button");
    const confirmButton = document.getElementById("confirmFullscreen");
    const cancelButton = document.getElementById("cancelFullscreen");
    modal.style.display = "none";

    // Mostrar el modal cuando se presiona el botón de ingreso
    enterButton.addEventListener("click", function (event) {
        event.preventDefault(); // Evita que redirija automáticamente
        modal.style.display = "flex";
    });

    // Si el usuario acepta, redirige a la galería sin activar pantalla completa
    confirmButton.addEventListener("click", function () {
        window.location.href = "album.html"; // Sin activar pantalla completa aquí
    });

    // Si el usuario cancela, cierra el modal
    cancelButton.addEventListener("click", function () {
        modal.style.display = "none";
    });
});
