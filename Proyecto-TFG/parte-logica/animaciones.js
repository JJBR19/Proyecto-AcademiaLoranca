/* THROTTLE FUNCTION PARA OPTIMIZAR SCROLL EVENTS */
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

/* ANIMACIÓN SERVICIOS + METODOLOGÍA */
const elementosAnimados = document.querySelectorAll(".servicio-item, .metodologia-item");

const animarServicios = throttle(() => {
    elementosAnimados.forEach((elemento) => {
        // Si ya está activo, no volvemos a calcular
        if (!elemento.classList.contains("active")) {
            const windowHeight = window.innerHeight;
            const elementTop = elemento.getBoundingClientRect().top;
            const visible = 120;

            if (elementTop < windowHeight - visible) {
                elemento.classList.add("active");
            }
        }
    });
}, 100); // Ejecutar máximo cada 100ms

window.addEventListener("scroll", animarServicios, { passive: true });


/* ANIMACIÓN BENEFICIOS - USA CSS EN LUGAR DE JAVASCRIPT */
const beneficios = document.querySelectorAll(".beneficios-lista li");

const animarBeneficios = throttle(() => {
    beneficios.forEach((item, index) => {
        if (!item.classList.contains("active")) {
            const windowHeight = window.innerHeight;
            const elementTop = item.getBoundingClientRect().top;
            const visible = 100;

            if (elementTop < windowHeight - visible) {
                item.classList.add("active");
                // Usar CSS variable en lugar de inline styles
                item.style.setProperty('--item-delay', `${index * 0.22}s`);
            }
        }
    });
}, 100);

window.addEventListener("scroll", animarBeneficios, { passive: true });
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
