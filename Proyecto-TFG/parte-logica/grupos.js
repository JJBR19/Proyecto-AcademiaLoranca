// Abrir popup
function abrirPOPUP(id) {
    const popup = document.getElementById(id);
    popup.style.display = "flex";

    const video = popup.querySelector('video');
    if (video) {
        video.currentTime = 0;
        video.play().catch(err => {
            console.log("El video no se pudo reproducir:", err);
        });

        video.addEventListener('ended', () => {
            video.pause();
            video.currentTime = video.duration;
        }, { once: true });
    }
}

// Cerrar popup
function cerrarPOPUP(id) {
    const popup = document.getElementById(id);
    popup.style.display = "none";

    const video = popup.querySelector('video');
    if (video) {
        video.pause();
    }
}

// Cerrar popup al hacer click fuera
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("POPUP")) {
        cerrarPOPUP(event.target.id);
    }
});