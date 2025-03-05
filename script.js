window.onload = () => {
    let btn = document.createElement("button");
    btn.innerText = "Abrir en pantalla completa";
    btn.style.position = "fixed";
    btn.style.top = "50%";
    btn.style.left = "50%";
    btn.style.transform = "translate(-50%, -50%)";
    btn.style.padding = "15px 20px";
    btn.style.background = "#6a0dad";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "10px";
    btn.style.fontSize = "18px";
    btn.style.cursor = "pointer";
    
    btn.addEventListener("click", () => {
        document.documentElement.requestFullscreen();
        btn.remove(); // Borra el botón después de activar fullscreen
    });

    document.body.appendChild(btn);
};


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




