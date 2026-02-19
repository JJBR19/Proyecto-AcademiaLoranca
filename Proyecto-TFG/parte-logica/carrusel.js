document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelector(".slides");
    const images = document.querySelectorAll(".slides img");
    const prevBtn = document.querySelector(".btn.left");
    const nextBtn = document.querySelector(".btn.right");

    let index = 0;
    const total = images.length;
    const intervalTime = 4000;
    let autoSlide;

    function updateSlide() {
        slides.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextSlide() {
        index++;
        if (index >= total) {
            index = 0;
        }
        updateSlide();
    }

    function prevSlide() {
        index--;
        if (index < 0) {
            index = total - 1;
        }
        updateSlide();
    }

    // Eventos botones
    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });

    // Auto slide
    function startAutoSlide() {
        clearInterval(autoSlide);
        autoSlide = setInterval(nextSlide, intervalTime);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    // Pausar al pasar el ratón
    const carrusel = document.querySelector(".carrusel");

    carrusel.addEventListener("mouseenter", () => {
        clearInterval(autoSlide);
    });

    carrusel.addEventListener("mouseleave", () => {
        startAutoSlide();
    });

    startAutoSlide();
});
