document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".side-menu");
    const overlay = document.querySelector(".overlay");
    const closeButton = document.querySelector(".close-menu");
    const menuButton = document.querySelector(".heart-button");
    const menuLinks = document.querySelectorAll(".side-menu a");

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
