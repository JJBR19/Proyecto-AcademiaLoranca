document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");
    const prevBtn = document.querySelector(".btn.left");
    const nextBtn = document.querySelector(".btn.right");
    const carrusel = document.querySelector(".carrusel");

    let index = 0;
    const total = images.length;
    const intervalTime = 4000;
    let autoSlide;
    let isCarouselVisible = true;

    /* ----------------------------------------------FUNCIONES---------------------------------------------- */

    // Función actualizar imagen a la siguiente
    function updateSlide() {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    // Botón siguiente imagen 
    function nextSlide() {
        index++;
        if (index >= total) {
            index = 0;
        }
        updateSlide();
    }

    // Botón imagen anterior
    function prevSlide() {
        index--;
        if (index < 0) {
            index = total - 1;
        }
        updateSlide();
    }

    // Función para que se cambie la imagen con el tiempo
    function startAutoSlide() {
        clearInterval(autoSlide);
        if (isCarouselVisible) {
            autoSlide = setInterval(nextSlide, intervalTime);
        }
    }

    // Función resetear el cambio de imagenes
    function reset() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    /* ----------------------------------------------EVENTOS---------------------------------------------- */

    // Eventos botones
    nextBtn.addEventListener("click", () => {
        nextSlide();
        reset();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        reset();
    });

    // Pausar al pasar el ratón por encima del carrusel
    carrusel.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    // Continuar el cambio de imagenes al sacar el ratón del carrusel
    carrusel.addEventListener("mouseleave", () => {
        startAutoSlide();
    });

    // Pausar carrusel cuando no está visible
    const observerCarrusel = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                isCarouselVisible = true;
                startAutoSlide();
            } else {
                isCarouselVisible = false;
                clearInterval(autoSlide);
            }
        });
    }, { threshold: 0.1 });

    observerCarrusel.observe(carrusel);
    startAutoSlide();
});
