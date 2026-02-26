/* ANIMACIÓN SERVICIOS + METODOLOGÍA */

const elementosAnimados = document.querySelectorAll(".servicio-item, .metodologia-item");

window.addEventListener("scroll", () => {
    elementosAnimados.forEach((elemento) => {
        const windowHeight = window.innerHeight;
        const elementTop = elemento.getBoundingClientRect().top;
        const visible = 120;

        if (elementTop < windowHeight - visible) {
            elemento.classList.add("active");
        }
    });
});


/* ANIMACIÓN BENEFICIOS */

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

/* ANIMACIÓN SOBRE NOSOTROS */

const valores = document.querySelectorAll(".valor-card");

const observerValores = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {

            valores.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add("active");
                }, index * 340); // velocidad entre tarjetas
            });

            observerValores.disconnect(); // se ejecuta solo una vez
        }
    });
}, { threshold: 0.3 });

observerValores.observe(document.querySelector(".valores-grid"));
