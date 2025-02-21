document.addEventListener("DOMContentLoaded", function () {
    // ✅ Set Current Year
    const date = document.getElementById("date");
    if (date) date.textContent = new Date().getFullYear();

    // ✅ Hamburger Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navList = document.querySelector(".nav-list");
    const socials = document.querySelector(".social-nav");
    const navLinks = document.querySelectorAll(".nav-links");
	

    if (hamburger && navList && socials) {
        const toggleMobileMenu = () => {
            document.body.classList.toggle("open");
            hamburger.classList.toggle("open");
            navList.classList.toggle("open");
            socials.classList.toggle("open");
        };

        navLinks.forEach((link) => link.addEventListener("click", toggleMobileMenu));
        hamburger.addEventListener("click", toggleMobileMenu);
    }

    // ✅ Initialize Particles.js
    if (typeof particlesJS !== "undefined") {
        try {
            particlesJS.load("particles-js", "particles.json", () => console.log("Particles loaded!"));
        } catch (error) {
            console.warn("Particles.js failed to load:", error);
        }
    }

    // ✅ Initialize AOS (Scroll Animation)
    if (typeof AOS !== "undefined") {
        AOS.init();
    }

    // ✅ Typing Effect for Project Titles with Colorful Letters
    const typewriterElements = document.querySelectorAll(".typewriter");

    typewriterElements.forEach((element) => {
        const texts = element.getAttribute("data-texts")?.split(",") || []; // Array of texts
        if (texts.length === 0) return; // Exit if no texts are provided

        let textIndex = 0; // Index of the current text
        let index = 0; // Index of the current character
        let isDeleting = false;

        // Function to generate a random color
        const getRandomColor = () => {
            const letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 22)];
            }
            return color;
        };

        const type = () => {
            const currentText = element.textContent;

            if (!isDeleting) {
                // Typing phase
                if (index < texts[textIndex].length) {
                    const letter = texts[textIndex].charAt(index);
                    const span = document.createElement("span");

                    // Handle spaces by replacing them with a non-breaking space
                    if (letter === " ") {
                        span.innerHTML = "&nbsp;"; // Use innerHTML for non-breaking space
                    } else {
                        span.textContent = letter;
                    }

                    span.style.color = getRandomColor(); // Assign a random color
                    element.appendChild(span); // Append the colored letter
                    index++;
                    setTimeout(type, 120); // Typing speed
                } else {
                    // Switch to backspacing after a delay
                    setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, 1000); // Delay before backspacing starts
                }
            } else {
                // Backspacing phase
                if (element.children.length > 0) {
                    element.removeChild(element.lastChild); // Remove the last letter
                    setTimeout(type, 60); // Backspacing speed (faster than typing)
                } else {
                    // Move to the next text
                    isDeleting = false;
                    index = 0;
                    textIndex = (textIndex + 1) % texts.length; // Cycle through texts

                    // Delay before typing the next text
                    setTimeout(() => {
                        type();
                    }, 500); // Delay before typing the next text
                }
            }
        };

        // Add blinking cursor
        element.classList.add("cursor-blink");

        // Start the typewriter effect
        setTimeout(type, 500); // Initial delay before typing starts
    });
});