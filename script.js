document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = document.querySelectorAll(".lazy-load");

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src; // Carga la imagen real
                img.removeAttribute("data-src"); // Limpia el atributo una vez cargado
                img.classList.remove("lazy-load"); // Opcional: Remueve la clase después de cargar
                observer.unobserve(img); // Deja de observar la imagen
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});




document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".side-menu");
    const overlay = document.querySelector(".overlay");
    const closeButton = document.querySelector(".close-menu");
    const menuButton = document.querySelector(".heart-button");
    const menuLinks = document.querySelectorAll(".side-menu a");
    const header = document.querySelectorAll(".header");

    // Function to close the menu and hide the overlay
    const closeMenu = () => {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    };

    // Check if all elements are present
    if (menuButton && menu && overlay && closeButton) {
        // Open the menu and show the overlay when the menu button is clicked
        menuButton.addEventListener("click", () => {
            menu.classList.add("active");
            overlay.classList.add("active");
            overlay.classList.add("active");
        });

        // Close the menu and hide the overlay when the close button or overlay is clicked
        closeButton.addEventListener("click", closeMenu);
        overlay.addEventListener("click", closeMenu);

        // Add click event to each menu link to close the menu and scroll smoothly
        menuLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    closeMenu();
                    setTimeout(() => {
                        targetElement.scrollIntoView({ behavior: "smooth" });
                    }, 50); // Adjust the delay as needed
                }
            });
        });
    } else {
        console.error("Algunos elementos no se encontraron.");
    }
});


// CARRUSEL
const carousels = document.querySelectorAll(".carousel");

carousels.forEach(carousel => {
    const container = carousel.querySelector(".carousel-container");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const dotsContainer = carousel.querySelector(".carousel-dots");
    
    let index = 0;
    
    // Generar los puntos dinámicamente
    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    function updateCarousel() {
        container.style.transform = `translateX(${-index * 100}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    function goToSlide(i) {
        index = i;
        updateCarousel();
    }

    let startX = 0;
    container.addEventListener("touchstart", (e) => startX = e.touches[0].clientX);
    container.addEventListener("touchend", (e) => {
        let endX = e.changedTouches[0].clientX;
        if (startX > endX + 50) index = (index + 1) % slides.length; // Siguiente
        if (startX < endX - 50) index = (index - 1 + slides.length) % slides.length; // Anterior
        updateCarousel();
    });
});



//MODAL IMAGEN COMPLETA

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const closeBtn = document.querySelector(".close");
    modal.style.display = "none";

    let scale = 1, lastScale = 1, initialDistance = null;
    let startX = 0, startY = 0, translateX = 0, translateY = 0, lastTranslateX = 0, lastTranslateY = 0;

    // Detectar clic en imágenes para abrir el modal
    document.querySelectorAll(".carousel-slide img").forEach(img => {
        img.addEventListener("click", function () {
            modal.style.display = "flex";
            modalImg.src = this.getAttribute("src") || this.getAttribute("data-src"); // Ajusta para lazy-load
            resetTransform();
        });
    });

    // Cerrar modal
    closeBtn.addEventListener("click", () => closeModal());
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    function closeModal() {
        modal.style.display = "none";
        resetTransform();
    }

    // Zoom táctil
    modalImg.addEventListener("touchstart", (e) => {
        if (e.touches.length === 2) {
            initialDistance = getDistance(e.touches);
            lastScale = scale;
        } else if (e.touches.length === 1 && scale > 1) {
            startX = e.touches[0].clientX - lastTranslateX;
            startY = e.touches[0].clientY - lastTranslateY;
        }
    });

    modalImg.addEventListener("touchmove", (e) => {
        if (e.touches.length === 2 && initialDistance) {
            e.preventDefault();
            let newDistance = getDistance(e.touches);
            scale = Math.max(1, Math.min(lastScale * (newDistance / initialDistance), 4)); // Zoom entre 1x y 4x
        } else if (e.touches.length === 1 && scale > 1) {
            e.preventDefault();
            translateX = e.touches[0].clientX - startX;
            translateY = e.touches[0].clientY - startY;
        }
        applyTransform();
    });

    modalImg.addEventListener("touchend", () => {
        lastTranslateX = translateX;
        lastTranslateY = translateY;
        initialDistance = null;
    });

    function getDistance(touches) {
        let dx = touches[0].clientX - touches[1].clientX;
        let dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function applyTransform() {
        modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    function resetTransform() {
        scale = 1;
        translateX = translateY = lastTranslateX = lastTranslateY = 0;
        applyTransform();
    }
});
