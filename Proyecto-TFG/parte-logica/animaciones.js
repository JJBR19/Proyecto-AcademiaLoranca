/* =========================
   ANIMACIÓN SERVICIOS
========================= */

const servicios = document.querySelectorAll(".servicio-item");

window.addEventListener("scroll", () => {
    servicios.forEach((servicio) => {
        const windowHeight = window.innerHeight;
        const elementTop = servicio.getBoundingClientRect().top;
        const visible = 120;

        if (elementTop < windowHeight - visible) {
            servicio.classList.add("active");
        }
    });
});


/* =========================
   ANIMACIÓN BENEFICIOS
========================= */

const beneficios = document.querySelectorAll(".beneficios-lista li");

window.addEventListener("scroll", () => {
    beneficios.forEach((item, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = item.getBoundingClientRect().top;
        const visible = 100;

        if (elementTop < windowHeight - visible) {
            // Añadimos la clase active
            item.classList.add("active");
            
            // Movemos cada ítem un poco hacia abajo según su índice
            item.style.transform = `translateX(0) translateY(${index * 15}px)`;
            item.style.transitionDelay = `${index * 0.22}s`; // efecto escalera suave
        }
    });
});


