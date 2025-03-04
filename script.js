document.addEventListener("DOMContentLoaded", function () {
    window.scrollTo(0, 1); // Desplaza la página 1px para esconder la barra de navegación en algunos móviles
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


document.addEventListener("DOMContentLoaded", function () {
    new Swiper(".swiper-container", {
        loop: true, // Para que sea infinito
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
        effect: "coverflow", // Puedes cambiar a "fade" o "cube"
        autoplay: {
            delay: 3000, // Cambia de imagen cada 3 segundos
            disableOnInteraction: false, // No se detiene si el usuario interactúa
        },
    });
});